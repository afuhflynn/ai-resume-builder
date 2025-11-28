import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { z } from "zod";

// Schema for updating an existing coupon
const updateCouponSchema = z.object({
  code: z.string().min(3, "Coupon code must be at least 3 characters long").max(50).optional(),
  type: z.enum(["PERCENTAGE", "FIXED", "FREE_TRIAL"]).optional(),
  value: z.number().int().min(0, "Value cannot be negative").optional(), // Percentage (0-100) or fixed amount in cents
  maxUses: z.number().int().min(1, "Max uses must be at least 1").optional(),
  expiresAt: z.string().datetime().nullable().optional(), // ISO string date, can be null
  isActive: z.boolean().optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
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
    const validatedData = updateCouponSchema.parse(body);

    const updatedCoupon = await prisma.coupon.update({
      where: { id },
      data: {
        code: validatedData.code?.toUpperCase(),
        type: validatedData.type,
        value: validatedData.value,
        maxUses: validatedData.maxUses,
        expiresAt: validatedData.expiresAt ? new Date(validatedData.expiresAt) : null,
        isActive: validatedData.isActive,
      },
    });

    return NextResponse.json(updatedCoupon);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    if (error.code === "P2025") { // Prisma error for record not found
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
    }
    console.error("Admin coupons PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update coupon" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = params;

    await prisma.coupon.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Coupon deleted successfully" }, { status: 200 });
  } catch (error: any) {
    if (error.code === "P2025") { // Prisma error for record not found
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
    }
    console.error("Admin coupons DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete coupon" },
      { status: 500 },
    );
  }
}
