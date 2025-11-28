"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Edit, Trash2, Loader2, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Referral {
  id: string;
  referrerId: string;
  referredId: string;
  code: string;
  creditsAwarded: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED" | "EXPIRED";
  createdAt: string;
  completedAt: string | null;
  referrer: {
    id: string;
    name: string;
    email: string;
  };
  referred: {
    id: string;
    name: string;
    email: string;
  };
}

export function ReferralManagement() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingReferral, setEditingReferral] = useState<Referral | null>(null);

  // Form states
  const [referrerId, setReferrerId] = useState("");
  const [referredId, setReferredId] = useState("");
  const [code, setCode] = useState("");
  const [creditsAwarded, setCreditsAwarded] = useState("");
  const [status, setStatus] = useState<Referral["status"]>("PENDING");
  const [completedAt, setCompletedAt] = useState("");

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/referrals");
      if (response.ok) {
        const data: Referral[] = await response.json();
        setReferrals(data);
      } else {
        toast.error("Failed to fetch referrals.");
      }
    } catch (error) {
      console.error("Error fetching referrals:", error);
      toast.error("An unexpected error occurred while fetching referrals.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setReferrerId("");
    setReferredId("");
    setCode("");
    setCreditsAwarded("");
    setStatus("PENDING");
    setCompletedAt("");
    setEditingReferral(null);
  };

  const openDialog = (referral?: Referral) => {
    if (referral) {
      setEditingReferral(referral);
      setReferrerId(referral.referrerId);
      setReferredId(referral.referredId);
      setCode(referral.code);
      setCreditsAwarded(referral.creditsAwarded.toString());
      setStatus(referral.status);
      setCompletedAt(
        referral.completedAt
          ? format(new Date(referral.completedAt), "yyyy-MM-dd\'T\'HH:mm")
          : "",
      );
    }
    setIsDialogOpen(true);
  };

  const handleSaveReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const referralData = {
      referrerId: referrerId.trim(),
      referredId: referredId.trim(),
      code: code.trim(),
      creditsAwarded: parseInt(creditsAwarded),
      status,
      completedAt: completedAt || null,
    };

    try {
      let response;
      if (editingReferral) {
        // Update existing referral
        response = await fetch(`/api/admin/referrals/${editingReferral.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(referralData),
        });
      } else {
        // Create new referral (admin can manually add)
        response = await fetch("/api/admin/referrals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(referralData),
        });
      }

      if (response.ok) {
        toast.success(
          editingReferral ? "Referral updated successfully!" : "Referral created successfully!",
        );
        fetchReferrals();
        setIsDialogOpen(false);
        resetForm();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to save referral.");
      }
    } catch (error) {
      console.error("Error saving referral:", error);
      toast.error("An unexpected error occurred while saving the referral.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReferral = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this referral?")) return;

    try {
      const response = await fetch(`/api/admin/referrals/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Referral deleted successfully!");
        fetchReferrals();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to delete referral.");
      }
    } catch (error) {
      console.error("Error deleting referral:", error);
      toast.error("An unexpected error occurred while deleting the referral.");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Referral Management</CardTitle>
          <CardDescription>View and manage user referral activities.</CardDescription>
        </div>
        {/* <Button onClick={() => openDialog()}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Referral
        </Button> */}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : referrals.length === 0 ? (
          <p className="text-muted-foreground">No referrals found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Referrer</TableHead>
                <TableHead>Referred User</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Completed At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referrals.map((referral) => (
                <TableRow key={referral.id}>
                  <TableCell className="font-medium">{referral.code}</TableCell>
                  <TableCell>{referral.referrer.name || referral.referrer.email}</TableCell>
                  <TableCell>{referral.referred.name || referral.referred.email}</TableCell>
                  <TableCell>{referral.creditsAwarded}</TableCell>
                  <TableCell>{referral.status}</TableCell>
                  <TableCell>{format(new Date(referral.createdAt), "MMM dd, yyyy")}</TableCell>
                  <TableCell>
                    {referral.completedAt
                      ? format(new Date(referral.completedAt), "MMM dd, yyyy HH:mm")
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openDialog(referral)}
                      className="mr-2"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteReferral(referral.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}\
            </TableBody>
          </Table>
        )}\
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingReferral ? "Edit Referral" : "Add New Referral"}</DialogTitle>
            <DialogDescription>
              {editingReferral ? "Make changes to this referral." : "Manually create a new referral."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveReferral} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="referrerId" className="text-right">
                Referrer ID
              </Label>
              <Input
                id="referrerId"
                value={referrerId}
                onChange={(e) => setReferrerId(e.target.value)}
                className="col-span-3"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="referredId" className="text-right">
                Referred ID
              </Label>
              <Input
                id="referredId"
                value={referredId}
                onChange={(e) => setReferredId(e.target.value)}
                className="col-span-3"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Code
              </Label>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="col-span-3"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="creditsAwarded" className="text-right">
                Credits
              </Label>
              <Input
                id="creditsAwarded"
                type="number"
                value={creditsAwarded}
                onChange={(e) => setCreditsAwarded(e.target.value)}
                className="col-span-3"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select value={status} onValueChange={(val: Referral["status"]) => setStatus(val)} disabled={isSubmitting}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  <SelectItem value="EXPIRED">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="completedAt" className="text-right">
                Completed At
              </Label>
              <Input
                id="completedAt"
                type="datetime-local"
                value={completedAt}
                onChange={(e) => setCompletedAt(e.target.value)}
                className="col-span-3"
                disabled={isSubmitting}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : editingReferral ? (
                  "Save changes"
                ) : (
                  "Create Referral"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
