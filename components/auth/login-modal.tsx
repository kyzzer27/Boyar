"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { UserRole } from "@/components/layout/app-shell";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setShow(true));
    } else {
      setShow(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLoading || !password.trim()) return;
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data: {
        success?: boolean;
        role?: UserRole;
        error?: string;
        redirect?: string;
        greetName?: string;
        greetTimezone?: string;
        restrictAsk?: boolean;
        chatEnabled?: boolean;
      } = await res.json();

      if (!res.ok || !data.role) {
        setError(data.error ?? "Unable to verify your credentials.");
        setIsLoading(false);
        return;
      }

      sessionStorage.setItem("isAuthenticated", "true");
      sessionStorage.setItem("userRole", data.role);
      if (data.greetName) {
        sessionStorage.setItem("greetName", data.greetName);
      }
      if (data.greetTimezone) {
        sessionStorage.setItem("greetTimezone", data.greetTimezone);
      }
      if (data.restrictAsk) {
        sessionStorage.setItem("restrictAsk", "true");
      } else {
        sessionStorage.removeItem("restrictAsk");
      }
      if (data.chatEnabled) {
        sessionStorage.setItem("chatEnabled", "true");
      } else {
        sessionStorage.removeItem("chatEnabled");
      }

      router.push(data.redirect || "/tools");
    } catch {
      setError("Unexpected error verifying credentials.");
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(0,0,0,0.9)",
          opacity: show ? 1 : 0,
        }}
        onClick={isLoading ? undefined : onClose}
      />

      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4 transition-all duration-300"
        style={{
          opacity: show ? 1 : 0,
          transform: show ? "scale(1)" : "scale(0.95)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-black border-2 border-white/30 rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-3xl font-semibold text-white"
              style={{ fontFamily: "var(--font-benzin)" }}
            >
              Secure Portal Login
            </h2>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="text-white/60 hover:text-white text-3xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ×
            </button>
          </div>

          <p className="text-gray-400 mb-6 text-sm">
            Access restricted to authorized Admin, Investor, and Investor Lite
            accounts. Please enter your assigned credentials.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="modal-password"
                className="block text-sm font-medium text-gray-300 mb-2"
                style={{ fontFamily: "var(--font-benzin)" }}
              >
                Access Password
              </label>
              <div className="relative">
                <input
                  id="modal-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 transition"
                  placeholder="Enter your assigned password"
                  required
                  autoFocus
                />
                {password.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                )}
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl border-2 border-white/30 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Authenticating..." : "Login"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-gray-500 text-center">
              Secure investor portal • All access is logged
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
