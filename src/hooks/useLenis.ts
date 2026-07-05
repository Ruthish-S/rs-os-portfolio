import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Wires up Lenis for buttery, inertia-based smooth scrolling site-wide.
 * Replaces native `scroll-behavior: smooth` (which only affects anchor
 * jumps) with a driven scroll loop so every wheel/touch scroll — and every
 * scrollIntoView / scrollTo call already in the app (Nav links, Footer's
 * back-to-top) — gets the same weighted, decelerating feel.
 *
 * Runs only after `active` is true (i.e. once the boot Loader has finished),
 * so the intro animation isn't fighting a half-initialized scroll container.
 */
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Scrolls to the top (or any target) through Lenis if it's booted, else falls back to native smooth scroll. */
export function lenisScrollTo(target: number | string | HTMLElement = 0, opts?: { offset?: number; duration?: number }) {
  if (window.__lenis) {
    window.__lenis.scrollTo(target, { offset: opts?.offset ?? 0, duration: opts?.duration ?? 1.2 });
  } else {
    window.scrollTo({ top: typeof target === 'number' ? target : 0, behavior: 'smooth' });
  }
}

export function useLenis(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    window.__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Let any in-page anchor (Nav, Footer back-to-top, SectionDots) route
    // through Lenis instead of the native jump, without having to touch
    // every click handler individually.
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!target) return;
      const id = target.getAttribute('href')?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -72, duration: 1.2 });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (window.__lenis === lenis) window.__lenis = undefined;
    };
  }, [active]);
}
