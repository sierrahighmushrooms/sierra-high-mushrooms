import {useEffect, useRef, useState} from 'react';

/**
 * Tracks whether an element has scrolled into the viewport, using
 * IntersectionObserver. Fires once and stays true (reveal animations
 * shouldn't reverse when scrolling back up).
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = {threshold: 0.15},
) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof window === 'undefined') return;

    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(element);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {ref, isInView};
}
