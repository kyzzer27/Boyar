"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const MONTHS = [
  "M1 / Jan 2026",
  "M2 / Feb 2026",
  "M3 / Mar 2026",
  "M4 / Apr 2026",
  "M5 / May 2026",
  "M6 / Jun 2026",
  "M7 / Jul 2026",
  "M8 / Aug 2026",
  "M9 / Sep 2026",
  "M10 / Oct 2026",
  "M11 / Nov 2026",
  "M12 / Dec 2026",
] as const;

export default function MonthlyCostPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const skipAnimation = searchParams.get("skipAnimation") === "1";
  const [phase, setPhase] = useState<"expand" | "fanout" | "static">(
    skipAnimation ? "static" : "expand"
  );
  const [showHereLabel, setShowHereLabel] = useState(!skipAnimation);

  useEffect(() => {
    if (skipAnimation) {
      setPhase("static");
      setShowHereLabel(false);
      return;
    }
    const t1 = setTimeout(() => setPhase("fanout"), 1500);
    const t2 = setTimeout(() => setPhase("static"), 4000);
    const tLabel = setTimeout(() => setShowHereLabel(false), 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(tLabel);
    };
  }, [skipAnimation]);

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-black text-white">
        <CircularBackground />

        <header className="relative z-10 border-b border-white/10 bg-black/90">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <button
              onClick={() => router.push("/expenditure")}
              className="text-sm text-white/70 hover:text-white transition"
            >
              ← Back to Expenditure
            </button>
            <div className="text-center flex-1">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                Boyar Partners · Expenditure Module
              </p>
              <h1
                className="mt-1 text-xl sm:text-2xl font-medium text-white"
                style={{ fontFamily: "var(--font-benzin)" }}
              >
                Monthly Cost – Year 1 View
              </h1>
            </div>
            <div className="w-24" />
          </div>
        </header>

        <main className="relative z-10 flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
          <div className="relative w-full max-w-5xl flex flex-col items-center justify-center">
            {/* Central expand animation for M1 */}
            <AnimatePresence>
              {!skipAnimation && phase === "expand" && (
                <motion.button
                  key="central-m1"
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1.4 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 rounded-full border border-white/50 bg-white/10 flex items-center justify-center text-xs sm:text-sm md:text-base font-semibold tracking-wide shadow-[0_0_28px_rgba(255,255,255,0.55)]"
                  style={{
                    fontFamily:
                      "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                  }}
                >
                  <span className="px-4 text-center leading-snug flex items-center justify-center gap-1">
                    {showHereLabel ? "Here you go" : MONTHS[0]}
                    {showHereLabel && (
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </span>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Final grid of 12 month buttons */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 justify-items-center">
              {MONTHS.map((label, index) => (
                <motion.button
                  key={label}
                  initial={{
                    opacity: 0,
                    scale: 0.6,
                    y: 16,
                  }}
                  animate={{
                    opacity: phase === "expand" ? 0 : 1,
                    scale: phase === "expand" ? 0.6 : 1,
                    y: phase === "expand" ? 16 : 0,
                    filter:
                      phase === "static"
                        ? "grayscale(0.8)"
                        : "grayscale(0.2)",
                  }}
                  transition={{
                    duration: 0.6,
                    delay: phase === "expand" ? 0 : 0.4 + index * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow:
                      "0 0 20px rgba(255,255,255,0.45), 0 0 40px rgba(255,255,255,0.25)",
                    filter: "grayscale(0)",
                  }}
                  className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-full border border-white/40 bg-white/10 text-center flex items-center justify-center text-[10px] sm:text-xs md:text-sm font-medium tracking-wide transition-shadow duration-300"
                  style={{
                    boxShadow:
                      "0 0 12px rgba(255,255,255,0.35), 0 0 30px rgba(255,255,255,0.18)",
                    fontFamily:
                      "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                  }}
                  onClick={() => {
                    if (index === 0) {
                      router.push("/expenditure/initial-month-cost");
                    } else if (index === 1) {
                      router.push("/expenditure/monthly-cost/feb-2026");
                    } else if (index === 2) {
                      router.push("/expenditure/monthly-cost/mar-2026");
                    } else if (index === 3) {
                      router.push("/expenditure/monthly-cost/apr-2026");
                    } else if (index === 4) {
                      router.push("/expenditure/monthly-cost/may-2026");
                    } else if (index === 5) {
                      router.push("/expenditure/monthly-cost/jun-2026");
                    } else if (index === 6) {
                      router.push("/expenditure/monthly-cost/jul-2026");
                    } else if (index === 7) {
                      router.push("/expenditure/monthly-cost/aug-2026");
                    } else if (index === 8) {
                      router.push("/expenditure/monthly-cost/sep-2026");
                    } else if (index === 9) {
                      router.push("/expenditure/monthly-cost/oct-2026");
                    } else if (index === 10) {
                      router.push("/expenditure/monthly-cost/nov-2026");
                    } else if (index === 11) {
                      router.push("/expenditure/monthly-cost/dec-2026");
                    } else {
                      // Placeholder for future month-detail routes/modals
                    }
                  }}
                >
                  <span className="px-2 leading-snug">{label}</span>
                </motion.button>
              ))}
            </div>

            {/* Year 1 Summary Button - Middle Bottom */}
            <motion.button
              initial={{
                opacity: 0,
                scale: 0.6,
                y: 16,
              }}
              animate={{
                opacity: phase === "expand" ? 0 : 1,
                scale: phase === "expand" ? 0.6 : 1,
                y: phase === "expand" ? 16 : 0,
                filter:
                  phase === "static"
                    ? "grayscale(0.8)"
                    : "grayscale(0.2)",
              }}
              transition={{
                duration: 0.6,
                delay: phase === "expand" ? 0 : 0.4 + 12 * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 0 20px rgba(255,255,255,0.45), 0 0 40px rgba(255,255,255,0.25)",
                filter: "grayscale(0)",
              }}
              className="mt-12 h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-full border border-white/40 bg-white/10 text-center flex items-center justify-center text-[10px] sm:text-xs md:text-sm font-medium tracking-wide transition-shadow duration-300"
              style={{
                boxShadow:
                  "0 0 12px rgba(255,255,255,0.35), 0 0 30px rgba(255,255,255,0.18)",
                fontFamily:
                  "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
              }}
              onClick={() => {
                router.push("/expenditure/monthly-cost/year-summary");
              }}
            >
              <span className="px-2 leading-snug text-center">Year 1 Summary</span>
            </motion.button>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}


