"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LicensingLegalReasoningPage() {
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
                Licensing & Legal – Reasoning & Execution Partners
              </h1>
            </div>
            <div className="text-right text-xs text-white/60">
              <p>Category: Foundational Regulatory & Legal Setup</p>
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-0">
          <div className="space-y-10">
            {/* FCA Licensing */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  1. FCA Licensing
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹4,00,000 ($4,395.6)
                </h2>
              </header>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/80">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                    Reasoning
                  </h3>
                  <p className="mb-3 text-justify">
                    Operating under an FCA-regulated framework is central to Boyar
                    Partners’ positioning as a serious, cross-border boutique
                    advisory firm. In structuring, banking, and fiduciary
                    mandates, regulatory credibility directly influences client
                    trust, counterparty acceptance, and execution certainty. This
                    is not a branding preference; it is a commercial requirement
                    that materially impacts the quality of clients we can onboard
                    and the partners we can work with.
                  </p>
                  <p className="text-justify">
                    Lower-cost or unregulated advisory routes would dilute our
                    credibility, restrict banking and partnership options, and
                    compress the ceiling on mandate size and quality. For a firm
                    deliberately positioned at the premium end of the advisory
                    spectrum, regulatory legitimacy is non-negotiable.
                  </p>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                    Execution &amp; Source
                  </h3>
                  <p className="mb-3 text-justify">
                    To balance speed with regulatory discipline, Boyar Partners is
                    securing FCA coverage via a licensed third-party arrangement,
                    with facilitation and structuring support from Intershore
                    Consult (BVI).
                  </p>
                  <ul className="list-disc list-outside pl-5 space-y-1 text-white/80">
                    <li className="text-justify">
                      Intershore is supporting us in accessing an FCA licence on
                      an expedited basis, compressing the typical 3–4 month
                      timeframe and enabling earlier revenue generation.
                    </li>
                    <li className="text-justify">
                      The structure keeps us within a compliant, supervised
                      framework from inception while preserving optionality for a
                      standalone licence in future.
                    </li>
                  </ul>
                  <p className="mt-3 text-xs text-white/60">
                    Supplier website:{" "}
                    <a
                      href="https://www.intershore.com/site19/"
                      target="_blank"
                      rel="noreferrer"
                      className="underline text-blue-300 hover:text-blue-200"
                    >
                      https://www.intershore.com/site19/
                    </a>
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Indian Company Formation */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  2. Indian Company Formation (Pvt. Ltd.)
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
                    A formally incorporated Indian private limited company is
                    required for lawful operations, including invoicing, payroll,
                    vendor engagement, tax compliance, and internal governance. It
                    also provides investors with a clear legal vehicle for capital
                    deployment and transparent financial reporting.
                  </p>
                  <p className="text-justify">
                    Operating without a proper domestic legal entity—or via
                    informal arrangements—would introduce regulatory, tax, and
                    reputational risk that is inconsistent with a governance-led
                    boutique advisory platform.
                  </p>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                    Execution &amp; Source
                  </h3>
                  <p className="mb-3 text-justify">
                    The incorporation process is being managed by United IT
                    Services, Mahipalpur, who are assisting us in sourcing and
                    coordinating with a compliant, end-to-end company formation
                    provider.
                  </p>
                  <p className="mb-2 text-justify">
                    This ensures:
                  </p>
                  <ul className="list-disc list-outside pl-5 space-y-1 text-white/80">
                    <li className="text-justify">
                      Timely incorporation and documentation
                    </li>
                    <li className="text-justify">
                      Alignment with Indian Companies Act requirements
                    </li>
                    <li className="text-justify">
                      Clean books and records from day one for both operational and
                      investor reporting.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}


