import { useReducedMotionPreference } from "./useReducedMotionPreference";
import React from "react";
import { motion } from "motion/react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export function AnimatedSection({ children, className = "", delay = 0, direction = "up" }: AnimatedSectionProps) {
  const reducedMotion = useReducedMotionPreference();
  const initial = direction === "up" ? { opacity: 0, y: 40 } : direction === "left" ? { opacity: 0, x: -40 } : direction === "right" ? { opacity: 0, x: 40 } : { opacity: 0 };
  const animate = direction === "up" ? { opacity: 1, y: 0 } : direction === "left" ? { opacity: 1, x: 0 } : direction === "right" ? { opacity: 1, x: 0 } : { opacity: 1 };
  return (
    <motion.div initial={reducedMotion ? false : initial} whileInView={animate} viewport={{ once: true, margin: "-60px" }} transition={{ duration: reducedMotion ? 0 : .3, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className = "", staggerDelay = 0.1 }: { children: React.ReactNode; className?: string; staggerDelay?: number }) {
  const reducedMotion = useReducedMotionPreference();
  return (
    <motion.div className={className} initial={reducedMotion ? false : "hidden"} whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: reducedMotion ? 0 : Math.min(staggerDelay,.04) } } }}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reducedMotion = useReducedMotionPreference();
  return (
    <motion.div className={className} variants={{ hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : .3, ease: [0.22, 1, 0.36, 1] } } }}>
      {children}
    </motion.div>
  );
}