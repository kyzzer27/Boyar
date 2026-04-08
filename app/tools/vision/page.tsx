"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function VisionPage() {
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
              This section will be presented in detail during our scheduled
              meeting. We&apos;ve kept it for a live walkthrough to give the
              vision the context and narrative it deserves.
            </p>
            <Link
              href="/tools/trajectory"
              className="mt-8 inline-block text-base font-bold text-[#2D2A24] underline underline-offset-4 decoration-[#2D2A24]/40 hover:decoration-[#2D2A24] transition-all duration-300"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Visit Trajectory page else &rarr;
            </Link>
          </motion.div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
