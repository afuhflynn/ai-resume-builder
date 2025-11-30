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
    const { title, industry, regionalStandard } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const defaultTemplate = await prisma.resumeTemplate.findUnique({
      where: { name: "Professional" },
    });

    const resume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        title,
        templateId: defaultTemplate?.id,
        colorTheme: "#0f172a", // Default to Slate-900 (Professional theme primary)
        industry: industry || null,
        regionalStandard: regionalStandard || null,
        email: session.user.email,
        fullName: user.fullName || session.user.name,
        profile: session.user.image,
        phone: user.phone,
        location: user.location,
        website: user.website,
        linkedin: user.linkedin,
        x: user.x,
        professionalSummary: user.bio,
      },
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
      include: { template: true },
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
