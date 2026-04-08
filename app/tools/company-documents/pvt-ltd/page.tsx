"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import Link from "next/link";

const PDFViewer = dynamic(() => import("@/components/pdf/pdf-viewer-simple"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-20">
      <div className="text-white">Loading PDF viewer...</div>
    </div>
  ),
});

const DOCUMENTS = [
  {
    label: "SPICE Part B — Approval Letter",
    file: "/company-docs/SPICE_Part_B_Approval_Letter.pdf",
    downloadName: "SPICE_Part_B_Approval_Letter_AC2560731_10_Mar_2026.pdf",
  },
  {
    label: "INC-33",
    file: "/company-docs/INC-33_1-24800936141.pdf",
    downloadName: "INC-33_1-24800936141.pdf",
  },
  {
    label: "INC-34",
    file: "/company-docs/INC-34_1-24800936131.pdf",
    downloadName: "INC-34_1-24800936131.pdf",
  },
  {
    label: "Certificate of Incorporation",
    file: "/company-docs/882052106742306_signed_unlocked.pdf",
    downloadName: "882052106742306_signed_unlocked.pdf",
  },
];

export default function PvtLtdDocumentsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = DOCUMENTS[activeIndex];

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = active.file;
    link.download = active.downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white relative">
        <CircularBackground />

        <header className="border-b border-white/10 bg-black relative z-10">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 gap-2">
            <Link
              href="/tools/company-documents"
              className="text-sm sm:text-base text-white hover:text-gray-300 transition flex items-center gap-1 sm:gap-2 flex-shrink-0"
            >
              ← Back
            </Link>
            <h1
              className="text-lg sm:text-xl md:text-2xl font-medium text-white text-center flex-1"
              style={{ fontFamily: "var(--font-benzin)" }}
            >
              Pvt Ltd. Documents
            </h1>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white transition flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base flex-shrink-0"
              style={{ fontFamily: "var(--font-benzin)" }}
            >
              <span className="text-sm sm:text-base">📥</span>
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">Download</span>
            </button>
          </div>
        </header>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {DOCUMENTS.map((doc, index) => (
              <button
                key={doc.file}
                onClick={() => setActiveIndex(index)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    : "border border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                style={{ fontFamily: "var(--font-benzin)" }}
              >
                {doc.label}
              </button>
            ))}
          </div>
        </div>

        <main className="relative z-10 py-6 sm:py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <PDFViewer key={active.file} file={active.file} />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
