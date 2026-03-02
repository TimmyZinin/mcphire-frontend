import { useTranslation } from "react-i18next";

const languages = [
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center gap-0.5 bg-muted rounded-full p-0.5">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
            i18n.language.startsWith(lang.code)
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
