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
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { PlusCircle, Edit, Trash2, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Coupon {
  id: string;
  code: string;
  type: "PERCENTAGE" | "FIXED" | "FREE_TRIAL";
  value: number; // For PERCENTAGE, 0-100. For FIXED, amount in cents.
  maxUses: number | null;
  usedCount: number;
  expiresAt: string | null; // ISO string
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function CouponManagement() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  // Form states
  const [code, setCode] = useState("");
  const [type, setType] = useState<Coupon["type"]>("PERCENTAGE");
  const [value, setValue] = useState("");
  const [maxUses, setMaxUses] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/coupons");
      if (response.ok) {
        const data: Coupon[] = await response.json();
        setCoupons(data);
      } else {
        toast.error("Failed to fetch coupons.");
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
      toast.error("An unexpected error occurred while fetching coupons.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCode("");
    setType("PERCENTAGE");
    setValue("");
    setMaxUses("");
    setExpiresAt("");
    setIsActive(true);
    setEditingCoupon(null);
  };

  const openDialog = (coupon?: Coupon) => {
    if (coupon) {
      setEditingCoupon(coupon);
      setCode(coupon.code);
      setType(coupon.type);
      setValue(coupon.value.toString());
      setMaxUses(coupon.maxUses?.toString() || "");
      setExpiresAt(coupon.expiresAt ? format(new Date(coupon.expiresAt), "yyyy-MM-dd'T'HH:mm") : "");
      setIsActive(coupon.isActive);
    }
    setIsDialogOpen(true);
  };

  const handleSaveCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const couponData = {
      code: code.trim(),
      type,
      value: parseInt(value),
      maxUses: maxUses ? parseInt(maxUses) : null,
      expiresAt: expiresAt || null,
      isActive,
    };

    try {
      let response;
      if (editingCoupon) {
        // Update existing coupon
        response = await fetch(`/api/admin/coupons/${editingCoupon.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(couponData),
        });
      } else {
        // Create new coupon
        response = await fetch("/api/admin/coupons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(couponData),
        });
      }

      if (response.ok) {
        toast.success(editingCoupon ? "Coupon updated successfully!" : "Coupon created successfully!");
        fetchCoupons();
        setIsDialogOpen(false);
        resetForm();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to save coupon.");
      }
    } catch (error) {
      console.error("Error saving coupon:", error);
      toast.error("An unexpected error occurred while saving the coupon.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;

    try {
      const response = await fetch(`/api/admin/coupons/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Coupon deleted successfully!");
        fetchCoupons();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to delete coupon.");
      }
    } catch (error) {
      console.error("Error deleting coupon:", error);
      toast.error("An unexpected error occurred while deleting the coupon.");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Coupon Management</CardTitle>
          <CardDescription>Manage discount codes and promotions.</CardDescription>
        </div>
        <Button onClick={() => openDialog()}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Coupon
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : coupons.length === 0 ? (
          <p className="text-muted-foreground">No coupons found. Add one to get started!</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Max Uses</TableHead>
                <TableHead>Used</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium">{coupon.code}</TableCell>
                  <TableCell>{coupon.type}</TableCell>
                  <TableCell>
                    {coupon.type === "PERCENTAGE"
                      ? `${coupon.value}%`
                      : coupon.type === "FIXED"
                      ? `$${(coupon.value / 100).toFixed(2)}`
                      : "N/A"}
                  </TableCell>
                  <TableCell>{coupon.maxUses === null ? "Unlimited" : coupon.maxUses}</TableCell>
                  <TableCell>{coupon.usedCount}</TableCell>
                  <TableCell>
                    {coupon.expiresAt ? format(new Date(coupon.expiresAt), "MMM dd, yyyy HH:mm") : "Never"}
                  </TableCell>
                  <TableCell>{coupon.isActive ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openDialog(coupon)}
                      className="mr-2"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteCoupon(coupon.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingCoupon ? "Edit Coupon" : "Add New Coupon"}</DialogTitle>
            <DialogDescription>
              {editingCoupon ? "Make changes to this coupon." : "Create a new discount coupon."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveCoupon} className="grid gap-4 py-4">
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
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select value={type} onValueChange={(val: Coupon["type"]) => setType(val)} disabled={isSubmitting}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                  <SelectItem value="FIXED">Fixed Amount</SelectItem>
                  <SelectItem value="FREE_TRIAL">Free Trial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="value" className="text-right">
                Value
              </Label>
              <Input
                id="value"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="col-span-3"
                placeholder={type === "PERCENTAGE" ? "e.g., 10 for 10%" : "e.g., 500 for $5.00"}
                required
                disabled={isSubmitting || type === "FREE_TRIAL"}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="maxUses" className="text-right">
                Max Uses
              </Label>
              <Input
                id="maxUses"
                type="number"
                value={maxUses}
                onChange={(e) => setMaxUses(e.target.value)}
                className="col-span-3"
                placeholder="Leave blank for unlimited"
                disabled={isSubmitting}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expiresAt" className="text-right">
                Expires At
              </Label>
              <Input
                id="expiresAt"
                type="datetime-local"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="col-span-3"
                disabled={isSubmitting}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isActive" className="text-right">
                Active
              </Label>
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={setIsActive}
                className="col-span-3"
                disabled={isSubmitting}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : editingCoupon ? (
                  "Save changes"
                ) : (
                  "Create Coupon"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
