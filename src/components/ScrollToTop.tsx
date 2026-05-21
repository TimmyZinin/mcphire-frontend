// ============================================================
// Router-level scroll restoration.
// On every pathname change, scroll back to top of the window
// unless the URL carries a hash (in which case we let the browser
// jump to the anchor). Fixes Sergei feedback 2026-05-21:
// "/jobs открывается в самом низу страницы".
// ============================================================

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
