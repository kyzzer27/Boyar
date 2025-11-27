"use client";

import { useEffect, useState } from "react";
import { CircularTabs } from "@/components/navigation/circular-tabs";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { CircularBackground } from "@/components/motion/circular-background";
import Link from "next/link";
import type { UserRole } from "@/components/layout/app-shell";

export default function ToolsPage() {
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const storedRole = sessionStorage.getItem("userRole") as UserRole | null;
    setRole(storedRole);
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white relative">
        {/* Background Motion */}
        <CircularBackground />
        
        {/* Simple Header */}
        <header className="border-b border-white/10 bg-black relative z-10">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <Link href="/" className="text-sm sm:text-base text-white hover:text-gray-300 transition">
              ← Back
            </Link>
            <h1
              className="text-lg sm:text-xl md:text-2xl font-medium text-white"
              style={{ fontFamily: 'var(--font-benzin)' }}
            >
              Tools Dashboard
            </h1>
            <div className="w-12 sm:w-20" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex items-center justify-center min-h-[calc(100vh-80px)] relative z-10 py-4">
          {role ? (
            <CircularTabs role={role} />
          ) : (
            <div className="text-white/70 text-sm">Preparing your workspace...</div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}

