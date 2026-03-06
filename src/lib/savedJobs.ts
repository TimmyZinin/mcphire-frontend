// Утилиты для работы с сохранёнными вакансиями в localStorage

export const getSavedJobIds = (): string[] => {
  const saved = localStorage.getItem("mcphire_saved_jobs");
  return saved ? JSON.parse(saved) : [];
};

export const toggleSaveJob = (jobId: string): string[] => {
  const saved = getSavedJobIds();
  const updated = saved.includes(jobId)
    ? saved.filter((id) => id !== jobId)
    : [...saved, jobId];
  localStorage.setItem("mcphire_saved_jobs", JSON.stringify(updated));
  return updated;
};

export const isJobSaved = (jobId: string): boolean => {
  return getSavedJobIds().includes(jobId);
};
