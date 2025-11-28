"use client";

import { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Save,
  Download,
  Share2,
  Eye,
  LayoutTemplate,
  Loader2,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useResume } from "@/providers/ResumeProvider";
import { ResumeEditor } from "@/components/resume/ResumeEditor";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { TemplateSelector } from "@/components/resume/templates/TemplateSelector";
import { ColorPicker } from "@/components/resume/templates/ColorPicker";
import { CoverLetterChat } from "@/components/resume/CoverLetterChat";
import { ATSOptimizer } from "@/components/resume/ATSOptimizer";

export function ResumeBuilder({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState("editor");
  const {
    saveResume,
    loadResume,
    isSaving,
    isLoading,
    resumeData,
    updateTemplate,
    updateThemeColor,
    setResumeData,
  } = useResume();

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef: contentRef,
    documentTitle: resumeData.personalInfo.fullName || "Resume",
    onAfterPrint: () => console.log("Printed successfully"),
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/resumes/import", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Import failed");

      const { data } = await res.json();

      // Update local state with imported data
      // Merge with existing ID and template settings if needed, or just overwrite content
      setResumeData({
        ...resumeData,
        ...data,
        // Preserve ID if it exists in current state (though resumeData doesn't have ID, it's passed as prop)
        // Actually resumeData structure matches what we get back mostly
      });

      alert("Resume parsed and imported successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to import resume");
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (id && id !== "new") {
      loadResume(id);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf,.docx,.txt"
        onChange={handleFileChange}
      />
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b bg-card z-10">
        <div className="flex items-center gap-4">
          <Link href="/resumes">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-semibold">Resume Editor</h1>
            <p className="text-xs text-muted-foreground">
              {isSaving ? "Saving..." : "Ready to edit"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleImportClick}
            disabled={isImporting}
          >
            {isImporting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Import
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <LayoutTemplate className="h-4 w-4" />
            Templates
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Separator orientation="vertical" className="h-6 mx-2" />
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => reactToPrintFn()}
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button
            size="sm"
            className="gap-2"
            onClick={() => saveResume(id)}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Editor */}
        <div className="w-1/2 border-r flex flex-col bg-background">
          <Tabs defaultValue="content" className="flex-1 flex flex-col">
            <div className="px-6 py-2 border-b">
              <TabsList className="w-full justify-start bg-transparent p-0 h-auto gap-6">
                <TabsTrigger
                  value="content"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-2"
                >
                  Content
                </TabsTrigger>
                <TabsTrigger
                  value="design"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-2"
                >
                  Design
                </TabsTrigger>
                <TabsTrigger
                  value="ai"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-2"
                >
                  AI Assistant
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="flex-1">
              <TabsContent value="content" className="m-0 p-0">
                <ResumeEditor />
              </TabsContent>
              <TabsContent value="design" className="m-0 p-6">
                <div className="flex flex-col gap-8">
                  <TemplateSelector
                    selectedTemplate={resumeData.templateId}
                    onSelect={updateTemplate}
                  />
                  <Separator />
                  <ColorPicker
                    selectedColor={resumeData.themeColor}
                    onSelect={updateThemeColor}
                  />
                </div>
              </TabsContent>
              <TabsContent value="ai" className="m-0 p-6">
                <Tabs defaultValue="cover-letter" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
                    <TabsTrigger value="ats">ATS Optimization</TabsTrigger>
                  </TabsList>
                  <TabsContent value="cover-letter">
                    <CoverLetterChat />
                  </TabsContent>
                  <TabsContent value="ats">
                    <ATSOptimizer />
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>

        {/* Right Panel - Preview */}
        <div className="w-1/2 bg-muted/30 flex flex-col">
          <div className="flex-1 overflow-y-auto p-8 flex justify-center">
            <div className="w-full max-w-[210mm] origin-top scale-100 transition-transform shadow-2xl">
              <div ref={contentRef}>
                <ResumePreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
