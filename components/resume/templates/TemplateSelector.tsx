"use client";

import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TemplateSelectorProps {
  selectedTemplate: string | null | undefined;
  onSelect: (templateId: string) => void;
  className?: string;
}

interface Template {
  id: string;
  name: string;
  description: string | null;
  thumbnail: string | null;
  isPremium: boolean;
}

export function TemplateSelector({
  selectedTemplate,
  onSelect,
  className,
}: TemplateSelectorProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch("/api/templates");
      if (!response.ok) throw new Error("Failed to fetch templates");
      const data = await response.json();
      setTemplates(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load templates");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full overflow-hidden py-4">
        <h3 className="text-sm font-medium mb-3">Choose Template</h3>
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full overflow-hidden py-4 ", className)}>
      <h3 className="text-sm font-medium mb-3">Choose Template</h3>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border overflow-auto max-w-full">
        <div className="flex w-full overflow-hidden space-x-4 p-4">
          {templates.map((template) => (
            <div key={template.id} className="relative group">
              <button
                onClick={() => onSelect(template.id)}
                className={cn(
                  "relative overflow-hidden rounded-lg border-2 transition-all hover:border-primary w-[120px] h-40 group",
                  selectedTemplate === template.id
                    ? "border-primary ring-2 ring-primary ring-offset-2"
                    : "border-transparent"
                )}
              >
                <img
                  src={template.thumbnail || "/place-holder.png"}
                  alt={template.name}
                  className="object-cover w-full h-full group-hover:scale-110 duration-500 transition-all"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-bold">Select</span>
                </div>
                {template.isPremium && (
                  <div className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    PRO
                  </div>
                )}
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
