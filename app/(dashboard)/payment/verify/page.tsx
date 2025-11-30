"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    const verifyPayment = async () => {
      const transactionId = searchParams.get("transaction_id");
      const txStatus = searchParams.get("status");

      if (!transactionId) {
        setStatus("error");
        setMessage("Invalid payment link. Transaction ID missing.");
        return;
      }

      if (txStatus === "cancelled") {
        setStatus("error");
        setMessage("Payment was cancelled.");
        return;
      }

      try {
        const response = await fetch("/api/payments/flutterwave/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transaction_id: transactionId }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setStatus("success");
          setMessage("Payment successful! Your subscription is now active.");
        } else {
          setStatus("error");
          setMessage(data.error || "Payment verification failed.");
        }
      } catch (error) {
        console.error("Verification Error:", error);
        setStatus("error");
        setMessage("An error occurred while verifying payment.");
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4 lg:p-8">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>Payment Status</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {status === "loading" && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
              <p className="text-muted-foreground">{message}</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle2 className="h-12 w-12 text-green-500" />
              <p className="text-lg font-medium text-green-700">{message}</p>
              <Button
                className="mt-4"
                onClick={() => router.push("/dashboard")}
              >
                Go to Dashboard
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="h-12 w-12 text-red-500" />
              <p className="text-lg font-medium text-red-700">{message}</p>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => router.push("/billing")}
                >
                  Try Again
                </Button>
                <Button onClick={() => router.push("/dashboard")}>
                  Go to Dashboard
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaymentVerifyPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
