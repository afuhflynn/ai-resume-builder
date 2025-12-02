"use client";

import { useResumeStore } from "@/lib/store/resume-store";

export const useResume = useResumeStore;

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
