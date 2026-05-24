// ============================================================
// MCPHire — /auth/verify-magic-link
// Consumes the token from the email, then redirects to dashboard.
// ============================================================

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageMeta } from "@/components/seo/PageMeta";
import { useAuth } from "@/contexts/AuthContext";

type State = "checking" | "ok" | "error";

export default function VerifyMagicLinkPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { verifyMagicLink } = useAuth();
  const [state, setState] = useState<State>("checking");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      setError("В ссылке нет токена. Проверьте письмо или запросите новую ссылку.");
      setState("error");
      return;
    }

    (async () => {
      try {
        await verifyMagicLink(token);
        setState("ok");
        navigate("/", { replace: true });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Ссылка устарела или уже использована. Запросите новую.",
        );
        setState("error");
      }
    })();
  }, [params, verifyMagicLink, navigate]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <PageMeta title="Вход" noindex />
      <div className="max-w-md w-full text-center space-y-4">
        {state === "checking" && (
          <>
            <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary" />
            <p className="text-muted-foreground">Проверяем ссылку…</p>
          </>
        )}
        {state === "error" && (
          <>
            <AlertCircle className="w-12 h-12 mx-auto text-destructive" />
            <h1 className="text-xl font-semibold">Не получилось войти</h1>
            <p className="text-muted-foreground text-sm">{error}</p>
            <Button asChild>
              <Link to="/auth/login">Запросить новую ссылку</Link>
            </Button>
          </>
        )}
      </div>
    </main>
  );
}
