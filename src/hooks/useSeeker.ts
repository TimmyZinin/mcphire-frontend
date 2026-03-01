// ============================================================
// СБОРКА — React Query hooks for Seeker
// ============================================================

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { seekerApi } from "@/lib/apiClient";
import { queryKeys } from "@/lib/queryKeys";
import type { SeekerProfile } from "@/types";

export function useSeekerProfile() {
  return useQuery({
    queryKey: queryKeys.seeker.profile(),
    queryFn: seekerApi.profile,
  });
}

export function useUpdateSeekerProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<SeekerProfile>) => seekerApi.updateProfile(data),
    onSuccess: (updated) => {
      qc.setQueryData(queryKeys.seeker.profile(), updated);
    },
  });
}

export function useSeekerApplications() {
  return useQuery({
    queryKey: queryKeys.seeker.applications(),
    queryFn: seekerApi.applications,
  });
}

export function useUploadResume() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => seekerApi.uploadResume(file),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.seeker.profile() });
    },
  });
}
