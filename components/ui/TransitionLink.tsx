"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type ComponentProps,
  type MouseEvent,
  useTransition,
} from "react";

type TransitionLinkProps = ComponentProps<typeof Link>;

/**
 * Lien avec View Transitions API quand disponible — progressive enhancement.
 */
export function TransitionLink({
  href,
  onClick,
  children,
  ...rest
}: TransitionLinkProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (
      typeof href !== "string" ||
      href.startsWith("#") ||
      href.includes("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("http")
    ) {
      return;
    }
    if (typeof document === "undefined" || !("startViewTransition" in document)) {
      return;
    }

    event.preventDefault();
    const go = () => {
      startTransition(() => {
        router.push(href);
      });
    };

    document.startViewTransition(go);
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
