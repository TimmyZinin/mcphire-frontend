// ============================================================
// MCPHire — /auth/login and /auth/register page
// ============================================================

import { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TelegramLoginButton } from "@/components/auth/TelegramLoginButton";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";
import { Info } from "lucide-react";
import { PageMeta } from "@/components/seo/PageMeta";
import { useAuth } from "@/contexts/AuthContext";
import type { TelegramAuthData } from "@/types";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

// ---- Schemas -----------------------------------------------

const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});

// MCP-first parity (Sprint 4 fix F-H1): web email registration is candidate-only.
// Employer onboarding lives on /employers (Claude Desktop prompt → MCP register_employer_profile).
// We hard-code role='seeker' on the schema so this form physically cannot create an employer account
// — the toggle is gone and the API call below cannot be flipped from devtools either.
const registerSchema = z
  .object({
    name: z.string().min(2, "Минимум 2 символа"),
    email: z.string().email("Введите корректный email"),
    password: z.string().min(8, "Минимум 8 символов"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

// ---- Page --------------------------------------------------

export default function AuthPage() {
  const { isAuthenticated, login, register, loginWithTelegram, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Redirect if already authenticated
  const from = (location.state as { from?: string })?.from ?? "/";
  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, from, navigate]);

  // Determine initial tab from URL
  const isRegister = location.pathname.includes("register");

  const loginForm = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });
  const registerForm = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const handleLogin = loginForm.handleSubmit(async (data) => {
    try {
      setError(null);
      await login(data);
    } catch {
      setError("Неверный email или пароль");
    }
  });

  const handleRegister = registerForm.handleSubmit(async (data) => {
    try {
      setError(null);
      // Sprint 4 fix F-H1: web email registration is candidate-only.
      // Employer onboarding goes through MCP (see /employers). Backend
      // additionally force-coerces role='seeker' regardless of payload
      // (RegisterRequest.force_seeker_role validator).
      await register({ name: data.name, email: data.email, password: data.password });
      setRegistrationSuccess(true);
    } catch {
      setError("Этот email уже зарегистрирован");
    }
  });

  const handleGoogle = async (credential: string) => {
    try {
      setError(null);
      await loginWithGoogle(credential);
    } catch {
      setError("Не удалось войти через Google");
    }
  };

  const handleTelegram = async (data: TelegramAuthData) => {
    try {
      setError(null);
      await loginWithTelegram(data);
    } catch {
      setError("Не удалось войти через Telegram");
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <PageMeta
        title="Войти в MCPHire"
        description="Войдите через Telegram или email, чтобы откликаться на вакансии и создать профиль."
        canonical="/auth/login"
        noindex
      />

      {/* Back to home */}
      <div className="p-4">
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          ← Главная
        </Link>
      </div>

      {/* Centered card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-flex items-center font-mono font-bold text-2xl tracking-tight"
            >
              <span className="text-primary">MCPHire</span><span className="text-cta-hot">.</span>
            </Link>
            <p className="text-muted-foreground text-sm mt-2">
              Войдите, чтобы откликаться на вакансии
            </p>
          </div>

          {/* Registration success */}
          {registrationSuccess && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mb-6 text-center">
              <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Аккаунт создан</h3>
              <p className="text-sm text-muted-foreground">
                Мы отправили письмо для подтверждения email. Проверьте почту.
              </p>
            </div>
          )}

          {/* Card */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            {/* Social login buttons — for seekers / quick login.
                For employer flow we route to MCP-first onboarding (see notice on Register tab). */}
            <div className="space-y-3">
              <TelegramLoginButton
                botName={import.meta.env.VITE_TELEGRAM_BOT_NAME ?? "mcphire_bot"}
                onAuth={handleTelegram}
                buttonSize="large"
              />
              <GoogleLoginButton
                clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ""}
                onAuth={handleGoogle}
              />
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-3 text-xs text-muted-foreground uppercase tracking-wider">
                  или email
                </span>
              </div>
            </div>

            <Tabs defaultValue={isRegister ? "register" : "login"} key={isRegister ? "register" : "login"}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Вход</TabsTrigger>
                <TabsTrigger value="register">Регистрация</TabsTrigger>
              </TabsList>

              {/* Login */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.ru"
                      className="mt-1"
                      {...loginForm.register("email")}
                    />
                    {loginForm.formState.errors.email && (
                      <p className="text-xs text-destructive mt-1">
                        {loginForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="password">Пароль</Label>
                    <Input
                      id="password"
                      type="password"
                      className="mt-1"
                      {...loginForm.register("password")}
                    />
                    {loginForm.formState.errors.password && (
                      <p className="text-xs text-destructive mt-1">
                        {loginForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>
                  {error && (
                    <p className="text-sm text-destructive text-center bg-destructive/5 rounded-lg p-2">
                      {error}
                    </p>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-cta-hot hover:bg-cta-hot/90 text-white rounded-full"
                    disabled={loginForm.formState.isSubmitting}
                  >
                    {loginForm.formState.isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Войти"
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Register */}
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  {/* MCP-first parity (Sprint 4 fix F-H1):
                      Web email registration is candidate-only. Employers don't
                      use a web form at all — registration runs through Claude
                      Desktop (MCP register_employer_profile). The banner below
                      is the canonical path for anyone who landed here looking
                      to hire. */}
                  <div
                    role="region"
                    aria-label="Работодателям: регистрация через Claude Desktop"
                    className="border border-primary/30 bg-primary/5 rounded-xl p-4 flex gap-3"
                  >
                    <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="text-sm">
                      <p className="font-semibold mb-1">Ищешь сотрудника? Регистрация работодателя — через Claude Desktop</p>
                      <p className="text-muted-foreground mb-2">
                        Работодатели на MCPHire регистрируют компанию через MCP-агента: один промт, ~40 вопросов из публичного контекста компании, approval screen с точной фразой согласия, готово. Email-форма ниже — только для кандидатов (поиск работы).
                      </p>
                      <Link
                        to="/employers"
                        className="font-semibold text-primary hover:text-primary/80 transition-colors"
                      >
                        Открыть инструкцию для работодателей →
                      </Link>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reg-name">Имя</Label>
                    <Input
                      id="reg-name"
                      placeholder="Иван Иванов"
                      className="mt-1"
                      {...registerForm.register("name")}
                    />
                    {registerForm.formState.errors.name && (
                      <p className="text-xs text-destructive mt-1">
                        {registerForm.formState.errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="reg-email">Email</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="you@company.ru"
                      className="mt-1"
                      {...registerForm.register("email")}
                    />
                    {registerForm.formState.errors.email && (
                      <p className="text-xs text-destructive mt-1">
                        {registerForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="reg-password">Пароль</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="Минимум 8 символов"
                      className="mt-1"
                      {...registerForm.register("password")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="reg-confirm">Повторите пароль</Label>
                    <Input
                      id="reg-confirm"
                      type="password"
                      className="mt-1"
                      {...registerForm.register("confirmPassword")}
                    />
                    {registerForm.formState.errors.confirmPassword && (
                      <p className="text-xs text-destructive mt-1">
                        {registerForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                  {error && (
                    <p className="text-sm text-destructive text-center bg-destructive/5 rounded-lg p-2">
                      {error}
                    </p>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-cta-hot hover:bg-cta-hot/90 text-white rounded-full"
                    disabled={registerForm.formState.isSubmitting}
                  >
                    {registerForm.formState.isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Создать аккаунт"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Регистрируясь, вы принимаете{" "}
            <Link to="/privacy" className="underline hover:text-primary">
              условия использования
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
