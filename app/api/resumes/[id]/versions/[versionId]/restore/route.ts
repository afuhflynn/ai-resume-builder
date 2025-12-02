import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { restoreVersion } from "@/lib/versioning";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; versionId: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: resumeId, versionId } = await params;

    // Verify the resume belongs to the user
    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: { userId: true },
    });

    if (!resume || resume.userId !== session.user.id) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    const result = await restoreVersion(resumeId, versionId);

    return NextResponse.json({
      success: true,
      message: "Version restored successfully",
      resume: {
        id: result.resume.id,
        title: result.resume.title,
        resume: result.resume,
        updatedAt: result.resume.updatedAt,
      },
      newVersion: {
        id: result.version.id,
        version: result.version.version,
        createdAt: result.version.createdAt,
      },
    });
  } catch (error: any) {
    console.error("Error restoring version:", error);
    return NextResponse.json(
      { error: error.message || "Failed to restore version" },
      { status: 500 }
    );
  }
}
