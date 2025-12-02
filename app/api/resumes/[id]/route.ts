import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { ajAuth } from "@/lib/arcjet";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const resume = await prisma.resume.findUnique({
      where: { id },
      include: {
        template: true,
      },
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    if (resume.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(resume);
  } catch (error) {
    console.error("Fetch resume error:", error);
    return NextResponse.json(
      { error: "Failed to fetch resume" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const decision = await ajAuth.protect(req, {
    requested: 1,
    userId: session.user.id,
  });

  if (decision.isDenied()) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await req.json();
    const {
      title,
      completeness,
      fullName,
      jobTitle,
      email,
      phone,
      location,
      website,
      linkedin,
      x,
      professionalSummary,
      experiences,
      skills,
      projects,
      educations,
      templateId,
      themeColor,
    } = body;
    const { id } = await params;

    const existingResume = await prisma.resume.findUnique({
      where: { id, userId: session.user.id },
    });

    if (!existingResume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    const updatedResume = await prisma.resume.upsert({
      where: { id },
      update: {
        title,
        completeness,
        fullName,
        jobTitle,
        email,
        phone,
        location,
        website,
        linkedin,
        x,
        professionalSummary,
        experiences,
        skills,
        projects,
        educations,
        templateId,
        colorTheme: themeColor,
      },
      create: {
        title,
        userId: session.user.id,
        completeness,
        fullName,
        jobTitle,
        email,
        phone,
        location,
        website,
        linkedin,
        x,
        professionalSummary,
        experiences,
        skills,
        projects,
        educations,
        templateId,
        colorTheme: themeColor,
      },
    });

    // Check if template changed and regenerate thumbnail if needed
    const {
      shouldRegenerateThumbnail,
      generateResumeThumbnail,
      deleteOldThumbnail,
    } = await import("@/lib/thumbnail");

    if (
      shouldRegenerateThumbnail(
        existingResume.thumbnailUrl,
        existingResume.templateId,
        templateId
      )
    ) {
      // Delete old thumbnail
      deleteOldThumbnail(existingResume.thumbnailUrl).catch(console.error);

      // Generate new thumbnail asynchronously
      generateResumeThumbnail(id, templateId, {
        personalInfo: { fullName },
      })
        .then(async (thumbnailUrl) => {
          await prisma.resume.update({
            where: { id },
            data: { thumbnailUrl },
          });
        })
        .catch((error) => {
          console.error("Failed to generate thumbnail:", error);
        });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        fullName: user.fullName || updatedResume.fullName,
        phone: user.phone || updatedResume.phone,
        location: user.location || updatedResume.location,
        website: user.website || updatedResume.website,
        linkedin: user.linkedin || updatedResume.linkedin,
        x: user.x || updatedResume.x,
        bio: user.bio || updatedResume.professionalSummary,
      },
    });

    if (!updatedUser) {
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedResume);
  } catch (error) {
    console.error("Update resume error:", error);
    return NextResponse.json(
      { error: "Failed to update resume" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const existingResume = await prisma.resume.findUnique({
      where: { id },
    });

    if (!existingResume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    if (existingResume.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.resume.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete resume error:", error);
    return NextResponse.json(
      { error: "Failed to delete resume" },
      { status: 500 }
    );
  }
}
