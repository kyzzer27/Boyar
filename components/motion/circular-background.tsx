"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function CircularBackground() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      
      const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      };
      
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Floating orbs with different sizes and speeds
  const orbs = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 120 + 80,
    x: Math.random() * dimensions.width,
    y: Math.random() * dimensions.height,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  // Rotating rings
  const rings = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    size: 300 + i * 200,
    duration: 20 + i * 10,
    delay: i * 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating Orbs - More Visible */}
      {orbs.map((orb) => (
        <motion.div
          key={`orb-${orb.id}`}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)`,
            border: "1px solid rgba(255, 255, 255, 0.15)",
            filter: "blur(2px)",
          }}
          animate={{
            x: [
              orb.x,
              orb.x + (Math.random() - 0.5) * 300,
              orb.x - (Math.random() - 0.5) * 300,
              orb.x,
            ],
            y: [
              orb.y,
              orb.y + (Math.random() - 0.5) * 300,
              orb.y - (Math.random() - 0.5) * 300,
              orb.y,
            ],
            scale: [1, 1.3, 0.7, 1],
            opacity: [0.4, 0.7, 0.3, 0.4],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      {/* Rotating Rings - More Visible */}
      {rings.map((ring) => (
        <motion.div
          key={`ring-${ring.id}`}
          className="absolute rounded-full border border-white/20"
          style={{
            width: ring.size,
            height: ring.size,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.15, 0.85, 1],
            opacity: [0.2, 0.4, 0.2, 0.2],
          }}
          transition={{
            duration: ring.duration,
            repeat: Infinity,
            ease: "linear",
            delay: ring.delay,
          }}
        />
      ))}

      {/* Pulsing Center Glow - More Visible */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 50%, transparent 70%)",
          filter: "blur(20px)",
        }}
        animate={{
          scale: [1, 1.5, 0.8, 1],
          opacity: [0.2, 0.4, 0.15, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated Grid Pattern - More Visible */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        style={{ zIndex: -1 }}
      >
        <defs>
          <pattern
            id="grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating Geometric Shapes - More Visible */}
      {Array.from({ length: 8 }, (_, i) => {
        const size = 50 + i * 8;
        const x = (dimensions.width / 9) * (i + 1);
        const y = dimensions.height / 2 + Math.sin(i) * 150;
        
        return (
          <motion.div
            key={`shape-${i}`}
            className="absolute"
            style={{
              width: size,
              height: size,
              left: x,
              top: y,
              border: "2px solid rgba(255, 255, 255, 0.2)",
              borderRadius: i % 2 === 0 ? "50%" : "25%",
              background: "rgba(255, 255, 255, 0.05)",
              boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
            }}
            animate={{
              y: [y, y - 80, y + 80, y],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        );
      })}

      {/* Connecting Lines Between Shapes */}
      <svg className="absolute inset-0 w-full h-full opacity-30" style={{ zIndex: -1 }}>
        {Array.from({ length: 5 }, (_, i) => {
          const x1 = (dimensions.width / 6) * (i + 1);
          const y1 = dimensions.height / 2;
          const x2 = (dimensions.width / 6) * (i + 2);
          const y2 = dimensions.height / 2;
          
          return (
            <motion.line
              key={`line-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1"
              strokeDasharray="5,5"
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

