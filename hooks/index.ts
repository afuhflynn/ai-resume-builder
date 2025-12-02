// hooks to communicate with the api
// using tanstack query for caching and mutations

import { api } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => api.user.get(id),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 1,
    retryDelay: 1000,
  });
}

export function useUpdateUser(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.user.updateProfile(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });
}

export function useUpdateUserPassword(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.user.updatePassword(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });
}

export function useUpdateUserAvatar(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.user.updateAvatar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });
}

export function useResumes(page: number, limit: number) {
  return useQuery({
    queryKey: ["resumes", page, limit],
    queryFn: () => api.resume.getAll({ page, limit }),
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 3 * 60 * 1000, // 3 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 1,
    retryDelay: 1000,
  });
}

export function useDeleteResume({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-resume", page, limit],
    mutationFn: (id: string) => api.resume.delete({ id }),
    retry: 1,
    retryDelay: 1000,
    onMutate: async (id) => {
      const prevResumes = queryClient.getQueryData<ResumesMetadata>([
        "resumes",
        page,
        limit,
      ]);
      queryClient.setQueryData(
        ["resumes", page, limit],
        (old: ResumesMetadata) => ({
          ...old,
          data: old.data.filter((resume) => resume.id !== id),
        })
      );
      return { prevResumes };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes", page, limit] });
    },
    onError: (err, _, context) => {
      toast.error(`An error occurred deleting resume: ${err?.message}`);
      if (context?.prevResumes) {
        queryClient.setQueryData(["resumes", page, limit], context.prevResumes);
      }
    },
    onSuccess: () => {
      toast.success("Resume deleted successfully");
    },
  });
}

export function useCreateResume() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-resume"],
    mutationFn: (data: any) => api.resume.create(data),
    retry: 1,
    retryDelay: 1000,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
    onError: (err) => {
      toast.error(`An error occurred creating resume: ${err?.message}`);
    },
    onSuccess: (data) => {
      toast.success("Resume created successfully");
      router.push(`/editor/${data?.id}`);
    },
  });
}

export function useImportCreateResume() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-resume"],
    mutationFn: (data: any) => api.resume.importCreate(data),
    retry: 1,
    retryDelay: 1000,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
    onError: (err) => {
      toast.error(`An error occurred creating resume: ${err?.message}`);
    },
    onSuccess: (data) => {
      toast.success("Resume created successfully");
      router.push(`/editor/${data?.id}`);
    },
  });
}

export function useGenerateResume() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-resume"],
    mutationFn: (data: any) => api.resume.generate(data),
    retry: 1,
    retryDelay: 1000,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
    onError: (err) => {
      toast.error(`An error occurred creating resume: ${err?.message}`);
    },
    onSuccess: (data) => {
      toast.success("Resume created successfully");
      router.push(`/editor/${data?.id}`);
    },
  });
}
