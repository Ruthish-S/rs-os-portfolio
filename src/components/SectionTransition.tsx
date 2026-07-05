import { motion } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * Wraps a top-level <section> so it "arrives" as the user scrolls into it —
 * a clip-path wipe combined with a subtle rise + scale, instead of sections
 * just cutting from one flat background to the next.
 */
export default function SectionTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(6% 0% 6% 0% round 0px)', opacity: 0, y: 56, scale: 0.985 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 0px)', opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </motion.div>
  );
}
