"use client";

import { useResume } from "@/providers/ResumeProvider";
import { ResumePDF } from "@/lib/resume-pdf-generator";
import { Resume, ResumeTemplate } from "@prisma/client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { GlassTemplate } from "./templates/GlassTemplate";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        Loading preview...
      </div>
    ),
  }
);

export function ResumePreview() {
  const { resumeData } = useResume();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-full">Loading...</div>
    );
  }

  // Map resumeData to ResumeWithTemplate structure expected by ResumePDF
  const mappedResume = {
    ...resumeData,
    id: "preview",
    userId: "preview",
    title: resumeData.title,
    completeness: 0,
    isPublic: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    templateId: resumeData.templateId,
    colorTheme: resumeData.themeColor,
    industry: resumeData.industry,
    regionalStandard: resumeData.regionalStandard,
    thumbnailUrl: null,
    fullName: resumeData.personalInfo.fullName,
    jobTitle: resumeData.personalInfo.jobTitle,
    email: resumeData.personalInfo.email,
    phone: resumeData.personalInfo.phone,
    location: resumeData.personalInfo.location,
    website: resumeData.personalInfo.website,
    linkedin: resumeData.personalInfo.linkedin,
    x: resumeData.personalInfo.x,
    professionalSummary: resumeData.summary,
    experiences: resumeData.experience,
    skills: resumeData.skills,
    projects: resumeData.projects,
    educations: resumeData.education,
    profile: null,
  } as unknown as Resume & { template?: ResumeTemplate | null };

  console.log({ mappedResume });

  return (
    <div className="w-full h-full bg-slate-100 flex justify-center items-start pt-4 pb-4 overflow-auto">
      {/* <PDFViewer
        className=" shadow-lg rounded-lg"
        showToolbar={false}
      > */}
      <GlassTemplate data={resumeData} template={mappedResume.template} />
      {/* </PDFViewer> */}
    </div>
  );
}
