import React, { useEffect, useRef, useState } from "react";
import { useLang, type Lang } from "../i18n/LanguageContext";

const LABELS: Record<Lang, string> = {
  en: "EN",
  ru: "RU",
  lt: "LT",
};

const OPTIONS: Lang[] = ["en", "ru", "lt"];

const LanguageDropdown: React.FC = () => {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (e.target instanceof Node && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleSelect = (l: Lang) => {
    setLang(l);
    setOpen(false);
  };

  return (
    <div className="lang" ref={wrapRef}>
      <button
        type="button"
        className="lang-btn"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {LABELS[lang]}
      </button>

      {open && (
        <ul className="lang-menu" role="listbox" aria-label="Select language">
          {OPTIONS.map((l) => (
            <li key={l}>
              <button
                type="button"
                className={`lang-item ${l === lang ? "active" : ""}`}
                onClick={() => handleSelect(l)}
                role="option"
                aria-selected={l === lang}
              >
                {LABELS[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageDropdown;
