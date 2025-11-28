// hooks to communicate with the api
// using tanstack query for caching and mutations

import { api } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useUser(id: string) {
  // use useQuery for caching
  const queryClient = useQueryClient();

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
