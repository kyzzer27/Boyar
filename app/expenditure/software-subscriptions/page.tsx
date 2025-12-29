"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SoftwareSubscriptionsReasoningPage() {
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
                Software Subscriptions – Execution Stack Rationale
              </h1>
            </div>
            <div className="text-right text-xs text-white/60">
              <p>Category: Month-1 Recurring Software Costs</p>
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-0">
          <div className="space-y-10">
            {/* Stack Overview */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <h2
                className="text-lg sm:text-xl font-semibold text-white mb-3"
                style={{ fontFamily: "var(--font-benzin)" }}
              >
                Software Stack Philosophy
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-white/80 text-justify">
                The selected software stack is intentionally lean and modular.
                Each tool directly supports execution, client acquisition,
                documentation, or operational efficiency. In a boutique advisory
                firm, software replaces headcount and reduces execution friction;
                under-investing here increases operational risk and inefficiency.
              </p>
            </motion.section>

            {/* 1. ChatGPT Business ×2 */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.03 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  1. ChatGPT Business ×2
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹5,300 ($58.2)
                </h2>
              </header>
              <p className="text-sm sm:text-base leading-relaxed text-white/80 text-justify">
                Used as an internal productivity and research tool for drafting
                advisory documents, compliance material, proposals, investor
                communication, and internal workflows. The business plan ensures
                reliability, consistency, and secure usage. Cheaper or free
                alternatives introduce limits, inconsistency, and productivity
                loss. This tool reduces turnaround time and supports high-quality
                outputs without increasing headcount.
              </p>
            </motion.section>

            {/* 2. HubSpot Starter ×2 */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.06 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  2. HubSpot Starter ×2
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹5,300 ($58.2)
                </h2>
              </header>
              <p className="text-sm sm:text-base leading-relaxed text-white/80 text-justify">
                HubSpot serves as the central CRM for lead tracking, pipeline
                management, client communication, and reporting. Using a
                structured CRM from day one prevents data loss, fragmented
                follow-ups, and unmanaged deal flow. Cheaper CRM or
                spreadsheet-based tracking does not scale, creates visibility
                gaps, and weakens sales accountability—especially critical when
                dealing with high-value advisory clients.
              </p>
            </motion.section>

            {/* 3. Canva Pro */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.09 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  3. Canva Pro
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹500 ($5.5)
                </h2>
              </header>
              <p className="text-sm sm:text-base leading-relaxed text-white/80 text-justify">
                Used for quick creation of professional visuals, pitch decks,
                internal reports, and marketing assets. It allows fast iteration
                without depending on external designers for routine needs.
                Low-cost design tools lack flexibility and quality consistency,
                while outsourcing every minor design task increases costs and
                delays.
              </p>
            </motion.section>

            {/* 4. KrispCall Virtual Number */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  4. KrispCall Virtual Number
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹1,500 ($16.5)
                </h2>
              </header>
              <p className="text-sm sm:text-base leading-relaxed text-white/80 text-justify">
                Provides a professional virtual number for client and partner
                communication, ensuring separation between personal and business
                calls. This is essential for professionalism, record-keeping, and
                scalability. Using personal numbers or free calling tools weakens
                brand perception and operational control.
              </p>
            </motion.section>

            {/* 5. Otter.ai */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  5. Otter.ai
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹1,000 ($11.0)
                </h2>
              </header>
              <p className="text-sm sm:text-base leading-relaxed text-white/80 text-justify">
                Used for accurate transcription of meetings, investor discussions,
                and client calls, enabling better documentation, follow-ups, and
                internal alignment. Manual note-taking or free tools are
                unreliable and lead to information gaps in high-value
                conversations.
              </p>
            </motion.section>

            {/* 6. Proton Mail + Drive */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.18 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  6. Proton Mail + Drive
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹2,000 ($22.0)
                </h2>
              </header>
              <p className="text-sm sm:text-base leading-relaxed text-white/80 text-justify">
                Chosen for secure, encrypted communication and document storage.
                In an advisory firm handling sensitive client and structuring
                information, data privacy and confidentiality are critical. Free
                email or cloud storage solutions introduce security, compliance,
                and reputational risks that are unacceptable at this level.
              </p>
            </motion.section>

            {/* 7. LinkedIn (2 accounts) */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.21 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  7. LinkedIn (2 Accounts)
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹2,000 ($22.0)
                </h2>
              </header>
              <p className="text-sm sm:text-base leading-relaxed text-white/80 text-justify">
                LinkedIn is a core relationship-building and outbound channel in
                this industry. Paid accounts improve reach, credibility, and
                communication capabilities with decision-makers. Organic-only
                usage limits visibility and reduces outbound effectiveness.
              </p>
            </motion.section>

            {/* 8. LinkedIn Sales Navigator */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.24 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  8. LinkedIn Sales Navigator
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹3,000 ($33.0)
                </h2>
              </header>
              <p className="text-sm sm:text-base leading-relaxed text-white/80 text-justify">
                Used for precision targeting of founders, executives, and
                institutions relevant to our advisory services. It significantly
                improves lead quality and reduces wasted outreach. Cheaper
                prospecting tools lack data depth and filtering accuracy,
                increasing time and cost per acquisition.
              </p>
            </motion.section>

            {/* 9. Structure Layout Tools */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.27 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  9. Structure Layout Tools
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹2,000 ($22.0)
                </h2>
              </header>
              <p className="text-sm sm:text-base leading-relaxed text-white/80 text-justify">
                Used to create structure diagrams, workflow maps, and visual
                explanations for internal planning and client presentations.
                Clear structuring visuals are essential in offshore and advisory
                work. Without these tools, explanations become inefficient and
                reduce client clarity and confidence.
              </p>
            </motion.section>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}




