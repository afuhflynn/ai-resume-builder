import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resumi - Dashboard, Resumes, Billing, ...",
  description: "Generate professional resumes with AI",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* Mobile Header */}
      <MobileNav />

      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar */}

        <DashboardSidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background">{children}</main>
      </div>
    </div>
  );
}
