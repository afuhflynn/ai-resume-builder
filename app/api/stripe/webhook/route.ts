import { NextRequest, NextResponse } from "next/server";
import { stripe, BILLING_PLANS } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import { PostHog } from "posthog-node";
import { sendPaymentReceipt } from "@/lib/email/sender";

// Initialize PostHog client for server-side
const posthogClient = new PostHog(process.env.POSTHOG_API_KEY as string, {
  host: process.env.POSTHOG_HOST || "https://app.posthog.com",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error(`Webhook signature verification failed: ${error.message}`);
    posthogClient.capture({
      distinctId: "anonymous", // No user context available here
      event: "stripe_webhook_signature_error",
      properties: {
        errorMessage: error.message,
        errorStack: error.stack,
      },
    });
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        const subscriptionId = session.subscription as string;
        const customerId = session.customer as string;
        const userId = session.metadata?.userId;
        const planKey = session.metadata?.planKey as keyof typeof BILLING_PLANS;

        if (userId && planKey) {
          // Update user with stripeCustomerId
          await prisma.user.update({
            where: { id: userId },
            data: { stripeCustomerId: customerId },
          });

          // Ensure billing plan exists
          const plan = BILLING_PLANS[planKey];
          const billingPlan = await prisma.billingPlan.upsert({
            where: { name: plan.name },
            update: {},
            create: {
              name: plan.name,
              stripePriceId: plan.priceId,
              priceCents: Math.round(plan.price * 100),
              interval: plan.interval,
              aiCredits: plan.credits,
              features: plan.features,
            },
          });

          // Retrieve subscription details from Stripe to get accurate period end
          const stripeSubscription = await stripe.subscriptions.retrieve(
            subscriptionId
          );

          // Upsert subscription
          await prisma.subscription.upsert({
            where: { userId },
            update: {
              billingPlanId: billingPlan.id,
              stripeSubscriptionId: subscriptionId,
              status: stripeSubscription.status,
              currentPeriodEnd: new Date(
                stripeSubscription.current_period_end * 1000
              ),
              cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
            },
            create: {
              userId,
              billingPlanId: billingPlan.id,
              stripeSubscriptionId: subscriptionId,
              status: stripeSubscription.status,
              currentPeriodEnd: new Date(
                stripeSubscription.current_period_end * 1000
              ),
              cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
            },
          });

          // Track successful checkout conversion
          posthogClient.capture({
            distinctId: userId,
            event: "subscription_purchased",
            properties: {
              plan: planKey,
              amount: plan.price,
              currency: "USD", // Assuming USD for now
              stripeCheckoutSessionId: session.id,
              stripeSubscriptionId: subscriptionId,
              billingPlanId: billingPlan.id,
            },
          });

          // Send payment confirmation email
          const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { email: true },
          });

          if (user?.email) {
            await sendPaymentReceipt(user.email, plan.name, plan.price * 100);
          }
        }
        break;

      case "customer.subscription.updated":
        const updatedSubscription = event.data.object as Stripe.Subscription;

        await prisma.subscription.update({
          where: { stripeSubscriptionId: updatedSubscription.id },
          data: {
            status: updatedSubscription.status,
            currentPeriodEnd: new Date(
              updatedSubscription.current_period_end * 1000
            ),
            cancelAtPeriodEnd: updatedSubscription.cancel_at_period_end,
          },
        });

        // Fetch the user associated with the subscription for tracking
        const userForUpdate = await prisma.user.findFirst({
          where: { stripeCustomerId: updatedSubscription.customer as string },
          select: { id: true },
        });

        if (userForUpdate) {
          posthogClient.capture({
            distinctId: userForUpdate.id,
            event: "subscription_updated",
            properties: {
              stripeSubscriptionId: updatedSubscription.id,
              status: updatedSubscription.status,
              cancelAtPeriodEnd: updatedSubscription.cancel_at_period_end,
              currentPeriodEnd: new Date(
                updatedSubscription.current_period_end * 1000
              ).toISOString(),
            },
          });
        }
        break;

      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object as Stripe.Subscription;

        await prisma.subscription.update({
          where: { stripeSubscriptionId: deletedSubscription.id },
          data: {
            status: "canceled",
          },
        });

        // Fetch the user associated with the subscription for tracking
        const userForDeletion = await prisma.user.findFirst({
          where: { stripeCustomerId: deletedSubscription.customer as string },
          select: { id: true },
        });

        if (userForDeletion) {
          posthogClient.capture({
            distinctId: userForDeletion.id,
            event: "subscription_cancelled",
            properties: {
              stripeSubscriptionId: deletedSubscription.id,
              status: "canceled",
            },
          });
        }
        break;

      case "invoice.payment_failed":
        const invoice = event.data.object as Stripe.Invoice;
        // Fetch the user associated with the invoice for tracking
        const userForPaymentFailure = await prisma.user.findFirst({
          where: { stripeCustomerId: invoice.customer as string },
          select: { id: true },
        });

        if (userForPaymentFailure) {
          posthogClient.capture({
            distinctId: userForPaymentFailure.id,
            event: "subscription_payment_failed",
            properties: {
              stripeInvoiceId: invoice.id,
              stripeSubscriptionId: invoice.subscription,
              amountDue: invoice.amount_due / 100,
              currency: invoice.currency,
            },
          });
        }
        break;

      default:
        console.warn(`Unhandled event type: ${event.type}`);
        // Optionally capture unhandled event types
        posthogClient.capture({
          distinctId: "anonymous", // Or try to extract user from event if possible
          event: "stripe_webhook_unhandled_event",
          properties: {
            eventType: event.type,
            eventId: event.id,
          },
        });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    // Capture general webhook processing errors
    posthogClient.capture({
      distinctId: "anonymous", // No specific user context for general handler error
      event: "stripe_webhook_processing_error",
      properties: {
        errorMessage: (error as Error).message,
        errorStack: (error as Error).stack,
        eventType: event.type,
        eventId: event.id,
      },
    });
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
