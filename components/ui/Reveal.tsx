"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import {
  EASE_PREMIUM,
  cardRise,
  openReveal,
  rise,
  slideFromLeft,
  slideFromRight,
  staggerContainer,
  staggerFast,
} from "@/lib/motion";

type RevealVariant = "rise" | "card" | "open" | "left" | "right";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** rise = titres ; card = grilles ; open = médias ; left/right = colonnes */
  variant?: RevealVariant;
  as?: "div" | "li" | "article";
};

function variantsFor(variant: RevealVariant, y: number) {
  if (variant === "open") return openReveal;
  if (variant === "card") return cardRise;
  if (variant === "left") return slideFromLeft;
  if (variant === "right") return slideFromRight;
  return rise(y);
}

/**
 * Entrées scroll unifiées — sans filter:blur (coûteux) ni scale zoom.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
  variant = "rise",
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants = variantsFor(variant, y);
  const duration = variant === "open" ? 0.85 : 0.7;

  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.22, margin: "0px 0px -48px 0px" }}
      variants={variants}
      transition={{ duration, ease: EASE_PREMIUM, delay }}
      className={className}
    >
      {children}
    </Comp>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  fast?: boolean;
  as?: "div" | "ul";
};

/** Conteneur stagger — enfants = RevealItem ou motion avec variants cardRise. */
export function RevealGroup({
  children,
  className = "",
  fast = false,
  as = "div",
}: RevealGroupProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Comp
      className={className}
      variants={fast ? staggerFast : staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -40px 0px" }}
    >
      {children}
    </Comp>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  variant?: "rise" | "card";
  as?: "div" | "li" | "article";
};

export function RevealItem({
  children,
  className = "",
  variant = "card",
  as = "div",
}: RevealItemProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Comp
      variants={variant === "rise" ? rise(22) : cardRise}
      transition={{ duration: 0.65, ease: EASE_PREMIUM }}
      className={className}
    >
      {children}
    </Comp>
  );
}
