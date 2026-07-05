import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const roles = [
  {
    id: 1,
    org: "Students' Union · PSG Tech",
    title: "Team Coordinator & Design Core",
    duration: "Aug 2025 – Present",
    desc: "Led visual branding for college-wide events using Canva, Photoshop, and Figma.",
    featured: true
  },
  {
    id: 2,
    org: "International Education Cell",
    title: "Joint Secretary",
    duration: "Aug 2025 – Present",
    desc: "Supporting international academic programmes and cross-cultural engagement.",
    featured: false
  },
  {
    id: 3,
    org: "Book Readers Club · PSGCT",
    title: "Treasurer & Design Team Head",
    duration: "Sep 2025 – Present",
    desc: "Creative workflow — posters, covers, and social media for literary initiatives.",
    featured: false
  },
  {
    id: 4,
    org: "Industry Interaction Forum",
    title: "Design Team Member",
    duration: "Sep 2024 – Present",
    desc: "Visual assets for speaker profiles and event promotions.",
    featured: false
  },
  {
    id: 5,
    org: "PSG College of Technology",
    title: "Class Representative — 6th Semester",
    duration: "Jan – Aug 2025",
    desc: "Represented classmates and facilitated student-faculty communication.",
    featured: false
  },
  {
    id: 6,
    org: "NSS · PSG Tech & NCC",
    title: "Volunteer & NCC Cadet",
    duration: "Ongoing",
    desc: "Community outreach. Former NCC cadet — discipline and civic responsibility.",
    featured: false
  }
];

export default function Leadership() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <section id="leadership" className="py-24 bg-[#F2F2F0]">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-12 border-b border-[#DEDEDA] pb-6">
            <div className="font-mono text-[#E85002] text-xs tracking-[0.2em] mb-4">
              MODULE /07 — CAMPUS_NODES
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0A]">
              Leadership & Campus Roles
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#C0C0BC] border border-[#C0C0BC]">
            {roles.map((role) => (
              <motion.div 
                key={role.id}
                variants={itemVariants}
                whileHover={{ y: -6, backgroundColor: '#FAFAF9', boxShadow: '0 12px 28px rgba(10,10,10,0.08)' }}
                transition={{ duration: 0.2 }}
                className={`bg-white p-8 relative cursor-default ${role.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <motion.div
                  className="absolute left-0 top-0 bottom-0 bg-[#E85002]"
                  initial={{ width: role.featured ? 3 : 0 }}
                  whileHover={{ width: 3 }}
                  transition={{ duration: 0.2 }}
                />
                
                <div className="font-mono text-[10px] text-[#A0A09C] uppercase tracking-wider mb-4 border-b border-[#F2F2F0] pb-2">
                  {role.org}
                </div>
                
                <h3 className="font-display text-xl font-bold text-[#0A0A0A] mb-1">
                  {role.title}
                </h3>
                
                <div className="font-mono text-xs text-[#E85002] mb-4">
                  {role.duration}
                </div>
                
                <p className="text-sm text-[#646464] leading-relaxed">
                  {role.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
