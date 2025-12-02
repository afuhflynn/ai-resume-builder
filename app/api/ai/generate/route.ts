import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateResume } from "@/lib/ai";
import { deductCredits } from "@/lib/credits";
import { headers } from "next/headers";
import { PostHog } from "posthog-node"; // Assuming posthog-node is installed

// Initialize PostHog client for server-side
const posthogClient = new PostHog(
  process.env.NEXT_PUBLIC_POSTHOG_KEY as string,
  {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
  },
);

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const requestBody = await req.json();
  const { jobTitle, experience, title } = requestBody;
  try {
    if (!jobTitle || !experience || !title) {
      return NextResponse.json(
        { error: "Missing job title, experience, or resume title" },
        { status: 400 },
      );
    }

    // Deduct credits
    const creditResult = await deductCredits(
      session.user.id,
      "GENERATE_RESUME",
      { jobTitle, experience: experience.substring(0, 100) }, // Log only a part of experience
    );

    // if (!creditResult.success) {
    //   return NextResponse.json(
    //     { error: creditResult.error, remaining: creditResult.remaining },
    //     { status: 402 } // Payment Required
    //   );
    // }

    // Pass jobTitle and experience to generateResume
    const resumeContent = await generateResume({ jobTitle, experience });

    // Create a new resume in the database with the AI-generated content
    const newResume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        title: title,
        jobTitle: jobTitle,

        colorTheme: "#0f172a", // Default to Slate-900 (Professional theme primary)
        industry: null,
        regionalStandard: null,
        email: session.user.email,
        fullName: resumeContent.personalInfo.fullName || session.user.name,
        profile: session.user.image,
        phone: resumeContent.personalInfo.phone,
        location: resumeContent.personalInfo.location!,
        website: resumeContent.personalInfo.website!,
        linkedin: resumeContent.personalInfo.linkedin!,
        professionalSummary: resumeContent.summary,
        completeness: resumeContent.completeness,
        experiences: resumeContent.experience!,
        educations: resumeContent.education,
        skills: resumeContent.skills,
        projects: resumeContent.projects,
      },
    });

    // Track successful resume generation
    posthogClient.capture({
      distinctId: session.user.id,
      event: "ai_resume_generated",
      properties: {
        resumeId: newResume.id,
        jobTitle,
        title,
        creditsUsed: 50, // Assuming 50 credits per generation based on tasks.md
        // creditsRemaining: creditResult.remaining,
      },
    });

    return NextResponse.json({
      resumeId: newResume.id, // Return the ID of the new resume
      // creditsRemaining: creditResult.remaining,
    });
  } catch (error) {
    console.error("AI Resume Generation API error:", error);
    // Track internal server error
    if (session?.user?.id) {
      posthogClient.capture({
        distinctId: session.user.id,
        event: "ai_resume_generate_internal_error",
        properties: {
          errorMessage: (error as Error).message,
          jobTitle: requestBody?.jobTitle, // Use the already parsed requestBody
          title: requestBody?.title,
          errorStack: (error as Error).stack,
        },
      });
    } else {
      posthogClient.capture({
        distinctId: "anonymous", // Fallback for unauthenticated errors
        event: "ai_resume_generate_internal_error",
        properties: {
          errorMessage: (error as Error).message,
          errorStack: (error as Error).stack,
        },
      });
    }

    return NextResponse.json(
      { error: "Internal server error during AI resume generation" },
      { status: 500 },
    );
  }
}
