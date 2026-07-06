import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { containerVariants, itemVariants } from '../lib/animations';

interface Tool {
  name: string;
  role: string;      // concise professional descriptor, not a vague category tag
  bg: string;
  tier: 'core' | 'secondary';
  icon: React.ReactNode;
}

const box = (fill: string, children: React.ReactNode) => (
  <svg viewBox="0 0 40 40" className="w-full h-full">
    <rect width="40" height="40" rx="8" fill={fill} />
    {children}
  </svg>
);
const label = (text: string, fill = 'white', size = 10) => (
  <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill={fill} fontSize={size} fontWeight="bold" fontFamily="Arial">{text}</text>
);

/* ─── CAD / CAE — core mechanical design & simulation stack ── */
const CAD_CAE: Tool[] = [
  { name: 'SolidWorks', role: '3D CAD Design', bg: '#E8312A', tier: 'core', icon: box('#E8312A', label('SW')) },
  { name: 'ANSYS', role: 'FEA Simulation', bg: '#FFB500', tier: 'core', icon: box('#FFB500', label('ANSYS', '#1A1A1A', 9)) },
  { name: 'Creo Parametric', role: 'CAD / PLM', bg: '#003B6F', tier: 'secondary', icon: box('#003B6F', label('CREO', 'white', 9)) },
  { name: 'Fusion 360', role: 'CAD / CAM', bg: '#F47920', tier: 'secondary', icon: box('#F47920', label('F360', 'white', 9)) },
  { name: 'AutoCAD', role: '2D / 3D Drafting', bg: '#CF3031', tier: 'secondary', icon: box('#CF3031', label('A', 'white', 16)) },
  { name: 'CATIA', role: 'CAD / PLM', bg: '#005587', tier: 'secondary', icon: box('#005587', label('CATIA', 'white', 8)) },
  { name: 'Siemens NX', role: 'CAD / CAM', bg: '#009999', tier: 'secondary', icon: box('#009999', label('NX')) },
  { name: 'Teamcenter', role: 'PLM', bg: '#003399', tier: 'secondary', icon: box('#003399', label('TC')) },
  { name: 'Tecnomatix', role: 'Digital Manufacturing', bg: '#00A19A', tier: 'secondary', icon: box('#00A19A', label('TECNO', 'white', 7.5)) },
];

/* ─── AI-Assisted Development — only what's actually in daily use ── */
const AI_TOOLS: Tool[] = [
  {
    name: 'Claude', role: 'AI Pair-Programming', bg: '#D97757', tier: 'core',
    icon: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <rect width="40" height="40" rx="8" fill="#D97757" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          const x1 = 20 + 4 * Math.cos(a), y1 = 20 + 4 * Math.sin(a);
          const x2 = 20 + 11 * Math.cos(a), y2 = 20 + 11 * Math.sin(a);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="2.5" strokeLinecap="round" />;
        })}
      </svg>
    ),
  },
];

/* ─── Programming & Development — languages, editor, version control, this site's own stack ── */
const DEV: Tool[] = [
  { name: 'Python', role: 'Scripting & Analysis', bg: '#1E3A5F', tier: 'core', icon: box('#1E3A5F', <>{label('Py', '#FFD43B', 14)}</>) },
  { name: 'GitHub', role: 'Code Hosting & CI/CD', bg: '#181717', tier: 'core', icon: box('#181717', label('GH')) },
  { name: 'Git', role: 'Version Control', bg: '#F05033', tier: 'secondary', icon: box('#F05033', label('Git', 'white', 11)) },
  { name: 'VS Code', role: 'Code Editor', bg: '#0065A9', tier: 'secondary', icon: box('#0065A9', label('VS', 'white', 9)) },
  { name: 'GitHub Actions', role: 'CI/CD Pipelines', bg: '#2088FF', tier: 'secondary', icon: box('#2088FF', label('CI/CD', 'white', 7)) },
  { name: 'React', role: 'Frontend Framework', bg: '#0A0A0A', tier: 'secondary', icon: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <rect width="40" height="40" rx="8" fill="#0A0A0A" />
        <circle cx="20" cy="20" r="2.6" fill="#61DAFB" />
        <ellipse cx="20" cy="20" rx="11" ry="4.3" fill="none" stroke="#61DAFB" strokeWidth="1.4" />
        <ellipse cx="20" cy="20" rx="11" ry="4.3" fill="none" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(60 20 20)" />
        <ellipse cx="20" cy="20" rx="11" ry="4.3" fill="none" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(120 20 20)" />
      </svg>
    ) },
  { name: 'TypeScript', role: 'Type-Safe Development', bg: '#3178C6', tier: 'secondary', icon: box('#3178C6', label('TS')) },
  { name: 'Tailwind CSS', role: 'Utility-First Styling', bg: '#0F172A', tier: 'secondary', icon: box('#0F172A', label('tw', '#38BDF8', 14)) },
  { name: 'Framer Motion', role: 'Motion & Interaction', bg: '#0A0A0A', tier: 'secondary', icon: box('#0A0A0A', label('FM', '#E85002', 11)) },
  { name: 'Vite', role: 'Build Tooling', bg: '#1E1E2E', tier: 'secondary', icon: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <rect width="40" height="40" rx="8" fill="#1E1E2E" />
        <path d="M11 10 L20 32 L29 10 L20 15 Z" fill="#646CFF" />
        <path d="M20 10 L24 22 L28 14 Z" fill="#FFDD35" />
      </svg>
    ) },
  { name: 'Node.js', role: 'Automation Scripting', bg: '#333333', tier: 'secondary', icon: box('#333333', label('node', '#83CD29', 9)) },
  { name: 'Java', role: 'Programming', bg: '#0D7377', tier: 'secondary', icon: box('#0D7377', label('Java', 'white', 9)) },
  { name: 'C++', role: 'Programming', bg: '#00599C', tier: 'secondary', icon: box('#00599C', label('C++', 'white', 11)) },
  { name: 'MATLAB', role: 'Numerical Analysis', bg: '#0D5297', tier: 'secondary', icon: box('#0D5297', label('MAT', 'white', 9)) },
  { name: 'SQL', role: 'Databases', bg: '#00618A', tier: 'secondary', icon: box('#00618A', label('SQL')) },
];

/* ─── Analytics & BI ── */
const ANALYTICS: Tool[] = [
  { name: 'Power BI', role: 'Business Intelligence', bg: '#F2C811', tier: 'core', icon: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <rect width="40" height="40" rx="8" fill="#F2C811" />
        <rect x="10" y="22" width="5" height="10" rx="1" fill="#1A1A1A" />
        <rect x="17" y="16" width="5" height="16" rx="1" fill="#1A1A1A" opacity="0.7" />
        <rect x="24" y="10" width="5" height="22" rx="1" fill="#1A1A1A" opacity="0.5" />
      </svg>
    ) },
  { name: 'Excel', role: 'Data & Reporting', bg: '#1D6F42', tier: 'core', icon: box('#1D6F42', label('X', 'white', 14)) },
  { name: 'Minitab', role: 'Statistical Analysis', bg: '#00758F', tier: 'secondary', icon: box('#00758F', label('MTB', 'white', 9)) },
  { name: 'Tableau', role: 'Data Visualization', bg: '#E97627', tier: 'secondary', icon: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <rect width="40" height="40" rx="8" fill="#E97627" />
        <rect x="18" y="8" width="4" height="10" fill="white" />
        <rect x="18" y="22" width="4" height="10" fill="white" />
        <rect x="8" y="18" width="10" height="4" fill="white" />
        <rect x="22" y="18" width="10" height="4" fill="white" />
      </svg>
    ) },
];

/* ─── Embedded Systems ── */
const EMBEDDED: Tool[] = [
  { name: 'ESP32 / IIoT', role: 'Embedded / IIoT', bg: '#0A0A0A', tier: 'core', icon: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <rect width="40" height="40" rx="8" fill="#0A0A0A" />
        <rect x="12" y="12" width="16" height="16" rx="2" fill="#E85002" />
        <rect x="7" y="16" width="4" height="2" rx="1" fill="#E85002" opacity="0.5" />
        <rect x="29" y="16" width="4" height="2" rx="1" fill="#E85002" opacity="0.5" />
        <rect x="16" y="7" width="2" height="4" rx="1" fill="#E85002" opacity="0.5" />
        <rect x="22" y="7" width="2" height="4" rx="1" fill="#E85002" opacity="0.5" />
      </svg>
    ) },
  { name: 'Arduino', role: 'Embedded Prototyping', bg: '#00878F', tier: 'secondary', icon: box('#00878F', label('ARD', 'white', 9)) },
  { name: 'Raspberry Pi', role: 'Edge Computing', bg: '#C51A4A', tier: 'secondary', icon: box('#C51A4A', label('Pi', 'white', 13)) },
];

/* ─── Design & Media ── */
const DESIGN: Tool[] = [
  { name: 'Figma', role: 'UI / UX Design', bg: '#1E1E1E', tier: 'secondary', icon: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <rect width="40" height="40" rx="8" fill="#1E1E1E" />
        <circle cx="20" cy="14" r="5" fill="#F24E1E" />
        <circle cx="14" cy="14" r="5" fill="#FF7262" />
        <circle cx="14" cy="20" r="5" fill="#A259FF" />
        <circle cx="14" cy="26" r="5" fill="#0ACF83" />
        <circle cx="20" cy="20" r="5" fill="#1ABCFE" />
      </svg>
    ) },
  { name: 'Photoshop', role: 'Image Editing', bg: '#001E36', tier: 'secondary', icon: box('#001E36', label('Ps', '#31A8FF', 12)) },
  { name: 'DaVinci Resolve', role: 'Video Editing', bg: '#233A51', tier: 'secondary', icon: box('#233A51', label('DVR', '#F2C811', 8)) },
  { name: 'MS Office', role: 'Productivity Suite', bg: '#E85002', tier: 'secondary', icon: box('#E85002', label('⊞', 'white', 18)) },
  { name: 'SAP Fiori', role: 'ERP / UX', bg: '#0854A0', tier: 'secondary', icon: box('#0854A0', label('SAP', 'white', 9)) },
];

const CATEGORIES: { title: string; tools: Tool[] }[] = [
  { title: 'CAD / CAE', tools: CAD_CAE },
  { title: 'AI-Assisted Development', tools: AI_TOOLS },
  { title: 'Programming & Development', tools: DEV },
  { title: 'Analytics & BI', tools: ANALYTICS },
  { title: 'Embedded Systems', tools: EMBEDDED },
  { title: 'Design & Media', tools: DESIGN },
];

const TOTAL_TOOLS = CATEGORIES.reduce((s, c) => s + c.tools.length, 0);

const ToolCard = ({ tool, i, isVisible }: { tool: Tool; i: number; isVisible: boolean }) => {
  const core = tool.tier === 'core';
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.04, borderColor: '#E85002', boxShadow: '0 10px 24px rgba(232,80,2,0.18)' }}
      whileTap={{ scale: 0.97 }}
      className={`group relative flex flex-col items-center gap-2.5 p-3 bg-white transition-colors duration-200 cursor-default ${
        core ? 'border-2 border-[#0A0A0A]' : 'border border-[#E4E4E0]'
      }`}
    >
      {core && (
        <span className="absolute -top-2 right-2 bg-[#E85002] text-white font-mono text-[7px] tracking-widest px-1.5 py-0.5">
          CORE
        </span>
      )}
      <motion.div
        className="rounded-xl overflow-hidden shadow-sm w-10 h-10"
        whileHover={{ rotate: -6, scale: 1.12 }}
        transition={{ type: 'spring', stiffness: 300, damping: 12 }}
      >
        {tool.icon}
      </motion.div>
      <div className="text-center">
        <div className={`font-mono text-[10px] font-bold leading-tight ${core ? 'text-[#0A0A0A]' : 'text-[#0A0A0A]'}`}>
          {tool.name}
        </div>
        <div className="font-mono text-[8px] text-[#A0A09C] mt-0.5 tracking-wide leading-tight">
          {tool.role}
        </div>
      </div>
    </motion.div>
  );
};

export default function Tools() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  let flatIndex = 0;

  return (
    <section id="tools" className="py-24 bg-[#F2F2F0]">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-12 border-b border-[#DEDEDA] pb-6 flex items-end justify-between flex-wrap gap-3">
            <div>
              <div className="font-mono text-[#E85002] text-xs tracking-[0.2em] mb-4">
                MODULE /03b — ENGINEERING_TOOLCHAIN.registry
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0A]">
                Engineering Toolchain
              </h2>
            </div>
            <div className="font-mono text-[10px] text-[#A0A09C] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0A0A0A] inline-block" /> Core / daily use
              <span className="w-2 h-2 border border-[#A0A09C] inline-block ml-3" /> Secondary / working knowledge
            </div>
          </motion.div>

          {/* Categorized grid */}
          <div className="flex flex-col gap-10">
            {CATEGORIES.map((cat) => (
              <motion.div key={cat.title} variants={itemVariants}>
                <div className="font-mono text-[10px] text-[#646464] tracking-widest uppercase mb-3">
                  // {cat.title}
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
                  {cat.tools.map((tool) => {
                    const i = flatIndex++;
                    return <ToolCard key={tool.name} tool={tool} i={i} isVisible={isVisible} />;
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Terminal footer */}
          <motion.div
            variants={itemVariants}
            className="mt-10 border border-[#E4E4E0] bg-[#0A0A0A] px-5 py-3 flex items-center gap-2 font-mono text-xs"
          >
            <span className="text-[#E85002]">root@rs-os:~$</span>
            <span className="text-[#646464]">list --tools --active</span>
            <span className="ml-auto text-[#333]">{TOTAL_TOOLS} tools loaded</span>
            <span className="inline-block w-2 h-3.5 bg-[#E85002] animate-pulse ml-1" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
