import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { PageMeta } from "@/components/seo/PageMeta";
import { authApi } from "@/lib/api";

type Status = "loading" | "success" | "error";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setError("Ссылка недействительна");
      return;
    }

    authApi
      .verifyEmail(token)
      .then(() => setStatus("success"))
      .catch(() => {
        setStatus("error");
        setError("Ссылка истекла или недействительна");
      });
  }, [token]);

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <PageMeta title="Подтверждение email" canonical="/auth/verify" noindex />

      <div className="w-full max-w-md text-center">
        <Link to="/" className="inline-flex items-center font-mono font-bold text-2xl tracking-tight mb-8">
          <span className="text-primary">MCPHire</span><span className="text-cta-hot">.</span>
        </Link>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          {status === "loading" && (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-muted-foreground">Подтверждаем ваш email...</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center gap-4">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
              <h2 className="text-xl font-bold">Email подтверждён</h2>
              <p className="text-muted-foreground text-sm">
                Теперь вам доступен полный функционал MCPHire.
              </p>
              <Link
                to="/auth/login"
                className="mt-4 inline-flex items-center justify-center px-6 py-3 rounded-full bg-cta-hot text-white font-semibold hover:bg-cta-hot/90 transition-colors"
              >
                Войти
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center gap-4">
              <XCircle className="w-12 h-12 text-destructive" />
              <h2 className="text-xl font-bold">Ошибка</h2>
              <p className="text-muted-foreground text-sm">{error}</p>
              <Link
                to="/auth/login"
                className="mt-4 text-primary hover:underline text-sm"
              >
                Вернуться на страницу входа
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
