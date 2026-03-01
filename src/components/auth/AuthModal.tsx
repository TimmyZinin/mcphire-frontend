// ============================================================
// СБОРКА — Auth Modal (Login + Register tabs)
// Used when user tries to apply or access protected features.
// ============================================================

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TelegramLoginButton } from "./TelegramLoginButton";
import { useAuth } from "@/contexts/AuthContext";
import type { TelegramAuthData } from "@/types";

// ---- Validation schemas ------------------------------------

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
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

// ---- Component ---------------------------------------------

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "login" | "register";
  onSuccess?: () => void;
}

export function AuthModal({
  open,
  onOpenChange,
  defaultTab = "login",
  onSuccess,
}: AuthModalProps) {
  const { login, register, loginWithTelegram } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const handleLogin = loginForm.handleSubmit(async (data) => {
    try {
      setError(null);
      await login(data);
      onOpenChange(false);
      onSuccess?.();
    } catch {
      setError("Неверный email или пароль");
    }
  });

  const handleRegister = registerForm.handleSubmit(async (data) => {
    try {
      setError(null);
      await register({ name: data.name, email: data.email, password: data.password });
      onOpenChange(false);
      onSuccess?.();
    } catch {
      setError("Этот email уже зарегистрирован");
    }
  });

  const handleTelegram = async (data: TelegramAuthData) => {
    try {
      setError(null);
      await loginWithTelegram(data);
      onOpenChange(false);
      onSuccess?.();
    } catch {
      setError("Не удалось войти через Telegram");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-black tracking-tight">
            СБОРКА<span className="text-cta-hot">.</span>
          </DialogTitle>
        </DialogHeader>

        {/* Telegram button — always visible */}
        <div className="my-2">
          <TelegramLoginButton
            botName={import.meta.env.VITE_TELEGRAM_BOT_NAME ?? "Sborka_work_bot"}
            onAuth={handleTelegram}
          />
        </div>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-3 text-xs text-muted-foreground uppercase tracking-wider">
              или email
            </span>
          </div>
        </div>

        <Tabs defaultValue={defaultTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 pt-2">
              <div>
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="you@company.ru"
                  {...loginForm.register("email")}
                />
                {loginForm.formState.errors.email && (
                  <p className="text-xs text-destructive mt-1">
                    {loginForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="login-password">Пароль</Label>
                <Input
                  id="login-password"
                  type="password"
                  {...loginForm.register("password")}
                />
                {loginForm.formState.errors.password && (
                  <p className="text-xs text-destructive mt-1">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}
              <Button
                type="submit"
                className="w-full bg-cta-hot hover:bg-cta-hot/90 text-white"
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

          {/* Register Tab */}
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 pt-2">
              <div>
                <Label htmlFor="reg-name">Имя</Label>
                <Input
                  id="reg-name"
                  placeholder="Иван Иванов"
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
                  {...registerForm.register("password")}
                />
              </div>
              <div>
                <Label htmlFor="reg-confirm">Повторите пароль</Label>
                <Input
                  id="reg-confirm"
                  type="password"
                  {...registerForm.register("confirmPassword")}
                />
                {registerForm.formState.errors.confirmPassword && (
                  <p className="text-xs text-destructive mt-1">
                    {registerForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}
              <Button
                type="submit"
                className="w-full bg-cta-hot hover:bg-cta-hot/90 text-white"
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
      </DialogContent>
    </Dialog>
  );
}
