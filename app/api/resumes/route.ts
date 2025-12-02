// app/api/resumes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ajAuth } from "@/lib/arcjet";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decision = await ajAuth.protect(req, {
    requested: 2,
    userId: session.user.id,
  });

  if (decision.isDenied()) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await req.json();
    const {
      title,
      industry,
      regionalStandard,
      templateId: bodyTemplateId,
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
      colorTheme,
    } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get default template if not provided
    const defaultTemplate = await prisma.resumeTemplate.findUnique({
      where: { name: "Modern" },
    });

    const templateId = bodyTemplateId || defaultTemplate?.id;

    const resumeTemplate = (await prisma.resumeTemplate.findUnique({
      where: { id: templateId },
    })) as unknown as ResumeTemplate;

    if (!resumeTemplate) {
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      );
    }

    let resume;
    if (resumeTemplate) {
      console.log(`Using template: ${resumeTemplate.name}`);
      resume = await prisma.resume.create({
        data: {
          userId: session.user.id,
          title: resumeTemplate.name,
          templateId: resumeTemplate.id,
          colorTheme: resumeTemplate.designJson.colors.primary, // Default to Modern theme primary
          industry: industry || null,
          regionalStandard: regionalStandard || null,

          // Personal info - prioritize body data, fallback to user data
          fullName:
            resumeTemplate.designJson.sampleData.personalInfo.fullName ||
            user.fullName ||
            session.user.name ||
            "",
          jobTitle:
            resumeTemplate.designJson.sampleData.personalInfo.jobTitle ||
            jobTitle ||
            "",
          email:
            resumeTemplate.designJson.sampleData.personalInfo.email ||
            email ||
            session.user.email ||
            "",
          phone:
            resumeTemplate.designJson.sampleData.personalInfo.phone ||
            phone ||
            user.phone ||
            "",
          location:
            resumeTemplate.designJson.sampleData.personalInfo.location ||
            location ||
            user.location ||
            "",
          website:
            resumeTemplate.designJson.sampleData.personalInfo.website ||
            website ||
            user.website ||
            "",
          linkedin:
            resumeTemplate.designJson.sampleData.personalInfo.linkedin ||
            linkedin ||
            user.linkedin ||
            "",
          x:
            resumeTemplate.designJson.sampleData.personalInfo.x ||
            x ||
            user.x ||
            "",
          profile: session.user.image,

          // Resume content
          professionalSummary:
            resumeTemplate.designJson.sampleData.personalInfo.jobTitle ||
            professionalSummary ||
            user.bio ||
            "",
          experiences:
            (resumeTemplate.designJson.sampleData.experience as []) ||
            experiences ||
            [],
          skills:
            (resumeTemplate.designJson.sampleData.skills as []) || skills || [],
          projects:
            (resumeTemplate.designJson.sampleData.projects as []) ||
            projects ||
            [],
          educations:
            (resumeTemplate.designJson.sampleData.education as []) ||
            educations ||
            [],
          thumbnailUrl: resumeTemplate.thumbnail,
          isPublic: false,
          completeness: 100, // Will be calculated
        },
        include: {
          template: true,
        },
      });
    } else {
      // Create resume with all data
      resume = await prisma.resume.create({
        data: {
          userId: session.user.id,
          title,
          templateId,
          colorTheme: colorTheme || "#3b82f6", // Default to Modern theme primary
          industry: industry || null,
          regionalStandard: regionalStandard || null,

          // Personal info - prioritize body data, fallback to user data
          fullName: fullName || user.fullName || session.user.name || "",
          jobTitle: jobTitle || "",
          email: email || session.user.email || "",
          phone: phone || user.phone || "",
          location: location || user.location || "",
          website: website || user.website || "",
          linkedin: linkedin || user.linkedin || "",
          x: x || user.x || "",
          profile: session.user.image,

          // Resume content
          professionalSummary: professionalSummary || user.bio || "",
          experiences: experiences || [],
          skills: skills || [],
          projects: projects || [],
          educations: educations || [],

          completeness: 0, // Will be calculated
        },
        include: {
          template: true,
        },
      });
    }

    // Calculate completeness
    let completeness = 0;
    if (resume.fullName) completeness += 20;
    if (resume.email) completeness += 10;
    if (resume.professionalSummary) completeness += 15;
    if (Array.isArray(resume.experiences) && resume.experiences.length > 0)
      completeness += 25;
    if (Array.isArray(resume.educations) && resume.educations.length > 0)
      completeness += 15;
    if (Array.isArray(resume.skills) && resume.skills.length > 0)
      completeness += 10;
    if (Array.isArray(resume.projects) && resume.projects.length > 0)
      completeness += 5;

    // Update completeness
    await prisma.resume.update({
      where: { id: resume.id },
      data: { completeness: Math.min(completeness, 100) },
    });

    // Generate PDF and thumbnail asynchronously (don't block the response)
    generateResumeAssets(resume.id).catch((error) => {
      console.error("Failed to generate resume assets:", error);
    });

    return NextResponse.json(resume, { status: 201 });
  } catch (error) {
    console.error("Create resume error:", error);
    return NextResponse.json(
      { error: "Failed to create resume" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resumes = await prisma.resume.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
      include: {
        template: true,
        _count: {
          select: {
            versions: true,
            uploadFiles: true,
          },
        },
      },
    });

    return NextResponse.json(resumes);
  } catch (error) {
    console.error("Fetch resumes error:", error);
    return NextResponse.json(
      { error: "Failed to fetch resumes" },
      { status: 500 }
    );
  }
}

// Helper function to generate PDF and thumbnail
async function generateResumeAssets(resumeId: string) {
  try {
    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
      include: { template: true },
    });

    if (!resume) {
      throw new Error("Resume not found");
    }

    // Import generation functions
    const { generateResumePDF } = await import("@/lib/resume-pdf-generator");
    const { generateResumeThumbnail } = await import(
      "@/lib/thumbnail-generator"
    );
    const { FileUploadService } = await import("@/lib/file-upload-service");

    const fileUploadService = new FileUploadService();

    // Generate PDF
    const pdfBuffer = await generateResumePDF(resume);
    const pdfPath = await fileUploadService.savePDF(
      resume.userId,
      resume.id,
      pdfBuffer
    );

    // Generate thumbnail
    const thumbnailBuffer = await generateResumeThumbnail(resume);
    const thumbnailPath = await fileUploadService.saveThumbnail(
      resume.userId,
      resume.id,
      thumbnailBuffer
    );

    // Update resume with thumbnail URL
    await prisma.resume.update({
      where: { id: resumeId },
      data: { thumbnailUrl: thumbnailPath },
    });

    console.log(`Successfully generated assets for resume ${resumeId}`);
    return { pdfPath, thumbnailPath };
  } catch (error) {
    console.error(`Error generating assets for resume ${resumeId}:`, error);
    throw error;
  }
}
