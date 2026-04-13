// MCPHire Attribution (Sprint 4 — simplified, single source = Umami events table)
//
// Sends ONE 'source' event per session with bucket + ref + utm_source.
// 5 buckets: direct, organic, ai, mcp-catalog, referral (+ utm-* for tagged links).
//
// Last-touch only — no cross-session persistence (out of scope for v1).
// No custom session ID (Umami's built-in session_id is single source of truth).
// Bots filtered client-side by UA.
//
// Loaded AFTER Umami's /stats/script.js so window.umami is defined.

(function () {
  'use strict';

  // 1. Bot filter — don't track crawlers
  if (/bot|crawler|spider|preview|headless|lighthouse|pagespeed/i.test(navigator.userAgent)) {
    return;
  }

  // 2. Only track once per session (sessionStorage gate)
  if (sessionStorage.getItem('mh_source_tracked')) {
    return;
  }

  // 3. Bucket detection — last-touch only
  var params = new URLSearchParams(location.search);
  var ref = document.referrer || '';
  var refHost = '';
  try {
    refHost = ref ? new URL(ref).hostname.toLowerCase() : '';
  } catch (e) {
    refHost = '';
  }

  var bucket = 'direct';
  var utmSource = params.get('utm_source') || '';

  // Treat bare hostname + any subdomain of it as "self" to avoid cross-subdomain misbucketing
  var selfHost = location.hostname.toLowerCase();
  var selfRoot = selfHost.split('.').slice(-2).join('.');  // e.g. mcphire.com
  function isSelf(h) { return h === selfHost || h.endsWith('.' + selfRoot) || h === selfRoot; }

  if (utmSource) {
    bucket = 'utm-' + utmSource.toLowerCase().slice(0, 40);
  } else if (/chatgpt\.com|chat\.openai\.com|claude\.ai|claude\.com|perplexity\.ai|gemini\.google\.com|copilot\.microsoft\.com/.test(refHost)) {
    bucket = 'ai';
  } else if (/^(www\.)?(google|yandex|bing|duckduckgo|yahoo|ya\.ru)\./.test(refHost)) {
    bucket = 'organic';
  } else if (/smithery\.ai|mcp\.so|glama\.ai|llmstxt\.directory/.test(refHost)) {
    bucket = 'mcp-catalog';
  } else if (refHost && !isSelf(refHost)) {
    bucket = 'referral';
  }

  // 4. Send via standard Umami track API — no client modification.
  //    Retry up to 5 times with 1s backoff if Umami not ready yet, then give up.
  var retries = 0;
  var MAX_RETRIES = 5;
  function track() {
    if (window.umami && typeof window.umami.track === 'function') {
      window.umami.track('source', {
        bucket: bucket,
        ref: ref.slice(0, 200),
        utm_source: utmSource,
        utm_medium: params.get('utm_medium') || '',
        utm_campaign: params.get('utm_campaign') || ''
      });
      sessionStorage.setItem('mh_source_tracked', '1');
    } else if (retries < MAX_RETRIES) {
      retries++;
      setTimeout(track, 1000);
    }
    // If still not ready after 5 retries: silently give up, don't spin forever
  }

  // Delay slightly so Umami's tracker initializes
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(track, 200); });
  } else {
    setTimeout(track, 200);
  }
})();
