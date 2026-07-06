import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { containerVariants, itemVariants } from '../lib/animations';

const SKILLS = [
  { label: 'Manufacturing Engineering', short: 'Mfg. Engg.', pct: 90, target: 96 },
  { label: 'Lean Six Sigma',            short: 'Lean 6σ',    pct: 88, target: 95 },
  { label: 'CAD / CAM',                 short: 'CAD/CAM',    pct: 85, target: 94 },
  { label: 'GD&T / Metrology',          short: 'GD&T Metro', pct: 78, target: 90 },
  { label: 'Automation & IIoT',         short: 'Auto IIoT',  pct: 82, target: 92 },
  { label: 'Python',                    short: 'Python',     pct: 75, target: 88 },
  { label: 'MATLAB',                    short: 'MATLAB',     pct: 70, target: 82 },
  { label: 'ESP32 / IIoT Firmware',     short: 'ESP32 IIoT', pct: 68, target: 85 },
  { label: 'Power BI',                  short: 'Power BI',   pct: 80, target: 90 },
  { label: 'Visual Design',             short: 'Vis. Design',pct: 78, target: 88 },
  { label: 'Minitab / Statistics',      short: 'Minitab',    pct: 76, target: 86 },
  { label: 'Figma',                     short: 'Figma',      pct: 70, target: 82 },
];

const CATEGORIES = [
  { title: 'Manufacturing', skills: SKILLS.slice(0, 4) },
  { title: 'Automation',    skills: SKILLS.slice(4, 8) },
  { title: 'Data & Design', skills: SKILLS.slice(8, 12) },
];

const avg = (arr: { pct: number }[]) => Math.round(arr.reduce((s, x) => s + x.pct, 0) / arr.length);
const OVERALL_AVG = avg(SKILLS);
const OVERALL_TARGET = Math.round(SKILLS.reduce((s, x) => s + x.target, 0) / SKILLS.length);
const TOP_SKILL = [...SKILLS].sort((a, b) => b.pct - a.pct)[0];

/* ─── Hero KPI card — big orange, current overall proficiency ── */
const AvgCard = () => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    className="bg-[#E85002] p-6 flex flex-col justify-between min-h-[180px] relative overflow-hidden"
  >
    <div className="flex items-start justify-between relative z-10">
      <span className="font-mono text-[10px] tracking-widest text-white/80 uppercase">Avg. Proficiency</span>
      <span className="font-mono text-[9px] bg-black/25 text-white px-2 py-1 rounded-full">+{OVERALL_TARGET - OVERALL_AVG}% to go</span>
    </div>
    <div className="relative z-10">
      <div className="font-display text-6xl font-bold text-white leading-none">{OVERALL_AVG}%</div>
      <div className="font-mono text-[10px] text-white/70 mt-2 uppercase tracking-wider">Across {SKILLS.length} tracked modules</div>
    </div>
    {/* subtle decorative arc */}
    <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full border-[10px] border-white/10 pointer-events-none" />
  </motion.div>
);

/* ─── Category split card — dark, mini progress rows ── */
const CategoryCard = () => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    className="bg-[#141414] border border-[#333] p-6 flex flex-col justify-between min-h-[180px]"
  >
    <div className="flex items-center justify-between mb-5">
      <span className="font-mono text-[10px] tracking-widest text-[#A0A09C] uppercase">Category Split</span>
      <span className="w-1.5 h-1.5 rounded-full bg-[#E85002]" />
    </div>
    <div className="flex flex-col gap-4">
      {CATEGORIES.map(cat => {
        const a = avg(cat.skills);
        return (
          <div key={cat.title} className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-[#C0C0BC] w-24 shrink-0">{cat.title}</span>
            <div className="flex-1 h-1.5 bg-[#333] rounded-full overflow-hidden">
              <div className="h-full bg-[#E85002] rounded-full" style={{ width: `${a}%` }} />
            </div>
            <span className="font-mono text-[10px] text-[#E85002] w-9 text-right shrink-0">{a}%</span>
          </div>
        );
      })}
    </div>
  </motion.div>
);

/* ─── Gauge card — current vs target overall, semicircle ── */
const GaugeCard = () => {
  const R = 60, CX = 78, CY = 78;
  const startAngle = Math.PI; // 180deg (left)
  const pctAngle = startAngle - (OVERALL_AVG / 100) * Math.PI;
  const targetAngle = startAngle - (OVERALL_TARGET / 100) * Math.PI;
  const pt = (a: number) => ({ x: CX + R * Math.cos(a), y: CY - R * Math.sin(a) });
  const p0 = pt(startAngle);
  const pCur = pt(pctAngle);
  const pTarget = pt(targetAngle);
  const largeArc = 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="bg-[#FBEAD9] p-6 flex flex-col justify-between min-h-[180px] relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono text-[10px] tracking-widest text-[#8A5A2E] uppercase">Growth Target</span>
        <span className="font-mono text-[9px] bg-black/10 text-[#8A5A2E] px-2 py-1 rounded-full">This Sem.</span>
      </div>
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 156 90" className="w-[130px] shrink-0 overflow-visible">
          <path d={`M ${p0.x} ${p0.y} A ${R} ${R} 0 ${largeArc} 1 ${CX + R} ${CY}`} fill="none" stroke="rgba(90,74,26,0.15)" strokeWidth="10" strokeLinecap="round" />
          <path d={`M ${p0.x} ${p0.y} A ${R} ${R} 0 ${largeArc} 1 ${pCur.x} ${pCur.y}`} fill="none" stroke="#0A0A0A" strokeWidth="10" strokeLinecap="round" />
          <circle cx={pTarget.x} cy={pTarget.y} r="4" fill="#E85002" stroke="#FBEAD9" strokeWidth="2" />
          <text x={CX} y={CY - 4} textAnchor="middle" fontFamily='"IBM Plex Mono",monospace' fontSize="20" fontWeight="bold" fill="#0A0A0A">{OVERALL_AVG}%</text>
        </svg>
        <div className="font-mono text-[9px] text-[#8A5A2E] leading-relaxed">
          <div className="flex items-center gap-1.5 mb-1"><span className="w-2 h-2 bg-[#0A0A0A] inline-block rounded-full" /> Current {OVERALL_AVG}%</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-[#E85002] inline-block rounded-full" /> Target {OVERALL_TARGET}%</div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Top skill spotlight card ── */
const TopSkillCard = () => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    className="bg-white p-6 flex flex-col justify-between min-h-[180px]"
  >
    <div className="flex items-center justify-between mb-4">
      <span className="font-mono text-[10px] tracking-widest text-[#8A8A86] uppercase">Strongest Module</span>
      <span className="font-mono text-[9px] text-[#E85002]">#1</span>
    </div>
    <div>
      <div className="font-display text-2xl font-bold text-[#0A0A0A] leading-tight mb-1">{TOP_SKILL.short}</div>
      <div className="font-mono text-[10px] text-[#8A8A86] mb-4">{TOP_SKILL.label}</div>
      <div className="flex items-end gap-1 h-10">
        {Array.from({ length: 14 }).map((_, i) => {
          const h = 20 + Math.round(Math.sin(i * 0.9) * 8 + i * 1.4);
          return <div key={i} className="flex-1 bg-[#0A0A0A] rounded-t-sm" style={{ height: Math.min(40, Math.max(6, h)) }} />;
        })}
      </div>
    </div>
  </motion.div>
);

export default function Skills() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="skills" className="py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial="hidden" animate={isVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-12 border-b border-[#333] pb-6">
            <div className="font-mono text-[#E85002] text-xs tracking-[0.2em] mb-4">MODULE /03 — SKILL_MATRIX</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-[#F2F2F0]">
              Skill Matrix & Technical Arsenal
            </h2>
          </motion.div>

          {/* Bento KPI row */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <AvgCard />
            <CategoryCard />
            <GaugeCard />
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <div className="sm:col-span-1">
              <TopSkillCard />
            </div>
            <div className="sm:col-span-2 bg-[#141414] border border-[#333] p-5 flex flex-col justify-center gap-3 min-h-[180px]">
              <span className="font-mono text-[10px] tracking-widest text-[#A0A09C] uppercase mb-1">Snapshot</span>
              <p className="font-mono text-[11px] text-[#C0C0BC] leading-relaxed">
                {SKILLS.length} tracked modules across manufacturing, automation, and data/design.
                Current average sits at <span className="text-[#E85002] font-bold">{OVERALL_AVG}%</span>,
                targeting <span className="text-[#E85002] font-bold">{OVERALL_TARGET}%</span> this semester.
                Strongest module: <span className="text-white font-bold">{TOP_SKILL.short}</span> at {TOP_SKILL.pct}%.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
