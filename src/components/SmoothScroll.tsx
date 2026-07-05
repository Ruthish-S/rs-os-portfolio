import { useEffect } from 'react';
import Lenis from 'lenis';
import { registerLenis } from '../lib/scrollBridge';

/**
 * Initializes Lenis smooth scrolling for the whole page. Mounted once near
 * the root — has no visual output, just drives the scroll physics.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // easeOutCubic — smooth, not floaty
      smoothWheel: true,
      touchMultiplier: 1.1,
      anchors: true,
    });
    registerLenis(lenis);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
