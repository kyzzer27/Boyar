"use client";

import { useState } from "react";

interface PDFViewerProps {
  file: string;
}

export default function PDFViewerSimple({ file }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full">
      {/* PDF Display - Using iframe for reliable PDF rendering */}
      <div className="flex justify-center px-2 sm:px-4">
        <div className="bg-white/5 rounded-xl sm:rounded-2xl p-2 sm:p-4 border border-white/10 w-full max-w-5xl">
          <div className="relative w-full" style={{ minHeight: "400px", height: "calc(100vh - 200px)" }}>
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/50 rounded-lg z-10">
                <div className="text-white text-sm sm:text-lg">Loading PDF...</div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
            <iframe
              src={`${file}#toolbar=1&navpanes=1&scrollbar=1`}
              className="w-full h-full rounded-lg"
              style={{ border: "none", minHeight: "400px" }}
              onLoad={() => setIsLoading(false)}
              title="PDF Viewer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

