"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

const MONTHS = [
  "Month 1",
  "Month 2",
  "Month 3",
  "Month 4",
  "Month 5",
  "Month 6",
  "Month 7",
  "Month 8",
  "Month 9",
  "Month 10",
  "Month 11",
  "Month 12",
];

const MONTH_ROUTES = [
  "/expenditure/initial-month-cost",
  "/expenditure/monthly-cost/feb-2026",
  "/expenditure/monthly-cost/mar-2026",
  "/expenditure/monthly-cost/apr-2026",
  "/expenditure/monthly-cost/may-2026",
  "/expenditure/monthly-cost/jun-2026",
  "/expenditure/monthly-cost/jul-2026",
  "/expenditure/monthly-cost/aug-2026",
  "/expenditure/monthly-cost/sep-2026",
  "/expenditure/monthly-cost/oct-2026",
  "/expenditure/monthly-cost/nov-2026",
  "/expenditure/monthly-cost/dec-2026",
];

/**
 * Custom month button combining original layout sizing with the new Pricing styling.
 */
interface MonthButtonProps {
  label: string;
  route: string;
  index: number;
  phase: "expand" | "fanout" | "static";
  hoveredButton: string | null;
  setHoveredButton: (id: string | null) => void;
  router: ReturnType<typeof useRouter>;
  className?: string;
}

function MonthButton({ label, route, index, phase, hoveredButton, setHoveredButton, router, className = "" }: MonthButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [circumference, setCircumference] = useState(0);
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    // Only calculate dimensions when the component is firmly mounted and stabilized
    if (buttonRef.current && phase !== "expand") {
      const width = buttonRef.current.offsetWidth;
      const r = width / 2 - 2;
      setRadius(r);
      setCircumference(2 * Math.PI * r);
    }
  }, [phase, hoveredButton]);

  const isHovered = hoveredButton === label;

  return (
    <motion.button
      ref={buttonRef}
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
        filter: phase === "static" ? "grayscale(0.6)" : "grayscale(0.1)",
      }}
      transition={{
        duration: 0.6,
        delay: phase === "expand" ? 0 : 0.4 + index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        scale: 1.05,
        filter: "grayscale(0)",
        transition: { duration: 0.3 }
      }}
      onMouseEnter={() => setHoveredButton(label)}
      onMouseLeave={() => setHoveredButton(null)}
      onClick={() => router.push(route)}
      className={`group relative h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-full border border-white/10 bg-gradient-to-br from-white/8 to-white/3 text-center flex flex-col items-center justify-center tracking-wide transition-all duration-300 hover:border-white/20 hover:from-white/12 hover:to-white/8 shadow-md ${className}`}
      style={{
        boxShadow: isHovered 
          ? "0 0 15px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.15)" 
          : "0 0 12px rgba(59, 130, 246, 0.10), 0 0 30px rgba(59, 130, 246, 0.05)",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      }}
    >
      {/* SVG Border Animation */}
      {circumference > 0 && radius > 0 && phase === "static" && (
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          style={{ transform: 'rotate(-90deg)', zIndex: 5 }}
          viewBox={`0 0 ${radius * 2 + 4} ${radius * 2 + 4}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <motion.circle
            cx={(radius * 2 + 4) / 2}
            cy={(radius * 2 + 4) / 2}
            r={radius}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isHovered ? 0 : circumference}
            initial={false}
            animate={{
              strokeDashoffset: isHovered ? 0 : circumference
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
          />
        </svg>
      )}

      {/* Button Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <span className="px-2 leading-snug text-[10px] sm:text-xs md:text-sm font-medium text-white group-hover:text-blue-200 transition-colors duration-300">
          {label}
        </span>
        <div className="mt-1 w-6 h-[1.5px] bg-gradient-to-r from-blue-500 to-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300 mx-auto rounded-full"></div>
      </div>
      
      {/* Background glow flares from Pricing */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden rounded-full z-0">
        <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-blue-500/20 rounded-full blur-xl -translate-y-1/2"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-cyan-500/20 rounded-full blur-xl translate-y-1/2"></div>
      </div>
    </motion.button>
  );
}

export default function MonthlyCostPage() {
  const router = useRouter();
  const [phase] = useState<"expand" | "fanout" | "static">("static");
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-black text-white">

        <header className="relative z-10 border-b border-white/10 bg-black/90">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <button
              onClick={() => router.back()}
              className="text-sm text-white/70 hover:text-white transition"
            >
              ← Back
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
            
            {/* Month Buttons Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 justify-items-center relative z-10">
              {MONTHS.map((label, index) => (
                <MonthButton
                  key={label}
                  label={label}
                  route={MONTH_ROUTES[index]}
                  index={index}
                  phase={phase}
                  hoveredButton={hoveredButton}
                  setHoveredButton={setHoveredButton}
                  router={router}
                />
              ))}
            </div>

            {/* Year 1 Summary Button - Middle Bottom */}
            <MonthButton
              label="Year 1 Summary"
              route="/expenditure/monthly-cost/year-summary"
              index={12}
              phase={phase}
              hoveredButton={hoveredButton}
              setHoveredButton={setHoveredButton}
              router={router}
              className="mt-12"
            />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
