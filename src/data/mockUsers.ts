// ============================================================
// MCPHire — Mock Users (5)
// ============================================================

import type { AuthUser } from "@/types";

export const mockUsers: AuthUser[] = [
  {
    id: "seeker-1",
    email: "ivan.petrov@example.com",
    name: "Иван Петров",
    avatarUrl: null,
    role: "seeker",
    createdAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "seeker-2",
    email: "anna.sidorova@example.com",
    name: "Анна Сидорова",
    avatarUrl: null,
    role: "seeker",
    createdAt: "2025-02-01T14:30:00Z",
  },
  {
    id: "seeker-3",
    email: "dmitry.kozlov@example.com",
    name: "Дмитрий Козлов",
    avatarUrl: null,
    role: "seeker",
    createdAt: "2025-02-10T09:15:00Z",
  },
  {
    id: "employer-1",
    email: "maria.hr@example.com",
    name: "Мария HR",
    avatarUrl: null,
    role: "employer",
    createdAt: "2024-12-01T08:00:00Z",
  },
  {
    id: "admin-1",
    email: "tim@mcphire.com",
    name: "Тим Зинин",
    avatarUrl: null,
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
  },
];
