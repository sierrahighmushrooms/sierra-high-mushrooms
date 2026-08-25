import {useEffect, useRef, useState} from 'react';

/**
 * Returns a translateY offset (in percent) that shifts as the element
 * moves through the viewport, for a background-parallax effect.
 * Range is clamped to [-maxOffset, maxOffset].
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  maxOffset = 15,
) {
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof window === 'undefined') return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // progress: -1 when element bottom is at top of viewport,
      // +1 when element top is at bottom of viewport, 0 when centered
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const progress = (elementCenter - viewportCenter) / viewportHeight;
      const clamped = Math.max(-1, Math.min(1, progress));
      setOffset(clamped * maxOffset);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [maxOffset]);

  return {ref, offset};
}
