"use client";

import { useEffect, useState, Suspense, useCallback } from "react";
import { CircularTabs } from "@/components/navigation/circular-tabs";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import Link from "next/link";
import { motion } from "framer-motion";
import type { UserRole } from "@/components/layout/app-shell";
import { useSearchParams, useRouter } from "next/navigation";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const parts = document.cookie.split(";").map((p) => p.trim());
  for (const p of parts) {
    const idx = p.indexOf("=");
    if (idx === -1) continue;
    if (p.slice(0, idx) === name) return decodeURIComponent(p.slice(idx + 1));
  }
  return null;
}

const QUOTES = [
  "Where disciplined execution meets compounding opportunity.",
  "Building wealth through relationships, not transactions.",
  "Every great portfolio begins with a single conviction.",
  "Strategic patience is the ultimate competitive advantage.",
  "The best investments are partnerships that outlast markets.",
  "Precision in planning, excellence in execution.",
  "Your trust is the foundation we build upon.",
  "Capital follows clarity. Structure creates confidence.",
  "We don't chase markets — we architect positions.",
  "The right structure today compounds into freedom tomorrow.",
  "Institutional rigour, entrepreneurial conviction.",
  "Protecting wealth is the first step to growing it.",
  "Simplicity on the surface, sophistication underneath.",
  "When preparation meets opportunity, results follow.",
  "Global perspective, local precision.",
  "Sustainable growth begins with transparent governance.",
  "Great partnerships are built on aligned incentives.",
  "Excellence is not an act, but a habit of structure.",
  "From vision to execution — every detail matters.",
  "Long-term thinking is our strongest asset.",
];

function getGreeting(timezone?: string | null): string {
  const now = new Date();
  let hour: number;

  if (timezone) {
    // Use the user's configured timezone
    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: timezone,
    });
    hour = parseInt(formatter.format(now), 10);
  } else {
    // Default to IST (UTC+5:30)
    const istOffset = 5.5 * 60;
    const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
    const istMinutes = (utcMinutes + istOffset) % 1440;
    hour = Math.floor(istMinutes / 60);
  }

  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  return "Good Evening";
}

function GreetingOverlay({ name, timezone, onComplete }: { name: string; timezone?: string | null; onComplete: () => void }) {
  const [phase, setPhase] = useState<"enter" | "visible" | "exit">("enter");
  const greeting = getGreeting(timezone);
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  useEffect(() => {
    const enterTimer = setTimeout(() => setPhase("visible"), 100);
    const exitTimer = setTimeout(() => setPhase("exit"), 4200);
    const doneTimer = setTimeout(onComplete, 5200);
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: "#000",
        transition: "opacity 0.6s ease-out",
        opacity: phase === "exit" ? 0 : 1,
        willChange: "opacity",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      <div
        className="text-center px-6 max-w-3xl"
        style={{
          fontFamily: "'Avenir', 'Avenir Next', 'Nunito Sans', sans-serif",
          transition: "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.9s ease-out",
          opacity: phase === "enter" ? 0 : 1,
          transform: phase === "enter" ? "translate3d(0,30px,0) scale(0.96)" : "translate3d(0,0,0) scale(1)",
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
        }}
      >
        <p
          className="text-white/50 uppercase tracking-[0.3em] mb-4"
          style={{
            fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)",
            fontWeight: 600,
            letterSpacing: "0.3em",
          }}
        >
          Welcome to Boyar Partners
        </p>

        <h1
          className="text-white mb-6"
          style={{
            fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)",
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
          }}
        >
          {greeting}{name !== "__no_name__" && ","}
          {name !== "__no_name__" && (
            <>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #fff 0%, #94e8ec 50%, #5ec6cc 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {name}
              </span>
            </>
          )}
        </h1>

        <p
          className="text-white/40 mx-auto"
          style={{
            fontSize: "clamp(0.85rem, 1.5vw, 1.15rem)",
            fontWeight: 500,
            maxWidth: 480,
            lineHeight: 1.6,
            letterSpacing: "0.02em",
            transition: "opacity 1.2s ease-out 0.4s",
            opacity: phase === "enter" ? 0 : 0.6,
          }}
        >
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      <div
        className="absolute bottom-10 flex gap-1.5"
        style={{
          transition: "opacity 1s ease-out 0.6s",
          opacity: phase === "enter" ? 0 : 0.3,
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block rounded-full bg-white"
            style={{
              width: 5,
              height: 5,
              animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

function ToolsContent() {
  const [role, setRole] = useState<UserRole | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const focus = searchParams.get("focus");

  // Track if we've processed the focus parameter so it only runs once and then is cleaned up
  const [consumedFocus, setConsumedFocus] = useState(false);

  useEffect(() => {
    const storedRole = sessionStorage.getItem("userRole") as UserRole | null;
    setRole(storedRole);
  }, []);

  const initialActiveTab = (!consumedFocus && focus === "corporate-revenue") ? "revenue" : null;
  const initialRevenueSegment = (!consumedFocus && focus === "corporate-revenue") ? "Corporate Services" : null;

  useEffect(() => {
    if (role && focus === "corporate-revenue" && !consumedFocus) {
      router.replace('/tools', { scroll: false });
      setConsumedFocus(true);
    }
  }, [focus, consumedFocus, router, role]);

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-80px)] relative z-10 py-4">
      {role ? (
        <CircularTabs
          role={role}
          initialActiveTab={initialActiveTab}
          initialRevenueSegment={initialRevenueSegment}
        />
      ) : (
        <div className="text-white/70 text-sm">Preparing your workspace...</div>
      )}
    </main>
  );
}

export default function ToolsPage() {
  const [greetName, setGreetName] = useState<string | null>(null);
  const [greetTimezone, setGreetTimezone] = useState<string | null>(null);
  const [showGreeting, setShowGreeting] = useState(false);
  const [hideAsk, setHideAsk] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    const name = sessionStorage.getItem("greetName");
    if (name) {
      const tz = sessionStorage.getItem("greetTimezone");
      setGreetName(name);
      setGreetTimezone(tz);
      setShowGreeting(true);
      sessionStorage.removeItem("greetName");
      sessionStorage.removeItem("greetTimezone");
    }
    setHideAsk(sessionStorage.getItem("restrictAsk") === "true");
    setIsSuperAdmin(readCookie("bp_super_admin") === "1");
  }, []);

  const handleGreetingComplete = useCallback(() => {
    setShowGreeting(false);
  }, []);

  return (
    <ProtectedRoute>
      {showGreeting && greetName && (
        <GreetingOverlay name={greetName} timezone={greetTimezone} onComplete={handleGreetingComplete} />
      )}

      <div className="min-h-screen bg-black text-white relative">
        <CircularBackground />
        
        <header className="border-b border-white/10 bg-black relative z-10">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <button onClick={() => router.back()} className="text-sm sm:text-base text-white hover:text-gray-300 transition">
              ← Back
              </button>
            <h1
              className="text-lg sm:text-xl md:text-2xl font-medium text-white"
              style={{ fontFamily: 'var(--font-benzin)' }}
            >
              Dashboard
            </h1>
            <div className="flex items-center gap-3">
              {isSuperAdmin && (
                <motion.a
                  href="/admin-sessions"
                  className="group relative px-6 py-2.5 rounded-xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 text-center flex flex-col items-center justify-center tracking-wide transition-all duration-300 hover:border-white/20 hover:from-white/12 hover:to-white/8 shadow-[0_0_12px_rgba(59,130,246,0.10),0_0_30px_rgba(59,130,246,0.05)] hover:shadow-[0_0_15px_rgba(59,130,246,0.3),0_0_30px_rgba(59,130,246,0.15)]"
                  style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                >
                  <div className="relative z-10 w-full flex flex-col items-center">
                    <span className="leading-snug text-sm font-medium text-white group-hover:text-blue-200 transition-colors duration-300">
                      Admin
                    </span>
                    <div className="mt-1 w-6 h-[1.5px] bg-gradient-to-r from-blue-500 to-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300 mx-auto rounded-full" />
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden rounded-xl z-0">
                    <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-blue-500/20 rounded-full blur-xl -translate-y-1/2" />
                    <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-cyan-500/20 rounded-full blur-xl translate-y-1/2" />
                  </div>
                </motion.a>
              )}
              {!hideAsk && (
                <motion.a
                  href="/tools/company-documents/the-ask"
                  className="group relative px-6 py-2.5 rounded-xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 text-center flex flex-col items-center justify-center tracking-wide transition-all duration-300 hover:border-white/20 hover:from-white/12 hover:to-white/8 shadow-[0_0_12px_rgba(59,130,246,0.10),0_0_30px_rgba(59,130,246,0.05)] hover:shadow-[0_0_15px_rgba(59,130,246,0.3),0_0_30px_rgba(59,130,246,0.15)]"
                  style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                >
                  <div className="relative z-10 w-full flex flex-col items-center">
                    <span className="leading-snug text-sm font-medium text-white group-hover:text-blue-200 transition-colors duration-300">
                      The Ask
                    </span>
                    <div className="mt-1 w-6 h-[1.5px] bg-gradient-to-r from-blue-500 to-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300 mx-auto rounded-full" />
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden rounded-xl z-0">
                    <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-blue-500/20 rounded-full blur-xl -translate-y-1/2" />
                    <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-cyan-500/20 rounded-full blur-xl translate-y-1/2" />
                  </div>
                </motion.a>
              )}
            </div>
          </div>
        </header>

        <Suspense fallback={<div className="text-white/70 text-sm flex items-center justify-center min-h-[calc(100vh-80px)]">Loading...</div>}>
          <ToolsContent />
        </Suspense>
      </div>
    </ProtectedRoute>
  );
}

