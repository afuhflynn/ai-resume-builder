"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { BILLING_PLANS } from "@/lib/stripe";
import { toast } from "sonner";

interface BillingClientProps {
  subscription: any;
  user: any;
}

export function BillingClient({ subscription, user }: BillingClientProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async (planKey: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to start checkout");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePortal = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to open billing portal");
    } finally {
      setIsLoading(false);
    }
  };

  const currentPlanName = subscription?.billingPlan?.name || "Free";

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Current Subscription</CardTitle>
          <CardDescription>
            Manage your billing and subscription details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{currentPlanName} Plan</div>
              <p className="text-sm text-muted-foreground">
                {subscription?.status === "active"
                  ? `Renews on ${new Date(
                      subscription.currentPeriodEnd
                    ).toLocaleDateString()}`
                  : "Upgrade to unlock premium features"}
              </p>
            </div>
            {subscription && (
              <Button
                onClick={handlePortal}
                disabled={isLoading}
                variant="outline"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Manage Subscription
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xl font-bold mb-4">Available Plans</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {Object.entries(BILLING_PLANS).map(([key, plan]) => {
            const isCurrent = currentPlanName === plan.name;
            return (
              <Card key={key} className={isCurrent ? "border-primary" : ""}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>
                    ${plan.price}/{plan.interval}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => handleCheckout(key)}
                    disabled={isLoading || isCurrent}
                    variant={isCurrent ? "secondary" : "default"}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {isCurrent ? "Current Plan" : `Upgrade to ${plan.name}`}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
