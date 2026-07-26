"use client";

import { useSyncExternalStore } from "react";

import {
  getScrollProgress,
  subscribeScrollProgress,
} from "@/lib/scroll-progress";

export function useScrollProgress(): number {
  return useSyncExternalStore(
    subscribeScrollProgress,
    getScrollProgress,
    () => 0,
  );
}
