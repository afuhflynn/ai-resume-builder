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
  EyeClosed,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useResume } from "@/providers/ResumeProvider";
import { ResumeEditor } from "@/components/resume/ResumeEditor";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { TemplateSelector } from "@/components/resume/templates/TemplateSelector";
import { ColorPicker } from "@/components/resume/templates/ColorPicker";
import { CoverLetterChat } from "@/components/resume/CoverLetterChat";
import { ATSOptimizer } from "@/components/resume/ATSOptimizer";
import { VersionHistory } from "@/components/resume/VersionHistory";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQueryStates } from "nuqs";
import { searchParamsSchema } from "@/nuqs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function ResumeBuilder({ id }: { id: string }) {
  const {
    saveResume,
    loadResume,
    isSaving,
    isLoading,
    resumeData,
    updateTemplate,
    updateThemeColor,
    setResumeData,
    downloadPDF, // NEW
    regenerateAssets, // NEW
    isGeneratingAssets, // NEW
  } = useResume();
  const isMobile = useIsMobile();
  const [params, setParams] = useQueryStates(searchParamsSchema);
  const { build_tab, build_active_tab, build_ai_tab } = params;

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef: contentRef,
    documentTitle: resumeData.personalInfo.fullName || "Resume",
    onAfterPrint: () => toast.success("Resume downloaded successfully"),
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);

  const [isDownloading, setIsDownloading] = useState(false);

  // Remove the old reactToPrintFn and replace with this:
  const handleDownloadPDF = async () => {
    await downloadPDF(id);
  };

  // Update the save button handler:
  const handleSave = async () => {
    const savedResume = await saveResume(id, resumeData);

    // Optional: If you want to show asset generation status
    if (savedResume && savedResume.id) {
      toast.info("Generating PDF and thumbnail...", {
        description: "This may take a few seconds",
        duration: 3000,
      });
    }
  };

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

  const handleActiveTab = (tab: string) => {
    setParams({
      ...params,
      build_active_tab: tab,
    });
  };
  const handleBuildTab = (tab: string) => {
    setParams({
      ...params,
      build_tab: tab,
    });
  };

  const handleAITab = (tab: string) => {
    setParams({
      ...params,
      build_ai_tab: tab,
    });
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="p-4 h-screen flex items-center justify-center">
        <p className="text-sm text-center">
          Mobile editor not yet available. Use a device with a larger screen
          display.
        </p>
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
      <header className="flex items-center justify-between px-6 py-3 border-b bg-card z-10 sticky top-0 h-[69px] ">
        <div className="flex items-center gap-4">
          <Link href="/resumes">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-semibold">Resume Editor</h1>
            <p className="text-xs text-muted-foreground">
              {isSaving ? "Saving..." : resumeData.title || "Untitled"}
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
          <VersionHistory
            resumeId={id}
            onRestore={() => {
              // Reload the resume after restore
              if (id && id !== "new") {
                loadResume(id);
              }
            }}
          />
          <Button variant="outline" size="sm" className="gap-2">
            <LayoutTemplate className="h-4 w-4" />
            Templates
          </Button>
          {build_active_tab === "preview" ? (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 hover:bg-input/50 bg-accent text-accent-foreground"
              onClick={() => handleActiveTab("editor")}
            >
              <EyeClosed className="h-4 w-4" />
              Editor
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => handleActiveTab("preview")}
            >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          )}

          <Separator orientation="vertical" className="h-6 mx-2" />
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleDownloadPDF}
            disabled={isDownloading || id === "new"}
          >
            {isDownloading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Download PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => regenerateAssets(id)}
            disabled={id === "new" || isGeneratingAssets}
          >
            {isGeneratingAssets ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Regenerate
          </Button>
          <Button
            size="sm"
            className="gap-2"
            onClick={handleSave}
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
      <div className="flex overflow-hidden h-[calc(100% - 69px)]">
        {/* Left Panel - Editor */}
        {build_active_tab !== "preview" && (
          <div className="w-1/2 border-r flex flex-col bg-background h-full ">
            <Tabs
              defaultValue={build_tab}
              onValueChange={(value) => handleBuildTab(value)}
              className="flex-1 flex flex-col h-full"
            >
              <div className="px-6 py-2 border-b h-full sticky top-0 bg-background! z-12">
                <TabsList className="w-full justify-start p-0 h-auto gap-6 bg-transparent">
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

              <ScrollArea className="flex-1 h-full w-full">
                <TabsContent value="content" className="m-0 p-0">
                  <ResumeEditor />
                </TabsContent>
                <TabsContent
                  value="design"
                  className="m-0 p-6 flex flex-col gap-8 h-full w-full"
                >
                  <TemplateSelector
                    selectedTemplate={resumeData.templateId}
                    onSelect={updateTemplate}
                    className="sm:max-w-[calc(1/2 * (100% - 40%))]"
                  />
                  <Separator />
                  <ColorPicker
                    selectedColor={resumeData.themeColor}
                    onSelect={updateThemeColor}
                  />
                </TabsContent>
                <TabsContent value="ai" className="m-0 p-6">
                  <Tabs
                    defaultValue={build_ai_tab}
                    onValueChange={(value) => handleAITab(value)}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="cover_letter">
                        Cover Letter
                      </TabsTrigger>
                      <TabsTrigger value="ats">ATS Optimization</TabsTrigger>
                    </TabsList>
                    <TabsContent value="cover_letter">
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
        )}

        {/* Right Panel - Preview */}
        <div
          className={cn(
            "w-1/2 bg-muted/30 flex flex-col items-center",
            build_active_tab === "preview" ? "w-full" : ""
          )}
        >
          <ScrollArea className="flex-1 overflow-y-auto p-8 flex justify-center">
            <div
              className={cn(
                "w-full origin-top scale-100 transition-transform shadow-2xl",
                build_active_tab === "preview" ? "max-w-[256mm]" : ""
              )}
            >
              <div ref={contentRef}>
                <ResumePreview />
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
