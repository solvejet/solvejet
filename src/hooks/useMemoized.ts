// src/hooks/useMemoized.ts
import { useMemo } from 'react';

type DependencyList = readonly unknown[];

export const useMemoized = <T, D extends DependencyList>(
  callback: (...deps: D) => T,
  deps: D
): T => {
  return useMemo(() => callback(...deps), deps);
};