"use client";

import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

interface PDFViewerProps {
  file: string;
}

export default function PDFViewer({ file }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Ensure worker is set up - use version from pdfjs to ensure exact match
    if (typeof window !== "undefined") {
      // Use the exact version that matches the imported pdfjs library
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    }
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setError(null);
  }

  function onDocumentLoadError(error: Error) {
    console.error("PDF load error:", error);
    setError(`Failed to load PDF: ${error.message}`);
  }

  return (
    <>
      {/* Controls */}
      <div className="mb-6 flex items-center justify-center gap-4 flex-wrap">
        <button
          onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
          disabled={pageNumber <= 1}
          className="px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        <span className="px-4 py-2 text-white">
          Page {pageNumber} of {numPages}
        </span>
        <button
          onClick={() => setPageNumber((prev) => Math.min(numPages, prev + 1))}
          disabled={pageNumber >= numPages}
          className="px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale((prev) => Math.max(0.5, prev - 0.2))}
            className="px-3 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white transition"
          >
            −
          </button>
          <span className="px-3 py-2 text-white text-sm">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale((prev) => Math.min(2, prev + 0.2))}
            className="px-3 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white transition"
          >
            +
          </button>
        </div>
      </div>

      {/* PDF Document */}
      <div className="flex justify-center">
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex flex-col items-center justify-center p-20 gap-4">
                <div className="text-white text-lg">Loading PDF...</div>
                <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              </div>
            }
            error={
              <div className="flex flex-col items-center justify-center p-20 gap-4">
                <div className="text-red-400 text-lg">Failed to load PDF</div>
                {error && <div className="text-red-300 text-sm">{error}</div>}
                <div className="text-gray-400 text-sm">Please check if the file exists and try again.</div>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="shadow-2xl"
            />
          </Document>
        </div>
      </div>

      {/* Page Navigation Dots */}
      {numPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
          {Array.from({ length: numPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPageNumber(i + 1)}
              className={`w-3 h-3 rounded-full transition ${
                pageNumber === i + 1
                  ? "bg-white w-8"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      )}
    </>
  );
}

