import { google } from "@ai-sdk/google";
import { generateText, streamText, generateObject } from "ai";
import { z } from "zod";

export async function generateResume({
  jobTitle,
  experience,
}: {
  jobTitle: string;
  experience: string;
}) {
  const { text } = await generateText({
    model: google("gemini-1.5-pro"),
    prompt: `Generate a professional resume based on the following information:

    Desired Job Title: ${jobTitle}
    Key Experience and Skills: ${experience}

    Format it with clear sections for: Summary, Experience, Education, Skills.
    Use strong action verbs and quantifiable achievements.`,
  });

  return text;
}

export async function improveResumeSection(
  section: string,
  tone: "professional" | "casual" | "technical" = "professional",
) {
  const { text } = await generateText({
    model: google("gemini-1.5-pro"),
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
    model: google("gemini-2.5-flash-lite"),
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
    model: google("gemini-1.5-pro"),
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
    model: google("gemini-1.5-pro"),
    prompt: `Improve this resume section in real-time, making it more impactful:

${section}`,
  });
}

export async function parseResumeFromText(text: string) {
  const schema = z.object({
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
          id: z.string().default(""),
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
          id: z.string().default(""),
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
          id: z.string().default(""),
          name: z.string(),
          level: z
            .enum(["Beginner", "Intermediate", "Advanced", "Expert"])
            .default("Intermediate"),
        }),
      )
      .default([]),
    projects: z
      .array(
        z.object({
          id: z.string().default(""),
          name: z.string().default(""),
          description: z.string().default(""),
          url: z.string().default(""),
          technologies: z.array(z.string()).default([]),
        }),
      )
      .default([]),
  });

  const { object } = await generateObject({
    model: google("gemini-1.5-pro"),
    schema: schema,
    prompt: `Extract structured resume data from the following text.
    Map the content to the schema fields.
    For dates, use "MM/YYYY" format or "Present".
    If a field is missing, leave it empty.
    Generate unique IDs for each item using random strings.

    Resume Text:
    ${text}`,
  });

  return object;
}
