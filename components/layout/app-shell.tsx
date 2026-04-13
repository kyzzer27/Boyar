"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export type UserRole = "admin" | "investor" | "investor-lite";

export interface AppShellProps {
  readonly children: React.ReactNode;
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const parts = document.cookie.split(";").map((p) => p.trim());
  for (const p of parts) {
    const idx = p.indexOf("=");
    if (idx === -1) continue;
    if (p.slice(0, idx) === name) return decodeURIComponent(p.slice(idx + 1));
  }
  return null;
}

export function AppShell({ children }: AppShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const videoRef = useRef<HTMLVideoElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    setHeaderVisible(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    // Super admin gate for the admin button
    setIsSuperAdmin(readCookie("bp_super_admin") === "1");
    setIsAuthed(Boolean(readCookie("bp_auth_flag")));

    // NOTE: Visitor heartbeat lives in <VisitorTracker /> (mounted from the
    // root layout) so that every route — including /login and pages that
    // don't use AppShell — is tracked.
  }, []);

  const handleLogout = async () => {
    const sessionId =
      typeof window !== "undefined" ? sessionStorage.getItem("bp_visitor_sid") : null;
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, endedAt: Date.now() }),
        credentials: "same-origin",
      });
    } catch {
      /* noop */
    }
    try {
      sessionStorage.clear();
    } catch {
      /* noop */
    }
    router.replace("/login");
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="/videos/snow-mountain-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/snow-mountain.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10">
        <header
          className="sticky top-0 z-30 border-b border-white/10 bg-black transition-all duration-700"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(-40px)",
          }}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6 lg:px-8 lg:py-8 gap-2 sm:gap-4">
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 md:gap-4 group flex-shrink-0">
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24 flex-shrink-0">
                <Image
                  src="/bp-logo-transparent.png"
                  alt="Boyar Partners Logo"
                  width={96}
                  height={96}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <p
                  className="text-[1.0625rem] sm:text-[1.275rem] md:text-[1.59375rem] lg:text-[1.9125rem] xl:text-[2.55rem] font-normal text-white uppercase leading-tight"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  BOYAR
                </p>
                <p
                  className="text-[0.8rem] sm:text-[0.96rem] md:text-[1.2rem] lg:text-[1.44rem] xl:text-[1.92rem] font-normal text-white uppercase leading-tight"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  PARTNERS
                </p>
              </div>
            </Link>
            <p
              className="hidden sm:block text-xs md:text-sm lg:text-base xl:text-lg font-medium text-gray-300 whitespace-nowrap flex-shrink"
              style={{ fontFamily: "var(--font-benzin)" }}
            >
              Investors Intelligence
            </p>
            {!isHomePage && (
              <div className="flex items-center gap-2">
                {isSuperAdmin && (
                  <Link
                    href="/admin-sessions"
                    className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs sm:text-sm text-white/80 hover:bg-white/10 hover:text-white transition whitespace-nowrap"
                  >
                    Admin
                  </Link>
                )}
                {isAuthed && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs sm:text-sm text-white/80 hover:bg-white/10 hover:text-white transition whitespace-nowrap"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
          {children}
        </main>

      </div>
    </div>
  );
}
