// Industry categories for resume customization
export const INDUSTRIES = [
  { value: "technology", label: "Technology & Software" },
  { value: "design", label: "Design & Creative" },
  { value: "healthcare", label: "Healthcare & Medical" },
  { value: "finance", label: "Finance & Banking" },
  { value: "education", label: "Education & Academia" },
  { value: "marketing", label: "Marketing & Sales" },
  { value: "engineering", label: "Engineering" },
  { value: "legal", label: "Legal & Law" },
  { value: "hospitality", label: "Hospitality & Tourism" },
  { value: "retail", label: "Retail & E-commerce" },
  { value: "manufacturing", label: "Manufacturing & Production" },
  { value: "media", label: "Media & Journalism" },
  { value: "consulting", label: "Consulting & Strategy" },
  { value: "nonprofit", label: "Non-Profit & Social Work" },
  { value: "government", label: "Government & Public Sector" },
  { value: "other", label: "Other" },
] as const;

// Regional resume standards
export const REGIONAL_STANDARDS = [
  {
    value: "US",
    label: "United States",
    description: "No photo, 1-2 pages, emphasis on achievements",
  },
  {
    value: "CA",
    label: "Canada",
    description: "No photo, 1-2 pages, bilingual options",
  },
  {
    value: "UK",
    label: "United Kingdom",
    description: "Called CV, 2 pages, detailed work history",
  },
  {
    value: "EU",
    label: "European Union",
    description: "Europass format, photo optional, detailed",
  },
  {
    value: "AU",
    label: "Australia",
    description: "2-3 pages, detailed, no photo",
  },
  {
    value: "ASIA",
    label: "Asia (General)",
    description: "Photo often required, detailed personal info",
  },
  {
    value: "LATAM",
    label: "Latin America",
    description: "Photo common, detailed personal information",
  },
  {
    value: "INTERNATIONAL",
    label: "International",
    description: "Flexible format for global applications",
  },
] as const;

// Industry-specific sections and recommendations
export const INDUSTRY_SECTIONS = {
  technology: {
    recommended: ["skills", "projects", "experience", "education"],
    optional: ["certifications", "github", "portfolio"],
    emphasis: "Technical skills and project portfolio",
  },
  design: {
    recommended: ["portfolio", "experience", "skills", "education"],
    optional: ["awards", "exhibitions"],
    emphasis: "Visual portfolio and creative projects",
  },
  healthcare: {
    recommended: ["licenses", "certifications", "experience", "education"],
    optional: ["publications", "research"],
    emphasis: "Certifications and clinical experience",
  },
  finance: {
    recommended: ["experience", "education", "certifications", "skills"],
    optional: ["publications", "awards"],
    emphasis: "Quantifiable achievements and credentials",
  },
  education: {
    recommended: ["experience", "education", "certifications", "publications"],
    optional: ["research", "presentations"],
    emphasis: "Teaching experience and academic credentials",
  },
  marketing: {
    recommended: ["experience", "skills", "achievements", "education"],
    optional: ["campaigns", "metrics"],
    emphasis: "Campaign results and metrics",
  },
  engineering: {
    recommended: ["experience", "education", "skills", "projects"],
    optional: ["certifications", "patents"],
    emphasis: "Technical projects and problem-solving",
  },
  legal: {
    recommended: ["experience", "education", "bar_admissions", "publications"],
    optional: ["cases", "specializations"],
    emphasis: "Legal credentials and case experience",
  },
  other: {
    recommended: ["experience", "education", "skills"],
    optional: ["achievements", "certifications"],
    emphasis: "Relevant experience and transferable skills",
  },
} as const;

// Regional formatting preferences
export const REGIONAL_PREFERENCES = {
  US: {
    dateFormat: "MM/YYYY",
    phoneFormat: "(XXX) XXX-XXXX",
    includePhoto: false,
    includeAge: false,
    includeMaritalStatus: false,
    maxPages: 2,
    preferredSections: ["summary", "experience", "education", "skills"],
  },
  CA: {
    dateFormat: "MM/YYYY",
    phoneFormat: "(XXX) XXX-XXXX",
    includePhoto: false,
    includeAge: false,
    includeMaritalStatus: false,
    maxPages: 2,
    preferredSections: ["summary", "experience", "education", "skills"],
  },
  UK: {
    dateFormat: "MM/YYYY",
    phoneFormat: "+44 XXXX XXXXXX",
    includePhoto: false,
    includeAge: false,
    includeMaritalStatus: false,
    maxPages: 2,
    preferredSections: [
      "personal_statement",
      "experience",
      "education",
      "skills",
    ],
  },
  EU: {
    dateFormat: "DD/MM/YYYY",
    phoneFormat: "+XX XXX XXX XXXX",
    includePhoto: true,
    includeAge: true,
    includeMaritalStatus: true,
    maxPages: 3,
    preferredSections: [
      "personal_info",
      "experience",
      "education",
      "skills",
      "languages",
    ],
  },
  AU: {
    dateFormat: "DD/MM/YYYY",
    phoneFormat: "+61 XXX XXX XXX",
    includePhoto: false,
    includeAge: false,
    includeMaritalStatus: false,
    maxPages: 3,
    preferredSections: ["summary", "experience", "education", "skills"],
  },
  ASIA: {
    dateFormat: "DD/MM/YYYY",
    phoneFormat: "+XX XXXX XXXX",
    includePhoto: true,
    includeAge: true,
    includeMaritalStatus: true,
    maxPages: 2,
    preferredSections: ["personal_info", "experience", "education", "skills"],
  },
  LATAM: {
    dateFormat: "DD/MM/YYYY",
    phoneFormat: "+XX XXX XXX XXXX",
    includePhoto: true,
    includeAge: true,
    includeMaritalStatus: true,
    maxPages: 2,
    preferredSections: ["personal_info", "experience", "education", "skills"],
  },
  INTERNATIONAL: {
    dateFormat: "MM/YYYY",
    phoneFormat: "+XX XXX XXX XXXX",
    includePhoto: false,
    includeAge: false,
    includeMaritalStatus: false,
    maxPages: 2,
    preferredSections: ["summary", "experience", "education", "skills"],
  },
} as const;
