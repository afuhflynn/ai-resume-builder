"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { FileText, Upload, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateResumePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async (type: "scratch" | "import" | "ai") => {
    if (!title) return;
    setIsLoading(true);

    // TODO: Implement actual creation logic
    // For now, just simulate a delay and redirect
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/resumes/new-id`); // Replace with actual ID
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-8">
      <div className="flex items-center gap-4">
        <Link href="/resumes">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Create New Resume
          </h1>
          <p className="text-muted-foreground">
            Choose how you want to start building your resume.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Label htmlFor="title" className="text-lg font-medium">
          Resume Title
        </Label>
        <Input
          id="title"
          placeholder="e.g. Software Engineer 2024"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="max-w-md text-lg p-6"
          autoFocus
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Start from Scratch */}
        <Card
          className={`cursor-pointer transition-all hover:border-primary hover:shadow-md ${
            !title ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={() => handleCreate("scratch")}
        >
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
              <FileText className="h-6 w-6" />
            </div>
            <CardTitle>Start from Scratch</CardTitle>
            <CardDescription>
              Build your resume step-by-step using our professional templates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
              <li>Choose from 10+ templates</li>
              <li>Guided section builder</li>
              <li>Real-time preview</li>
            </ul>
          </CardContent>
        </Card>

        {/* Import Existing */}
        <Card
          className={`cursor-pointer transition-all hover:border-primary hover:shadow-md ${
            !title ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={() => handleCreate("import")}
        >
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500">
              <Upload className="h-6 w-6" />
            </div>
            <CardTitle>Import Resume</CardTitle>
            <CardDescription>
              Upload your existing PDF or LinkedIn profile to get a head start.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
              <li>Supports PDF and DOCX</li>
              <li>Auto-fill sections</li>
              <li>Keep your existing content</li>
            </ul>
          </CardContent>
        </Card>

        {/* AI Generation */}
        <Card
          className={`cursor-pointer transition-all hover:border-primary hover:shadow-md ${
            !title ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={() => handleCreate("ai")}
        >
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 text-purple-500">
              <Sparkles className="h-6 w-6" />
            </div>
            <CardTitle>Generate with AI</CardTitle>
            <CardDescription>
              Let our AI write your resume based on your job title and
              experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
              <li>Tailored to job descriptions</li>
              <li>Professional phrasing</li>
              <li>Keyword optimized</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
