"use client";

import { AppShell } from "@/components/layout/app-shell";
import { motion } from "framer-motion";
import { useState } from "react";
import { LoginModal } from "@/components/auth/login-modal";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 md:gap-16 px-4">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium text-white mb-2 md:mb-4"
            style={{ fontFamily: 'var(--font-benzin)' }}
          >
            Welcome to Dashboard
          </h1>
          <p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white/80"
            style={{ fontFamily: 'var(--font-benzin)' }}
          >
            Know about your Investment
          </p>
        </motion.div>

        {/* Get In Circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: 0.3 
          }}
        >
          <motion.div
            onClick={() => setIsLoginOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-white/30 bg-white/5 backdrop-blur-sm flex items-center justify-center cursor-pointer group hover:border-white/50 hover:bg-white/10 transition-all duration-300 shadow-2xl"
          >
            <motion.div
              className="text-center flex flex-col items-center gap-2"
              animate={{ 
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <h2
                className="text-lg sm:text-xl md:text-2xl font-medium text-white"
                style={{ fontFamily: 'var(--font-benzin)' }}
              >
                Get in
              </h2>
              <motion.span
                className="text-xl sm:text-2xl"
                animate={{ 
                  x: [0, 5, 0],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                →
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Login Modal */}
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </div>
    </AppShell>
    );
  }
