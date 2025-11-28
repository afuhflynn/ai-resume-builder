"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useBetterAuth } from "@/providers/BetterAuthProvider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Plus,
  FileText,
  Sparkles,
  ArrowRight,
  Clock,
  Loader2,
} from "lucide-react";
import { CreditDisplay } from "@/components/dashboard/CreditDisplay";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface Resume {
  id: string;
  title: string;
  updatedAt: string;
  completeness: number;
}

export default function DashboardPage() {
  const { user } = useBetterAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch("/api/resumes");
        if (!response.ok) throw new Error("Failed to fetch resumes");
        const data = await response.json();
        setResumes(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load resumes");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumes();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || "User"}. Here's what's happening with
            your resumes.
          </p>
        </div>
        <Link href="/resumes/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create New Resume
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumes.length}</div>
            <p className="text-xs text-muted-foreground">
              {isLoading ? "Loading..." : "Saved resumes"}
            </p>
          </CardContent>
        </Card>
        <CreditDisplay />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cover Letters</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AI</div>
            <p className="text-xs text-muted-foreground">Powered Generator</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Resumes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Recent Resumes
          </h2>
          <Link
            href="/resumes"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : resumes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resumes.slice(0, 3).map((resume) => (
              <Link key={resume.id} href={`/resumes/${resume.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="truncate">{resume.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(resume.updatedAt), {
                        addSuffix: true,
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Completeness
                        </span>
                        <span className="font-medium">
                          {resume.completeness}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${resume.completeness}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" size="sm">
                      Edit Resume
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No resumes yet</h3>
              <p className="text-muted-foreground max-w-sm mb-6">
                Create your first AI-powered resume to stand out from the crowd
                and land your dream job.
              </p>
              <Link href="/resumes/create">
                <Button>Create Your First Resume</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
