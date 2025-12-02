import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createVersion } from "@/lib/versioning";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: resumeId } = await params;

    // Verify the resume belongs to the user
    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { userId: true, projects: true, skills: true },
    });

    if (!resume || resume.userId !== session.user.id) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    // Get the data from request body or use current resume content
    const body = await request.json();
    const data = body.data || JSON.parse(JSON.stringify(resume) || "{}");

    // Create new version
    const version = await createVersion(resumeId, data);

    return NextResponse.json({
      success: true,
      version: {
        id: version.id,
        version: version.version,
        createdAt: version.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating version:", error);
    return NextResponse.json(
      { error: "Failed to create version" },
      { status: 500 }
    );
  }
}
