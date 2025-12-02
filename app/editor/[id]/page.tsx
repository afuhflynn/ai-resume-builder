import { ResumeBuilder } from "@/components/resume/ResumeBuilder";

export default async function ResumeBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ResumeBuilder id={id} />;
}
