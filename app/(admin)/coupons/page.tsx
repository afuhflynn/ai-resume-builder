import { Metadata } from "next";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export const metadata: Metadata = {
  title: "Manage Coupons - Admin | Resumi",
  description: "Admin panel for managing coupons in the Resumi AI Resume Builder SaaS.",
};

// Placeholder data for coupons
const coupons = [
  {
    id: "coupon_1",
    code: "WELCOME20",
    type: "percentage",
    value: 20,
    maxUses: 100,
    usedCount: 45,
    expiresAt: "2024-12-31T23:59:59Z",
    isActive: true,
  },
  {
    id: "coupon_2",
    code: "FREEMONTH",
    type: "fixed_amount",
    value: 1, // Represents 1 month free
    maxUses: 50,
    usedCount: 50,
    expiresAt: "2024-10-15T23:59:59Z",
    isActive: false, // Already reached max uses
  },
  {
    id: "coupon_3",
    code: "SUMMERSALE",
    type: "percentage",
    value: 15,
    maxUses: null, // Unlimited uses
    usedCount: 120,
    expiresAt: null, // No expiration
    isActive: true,
  },
];

export default function AdminCouponsPage() {
  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Coupons</h2>
        <div className="flex items-center space-x-2">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Coupon
            </span>
          </Button>
        </div>
      </div>
      <p className="text-muted-foreground">
        Manage discount codes and promotional offers for your customers.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>All Coupons</CardTitle>
          <CardDescription>
            A list of all your coupons and their details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Uses</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead className="text-right">Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium">{coupon.code}</TableCell>
                  <TableCell>{coupon.type === "percentage" ? "Percentage Off" : "Fixed Amount Off"}</TableCell>
                  <TableCell>
                    {coupon.type === "percentage" ? `${coupon.value}%` : `$${coupon.value}`}
                  </TableCell>
                  <TableCell>
                    {coupon.usedCount}
                    {coupon.maxUses && ` / ${coupon.maxUses}`}
                    {!coupon.maxUses && ` (Unlimited)`}
                  </TableCell>
                  <TableCell>
                    {coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString() : "Never"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={coupon.isActive && coupon.usedCount < (coupon.maxUses || Infinity) && (!coupon.expiresAt || new Date(coupon.expiresAt) > new Date()) ? "default" : "destructive"}>
                      {coupon.isActive && coupon.usedCount < (coupon.maxUses || Infinity) && (!coupon.expiresAt || new Date(coupon.expiresAt) > new Date())
                        ? "Active"
                        : "Inactive"
                      }
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
