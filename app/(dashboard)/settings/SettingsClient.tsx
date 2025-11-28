"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, CreditCard } from "lucide-react";
import { BillingClient } from "@/app/(dashboard)/billing/BillingClient";

interface SettingsClientProps {
  user: any;
  subscription: any;
}

export function SettingsClient({ user, subscription }: SettingsClientProps) {
  return (
    <Tabs defaultValue="profile" className="space-y-4">
      <TabsList>
        <TabsTrigger value="profile" className="gap-2">
          <User className="h-4 w-4" /> Profile
        </TabsTrigger>
        <TabsTrigger value="billing" className="gap-2">
          <CreditCard className="h-4 w-4" /> Billing
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={user?.name || ""} disabled />
              <p className="text-xs text-muted-foreground">
                Your name as it appears on your profile.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue={user?.email || ""} disabled />
              <p className="text-xs text-muted-foreground">
                Your email address used for login and notifications.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled>Save Changes</Button>
          </CardFooter>
        </Card>
        <Button onClick={() => (window.location.href = "/api/gdpr/export")}>
          Export Data
        </Button>
      </TabsContent>

      <TabsContent value="billing" className="space-y-4">
        <div className="border rounded-lg p-6 bg-card">
          <BillingClient subscription={subscription} user={user} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
