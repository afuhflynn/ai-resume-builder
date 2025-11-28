import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ajAuth } from "@/lib/arcjet";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  const decision = await ajAuth.protect(req);

  if (decision.isDenied()) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, content } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const resume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        title,
        content: JSON.stringify(content || {}),
        completeness: 0, // Calculate based on content
      },
    });

    return NextResponse.json(resume);
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
