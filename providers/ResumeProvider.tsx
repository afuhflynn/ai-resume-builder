"use client";

import { Resume } from "@prisma/client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { toast } from "sonner";

const defaultResumeData: ResumeData = {
  templateId: "modern",
  themeColor: "#334155",
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    jobTitle: "",
    x: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  title: "",
};

type ResumeContextType = {
  resumeData: ResumeData;
  isLoading: boolean;
  isSaving: boolean;
  updatePersonalInfo: (data: Partial<ResumeData["personalInfo"]>) => void;
  updateSummary: (summary: string) => void;
  addExperience: () => void;
  updateExperience: (
    id: string,
    data: Partial<ResumeData["experience"][0]>
  ) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (
    id: string,
    data: Partial<ResumeData["education"][0]>
  ) => void;
  removeEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<ResumeData["skills"][0]>) => void;
  removeSkill: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, data: Partial<ResumeData["projects"][0]>) => void;
  removeProject: (id: string) => void;
  updateTemplate: (templateId: ResumeData["templateId"]) => void;
  updateThemeColor: (color: string) => void;
  saveResume: (id: string, data: ResumeData) => Promise<void>;
  loadResume: (id: string) => Promise<void>;
  setResumeData: (data: ResumeData) => void;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const updatePersonalInfo = (data: Partial<ResumeData["personalInfo"]>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data },
    }));
  };

  const updateSummary = (summary: string) => {
    setResumeData((prev) => ({ ...prev, summary }));
  };

  const updateTemplate = (templateId: ResumeData["templateId"]) => {
    setResumeData((prev) => ({ ...prev, templateId }));
  };

  const updateThemeColor = (themeColor: string) => {
    setResumeData((prev) => ({ ...prev, themeColor }));
  };

  const addExperience = () => {
    const newExp = {
      id: crypto.randomUUID(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      location: "",
      description: "",
    };
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }));
  };

  const updateExperience = (
    id: string,
    data: Partial<ResumeData["experience"][0]>
  ) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, ...data } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const addEducation = () => {
    const newEdu = {
      id: crypto.randomUUID(),
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      location: "",
      description: "",
    };
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const updateEducation = (
    id: string,
    data: Partial<ResumeData["education"][0]>
  ) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, ...data } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const addSkill = () => {
    const newSkill = {
      id: crypto.randomUUID(),
      name: "",
      level: "Intermediate" as const,
    };
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const updateSkill = (id: string, data: Partial<ResumeData["skills"][0]>) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) =>
        skill.id === id ? { ...skill, ...data } : skill
      ),
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));
  };

  const addProject = () => {
    const newProject = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      url: "",
      technologies: [],
    };
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
  };

  const updateProject = (
    id: string,
    data: Partial<ResumeData["projects"][0]>
  ) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === id ? { ...proj, ...data } : proj
      ),
    }));
  };

  const removeProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
  };

  const calculateCompleteness = (data: ResumeData) => {
    let score = 0;
    if (data.personalInfo.fullName) score += 20;
    if (data.personalInfo.email) score += 10;
    if (data.summary) score += 15;
    if (data.experience.length > 0) score += 25;
    if (data.education.length > 0) score += 15;
    if (data.skills.length > 0) score += 10;
    if (data.projects.length > 0) score += 5;
    return Math.min(score, 100);
  };

  const saveResume = async (id: string, data: ResumeData) => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/resumes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: resumeData.personalInfo.fullName
            ? `${resumeData.personalInfo.fullName}'s Resume`
            : "Untitled Resume",
          fullName: data.personalInfo.fullName,
          jobTitle: data.personalInfo.jobTitle,
          email: data.personalInfo.email,
          phone: data.personalInfo.phone,
          location: data.personalInfo.location,
          website: data.personalInfo.website,
          linkedin: data.personalInfo.linkedin,
          x: data.personalInfo.x,
          professionalSummary: data.summary,
          experiences: data.experience,
          skills: data?.skills,
          projects: data.projects,
          educations: data.education,
          completeness: calculateCompleteness(data),
          templateId: data.templateId,
          themeColor: data.themeColor,
        }),
      });

      if (!response.ok) throw new Error("Failed to save resume");
      toast.success("Resume saved successfully");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save resume");
    } finally {
      setIsSaving(false);
    }
  };

  const loadResume = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/resumes/${id}`);
      if (!response.ok) throw new Error("Failed to load resume");

      const data: Resume = await response.json();
      console.log({ data });
      if (data) {
        console.log({ data });
        setResumeData({
          ...defaultResumeData,
          templateId: data.templateId! as unknown as TemplateId,
          experience: (data.experiences as unknown as WorkExperience[]) || [],
          education: (data.educations as unknown as Education[]) || [],
          skills: (data.skills as unknown as Skill[]) || [],
          personalInfo: {
            fullName: data.fullName!,
            email: data.email!,
            phone: data.phone!,
            location: data.location!,
            website: data.website!,
            linkedin: data.linkedin!,
            x: data.x!,
            github: "", // TODO: Work on github linking
            jobTitle: data.jobTitle!,
          },
          themeColor: data.colorTheme!,
          projects: (data.projects as unknown as Project[]) || [],
          summary: data.professionalSummary!,
          title: data.title,
        });
      }
    } catch (error) {
      console.error("Load error:", error);
      toast.error("Failed to load resume");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        isLoading,
        isSaving,
        updatePersonalInfo,
        updateSummary,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        updateSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject,
        updateTemplate,
        updateThemeColor,
        saveResume,
        loadResume,
        setResumeData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
