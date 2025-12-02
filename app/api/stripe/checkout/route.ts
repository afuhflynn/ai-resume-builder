import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createCheckoutSession, BILLING_PLANS } from "@/lib/stripe";
import { headers } from "next/headers";
import { PostHog } from "posthog-node";

// Initialize PostHog client for server-side
const posthogClient = new PostHog(process.env.POSTHOG_API_KEY as string, {
  host: process.env.POSTHOG_HOST || "https://app.posthog.com",
});

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  try {
    const { plan, ip } = requestBody;

    if (!session) {
      // Capture unauthorized checkout attempt
      posthogClient.capture({
        distinctId: "anonymous",
        event: "checkout_initiated_unauthorized",
        properties: {
          ip, // Attempt to get IP if available in req.ip
        },
      });
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!plan || !BILLING_PLANS[plan as keyof typeof BILLING_PLANS]) {
      // Capture invalid plan attempt
      posthogClient.capture({
        distinctId: session.user.id,
        event: "checkout_initiated_invalid_plan",
        properties: {
          plan: plan || "unknown",
        },
      });
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const checkoutSession = await createCheckoutSession(
      session.user.id,
      plan as keyof typeof BILLING_PLANS
    );

    if (!checkoutSession.url) {
      // Capture failure to create checkout session
      posthogClient.capture({
        distinctId: session.user.id,
        event: "checkout_session_creation_failed",
        properties: {
          plan: plan,
        },
      });
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      );
    }

    // Capture successful checkout session initiation
    posthogClient.capture({
      distinctId: session.user.id,
      event: "checkout_session_initiated",
      properties: {
        plan: plan,
        checkoutSessionId: checkoutSession.id,
        redirectUrl: checkoutSession.url,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    // Capture internal server error during checkout initiation
    if (session?.user?.id) {
      posthogClient.capture({
        distinctId: session.user.id,
        event: "checkout_initiation_internal_error",
        properties: {
          errorMessage: (error as Error).message,
          plan: requestBody?.plan,
          errorStack: (error as Error).stack,
        },
      });
    } else {
      posthogClient.capture({
        distinctId: "anonymous",
        event: "checkout_initiation_internal_error",
        properties: {
          errorMessage: (error as Error).message,
          errorStack: (error as Error).stack,
          requestBody: requestBody, // Log request body for unauthenticated errors
        },
      });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
