"use client";

import { useSyncExternalStore } from "react";
import { THEME_KEY } from "@/lib/theme";
import { Icon } from "./icon";

type Theme = "light" | "dark";

function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

/** Light/dark switch. Light is the default; the visitor's choice is remembered and applied before paint by the root layout script. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "light");

  function toggle() {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
  }

  const label = theme === "light" ? "Switch to dark theme" : "Switch to light theme";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`grid size-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-mint hover:text-mint-soft ${className}`}
    >
      <Icon name={theme === "light" ? "moon" : "sun"} className="size-5" />
    </button>
  );
}
