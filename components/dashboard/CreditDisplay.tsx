"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CreditStats {
  total: number;
  used: number;
  remaining: number;
  unlimited: boolean;
}

export function CreditDisplay() {
  const [stats, setStats] = useState<CreditStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/credits/stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch credit stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">AI Credits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-4 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  if (!stats) return null;

  if (stats.unlimited) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">AI Credits</CardTitle>
          <Sparkles className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Unlimited</div>
          <p className="text-xs text-muted-foreground">
            {stats.used} credits used this period
          </p>
        </CardContent>
      </Card>
    );
  }

  const percentage =
    stats.total > 0 ? (stats.remaining / stats.total) * 100 : 0;
  const isLow = percentage < 20;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">AI Credits</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {stats.remaining} / {stats.total}
        </div>
        <Progress value={percentage} className="mt-2" />
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-muted-foreground">
            {stats.used} used this month
          </p>
          {isLow && (
            <Link href="/billing">
              <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                Upgrade
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
