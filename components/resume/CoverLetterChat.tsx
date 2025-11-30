"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, Copy, Wand2, Send, RefreshCw, ArrowLeft } from "lucide-react";
import { useResume } from "@/providers/ResumeProvider";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface CoverLetterChatProps {
  resumeData?: any;
  initialData?: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    resumeId?: string;
    tone: "professional" | "enthusiastic" | "formal";
  };
}

export function CoverLetterChat({
  resumeData: externalResumeData,
  initialData,
}: CoverLetterChatProps = {}) {
  const resumeContext = useResume();
  const resumeData = externalResumeData || resumeContext?.resumeData;

  const [step, setStep] = useState<"input" | "chat">(
    initialData ? "chat" : "input"
  );

  // Input state - initialize with initialData if provided
  const [jobTitle, setJobTitle] = useState(initialData?.jobTitle || "");
  const [company, setCompany] = useState(initialData?.companyName || "");
  const [jobDescription, setJobDescription] = useState(
    initialData?.jobDescription || ""
  );
  const [tone, setTone] = useState(initialData?.tone || "professional");

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
    setMessages,
  } = useChat({
    api: "/api/ai/cover-letter-chat",
    body: {
      resumeData,
      jobInfo: {
        jobTitle,
        company,
        description: jobDescription,
      },
    },
    onError: (error) => {
      toast.error("An error occurred. Please check your credits or try again.");
    },
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-start chat if initialData is provided
  useEffect(() => {
    if (initialData && messages.length === 0) {
      append({
        role: "user",
        content: `Please write a ${initialData.tone} cover letter for a ${
          initialData.jobTitle || "role"
        } position at ${initialData.companyName || "a company"}.

Job Description:
${initialData.jobDescription}`,
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleStart = () => {
    if (!jobDescription) {
      toast.error("Please enter a job description");
      return;
    }
    setStep("chat");
    append({
      role: "user",
      content: `Please write a ${tone} cover letter for a ${
        jobTitle || "role"
      } position at ${company || "a company"}.

Job Description:
${jobDescription}`,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const resetChat = () => {
    setMessages([]);
    setStep("input");
  };

  if (step === "input") {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">AI Cover Letter Agent</h3>
          <p className="text-sm text-muted-foreground">
            Provide details about the job, and our AI agent will draft and
            refine your cover letter with you.
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input
                placeholder="e.g. Senior Frontend Developer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Company</Label>
              <Input
                placeholder="e.g. Acme Corp"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              Job Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              placeholder="Paste the full job description here..."
              className="min-h-[150px]"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="confident">Confident</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleStart}
            disabled={!jobDescription}
            className="w-full"
          >
            <Wand2 className="mr-2 h-4 w-4" />
            Start Drafting (20 credits)
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] border rounded-lg overflow-hidden bg-background">
      {/* Chat Header */}
      <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={resetChat}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h3 className="font-semibold text-sm">Cover Letter Assistant</h3>
            <p className="text-xs text-muted-foreground">
              {jobTitle ? `${jobTitle} at ${company}` : "Drafting your letter"}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={resetChat}>
          <RefreshCw className="h-3 w-3 mr-2" />
          New Draft
        </Button>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.role === "assistant" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    AI
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={`rounded-lg p-3 max-w-[85%] text-sm ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {m.role === "user" && m.content.includes("Job Description:") ? (
                  <p>
                    Draft a cover letter for {jobTitle} at {company}...
                  </p>
                ) : (
                  <div className="whitespace-pre-wrap">{m.content}</div>
                )}

                {m.role === "assistant" && (
                  <div className="mt-2 flex justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 hover:bg-background/50"
                      onClick={() => copyToClipboard(m.content)}
                      title="Copy to clipboard"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>

              {m.role === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-secondary">ME</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  AI
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg p-3">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t bg-background">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Refine the letter (e.g., 'Make it more enthusiastic' or 'Emphasize my React skills')..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
