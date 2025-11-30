"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, ArrowRight, FileText } from "lucide-react";
import { CoverLetterChat } from "@/components/resume/CoverLetterChat";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CoverLetterPage() {
  const [step, setStep] = useState<"info" | "chat">("info");
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    jobDescription: "",
    resumeId: "",
    tone: "professional" as "professional" | "enthusiastic" | "formal",
  });

  const handleStartGeneration = () => {
    // Validate required fields
    if (
      !formData.companyName ||
      !formData.jobTitle ||
      !formData.jobDescription
    ) {
      return;
    }
    setStep("chat");
  };

  if (step === "chat") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Cover Letter Generator
            </h1>
            <p className="text-muted-foreground">
              Generating cover letter for {formData.jobTitle} at{" "}
              {formData.companyName}
            </p>
          </div>
          <Button variant="outline" onClick={() => setStep("info")}>
            Back to Info
          </Button>
        </div>

        <CoverLetterChat initialData={formData} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 px-4 p-4 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Cover Letter Generator
        </h1>
        <p className="text-muted-foreground">
          Create tailored cover letters with AI assistance.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Job Information
          </CardTitle>
          <CardDescription>
            Provide details about the job you're applying for to generate a
            personalized cover letter.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyName">
                Company Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="companyName"
                placeholder="e.g. Google"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle">
                Job Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="jobTitle"
                placeholder="e.g. Senior Software Engineer"
                value={formData.jobTitle}
                onChange={(e) =>
                  setFormData({ ...formData, jobTitle: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobDescription">
              Job Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="jobDescription"
              placeholder="Paste the job description here..."
              value={formData.jobDescription}
              onChange={(e) =>
                setFormData({ ...formData, jobDescription: e.target.value })
              }
              rows={8}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Include key responsibilities, requirements, and qualifications
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select
                value={formData.tone}
                onValueChange={(value: any) =>
                  setFormData({ ...formData, tone: value })
                }
              >
                <SelectTrigger id="tone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resumeId">Resume (Optional)</Label>
              <Select
                value={formData.resumeId}
                onValueChange={(value) =>
                  setFormData({ ...formData, resumeId: value })
                }
              >
                <SelectTrigger id="resumeId">
                  <SelectValue placeholder="Select a resume" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No resume selected</SelectItem>
                  {/* TODO: Fetch user's resumes and populate here */}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Select a resume to tailor the cover letter to your experience
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              size="lg"
              onClick={handleStartGeneration}
              disabled={
                !formData.companyName ||
                !formData.jobTitle ||
                !formData.jobDescription
              }
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Generate Cover Letter
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg">How it works</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                1
              </span>
              <span>Provide job details and paste the job description</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                2
              </span>
              <span>AI analyzes the job requirements and your background</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                3
              </span>
              <span>
                Chat with AI to refine and personalize your cover letter
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                4
              </span>
              <span>Download or copy your polished cover letter</span>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
