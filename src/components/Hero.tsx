import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Magnetic from './Magnetic';

/* ─── Hero ───────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  // Background drifts slower than scroll (classic parallax depth);
  // content fades/lifts out slightly faster so it clears before the next section.
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col"
    >
      {/* ── Full-screen portrait background ── */}
      <motion.img
        src={`${import.meta.env.BASE_URL}assets/ruthish-pfp.png`}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-[120%] object-cover pointer-events-none select-none"
        style={{ objectPosition: '65% 18%', y: bgY }}
        draggable={false}
      />

      {/* ── Gradient overlays for text legibility ── */}
      {/* Left-heavy horizontal: makes left side readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(8,8,8,0.92) 30%, rgba(8,8,8,0.55) 60%, rgba(8,8,8,0.08) 100%)' }}
      />
      {/* Top fade (nav area) */}
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.6) 0%, transparent 100%)' }}
      />
      {/* Bottom fade (stats area) */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.8) 0%, transparent 100%)' }}
      />



      {/* ── Corner annotations ── */}
      <div className="absolute top-6 left-6 font-mono text-[10px] text-white/30 hidden md:block z-10">11.0168° N, 76.9558° E</div>
      <div className="absolute top-6 right-6 font-mono text-[10px] text-white/30 hidden md:block z-10 text-right">PSGCT · BATCH 2022 · SEM 09</div>
      <div className="absolute bottom-[72px] right-6 font-mono text-[10px] text-white/25 hidden md:block z-10 text-right">RS.OS BUILD 2026.06</div>

      {/* ── Corner brackets ── */}
      <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-[#E85002] opacity-40 pointer-events-none z-10" />
      <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-[#E85002] opacity-40 pointer-events-none z-10" />
      <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-[#E85002] opacity-40 pointer-events-none z-10" />
      <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-[#E85002] opacity-40 pointer-events-none z-10" />

      {/* ── Status bar ── */}
      <div className="relative z-10 w-full px-6 max-w-[1400px] mx-auto pt-24 hidden md:flex items-center justify-between font-mono text-[10px] tracking-wider">
        <div className="flex items-center gap-2 text-white/60">
          <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
          SYSTEM ONLINE |
        </div>
        <div className="text-white/30">ENGINEER PROFILE LOADED | RS.OS v23.0</div>
      </div>

      {/* ── Main text content ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto px-6 xl:px-14 flex flex-col justify-center py-16 md:py-0"
      >

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          className="font-display font-extrabold leading-[0.82] tracking-[-0.04em] text-white -ml-1 whitespace-nowrap"
          style={{ fontSize: 'clamp(40px, 9.2vw, 150px)' }}
        >
          RUTHISH S<span className="text-[#E85002]">.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 mb-6"
        >
          <span className="inline-block bg-[#E85002] text-white px-4 py-2 font-mono text-xs tracking-widest uppercase">
            Production Engineer · IIoT · CAD/CAM
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-md text-white/65 text-base md:text-lg font-medium leading-relaxed"
        >
          B.E. Production Engineering (Sandwich), PSG College of Technology.
          Interning at Tata Consumer Products. Building at the intersection of
          intelligent manufacturing, automation, and systems design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Magnetic strength={14}>
            <a
              href="#projects"
              className="block bg-[#E85002] hover:bg-[#C44000] text-white px-6 py-3 font-mono text-sm tracking-wider uppercase transition-colors"
            >
              View Projects →
            </a>
          </Magnetic>
          <Magnetic strength={14}>
            <a
              href="#contact"
              className="block border border-white/30 text-white hover:border-white hover:bg-white/10 px-6 py-3 font-mono text-sm tracking-wider uppercase transition-colors backdrop-blur-sm"
            >
              contactruthish@gmail.com
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* ── Bottom stats strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-md"
      >
        <div className="max-w-[1400px] mx-auto px-6 xl:px-14 grid grid-cols-3 divide-x divide-white/10 font-mono">
          {[
            ['8.50', 'CGPA / 10.0'],
            ['10', 'PROJECTS'],
            ['4+', 'INTERNSHIPS'],
          ].map(([val, lbl]) => (
            <div key={lbl} className="flex flex-col sm:flex-row sm:items-center sm:gap-4 py-4 px-4 sm:px-6">
              <span className="text-2xl sm:text-3xl font-light text-[#E85002] tracking-tighter">{val}</span>
              <span className="text-[9px] text-white/40 tracking-widest sm:mt-0 mt-0.5">{lbl}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-[72px] left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-10">
        <span className="font-mono text-[9px] text-white/30 tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#E85002]/60 to-transparent" />
      </div>
    </section>
  );
}
