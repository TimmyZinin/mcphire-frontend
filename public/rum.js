// MCPHire Real User Monitoring (Sprint 8)
//
// Collects Core Web Vitals (LCP, CLS, INP, FCP, TTFB) and ships to Umami
// as custom events. Template type is inferred from URL pattern, so dashboards
// can segment by page class (SPA / SSG-job / SSG-category / entity / research).
//
// No external dependency: minimal inline web-vitals implementation. For richer
// metrics (LoAF, navigation timings) upgrade to Google's web-vitals.js later.
//
// Loads after Umami. All metrics shipped as 'rum:<metric_name>' custom events
// with data {value, template, page}. Dashboards query via event_data table.

(function () {
  'use strict';

  // Skip bots
  if (/bot|crawler|spider|preview|headless|lighthouse|pagespeed/i.test(navigator.userAgent)) return;

  // Skip if PerformanceObserver not supported
  if (!('PerformanceObserver' in window)) return;

  // Template detection — infer from URL pattern
  function detectTemplate(pathname) {
    if (pathname === '/' || pathname === '') return 'spa-home';
    if (pathname === '/jobs' || pathname === '/jobs/') return 'spa-list';
    if (/^\/jobs\/(city|category)\//.test(pathname)) return 'spa-facet';
    if (/^\/jobs\/[^/]+\/?$/.test(pathname)) return 'ssg-job';  // direct slug
    if (/^\/companies\/[^/]+\/?$/.test(pathname)) return 'entity-company';
    if (/^\/research\//.test(pathname)) return 'research-asset';
    if (/^\/docs\//.test(pathname)) return 'docs';
    return 'other';
  }

  var template = detectTemplate(location.pathname);
  var pagePath = location.pathname;

  // Ship a metric via Umami's track API
  function ship(name, value, extra) {
    if (!window.umami || typeof window.umami.track !== 'function') return;
    try {
      var payload = {
        value: Math.round(value * 100) / 100,  // 2 decimals
        template: template,
        page: pagePath
      };
      if (extra) Object.assign(payload, extra);
      window.umami.track('rum:' + name, payload);
    } catch (e) { /* swallow */ }
  }

  // ---- LCP (Largest Contentful Paint) ----
  try {
    var lcpObserver = new PerformanceObserver(function (list) {
      var entries = list.getEntries();
      // Only the last (largest) entry is the final LCP
      var last = entries[entries.length - 1];
      if (last && last.startTime) {
        ship('LCP', last.startTime);
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    // Finalize on hidden/unload
    addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') lcpObserver.takeRecords();
    }, { once: true });
  } catch (e) { /* LCP not supported */ }

  // ---- FCP (First Contentful Paint) ----
  try {
    var fcpObserver = new PerformanceObserver(function (list) {
      for (var entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint' && entry.startTime) {
          ship('FCP', entry.startTime);
          fcpObserver.disconnect();
          break;
        }
      }
    });
    fcpObserver.observe({ type: 'paint', buffered: true });
  } catch (e) { /* */ }

  // ---- CLS (Cumulative Layout Shift) ----
  var clsValue = 0;
  var sessionValue = 0, sessionEntries = [];
  try {
    var clsObserver = new PerformanceObserver(function (list) {
      for (var entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          var firstEntry = sessionEntries[0];
          var lastEntry = sessionEntries[sessionEntries.length - 1];
          if (sessionValue
              && entry.startTime - lastEntry.startTime < 1000
              && entry.startTime - firstEntry.startTime < 5000) {
            sessionValue += entry.value;
            sessionEntries.push(entry);
          } else {
            sessionValue = entry.value;
            sessionEntries = [entry];
          }
          if (sessionValue > clsValue) clsValue = sessionValue;
        }
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
    // Report final CLS on visibility change
    addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') ship('CLS', clsValue);
    }, { once: true });
    addEventListener('pagehide', function () { ship('CLS', clsValue); }, { once: true });
  } catch (e) { /* */ }

  // ---- INP approximation via event timing (supported since Chrome 96+) ----
  try {
    var inpMax = 0;
    var inpObserver = new PerformanceObserver(function (list) {
      for (var entry of list.getEntries()) {
        if (entry.interactionId && entry.duration > inpMax) {
          inpMax = entry.duration;
        }
      }
    });
    inpObserver.observe({ type: 'event', buffered: true, durationThreshold: 40 });
    addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden' && inpMax > 0) ship('INP', inpMax);
    }, { once: true });
  } catch (e) { /* event timing not supported in this browser */ }

  // ---- TTFB (via Navigation Timing) ----
  try {
    var nav = performance.getEntriesByType('navigation')[0];
    if (nav && nav.responseStart > 0) {
      ship('TTFB', nav.responseStart);
    }
  } catch (e) { /* */ }
})();
