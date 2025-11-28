"use client";

import { useResume } from "@/providers/ResumeProvider";
import { ModernTemplate } from "./templates/ModernTemplate";
import { GlassTemplate } from "./templates/GlassTemplate";
import { ProfessionalTemplate } from "./templates/ProfessionalTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { MinimalistTemplate } from "./templates/MinimalistTemplate";
import { EnhancedProfessionalTemplate } from "./templates/EnhancedProfessionalTemplate";

export function ResumePreview() {
  const { resumeData } = useResume();

  const renderTemplate = () => {
    switch (resumeData.templateId) {
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
