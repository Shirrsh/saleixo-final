interface DocumentWithViewTransition extends Document {
  startViewTransition?: (callback: () => void | Promise<void>) => {
    finished: Promise<void>;
  };
}

/**
 * Smoothly toggles theme between 'light' and 'dark' using the View Transitions API
 * (when supported) or CSS interpolation fallback.
 */
export function toggleThemeWithTransition(onToggle?: (isDark: boolean) => void) {
  if (typeof document === 'undefined') return;

  const html = document.documentElement;
  const wasDark = html.classList.contains('dark');
  const nextIsDark = !wasDark;
  const nextTheme = nextIsDark ? 'dark' : 'light';

  const applyDomChanges = () => {
    html.classList.toggle('dark', nextIsDark);
    html.classList.toggle('light', !nextIsDark);
    localStorage.setItem('theme', nextTheme);
    onToggle?.(nextIsDark);
    window.dispatchEvent(
      new CustomEvent('saleixo-theme-changed', {
        detail: { theme: nextTheme, isDark: nextIsDark },
      })
    );
  };

  // 1. If View Transitions API is supported and reduced motion is not requested
  const doc = document as DocumentWithViewTransition;
  if (
    typeof doc.startViewTransition === 'function' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    try {
      doc.startViewTransition(() => {
        applyDomChanges();
      });
      return;
    } catch {
      // Fallback if startViewTransition throws
    }
  }

  // 2. Fallback: temporary CSS transition class for older browsers
  html.classList.add('theme-transitioning');
  applyDomChanges();
  setTimeout(() => {
    html.classList.remove('theme-transitioning');
  }, 400);
}
