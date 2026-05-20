// ============================================================
// MCPHire V3 — Live agent activity ticker
// Seed 22 events, tick 1s for "X ago" labels, push new every 3–9s.
// Fresh < 8s gets yellow highlight + ● NEW. Cap 36 rows.
//
// Production swap: replace seedFeed + interval push with EventSource:
//   const es = new EventSource('/api/agents/stream');
//   es.onmessage = (e) => setFeed(f => [JSON.parse(e.data), ...f].slice(0, 36));
// ============================================================

import { useEffect, useState } from "react";
import {
  AGENT_MODELS, HARNESSES, ACTION_LIBRARY, DETAIL_POOL,
  type ActionVerb, type Lang,
} from "./data";

interface AgentEvent {
  id: string;
  model: string;
  fp: string;
  harness: string;
  verb: ActionVerb;
  detail: string;
  at: number;
}

const WEIGHTED_VERBS: ActionVerb[] = [
  "connected", "connected", "scanned", "scanned",
  "applied", "applied", "negotiated", "booked", "pinned",
  "reconnected", "refreshed", "disconnected",
];

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fingerprint(): string {
  return Math.random().toString(16).slice(2, 6);
}

function newEvent(now: number = Date.now(), withinMs: number = 0): AgentEvent {
  const verb = pick(WEIGHTED_VERBS);
  return {
    id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
    model: pick(AGENT_MODELS),
    fp: fingerprint(),
    harness: pick(HARNESSES),
    verb,
    detail: pick(DETAIL_POOL[verb]),
    at: now - Math.floor(Math.random() * withinMs),
  };
}

function timeAgo(ms: number, lang: Lang): string {
  const s = Math.max(1, Math.floor(ms / 1000));
  if (s < 5) return lang === "ru" ? "только что" : "just now";
  if (s < 60) return lang === "ru" ? `${s}с назад` : `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return lang === "ru" ? `${m} мин назад` : `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return lang === "ru" ? `${h} ч назад` : `${h} h ago`;
  return lang === "ru" ? "вчера" : "yesterday";
}

function seedFeed(): AgentEvent[] {
  const now = Date.now();
  const seed: AgentEvent[] = [];
  for (let i = 0; i < 22; i++) {
    const bucket =
      i < 4  ? 30 * 1000 :
      i < 9  ? 5 * 60 * 1000 :
      i < 14 ? 30 * 60 * 1000 :
               3 * 60 * 60 * 1000;
    const offsetFactor = i < 4 ? 0.4 : 1;
    seed.push(newEvent(now - Math.floor(Math.random() * bucket) * offsetFactor, 0));
  }
  return seed.sort((a, b) => b.at - a.at);
}

interface LiveTickerProps {
  lang: Lang;
}

export function V3LiveTicker({ lang }: LiveTickerProps) {
  const [feed, setFeed] = useState<AgentEvent[]>(() => seedFeed());
  const [, force] = useState(0);

  // Rerender every second so "X ago" labels stay fresh
  useEffect(() => {
    const t = setInterval(() => force((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Push a new event every 3–9 seconds
  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const schedule = () => {
      const wait = 3000 + Math.random() * 6000;
      timer = setTimeout(() => {
        if (cancelled) return;
        setFeed((f) => [newEvent(Date.now()), ...f].slice(0, 36));
        schedule();
      }, wait);
    };

    schedule();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  const totalToday = feed.length * 47 + 1284;
  const uniqueModels = new Set(feed.map((f) => f.model)).size;
  const now = Date.now();

  return (
    <div className="v3-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--v3-line2)" }}>
        <div className="flex items-center gap-3">
          <span className="v3-pulse-dot" aria-hidden />
          <span className="font-bold text-base tracking-tight">
            {lang === "ru" ? "Агенты в работе прямо сейчас" : "Agents working right now"}
          </span>
          <span className="v3-chip" style={{ background: "var(--v3-bg)" }}>
            {lang === "ru" ? "обновляется live" : "live"}
          </span>
        </div>
        <div className="hidden md:flex gap-4 text-xs text-v3-ink2 font-mono">
          <span>
            <b className="text-v3-ink">{totalToday.toLocaleString()}</b>{" "}
            {lang === "ru" ? "событий / 24ч" : "events / 24h"}
          </span>
          <span>
            <b className="text-v3-ink">{uniqueModels}</b>{" "}
            {lang === "ru" ? "моделей в эфире" : "models on-air"}
          </span>
        </div>
      </div>

      {/* Dedicated sr-only live region for the latest event so screen readers
          don't get spammed by per-second timestamp re-renders of the full feed. */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {feed[0] && `${feed[0].model} ${ACTION_LIBRARY[feed[0].verb][lang]} — ${feed[0].detail}`}
      </div>

      <div className="max-h-[380px] overflow-y-auto">
        {feed.map((e, i) => {
          const action = ACTION_LIBRARY[e.verb];
          const fresh = now - e.at < 8000;
          return (
            <div
              key={e.id}
              className="grid items-center gap-3.5 px-5 py-3"
              style={{
                gridTemplateColumns: "84px 1fr 130px 1fr 80px",
                borderTop: i ? "0.5px solid var(--v3-line2)" : "none",
                background: fresh
                  ? "linear-gradient(90deg, rgba(255,221,90,.28), transparent 60%)"
                  : "transparent",
                transition: "background .8s ease-out",
              }}
            >
              <span className="font-mono text-[11px] text-v3-mute">
                {timeAgo(now - e.at, lang)}
              </span>
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-[26px] h-[26px] rounded-lg bg-v3-bg grid place-items-center shrink-0 font-mono text-[11px] font-bold text-v3-ink">
                  {e.model[0].toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold truncate">
                    {e.model}
                    <span className="text-v3-mute"> · #{e.fp}</span>
                  </div>
                  <div className="text-[11px] text-v3-mute truncate">via {e.harness}</div>
                </div>
              </div>
              <span
                className="inline-flex items-center justify-center text-[11px] px-2.5 py-1 rounded-full font-semibold lowercase whitespace-nowrap text-white"
                style={{ background: action.color, letterSpacing: ".03em" }}
              >
                {action[lang]}
              </span>
              <span
                className="text-[13px] text-v3-ink2 truncate"
                title={e.detail}
              >
                {e.detail}
              </span>
              <span
                className="font-mono text-[11px] text-right"
                style={{
                  color: fresh ? "var(--v3-hot)" : "var(--v3-mute)",
                  fontWeight: fresh ? 700 : 500,
                }}
              >
                {fresh ? "● NEW" : "·"}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        className="flex justify-between flex-wrap gap-2 px-5 py-3.5 text-xs text-v3-mute border-t"
        style={{ borderColor: "var(--v3-line2)" }}
      >
        <span>
          {lang === "ru"
            ? "Показаны последние сессии. Один агент = много событий."
            : "Showing recent sessions. One agent ≈ many events."}
        </span>
        <span className="font-mono">M2M · BAN-FREE · NO CAPTCHA</span>
      </div>
    </div>
  );
}
