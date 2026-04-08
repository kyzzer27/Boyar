/** @format */

"use client";

import { useEffect, useMemo, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  dur: number;
  delay: number;
}

export function FloatingParticles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const particles = useMemo<Particle[]>(() => {
    if (!mounted) return [];
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      tx: (Math.random() - 0.5) * 30,
      ty: (Math.random() - 0.5) * 40,
      size: Math.random() * 3 + 2,
      dur: Math.random() * 12 + 14,
      delay: Math.random() * -20,
    }));
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white/10"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            willChange: "transform, opacity",
            animation: `fp-drift-${p.id} ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
      <style>{particles.map((p) => `
        @keyframes fp-drift-${p.id} {
          0%, 100% { transform: translate(0, 0); opacity: 0.08; }
          50% { transform: translate(${p.tx}vw, ${p.ty}vh); opacity: 0.25; }
        }
      `).join("")}</style>
    </div>
  );
}
