"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FileText,
  Upload,
  Sparkles,
  ArrowLeft,
  Loader2,
  LayoutTemplate,
  CheckCheck,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { TemplateSelector } from "@/components/resume/templates/TemplateSelector";
import { INDUSTRIES, REGIONAL_STANDARDS } from "@/constants/resume";
import {
  useCreateResume,
  useGenerateResume,
  useImportCreateResume,
} from "@/hooks";

export default function CreateResumePage() {
  const [title, setTitle] = useState("");

  // AI Generation Dialog
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [experience, setExperience] = useState("");

  // Template Selection Dialog
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedRegional, setSelectedRegional] = useState("");

  // Import Dialog
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showScratchDialog, setShowScratchDialog] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const importFileInputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: createResume, isPending: creatingResume } = useCreateResume();
  const { mutate: importCreateResume, isPending: importingResume } =
    useImportCreateResume();
  const { mutate: generateResume, isPending: generatingResume } =
    useGenerateResume();

  const importResume = async () => {
    if (!title.trim()) {
      toast.error("Please enter a resume title");
      return;
    }

    if (!importFile) {
      toast.error("Please select a file to import");
      return;
    }
    const formData = new FormData();
    formData.append("file", importFile);
    importCreateResume({ data: formData });
  };

  const isLoading = creatingResume || importingResume || generatingResume;

  return (
    <>
      <div className="w-full mx-auto space-y-8 py-8 px-4  p-4 lg:p-8 flex-1">
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-6">
          {/* Start from Scratch */}
          <Card
            className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
            onClick={() => setShowScratchDialog(true)}
          >
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <CardTitle>From Scratch</CardTitle>
              <CardDescription>
                Build your resume step-by-step with full control.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>Empty canvas</li>
                <li>Full customization</li>
                <li>Real-time preview</li>
              </ul>
            </CardContent>
          </Card>

          {/* Template Selection */}
          <Card
            className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
            onClick={() => setShowTemplateDialog(true)}
          >
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 text-green-500">
                <LayoutTemplate className="h-6 w-6" />
              </div>
              <CardTitle>Use Template</CardTitle>
              <CardDescription>
                Start with a professional template design.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>10+ templates</li>
                <li>Pre-designed layouts</li>
                <li>Fully editable</li>
              </ul>
            </CardContent>
          </Card>

          {/* Import Existing */}
          <Card
            className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
            onClick={() => setShowImportDialog(true)}
          >
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500">
                <Upload className="h-6 w-6" />
              </div>
              <CardTitle>Import Resume</CardTitle>
              <CardDescription>
                Upload your existing PDF or DOCX file.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>PDF & DOCX support</li>
                <li>Auto-fill sections</li>
                <li>Keep your content</li>
              </ul>
            </CardContent>
          </Card>

          {/* AI Generation */}
          <Card
            className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
            onClick={() => setShowAIDialog(true)}
          >
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 text-purple-500">
                <Sparkles className="h-6 w-6" />
              </div>
              <CardTitle>Generate with AI</CardTitle>
              <CardDescription>
                Let AI write your resume based on your info.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>AI-powered content</li>
                <li>Professional phrasing</li>
                <li>Keyword optimized</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Generation Dialog */}
      <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Generate Resume with AI</DialogTitle>
            <DialogDescription>
              Provide some information and let AI create your resume.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 w-full">
            <Label htmlFor="title" className="text-lg font-medium">
              Resume Title
            </Label>
            <Input
              id="title"
              placeholder="e.g. Software Engineer 2024"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg p-6"
              autoFocus
            />
          </div>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Desired Job Title</Label>
              <Input
                id="jobTitle"
                placeholder="e.g. Senior Software Engineer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Your Experience & Skills</Label>
              <Textarea
                id="experience"
                placeholder="Describe your work experience, key achievements, and skills..."
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                rows={6}
              />
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowAIDialog(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                generateResume({
                  jobTitle: jobTitle.trim(),
                  experience: experience.trim(),
                  title,
                })
              }
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Resume
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Template Selection Dialog */}
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="sm:max-w-[700px] overflow-hidden max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Choose a Template</DialogTitle>
            <DialogDescription>
              Select a professional template to start with. You can customize it
              later.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 w-full">
            <Label htmlFor="title" className="text-lg font-medium">
              Resume Title
            </Label>
            <Input
              id="title"
              placeholder="e.g. Software Engineer 2024"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg p-6"
              autoFocus
            />
          </div>

          <div className="space-y-6 py-4">
            {/* Industry Selection */}
            <div className="space-y-2">
              <Label htmlFor="industry">Industry / Field</Label>
              <Select
                name="industry"
                value={selectedIndustry}
                onValueChange={(value) => setSelectedIndustry(value)}
              >
                <SelectTrigger className="w-full h-12!">
                  Select your industry...
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((industry) => (
                    <SelectItem key={industry.value} value={industry.value}>
                      {industry.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                This helps us recommend the best sections for your resume
              </p>
            </div>

            {/* Regional Standard Selection */}
            <div className="space-y-2">
              <Label htmlFor="regional">Regional Standard</Label>
              <Select
                name="regional"
                value={selectedRegional}
                onValueChange={(value) => setSelectedRegional(value)}
              >
                <SelectTrigger className="w-full h-12!">
                  Select regional format...
                </SelectTrigger>
                <SelectContent>
                  {REGIONAL_STANDARDS.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedRegional && (
                <p className="text-xs text-muted-foreground">
                  {
                    REGIONAL_STANDARDS.find((r) => r.value === selectedRegional)
                      ?.description
                  }
                </p>
              )}
            </div>

            {/* Template Selector */}
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onSelect={setSelectedTemplate}
              className="sm:max-w-[640px]"
            />
          </div>

          <DialogFooter className="flex justify-end gap-3 w-full">
            <Button
              variant="outline"
              onClick={() => setShowTemplateDialog(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                createResume({
                  title: title.trim(),
                  templateId: selectedTemplate,
                  industry: selectedIndustry || null,
                  regionalStandard: selectedRegional || null,
                })
              }
              disabled={isLoading || !selectedTemplate}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Resume"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Import Resume</DialogTitle>
            <DialogDescription>
              Upload your existing resume file (PDF or DOCX).
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 w-full">
            <Label htmlFor="title" className="text-lg font-medium">
              Resume Title
            </Label>
            <Input
              id="title"
              placeholder="e.g. Software Engineer 2024"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg p-6"
              autoFocus
            />
          </div>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="file">Resume File</Label>
              <Input
                id="file"
                type="file"
                accept=".pdf,.docx,.txt"
                ref={importFileInputRef}
                onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                className="hidden"
              />
              {/* Input overlay */}
              <div
                className="h-20 w-full rounded-lg cursor-pointer border border-muted-foreground/50 hover:text-primary/50 hover:border-primary hover:border-2 border-dotted flex items-center justify-center text-center text-sm text-muted-foreground my-4"
                onClick={() => {
                  if (importFileInputRef && importFileInputRef.current) {
                    importFileInputRef.current.click();
                  }
                }}
              >
                {importFile ? (
                  <span>
                    {importFile.name} - {importFile.size}
                  </span>
                ) : (
                  <span>Drag and Drop or Click to import</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Supported formats: PDF, DOCX, TXT
              </p>
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowImportDialog(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={importResume} disabled={isLoading || !importFile}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Import Resume
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Scratch Dialog */}
      <Dialog open={showScratchDialog} onOpenChange={setShowScratchDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Resume From Scratch</DialogTitle>
            <DialogDescription>
              Input a resume title below to get started.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 w-full">
            <Label htmlFor="title" className="text-lg font-medium">
              Resume Title
            </Label>
            <Input
              id="title"
              placeholder="e.g. Software Engineer 2024"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg p-6"
              autoFocus
            />
          </div>
          <DialogFooter className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowScratchDialog(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                createResume({
                  title: title.trim(),
                  templateId: null,
                })
              }
              disabled={isLoading || !title}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <CheckCheck className="mr-2 h-4 w-4" />
                  Create Resume
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
