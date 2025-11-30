"use client";

import { useResume } from "@/providers/ResumeProvider";
import { ModernTemplate } from "./templates/ModernTemplate";
import { GlassTemplate } from "./templates/GlassTemplate";
import { ProfessionalTemplate } from "./templates/ProfessionalTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { MinimalistTemplate } from "./templates/MinimalistTemplate";
import { EnhancedProfessionalTemplate } from "./templates/EnhancedProfessionalTemplate";
import { useEffect, useState } from "react";

export function ResumePreview() {
  const { resumeData } = useResume();
  const [templateName, setTemplateName] = useState<string>("modern");

  useEffect(() => {
    // Fetch template name from ID if it's a database ID
    const fetchTemplateName = async () => {
      if (resumeData.templateId) {
        try {
          const response = await fetch(`/api/templates`);
          if (response.ok) {
            const templates = await response.json();
            const template = templates.find(
              (t: any) => t.id === resumeData.templateId
            );
            if (template) {
              setTemplateName(template.name.toLowerCase());
            }
          }
        } catch (error) {
          console.error("Failed to fetch template:", error);
        }
      }
    };

    fetchTemplateName();
  }, [resumeData.templateId]);

  const renderTemplate = () => {
    // Support both old string IDs and new database IDs
    const templateKey =
      typeof resumeData.templateId === "string"
        ? resumeData.templateId.toLowerCase()
        : templateName;

    switch (templateKey) {
      case "glass":
        return <GlassTemplate data={resumeData} />;
      case "professional":
        return <ProfessionalTemplate data={resumeData} />;
      case "creative":
        return <CreativeTemplate data={resumeData} />;
      case "minimalist":
        return <MinimalistTemplate data={resumeData} />;
      case "enhanced":
        return (
          <EnhancedProfessionalTemplate
            data={resumeData}
            themeColor={resumeData.themeColor}
          />
        );
      case "modern":
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  return (
    <div className="w-full bg-white shadow-2xl min-h-[297mm]">
      {renderTemplate()}
    </div>
  );
}
