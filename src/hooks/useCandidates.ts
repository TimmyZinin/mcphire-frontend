// ============================================================
// MCPHire — React Query hook for public Candidates catalog
// ============================================================

import { useQuery } from "@tanstack/react-query";
import { candidatesApi, type CandidatesQueryParams } from "@/lib/apiClient";
import { queryKeys } from "@/lib/queryKeys";

export function useCandidates(params: CandidatesQueryParams = {}) {
  return useQuery({
    queryKey: queryKeys.candidates.list(params),
    queryFn: () => candidatesApi.list(params),
    placeholderData: (prev) => prev,
  });
}
