import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/**
 * Thin connective transition between major sections — a glowing accent
 * line that draws in from center on scroll, plus a small mono readout.
 * Gives page flow a sense of continuity instead of hard section cuts,
 * matching the "MODULE /0X" labeling convention used in section headers.
 * `tone="light" | "dark"` matches it to whichever background it sits on.
 */
export default function SectionDivider({
  label,
  from,
  to,
  textOn = 'light',
}: {
  label: string;
  /** Background color of the section above (top of the gradient bridge). */
  from: string;
  /** Background color of the section below (bottom of the gradient bridge). */
  to: string;
  /** Which flanking section the readout text should be legible against. */
  textOn?: 'light' | 'dark';
}) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.4 });
  const lineColor = 'rgba(232,80,2,0.5)';

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative w-full h-14 md:h-20 flex items-center justify-center overflow-hidden"
      style={{ background: `linear-gradient(to bottom, ${from}, ${to})` }}
      aria-hidden="true"
    >
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isVisible ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 right-0 h-px origin-center"
        style={{ background: `linear-gradient(90deg, transparent, ${lineColor} 25%, #E85002 50%, ${lineColor} 75%, transparent)` }}
      />
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className={`relative px-4 font-mono text-[9px] tracking-[0.3em] uppercase ${textOn === 'dark' ? 'text-[#A0A09C]' : 'text-[#8A8A86]'}`}
      >
        {label}
      </motion.div>
    </div>
  );
}
