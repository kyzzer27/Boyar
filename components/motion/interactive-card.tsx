"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface InteractiveCardProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function InteractiveCard({ children, className = "" }: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsClicked(true)}
      onTap={() => setIsClicked(false)}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        boxShadow: isHovered
          ? "0 20px 40px rgba(255, 255, 255, 0.1)"
          : "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-lg border border-white/20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      {isClicked && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-white/5 pointer-events-none"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </motion.div>
  );
}





