import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { containerVariants, itemVariants } from '../lib/animations';

/* ─── Radial CGPA gauge ──────────────────────────────────── */
const CgpaGauge = ({ value, max = 10, isVisible }: { value: number; max?: number; isVisible: boolean }) => {
  const R = 54;
  const C = 2 * Math.PI * R;
  const pct = value / max;

  return (
    <div className="relative w-[132px] h-[132px] shrink-0">
      <svg viewBox="0 0 128 128" className="w-full h-full -rotate-90">
        <circle cx="64" cy="64" r={R} fill="none" stroke="#DEDEDA" strokeWidth="6" />
        <motion.circle
          cx="64" cy="64" r={R} fill="none"
          stroke="#E85002" strokeWidth="6" strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: isVisible ? C * (1 - pct) : C }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-bold text-[#0A0A0A] tabular-nums">{value.toFixed(2)}</span>
        <span className="font-mono text-[9px] tracking-widest text-[#A0A09C] mt-0.5">CGPA / {max.toFixed(1)}</span>
      </div>
    </div>
  );
};

/* ─── Semester progress track ───────────────────────────── */
const SemesterTrack = ({ current, total, isVisible }: { current: number; total: number; isVisible: boolean }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] text-[#A0A09C] uppercase tracking-widest">Programme Progress</span>
        <span className="font-mono text-[10px] text-[#E85002] tracking-widest">SEM {current} / {total}</span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => {
          const done = i < current - 1;
          const active = i === current - 1;
          return (
            <motion.div
              key={i}
              whileHover={{ scaleY: 1.6 }}
              transition={{ duration: 0.15 }}
              className="relative flex-1 h-2 bg-[#E8E8E4] overflow-hidden cursor-default origin-bottom"
            >
              <motion.div
                className={`absolute inset-y-0 left-0 ${active ? 'bg-[#E85002]' : 'bg-[#0A0A0A]'}`}
                initial={{ width: 0 }}
                animate={{ width: isVisible ? (done || active ? '100%' : '0%') : 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              />
              {active && (
                <motion.div
                  className="absolute inset-0 bg-[#E85002]"
                  animate={{ opacity: [0.35, 0.8, 0.35] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

/* ─── Timeline node dot ──────────────────────────────────── */
const NodeDot = ({ active }: { active?: boolean }) => (
  <span className="relative flex items-center justify-center w-3.5 h-3.5 shrink-0">
    {active && (
      <motion.span
        className="absolute inset-0 rounded-full bg-[#E85002]"
        animate={{ scale: [1, 1.9, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    )}
    <span className={`relative w-2.5 h-2.5 rounded-full border-2 ${active ? 'bg-[#E85002] border-[#E85002]' : 'bg-[#F2F2F0] border-[#0A0A0A]'}`} />
  </span>
);

const TIMELINE = [
  {
    key: 'avvai',
    school: 'Avvai KSR Matric High School',
    detail: 'TN SSLC · 81.6%',
    period: 'Tiruchengode · 2007–2020',
  },
  {
    key: 'ksr',
    school: 'KSR Matriculation Hr. Sec. School',
    detail: 'TN HSC · 90%',
    period: 'Tiruchengode · 2020–2022',
  },
];

export default function Education() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15 });

  return (
    <section id="education" className="relative py-24 bg-[#E8E8E4] border-t border-[#DEDEDA] overflow-hidden">
      {/* Blueprint dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(10,10,10,0.08) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative container mx-auto px-6 max-w-6xl">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-14 border-b border-[#C0C0BC] pb-6 flex items-end justify-between">
            <div>
              <div className="font-mono text-[#E85002] text-xs tracking-[0.2em] mb-4">
                MODULE /02 — ACADEMIC_DATABASE
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0A]">
                Education & Background
              </h2>
            </div>
            <div className="hidden md:block font-mono text-[10px] text-[#A0A09C] tracking-widest text-right">
              TIMELINE VIEW<br />2007 — PRESENT
            </div>
          </motion.div>

          {/* ── Academic timeline ── */}
          <div className="relative pl-6 md:pl-8">
            {/* Vertical line */}
            <div className="absolute left-[6px] md:left-[7px] top-2 bottom-2 w-px bg-[#C0C0BC] overflow-hidden">
              <motion.div
                className="w-full bg-[#0A0A0A] origin-top"
                style={{ height: '100%' }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isVisible ? 1 : 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              />
            </div>

            <div className="flex flex-col gap-6">
              {/* Earlier schools */}
              {TIMELINE.map((t, i) => (
                <motion.div key={t.key} variants={itemVariants} className="relative flex items-start gap-5">
                  <div className="absolute -left-6 md:-left-8 top-1.5">
                    <NodeDot />
                  </div>
                  <motion.div
                    whileHover={{ x: 6, borderColor: '#E85002' }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 bg-[#F2F2F0] hover:bg-white border border-[#DEDEDA] p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 cursor-default"
                  >
                    <div>
                      <h4 className="font-display text-base font-bold text-[#0A0A0A]">{t.school}</h4>
                      <div className="font-mono text-[10px] text-[#646464] tracking-wider uppercase mt-1">{t.period}</div>
                    </div>
                    <div className="font-mono text-xs text-[#E85002] shrink-0">{t.detail}</div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Current: PSG College — primary node */}
              <motion.div variants={itemVariants} className="relative flex items-start gap-5">
                <div className="absolute -left-6 md:-left-8 top-1.5">
                  <NodeDot active />
                </div>

                <div className="flex-1 bg-white border-t-[3px] border-[#E85002] border-x border-b border-[#DEDEDA] p-6 md:p-8 relative">
                  <div className="absolute top-0 right-6 -translate-y-1/2 px-3 py-1 bg-[#E85002] text-white font-mono text-[10px] tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    IN PROGRESS
                  </div>

                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-bold text-[#0A0A0A] mb-2">
                        PSG College of Technology
                      </h3>
                      <div className="font-mono text-sm text-[#0A0A0A] mb-1 font-medium">
                        B.E. Production Engineering · Sandwich Programme
                      </div>
                      <div className="font-mono text-xs text-[#646464] mb-6">
                        Nov 2022 – Mar 2027 · Coimbatore, TN
                      </div>

                      <div className="mb-6">
                        <div className="font-mono text-[10px] text-[#A0A09C] mb-2 uppercase tracking-widest">Core Coursework</div>
                        <div className="flex flex-wrap gap-2">
                          {["Creo Parametric", "Lean Manufacturing", "PLM · Teamcenter", "Production & Ops Mgmt.", "Sustainable Mobility", "DMAIC / Six Sigma"].map(course => (
                            <motion.span
                              key={course}
                              whileHover={{ y: -2, borderColor: '#E85002', color: '#E85002' }}
                              transition={{ duration: 0.15 }}
                              className="bg-[#F2F2F0] px-2.5 py-1 font-mono text-[11px] text-[#0A0A0A] border border-[#DEDEDA] cursor-default"
                            >
                              {course}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <SemesterTrack current={9} total={10} isVisible={isVisible} />
                    </div>

                    <div className="flex lg:flex-col items-center gap-6 shrink-0 mx-auto lg:mx-0">
                      <CgpaGauge value={8.50} isVisible={isVisible} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
