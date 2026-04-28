import React from "react";
import { useTheme, type ThemeMode } from "../theme/ThemeContext";

const modes: { key: ThemeMode; label: string }[] = [
  { key: "system", label: "System" },
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" },
];

const ThemeSwitcher: React.FC = () => {
  const { mode, setMode } = useTheme();

  return (
    <div className="theme-switcher" role="group" aria-label="Theme switcher">
      {modes.map((m) => {
        const active = mode === m.key;

        return (
          <button
            key={m.key}
            type="button"
            className={`theme-btn ${active ? "active" : ""}`}
            aria-pressed={active}
            onClick={() => setMode(m.key)}
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
};

export default ThemeSwitcher;
