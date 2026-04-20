"use client";

import Link from "next/link";
import { motion } from "@/components/motion/lite-motion";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function FundAdministrationServicePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#FDFBEE] flex flex-col">
        <header className="border-b border-[#E0DDD0]">
          <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-5 sm:px-6 lg:px-8">
            <Link
              href="/tools/services-direct"
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
              Fund Administration is a high-value service we fully intend to
              bring to market, but we&apos;re deliberately holding it for Year 2
              and beyond. The compliance infrastructure and specialist headcount
              it demands&thinsp;&mdash;&thinsp;fund accounting, NAV
              calculations, regulatory reporting&thinsp;&mdash;&thinsp;don&apos;t
              align with our lean, founder-led model in Year 1. We&apos;d rather
              launch it properly with the right team and controls in place than
              stretch ourselves thin early on. Once we&apos;ve built the
              operational foundation and revenue base to support it, we&apos;ll
              roll it out with the same quality standard we apply to everything
              else.
            </p>
          </motion.div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
