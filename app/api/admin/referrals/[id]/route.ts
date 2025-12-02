import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { z } from "zod";

// Schema for updating an existing referral
const updateReferralSchema = z.object({
  referrerId: z.string().min(1, "Referrer ID is required").optional(),
  referredId: z.string().min(1, "Referred ID is required").optional(),
  code: z
    .string()
    .min(3, "Referral code must be at least 3 characters long")
    .max(50)
    .optional(),
  creditsAwarded: z
    .number()
    .int()
    .min(0, "Credits awarded cannot be negative")
    .optional(),
  status: z.enum(["PENDING", "COMPLETED", "CANCELLED", "EXPIRED"]).optional(),
  completedAt: z.string().datetime().nullable().optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = params;
    const body = await req.json();
    const validatedData = updateReferralSchema.parse(body);

    // Optional: Check if referrerId and referredId exist if they are being updated
    if (validatedData.referrerId) {
      const referrerUser = await prisma.user.findUnique({
        where: { id: validatedData.referrerId },
      });
      if (!referrerUser) {
        return NextResponse.json(
          { error: "Referrer user not found" },
          { status: 404 }
        );
      }
    }
    if (validatedData.referredId) {
      const referredUser = await prisma.user.findUnique({
        where: { id: validatedData.referredId },
      });
      if (!referredUser) {
        return NextResponse.json(
          { error: "Referred user not found" },
          { status: 404 }
        );
      }
    }

    const updatedReferral = await prisma.referral.update({
      where: { id },
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

    return NextResponse.json(updatedReferral);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    if (error.code === "P2025") {
      // Prisma error for record not found
      return NextResponse.json(
        { error: "Referral not found" },
        { status: 404 }
      );
    }
    console.error("Admin referrals PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update referral" },
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

    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = params;

    await prisma.referral.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Referral deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === "P2025") {
      // Prisma error for record not found
      return NextResponse.json(
        { error: "Referral not found" },
        { status: 404 }
      );
    }
    console.error("Admin referrals DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete referral" },
      { status: 500 }
    );
  }
}
