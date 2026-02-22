"use client";

import { type ReactNode, useEffect } from "react";
import { useProgressStore } from "@/stores/progressStore";

interface ProgressProviderProps {
  children: ReactNode;
}

export function ProgressProvider({ children }: ProgressProviderProps) {
  const hydrate = useProgressStore((state) => state.hydrate);

  useEffect(() => {
    // Hydrate progress state from localStorage on mount
    hydrate();
  }, [hydrate]);

  return <>{children}</>;
}
