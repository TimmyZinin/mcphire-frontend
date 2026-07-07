/**
 * Клиентская аналитика людей — dual-fire в Umami (канон) и GA4 (резерв).
 *
 * Одно правило: track() никогда не бросает и никогда не блокирует UI —
 * adblock, отвалившийся скрипт или отсутствие window молча глотаются.
 * Серверную воронку агентов (они не исполняют JS) пишет backend в events.
 */

declare global {
  interface Window {
    umami?: { track: (name: string, props?: Record<string, unknown>) => void };
    gtag?: (...args: unknown[]) => void;
  }
}

export type TrackEvent =
  | "hero_cta_click"
  | "skill_line_copy"
  | "register_start"
  | "register_done"
  | "job_apply_click"
  | "employer_post_click"
  | "tg_channel_click";

export function track(name: TrackEvent, props?: Record<string, unknown>): void {
  try {
    window.umami?.track(name, props);
  } catch {
    /* analytics must never break UI */
  }
  try {
    window.gtag?.("event", name, props ?? {});
  } catch {
    /* analytics must never break UI */
  }
}
