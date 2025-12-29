"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContentProductionReasoningPage() {
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
                Content Production – Brand & Credibility Rationale
              </h1>
            </div>
            <div className="text-right text-xs text-white/60">
              <p>Category: Content & Brand Expression</p>
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-0">
          <div className="space-y-10">
            {/* 1. Studio / Hotel Expense */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  1. Studio / Hotel Expense
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹20,000 ($219.8)
                </h2>
              </header>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/80">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                    Reasoning
                  </h3>
                  <p className="mb-3 text-justify">
                    For a boutique advisory firm, content is not produced for
                    volume—it is produced for credibility, positioning, and
                    authority. When publishing videos on professional platforms,
                    the environment in which the content is recorded directly
                    influences how the firm is perceived.
                  </p>
                  <p className="mb-3 text-justify">
                    Using a studio or a professional hotel setting ensures a
                    clean, controlled, and premium backdrop that aligns with the
                    expectations of our target audience. It signals seriousness,
                    stability, and industry alignment. Informal or low-quality
                    environments often undermine trust and make the firm appear
                    early-stage or unpolished, which is counterproductive in
                    advisory services.
                  </p>
                  <h4 className="mt-3 text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                    Investor Perspective
                  </h4>
                  <p className="text-justify">
                    This is a brand-protection decision. A modest, controlled
                    investment ensures that externally visible content reinforces
                    our positioning rather than diluting it.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* 2. Camera Equipment Rental */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  2. Camera Equipment Rental
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹10,000 ($109.9)
                </h2>
              </header>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/80">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                    Reasoning
                  </h3>
                  <p className="mb-3 text-justify">
                    High-quality video output is essential to maintain a boutique
                    and exclusive visual standard. Professional camera equipment
                    significantly improves clarity, framing, and overall
                    production quality—factors that directly affect audience trust
                    and engagement.
                  </p>
                  <p className="mb-3 text-justify">
                    Renting equipment in the initial phase is a capital-efficient
                    choice. It allows us to access professional-grade output
                    without committing large upfront capital to assets that may be
                    upgraded or changed as content strategy evolves.
                  </p>
                  <p className="mb-3 text-justify">
                    Cheaper devices compromise video quality and introduce
                    inconsistencies that erode brand perception. Buying equipment
                    outright at this stage would unnecessarily lock capital into
                    rapidly depreciating assets.
                  </p>
                  <h4 className="mt-3 text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                    Investor Perspective
                  </h4>
                  <p className="text-justify">
                    Renting balances quality with financial discipline—achieving
                    professional output while preserving capital flexibility
                    during early growth.
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




