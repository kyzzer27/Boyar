"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FloatingParticles } from "@/components/motion/floating-particles";

export type UserRole = "admin" | "investor" | "investor-lite";

export interface AppShellProps {
  readonly children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Video Background */}
      <div className="fixed inset-0 z-0 h-screen w-screen">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/snow-mountain.mp4" type="video/mp4" />
          <source src="/videos/snow-mountain.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Content */}
      <div className="relative z-10">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="sticky top-0 z-30 border-b border-white/10 bg-black"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6 lg:px-8 lg:py-8 gap-2 sm:gap-4">
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 md:gap-4 group flex-shrink-0">
              <motion.div
                className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24 flex-shrink-0"
                whileHover={{ rotate: 360, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <Image
                  src="/bp-logo-transparent.png"
                  alt="Boyar Partners Logo"
                  width={96}
                  height={96}
                  className="object-contain"
                  priority
                  style={{ display: 'block' }}
                />
              </motion.div>
              <motion.div
                className="flex flex-col"
                whileHover={{ scale: 1.05, letterSpacing: "0.1em" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.p
                  className="text-[1.0625rem] sm:text-[1.275rem] md:text-[1.59375rem] lg:text-[1.9125rem] xl:text-[2.55rem] font-normal text-white uppercase leading-tight"
                  style={{ fontFamily: 'var(--font-cinzel)' }}
                >
                  BOYAR
                </motion.p>
                <motion.p
                  className="text-[0.8rem] sm:text-[0.96rem] md:text-[1.2rem] lg:text-[1.44rem] xl:text-[1.92rem] font-normal text-white uppercase leading-tight"
                  style={{ fontFamily: 'var(--font-cinzel)' }}
                >
                  PARTNERS
                </motion.p>
              </motion.div>
            </Link>
            <motion.p
              className="text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-medium text-gray-300 whitespace-nowrap flex-shrink"
              style={{ fontFamily: 'var(--font-benzin)' }}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.1, color: "#ffffff" }}
            >
              Investors Intelligence
            </motion.p>
          </div>
        </motion.header>
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

