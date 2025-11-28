"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const QueryProvider = ({ children }: Props) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 2 * 60 * 1000, // 2 minutes default
            gcTime: 10 * 60 * 1000, // 10 minutes
            refetchOnWindowFocus: true, // Sync when tab becomes active
            refetchOnMount: true, // Refetch on mount
            retry: 1, // Retry failed requests once
            retryDelay: 1000, // Wait 1s before retry
          },
          mutations: {
            retry: 0, // Don't retry mutations
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
