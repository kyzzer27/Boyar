"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FloatingParticles } from "@/components/motion/floating-particles";

export type UserRole = "investor" | "team";

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
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <Link href="/" className="flex items-center gap-2 sm:gap-4 group">
              <motion.div
                className="relative h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 flex-shrink-0 lg:h-24 lg:w-24"
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
              <motion.p
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal text-white uppercase"
                style={{ fontFamily: 'var(--font-cinzel)' }}
                whileHover={{ scale: 1.05, letterSpacing: "0.1em" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                BOYAR PARTNERS
              </motion.p>
            </Link>
            <motion.p
              className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-gray-300 hidden sm:block"
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

