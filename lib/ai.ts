import { google } from "@ai-sdk/google";
import { generateText, streamText, generateObject } from "ai";
import { z } from "zod";
import { nanoid } from "nanoid";

// Shared Schema
const resumeSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().default(""),
    email: z.string().default(""),
    phone: z.string().default(""),
    location: z.string().default(""),
    website: z.string().default(""),
    linkedin: z.string().default(""),
    jobTitle: z.string().default(""),
  }),
  summary: z.string().default(""),
  experience: z
    .array(
      z.object({
        id: z.string().optional(),
        company: z.string().default(""),
        position: z.string().default(""),
        startDate: z.string().default(""),
        endDate: z.string().default(""),
        current: z.boolean().default(false),
        location: z.string().default(""),
        description: z.string().default(""),
      }),
    )
    .default([]),
  education: z
    .array(
      z.object({
        id: z.string().optional(),
        school: z.string().default(""),
        degree: z.string().default(""),
        field: z.string().default(""),
        startDate: z.string().default(""),
        endDate: z.string().default(""),
        current: z.boolean().default(false),
        location: z.string().default(""),
        description: z.string().default(""),
      }),
    )
    .default([]),
  skills: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string(),
        level: z
          .enum(["Beginner", "Intermediate", "Advanced", "Expert"])
          .default("Intermediate"),
      }),
    )
    .default([]),
  completeness: z.number().default(0),
  projects: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().default(""),
        description: z.string().default(""),
        url: z.string().default(""),
        technologies: z.array(z.string()).default([]),
      }),
    )
    .default([]),
});

export async function generateResume({
  jobTitle,
  experience,
}: {
  jobTitle: string;
  experience: string;
}) {
  const { object } = await generateObject({
    model: google("gemini-2.5-flash-lite"),
    schema: resumeSchema,
    prompt: `Generate a professional resume based on the following information:

    Desired Job Title: ${jobTitle}
    Key Experience and Skills: ${experience}

    Create a complete resume with realistic (but fictional if needed) details for:
    - Personal Info (Use placeholders if not provided)
    - Summary (Compelling professional summary)
    - Experience (Generate 2-3 relevant roles based on the input)
    - Education (Generate a relevant degree)
    - Skills (Extract and expand on skills)
    - Projects (Generate 1-2 relevant projects)

    Use strong action verbs and quantifiable achievements.`,
  });

  // Post-process to ensure IDs
  const processed = {
    ...object,
    experience: object.experience.map((item) => ({
      ...item,
      id: item.id || nanoid(),
    })),
    education: object.education.map((item) => ({
      ...item,
      id: item.id || nanoid(),
    })),
    skills: object.skills.map((item) => ({
      ...item,
      id: item.id || nanoid(),
    })),
    projects: object.projects.map((item) => ({
      ...item,
      id: item.id || nanoid(),
    })),
  };

  return processed;
}

export async function improveResumeSection(
  section: string,
  tone: "professional" | "casual" | "technical" = "professional",
) {
  const { text } = await generateText({
    model: google("gemini-2.5-flash-lite"),
    prompt: `Improve this resume section with a ${tone} tone. Make it more impactful, clear, and ATS-friendly:

${section}

Provide only the improved version without explanations.`,
  });

  return text;
}

export async function generateCoverLetter(
  jobDescription: string,
  resume: string,
  tone: "professional" | "enthusiastic" | "formal" = "professional",
) {
  const { text } = await generateText({
    model: google("gemini-1.5-flash"), // Fixed model name
    prompt: `Generate a compelling cover letter based on:

Job Description:
${jobDescription}

Resume:
${resume}

Tone: ${tone}

Create a personalized, engaging cover letter that highlights relevant experience and shows genuine interest.`,
  });

  return text;
}

export async function optimizeForATS(resumeText: string) {
  const { text } = await generateText({
    model: google("gemini-2.5-flash-lite"),
    prompt: `Analyze this resume for ATS optimization and provide:
1. ATS score (0-100)
2. Missing keywords
3. Formatting issues
4. Specific improvements

Resume:
${resumeText}`,
  });

  return text;
}

export function streamResumeImprovement(section: string) {
  return streamText({
    model: google("gemini-2.5-flash-lite"),
    prompt: `Improve this resume section in real-time, making it more impactful:

${section}`,
  });
}

export async function parseResumeFromText(text: string) {
  const { object } = await generateObject({
    model: google("gemini-2.5-flash-lite"),
    schema: resumeSchema,
    prompt: `Extract structured resume data from the following text.
    Map the content to the schema fields.
    For dates, use "MM/YYYY" format or "Present".
    If a field is missing, leave it empty.

    NOTE: The resume completeness must be a value from (0 to 100) in percentage.

    Resume Text:
    ${text}`,
  });

  // Post-process to ensure IDs
  const processed = {
    ...object,
    experience: object.experience.map((item) => ({
      ...item,
      id: item.id || nanoid(),
    })),
    education: object.education.map((item) => ({
      ...item,
      id: item.id || nanoid(),
    })),
    skills: object.skills.map((item) => ({
      ...item,
      id: item.id || nanoid(),
    })),
    projects: object.projects.map((item) => ({
      ...item,
      id: item.id || nanoid(),
    })),
  };

  return processed;
}
