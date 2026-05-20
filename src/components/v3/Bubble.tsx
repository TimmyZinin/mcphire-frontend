// ============================================================
// MCPHire V3 — Chat bubble for hero chat simulation
// who=agent → grad-cool left-aligned · recruiter → white right-aligned
// system → grad-leaf left-aligned
// ============================================================

interface BubbleProps {
  who: "agent" | "recruiter" | "you" | "system";
  text: string;
}

export function V3Bubble({ who, text }: BubbleProps) {
  if (who === "recruiter" || who === "you") {
    return (
      <div
        className="self-end max-w-[88%] px-3.5 py-2.5 rounded-2xl bg-white text-v3-ink border border-v3-line text-sm leading-snug shadow-sm"
      >
        {text}
      </div>
    );
  }

  const gradient =
    who === "system" ? "v3-grad-leaf" :
    "v3-grad-cool";

  return (
    <div
      className={`${gradient} self-start max-w-[88%] px-3.5 py-2.5 rounded-2xl text-white text-sm leading-snug shadow-sm`}
    >
      {text}
    </div>
  );
}
