"use client";

import { useEffect } from "react";

/**
 * Global visitor heartbeat.
 *
 * Mounted once from the root layout so that every page in the app — logged in
 * or not, AppShell or not — pings `/api/track-visitor` on load and every 5s
 * afterward. This is what the admin dashboard uses to show live visitors and
 * compute session duration, so it must run everywhere (home, login, pitch,
 * products, etc.), otherwise visits on those pages are invisible to the
 * backend.
 *
 * This component renders nothing — it only owns side effects.
 */

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = sessionStorage.getItem("bp_visitor_sid");
    if (!id) {
      id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem("bp_visitor_sid", id);
    }
    return id;
  } catch {
    return `${Date.now()}-${Math.random()}`;
  }
}

export default function VisitorTracker() {
  useEffect(() => {
    const sessionId = getOrCreateSessionId();
    if (!sessionId) return;

    const timezone =
      Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown";

    const beat = () => {
      fetch("/api/track-visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, timezone }),
        credentials: "same-origin",
        keepalive: true,
      }).catch(() => {});
    };

    beat();
    // Heartbeat every 5 seconds so the server's `lastSeen` stays accurate to
    // within a few seconds. This drives session duration when the browser is
    // force-closed without sendBeacon firing.
    const interval = setInterval(beat, 5000);

    // End the session cleanly when the user actually leaves (closes the tab,
    // navigates away, puts the phone to sleep). sendBeacon is the only
    // transport that survives an unloading page on modern browsers. We include
    // the client's current timestamp so the server can record an accurate
    // duration even if processing lags.
    const endOnUnload = () => {
      try {
        const payload = JSON.stringify({ sessionId, endedAt: Date.now() });
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon?.("/api/auth/logout", blob);
      } catch {
        /* noop */
      }
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") endOnUnload();
    };
    window.addEventListener("pagehide", endOnUnload);
    window.addEventListener("beforeunload", endOnUnload);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("pagehide", endOnUnload);
      window.removeEventListener("beforeunload", endOnUnload);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return null;
}
