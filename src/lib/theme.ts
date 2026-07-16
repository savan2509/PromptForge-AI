export const THEME_STORAGE_KEY = "theme";

// Runs before hydration (see layout.tsx) so the correct theme class is
// already on <html> for the very first paint — no light-mode flash before
// switching to dark. Keep this in sync with theme-toggle.tsx's own logic.
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var isDark = stored === 'dark' || (stored !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
  } catch (e) {}
})();
`;
