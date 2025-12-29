"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { memo } from "react";

function CircularBackgroundComponent() {
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

  // Memoize orbs to prevent recalculation on every render - Full 8 orbs with optimized calculations
  const orbs = useMemo(() => {
    const basePositions = [
      { x: 0.2, y: 0.3 },
      { x: 0.8, y: 0.2 },
      { x: 0.3, y: 0.7 },
      { x: 0.7, y: 0.8 },
      { x: 0.15, y: 0.5 },
      { x: 0.85, y: 0.5 },
      { x: 0.5, y: 0.15 },
      { x: 0.5, y: 0.85 },
    ];
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 120 + 80,
      x: basePositions[i].x * dimensions.width,
      y: basePositions[i].y * dimensions.height,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      moveX: (Math.random() - 0.5) * 300,
      moveY: (Math.random() - 0.5) * 300,
    }));
  }, [dimensions.width, dimensions.height]);

  // Memoize rings - Full 3 rings
  const rings = useMemo(() => Array.from({ length: 3 }, (_, i) => ({
    id: i,
    size: 300 + i * 200,
    duration: 20 + i * 10,
    delay: i * 2,
  })), []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
      style={{ 
        willChange: 'transform',
        contain: 'layout style paint',
        isolation: 'isolate',
      }}
    >
      {/* Floating Orbs - Full animation with GPU acceleration */}
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
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            perspective: 1000,
          }}
          animate={{
            x: [
              orb.x,
              orb.x + orb.moveX,
              orb.x - orb.moveX,
              orb.x,
            ],
            y: [
              orb.y,
              orb.y + orb.moveY,
              orb.y - orb.moveY,
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

      {/* Rotating Rings - Full animation with GPU acceleration */}
      {rings.map((ring) => (
        <motion.div
          key={`ring-${ring.id}`}
          className="absolute rounded-full border border-white/20"
          style={{
            width: ring.size,
            height: ring.size,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%) translateZ(0)",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
            willChange: 'transform',
            backfaceVisibility: 'hidden',
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

      {/* Pulsing Center Glow - Full effect with GPU acceleration */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%) translateZ(0)",
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 50%, transparent 70%)",
          filter: "blur(20px)",
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
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

      {/* Floating Geometric Shapes - Full 8 shapes with GPU acceleration */}
      {useMemo(() => Array.from({ length: 8 }, (_, i) => {
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
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
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
      }), [dimensions.width, dimensions.height])}

      {/* Connecting Lines Between Shapes - Full animation */}
      <svg className="absolute inset-0 w-full h-full opacity-30" style={{ zIndex: -1, willChange: 'contents' }}>
        {useMemo(() => Array.from({ length: 5 }, (_, i) => {
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
              style={{ willChange: 'stroke-dashoffset, opacity' }}
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
        }), [dimensions.width, dimensions.height])}
      </svg>

    </div>
  );
}

export const CircularBackground = memo(CircularBackgroundComponent);

