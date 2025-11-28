"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function AiGenerateResumePage() {
  const router = useRouter();
  const [resumeTitle, setResumeTitle] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAiGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeTitle.trim() || !jobTitle.trim() || !experience.trim()) {
      toast.error("Please provide a resume title, desired job title, and your experience.");
      return;
    }

    setIsLoading(true);
    toast.info("Generating your resume with AI...");

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: resumeTitle, jobTitle, experience }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Resume generated successfully!");
        router.push(`/resumes/${data.resumeId}`); // Assuming API returns resumeId
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to generate resume with AI.");
      }
    } catch (error) {
      console.error("AI resume generation error:", error);
      toast.error("An unexpected error occurred during AI resume generation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/resumes/create">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Generate with AI</h1>
          <p className="text-muted-foreground">
            Let our AI craft a professional resume for you.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Resume Generator</CardTitle>
          <CardDescription>
            Provide some details, and our AI will create a tailored resume.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAiGenerate} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="resumeTitle">Resume Title</Label>
              <Input
                id="resumeTitle"
                placeholder="e.g., AI Generated Software Engineer Resume"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                required
                disabled={isLoading}
              />
              <p className="text-sm text-muted-foreground">
                A title for your new AI-generated resume.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Desired Job Title</Label>
              <Input
                id="jobTitle"
                placeholder="e.g., Senior Software Engineer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
                disabled={isLoading}
              />
              <p className="text-sm text-muted-foreground">
                The job title you are applying for or aspiring to.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Your Key Experience/Skills</Label>
              <Textarea
                id="experience"
                placeholder="e.g., Developed scalable web applications using React and Node.js; experienced in cloud deployment (AWS, Azure); strong leadership skills."
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                rows={7}
                required
                disabled={isLoading}
              />
              <p className="text-sm text-muted-foreground">
                Summarize your relevant experience, skills, and achievements.
              </p>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || !resumeTitle.trim() || !jobTitle.trim() || !experience.trim()}>
              {isLoading ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-pulse" /> Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> Generate Resume
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
