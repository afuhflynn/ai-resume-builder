"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useBetterAuth } from "@/providers/BetterAuthProvider";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Settings,
  CreditCard,
  LogOut,
  Plus,
  Sparkles,
  Menu,
  X,
  LayoutDashboardIcon,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { signOut, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const user = session?.user;

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Resumes", href: "/resumes", icon: FileText },
    { name: "Cover Letters", href: "/cover-letter", icon: Sparkles },
    { name: "Billing", href: "/billing", icon: CreditCard },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const handleSignOut = () => {
    signOut({
      fetchOptions: {
        onRequest() {
          toast.info("Sign out in progress");
        },
        onError() {
          toast.error("Signout failed. Try again");
        },
        onSuccess() {
          toast.success("Signout successful!. See you again next time");
          router.push("/dashboard");
        },
      },
    });
  };

  return (
    <div className="min-h-screen">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <FileText className="h-6 w-6" />
          <span>Resumi</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}

        <SidebarProvider className="w-auto! bg-background!">
          <Sidebar
            className={cn(
              "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <SidebarContent className="flex flex-col h-full">
              <SidebarHeader>
                <div className="p-6 hidden lg:flex items-center gap-2 font-bold text-2xl text-primary">
                  <FileText className="h-8 w-8" />
                  <span>Resumi</span>
                </div>

                <div className="p-4">
                  <Link href="/resumes/create">
                    <Button className="w-full gap-2">
                      <Plus className="h-4 w-4" />
                      New Resume
                    </Button>
                  </Link>
                </div>
              </SidebarHeader>

              <SidebarMenu className="flex-1 px-4 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.name} href={item.href}>
                      <SidebarMenuItem>
                        <span
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.name}
                        </span>
                      </SidebarMenuItem>
                    </Link>
                  );
                })}
              </SidebarMenu>

              <div className="p-4 border-t space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {user?.name?.[0] || "U"}
                    </div>
                    <div className="text-sm">
                      <p className="font-medium truncate max-w-[120px]">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate max-w-[120px]">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <ThemeToggle />
                </div>
                <Button
                  variant="outline"
                  className="w-full gap-2 text-muted-foreground"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background">{children}</main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
