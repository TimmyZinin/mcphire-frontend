import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { resolved, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolved === "dark" ? "light" : "dark")}
      className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      aria-label={resolved === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {resolved === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}
