// ============================================================
// СБОРКА — Create / Edit Job page
// Route: /employer/jobs/create  |  /employer/jobs/:id/edit
// ============================================================

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageMeta } from "@/components/seo/PageMeta";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";
import { useCreateJob, useUpdateJob } from "@/hooks/useEmployer";
import { useJob } from "@/hooks/useJobs";

// ---- Validation schema ------------------------------------

const jobSchema = z.object({
  title: z.string().min(5, "Минимум 5 символов").max(100),
  description: z.string().min(50, "Минимум 50 символов"),
  city: z.string().min(1, "Укажите город"),
  country: z.string().default("RU"),
  salaryFrom: z.number().int().positive().optional(),
  salaryTo: z.number().int().positive().optional(),
  currency: z.enum(["RUB", "USD", "EUR", "AED"]).default("RUB"),
  level: z.enum(["Junior", "Middle", "Senior", "Lead"]),
  format: z.enum(["Офис", "Удалённо", "Гибрид"]),
  employmentType: z.enum([
    "Полная занятость",
    "Частичная занятость",
    "Проект",
    "Стажировка",
  ]).default("Полная занятость"),
  category: z.string().min(1, "Выберите категорию"),
  skills: z.array(z.object({ name: z.string(), level: z.string(), required: z.boolean() })),
  requirements: z.array(z.object({ value: z.string().min(1) })),
  benefits: z.array(z.object({ value: z.string().min(1) })),
  tags: z.array(z.object({ value: z.string() })),
  expiresAt: z.string().optional(),
  companyId: z.string().default(""),
});

type JobFormData = z.infer<typeof jobSchema>;

const CATEGORIES = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "fullstack", label: "Fullstack" },
  { value: "devops", label: "DevOps / SRE" },
  { value: "mobile", label: "Mobile (iOS / Android)" },
  { value: "data", label: "Data / ML" },
  { value: "qa", label: "QA / Testing" },
  { value: "product", label: "Product Manager" },
  { value: "design", label: "Design / UX" },
  { value: "analytics", label: "Analytics" },
  { value: "security", label: "Security" },
  { value: "management", label: "Tech Management" },
];

// ---- Component ---------------------------------------------

export default function CreateJobPage() {
  const { id } = useParams<{ id?: string }>();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const [skillInput, setSkillInput] = useState("");

  const { data: existingJob } = useJob(id ?? "");
  const { mutateAsync: createJob } = useCreateJob();
  const { mutateAsync: updateJob } = useUpdateJob();

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      city: "",
      country: "RU",
      currency: "RUB",
      level: "Middle",
      format: "Удалённо",
      employmentType: "Полная занятость",
      category: "",
      skills: [],
      requirements: [{ value: "" }],
      benefits: [{ value: "" }],
      tags: [],
      companyId: "",
    },
  });

  const requirementsArray = useFieldArray({ control: form.control, name: "requirements" });
  const benefitsArray = useFieldArray({ control: form.control, name: "benefits" });
  const skillsArray = useFieldArray({ control: form.control, name: "skills" });
  const tagsArray = useFieldArray({ control: form.control, name: "tags" });

  // Populate form in edit mode
  useEffect(() => {
    if (isEditMode && existingJob) {
      form.reset({
        title: existingJob.title,
        description: existingJob.description,
        city: existingJob.city,
        country: existingJob.country,
        salaryFrom: existingJob.salaryFrom ?? undefined,
        salaryTo: existingJob.salaryTo ?? undefined,
        currency: existingJob.currency,
        level: existingJob.level,
        format: existingJob.format,
        employmentType: existingJob.employmentType,
        category: existingJob.category,
        skills: existingJob.skills,
        requirements: existingJob.requirements.map((v) => ({ value: v })),
        benefits: existingJob.benefits.map((v) => ({ value: v })),
        tags: existingJob.tags.map((v) => ({ value: v })),
        companyId: existingJob.company.id,
      });
    }
  }, [isEditMode, existingJob, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    const payload = {
      ...data,
      requirements: data.requirements.map((r) => r.value).filter(Boolean),
      benefits: data.benefits.map((b) => b.value).filter(Boolean),
      tags: data.tags.map((t) => t.value).filter(Boolean),
    };

    if (isEditMode && id) {
      await updateJob({ id, data: payload });
    } else {
      await createJob(payload as Parameters<typeof createJob>[0]);
    }
    navigate("/employer/dashboard");
  });

  const addSkill = () => {
    if (skillInput.trim()) {
      skillsArray.append({ name: skillInput.trim(), level: "intermediate", required: false });
      setSkillInput("");
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <main className="min-h-screen bg-background">
      <PageMeta
        title={isEditMode ? "Редактировать вакансию | СБОРКА" : "Разместить вакансию | СБОРКА"}
        description="Создайте вакансию и получайте отклики от IT-специалистов через AI"
        noindex
      />
      <JobBoardNavbar />

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
        <h1 className="heading-lg mb-2">
          {isEditMode ? "Редактировать вакансию" : "Разместить вакансию"}
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          Заполните форму — вакансия появится в поиске и в MCP-сервере для AI-агентов
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic info */}
          <section className="bg-card border border-border rounded-2xl p-6 space-y-5">
            <h2 className="font-bold text-sm uppercase tracking-wide">Основная информация</h2>

            <div>
              <Label htmlFor="job-title">Название вакансии *</Label>
              <Input
                id="job-title"
                placeholder="Senior Frontend Developer"
                className="mt-1"
                {...form.register("title")}
              />
              {form.formState.errors.title && (
                <p className="text-xs text-destructive mt-1">{form.formState.errors.title.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Категория *</Label>
                <Select
                  value={form.watch("category")}
                  onValueChange={(v) => form.setValue("category", v)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Выберите..." />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Уровень *</Label>
                <Select
                  value={form.watch("level")}
                  onValueChange={(v) => form.setValue("level", v as JobFormData["level"])}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Junior", "Middle", "Senior", "Lead"].map((l) => (
                      <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Формат работы *</Label>
                <Select
                  value={form.watch("format")}
                  onValueChange={(v) => form.setValue("format", v as JobFormData["format"])}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Офис", "Удалённо", "Гибрид"].map((f) => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Тип занятости</Label>
                <Select
                  value={form.watch("employmentType")}
                  onValueChange={(v) => form.setValue("employmentType", v as JobFormData["employmentType"])}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Полная занятость", "Частичная занятость", "Проект", "Стажировка"].map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="job-city">Город *</Label>
              <Input
                id="job-city"
                placeholder="Москва"
                className="mt-1"
                {...form.register("city")}
              />
            </div>
          </section>

          {/* Salary */}
          <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <h2 className="font-bold text-sm uppercase tracking-wide">Зарплата</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>От (₽)</Label>
                <Input
                  type="number"
                  placeholder="200000"
                  className="mt-1"
                  {...form.register("salaryFrom", { valueAsNumber: true })}
                />
              </div>
              <div>
                <Label>До (₽)</Label>
                <Input
                  type="number"
                  placeholder="350000"
                  className="mt-1"
                  {...form.register("salaryTo", { valueAsNumber: true })}
                />
              </div>
              <div>
                <Label>Валюта</Label>
                <Select
                  value={form.watch("currency")}
                  onValueChange={(v) => form.setValue("currency", v as JobFormData["currency"])}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["RUB", "USD", "EUR", "AED"].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Description */}
          <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <h2 className="font-bold text-sm uppercase tracking-wide">Описание вакансии *</h2>
            <Textarea
              placeholder="Расскажите о проекте, задачах, команде..."
              className="min-h-[150px]"
              {...form.register("description")}
            />
            {form.formState.errors.description && (
              <p className="text-xs text-destructive">{form.formState.errors.description.message}</p>
            )}
          </section>

          {/* Requirements */}
          <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <h2 className="font-bold text-sm uppercase tracking-wide">Требования</h2>
            {requirementsArray.fields.map((field, idx) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  placeholder="Опыт React от 3 лет"
                  {...form.register(`requirements.${idx}.value`)}
                />
                <button
                  type="button"
                  onClick={() => requirementsArray.remove(idx)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Удалить"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => requirementsArray.append({ value: "" })}
              className="flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
            >
              <Plus className="w-4 h-4" /> Добавить требование
            </button>
          </section>

          {/* Benefits */}
          <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <h2 className="font-bold text-sm uppercase tracking-wide">Что мы предлагаем</h2>
            {benefitsArray.fields.map((field, idx) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  placeholder="ДМС, бонусы, удалённая работа..."
                  {...form.register(`benefits.${idx}.value`)}
                />
                <button
                  type="button"
                  onClick={() => benefitsArray.remove(idx)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Удалить"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => benefitsArray.append({ value: "" })}
              className="flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
            >
              <Plus className="w-4 h-4" /> Добавить пункт
            </button>
          </section>

          {/* Skills */}
          <section className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <h2 className="font-bold text-sm uppercase tracking-wide">Ключевые навыки</h2>
            <div className="flex gap-2">
              <Input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="React, TypeScript, PostgreSQL..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addSkill}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillsArray.fields.map((field, idx) => (
                <span
                  key={field.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {form.watch(`skills.${idx}.name`)}
                  <button
                    type="button"
                    onClick={() => skillsArray.remove(idx)}
                    className="hover:text-destructive transition-colors"
                    aria-label={`Удалить ${form.watch(`skills.${idx}.name`)}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </section>

          {/* Expiry date */}
          <section className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-bold text-sm uppercase tracking-wide mb-4">Срок публикации</h2>
            <div>
              <Label htmlFor="expires-at">Активна до</Label>
              <Input
                id="expires-at"
                type="date"
                className="mt-1 max-w-xs"
                {...form.register("expiresAt")}
              />
            </div>
          </section>

          {/* Submit */}
          <div className="flex gap-3">
            <Button
              type="submit"
              className="bg-cta-hot hover:bg-cta-hot/90 text-white rounded-full px-8"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isEditMode ? (
                "Сохранить изменения"
              ) : (
                "Опубликовать вакансию"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={() => navigate("/employer/dashboard")}
            >
              Отмена
            </Button>
          </div>
        </form>
      </div>

      <Footer />
    </main>
  );
}
