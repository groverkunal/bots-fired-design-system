import React from "react";
import { motion } from "motion/react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export function AnimatedSection({ children, className = "", delay = 0, direction = "up" }: AnimatedSectionProps) {
  const initial = direction === "up" ? { opacity: 0, y: 40 } : direction === "left" ? { opacity: 0, x: -40 } : direction === "right" ? { opacity: 0, x: 40 } : { opacity: 0 };
  const animate = direction === "up" ? { opacity: 1, y: 0 } : direction === "left" ? { opacity: 1, x: 0 } : direction === "right" ? { opacity: 1, x: 0 } : { opacity: 1 };
  return (
    <motion.div initial={initial} whileInView={animate} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className = "", staggerDelay = 0.1 }: { children: React.ReactNode; className?: string; staggerDelay?: number }) {
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: staggerDelay } } }}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={{ hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }}>
      {children}
    </motion.div>
  );
}