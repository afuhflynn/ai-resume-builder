import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Seed Resume Templates
    const modernTemplate = await prisma.resumeTemplate.upsert({
      where: { name: "Modern" },
      update: {},
      create: {
        name: "Modern",
        description:
          "A balanced, contemporary design suitable for most industries",
        designJson: JSON.stringify({
          layout: "single-column",
          colors: { primary: "#3b82f6", secondary: "#64748b" },
          fonts: { heading: "Inter", body: "Inter" },
          spacing: { margin: "normal", lineHeight: "relaxed" },
        }),
        thumbnail: "/templates/modern.png",
        isPremium: false,
        isActive: true,
      },
    });

    const glassTemplate = await prisma.resumeTemplate.upsert({
      where: { name: "Glass" },
      update: {},
      create: {
        name: "Glass",
        description: "Modern glassmorphism design with a sleek look",
        designJson: JSON.stringify({
          layout: "two-column",
          colors: { primary: "#2563eb", secondary: "#64748b" },
          fonts: { heading: "Inter", body: "Inter" },
          spacing: { margin: "compact", lineHeight: "normal" },
        }),
        thumbnail: "/templates/glass.png",
        isPremium: true,
        isActive: true,
      },
    });

    const professionalTemplate = await prisma.resumeTemplate.upsert({
      where: { name: "Professional" },
      update: {},
      create: {
        name: "Professional",
        description: "Clean, traditional design suitable for corporate roles",
        designJson: JSON.stringify({
          layout: "single-column",
          colors: { primary: "#0f172a", secondary: "#334155" },
          fonts: { heading: "Merriweather", body: "Open Sans" },
          spacing: { margin: "normal", lineHeight: "normal" },
        }),
        thumbnail: "/templates/professional.png",
        isPremium: false,
        isActive: true,
      },
    });

    const creativeTemplate = await prisma.resumeTemplate.upsert({
      where: { name: "Creative" },
      update: {},
      create: {
        name: "Creative",
        description: "Bold and colorful design for creative professionals",
        designJson: JSON.stringify({
          layout: "asymmetric",
          colors: { primary: "#ec4899", secondary: "#f59e0b" },
          fonts: { heading: "Poppins", body: "Roboto" },
          spacing: { margin: "wide", lineHeight: "relaxed" },
        }),
        thumbnail: "/templates/creative.png",
        isPremium: true,
        isActive: true,
      },
    });

    const minimalistTemplate = await prisma.resumeTemplate.upsert({
      where: { name: "Minimalist" },
      update: {},
      create: {
        name: "Minimalist",
        description: "Simple, typography-focused design",
        designJson: JSON.stringify({
          layout: "single-column",
          colors: { primary: "#000000", secondary: "#666666" },
          fonts: { heading: "Helvetica", body: "Helvetica" },
          spacing: { margin: "compact", lineHeight: "tight" },
        }),
        thumbnail: "/templates/minimalist.png",
        isPremium: false,
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Resume templates seeded successfully",
      templates: [
        modernTemplate,
        glassTemplate,
        professionalTemplate,
        creativeTemplate,
        minimalistTemplate,
      ],
    });
  } catch (error) {
    console.error("Error seeding templates:", error);
    return NextResponse.json(
      { error: "Failed to seed templates" },
      { status: 500 }
    );
  }
}
