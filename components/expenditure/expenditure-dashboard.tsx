"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircularBackground } from "@/components/motion/circular-background";

interface ExpenditureButton {
  id: string;
  label: string;
  description?: string;
}

const expenditureButtons: ExpenditureButton[] = [
  { id: "initial-month-cost", label: "Initial Month Cost" },
  { id: "monthly-cost", label: "Monthly Cost" },
  { id: "burn-rate-summary", label: "Burn Rate Summary & Runway Projection" },
  { id: "category-wise-spend", label: "Category-Wise Spend Allocation" },
  { id: "variance-tracker", label: "Variance Tracker" },
  { id: "alerts-flags", label: "Alerts & Flags" },
];

interface ExpenditureDashboardProps {
  onButtonClick?: (buttonId: string) => void;
  onClose?: () => void;
}

export function ExpenditureDashboard({ onButtonClick, onClose }: ExpenditureDashboardProps) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Background Motion - Same as Tools Dashboard */}
      <CircularBackground />
      
      {/* Header - Same hierarchy as Tools Dashboard */}
      <header className="border-b border-white/10 bg-black relative z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <button
            onClick={() => onClose?.() || router.back()}
            className="text-sm sm:text-base text-white hover:text-gray-300 transition"
          >
            ← Back
          </button>
          <h1
            className="text-lg sm:text-xl md:text-2xl font-medium text-white"
            style={{ fontFamily: 'var(--font-benzin)' }}
          >
            Expenditure Dashboard
          </h1>
          <div className="w-12 sm:w-20" /> {/* Spacer for centering */}
        </div>
      </header>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 pt-24 sm:pt-28"
      >
        {/* Glass Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10"
          style={{
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          }}
        >
        {/* Panel Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8 sm:mb-10"
        >
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-2"
            style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}
          >
            Expenditure Dashboard
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Select a category to view detailed financial insights
          </p>
        </motion.div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8">
          {expenditureButtons.map((button, index) => (
            <motion.button
              key={button.id}
              initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
              animate={{
                opacity: 1,
                scale: hoveredButton === button.id ? 1.03 : 1,
                filter: "blur(0px)",
              }}
              transition={{
                opacity: { duration: 0.3, delay: 0.1 + index * 0.1 },
                scale: { duration: 0.2, ease: "easeOut" },
                filter: { duration: 0.3, delay: 0.1 + index * 0.1 },
              }}
              onHoverStart={() => setHoveredButton(button.id)}
              onHoverEnd={() => setHoveredButton(null)}
              onClick={() => {
                if (button.id === "monthly-cost") {
                  router.push("/expenditure/monthly-cost");
                } else {
                  onButtonClick?.(button.id);
                }
              }}
              className="group relative p-6 sm:p-7 md:p-8 bg-black border border-white/10 rounded-xl text-left transition-all duration-300"
              style={{
                boxShadow:
                  hoveredButton === button.id
                    ? "0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(59, 130, 246, 0.3)"
                    : "0 0 10px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)",
                transform: hoveredButton === button.id ? "translateY(-2px)" : "translateY(0)",
              }}
            >
              {/* Blue Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: hoveredButton === button.id
                    ? "radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)"
                    : "radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
                  transition: "all 0.3s ease",
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                <h3
                  className="text-white font-semibold text-base sm:text-lg md:text-xl mb-1 transition-colors duration-300"
                  style={{
                    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                    color: hoveredButton === button.id ? "#E0E7FF" : "#FFFFFF",
                  }}
                >
                  {button.label}
                </h3>
                {button.description && (
                  <p className="text-slate-400 text-sm mt-2">{button.description}</p>
                )}
              </div>

              {/* Arrow Icon */}
              <motion.div
                className="absolute top-6 right-6 text-slate-400 group-hover:text-blue-400 transition-colors duration-300"
                animate={{ x: hoveredButton === button.id ? 4 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  className="w-5 h-5"
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
              </motion.div>
            </motion.button>
          ))}
        </div>

        {/* Disclaimer Button - Middle Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="flex justify-center"
        >
          <motion.button
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{
              opacity: 1,
              scale: hoveredButton === "disclaimer" ? 1.03 : 1,
            }}
            transition={{
              opacity: { duration: 0.3, delay: 0.7 },
              scale: { duration: 0.2, ease: "easeOut" },
            }}
            onHoverStart={() => setHoveredButton("disclaimer")}
            onHoverEnd={() => setHoveredButton(null)}
            onClick={() => onButtonClick?.("disclaimer")}
            className="group relative px-8 py-4 bg-black border border-white/10 rounded-xl text-center transition-all duration-300"
            style={{
              boxShadow:
                hoveredButton === "disclaimer"
                  ? "0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(59, 130, 246, 0.3)"
                  : "0 0 10px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)",
              transform: hoveredButton === "disclaimer" ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            {/* Blue Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-xl"
              style={{
                background: hoveredButton === "disclaimer"
                  ? "radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)"
                  : "radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
                transition: "all 0.3s ease",
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              <h3
                className="text-white font-semibold text-base sm:text-lg md:text-xl transition-colors duration-300"
                style={{
                  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                  color: hoveredButton === "disclaimer" ? "#E0E7FF" : "#FFFFFF",
                }}
              >
                Disclaimer
              </h3>
            </div>
          </motion.button>
        </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

