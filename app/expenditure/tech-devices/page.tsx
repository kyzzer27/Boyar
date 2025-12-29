"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TechDevicesReasoningPage() {
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
                Tech Devices (One-Time) – Reasoning & Product Links
              </h1>
            </div>
            <div className="text-right text-xs text-white/60">
              <p>Category: Hardware & Workstation Infrastructure</p>
            </div>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-0">
          <div className="space-y-10">
            {/* 1. LG Monitors */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  1. LG Monitors (31k × 2)
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹62,000 ($681.3)
                </h2>
              </header>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/80">
                <p className="text-xs text-white/60">
                  Product link:{" "}
                  <a
                    href="https://amzn.in/d/0AWuYvT"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-blue-300 hover:text-blue-200"
                  >
                    https://amzn.in/d/0AWuYvT
                  </a>
                </p>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                    Reasoning
                  </h3>
                  <p className="mb-3 text-justify">
                    Dual high-quality monitors are essential for founders handling
                    parallel workflows—CRM systems, legal documents, financial
                    models, research, and client communications simultaneously. LG
                    monitors were chosen for display clarity, colour accuracy, and
                    long-term reliability.
                  </p>
                  <p className="text-justify">
                    Cheaper monitors often compromise on resolution, viewing
                    angles, or durability, leading to eye strain, reduced
                    productivity, and early replacement costs. This selection
                    supports sustained daily usage without degradation in
                    performance.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* 2. Mac Mini */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.03 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  2. Mac Mini
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹80,000 ($879.1)
                </h2>
              </header>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/80">
                <p className="text-xs text-white/60">
                  Product link:{" "}
                  <a
                    href="https://amzn.in/d/bF5QJzq"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-blue-300 hover:text-blue-200"
                  >
                    https://amzn.in/d/bF5QJzq
                  </a>
                </p>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                    Reasoning
                  </h3>
                  <p className="mb-3 text-justify">
                    The Mac Mini provides a stable, high-performance workstation
                    for founders at a lower cost than laptops with equivalent
                    capability. It is used for operational management, document
                    review, design previews, dashboards, and internal coordination.
                  </p>
                  <p className="text-justify">
                    Cheaper desktop alternatives often suffer from inconsistent
                    performance, software instability, or compatibility issues. The
                    Mac Mini ensures reliability, security, and longevity,
                    reducing downtime and replacement risk over multiple years.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* 3. Webcams */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.06 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  3. Webcams (5k × 2)
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹10,000 ($109.9)
                </h2>
              </header>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/80">
                <p className="text-xs text-white/60">
                  Product link:{" "}
                  <a
                    href="https://amzn.in/d/caqrAE7"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-blue-300 hover:text-blue-200"
                  >
                    https://amzn.in/d/caqrAE7
                  </a>
                </p>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                    Reasoning
                  </h3>
                  <p className="mb-3 text-justify">
                    High-quality webcams are necessary for investor calls, client
                    meetings, regulatory discussions, and partner communications.
                    Clear video output reinforces professionalism and trust—
                    critical in advisory relationships.
                  </p>
                  <p className="text-justify">
                    Low-cost webcams frequently deliver poor image quality and
                    unreliable performance, which negatively impacts perception
                    during high-stakes calls. This selection ensures consistent,
                    professional video presence.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* 4. Office Chairs */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.09 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  4. Office Chairs (5k × 2)
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹10,000 ($109.9)
                </h2>
              </header>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/80">
                <p className="text-xs text-white/60">Sourced locally</p>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                    Reasoning
                  </h3>
                  <p className="mb-3 text-justify">
                    Ergonomic seating is a functional requirement for founders
                    working long hours across strategy, calls, and execution.
                    Chairs are locally sourced to balance cost efficiency with
                    physical support.
                  </p>
                  <p className="text-justify">
                    Inferior seating leads to fatigue and productivity loss over
                    time. This modest investment prioritises sustained working
                    capacity without unnecessary premium spend.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* 5. 2TB SSD */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  5. 2TB SSD
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹10,000 ($109.9)
                </h2>
              </header>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/80">
                <p className="text-xs text-white/60">
                  Product link:{" "}
                  <a
                    href="https://amzn.in/d/cvzZlgN"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-blue-300 hover:text-blue-200"
                  >
                    https://amzn.in/d/cvzZlgN
                  </a>
                </p>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                    Reasoning
                  </h3>
                  <p className="mb-3 text-justify">
                    High-capacity SSD storage is required for secure handling of
                    documents, backups, recordings, and internal data. SSDs offer
                    significantly higher speed, reliability, and data safety
                    compared to traditional hard drives.
                  </p>
                  <p className="text-justify">
                    Cheaper storage options introduce risks of data loss, slower
                    workflows, and operational disruption. This ensures performance
                    stability and data integrity from day one.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* 6. DJI Mic */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <header className="mb-4 sm:mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                  6. DJI Mic
                </p>
                <h2
                  className="text-xl sm:text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-benzin)" }}
                >
                  ₹20,000 ($219.8)
                </h2>
              </header>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/80">
                <p className="text-xs text-white/60">
                  Product link:{" "}
                  <a
                    href="https://amzn.in/d/g3pQRau"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-blue-300 hover:text-blue-200"
                  >
                    https://amzn.in/d/g3pQRau
                  </a>
                </p>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">
                    Reasoning
                  </h3>
                  <p className="mb-3 text-justify">
                    Clear, professional audio is non-negotiable for recorded
                    content, webinars, presentations, and high-quality
                    communications. DJI Mic was chosen for its reliability,
                    clarity, and ease of use.
                  </p>
                  <p className="text-justify">
                    Lower-cost microphones often result in inconsistent sound
                    quality, background noise, and re-recording overhead. This
                    investment ensures clean audio output that aligns with the
                    firm’s premium positioning and avoids repeated production
                    costs.
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




