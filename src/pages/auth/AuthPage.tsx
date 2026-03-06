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
import { PageMeta } from "@/components/seo/PageMeta";
import { useAuth } from "@/contexts/AuthContext";
import type { TelegramAuthData } from "@/types";
import { useState } from "react";

// ---- Schemas -----------------------------------------------

const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Минимум 2 символа"),
    email: z.string().email("Введите корректный email"),
    password: z.string().min(8, "Минимум 8 символов"),
    confirmPassword: z.string(),
    role: z.enum(["seeker", "employer"], { required_error: "Выберите роль" }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

// ---- Page --------------------------------------------------

export default function AuthPage() {
  const { isAuthenticated, login, register, loginWithTelegram } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

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
      await register({ name: data.name, email: data.email, password: data.password, role: data.role });
    } catch {
      setError("Этот email уже зарегистрирован");
    }
  });

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
              className="inline-flex items-center gap-2 font-black text-2xl tracking-tight"
            >
              <span className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-black text-lg">
                С
              </span>
              MCPHire<span className="text-cta-hot">.</span>
            </Link>
            <p className="text-muted-foreground text-sm mt-2">
              Войдите, чтобы откликаться на вакансии
            </p>
          </div>

          {/* Card */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            {/* Telegram */}
            <TelegramLoginButton
              botName={import.meta.env.VITE_TELEGRAM_BOT_NAME ?? "Sborka_work_bot"}
              onAuth={handleTelegram}
              buttonSize="large"
            />

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

            <Tabs defaultValue={isRegister ? "register" : "login"}>
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
                  {/* Role Selection */}
                  <div>
                    <Label className="mb-2 block">Я хочу</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <label
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                          registerForm.watch("role") === "seeker"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <input
                          type="radio"
                          value="seeker"
                          {...registerForm.register("role")}
                          className="sr-only"
                        />
                        <span className="text-2xl">🔍</span>
                        <span className="text-sm font-semibold">Найти работу</span>
                      </label>
                      <label
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                          registerForm.watch("role") === "employer"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <input
                          type="radio"
                          value="employer"
                          {...registerForm.register("role")}
                          className="sr-only"
                        />
                        <span className="text-2xl">🏢</span>
                        <span className="text-sm font-semibold">Нанять сотрудника</span>
                      </label>
                    </div>
                    {registerForm.formState.errors.role && (
                      <p className="text-xs text-destructive mt-1">
                        {registerForm.formState.errors.role.message}
                      </p>
                    )}
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
