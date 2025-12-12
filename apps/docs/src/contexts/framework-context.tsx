"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  startTransition,
  type ReactNode,
} from "react";

export type Framework = "react" | "solid" | "vue" | "svelte";

const STORAGE_KEY = "ocean-ui-framework";
const DEFAULT_FRAMEWORK: Framework = "react";

function getStoredFramework(): Framework {
  if (typeof window === "undefined") {
    return DEFAULT_FRAMEWORK;
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  if (
    stored &&
    (stored === "react" ||
      stored === "solid" ||
      stored === "vue" ||
      stored === "svelte")
  ) {
    return stored as Framework;
  }
  return DEFAULT_FRAMEWORK;
}

interface FrameworkContextValue {
  framework: Framework;
  setFramework: (value: Framework) => void;
}

const FrameworkContext = createContext<FrameworkContextValue | undefined>(
  undefined
);

export function FrameworkProvider({ children }: { children: ReactNode }) {
  // Always start with DEFAULT_FRAMEWORK to match SSR
  // This ensures first client render matches server render
  const [framework, setFrameworkState] = useState<Framework>(DEFAULT_FRAMEWORK);

  // Update from localStorage after mount (client-only)
  // This runs after hydration, preventing mismatch
  useEffect(() => {
    const stored = getStoredFramework();
    if (stored !== DEFAULT_FRAMEWORK) {
      // This is intentional - syncing state from localStorage (external system)
      // after mount to prevent hydration mismatch
      // Using startTransition to mark this as non-urgent update
      startTransition(() => {
        setFrameworkState(stored);
      });
    }
  }, []);

  const setFramework = (value: Framework) => {
    setFrameworkState(value);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, value);
    }
  };

  return (
    <FrameworkContext.Provider value={{ framework, setFramework }}>
      {children}
    </FrameworkContext.Provider>
  );
}

export function useFramework() {
  const context = useContext(FrameworkContext);
  if (context === undefined) {
    throw new Error("useFramework must be used within FrameworkProvider");
  }
  return context;
}
