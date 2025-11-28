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
    const title = formData.get("title") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!title || title.trim().length === 0) {
      return NextResponse.json(
        { error: "Resume title is required" },
        { status: 400 },
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
        { status: 400 },
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
        { status: 400 },
      );
    }

    // Deduct credits before parsing
    const creditResult = await deductCredits(session.user.id, "PARSE_RESUME", {
      fileName: file.name,
      fileSize: file.size,
    });

    if (!creditResult.success) {
      return NextResponse.json(
        { error: creditResult.error, remaining: creditResult.remaining },
        { status: 402 }, // Payment Required
      );
    }

    // Parse with AI
    const resumeData = await parseResumeFromText(text);

    // Create a new resume in the database with the parsed content
    const newResume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        title: title,
        content: JSON.stringify(resumeData), // Store the parsed content
        completeness: 0, // Initial completeness, can be updated later
      },
    });

    return NextResponse.json({
      resumeId: newResume.id, // Return the ID of the new resume
      creditsRemaining: creditResult.remaining,
    });
  } catch (error) {
    console.error("Resume import error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
