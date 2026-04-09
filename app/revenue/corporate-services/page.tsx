"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";

const projectionSteps = [
  { label: "Year 1", path: "/revenue/year-1" },
  { label: "Year 2", path: "/revenue/year-2" },
  { label: "Year 3", path: "/revenue/year-3" },
  { label: "Year 4", path: "/revenue/year-4" },
  { label: "Year 5", path: "/revenue/year-5" },
];

function OrbitButton({
  label,
  onClick,
  index,
  size,
  hoveredButton,
  setHoveredButton,
}: {
  label: string;
  onClick: () => void;
  index: number;
  size: string;
  hoveredButton: string | null;
  setHoveredButton: (id: string | null) => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [circumference, setCircumference] = useState(0);
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (buttonRef.current) {
        const width = buttonRef.current.offsetWidth;
        const r = width / 2 - 2;
        setRadius(r);
        setCircumference(2 * Math.PI * r);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const isHovered = hoveredButton === label;

  return (
    <motion.button
      ref={buttonRef}
      className={`group relative ${size} rounded-full border border-white/10 bg-gradient-to-br from-white/8 to-white/3 text-center flex flex-col items-center justify-center tracking-wide transition-all duration-300 hover:border-white/20 hover:from-white/12 hover:to-white/8 shadow-md`}
      style={{
        boxShadow: isHovered
          ? "0 0 15px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.15)"
          : "0 0 12px rgba(59, 130, 246, 0.10), 0 0 30px rgba(59, 130, 246, 0.05)",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, filter: "grayscale(0.6)" }}
      transition={{ delay: 0.25 + index * 0.08, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.1, filter: "grayscale(0)", transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setHoveredButton(label)}
      onMouseLeave={() => setHoveredButton(null)}
      onClick={onClick}
    >
      {circumference > 0 && radius > 0 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ transform: "rotate(-90deg)", zIndex: 5 }}
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
            animate={{ strokeDashoffset: isHovered ? 0 : circumference }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </svg>
      )}

      <div className="relative z-10 w-full flex flex-col items-center">
        <span className="px-2 leading-snug text-[10px] sm:text-xs md:text-sm font-medium text-white group-hover:text-blue-200 transition-colors duration-300">
          {label}
        </span>
        <div className="mt-1 w-6 h-[1.5px] bg-gradient-to-r from-blue-500 to-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300 mx-auto rounded-full" />
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden rounded-full z-0">
        <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-blue-500/20 rounded-full blur-xl -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-cyan-500/20 rounded-full blur-xl translate-y-1/2" />
      </div>
    </motion.button>
  );
}

export default function CorporateServicesPage() {
  const router = useRouter();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-black text-white">

        <header className="relative z-10 border-b border-white/10 bg-black/90">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
            <Link href="/tools" className="text-sm text-white/70 transition hover:text-white">
              ← Back
            </Link>
            <motion.a
              href="/files/Boyar_Partners_Revenue_Projection_2026_v3_1.xlsx"
              download="Boyar_Partners_Revenue_Projection_2026_v3_1.xlsx"
              className="group relative px-6 py-2.5 rounded-xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 text-center flex flex-col items-center justify-center tracking-wide transition-all duration-300 hover:border-white/20 hover:from-white/12 hover:to-white/8 shadow-[0_0_12px_rgba(59,130,246,0.10),0_0_30px_rgba(59,130,246,0.05)] hover:shadow-[0_0_15px_rgba(59,130,246,0.3),0_0_30px_rgba(59,130,246,0.15)]"
              style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <div className="relative z-10 w-full flex flex-col items-center">
                <span className="leading-snug text-sm font-medium text-white group-hover:text-blue-200 transition-colors duration-300">
                  Download in excel
                </span>
                <div className="mt-1 w-6 h-[1.5px] bg-gradient-to-r from-blue-500 to-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300 mx-auto rounded-full" />
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden rounded-xl z-0">
                <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-blue-500/20 rounded-full blur-xl -translate-y-1/2" />
                <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-cyan-500/20 rounded-full blur-xl translate-y-1/2" />
              </div>
            </motion.a>
          </div>
        </header>

        <main className="relative z-10 flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/60 mb-2">Corporate Services</p>
            <h1
              className="text-3xl sm:text-4xl font-semibold text-white"
              style={{ fontFamily: "var(--font-benzin)" }}
            >
              Projection Horizon
            </h1>
          </motion.div>

          <motion.div
            className="relative mx-auto h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="absolute inset-0 rounded-full border border-white/10" />

            {projectionSteps.map((step, index) => {
              const angle = (index / projectionSteps.length) * 2 * Math.PI - Math.PI / 2;
              const r = 130;
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              return (
                <div
                  key={step.label}
                  className="absolute top-1/2 left-1/2"
                  style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
                >
                  <OrbitButton
                    label={step.label}
                    onClick={() => router.push(step.path)}
                    index={index}
                    size="h-20 w-20 sm:h-[5.5rem] sm:w-[5.5rem]"
                    hoveredButton={hoveredButton}
                    setHoveredButton={setHoveredButton}
                  />
                </div>
              );
            })}

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <OrbitButton
                label="Combined"
                onClick={() => router.back()}
                index={5}
                size="h-24 w-24 sm:h-28 sm:w-28"
                hoveredButton={hoveredButton}
                setHoveredButton={setHoveredButton}
              />
            </div>
          </motion.div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
