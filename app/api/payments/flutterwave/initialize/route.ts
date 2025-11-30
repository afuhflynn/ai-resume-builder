import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { initializePayment } from "@/lib/flutterwave";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { planId } = body;

    if (!planId) {
      return NextResponse.json(
        { error: "Plan ID is required" },
        { status: 400 }
      );
    }

    const plan = await prisma.billingPlan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    // Generate unique transaction reference
    const tx_ref = `resumi-${nanoid(12)}`;

    // Calculate amount in XAF (Assuming priceCents is in USD cents, conversion needed?)
    // The user requested XAF. If the plan price is in USD, we need a conversion rate.
    // For now, I'll assume the priceCents is USD and use a fixed rate or just use the number as is if the plan was created for XAF.
    // However, the seed data has priceCents 999 ($9.99). 10 USD is approx 6000 XAF.
    // I'll add a simple conversion or assume the plan has a specific XAF price.
    // To keep it simple and robust, I'll use a fixed conversion rate of 1 USD = 600 XAF for this implementation.
    const conversionRate = 600;
    const amountXAF = Math.round((plan.priceCents / 100) * conversionRate);

    const payload = {
      tx_ref,
      amount: amountXAF.toString(),
      currency: "XAF",
      redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/verify`,
      payment_options: "card,mobilemoney",
      customer: {
        email: session.user.email,
        name: session.user.name || "Resumi User",
        phonenumber: "", // Optional, can be collected if needed
      },
      customizations: {
        title: `Resumi ${plan.name} Plan`,
        description: `Subscription to ${plan.name} plan`,
        logo: "https://resumi.ai/logo.png", // Replace with actual logo URL
      },
      meta: {
        userId: session.user.id,
        planId: plan.id,
      },
    };

    const response = await initializePayment(payload);

    if (response.status === "success") {
      return NextResponse.json({ link: response.data.link });
    } else {
      return NextResponse.json(
        { error: "Failed to initialize payment" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Flutterwave Init Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
