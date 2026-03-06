// ============================================================
// MCPHire — API Client (Mock/Real switcher)
// ============================================================

import * as realApi from "@/lib/api";
import * as mockApi from "@/lib/mock/mockApi";

const useMocks = import.meta.env.VITE_USE_MOCKS === "true";

// Select API based on environment
const api = useMocks ? mockApi : realApi;

// Re-export everything conditionally
export const authApi = api.authApi;
export const jobsApi = api.jobsApi;
export const seekerApi = api.seekerApi;
export const employerApi = api.employerApi;
export const getAccessToken = api.getAccessToken;
export const setTokens = realApi.setTokens;
export const clearTokens = api.clearTokens;
export const ApiError = api.ApiError;

// Re-export types
export type { JobsQueryParams, CreateJobPayload } from "@/lib/api";
