"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TrajectoryView } from "./trajectory-view";

interface TrajectoryMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TrajectoryMapModal({
  isOpen,
  onClose,
}: TrajectoryMapModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            className="fixed inset-0 z-[121] flex flex-col"
            initial={{ opacity: 0, y: "4%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "4%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            <TrajectoryView onClose={onClose} closeLabel="Close" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
