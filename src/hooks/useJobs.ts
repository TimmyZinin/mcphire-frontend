// ============================================================
// СБОРКА — React Query hooks for Jobs
// ============================================================

import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { jobsApi, type JobsQueryParams } from "@/lib/apiClient";
import { queryKeys } from "@/lib/queryKeys";

// ---- Job list (paginated) ----------------------------------

export function useJobs(params: JobsQueryParams = {}) {
  return useQuery({
    queryKey: queryKeys.jobs.list(params),
    queryFn: () => jobsApi.list(params),
    placeholderData: (prev) => prev,
  });
}

// ---- Job list (infinite scroll variant) -------------------

export function useInfiniteJobs(params: Omit<JobsQueryParams, "page"> = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.jobs.list({ ...params, infinite: true } as JobsQueryParams),
    queryFn: ({ pageParam = 1 }) =>
      jobsApi.list({ ...params, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
  });
}

// ---- Single job -------------------------------------------

export function useJob(idOrSlug: string) {
  return useQuery({
    queryKey: queryKeys.jobs.detail(idOrSlug),
    queryFn: () => jobsApi.get(idOrSlug),
    enabled: !!idOrSlug,
  });
}

// ---- Similar jobs -----------------------------------------

export function useSimilarJobs(id: string) {
  return useQuery({
    queryKey: queryKeys.jobs.similar(id),
    queryFn: () => jobsApi.similar(id),
    enabled: !!id,
  });
}

// ---- Saved jobs -------------------------------------------

export function useSavedJobs() {
  return useQuery({
    queryKey: queryKeys.jobs.saved(),
    queryFn: jobsApi.savedList,
  });
}

// ---- Save / unsave mutations -------------------------------

export function useSaveJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: jobsApi.save,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.jobs.saved() });
    },
  });
}

export function useUnsaveJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: jobsApi.unsave,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.jobs.saved() });
    },
  });
}

// ---- Apply ------------------------------------------------

export function useApplyToJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, coverLetter }: { id: string; coverLetter?: string }) =>
      jobsApi.apply(id, coverLetter),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.seeker.applications() });
    },
  });
}

// ---- Categories / Cities / Stats --------------------------

export function useJobCategories() {
  return useQuery({
    queryKey: queryKeys.jobs.categories(),
    queryFn: jobsApi.categories,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useJobCities() {
  return useQuery({
    queryKey: queryKeys.jobs.cities(),
    queryFn: jobsApi.cities,
    staleTime: 1000 * 60 * 60,
  });
}

export function useJobStats() {
  return useQuery({
    queryKey: queryKeys.jobs.stats(),
    queryFn: jobsApi.stats,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}
