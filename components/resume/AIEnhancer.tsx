"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AIEnhancerProps {
  text: string;
  onEnhance: (newText: string) => void;
  type?: "summary" | "experience" | "skills";
}

export function AIEnhancer({
  text,
  onEnhance,
  type = "experience",
}: AIEnhancerProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleEnhance = async (
    tone: "professional" | "casual" | "technical"
  ) => {
    if (!text || text.length < 10) {
      toast.error("Please enter some text first (at least 10 characters)");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "improve",
          data: {
            section: text,
            tone,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to enhance text");
      }

      onEnhance(data.result);
      toast.success("Text enhanced successfully!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-2 gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <Sparkles className="h-3 w-3 text-purple-500" />
          )}
          {isLoading ? "Enhancing..." : "Enhance with AI"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleEnhance("professional")}>
          Professional Tone
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleEnhance("technical")}>
          Technical Tone
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleEnhance("casual")}>
          Casual/Creative Tone
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
