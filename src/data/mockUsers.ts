// ============================================================
// MCPHire — Mock Users (5)
// ============================================================

import type { AuthUser } from "@/types";

export const mockUsers: AuthUser[] = [
  {
    id: "seeker-1",
    email: "ivan.petrov@example.com",
    telegramId: "123456789",
    telegramUsername: "ivan_petrov",
    name: "Иван Петров",
    avatarUrl: null,
    role: "seeker",
    emailVerified: true,
    createdAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "seeker-2",
    email: "anna.sidorova@example.com",
    telegramId: "987654321",
    telegramUsername: "anna_sid",
    name: "Анна Сидорова",
    avatarUrl: null,
    role: "seeker",
    emailVerified: true,
    createdAt: "2025-02-01T14:30:00Z",
  },
  {
    id: "seeker-3",
    email: "dmitry.kozlov@example.com",
    telegramId: "456789123",
    telegramUsername: "dmitry_kozlov",
    name: "Дмитрий Козлов",
    avatarUrl: null,
    role: "seeker",
    emailVerified: false,
    createdAt: "2025-02-10T09:15:00Z",
  },
  {
    id: "employer-1",
    email: "maria.hr@example.com",
    telegramId: "321654987",
    telegramUsername: "maria_hr",
    name: "Мария HR",
    avatarUrl: null,
    role: "employer",
    emailVerified: true,
    createdAt: "2024-12-01T08:00:00Z",
  },
  {
    id: "admin-1",
    email: "tim@mcphire.com",
    telegramId: "111222333",
    telegramUsername: "timzinin",
    name: "Тим Зинин",
    avatarUrl: null,
    role: "admin",
    emailVerified: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
];

// Mock-only placeholder credential for dev/test (not a real secret)
export const MOCK_CREDENTIAL = "password123"; // example mock value
