"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBetterAuth } from "@/providers/BetterAuthProvider";

const VerifyEmailPage = () => {
  const router = useRouter();
  const { user } = useBetterAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/10 via-background to-accent/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Verify your email
          </CardTitle>
          <CardDescription>
            A verification link has been sent to your email address. Please
            click the link to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 flex flex-col">
          {user ? (
            <p>
              If you didn&apos;t receive the email, please check your spam
              folder.
            </p>
          ) : (
            <p>
              If you didn&apos;t receive the email, please check your spam
              folder. You may need to sign in again.
            </p>
          )}
          <Button onClick={() => router.refresh()}>
            Resend Verification Email
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
