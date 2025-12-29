"use client";

import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function ConversionMetricsPage() {
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white text-black">
        <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="text-sm font-medium text-gray-700 hover:text-black transition"
            >
              ← Back
            </button>
            <div className="w-12" />
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-6 py-16">
          <div className="flex items-center justify-center">
            <h1
              className="text-center text-2xl sm:text-3xl font-bold text-black"
              style={{ fontFamily: "var(--font-benzin)" }}
            >
              The data will be available here during initial results of aquisition channels.
            </h1>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

