"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContingencyReserveReasoningPage() {
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
                Contingency Reserve – Risk Management Rationale
              </h1>
            </div>
            <div className="text-right text-xs text-white/60">
              <p>Category: Operational Contingency Buffer</p>
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
                  Contingency Reserve
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹20,000 ($219.8)
                </h2>
              </header>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/80">
                <h3 className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                  Reasoning
                </h3>
                <p className="mb-3 text-justify">
                  The contingency reserve is maintained to address unforeseen but
                  necessary operational expenses that arise during day-to-day
                  business activities. In a growing advisory firm, certain
                  requirements cannot always be predicted in advance—such as urgent
                  logistics, minor equipment needs, compliance-related costs, or
                  execution contingencies.
                </p>
                <p className="mb-3 text-justify">
                  Rather than disrupting planned budgets or delaying execution,
                  this reserve provides controlled flexibility while ensuring
                  business continuity. Importantly, this is not discretionary
                  spend; it is a risk-management buffer designed to prevent
                  inefficiencies caused by ad-hoc funding decisions.
                </p>
                <p className="text-justify">
                  All usage of this reserve will be transparently reported to
                  investors prior to deployment, maintaining accountability and
                  financial discipline.
                </p>
              </div>
            </motion.section>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}


