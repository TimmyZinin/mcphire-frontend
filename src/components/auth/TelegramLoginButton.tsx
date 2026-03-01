// ============================================================
// СБОРКА — Telegram Login Widget wrapper
// Uses the official Telegram Login Widget script.
// https://core.telegram.org/widgets/login
// ============================================================

import { useEffect, useRef } from "react";
import type { TelegramAuthData } from "@/types";

interface TelegramLoginButtonProps {
  botName: string;
  onAuth: (data: TelegramAuthData) => void;
  buttonSize?: "large" | "medium" | "small";
  cornerRadius?: number;
  requestAccess?: "write";
  usePic?: boolean;
}

declare global {
  interface Window {
    TelegramLoginCallback?: (data: TelegramAuthData) => void;
  }
}

export function TelegramLoginButton({
  botName,
  onAuth,
  buttonSize = "large",
  cornerRadius = 8,
  requestAccess = "write",
  usePic = true,
}: TelegramLoginButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Expose callback globally (required by Telegram widget)
    window.TelegramLoginCallback = onAuth;

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", botName);
    script.setAttribute("data-size", buttonSize);
    script.setAttribute("data-radius", String(cornerRadius));
    script.setAttribute("data-onauth", "TelegramLoginCallback(user)");
    script.setAttribute("data-request-access", requestAccess);
    script.setAttribute("data-userpic", String(usePic));
    script.async = true;

    containerRef.current?.appendChild(script);

    return () => {
      delete window.TelegramLoginCallback;
      containerRef.current?.removeChild(script);
    };
  }, [botName, onAuth, buttonSize, cornerRadius, requestAccess, usePic]);

  return <div ref={containerRef} className="flex justify-center" />;
}
