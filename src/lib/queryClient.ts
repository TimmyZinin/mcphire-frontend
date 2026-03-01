// ============================================================
// СБОРКА — React Query client configuration
// ============================================================

import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "@/lib/api";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,       // 5 minutes
      gcTime: 1000 * 60 * 30,          // 30 minutes
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.status < 500) return false;
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});
