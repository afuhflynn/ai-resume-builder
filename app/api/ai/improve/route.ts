import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { improveResumeSection } from "@/lib/ai";
import { deductCredits } from "@/lib/credits";
import { headers } from "next/headers";
import { PostHog } from "posthog-node"; // Assuming posthog-node is installed

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
    const { section, tone } = requestBody;

    if (!section) {
      return NextResponse.json(
        { error: "Missing section content" },
        { status: 400 }
      );
    }

    // Deduct credits
    const creditResult = await deductCredits(
      session.user.id,
      "IMPROVE_SECTION",
      { sectionLength: section.length }
    );

    if (!creditResult.success) {
      // Capture credit deduction failure
      posthogClient.capture({
        distinctId: session.user.id,
        event: "ai_improve_section_failed",
        properties: {
          reason: "insufficient_credits",
          creditsNeeded: 10, // Assuming 10 credits per improvement based on tasks.md
          creditsRemaining: creditResult.remainingCredits,
          sectionLength: section.length,
        },
      });
      return NextResponse.json(
        { error: creditResult.error, remaining: creditResult.remainingCredits },
        { status: 402 } // Payment Required
      );
    }

    const improvedText = await improveResumeSection(
      section,
      tone || "professional"
    );

    // Capture successful section improvement
    posthogClient.capture({
      distinctId: session.user.id,
      event: "ai_resume_section_improved",
      properties: {
        sectionLength: section.length,
        tone: tone || "professional",
        creditsUsed: 10, // Assuming 10 credits per improvement based on tasks.md
        creditsRemaining: creditResult.remainingCredits,
      },
    });

    return NextResponse.json({
      improvedText,
      creditsRemaining: creditResult.remainingCredits,
    });
  } catch (error) {
    console.error("Resume improvement error:", error);

    // Capture internal server error
    if (session?.user?.id) {
      posthogClient.capture({
        distinctId: session.user.id,
        event: "ai_improve_section_internal_error",
        properties: {
          errorMessage: (error as Error).message,
          sectionContentSnippet: requestBody?.section?.substring(0, 100), // Log a snippet
          errorStack: (error as Error).stack,
        },
      });
    } else {
      posthogClient.capture({
        distinctId: "anonymous", // Fallback for unauthenticated errors
        event: "ai_improve_section_internal_error",
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
