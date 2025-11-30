import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

async function seedDatabase() {
  console.log("🌱 Seeding database...");

  try {
    // Seed Billing Plans
    const starterPlan = await prisma.billingPlan.upsert({
      where: { name: "Starter" },
      update: {},
      create: {
        name: "Starter",
        stripePriceId: process.env.STRIPE_STARTER_PRICE_ID || null,
        priceCents: 999, // $9.99
        interval: "month",
        aiCredits: 100,
        features: JSON.stringify([
          "100 AI credits per month",
          "Basic resume templates",
          "PDF export",
          "Email support",
        ]),
        isActive: true,
      },
    });

    const proPlan = await prisma.billingPlan.upsert({
      where: { name: "Pro" },
      update: {},
      create: {
        name: "Pro",
        stripePriceId: process.env.STRIPE_PRO_PRICE_ID || null,
        priceCents: 2999, // $29.99
        interval: "month",
        aiCredits: -1, // Unlimited
        features: JSON.stringify([
          "Unlimited AI credits",
          "All premium templates",
          "Cover letter generator",
          "ATS optimization",
          "Priority support",
          "Resume analytics",
        ]),
        isActive: true,
      },
    });

    const teamPlan = await prisma.billingPlan.upsert({
      where: { name: "Team" },
      update: {},
      create: {
        name: "Team",
        stripePriceId: process.env.STRIPE_TEAM_PRICE_ID || null,
        priceCents: 9999, // $99.99
        interval: "month",
        aiCredits: -1, // Unlimited
        features: JSON.stringify([
          "Everything in Pro",
          "Shared workspaces",
          "Team collaboration",
          "Admin dashboard",
          "Custom branding",
          "Dedicated support",
          "API access",
        ]),
        isActive: true,
      },
    });

    console.log("✅ Billing plans seeded:", { starterPlan, proPlan, teamPlan });

    // Seed Resume Templates
    const modernTemplate = await prisma.resumeTemplate.upsert({
      where: { name: "Modern Professional" },
      update: {},
      create: {
        name: "Modern Professional",
        description:
          "Clean and modern design perfect for tech and creative industries",
        designJson: JSON.stringify({
          layout: "single-column",
          colors: { primary: "#6366f1", secondary: "#8b5cf6" },
          fonts: { heading: "Inter", body: "Open Sans" },
        }),
        thumbnail: "/templates/modern-professional.png",
        isPremium: false,
        isActive: true,
      },
    });

    const executiveTemplate = await prisma.resumeTemplate.upsert({
      where: { name: "Executive" },
      update: {},
      create: {
        name: "Executive",
        description: "Sophisticated design for senior-level positions",
        designJson: JSON.stringify({
          layout: "two-column",
          colors: { primary: "#1e293b", secondary: "#475569" },
          fonts: { heading: "Georgia", body: "Times New Roman" },
        }),
        thumbnail: "/templates/executive.png",
        isPremium: true,
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
        }),
        thumbnail: "/templates/creative.png",
        isPremium: true,
        isActive: true,
      },
    });

    console.log("✅ Resume templates seeded:", {
      modernTemplate,
      executiveTemplate,
      creativeTemplate,
    });

    // Seed sample coupons
    const welcomeCoupon = await prisma.coupon.upsert({
      where: { code: "WELCOME2024" },
      update: {},
      create: {
        code: "WELCOME2024",
        type: "percentage",
        value: 20, // 20% off
        maxUses: 100,
        usedCount: 0,
        expiresAt: new Date("2024-12-31"),
        isActive: true,
      },
    });

    console.log("✅ Sample coupons seeded:", { welcomeCoupon });

    console.log("🎉 Database seeding completed!");
    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    return NextResponse.json(
      { message: "Error seeding database", error: error },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  return seedDatabase();
}
