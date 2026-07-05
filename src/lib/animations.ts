import type { Variants } from 'framer-motion';

/**
 * Shared stagger-reveal variants used across section components.
 * `containerVariants` staggers its children's entrance;
 * `itemVariants` defines each child's individual fade/slide-up.
 * Mirrors the inline pattern used in Leadership.tsx, lifted here
 * so every section shares identical timing/easing.
 */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
