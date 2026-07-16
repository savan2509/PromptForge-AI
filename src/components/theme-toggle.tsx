"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);

  // If the user hasn't made an explicit choice, keep following the OS theme
  // live (e.g. the system switching to dark mode at sunset).
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = (e: MediaQueryListEvent) => {
    if (localStorage.getItem(THEME_STORAGE_KEY)) return;
    document.documentElement.classList.toggle("dark", e.matches);
    notify();
  };
  media.addEventListener("change", onSystemChange);

  return () => {
    listeners.delete(callback);
    media.removeEventListener("change", onSystemChange);
  };
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

// Matches the server-rendered markup (theme-init runs before hydration, so
// the real value is picked up correctly on the very next client render).
function getServerSnapshot() {
  return false;
}

function toggleTheme() {
  const next = !document.documentElement.classList.contains("dark");
  document.documentElement.classList.toggle("dark", next);
  localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
  notify();
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-black/10 dark:border-white/20"
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
