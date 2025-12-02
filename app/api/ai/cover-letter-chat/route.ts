import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
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

    const { messages, resumeData, jobInfo } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Deduct credits only for the first message (initial generation)
    if (messages.length === 1) {
      const creditResult = await deductCredits(
        session.user.id,
        "COVER_LETTER",
        { jobTitle: jobInfo?.jobTitle || "N/A" }
      );

      if (!creditResult.success) {
        return NextResponse.json(
          {
            error: creditResult.error,
            remaining: creditResult.remainingCredits,
          },
          { status: 402 }
        );
      }
    }

    // Build system prompt with context
    const systemPrompt = `You are an expert cover letter writer and career coach. Your role is to help users create compelling, personalized cover letters.

User's Resume Summary:
${resumeData?.summary || "Not provided"}

User's Experience:
${
  resumeData?.experience
    ?.map((exp: any) => `- ${exp.position} at ${exp.company}`)
    .join("\n") || "Not provided"
}

User's Skills:
${
  resumeData?.skills?.map((skill: any) => skill.name).join(", ") ||
  "Not provided"
}

Job Information:
${
  jobInfo
    ? `
- Job Title: ${jobInfo.jobTitle || "Not specified"}
- Company: ${jobInfo.company || "Not specified"}
- Job Description: ${jobInfo.description || "Not specified"}
`
    : "Not provided"
}

Guidelines:
1. Write professional, engaging cover letters
2. Highlight relevant experience and skills
3. Match the tone to the job/company culture
4. Keep paragraphs concise and impactful
5. Use specific examples when possible
6. If the user asks for revisions, make targeted improvements
7. Be conversational and helpful

When generating the initial cover letter, structure it with:
- Opening paragraph (hook and interest)
- 2-3 body paragraphs (relevant experience and skills)
- Closing paragraph (call to action)

For follow-up messages, help refine and improve based on user feedback.`;

    const result = streamText({
      model: google("gemini-2.5-flash-lite"),
      system: systemPrompt,
      messages: messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Cover letter chat error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
