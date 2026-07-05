import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { containerVariants, itemVariants } from '../lib/animations';

const experiences = [
  {
    id: 'tcpl',
    node: '06',
    company: 'Tata Consumer Products Ltd.',
    shortName: 'Tata Consumer',
    role: 'Production Engineering Intern',
    duration: 'May 2026 — Present',
    location: 'Coimbatore, TN',
    status: 'CURRENT',
    tag: 'FMCG',
    bullets: [
      'Analysing high-throughput FMCG production workflows and mapping process waste using Value Stream Mapping.',
      'Applying 5S methodology across workstation zones to improve operational efficiency and housekeeping standards.',
      'Contributing to capacity planning and SOP documentation for critical assembly stations.',
      'Supporting DMAIC Six Sigma project to reduce process loss across four VFFS salt packaging machines.',
      'Building Power BI dashboards for real-time production monitoring and KPI tracking.',
    ],
    tags: ['Lean Manufacturing', '5S', 'VSM', 'Production Planning', 'DMAIC', 'Power BI'],
  },
  {
    id: 'qfocus',
    node: '05',
    company: 'Q Focus Engineering India Pvt. Ltd.',
    shortName: 'Q Focus Engineering',
    role: 'Precision Metal Cutting Intern',
    duration: 'Dec 2025 — Apr 2026',
    location: 'Coimbatore, TN',
    status: 'COMPLETE',
    tag: 'MANUFACTURING',
    bullets: [
      'Hands-on exposure to precision measurement and quality control workflows in metal cutting.',
      'Assisted in calibration, inspection, and documentation of production components.',
      'Applied metrology concepts to real-world production floor scenarios.',
    ],
    tags: ['Quality Control', 'Metrology', 'Calibration', 'Precision Measurement'],
  },
  {
    id: 'tenneco',
    node: '04',
    company: 'Tenneco Automotive India Pvt. Ltd.',
    shortName: 'Tenneco Automotive',
    role: 'Summer Intern',
    duration: 'May — Sep 2025',
    location: 'Coimbatore, TN',
    status: 'COMPLETE',
    tag: 'AUTOMOTIVE',
    bullets: [
      'Documented automotive shock absorber manufacturing across assembly and quality stations.',
      'Studied lean production practices in high-volume automotive manufacturing.',
      'Completed certified internship covering end-to-end production floor operations.',
    ],
    tags: ['Automotive Mfg.', 'Assembly Line', 'Lean Production', 'Quality Audit'],
  },
  {
    id: 'spindraft',
    node: '03',
    company: 'Spindraft Engineering',
    shortName: 'Spindraft Engineering',
    role: 'Trainee',
    duration: 'Dec 2024',
    location: 'Coimbatore, TN',
    status: 'COMPLETE',
    tag: 'ENGINEERING',
    bullets: [
      'Exposure to industrial spinning machinery design and manufacturing processes.',
      'Assisted with component inspection and documentation on the production floor.',
      'Gained practical understanding of textile machinery engineering workflows.',
    ],
    tags: ['Textile Machinery', 'Component Inspection', 'Production Floor'],
  },
  {
    id: 'psgcharities',
    node: '02',
    company: 'PSG Sons\' Charities',
    shortName: 'PSG Sons\' Charities',
    role: 'Metallurgy & Foundry Trainee',
    duration: 'Jun 2023',
    location: 'Coimbatore, TN',
    status: 'COMPLETE',
    tag: 'FOUNDRY',
    bullets: [
      'Hands-on training in foundry operations including sand casting and metal pouring.',
      'Studied metallurgical properties and heat treatment processes for ferrous metals.',
      'Observed quality control checks on cast components for dimensional accuracy.',
    ],
    tags: ['Foundry', 'Metallurgy', 'Sand Casting', 'Heat Treatment'],
  },
  {
    id: 'psgiti',
    node: '01',
    company: 'PSG Industrial Training Institute',
    shortName: 'PSG Industrial Institute',
    role: 'CNC Machining Trainee',
    duration: 'Oct 2022',
    location: 'PSG Campus, Coimbatore',
    status: 'COMPLETE',
    tag: 'MACHINING',
    bullets: [
      'Certified CNC machining programme — G&M code programming and part manufacture.',
      'Machined nut components with tolerance control to ±0.05 mm.',
      'Toolpath strategy, feed/speed selection, and setup documentation.',
    ],
    tags: ['CNC Machining', 'G&M Code', 'Nut Manufacturing', 'Tolerance Control'],
  },
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState(experiences[0].id);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15 });
  const activeExp = experiences.find(e => e.id === activeTab) || experiences[0];

  return (
    <section id="experience" className="py-24 bg-[#0A0A0A] text-[#F2F2F0]">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-12 border-b border-[#333] pb-6">
            <div className="font-mono text-[#E85002] text-xs tracking-[0.2em] mb-4">
              MODULE /04 — CAREER_TIMELINE
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Industry Experience
            </h2>
          </motion.div>

          <motion.div variants={itemVariants} className="border border-[#333] bg-[#141414]">
            {/* Header bar */}
            <div className="border-b border-[#333] px-6 py-3 flex items-center justify-between bg-[#0A0A0A] font-mono text-[10px] tracking-widest text-[#A0A09C]">
              <span>PRODUCTION_LINE_FLOW · {experiences.length} NODES</span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full"></span>
                SYSTEM ACTIVE
              </span>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Sidebar */}
              <div className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-[#333] flex flex-row md:flex-col overflow-x-auto md:overflow-visible bg-[#0A0A0A]">
                {experiences.map((exp) => (
                  <motion.button
                    key={exp.id}
                    onClick={() => setActiveTab(exp.id)}
                    whileHover={{ backgroundColor: 'rgba(232,80,2,0.06)' }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className={`px-5 py-4 text-left font-mono text-xs tracking-wide border-b md:border-b-0 md:border-l-[3px] transition-colors whitespace-nowrap md:whitespace-normal flex-1 md:flex-none ${
                      activeTab === exp.id
                        ? 'border-[#E85002] text-[#F2F2F0] bg-[#141414] md:border-l-[#E85002]'
                        : 'border-transparent text-[#646464] hover:text-[#A0A09C]'
                    }`}
                  >
                    <div className="font-bold text-[11px] truncate">{exp.shortName}</div>
                    <div className="text-[9px] opacity-60 mt-0.5">{exp.role.split(' ')[0]}</div>
                    <div className={`text-[9px] mt-1 font-bold ${activeTab === exp.id ? 'text-[#E85002]' : 'text-[#646464]'}`}>
                      {exp.duration.split('—')[0].trim()}
                      {exp.status === 'CURRENT' ? ' — Present' : ''}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 p-6 md:p-10 relative overflow-hidden min-h-[420px]">
                {/* Node watermark */}
                <div className="absolute right-0 top-0 font-mono text-[12rem] leading-none opacity-[0.025] pointer-events-none select-none -mt-6 -mr-6 text-[#E85002]">
                  {activeExp.node}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10"
                  >
                    {/* Status badges */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[#E85002] text-[10px] tracking-widest">Node #{activeExp.node}</span>
                      <span className={`font-mono text-[9px] px-2 py-0.5 border tracking-wider ${
                        activeExp.status === 'CURRENT'
                          ? 'border-[#22C55E] text-[#22C55E]'
                          : 'border-[#333] text-[#646464]'
                      }`}>
                        {activeExp.status === 'CURRENT' ? '● CURRENT' : '✓ COMPLETE'}
                      </span>
                      <span className="font-mono text-[9px] px-2 py-0.5 border border-[#E85002]/40 text-[#E85002]/80 tracking-wider">
                        {activeExp.tag}
                      </span>
                    </div>

                    <h3 className="font-display text-3xl md:text-4xl font-bold mb-1 text-[#F2F2F0] leading-tight">
                      {activeExp.company}
                    </h3>

                    <div className="font-mono text-sm text-[#C0C0BC] mb-1">{activeExp.role}</div>

                    <div className="font-mono text-xs text-[#646464] mb-8 pb-6 border-b border-[#333]">
                      {activeExp.location} · {activeExp.duration}
                    </div>

                    {/* Bullets */}
                    <div className="font-mono text-[10px] text-[#E85002] tracking-widest mb-4 uppercase">
                      Key Contributions
                    </div>
                    <ul className="space-y-3.5 mb-10">
                      {activeExp.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3 text-[#A0A09C] text-sm leading-relaxed">
                          <span className="text-[#E85002] shrink-0 mt-0.5">→</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="font-mono text-[10px] text-[#E85002] tracking-widest mb-3 uppercase">
                      Skills Applied
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeExp.tags.map(tag => (
                        <motion.span
                          key={tag}
                          whileHover={{ y: -2, borderColor: '#E85002', color: '#E85002' }}
                          transition={{ duration: 0.15 }}
                          className="font-mono text-[10px] px-3 py-1.5 border border-[#333] text-[#A0A09C] bg-[#0A0A0A] cursor-default"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
