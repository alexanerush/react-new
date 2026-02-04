import React, { createContext, useContext, useMemo, useState } from "react";

import en from "./en.json";
import ru from "./ru.json";
import lt from "./lt.json";

export type Lang = "en" | "ru" | "lt";

type Dictionary = Record<string, string>;

const DICTS: Record<Lang, Dictionary> = {
  en: en,
  ru: ru,
  lt: lt,
};

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const STORAGE_KEY = "app_lang";

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ru" || saved === "lt") return saved;
    return "en";
  });

  const setLang = (next: Lang) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const t = (key: string): string => {
    const dict = DICTS[lang];
    return dict[key] ?? key;
  };

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
