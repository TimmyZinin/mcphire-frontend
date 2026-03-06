// ============================================================
// MCPHire — Password Reset page
// Route: /auth/reset-password
// ============================================================

import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PageMeta } from "@/components/seo/PageMeta";

const resetSchema = z.object({
  email: z.string().email("Введите корректный email"),
});

type ResetForm = z.infer<typeof resetSchema>;

export default function PasswordResetPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (_data: ResetForm) => {
    setIsLoading(true);
    // Mock: simulate API delay
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <PageMeta title="Сброс пароля" />

      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="block text-center mb-8">
          <span className="font-heading text-3xl font-black uppercase tracking-tighter">
            MCPHire
          </span>
        </Link>

        <div className="bg-card border border-border rounded-2xl p-8">
          {isSubmitted ? (
            <div className="text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-success" />
              </div>
              <h1 className="text-xl font-bold mb-2">Проверьте почту</h1>
              <p className="text-muted-foreground text-sm mb-6">
                Если аккаунт с таким email существует, мы отправили инструкции по сбросу пароля.
              </p>
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Вернуться к входу
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-xl font-bold mb-1">Сброс пароля</h1>
                <p className="text-muted-foreground text-sm">
                  Введите email, и мы отправим ссылку для сброса пароля
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    {...register("email")}
                    className="mt-1"
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Отправить ссылку
                </Button>
              </form>

              <div className="mt-4 text-center">
                <Link
                  to="/auth/login"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Назад к входу
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
