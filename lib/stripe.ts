import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
  typescript: true,
});

export const BILLING_PLANS = {
  STARTER: {
    name: "Starter",
    priceId: process.env.STRIPE_STARTER_PRICE_ID!,
    price: 9.99,
    interval: "month" as const,
    credits: 100,
    features: [
      "100 AI credits",
      "Basic templates",
      "Resume export (PDF)",
      "Email support",
    ],
  },
  PRO: {
    name: "Pro",
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    price: 29.99,
    interval: "month" as const,
    credits: -1, // unlimited
    features: [
      "Unlimited AI credits",
      "All premium templates",
      "Cover letter generator",
      "ATS optimization",
      "Priority support",
      "Resume analytics",
    ],
  },
  TEAM: {
    name: "Team",
    priceId: process.env.STRIPE_TEAM_PRICE_ID!,
    price: 99.99,
    interval: "month" as const,
    credits: -1, // unlimited
    features: [
      "Everything in Pro",
      "Shared workspaces",
      "Team collaboration",
      "Admin dashboard",
      "Custom branding",
      "Dedicated support",
      "API access",
    ],
  },
};

export async function createCheckoutSession(
  userId: string,
  planKey: keyof typeof BILLING_PLANS
) {
  const plan = BILLING_PLANS[planKey];

  const session = await stripe.checkout.sessions.create({
    customer_email: undefined, // Will be filled from user data
    client_reference_id: userId,
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: plan.priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXTAUTH_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
    metadata: {
      userId,
      planKey,
    },
  });

  return session;
}

export async function createBillingPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXTAUTH_URL}/dashboard/billing`,
  });

  return session;
}

export async function recordAIUsage(userId: string, creditsUsed: number) {
  // This will be implemented with Prisma
  // For now, just return success
  return { success: true, creditsUsed };
}
