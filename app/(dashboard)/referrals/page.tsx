"use client";

import { useState, useEffect } from "react";
import { Copy, Gift, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function ReferralsPage() {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReferralCode = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/referral", {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error("Failed to generate referral code.");
        }
        const data = await response.json();
        setReferralCode(data.code);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred.";
        setError(errorMessage);

        toast.error("Error", {
          description:
            "Could not fetch your referral code. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferralCode();
  }, []);

  const referralLink = referralCode
    ? `${window.location.origin}/signup?ref=${referralCode}`
    : "";

  const handleCopy = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Your referral link has been copied to the clipboard.",
    });

    toast.success("Success", {
      description: "Your referral link has been copied to the clipboard.",
    });
  };

  // Placeholder stats - to be replaced with actual data from the backend
  const successfulReferrals = 0;
  const creditsEarned = successfulReferrals * 50;

  return (
    <div className="space-y-6 p-4 lg:p-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Referrals</h1>
        <p className="text-muted-foreground">
          Invite friends and earn AI credits for every successful referral.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
          <CardDescription>
            Share this link with your friends. When they sign up, you'll earn 50
            credits.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : error ? (
              <Input
                value="Could not load your referral link"
                disabled
                className="border-destructive text-destructive"
              />
            ) : (
              <Input value={referralLink} readOnly />
            )}
            <Button
              aria-label="Copy referral link"
              size="icon"
              onClick={handleCopy}
              disabled={isLoading || !!error}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Successful Referrals
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successfulReferrals}</div>
            <p className="text-xs text-muted-foreground">
              Total friends who have signed up using your link.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Credits Earned
            </CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{creditsEarned}</div>
            <p className="text-xs text-muted-foreground">
              Total AI credits earned from your referrals.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
