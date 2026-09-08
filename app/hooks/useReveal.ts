import {useEffect, useRef, useState} from 'react';

/**
 * `'static'`  — server-rendered / no-JS / reduced-motion: element is visible, no animation.
 * `'hidden'`  — JS enhancement has armed the entrance animation (element is below the fold).
 * `'visible'` — element has scrolled into view; play the entrance transition.
 */
export type RevealState = 'static' | 'hidden' | 'visible';

/**
 * Progressive-enhancement reveal.
 *
 * SSR and the first client render return `'static'`, so server-rendered content
 * (including the LCP hero heading) paints immediately and survives with JS off.
 * After hydration, elements that are already on screen stay `'static'` (no
 * entrance animation, no flash); only elements still below the fold get hidden
 * and then animated in when scrolled to. Uses opacity/transform only, so there
 * is no layout shift.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState<RevealState>('static');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window === 'undefined' ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return; // no enhancement — leave content visible
    }

    const rect = el.getBoundingClientRect();
    const alreadyOnScreen = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyOnScreen) return; // above/at the fold — no entrance animation

    setState('hidden');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('visible');
          observer.disconnect();
        }
      },
      {threshold: 0.15},
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return {ref, state};
}
