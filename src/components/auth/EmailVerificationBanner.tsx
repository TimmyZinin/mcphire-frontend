// ============================================================
// MCPHire — Email Verification Banner
// Shows when user is logged in but email not verified.
// ============================================================

import { useState } from "react";
import { Mail, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function EmailVerificationBanner() {
  const { user, isAuthenticated } = useAuth();
  const [dismissed, setDismissed] = useState(false);

  if (!isAuthenticated || !user || user.emailVerified || dismissed) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-amber-800">
          <Mail className="w-4 h-4 shrink-0" />
          <span>
            Подтвердите email <strong>{user.email}</strong> для полного доступа к платформе.
          </span>
          <button className="underline font-medium hover:no-underline whitespace-nowrap">
            Отправить повторно
          </button>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 text-amber-600 hover:text-amber-800 transition-colors shrink-0"
          aria-label="Скрыть"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
