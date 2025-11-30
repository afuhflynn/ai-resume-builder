"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface FlutterwaveButtonProps {
  planId: string;
  planName: string;
  amount: number; // In USD cents, will be converted on backend
  className?: string;
}

export function FlutterwaveButton({
  planId,
  planName,
  amount,
  className,
}: FlutterwaveButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/payments/flutterwave/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initialize payment");
      }

      if (data.link) {
        window.location.href = data.link;
      } else {
        throw new Error("No payment link returned");
      }
    } catch (error: any) {
      console.error("Payment Error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading}
      className={className}
      variant="default"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        `Pay with Mobile Money / Card`
      )}
    </Button>
  );
}
