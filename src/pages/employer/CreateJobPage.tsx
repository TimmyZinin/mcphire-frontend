// ============================================================
// MCPHire — Create / Edit Job page — 4-step wizard
// Route: /employer/jobs/create  |  /employer/jobs/:id/edit
// Steps: Основное → Требования → Условия → Превью
// ============================================================

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus, Trash2, MapPin, Briefcase, Calendar } from "lucide-react";
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
  experience: z.string().optional(),
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

const EXPERIENCE_OPTIONS = [
  { value: "no_experience", label: "Без опыта" },
  { value: "1_year", label: "От 1 года" },
  { value: "2_years", label: "От 2 лет" },
  { value: "3_years", label: "От 3 лет" },
  { value: "5_years", label: "От 5 лет" },
  { value: "10_years", label: "От 10 лет" },
];

// ---- Step indicator ----------------------------------------

const STEPS = [
  { id: 1, label: "Основное" },
  { id: 2, label: "Требования" },
  { id: 3, label: "Условия" },
  { id: 4, label: "Превью" },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10 select-none">
      {STEPS.map((step, idx) => {
        const isCompleted = current > step.id;
        const isActive = current === step.id;
        const isLast = idx === STEPS.length - 1;

        return (
          <div key={step.id} className="flex items-center">
            {/* Circle + label */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={[
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200",
                  isCompleted
                    ? "bg-[#B5563E] text-white"
                    : isActive
                    ? "bg-[#B5563E] text-white ring-4 ring-[#B5563E]/20"
                    : "bg-muted text-muted-foreground",
                ].join(" ")}
              >
                {isCompleted ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <span
                className={[
                  "text-xs font-medium whitespace-nowrap",
                  isActive ? "text-[#B5563E]" : isCompleted ? "text-foreground" : "text-muted-foreground",
                ].join(" ")}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div
                className={[
                  "h-0.5 w-12 md:w-20 mx-1 mb-5 transition-all duration-300",
                  isCompleted ? "bg-[#B5563E]" : "bg-border",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---- Field error helper ------------------------------------

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive mt-1">{message}</p>;
}

// ---- Section wrapper ---------------------------------------

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-card border border-border rounded-2xl p-6 space-y-5">
      <h2 className="font-bold text-sm uppercase tracking-wide text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

// ---- Navigation buttons ------------------------------------

function StepNav({
  step,
  totalSteps,
  onBack,
  onNext,
  isLastStep = false,
  isSubmitting = false,
}: {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  isLastStep?: boolean;
  isSubmitting?: boolean;
}) {
  return (
    <div className="flex items-center justify-between pt-2">
      <Button
        type="button"
        variant="ghost"
        className="rounded-full px-6"
        onClick={onBack}
        disabled={step === 1}
      >
        ← Назад
      </Button>

      {!isLastStep && (
        <Button
          type="button"
          className="bg-[#B5563E] hover:bg-[#B5563E]/90 text-white rounded-full px-8"
          onClick={onNext}
        >
          Далее →
        </Button>
      )}

      {isLastStep && (
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="rounded-full px-6"
            onClick={onNext}
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Сохранить черновик"}
          </Button>
          <Button
            type="submit"
            className="bg-[#B5563E] hover:bg-[#B5563E]/90 text-white rounded-full px-8"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Опубликовать"}
          </Button>
        </div>
      )}
    </div>
  );
}

// ---- Preview card ------------------------------------------

function PreviewCard({ data }: { data: JobFormData }) {
  const categoryLabel =
    CATEGORIES.find((c) => c.value === data.category)?.label ?? data.category;

  const salaryText = (() => {
    const cur = data.currency === "RUB" ? "₽" : data.currency;
    if (data.salaryFrom && data.salaryTo) {
      return `${data.salaryFrom.toLocaleString()} — ${data.salaryTo.toLocaleString()} ${cur}`;
    }
    if (data.salaryFrom) return `от ${data.salaryFrom.toLocaleString()} ${cur}`;
    if (data.salaryTo) return `до ${data.salaryTo.toLocaleString()} ${cur}`;
    return null;
  })();

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#B5563E]/10 text-[#B5563E] text-xs font-semibold">
            {categoryLabel}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
            {data.level}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
            {data.format}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
            {data.employmentType}
          </span>
        </div>
        <h3 className="font-heading text-xl font-bold text-foreground">
          {data.title || <span className="text-muted-foreground italic">Название вакансии</span>}
        </h3>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        {data.city && (
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {data.city}
          </span>
        )}
        {salaryText && (
          <span className="flex items-center gap-1 font-semibold text-foreground">
            <Briefcase className="w-3.5 h-3.5" />
            {salaryText}
          </span>
        )}
        {data.expiresAt && (
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            до {new Date(data.expiresAt).toLocaleDateString("ru-RU")}
          </span>
        )}
      </div>

      {/* Description */}
      {data.description && (
        <div>
          <p className="text-sm font-semibold mb-1">Описание</p>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {data.description}
          </p>
        </div>
      )}

      {/* Requirements */}
      {data.requirements.some((r) => r.value.trim()) && (
        <div>
          <p className="text-sm font-semibold mb-2">Требования</p>
          <ul className="space-y-1">
            {data.requirements
              .filter((r) => r.value.trim())
              .map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#B5563E] flex-shrink-0" />
                  {r.value}
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <p className="text-sm font-semibold mb-2">Ключевые навыки</p>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((s, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-[#B5563E]/10 text-[#B5563E] text-xs font-medium"
              >
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Benefits */}
      {data.benefits.some((b) => b.value.trim()) && (
        <div>
          <p className="text-sm font-semibold mb-2">Что мы предлагаем</p>
          <ul className="space-y-1">
            {data.benefits
              .filter((b) => b.value.trim())
              .map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  {b.value}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ---- Main component ----------------------------------------

export default function CreateJobPage() {
  const { id } = useParams<{ id?: string }>();
  const isEditMode = !!id;
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
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
      experience: "",
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
        requirements: existingJob.requirements.map((v: string) => ({ value: v })),
        benefits: existingJob.benefits.map((v: string) => ({ value: v })),
        tags: existingJob.tags.map((v: string) => ({ value: v })),
        companyId: existingJob.company.id,
      });
    }
  }, [isEditMode, existingJob, form]);

  const buildPayload = (data: JobFormData) => ({
    ...data,
    requirements: data.requirements.map((r) => r.value).filter(Boolean),
    benefits: data.benefits.map((b) => b.value).filter(Boolean),
    tags: data.tags.map((t) => t.value).filter(Boolean),
  });

  const handlePublish = form.handleSubmit(async (data) => {
    const payload = buildPayload(data);
    if (isEditMode && id) {
      await updateJob({ id, data: payload });
    } else {
      await createJob(payload as Parameters<typeof createJob>[0]);
    }
    navigate("/employer/dashboard");
  });

  const handleSaveDraft = async () => {
    const data = form.getValues();
    const payload = { ...buildPayload(data), status: "draft" };
    if (isEditMode && id) {
      await updateJob({ id, data: payload });
    } else {
      await createJob(payload as Parameters<typeof createJob>[0]);
    }
    navigate("/employer/dashboard");
  };

  // Step validation — only validate fields belonging to current step before advancing
  const STEP_FIELDS: Record<number, (keyof JobFormData)[]> = {
    1: ["title", "description", "category", "level", "format", "employmentType", "city"],
    2: ["skills", "experience", "requirements"],
    3: ["salaryFrom", "salaryTo", "currency", "benefits", "expiresAt"],
    4: [],
  };

  const goNext = async () => {
    const fields = STEP_FIELDS[step];
    const valid = await form.trigger(fields);
    if (valid) setStep((s) => Math.min(s + 1, 4));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const addSkill = () => {
    if (skillInput.trim()) {
      skillsArray.append({ name: skillInput.trim(), level: "intermediate", required: false });
      setSkillInput("");
    }
  };

  const isSubmitting = form.formState.isSubmitting;
  const watchedData = form.watch();

  return (
    <main className="min-h-screen bg-background">
      <PageMeta
        title={isEditMode ? "Редактировать вакансию | MCPHire" : "Разместить вакансию | MCPHire"}
        description="Создайте вакансию и получайте отклики от IT-специалистов через AI"
        noindex
      />
      <JobBoardNavbar />

      <div className="max-w-2xl mx-auto px-4 md:px-8 py-10">
        {/* Page heading */}
        <div className="mb-8 text-center">
          <h1 className="font-heading text-2xl md:text-3xl font-bold mb-1">
            {isEditMode ? "Редактировать вакансию" : "Разместить вакансию"}
          </h1>
          <p className="text-muted-foreground text-sm">
            Вакансия появится в поиске и в MCP-сервере для AI-агентов
          </p>
        </div>

        {/* Step indicator */}
        <StepIndicator current={step} />

        {/* Form */}
        <form onSubmit={handlePublish} className="space-y-5">
          {/* ── STEP 1: Основное ─────────────────────────────── */}
          {step === 1 && (
            <>
              <FormSection title="Основная информация">
                <div>
                  <Label htmlFor="job-title">Название вакансии *</Label>
                  <Input
                    id="job-title"
                    placeholder="Senior Frontend Developer"
                    className="mt-1"
                    {...form.register("title")}
                  />
                  <FieldError message={form.formState.errors.title?.message} />
                </div>

                <div>
                  <Label htmlFor="job-desc">Описание вакансии *</Label>
                  <Textarea
                    id="job-desc"
                    placeholder="Расскажите о проекте, задачах, команде..."
                    className="mt-1 min-h-[140px]"
                    {...form.register("description")}
                  />
                  <FieldError message={form.formState.errors.description?.message} />
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
                    <FieldError message={form.formState.errors.category?.message} />
                  </div>

                  <div>
                    <Label>Уровень *</Label>
                    <Select
                      value={form.watch("level")}
                      onValueChange={(v) =>
                        form.setValue("level", v as JobFormData["level"])
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["Junior", "Middle", "Senior", "Lead"].map((l) => (
                          <SelectItem key={l} value={l}>
                            {l}
                          </SelectItem>
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
                      onValueChange={(v) =>
                        form.setValue("format", v as JobFormData["format"])
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["Офис", "Удалённо", "Гибрид"].map((f) => (
                          <SelectItem key={f} value={f}>
                            {f}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Тип занятости</Label>
                    <Select
                      value={form.watch("employmentType")}
                      onValueChange={(v) =>
                        form.setValue(
                          "employmentType",
                          v as JobFormData["employmentType"]
                        )
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Полная занятость",
                          "Частичная занятость",
                          "Проект",
                          "Стажировка",
                        ].map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
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
                  <FieldError message={form.formState.errors.city?.message} />
                </div>
              </FormSection>

              <StepNav step={step} totalSteps={4} onBack={goBack} onNext={goNext} />
            </>
          )}

          {/* ── STEP 2: Требования ───────────────────────────── */}
          {step === 2 && (
            <>
              <FormSection title="Ключевые навыки">
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
                <div className="flex flex-wrap gap-2 min-h-[32px]">
                  {skillsArray.fields.map((field, idx) => (
                    <span
                      key={field.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#B5563E]/10 text-[#B5563E] text-sm font-medium"
                    >
                      {form.watch(`skills.${idx}.name`)}
                      <button
                        type="button"
                        onClick={() => skillsArray.remove(idx)}
                        className="hover:text-destructive transition-colors leading-none"
                        aria-label={`Удалить ${form.watch(`skills.${idx}.name`)}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {skillsArray.fields.length === 0 && (
                    <p className="text-xs text-muted-foreground italic">Навыки не добавлены</p>
                  )}
                </div>
              </FormSection>

              <FormSection title="Опыт работы">
                <div>
                  <Label>Требуемый опыт</Label>
                  <Select
                    value={form.watch("experience") ?? ""}
                    onValueChange={(v) => form.setValue("experience", v)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Выберите..." />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPERIENCE_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </FormSection>

              <FormSection title="Требования к кандидату">
                <div className="space-y-3">
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
                </div>
                <button
                  type="button"
                  onClick={() => requirementsArray.append({ value: "" })}
                  className="flex items-center gap-1.5 text-sm text-[#B5563E] hover:underline font-medium"
                >
                  <Plus className="w-4 h-4" /> Добавить требование
                </button>
              </FormSection>

              <StepNav step={step} totalSteps={4} onBack={goBack} onNext={goNext} />
            </>
          )}

          {/* ── STEP 3: Условия ──────────────────────────────── */}
          {step === 3 && (
            <>
              <FormSection title="Зарплата">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label>От</Label>
                    <Input
                      type="number"
                      placeholder="200 000"
                      className="mt-1"
                      {...form.register("salaryFrom", { valueAsNumber: true })}
                    />
                  </div>
                  <div>
                    <Label>До</Label>
                    <Input
                      type="number"
                      placeholder="350 000"
                      className="mt-1"
                      {...form.register("salaryTo", { valueAsNumber: true })}
                    />
                  </div>
                  <div>
                    <Label>Валюта</Label>
                    <Select
                      value={form.watch("currency")}
                      onValueChange={(v) =>
                        form.setValue("currency", v as JobFormData["currency"])
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["RUB", "USD", "EUR", "AED"].map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </FormSection>

              <FormSection title="Что мы предлагаем">
                <div className="space-y-3">
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
                </div>
                <button
                  type="button"
                  onClick={() => benefitsArray.append({ value: "" })}
                  className="flex items-center gap-1.5 text-sm text-[#B5563E] hover:underline font-medium"
                >
                  <Plus className="w-4 h-4" /> Добавить пункт
                </button>
              </FormSection>

              <FormSection title="Срок публикации">
                <div>
                  <Label htmlFor="expires-at">Активна до</Label>
                  <Input
                    id="expires-at"
                    type="date"
                    className="mt-1 max-w-xs"
                    {...form.register("expiresAt")}
                  />
                </div>
              </FormSection>

              <StepNav step={step} totalSteps={4} onBack={goBack} onNext={goNext} />
            </>
          )}

          {/* ── STEP 4: Превью ───────────────────────────────── */}
          {step === 4 && (
            <>
              <div className="space-y-2 mb-1">
                <h2 className="font-bold text-sm uppercase tracking-wide text-muted-foreground">
                  Предварительный просмотр
                </h2>
                <p className="text-xs text-muted-foreground">
                  Так вакансия будет выглядеть в поиске. Проверьте перед публикацией.
                </p>
              </div>

              <PreviewCard data={watchedData} />

              {/* Edit links */}
              <div className="flex flex-wrap gap-3 text-sm">
                {[
                  { label: "Изменить основное", toStep: 1 },
                  { label: "Изменить требования", toStep: 2 },
                  { label: "Изменить условия", toStep: 3 },
                ].map(({ label, toStep }) => (
                  <button
                    key={toStep}
                    type="button"
                    onClick={() => setStep(toStep)}
                    className="text-[#B5563E] hover:underline font-medium"
                  >
                    {label}
                  </button>
                ))}
              </div>

              <StepNav
                step={step}
                totalSteps={4}
                onBack={goBack}
                onNext={handleSaveDraft}
                isLastStep
                isSubmitting={isSubmitting}
              />
            </>
          )}
        </form>
      </div>

      <Footer />
    </main>
  );
}
