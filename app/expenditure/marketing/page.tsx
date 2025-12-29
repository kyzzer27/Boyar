"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MarketingReasoningPage() {
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
                Marketing – Visiting Cards & Ad Spend
              </h1>
            </div>
            <div className="text-right text-xs text-white/60">
              <p>Category: Brand Collateral & Acquisition Channels</p>
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-0">
          <div className="space-y-10">
            {/* Visiting Cards */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  1. Visiting Cards
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹35,000 ($384.6)
                </h2>
              </header>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/80">
                <div>
                  <p className="mb-1 text-white/70">Breakdown:</p>
                  <ul className="list-disc list-outside pl-5 space-y-1">
                    <li>₹25,000 — NFC Digital Visiting Cards (50 units)</li>
                    <li>₹10,000 — Traditional Visiting Cards (units to be finalised)</li>
                  </ul>
                </div>
                <p className="text-xs text-white/60">
                  Product link (NFC cards):{" "}
                  <a
                    href="https://www.vistaprint.in/business-cards/nfc-visiting-cards"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-blue-300 hover:text-blue-200"
                  >
                    https://www.vistaprint.in/business-cards/nfc-visiting-cards
                  </a>
                </p>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                    Reasoning
                  </h3>
                  <p className="mb-3 text-justify">
                    In advisory businesses, first impressions often occur in offline
                    environments—meetings, corporate offices, networking events, and
                    professional gatherings. Visiting cards remain a standard
                    expectation in these settings.
                  </p>
                  <p className="mb-3 text-justify">
                    The decision to allocate a majority of this spend to NFC digital
                    visiting cards is intentional. These cards allow instant access
                    to our portfolio, services, and contact details in a single tap,
                    reinforcing a modern, high-end, and technologically forward
                    brand image. They also reduce friction in follow-ups and enhance
                    recall.
                  </p>
                  <p className="mb-3 text-justify">
                    Traditional visiting cards are retained for compatibility in
                    settings where digital access is limited or not preferred.
                    Cheaper alternatives compromise print quality, durability, and
                    brand perception, which directly impacts credibility.
                  </p>
                  <h4 className="mt-3 text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                    Investor Perspective
                  </h4>
                  <p className="text-justify">
                    This approach balances innovation with practicality—enhancing
                    networking effectiveness while maintaining professional norms.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Ad Spend */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  2. Ad Spend (Month-1)
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹1,30,000 ($1,428.6)
                </h2>
              </header>
              <p className="text-sm sm:text-base leading-relaxed text-white/80">
                Well-defined in CAC Module. Please visit the CAC Module to know more.
              </p>
            </motion.section>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}




