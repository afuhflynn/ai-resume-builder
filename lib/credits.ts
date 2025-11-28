import { prisma } from "./prisma";

export const AI_CREDIT_COSTS = {
  GENERATE_RESUME: 50,
  IMPROVE_SECTION: 10,
  COVER_LETTER: 20,
  PARSE_RESUME: 15,
  ATS_OPTIMIZATION: 25,
} as const;

export async function getUserCredits(userId: string): Promise<number> {
  const subscription = await prisma.subscription.findUnique({
    where: { userId },
    include: { billingPlan: true },
  });

  if (!subscription) {
    return 0; // Free tier has 0 credits
  }

  // Unlimited credits for Pro/Team plans
  if (subscription.billingPlan.aiCredits === -1) {
    return -1; // -1 represents unlimited
  }

  // Calculate used credits this billing period
  const periodStart = new Date(subscription.currentPeriodEnd);
  periodStart.setMonth(periodStart.getMonth() - 1);

  const usedCredits = await prisma.aIUsage.aggregate({
    where: {
      userId,
      createdAt: {
        gte: periodStart,
        lte: subscription.currentPeriodEnd,
      },
    },
    _sum: {
      creditsUsed: true,
    },
  });

  const totalUsed = usedCredits._sum.creditsUsed || 0;
  const remaining = subscription.billingPlan.aiCredits - totalUsed;

  return Math.max(0, remaining);
}

export async function deductCredits(
  userId: string,
  action: keyof typeof AI_CREDIT_COSTS,
  metadata?: Record<string, any>
): Promise<{ success: boolean; remaining: number; error?: string }> {
  const creditsNeeded = AI_CREDIT_COSTS[action];
  const available = await getUserCredits(userId);

  // Unlimited credits
  if (available === -1) {
    await prisma.aIUsage.create({
      data: {
        userId,
        action,
        creditsUsed: creditsNeeded,
        metadata: metadata || {},
      },
    });
    return { success: true, remaining: -1 };
  }

  // Insufficient credits
  if (available < creditsNeeded) {
    return {
      success: false,
      remaining: available,
      error: `Insufficient credits. Need ${creditsNeeded}, have ${available}`,
    };
  }

  // Deduct credits
  await prisma.aIUsage.create({
    data: {
      userId,
      action,
      creditsUsed: creditsNeeded,
      metadata: metadata || {},
    },
  });

  return {
    success: true,
    remaining: available - creditsNeeded,
  };
}

export async function getCreditUsageHistory(
  userId: string,
  limit: number = 10
) {
  return await prisma.aIUsage.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getCreditStats(userId: string) {
  const subscription = await prisma.subscription.findUnique({
    where: { userId },
    include: { billingPlan: true },
  });

  if (!subscription) {
    return {
      total: 0,
      used: 0,
      remaining: 0,
      unlimited: false,
    };
  }

  const unlimited = subscription.billingPlan.aiCredits === -1;

  if (unlimited) {
    const periodStart = new Date(subscription.currentPeriodEnd);
    periodStart.setMonth(periodStart.getMonth() - 1);

    const usedCredits = await prisma.aIUsage.aggregate({
      where: {
        userId,
        createdAt: {
          gte: periodStart,
          lte: subscription.currentPeriodEnd,
        },
      },
      _sum: {
        creditsUsed: true,
      },
    });

    return {
      total: -1,
      used: usedCredits._sum.creditsUsed || 0,
      remaining: -1,
      unlimited: true,
    };
  }

  const remaining = await getUserCredits(userId);
  const total = subscription.billingPlan.aiCredits;
  const used = total - remaining;

  return {
    total,
    used,
    remaining,
    unlimited: false,
  };
}
