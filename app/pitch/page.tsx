"use client";

import dynamic from "next/dynamic";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import Link from "next/link";

// Use simple iframe-based PDF viewer - more reliable, no version issues
const PDFViewer = dynamic(() => import("@/components/pdf/pdf-viewer-simple"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-20">
      <div className="text-white">Loading PDF viewer...</div>
    </div>
  ),
});

export default function PitchPage() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/pitch-deck.pdf";
    link.download = "Boyar Partners Pitch Deck.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white relative">
        {/* Background Motion */}
        <CircularBackground />
        
        {/* Header */}
        <header className="border-b border-white/10 bg-black relative z-10">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 gap-2">
            <Link href="/tools" className="text-sm sm:text-base text-white hover:text-gray-300 transition flex items-center gap-1 sm:gap-2 flex-shrink-0">
              ← Back
            </Link>
            <h1
              className="text-lg sm:text-xl md:text-2xl font-medium text-white text-center flex-1"
              style={{ fontFamily: 'var(--font-benzin)' }}
            >
              Pitch Deck
            </h1>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white transition flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base flex-shrink-0"
              style={{ fontFamily: 'var(--font-benzin)' }}
            >
              <span className="text-sm sm:text-base">📥</span>
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">Download</span>
            </button>
          </div>
        </header>

        {/* PDF Viewer */}
        <main className="relative z-10 py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <PDFViewer file="/pitch-deck.pdf" />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

