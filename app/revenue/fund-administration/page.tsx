"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function FundAdministrationPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#FDFBEE] flex flex-col">
        <header className="border-b border-[#E0DDD0]">
          <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-5 sm:px-6 lg:px-8">
            <Link
              href="/tools"
              className="text-sm text-[#8B8575] transition hover:text-[#2D2A24]"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              &larr; Back
            </Link>
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center px-6 py-16 sm:px-10 sm:py-24">
          <motion.div
            className="max-w-2xl text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-lg font-bold leading-relaxed tracking-tight text-[#2D2A24] sm:text-xl md:text-[1.35rem]"
              style={{ fontFamily: "var(--font-cinzel)", lineHeight: 1.8 }}
            >
              We haven&apos;t included a Fund Administration revenue projection
              in this model because the service isn&apos;t part of our Year 1
              offering. Building a credible forecast requires defined pricing, a
              clear compliance framework, and visibility on staffing
              costs&thinsp;&mdash;&thinsp;none of which we can pin down
              responsibly until we&apos;re closer to launch. Rather than pad the
              model with speculative numbers, we&apos;ve kept projections
              limited to services we&apos;re actively delivering. We&apos;ll
              build out the Fund Administration forecast as part of our Year 2
              planning once the operational groundwork is in place.
            </p>
          </motion.div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
