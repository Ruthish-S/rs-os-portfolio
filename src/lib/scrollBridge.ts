import type Lenis from 'lenis';

let activeLenis: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  activeLenis = instance;
}

/** Smoothly scrolls to a Y position, routing through Lenis if it's mounted so it stays in sync with inertial scroll state. Falls back to native smooth scroll otherwise. */
export function smoothScrollTo(y: number, opts?: { duration?: number }) {
  if (activeLenis) {
    activeLenis.scrollTo(y, { duration: opts?.duration ?? 1.1 });
  } else {
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}
