import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { optimizeForATS } from "@/lib/ai";
import { deductCredits } from "@/lib/credits";
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

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { resumeText } = requestBody;

    if (!resumeText) {
      return NextResponse.json(
        { error: "Missing resume text" },
        { status: 400 }
      );
    }

    // Deduct credits
    const creditResult = await deductCredits(
      session.user.id,
      "ATS_OPTIMIZATION",
      { textLength: resumeText.length }
    );

    if (!creditResult.success) {
      // Capture credit deduction failure
      posthogClient.capture({
        distinctId: session.user.id,
        event: "ai_ats_optimization_failed",
        properties: {
          reason: "insufficient_credits",
          creditsNeeded: 25, // Assuming 25 credits per optimization based on tasks.md
          creditsRemaining: creditResult.remainingCredits,
          resumeTextLength: resumeText.length,
        },
      });
      return NextResponse.json(
        { error: creditResult.error, remaining: creditResult.remainingCredits },
        { status: 402 } // Payment Required
      );
    }

    const analysis = await optimizeForATS(resumeText);

    // Capture successful ATS optimization
    posthogClient.capture({
      distinctId: session.user.id,
      event: "ai_ats_optimization_completed",
      properties: {
        resumeTextLength: resumeText.length,
        creditsUsed: 25, // Assuming 25 credits per optimization based on tasks.md
        creditsRemaining: creditResult.remainingCredits,
        score: analysis?.score, // Assuming analysis object has a score property
      },
    });

    return NextResponse.json({
      analysis,
      creditsRemaining: creditResult.remainingCredits,
    });
  } catch (error) {
    console.error("ATS optimization error:", error);

    // Capture internal server error
    if (session?.user?.id) {
      posthogClient.capture({
        distinctId: session.user.id,
        event: "ai_ats_optimization_internal_error",
        properties: {
          errorMessage: (error as Error).message,
          resumeTextSnippet: requestBody?.resumeText?.substring(0, 100), // Log a snippet
          errorStack: (error as Error).stack,
        },
      });
    } else {
      posthogClient.capture({
        distinctId: "anonymous", // Fallback for unauthenticated errors
        event: "ai_ats_optimization_internal_error",
        properties: {
          errorMessage: (error as Error).message,
          errorStack: (error as Error).stack,
        },
      });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
