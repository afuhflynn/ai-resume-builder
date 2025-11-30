import { NextRequest, NextResponse } from "next/server";
import { verifyTransaction } from "@/lib/flutterwave";
import { prisma } from "@/lib/prisma";
import { sendPaymentReceipt } from "@/lib/email/sender";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { transaction_id } = body;

    if (!transaction_id) {
      return NextResponse.json(
        { error: "Transaction ID is required" },
        { status: 400 }
      );
    }

    const response = await verifyTransaction(transaction_id);

    if (
      response.status === "success" &&
      response.data.status === "successful"
    ) {
      const { meta, amount, customer } = response.data;
      const userId = meta?.userId;
      const planId = meta?.planId;

      if (!userId || !planId) {
        return NextResponse.json(
          { error: "Invalid transaction metadata" },
          { status: 400 }
        );
      }

      // Activate Subscription
      const plan = await prisma.billingPlan.findUnique({
        where: { id: planId },
      });

      if (!plan) {
        return NextResponse.json({ error: "Plan not found" }, { status: 404 });
      }

      // Calculate period end (1 month from now)
      const currentPeriodEnd = new Date();
      currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);

      await prisma.subscription.upsert({
        where: { userId },
        update: {
          billingPlanId: planId,
          status: "active",
          currentPeriodEnd,
          stripeSubscriptionId: `flw_${transaction_id}`, // Use FLW ID as placeholder
        },
        create: {
          userId,
          billingPlanId: planId,
          status: "active",
          currentPeriodEnd,
          stripeSubscriptionId: `flw_${transaction_id}`,
        },
      });

      // Send receipt
      if (customer.email) {
        await sendPaymentReceipt(customer.email, plan.name, amount * 100); // Amount in cents? No, amount is likely raw value here.
        // Wait, sendPaymentReceipt expects cents?
        // In sender.ts: const formattedAmount = ... format(amount / 100)
        // So yes, it expects cents. Flutterwave returns raw amount (e.g. 5000).
        // So we should pass amount * 100.
      }

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Flutterwave Verify Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
