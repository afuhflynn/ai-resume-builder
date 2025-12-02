import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { z } from "zod";

// Schema for creating a new referral (primarily for admin manual creation/testing)
const createReferralSchema = z.object({
  referrerId: z.string().min(1, "Referrer ID is required"),
  referredId: z.string().min(1, "Referred ID is required"),
  code: z
    .string()
    .min(3, "Referral code must be at least 3 characters long")
    .max(50),
  creditsAwarded: z
    .number()
    .int()
    .min(0, "Credits awarded cannot be negative")
    .default(0),
  status: z
    .enum(["PENDING", "COMPLETED", "CANCELLED", "EXPIRED"])
    .default("PENDING"),
  completedAt: z.string().datetime().nullable().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!isAdmin(session?.session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const referrals = await prisma.referral.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        referrer: { select: { id: true, name: true, email: true } },
        referred: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json(referrals);
  } catch (error) {
    console.error("Admin referrals GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch referrals" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!isAdmin(session?.session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const validatedData = createReferralSchema.parse(body);

    // Check if referrerId and referredId exist
    const [referrerUser, referredUser] = await prisma.$transaction([
      prisma.user.findUnique({ where: { id: validatedData.referrerId } }),
      prisma.user.findUnique({ where: { id: validatedData.referredId } }),
    ]);

    if (!referrerUser) {
      return NextResponse.json(
        { error: "Referrer user not found" },
        { status: 404 }
      );
    }
    if (!referredUser) {
      return NextResponse.json(
        { error: "Referred user not found" },
        { status: 404 }
      );
    }

    const referral = await prisma.referral.create({
      data: {
        referrerId: validatedData.referrerId,
        referredId: validatedData.referredId,
        code: validatedData.code,
        creditsAwarded: validatedData.creditsAwarded,
        status: validatedData.status,
        completedAt: validatedData.completedAt
          ? new Date(validatedData.completedAt)
          : null,
      },
    });

    return NextResponse.json(referral, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    if (error.code === "P2002" && error.meta?.target?.includes("code")) {
      return NextResponse.json(
        { error: "Referral code already exists" },
        { status: 409 }
      );
    }
    console.error("Admin referrals POST error:", error);
    return NextResponse.json(
      { error: "Failed to create referral" },
      { status: 500 }
    );
  }
}
