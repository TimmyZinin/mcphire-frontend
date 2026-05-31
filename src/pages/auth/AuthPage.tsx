// ============================================================
// MCPHire — /auth/login — passwordless magic-link only
// (Sprint 12 task 33 — Moltbook-style auth). Bilingual (RU/EN).
// ============================================================

import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PageMeta } from "@/components/seo/PageMeta";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";

type FormValues = { email: string };

export default function AuthPage() {
  const { isAuthenticated, requestMagicLink } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();
  const L = i18n.language?.startsWith("en");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const from = (location.state as { from?: string })?.from ?? "/";

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  const schema = z.object({
    email: z.string().email(L ? "Enter a valid email" : "Введите корректный email"),
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setError(null);
    try {
      await requestMagicLink(values.email);
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : (L ? "Could not send the email. Please try again." : "Не удалось отправить письмо. Попробуйте ещё раз."),
      );
    }
  };

  const switcher = (
    <div className="fixed top-4 right-4 z-50">
      <LanguageSwitcher />
    </div>
  );

  if (sent) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background px-4">
        {switcher}
        <PageMeta title={L ? "Email sent" : "Письмо отправлено"} noindex />
        <div className="max-w-md w-full text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 mx-auto text-primary" />
          <h1 className="text-2xl font-semibold">{L ? "Check your inbox" : "Проверьте почту"}</h1>
          <p className="text-muted-foreground">
            {L ? "We sent a one-time sign-in link to " : "Мы отправили одноразовую ссылку для входа на "}
            <strong>{form.getValues("email")}</strong>
            {L
              ? ". Open the email and click the button — the link is valid for 15 minutes."
              : ". Откройте письмо и нажмите кнопку — ссылка действительна 15 минут."}
          </p>
          <Button variant="outline" onClick={() => setSent(false)}>
            {L ? "Use a different email" : "Ввести другой email"}
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      {switcher}
      <PageMeta
        title={L ? "Sign in — MCPHire" : "Вход — MCPHire"}
        description={
          L
            ? "Sign in to MCPHire with a one-time link sent to your email."
            : "Войдите в MCPHire по одноразовой ссылке на email."
        }
      />
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <span className="font-mono text-2xl font-bold">
              MCPHire<span className="text-primary">.</span>
            </span>
          </Link>
          <h1 className="text-2xl font-semibold">{L ? "Sign in" : "Вход"}</h1>
          <p className="text-muted-foreground text-sm">
            {L
              ? "Enter your email — we'll send a sign-in link. No password."
              : "Введите email — мы пришлём ссылку для входа. Без пароля."}
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              autoFocus
              placeholder="you@example.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            {L ? "Send sign-in link" : "Прислать ссылку для входа"}
          </Button>
        </form>

        <p className="text-xs text-center text-muted-foreground">
          {L
            ? "No account? A link to this email will create one automatically."
            : "Нет аккаунта? Ссылка по этому email создаст его автоматически."}
        </p>
      </div>
    </main>
  );
}
