"use client";

import { AppShell } from "@/components/layout/app-shell";
import { useState, useEffect } from "react";
import { LoginModal } from "@/components/auth/login-modal";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 md:gap-16 px-4">
        <div
          className="text-center transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-20px)",
          }}
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium text-white mb-2 md:mb-4"
            style={{ fontFamily: "var(--font-benzin)" }}
          >
            Welcome to Dashboard
          </h1>
          <p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white/80"
            style={{ fontFamily: "var(--font-benzin)" }}
          >
            Know about your Investment
          </p>
        </div>

        <div
          className="transition-all duration-700 delay-300"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.8)",
          }}
        >
          <div
            onClick={() => setIsLoginOpen(true)}
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-white/30 bg-black/30 flex items-center justify-center cursor-pointer group hover:border-white/50 hover:bg-black/40 hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl"
          >
            <div
              className="text-center flex flex-col items-center gap-2"
              style={{ animation: "cta-rock 3s ease-in-out infinite" }}
            >
              <h2
                className="text-lg sm:text-xl md:text-2xl font-medium text-white"
                style={{ fontFamily: "var(--font-benzin)" }}
              >
                Get in
              </h2>
              <span
                className="text-xl sm:text-2xl"
                style={{ animation: "cta-nudge 1.5s ease-in-out infinite" }}
              >
                →
              </span>
            </div>
          </div>
        </div>

        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </div>
    </AppShell>
  );
}
