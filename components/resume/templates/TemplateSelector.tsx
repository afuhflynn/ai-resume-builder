"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export type TemplateId =
  | "modern"
  | "glass"
  | "professional"
  | "creative"
  | "minimalist"
  | "enhanced";

interface TemplateSelectorProps {
  selectedTemplate: TemplateId;
  onSelect: (template: TemplateId) => void;
}

const templates = [
  {
    id: "modern",
    name: "Modern",
    image: "https://placehold.co/300x400/e2e8f0/1e293b?text=Modern",
  },
  {
    id: "glass",
    name: "Glass",
    image: "https://placehold.co/300x400/e2e8f0/1e293b?text=Glass",
  },
  {
    id: "professional",
    name: "Professional",
    image: "https://placehold.co/300x400/e2e8f0/1e293b?text=Professional",
  },
  {
    id: "creative",
    name: "Creative",
    image: "https://placehold.co/300x400/e2e8f0/1e293b?text=Creative",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    image: "https://placehold.co/300x400/e2e8f0/1e293b?text=Minimalist",
  },
  {
    id: "enhanced",
    name: "Enhanced Pro",
    image: "https://placehold.co/300x400/E8F4F8/4A90E2?text=Enhanced+Pro",
  },
] as const;

export function TemplateSelector({
  selectedTemplate,
  onSelect,
}: TemplateSelectorProps) {
  return (
    <div className="w-full">
      <h3 className="text-sm font-medium mb-3">Choose Template</h3>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {templates.map((template) => (
            <div key={template.id} className="relative group">
              <button
                onClick={() => onSelect(template.id)}
                className={cn(
                  "relative overflow-hidden rounded-lg border-2 transition-all hover:border-primary w-[120px] h-[160px]",
                  selectedTemplate === template.id
                    ? "border-primary ring-2 ring-primary ring-offset-2"
                    : "border-transparent"
                )}
              >
                <img
                  src={template.image}
                  alt={template.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-bold">Select</span>
                </div>
              </button>
              <div className="text-center mt-2 text-xs font-medium">
                {template.name}
              </div>
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1 shadow-md z-10">
                  <Check className="h-3 w-3" />
                </div>
              )}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
