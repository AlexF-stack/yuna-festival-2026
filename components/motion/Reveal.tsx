"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import { EASE_YUNA, rise } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={rise(y)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: EASE_YUNA, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
