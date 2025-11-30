import { ResumeProvider } from "@/providers/ResumeProvider";
import { ResumeBuilder } from "@/components/resume/ResumeBuilder";

export default async function ResumeBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <ResumeProvider>
      <ResumeBuilder id={id} />
    </ResumeProvider>
  );
}
