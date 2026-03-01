// ============================================================
// СБОРКА — React Query hooks for Employer
// ============================================================

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { employerApi, type CreateJobPayload } from "@/lib/apiClient";
import { queryKeys } from "@/lib/queryKeys";
import type { EmployerProfile } from "@/types";

export function useEmployerProfile() {
  return useQuery({
    queryKey: queryKeys.employer.profile(),
    queryFn: employerApi.profile,
  });
}

export function useUpdateEmployerProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<EmployerProfile>) =>
      employerApi.updateProfile(data),
    onSuccess: (updated) => {
      qc.setQueryData(queryKeys.employer.profile(), updated);
    },
  });
}

export function useEmployerJobs(params: { status?: string; page?: number } = {}) {
  return useQuery({
    queryKey: queryKeys.employer.jobs(params),
    queryFn: () => employerApi.jobs(params),
  });
}

export function useCreateJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateJobPayload) => employerApi.createJob(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.employer.jobs() });
      qc.invalidateQueries({ queryKey: queryKeys.jobs.lists() });
    },
  });
}

export function useUpdateJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateJobPayload> }) =>
      employerApi.updateJob(id, data),
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: queryKeys.employer.jobs() });
      qc.setQueryData(queryKeys.jobs.detail(updated.id), updated);
    },
  });
}

export function useDeleteJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => employerApi.deleteJob(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.employer.jobs() });
      qc.invalidateQueries({ queryKey: queryKeys.jobs.lists() });
    },
  });
}

export function useEmployerApplications(jobId?: string) {
  return useQuery({
    queryKey: queryKeys.employer.applications(jobId),
    queryFn: () => employerApi.applications(jobId),
  });
}

export function useUpdateApplicationStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
      note,
    }: {
      id: string;
      status: Parameters<typeof employerApi.updateApplicationStatus>[1];
      note?: string;
    }) => employerApi.updateApplicationStatus(id, status, note),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.employer.applications() });
    },
  });
}

export function useJobAnalytics(jobId: string) {
  return useQuery({
    queryKey: queryKeys.employer.analytics(jobId),
    queryFn: () => employerApi.analytics(jobId),
    enabled: !!jobId,
  });
}
