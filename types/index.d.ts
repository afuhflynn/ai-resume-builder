type TemplateId =
  | "modern"
  | "glass"
  | "professional"
  | "creative"
  | "minimalist"
  | "enhanced";

interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
  location: string;
  id: string;
}

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  x?: string;
  github?: string;
  jobTitle: string;
}

type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
}

interface Project {
  name: string;
  githubUrl?: string;
  id: string;
  name: string;
  description: string;
  url: string;
  technologies: string[];
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string;
}

interface ResumeData {
  templateId: TemplateId;
  themeColor: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  title: string;
}
