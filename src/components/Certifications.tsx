import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certsData } from '../data/certs';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/* ─── Tab definitions ────────────────────────────────────── */
const TABS = [
  { id: 'ALL',          label: 'All',          types: null },
  { id: 'core',         label: 'Engineering',  types: ['core'] },
  { id: 'ai',           label: 'AI / ML',      types: ['ai'] },
  { id: 'programming',  label: 'Programming',  types: ['programming'] },
  { id: 'design',       label: 'Design',       types: ['design'] },
  { id: 'internship',   label: 'Internship',   types: ['internship'] },
  { id: 'achievement',  label: 'Achievement',  types: ['achievement'] },
  { id: 'leadership',   label: 'Membership',   types: ['leadership'] },
];

/* ─── Single cert card ───────────────────────────────────── */
const CertCard = ({ cert }: { cert: typeof certsData[0] }) => (
  <motion.a
    layout
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    whileHover={{ y: -5, scale: 1.03, borderColor: '#E85002', boxShadow: '0 10px 22px rgba(232,80,2,0.15)' }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }}
    href={cert.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex flex-col justify-between p-4 bg-white border border-[#E4E4E0] transition-colors duration-200"
  >
    <div className="flex items-start justify-between mb-3 gap-2">
      <motion.div
        whileHover={{ rotate: -8, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 12 }}
        className="w-8 h-8 shrink-0 border border-[#E4E4E0] group-hover:border-[#E85002] bg-[#F8F8F6] flex items-center justify-center font-mono text-[9px] font-bold text-[#A0A09C] group-hover:text-[#E85002] transition-colors"
      >
        {cert.initials}
      </motion.div>
      <span className="font-mono text-[10px] text-[#C0C0BC] group-hover:text-[#E85002] transition-colors shrink-0 mt-0.5">
        VIEW ↗
      </span>
    </div>
    <div>
      <div className="font-mono text-[8px] text-[#A0A09C] uppercase tracking-wider mb-1 truncate">
        {cert.issuer}
      </div>
      <h4 className="font-sans text-[12px] font-semibold text-[#0A0A0A] leading-snug line-clamp-2">
        {cert.title}
      </h4>
    </div>
  </motion.a>
);

/* ─── Achievements ───────────────────────────────────────── */
const ACHIEVEMENTS = [
  { emoji: '🥉', title: 'Academic Proficiency Award — 3rd Place', sub: '6th Semester · PSG College of Technology' },
  { emoji: '🏆', title: 'Mechnatron 2k24 Participant',            sub: 'National-level · CIT Coimbatore' },
  { emoji: '🎖️', title: 'NCC Cadet — School Unit',               sub: 'Discipline & civic leadership' },
  { emoji: '⭐', title: 'Recognised for Club Contributions',      sub: 'Design & literary forums · PSG Tech' },
];

/* ─── Section ────────────────────────────────────────────── */
export default function Certifications() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.08 });

  const filtered = activeTab === 'ALL'
    ? certsData
    : certsData.filter(c => TABS.find(t => t.id === activeTab)?.types?.includes(c.type));

  return (
    <section id="certifications" className="py-24 bg-[#F4F4F1]">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* ── Header ── */}
          <div className="mb-10 border-b border-[#D8D8D4] pb-6">
            <div className="font-mono text-[#E85002] text-xs tracking-[0.2em] mb-3">
              MODULE /06 — CERTIFICATION_VAULT
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0A]">
              Credentials & Achievements
            </h2>
          </div>

          {/* ── Tab bar ── */}
          <div className="flex flex-wrap gap-1 mb-8 border-b border-[#D8D8D4]">
            {TABS.map(tab => {
              const count = tab.types === null
                ? certsData.length
                : certsData.filter(c => tab.types!.includes(c.type)).length;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2.5 font-mono text-[11px] tracking-wider uppercase transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[#0A0A0A]'
                      : 'text-[#A0A09C] hover:text-[#0A0A0A]'
                  }`}
                >
                  {tab.label}
                  {/* count badge */}
                  <span className={`ml-1.5 text-[9px] ${isActive ? 'text-[#E85002]' : 'text-[#C0C0BC]'}`}>
                    {count}
                  </span>
                  {/* active underline */}
                  {isActive && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute bottom-[-1px] inset-x-0 h-[2px] bg-[#E85002]"
                      transition={{ type: 'spring', damping: 24, stiffness: 220 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Cert grid ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-16"
            >
              {filtered.map(cert => (
                <CertCard key={cert.id} cert={cert} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ── Achievements ── */}
          <div className="border-t-[2px] border-[#0A0A0A] pt-10">
            <h3 className="font-mono text-[#E85002] text-xs tracking-widest mb-6 uppercase">
              Notable Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ACHIEVEMENTS.map(a => (
                <motion.div
                  key={a.title}
                  whileHover={{ y: -4, borderColor: '#E85002', boxShadow: '0 10px 22px rgba(10,10,10,0.06)' }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-[#E4E4E0] p-5 flex gap-4 items-start cursor-default"
                >
                  <motion.span
                    whileHover={{ scale: 1.25, rotate: -8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                    className="text-xl shrink-0 mt-0.5"
                  >
                    {a.emoji}
                  </motion.span>
                  <div>
                    <h4 className="font-semibold text-[#0A0A0A] text-sm mb-1">{a.title}</h4>
                    <p className="font-mono text-[10px] text-[#A0A09C]">{a.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
