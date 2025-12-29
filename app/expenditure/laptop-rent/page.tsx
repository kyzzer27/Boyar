"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LaptopRentReasoningPage() {
  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-black text-white">
        <CircularBackground />

        <header className="relative z-10 border-b border-white/10 bg-black/90">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href="/expenditure"
              className="text-sm text-white/70 hover:text-white transition"
            >
              ← Back to Expenditure
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                Boyar Partners · Expenditure Module
              </p>
              <h1
                className="text-2xl font-medium text-white"
                style={{ fontFamily: "var(--font-benzin)" }}
              >
                Laptop Rent (Monthly) – Capital Allocation Rationale
              </h1>
            </div>
            <div className="text-right text-xs text-white/60">
              <p>Category: Month-1 Recurring Cost</p>
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-0">
          <div className="space-y-10">
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  Laptop Rent (₹7,000 × 2) — Two laptops
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹14,000 ($153.9)
                </h2>
              </header>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/80">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                    Reasoning
                  </h3>
                  <p className="mb-3 text-justify">
                    In the initial phase, renting laptops is a deliberate
                    capital-allocation decision rather than a cost compromise.
                    Purchasing equivalent laptops outright would require an
                    upfront investment of approximately ₹3,00,000, immediately
                    locking capital into depreciating hardware.
                  </p>
                  <p className="mb-3 text-justify">
                    By opting for rental:
                  </p>
                  <ul className="list-disc list-outside pl-5 space-y-1 text-white/80">
                    <li className="text-justify">
                      We preserve liquidity during the most critical early months
                    </li>
                    <li className="text-justify">
                      We avoid depreciation risk and obsolescence
                    </li>
                    <li className="text-justify">
                      We maintain flexibility to upgrade, scale, or replace
                      devices as operational needs evolve
                    </li>
                  </ul>
                  <p className="mt-3 text-justify">
                    For a boutique advisory firm, capital is better deployed
                    toward client acquisition, regulatory readiness, and execution
                    rather than immobilised in hardware assets that do not
                    directly generate returns.
                  </p>
                  <p className="mt-3 text-justify">
                    Cheaper laptops are not viable alternatives, as they would
                    constrain performance, reliability, and professional output.
                    Renting allows us to access high-spec systems without
                    sacrificing financial agility.
                  </p>
                </div>
              </div>
            </motion.section>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}




