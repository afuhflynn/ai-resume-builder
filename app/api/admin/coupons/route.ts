import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { z } from "zod";

// Schema for creating a new coupon
const createCouponSchema = z.object({
  code: z.string().min(3, "Coupon code must be at least 3 characters long").max(50),
  type: z.enum(["PERCENTAGE", "FIXED", "FREE_TRIAL"]),
  value: z.number().int().min(0, "Value cannot be negative"), // Percentage (0-100) or fixed amount in cents
  maxUses: z.number().int().min(1, "Max uses must be at least 1").optional(),
  expiresAt: z.string().datetime().optional(), // ISO string date
  isActive: z.boolean().default(true),
});

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(coupons);
  } catch (error) {
    console.error("Admin coupons GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch coupons" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const validatedData = createCouponSchema.parse(body);

    const coupon = await prisma.coupon.create({
      data: {
        code: validatedData.code.toUpperCase(), // Store codes in uppercase
        type: validatedData.type,
        value: validatedData.value,
        maxUses: validatedData.maxUses,
        expiresAt: validatedData.expiresAt ? new Date(validatedData.expiresAt) : null,
        isActive: validatedData.isActive,
      },
    });

    return NextResponse.json(coupon, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Admin coupons POST error:", error);
    return NextResponse.json(
      { error: "Failed to create coupon" },
      { status: 500 },
    );
  }
}
