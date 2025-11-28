"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, Upload, FileText } from "lucide-react";

export default function ImportResumePage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [resumeTitle, setResumeTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
      if (!validTypes.includes(selectedFile.type)) {
        toast.error("Invalid file type. Please upload a PDF, DOCX, or TXT file.");
        setFile(null);
        return;
      }
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  };

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }
    if (!resumeTitle.trim()) {
      toast.error("Please enter a title for your new resume.");
      return;
    }

    setIsLoading(true);
    toast.info("Importing and parsing your resume...");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", resumeTitle);

    try {
      const response = await fetch("/api/resumes/import", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Resume imported and parsed successfully!");
        router.push(`/resumes/${data.resumeId}`); // Assuming API returns resumeId
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to import resume.");
      }
    } catch (error) {
      console.error("Resume import error:", error);
      toast.error("An unexpected error occurred during resume import.");
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
          <h1 className="text-3xl font-bold tracking-tight">Import Resume</h1>
          <p className="text-muted-foreground">
            Upload your existing resume to quickly get started.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Your Resume File</CardTitle>
          <CardDescription>
            Supports PDF, DOCX, and plain Text files.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleImport} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="resumeTitle">Resume Title</Label>
              <Input
                id="resumeTitle"
                placeholder="e.g., My Imported Resume"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                required
                disabled={isLoading}
              />
              <p className="text-sm text-muted-foreground">
                Give a title to your new resume.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="resumeFile">Upload File</Label>
              <Input
                id="resumeFile"
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
                required
                disabled={isLoading}
              />
              {file && (
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                  <FileText className="h-4 w-4" />
                  <span>Selected file: {file.name}</span>
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || !file}>
              {isLoading ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-pulse" /> Importing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" /> Import Resume
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
