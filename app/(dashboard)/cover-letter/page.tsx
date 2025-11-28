import { CoverLetterChat } from "@/components/resume/CoverLetterChat";
import { ResumeProvider } from "@/providers/ResumeProvider";

export default function CoverLetterPage() {
  return (
    <ResumeProvider>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Cover Letter Generator
          </h1>
          <p className="text-muted-foreground">
            Create tailored cover letters with AI assistance.
          </p>
        </div>

        <CoverLetterChat />
      </div>
    </ResumeProvider>
  );
}
