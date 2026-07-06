import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_MS = 2800; // total loading duration before exit

const STATUS_LABELS: [number, string][] = [
  [0,  'IDENTITY_VERIFY.......'],
  [18, 'ACADEMIC_RECORD........'],
  [36, 'PROJECT_DATABASE.......'],
  [52, 'SKILL_MATRIX...........'],
  [66, 'EXPERIENCE_LOG.........'],
  [80, 'CERT_VAULT.............'],
  [94, '■ SYSTEM READY'],
];

const getStatus = (pct: number) => {
  let label = STATUS_LABELS[0][1];
  for (const [threshold, text] of STATUS_LABELS) {
    if (pct >= threshold) label = text;
  }
  return label;
};

/* ─── Hexagon SVG ─────────────────────────────────────────── */
const Hex = ({ size = 18, filled = false }: { size?: number; filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
    <polygon
      points="10,1 18.5,5.5 18.5,14.5 10,19 1.5,14.5 1.5,5.5"
      fill={filled ? 'rgba(232,80,2,0.25)' : 'none'}
      stroke={filled ? '#E85002' : '#2a2a2a'}
      strokeWidth="1.5"
    />
  </svg>
);

/* ─── Loader ──────────────────────────────────────────────── */
export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible]   = useState(true);

  useEffect(() => {
    let cancelled = false;
    let raf: number;
    const startTime = Date.now();

    const tick = () => {
      if (cancelled) return;
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / BOOT_MS) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => { if (!cancelled) setVisible(false); }, 420);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => { cancelled = true; cancelAnimationFrame(raf); };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4 sm:p-6 select-none overflow-hidden"
          exit={{ opacity: 0, scale: 1.03, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } }}
        >
          {/* Subtle dot-grid background */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* ── ID CARD ── */}
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
            className="w-full max-w-[640px] border border-[#252525] bg-[#070707] font-mono overflow-hidden"
          >

            {/* ── TOP HEADER ── */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e]">
              <div className="flex items-center gap-3">
                {/* Brand */}
                <span className="font-display font-extrabold text-[18px] tracking-[-0.04em] text-white">
                  RS<span className="text-[#E85002]">.</span>OS
                </span>
                <div className="h-3.5 w-px bg-[#252525]" />
                <span className="text-[8px] text-[#303030] tracking-[0.2em] uppercase">
                  Personnel System V13
                </span>
              </div>
              {/* Three hexagons — reference signature */}
              <div className="flex gap-1.5">
                <Hex filled />
                <Hex />
                <Hex />
              </div>
            </div>

            {/* ── MAIN BODY ── */}
            <div className="flex border-b border-[#1e1e1e]">

              {/* Left: portrait with scan-line reveal */}
              <div
                className="relative shrink-0 border-r border-[#1e1e1e] overflow-hidden hidden sm:block"
                style={{ width: 158, minHeight: 256 }}
              >
                {/* Corner brackets */}
                {[
                  'top-1.5 left-1.5 border-t border-l',
                  'top-1.5 right-1.5 border-t border-r',
                  'bottom-1.5 left-1.5 border-b border-l',
                  'bottom-1.5 right-1.5 border-b border-r',
                ].map((cls) => (
                  <div key={cls} className={`absolute w-3 h-3 border-[#E85002] opacity-50 z-20 ${cls}`} />
                ))}

                {/* Photo — reveals top-to-bottom */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ clipPath: 'inset(0 0 100% 0)' }}
                  animate={{ clipPath: 'inset(0 0 0% 0)' }}
                  transition={{ duration: 1.1, delay: 0.35, ease: 'linear' }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}assets/ruthish-pfp.png`}
                    alt="Ruthish S"
                    className="w-full h-full object-cover object-top"
                    draggable={false}
                  />
                </motion.div>

                {/* Scan line */}
                <motion.div
                  className="absolute left-0 right-0 h-[1px] bg-[#E85002] opacity-80 z-10"
                  initial={{ top: '0%' }}
                  animate={{ top: '105%' }}
                  transition={{ duration: 1.1, delay: 0.35, ease: 'linear' }}
                />

                {/* Watermark */}
                <div className="absolute bottom-2 left-0 right-0 text-center text-[7px] text-[#252525] z-20 tracking-widest">
                  BIOMETRIC · VERIFIED
                </div>
              </div>

              {/* Right: data fields */}
              <div className="flex-1 px-5 py-4 flex flex-col gap-3.5">

                {/* Name + role */}
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <div className="text-white text-[15px] font-bold tracking-[0.12em] mb-2">
                    RUTHISH, S.
                  </div>
                  <div className="inline-block bg-[#E85002] text-white text-[8px] font-bold tracking-[0.18em] px-2 py-0.5 uppercase">
                    Production Engineer
                  </div>
                  <div className="mt-1.5 text-[#2e2e2e] text-[8px] tracking-[0.15em]">
                    CMDR.PSGCT.PE.2022
                  </div>
                </motion.div>

                {/* Schedule rows */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.35 }}
                  className="border-t border-[#181818] pt-2.5 space-y-1.5"
                >
                  <div className="flex items-center text-[9px]">
                    <span className="text-[#2e2e2e] w-28 shrink-0">ENROLL START:</span>
                    <span className="text-[#666]">01.08.2022</span>
                    <span className="ml-auto text-[#2e2e2e]">HA: 11.0168°N</span>
                  </div>
                  <div className="flex items-center text-[9px]">
                    <span className="text-[#2e2e2e] w-28 shrink-0">GRAD TARGET:</span>
                    <span className="text-[#666]">MAY.2027</span>
                    <span className="ml-auto text-[#2e2e2e]">HI: 76.9558°E</span>
                  </div>
                </motion.div>

                {/* Hex cluster + stats numbers */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85, duration: 0.35 }}
                  className="border-t border-[#181818] pt-2.5"
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    {/* Mini hex cluster */}
                    <div className="grid grid-cols-3 gap-0.5">
                      {[true, true, false, true, true, true].map((f, i) => (
                        <Hex key={i} size={13} filled={f} />
                      ))}
                    </div>
                    {/* Stats */}
                    <div className="text-white text-xl font-light tracking-[0.18em] ml-1">
                      8.50 &nbsp;07 &nbsp;25 &nbsp;4+
                    </div>
                  </div>
                  <div className="text-[#2a2a2a] text-[8px] tracking-[0.08em]">
                    contactruthish@gmail.com
                  </div>
                </motion.div>

                {/* Code columns */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.35 }}
                  className="border-t border-[#181818] pt-2.5 grid grid-cols-2 gap-x-4 text-[8px]"
                >
                  <div className="space-y-[3px] text-[#383838]">
                    <div>&gt;RUTHISH.S</div>
                    <div>&gt;PROD.ENG.</div>
                    <div>&gt;CGPA.8.50</div>
                    <div>&gt;PSGCT.CBE</div>
                  </div>
                  <div className="space-y-[3px]">
                    <div className="text-[#E85002]">NV4RID: (RS.2026.PE)</div>
                    <div className="text-[#383838]">&gt;IIoT.AUTOMATION</div>
                    <div className="text-[#383838]">&gt;CAD.CAM.LEAN</div>
                    <div className="text-[#383838]">&gt;TN.INDIA</div>
                  </div>
                </motion.div>

              </div>
            </div>

            {/* ── BOTTOM PROGRESS BAR ── */}
            <div className="px-5 py-3 flex items-center gap-3">
              {/* Left label */}
              <div className="text-[8px] text-[#2e2e2e] tracking-widest shrink-0 w-[80px] text-center leading-tight">
                PSG TECH<br />COIMBATORE
              </div>

              {/* Progress section */}
              <div className="flex-1 min-w-0">
                {/* Tick labels */}
                <div className="flex justify-between mb-0.5">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                    <span key={n} className="text-[7px] text-[#252525]">{n}</span>
                  ))}
                </div>
                {/* Bar */}
                <div className="h-[3px] bg-[#181818] relative overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-[#E85002] transition-none"
                    style={{ width: `${progress}%` }}
                  />
                  {/* Moving shimmer */}
                  <motion.div
                    className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['0%', '2000%'] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
                {/* Status text */}
                <div className="mt-1 text-[7px] text-[#2e2e2e] tracking-[0.12em] truncate">
                  {getStatus(progress)}
                </div>
              </div>

              {/* Right label */}
              <div className="text-[8px] text-[#2e2e2e] tracking-widest shrink-0 w-[80px] text-center leading-tight">
                HAN-IV<br />RS.OS V13.0
              </div>
            </div>

          </motion.div>

          {/* Outer corner bracket decorations */}
          {[
            'top-6 left-6 border-t border-l',
            'top-6 right-6 border-t border-r',
            'bottom-6 left-6 border-b border-l',
            'bottom-6 right-6 border-b border-r',
          ].map(cls => (
            <div key={cls} className={`absolute w-5 h-5 border-[#252525] ${cls}`} />
          ))}

        </motion.div>
      )}
    </AnimatePresence>
  );
}
