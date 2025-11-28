import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generateCoverLetter } from "@/lib/ai";
import { deductCredits } from "@/lib/credits";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { jobDescription, resumeData, tone } = await req.json();

    if (!jobDescription || !resumeData) {
      return NextResponse.json(
        { error: "Missing job description or resume data" },
        { status: 400 }
      );
    }

    // Deduct credits
    // const creditResult = await deductCredits(session.user.id, "COVER_LETTER", {
    //   jobDescription: jobDescription.substring(0, 100),
    // });

    // if (!creditResult.success) {
    //   return NextResponse.json(
    //     { error: creditResult.error, remaining: creditResult.remaining },
    //     { status: 402 } // Payment Required
    //   );
    // }

    // Convert resumeData object to string for the prompt
    const resumeString = JSON.stringify(resumeData, null, 2);

    const coverLetter = await generateCoverLetter(
      jobDescription,
      resumeString,
      tone || "professional"
    );

    return NextResponse.json({
      coverLetter,
      // creditsRemaining: creditResult.remaining,
    });
  } catch (error) {
    console.error("Cover letter generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
