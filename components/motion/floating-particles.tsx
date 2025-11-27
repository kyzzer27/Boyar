"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function FloatingParticles() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const particles = Array.from({ length: 20 }, (_, i) => i);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => {
        const randomX = Math.random() * dimensions.width;
        const randomY = Math.random() * dimensions.height;
        const randomSize = Math.random() * 4 + 2;
        const randomDuration = Math.random() * 10 + 10;

        return (
          <motion.div
            key={particle}
            className="absolute rounded-full bg-white/10"
            initial={{
              x: randomX,
              y: randomY,
              scale: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              y: [randomY, Math.random() * dimensions.height, randomY],
              x: [randomX, Math.random() * dimensions.width, randomX],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: randomDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: randomSize,
              height: randomSize,
            }}
          />
        );
      })}
    </div>
  );
}

