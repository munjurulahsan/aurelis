"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  yOffset?: number;
  duration?: number;
  delay?: number;
}

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export default function PageTransition({
  children,
  className = "",
  yOffset = 36,
  duration = 0.85,
  delay = 0.05,
}: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration,
        ease: LUXURY_EASE,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
