import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { extractTextFromFile } from "@/lib/parser";
import { parseResumeFromText } from "@/lib/ai";
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

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    const title = file.name ?? "New Resume";

    if (!title || title.trim().length === 0) {
      return NextResponse.json(
        { error: "Resume title is required" },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "text/plain",
    ];

    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only PDF, DOCX, and TXT are supported." },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text
    const text = await extractTextFromFile(buffer, file.type);

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Could not extract text from file" },
        { status: 400 }
      );
    }

    // Deduct credits before parsing
    const creditResult = await deductCredits(session.user.id, "PARSE_RESUME", {
      fileName: file.name,
      fileSize: file.size,
    });

    // if (!creditResult.success) {
    //   return NextResponse.json(
    //     { error: creditResult.error, remaining: creditResult.remainingCredits },
    //     { status: 402 }, // Payment Required
    //   );
    // }

    // Parse with AI
    const resumeData = await parseResumeFromText(text);

    // Create a new resume in the database with the parsed content
    const newResume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        title: title,
        colorTheme: "#0f172a", // Default to Slate-900 (Professional theme primary)
        industry: null,
        regionalStandard: null,
        email: session.user.email,
        fullName: resumeData.personalInfo.fullName || session.user.name,
        profile: session.user.image,
        phone: resumeData.personalInfo.phone,
        location: resumeData.personalInfo.location!,
        website: resumeData.personalInfo.website!,
        linkedin: resumeData.personalInfo.linkedin!,
        professionalSummary: resumeData.summary,
        completeness: resumeData.completeness,
        experiences: resumeData.experience!,
        educations: resumeData.education,
        skills: resumeData.skills,
        projects: resumeData.projects,
      },
    });

    return NextResponse.json({
      resumeId: newResume.id, // Return the ID of the new resume
      // creditsRemaining: creditResult.remainingCredits,
    });
  } catch (error) {
    console.error("Resume import error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
