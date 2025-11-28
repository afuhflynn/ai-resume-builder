"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  selectedColor: string;
  onSelect: (color: string) => void;
}

const colors = [
  { name: "Slate", value: "#334155" },
  { name: "Blue", value: "#2563eb" },
  { name: "Purple", value: "#7c3aed" },
  { name: "Pink", value: "#db2777" },
  { name: "Red", value: "#dc2626" },
  { name: "Orange", value: "#ea580c" },
  { name: "Green", value: "#16a34a" },
  { name: "Teal", value: "#0d9488" },
];

export function ColorPicker({ selectedColor, onSelect }: ColorPickerProps) {
  return (
    <div className="w-full">
      <h3 className="text-sm font-medium mb-3">Accent Color</h3>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onSelect(color.value)}
            className={cn(
              "w-8 h-8 rounded-full border border-border flex items-center justify-center transition-transform hover:scale-110",
              selectedColor === color.value &&
                "ring-2 ring-offset-2 ring-primary"
            )}
            style={{ backgroundColor: color.value }}
            title={color.name}
          >
            {selectedColor === color.value && (
              <Check className="h-4 w-4 text-white drop-shadow-md" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
