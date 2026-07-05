import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { containerVariants, itemVariants } from '../lib/animations';

const TOOLS = [
  {
    name: 'SolidWorks',
    category: 'CAD',
    bg: '#E8312A',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#E8312A"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="Arial">SW</text>
      </svg>
    ),
  },
  {
    name: 'Fusion 360',
    category: 'CAD / CAM',
    bg: '#F47920',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#F47920"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">F360</text>
      </svg>
    ),
  },
  {
    name: 'ANSYS',
    category: 'CAE / FEA',
    bg: '#FFB500',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#FFB500"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="#1A1A1A" fontSize="9" fontWeight="bold" fontFamily="Arial">ANSYS</text>
      </svg>
    ),
  },
  {
    name: 'Python',
    category: 'Programming',
    bg: '#1E3A5F',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#1E3A5F"/>
        <text x="50%" y="38%" dominantBaseline="middle" textAnchor="middle" fill="#FFD43B" fontSize="18" fontFamily="Arial">🐍</text>
        <rect x="8" y="26" width="24" height="3" rx="1.5" fill="#FFD43B" opacity="0.3"/>
      </svg>
    ),
  },
  {
    name: 'MATLAB',
    category: 'Analysis',
    bg: '#0D5297',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#0D5297"/>
        <text x="50%" y="38%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="18">📈</text>
      </svg>
    ),
  },
  {
    name: 'Figma',
    category: 'Design',
    bg: '#1E1E1E',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#1E1E1E"/>
        <circle cx="20" cy="14" r="5" fill="#F24E1E"/>
        <circle cx="20" cy="14" r="5" fill="none"/>
        <circle cx="14" cy="14" r="5" fill="#FF7262"/>
        <circle cx="14" cy="20" r="5" fill="#A259FF"/>
        <circle cx="14" cy="26" r="5" fill="#0ACF83"/>
        <circle cx="20" cy="20" r="5" fill="#1ABCFE"/>
      </svg>
    ),
  },
  {
    name: 'Creo',
    category: 'CAD / PLM',
    bg: '#003B6F',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#003B6F"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">CREO</text>
      </svg>
    ),
  },
  {
    name: 'AutoCAD',
    category: 'Drafting',
    bg: '#CF3031',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#CF3031"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Arial">A</text>
      </svg>
    ),
  },
  {
    name: 'Java',
    category: 'Programming',
    bg: '#0D7377',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#0D7377"/>
        <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="20">☕</text>
      </svg>
    ),
  },
  {
    name: 'Raspberry Pi',
    category: 'Edge Computing',
    bg: '#C51A4A',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#C51A4A"/>
        <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="20">🔴</text>
      </svg>
    ),
  },
  {
    name: 'Photoshop',
    category: 'Design',
    bg: '#001E36',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#001E36"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="#31A8FF" fontSize="12" fontWeight="bold" fontFamily="Arial">Ps</text>
      </svg>
    ),
  },
  {
    name: 'MS Office',
    category: 'Productivity',
    bg: '#E85002',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#E85002"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="20">⊞</text>
      </svg>
    ),
  },
  {
    name: 'Power BI',
    category: 'Data Viz',
    bg: '#F2C811',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#F2C811"/>
        <rect x="10" y="22" width="5" height="10" rx="1" fill="#1A1A1A"/>
        <rect x="17" y="16" width="5" height="16" rx="1" fill="#1A1A1A" opacity="0.7"/>
        <rect x="24" y="10" width="5" height="22" rx="1" fill="#1A1A1A" opacity="0.5"/>
      </svg>
    ),
  },
  {
    name: 'Minitab',
    category: 'Statistics',
    bg: '#00758F',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#00758F"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">MTB</text>
      </svg>
    ),
  },
  {
    name: 'ESP32 / IIoT',
    category: 'Embedded',
    bg: '#0A0A0A',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#0A0A0A"/>
        <rect x="12" y="12" width="16" height="16" rx="2" fill="#E85002"/>
        <rect x="7" y="16" width="4" height="2" rx="1" fill="#E85002" opacity="0.5"/>
        <rect x="29" y="16" width="4" height="2" rx="1" fill="#E85002" opacity="0.5"/>
        <rect x="16" y="7" width="2" height="4" rx="1" fill="#E85002" opacity="0.5"/>
        <rect x="22" y="7" width="2" height="4" rx="1" fill="#E85002" opacity="0.5"/>
      </svg>
    ),
  },
  {
    name: 'Teamcenter',
    category: 'PLM',
    bg: '#003399',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#003399"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">TC</text>
      </svg>
    ),
  },
  {
    name: 'Node.js',
    category: 'Automation Scripting',
    bg: '#333333',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#333333"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="#83CD29" fontSize="10" fontWeight="bold" fontFamily="Arial">node</text>
      </svg>
    ),
  },
  {
    name: 'GitHub',
    category: 'Version Control',
    bg: '#181717',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#181717"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="18">🐙</text>
      </svg>
    ),
  },
  {
    name: 'VS Code',
    category: 'IDE',
    bg: '#0065A9',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#0065A9"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="Arial">VS</text>
      </svg>
    ),
  },
  {
    name: 'Arduino',
    category: 'Embedded',
    bg: '#00878F',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#00878F"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="Arial">ARD</text>
      </svg>
    ),
  },
  {
    name: 'DaVinci Resolve',
    category: 'Video Editing',
    bg: '#233A51',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#233A51"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="#F2C811" fontSize="8" fontWeight="bold" fontFamily="Arial">DVR</text>
      </svg>
    ),
  },
  {
    name: 'SAP Fiori',
    category: 'ERP / UX',
    bg: '#0854A0',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#0854A0"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="Arial">SAP</text>
      </svg>
    ),
  },
  {
    name: 'Excel',
    category: 'Data / Reporting',
    bg: '#1D6F42',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#1D6F42"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial">X</text>
      </svg>
    ),
  },
];

export default function Tools() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

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
          <motion.div variants={itemVariants} className="mb-12 border-b border-[#DEDEDA] pb-6">
            <div className="font-mono text-[#E85002] text-xs tracking-[0.2em] mb-4">
              MODULE /03b — TOOL_STACK.registry
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0A]">
              Working Toolchain
            </h2>
          </motion.div>

          {/* Icon grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3"
          >
            {TOOLS.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 16 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: i * 0.035, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.05, borderColor: '#E85002', boxShadow: '0 10px 24px rgba(232,80,2,0.18)' }}
                whileTap={{ scale: 0.97 }}
                className="group flex flex-col items-center gap-2.5 p-3 bg-white border border-[#E4E4E0] transition-colors duration-200 cursor-default"
              >
                {/* Icon tile */}
                <motion.div
                  className="rounded-xl overflow-hidden shadow-sm"
                  whileHover={{ rotate: -6, scale: 1.12 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                >
                  {tool.icon}
                </motion.div>
                {/* Name */}
                <div className="text-center">
                  <div className="font-mono text-[10px] font-bold text-[#0A0A0A] leading-tight">
                    {tool.name}
                  </div>
                  <div className="font-mono text-[8px] text-[#A0A09C] mt-0.5 tracking-wider">
                    {tool.category}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Terminal footer */}
          <motion.div
            variants={itemVariants}
            className="mt-8 border border-[#E4E4E0] bg-[#0A0A0A] px-5 py-3 flex items-center gap-2 font-mono text-xs"
          >
            <span className="text-[#E85002]">root@rs-os:~$</span>
            <span className="text-[#646464]">list --tools --active</span>
            <span className="ml-auto text-[#333]">{TOOLS.length} tools loaded</span>
            <span className="inline-block w-2 h-3.5 bg-[#E85002] animate-pulse ml-1" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
