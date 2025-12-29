"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import Link from "next/link";
import { motion } from "framer-motion";

export default function InfrastructureReasoningPage() {
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
                Infrastructure – Website & Office Rent Rationale
              </h1>
            </div>
            <div className="text-right text-xs text-white/60">
              <p>Category: Digital Presence & Physical Workspace</p>
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-0">
          <div className="space-y-10">
            {/* Website */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  1. Website
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹80,000 ($879.1)
                </h2>
              </header>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/80">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                    Reasoning
                  </h3>
                  <p className="mb-3 text-justify">
                    In the boutique advisory and offshore services industry, the
                    website is not a passive brochure—it is a primary
                    lead-generation and trust-validation engine. High-value
                    clients conduct extensive due diligence before initiating
                    contact, and the website is often the first and most decisive
                    credibility checkpoint.
                  </p>
                  <p className="mb-3 text-justify">
                    This investment covers professional design, structured service
                    presentation, compliance positioning, and clarity of advisory
                    offerings. Cheaper website alternatives typically fail to
                    convey authority, depth, and regulatory seriousness, which
                    directly reduces inbound conversion quality.
                  </p>
                  <h4 className="mt-3 text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                    Investor Perspective
                  </h4>
                  <p className="text-justify">
                    A well-built website lowers long-term customer acquisition
                    costs, attracts higher-intent leads, and supports premium
                    pricing. It is a foundational digital asset rather than a
                    marketing expense.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Office Rent */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  2. Office Rent
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹40,000 ($439.6)
                </h2>
              </header>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/80">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                    Reasoning
                  </h3>
                  <p className="mb-3 text-justify">
                    In the initial phase, we are intentionally renting a cabin
                    located near corporate offices. This is a strategic decision
                    to establish physical presence, enable networking within
                    professional environments, and facilitate in-person meetings
                    during the firm’s early visibility-building stage.
                  </p>
                  <p className="mb-3 text-justify">
                    Physical proximity to corporate hubs increases credibility,
                    improves access to potential clients and partners, and
                    supports trust-building—especially in advisory businesses
                    where personal relationships matter.
                  </p>
                  <p className="text-justify">
                    This is a temporary positioning strategy. Once brand presence
                    and deal flow stabilise, we plan to transition to a more
                    cost-efficient office setup with lower rent, optimising fixed
                    overheads while retaining operational effectiveness.
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




