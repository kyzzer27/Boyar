"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import type { UserRole } from "@/components/layout/app-shell";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data: { success?: boolean; role?: UserRole; error?: string; redirect?: string } = await response.json();

      if (!response.ok || !data.role) {
        setError(data.error ?? "Unable to verify your credentials.");
        setIsLoading(false);
        return;
      }

      sessionStorage.setItem("isAuthenticated", "true");
      sessionStorage.setItem("userRole", data.role);

      setIsLoading(false);
      onClose();
      router.push(data.redirect ?? "/tools");
    } catch (err) {
      console.error("Login error", err);
      setError("Unexpected error verifying credentials.");
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="bg-black/95 border-2 border-white/30 rounded-3xl p-8 max-w-md w-full backdrop-blur-xl shadow-2xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-3xl font-semibold text-white"
                  style={{ fontFamily: 'var(--font-benzin)' }}
                >
                  Secure Portal Login
                </h2>
                <motion.button
                  onClick={onClose}
                  className="text-white/60 hover:text-white text-3xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition"
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>
              </div>

              <p className="text-gray-400 mb-6 text-sm">
                Access restricted to authorized Admin, Investor, and Investor Lite accounts. Please enter your assigned credentials.
              </p>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-2"
                    style={{ fontFamily: 'var(--font-benzin)' }}
                  >
                    Access Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 transition"
                    placeholder="Enter your assigned password"
                    required
                    autoFocus
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-xl border-2 border-white/30 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 text-white font-medium transition backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isLoading ? 1 : 1.02, boxShadow: isLoading ? "none" : "0 0 20px rgba(255, 255, 255, 0.2)" }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                >
                  {isLoading ? "Authenticating..." : "Login"}
                </motion.button>
              </form>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-gray-500 text-center">
                  Secure investor portal • All access is logged
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}




