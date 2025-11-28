"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface HealthCheck {
  status: string;
  checks: { [key: string]: string };
  timestamp: string;
}

export function SystemHealth() {
  const [healthData, setHealthData] = useState<HealthCheck | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchHealthStatus();
  }, []);

  const fetchHealthStatus = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/health");
      if (response.ok) {
        const data: HealthCheck = await response.json();
        setHealthData(data);
        toast.success("System health refreshed.");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to fetch system health.");
      }
    } catch (error) {
      console.error("Error fetching system health:", error);
      toast.error("An unexpected error occurred while fetching system health.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>System Health</CardTitle>
          <CardDescription>Monitor the status of core services.</CardDescription>
        </div>
        <Button onClick={fetchHealthStatus} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading && !healthData ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : healthData ? (
          <div className="space-y-4">
            <div
              className={`flex items-center gap-2 text-lg font-semibold ${
                healthData.status === "Healthy"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {healthData.status === "Healthy" ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <XCircle className="h-5 w-5" />
              )}
              Overall Status: {healthData.status}
            </div>
            <p className="text-sm text-muted-foreground">
              Last checked: {new Date(healthData.timestamp).toLocaleString()}
            </p>

            <Separator />

            <div className="space-y-3">
              <h4 className="text-md font-medium">Service Checks:</h4>
              {Object.entries(healthData.checks).map(([service, status]) => (
                <div key={service} className="flex items-center gap-2">
                  {status === "Healthy" ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="font-medium capitalize">{service}:</span>
                  <span
                    className={
                      status === "Healthy" ? "text-green-500" : "text-red-500"
                    }
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">
            No health data available. Click refresh to check system status.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
