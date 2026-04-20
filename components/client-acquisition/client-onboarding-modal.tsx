"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { OnboardingDocument } from "./onboarding-document";

const SECTIONS = [
  { id: "section-1", num: "01", label: "Executive Overview" },
  { id: "section-2", num: "02", label: "Institutional Client Lifecycle Architecture" },
  { id: "section-3", num: "03", label: "Phase I – Mandate Activation Governance" },
  { id: "section-4", num: "04", label: "Phase II – Risk & Compliance Assessment" },
  { id: "section-5", num: "05", label: "Phase III – Structuring Blueprint Development" },
  { id: "section-6", num: "06", label: "Service-Specific Execution Frameworks" },
  { id: "section-7", num: "07", label: "Phase VI – Completion & Documentation Control" },
  { id: "section-8", num: "08", label: "Phase VII – Ongoing Monitoring & Governance" },
  { id: "section-9", num: "09", label: "Governance Enhancements" },
  { id: "section-10", num: "10", label: "Technology Implementation Layer" },
];

interface ClientOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ClientOnboardingModal({ isOpen, onClose }: ClientOnboardingModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>("section-1");

  // Update the progress bar width directly via the DOM — NOT through React
  // state — so scrolling never triggers a component re-render. This was the
  // single biggest source of scroll jank: setScrollProgress() caused a full
  // re-render on every animation frame while scrolling.
  const updateProgress = useCallback(() => {
    const el = scrollRef.current;
    const bar = progressRef.current;
    if (!el || !bar) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const total = scrollHeight - clientHeight;
    const pct = total > 0 ? Math.min((scrollTop / total) * 100, 100) : 0;
    bar.style.width = `${pct}%`;
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!isOpen || !el) return;
    const sectionIds = SECTIONS.map((s) => s.id);
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          if (sectionIds.includes(id)) setActiveSection(id);
        }
      },
      { root: el, rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    elements.forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, [isOpen]);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            className="fixed inset-0 z-[101] flex flex-col md:flex-row"
            initial={{ opacity: 0, y: "3%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "3%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Progress bar — width is set directly by the scroll handler
                via progressRef, never through React state, so scrolling
                triggers zero re-renders. */}
            <div className="absolute left-0 right-0 top-0 z-[102] h-0.5 bg-[#E0DDD0] md:left-64">
              <div
                ref={progressRef}
                className="h-full bg-[#FF0000]/60"
                style={{ width: "0%", willChange: "width" }}
              />
            </div>

            {/* Left sidebar */}
            <aside className="hidden w-64 shrink-0 flex-col border-r border-[#E0DDD0] bg-[#F7F5E8] md:flex md:pt-0.5">
              <div className="px-5 py-5 border-b border-[#E0DDD0]">
                <p className="text-[10px] uppercase tracking-[3px] text-[#7a7a7a] font-extrabold">Boyar Partners</p>
                <p className="text-[12px] mt-1 text-[#1a1a1a] font-bold">Client Onboarding</p>
              </div>
              <nav className="flex flex-col gap-0.5 px-3 py-4 overflow-y-auto">
                {SECTIONS.map(({ id, num, label }) => {
                  const isActive = activeSection === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => scrollToSection(id)}
                      className="group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors duration-200"
                      style={{
                        backgroundColor: isActive ? "rgba(255,0,0,0.06)" : "transparent",
                      }}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-4/5 w-0.5 -translate-y-1/2 rounded-full bg-[#FF0000]" />
                      )}
                      <span
                        className="text-[11px] font-bold tabular-nums tracking-wider transition-colors duration-200"
                        style={{ color: isActive ? "#FF0000" : "#7a7a7a" }}
                      >
                        {num}
                      </span>
                      <span
                        className="text-[13px] leading-snug transition-colors duration-200"
                        style={{ color: isActive ? "#1a1a1a" : "#7a7a7a" }}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Right content */}
            <div className="flex min-h-0 flex-1 flex-col bg-[#FDFBEE]">
              <header className="sticky top-0 z-10 flex shrink-0 flex-col gap-2 border-b border-[#E0DDD0] bg-[#FDFBEE] px-4 py-3">
                <div className="flex items-center justify-between md:justify-end">
                  <div className="flex gap-1 overflow-x-auto pb-1 md:hidden">
                    {SECTIONS.map(({ id, num }) => {
                      const isActive = activeSection === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => scrollToSection(id)}
                          className="shrink-0 rounded px-2.5 py-1.5 text-xs font-bold tabular-nums transition-colors"
                          style={{
                            backgroundColor: isActive ? "#FF0000" : "#F7F5E8",
                            color: isActive ? "#fff" : "#7a7a7a",
                          }}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[#7a7a7a] transition-colors hover:bg-[#E0DDD0]/50 hover:text-[#1a1a1a]"
                    aria-label="Close"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </header>
              <div
                ref={scrollRef}
                onScroll={updateProgress}
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-8 md:px-10 md:py-12"
                style={{
                  WebkitOverflowScrolling: "touch",
                }}
              >
                <OnboardingDocument />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
