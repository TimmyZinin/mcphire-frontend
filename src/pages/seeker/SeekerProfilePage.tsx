// ============================================================
// СБОРКА — Seeker Profile / Resume builder page
// Route: /profile (protected: seeker)
// ============================================================

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2, Loader2, Upload } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PageMeta } from "@/components/seo/PageMeta";
import { ProfileSkeleton } from "@/components/ui/SkeletonCard";
import JobBoardNavbar from "@/components/JobBoardNavbar";
import Footer from "@/components/Footer";
import { useSeekerProfile, useUpdateSeekerProfile, useUploadResume } from "@/hooks/useSeeker";
import { applicationStatusLabels, applicationStatusColors } from "@/lib/formatters";
import { useSeekerApplications } from "@/hooks/useSeeker";
import { cn } from "@/lib/utils";

// ---- Validation schema ------------------------------------

const profileSchema = z.object({
  headline: z.string().min(5, "Минимум 5 символов").max(120),
  summary: z.string().max(600).optional(),
  city: z.string().optional(),
  phone: z.string().optional(),
  linkedinUrl: z.string().url("Введите корректный URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Введите корректный URL").optional().or(z.literal("")),
  portfolioUrl: z.string().url("Введите корректный URL").optional().or(z.literal("")),
  desiredSalaryFrom: z.number().int().positive().optional(),
  desiredSalaryTo: z.number().int().positive().optional(),
  isOpenToWork: z.boolean(),
  skills: z.array(z.object({ name: z.string(), level: z.string(), required: z.boolean() })),
  experience: z.array(
    z.object({
      company: z.string().min(1),
      position: z.string().min(1),
      startDate: z.string(),
      endDate: z.string().optional(),
      isCurrent: z.boolean(),
      description: z.string(),
    })
  ),
  education: z.array(
    z.object({
      institution: z.string().min(1),
      degree: z.string(),
      field: z.string(),
      startYear: z.number().int(),
      endYear: z.number().int().optional(),
    })
  ),
});

type ProfileFormData = z.infer<typeof profileSchema>;

// ---- Applications tab --------------------------------------

function ApplicationsTab() {
  const { data: applications, isLoading } = useSeekerApplications();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 bg-muted animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  if (!applications?.length) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg font-medium mb-2">Откликов пока нет</p>
        <p className="text-sm">Найдите вакансии и откликнитесь</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {applications.map((app) => (
        <div
          key={app.id}
          className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-4"
        >
          <div>
            <p className="font-semibold text-sm">{app.job.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {app.job.company.name} · {app.job.city}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Отклик: {new Date(app.appliedAt).toLocaleDateString("ru-RU")}
            </p>
          </div>
          <span
            className={cn(
              "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shrink-0",
              applicationStatusColors[app.status]
            )}
          >
            {applicationStatusLabels[app.status]}
          </span>
        </div>
      ))}
    </div>
  );
}

// ---- Main page ---------------------------------------------

export default function SeekerProfilePage() {
  const { data: profile, isLoading } = useSeekerProfile();
  const { mutateAsync: updateProfile, isPending: isSaving } = useUpdateSeekerProfile();
  const { mutateAsync: uploadResume, isPending: isUploading } = useUploadResume();
  const [skillInput, setSkillInput] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    values: profile
      ? {
          headline: profile.headline,
          summary: profile.summary ?? "",
          city: profile.city ?? "",
          phone: profile.phone ?? "",
          linkedinUrl: profile.linkedinUrl ?? "",
          githubUrl: profile.githubUrl ?? "",
          portfolioUrl: profile.portfolioUrl ?? "",
          desiredSalaryFrom: profile.desiredSalaryFrom ?? undefined,
          desiredSalaryTo: profile.desiredSalaryTo ?? undefined,
          isOpenToWork: profile.isOpenToWork,
          skills: profile.skills,
          experience: profile.experience,
          education: profile.education,
        }
      : undefined,
  });

  const experienceArray = useFieldArray({ control: form.control, name: "experience" });
  const educationArray = useFieldArray({ control: form.control, name: "education" });
  const skillsArray = useFieldArray({ control: form.control, name: "skills" });

  const handleSubmit = form.handleSubmit(async (data) => {
    await updateProfile(data);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  });

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await uploadResume(file);
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      skillsArray.append({ name: skillInput.trim(), level: "intermediate", required: false });
      setSkillInput("");
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <JobBoardNavbar />
        <div className="max-w-4xl mx-auto px-8 py-12">
          <ProfileSkeleton />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <PageMeta
        title="Мой профиль | СБОРКА"
        description="Заполните профиль и резюме для отклика на вакансии"
        noindex
      />
      <JobBoardNavbar />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="heading-lg">Мой профиль</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Заполните резюме, чтобы откликаться на вакансии
            </p>
          </div>
          {/* Open to work toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...form.register("isOpenToWork")}
              className="sr-only"
            />
            <div
              className={cn(
                "relative w-10 h-5 rounded-full transition-colors",
                form.watch("isOpenToWork") ? "bg-primary" : "bg-muted"
              )}
              onClick={() => form.setValue("isOpenToWork", !form.watch("isOpenToWork"))}
            >
              <span
                className={cn(
                  "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm",
                  form.watch("isOpenToWork") ? "translate-x-5" : "translate-x-0.5"
                )}
              />
            </div>
            <span className="text-sm font-medium">Открыт к предложениям</span>
          </label>
        </div>

        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="experience">Опыт</TabsTrigger>
            <TabsTrigger value="skills">Навыки</TabsTrigger>
            <TabsTrigger value="applications">Мои отклики</TabsTrigger>
          </TabsList>

          {/* ---- Profile Tab ---- */}
          <TabsContent value="profile">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
                <h2 className="font-bold text-base uppercase tracking-wide">Основное</h2>

                <div>
                  <Label htmlFor="headline">Заголовок профиля *</Label>
                  <Input
                    id="headline"
                    placeholder="Senior Frontend Developer | React, TypeScript"
                    className="mt-1"
                    {...form.register("headline")}
                  />
                  {form.formState.errors.headline && (
                    <p className="text-xs text-destructive mt-1">
                      {form.formState.errors.headline.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="summary">О себе</Label>
                  <Textarea
                    id="summary"
                    placeholder="Кратко о вашем опыте и целях..."
                    className="mt-1 min-h-[100px]"
                    {...form.register("summary")}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Город</Label>
                    <Input id="city" placeholder="Москва" className="mt-1" {...form.register("city")} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" placeholder="+7 999 000-00-00" className="mt-1" {...form.register("phone")} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="salaryFrom">Зарплата от (₽)</Label>
                    <Input
                      id="salaryFrom"
                      type="number"
                      placeholder="200000"
                      className="mt-1"
                      {...form.register("desiredSalaryFrom", { valueAsNumber: true })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="salaryTo">Зарплата до (₽)</Label>
                    <Input
                      id="salaryTo"
                      type="number"
                      placeholder="350000"
                      className="mt-1"
                      {...form.register("desiredSalaryTo", { valueAsNumber: true })}
                    />
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                <h2 className="font-bold text-base uppercase tracking-wide">Ссылки</h2>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" placeholder="https://linkedin.com/in/..." className="mt-1" {...form.register("linkedinUrl")} />
                </div>
                <div>
                  <Label htmlFor="github">GitHub</Label>
                  <Input id="github" placeholder="https://github.com/..." className="mt-1" {...form.register("githubUrl")} />
                </div>
                <div>
                  <Label htmlFor="portfolio">Портфолио</Label>
                  <Input id="portfolio" placeholder="https://..." className="mt-1" {...form.register("portfolioUrl")} />
                </div>
              </div>

              {/* Resume upload */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-bold text-base uppercase tracking-wide mb-4">Резюме (PDF)</h2>
                <label className="flex items-center gap-3 p-4 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary transition-colors group">
                  <Upload className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {isUploading ? "Загружаем..." : "Загрузить PDF резюме"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleResumeUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="submit"
                  className="bg-cta-hot hover:bg-cta-hot/90 text-white rounded-full px-8"
                  disabled={isSaving}
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Сохранить"}
                </Button>
                {saveSuccess && (
                  <span className="text-sm text-primary font-medium">Сохранено</span>
                )}
              </div>
            </form>
          </TabsContent>

          {/* ---- Experience Tab ---- */}
          <TabsContent value="experience">
            <form onSubmit={handleSubmit} className="space-y-4">
              {experienceArray.fields.map((field, idx) => (
                <div key={field.id} className="bg-card border border-border rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-sm uppercase tracking-wide">
                      Место работы {idx + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => experienceArray.remove(idx)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                      aria-label="Удалить"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Компания *</Label>
                      <Input className="mt-1" {...form.register(`experience.${idx}.company`)} />
                    </div>
                    <div>
                      <Label>Должность *</Label>
                      <Input className="mt-1" {...form.register(`experience.${idx}.position`)} />
                    </div>
                    <div>
                      <Label>Дата начала</Label>
                      <Input type="month" className="mt-1" {...form.register(`experience.${idx}.startDate`)} />
                    </div>
                    <div>
                      <Label>Дата окончания</Label>
                      <Input
                        type="month"
                        className="mt-1"
                        disabled={form.watch(`experience.${idx}.isCurrent`)}
                        {...form.register(`experience.${idx}.endDate`)}
                      />
                      <label className="flex items-center gap-2 mt-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          {...form.register(`experience.${idx}.isCurrent`)}
                        />
                        По настоящее время
                      </label>
                    </div>
                  </div>
                  <div>
                    <Label>Описание</Label>
                    <Textarea
                      className="mt-1"
                      placeholder="Чем занимались, чего достигли..."
                      {...form.register(`experience.${idx}.description`)}
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  experienceArray.append({
                    company: "",
                    position: "",
                    startDate: "",
                    endDate: "",
                    isCurrent: false,
                    description: "",
                  })
                }
                className="flex items-center gap-2 text-sm text-primary hover:underline font-medium"
              >
                <Plus className="w-4 h-4" /> Добавить место работы
              </button>

              <Button
                type="submit"
                className="bg-cta-hot hover:bg-cta-hot/90 text-white rounded-full px-8"
                disabled={isSaving}
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Сохранить"}
              </Button>
            </form>
          </TabsContent>

          {/* ---- Skills Tab ---- */}
          <TabsContent value="skills">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-bold text-base uppercase tracking-wide mb-4">Навыки</h2>

                {/* Skill input */}
                <div className="flex gap-2 mb-4">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="React, TypeScript, Docker..."
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

                {/* Skills list */}
                <div className="flex flex-wrap gap-2">
                  {skillsArray.fields.map((field, idx) => (
                    <Badge
                      key={field.id}
                      variant="secondary"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm"
                    >
                      {form.watch(`skills.${idx}.name`)}
                      <button
                        type="button"
                        onClick={() => skillsArray.remove(idx)}
                        className="text-muted-foreground hover:text-destructive ml-1"
                        aria-label={`Удалить ${form.watch(`skills.${idx}.name`)}`}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="bg-cta-hot hover:bg-cta-hot/90 text-white rounded-full px-8"
                disabled={isSaving}
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Сохранить"}
              </Button>
            </form>
          </TabsContent>

          {/* ---- Applications Tab ---- */}
          <TabsContent value="applications">
            <ApplicationsTab />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  );
}
