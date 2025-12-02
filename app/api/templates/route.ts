import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const templates = await prisma.resumeTemplate.findMany({
      where: { isActive: true },
      orderBy: [{ isPremium: "asc" }, { name: "asc" }],
      select: {
        id: true,
        name: true,
        description: true,
        thumbnail: true,
        designJson: true,
        isPremium: true,
      },
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json(
      { error: "Failed to fetch templates" },
      { status: 500 }
    );
  }
}
