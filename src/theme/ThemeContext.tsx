import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type ThemeMode = "system" | "light" | "dark";

type ThemeContextValue = {
  mode: ThemeMode;
  resolvedMode: "light" | "dark";
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
};

const STORAGE_KEY = "theme_mode";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemMode(): "light" | "dark" {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyThemeToHtml(resolved: "light" | "dark") {
  const root = document.documentElement;
  root.dataset.theme = resolved; 
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark" || saved === "system") return saved;
    return "system";
  });

  const [resolvedMode, setResolvedMode] = useState<"light" | "dark">(() => {
    return mode === "system" ? getSystemMode() : mode;
  });

  useEffect(() => {
    const resolved = mode === "system" ? getSystemMode() : mode;
    setResolvedMode(resolved);
    applyThemeToHtml(resolved);
  }, [mode]);

  useEffect(() => {
    if (mode !== "system") return;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const resolved = getSystemMode();
      setResolvedMode(resolved);
      applyThemeToHtml(resolved);
    };

    handler();

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    }

    mql.addListener(handler);
    return () => mql.removeListener(handler);
  }, [mode]);

  const setMode = (next: ThemeMode) => {
    setModeState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const toggle = () => {
    const next: ThemeMode = resolvedMode === "dark" ? "light" : "dark";
    setMode(next);
  };

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, resolvedMode, setMode, toggle }),
    [mode, resolvedMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
