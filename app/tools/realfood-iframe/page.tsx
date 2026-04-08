"use client";

import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/protected-route";
import TestScrollMorphHeroPage from "./test-scroll-morph-hero";

export default function TestPage() {
  return (
    <ProtectedRoute>
      <div className="relative h-screen w-full bg-[#06060e]">
        <div className="absolute left-4 top-4 z-50">
          <Link
            href="/tools"
            className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.14em] text-white/85 backdrop-blur transition hover:border-white/40 hover:text-white"
          >
            Back to Tools
          </Link>
        </div>
        <TestScrollMorphHeroPage />
      </div>
    </ProtectedRoute>
  );
}
