// src/hooks/useSafeEffect.ts
import { useEffect } from "react";

export function useSafeEffect(
  effect: () => void | (() => void),
  deps: any[],
  enabled: boolean
) {
  useEffect(() => {
    if (!enabled) return;
    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, enabled]);
}
