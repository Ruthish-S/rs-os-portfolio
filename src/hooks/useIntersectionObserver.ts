import { useEffect, useRef, useState } from 'react';

interface ObserverOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Returns a [ref, isVisible] tuple. Attach `ref` to any element;
 * `isVisible` flips to true once that element crosses the given
 * intersection threshold, and (by default) stays true thereafter —
 * which is what every section in this app wants for one-shot reveal
 * animations driven by framer-motion's `animate={isVisible ? "visible" : "hidden"}`.
 */
export function useIntersectionObserver(
  options: ObserverOptions = {}
): [React.RefObject<HTMLElement | null>, boolean] {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options;
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If IntersectionObserver isn't available (very old browsers), just show content.
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
}
