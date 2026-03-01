// ============================================================
// СБОРКА — Apply Dialog
// Opens when clicking "Откликнуться" on a job detail page.
// ============================================================

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useApplyToJob } from "@/hooks/useJobs";
import { useToast } from "@/hooks/use-toast";
import { Paperclip, Loader2 } from "lucide-react";

// ---- Props ---------------------------------------------------

interface ApplyDialogProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ---- Component -----------------------------------------------

export function ApplyDialog({
  jobId,
  jobTitle,
  companyName,
  open,
  onOpenChange,
}: ApplyDialogProps) {
  const [coverLetter, setCoverLetter] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const applyMutation = useApplyToJob();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await applyMutation.mutateAsync({
        id: jobId,
        coverLetter: coverLetter.trim() || undefined,
      });

      toast({
        title: "Отклик отправлен",
        description: `Ваш отклик на вакансию "${jobTitle}" успешно отправлен.`,
      });

      // Reset and close
      setCoverLetter("");
      setFileName(null);
      onOpenChange(false);
    } catch {
      toast({
        title: "Ошибка при отправке",
        description: "Не удалось отправить отклик. Попробуйте ещё раз.",
        variant: "destructive",
      });
    }
  };

  const isLoading = applyMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold leading-snug">
            Отклик на {jobTitle}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {companyName}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-5">
          {/* Cover letter */}
          <div className="space-y-2">
            <label
              htmlFor="cover-letter"
              className="text-sm font-medium text-foreground"
            >
              Сопроводительное письмо{" "}
              <span className="text-muted-foreground font-normal">(необязательно)</span>
            </label>
            <textarea
              id="cover-letter"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Расскажите, почему вы подходите..."
              rows={5}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm leading-relaxed placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none transition-shadow"
              disabled={isLoading}
            />
          </div>

          {/* File upload — visual only */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Прикрепить резюме (PDF)
            </label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className={`w-full flex items-center gap-3 rounded-xl border-2 border-dashed px-4 py-4 text-sm transition-colors ${
                fileName
                  ? "border-primary/40 bg-primary/5 text-primary"
                  : "border-border bg-muted/30 text-muted-foreground hover:border-primary/30 hover:bg-muted/50"
              }`}
            >
              <Paperclip className="w-4 h-4 shrink-0" />
              <span className="truncate">
                {fileName ? fileName : "Нажмите, чтобы выбрать файл"}
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
              disabled={isLoading}
            />
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="flex-1 px-5 py-3 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cta-hot text-white text-sm font-semibold hover:bg-cta-hot/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Отправка...
                </>
              ) : (
                "Отправить отклик"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
