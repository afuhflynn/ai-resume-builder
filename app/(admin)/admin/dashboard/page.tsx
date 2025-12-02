import { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  DollarSign,
  CreditCard,
  Sparkles,
  Percent,
  Link,
  HeartPulse,
} from "lucide-react";
import { CouponManagement } from "@/components/admin/CouponManagement";
import { ReferralManagement } from "@/components/admin/ReferralManagement";
import { SystemHealth } from "@/components/admin/SystemHealth";

export const metadata: Metadata = {
  title: "Admin Dashboard - Resumi",
  description: "Admin panel for managing the Resumi AI Resume Builder SaaS.",
};

export default async function AdminDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!isAdmin(session?.session)) {
    redirect("/login"); // Or to a specific unauthorized page
  }

  // Fetch data for admin dashboard
  const totalUsers = await prisma.user.count();
  const totalRevenueCents = await prisma.paymentHistory.aggregate({
    _sum: {
      amountCents: true,
    },
    where: {
      status: "completed", // Only sum completed payments
    },
  });
  const activeSubscriptions = await prisma.subscription.count({
    where: {
      status: "active",
      cancelAtPeriodEnd: false,
    },
  });
  const totalAiGenerations = await prisma.aIUsage.count({
    where: {
      action: "GENERATE_RESUME", // Assuming this is the action for full resume generation
    },
  });

  const totalRevenue = (totalRevenueCents._sum.amountCents || 0) / 100; // Convert cents to dollars

  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      </div>
      <p className="text-muted-foreground">
        Welcome to the admin dashboard. Here you can monitor and manage system
        metrics and features.
      </p>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="gap-2">
            <Users className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="coupons" className="gap-2">
            <Percent className="h-4 w-4" /> Coupons
          </TabsTrigger>
          <TabsTrigger value="referrals" className="gap-2">
            <Link className="h-4 w-4" /> Referrals
          </TabsTrigger>
          <TabsTrigger value="health" className="gap-2">
            <HeartPulse className="h-4 w-4" /> System Health
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Card for Total Users */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                <h3 className="text-sm font-medium tracking-tight">
                  Total Users
                </h3>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-bold">
                  {totalUsers.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground"></p>{" "}
                {/* Can add trend if data allows */}
              </div>
            </div>

            {/* Card for Total Revenue */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                <h3 className="text-sm font-medium tracking-tight">
                  Total Revenue
                </h3>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-bold">
                  $
                  {totalRevenue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <p className="text-xs text-muted-foreground"></p>{" "}
                {/* Can add trend if data allows */}
              </div>
            </div>

            {/* Card for Active Subscriptions */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                <h3 className="text-sm font-medium tracking-tight">
                  Active Subscriptions
                </h3>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-bold">
                  {activeSubscriptions.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground"></p>{" "}
                {/* Can add trend if data allows */}
              </div>
            </div>

            {/* Card for AI Usage */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                <h3 className="text-sm font-medium tracking-tight">
                  AI Generations
                </h3>
                <Sparkles className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-bold">
                  {totalAiGenerations.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground"></p>{" "}
                {/* Can add trend if data allows */}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="coupons" className="space-y-4">
          <CouponManagement />
        </TabsContent>

        <TabsContent value="referrals" className="space-y-4">
          <ReferralManagement />
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <SystemHealth />
        </TabsContent>
      </Tabs>
    </main>
  );
}
