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
  industry: string | null;
  regionalStandard: string | null;
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  title: string;
  template?: ResumeTemplate;
}

interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  designJson: DesignJson;
  thumbnail: string;
  isPremium: boolean;
  isActive: boolean;
}

interface DesignJson {
  layout: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
    headingWeight: string;
    bodyWeight: string;
  };
  spacing: {
    margin: string;
    lineHeight: string;
    sectionGap: string;
  };
  style: {
    headerStyle: string;
    sectionHeaders: string;
    bulletStyle: string;
    borderRadius: string;
  };
  sampleData: SampleData;
}

interface SampleData {
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
    x: string;
  };
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
}

interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface SkillItem {
  id: string;
  name: string;
  level: string;
}

interface ProjectItem {
  id: string;
  name: string;
  description: string;
  url: string;
  technologies: string[];
}

interface ResumesMetadata {
  data: Resume[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
