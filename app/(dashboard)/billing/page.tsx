import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BillingClient } from "./BillingClient";

export default async function BillingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
    include: { billingPlan: true },
  });

  const plans = await prisma.billingPlan.findMany({
    where: { isActive: true },
  });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 lg:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Billing & Subscription
        </h2>
      </div>
      <BillingClient
        subscription={subscription}
        user={session.user}
        plans={plans}
      />
    </div>
  );
}
