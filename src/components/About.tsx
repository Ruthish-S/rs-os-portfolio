import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { containerVariants, itemVariants } from '../lib/animations';

const CountUp = ({ end, decimals = 2, duration = 2, isVisible }: { end: number, decimals?: number, duration?: number, isVisible: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    let animationFrame: number;

    const update = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(easeProgress * end);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(update);
      }
    };

    animationFrame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return <>{count.toFixed(decimals)}</>;
};

export default function About() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  const chips = [
    "IIoT", "Automation", "CAD/CAM", "Lean Mfg.", "DMAIC", 
    "Six Sigma", "Python", "Figma", "AGV Design", "Power BI"
  ];

  return (
    <section id="about" className="py-24 bg-[#0A0A0A] text-[#F2F2F0] min-h-screen flex items-center">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div 
          ref={ref as React.RefObject<HTMLDivElement>}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="w-full"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-12 border-b border-[rgba(255,255,255,0.1)] pb-6">
            <div className="font-mono text-[#E85002] text-xs tracking-[0.2em] mb-4">
              MODULE /01 — ENGINEER_PROFILE.sys
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              The Engineer Behind the Work
            </h2>
          </motion.div>

          {/* 2x2 Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-px bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.06)]">
            
            {/* Cell 0: Portrait PFP */}
            <motion.div variants={itemVariants} className="bg-[#0A0A0A] lg:col-span-3 relative overflow-hidden flex items-end justify-center" style={{ minHeight: 260 }}>
              <img
                src={`${import.meta.env.BASE_URL}assets/ruthish-pfp.png`}
                alt="Ruthish S"
                className="absolute inset-0 w-full h-full object-cover object-top select-none pointer-events-none"
                style={{ opacity: 0.9, mixBlendMode: 'normal' }}
                draggable={false}
              />
              {/* bottom label */}
              <div className="relative z-10 w-full border-t border-[#333] px-4 py-2 bg-[rgba(10,10,10,0.75)] backdrop-blur-sm">
                <div className="font-mono text-[9px] text-[#E85002] tracking-[0.2em] uppercase">Ruthish S.</div>
                <div className="font-mono text-[8px] text-[#646464] mt-0.5">Production Engineer</div>
              </div>
            </motion.div>

            {/* Cell A: Identity Matrix */}
            <motion.div variants={itemVariants} whileHover={{ backgroundColor: '#171717' }} transition={{ duration: 0.2 }} className="bg-[#141414] p-8 lg:col-span-4 relative overflow-hidden flex flex-col justify-between group cursor-default">
              <div className="absolute -bottom-10 -right-10 font-display font-extrabold text-[12rem] leading-none opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                R<span className="text-[#E85002]">S</span>
              </div>
              
              <div className="space-y-4 font-mono text-xs sm:text-sm tracking-wide z-10">
                <div className="flex border-b border-[#333] pb-3">
                  <span className="w-24 sm:w-32 text-[#646464]">STATUS:</span>
                  <span className="text-[#E85002]">INTERN @ TCPL</span>
                </div>
                <div className="flex border-b border-[#333] pb-3">
                  <span className="w-24 sm:w-32 text-[#646464]">PROGRAMME:</span>
                  <span className="text-[#F2F2F0]">B.E. PRODUCTION ENGG.</span>
                </div>
                <div className="flex border-b border-[#333] pb-3">
                  <span className="w-24 sm:w-32 text-[#646464]">INSTITUTE:</span>
                  <span className="text-[#F2F2F0]">PSG COLLEGE OF TECHNOLOGY</span>
                </div>
                <div className="flex border-b border-[#333] pb-3">
                  <span className="w-24 sm:w-32 text-[#646464]">BATCH:</span>
                  <span className="text-[#F2F2F0]">2022–2027</span>
                </div>
                <div className="flex border-b border-[#333] pb-3">
                  <span className="w-24 sm:w-32 text-[#646464]">LOCATION:</span>
                  <span className="text-[#F2F2F0]">COIMBATORE, TN</span>
                </div>
              </div>

              <div className="mt-8 inline-flex items-center gap-2 border border-[#333] px-3 py-1.5 w-fit">
                <span className="w-1.5 h-1.5 bg-[#22C55E]"></span>
                <span className="font-mono text-[10px] tracking-wider">OPEN TO OPPORTUNITIES</span>
              </div>
            </motion.div>

            {/* Cell B: About Text */}
            <motion.div variants={itemVariants} className="bg-[#0A0A0A] p-8 lg:col-span-5 flex flex-col justify-between">
              <p className="text-[#C0C0BC] text-base md:text-lg leading-relaxed font-medium mb-8">
                I'm Ruthish S — a Production Engineering undergraduate at PSG College of Technology. I operate at the intersection of intelligent manufacturing, automation systems, and visual design. Currently driving a DMAIC Six Sigma project at Tata Consumer Products to reduce process loss in salt pouch packaging across four VFFS machines.
              </p>
              
              <div className="flex flex-wrap gap-2">
                {chips.map(chip => (
                  <motion.span 
                    key={chip} 
                    whileHover={{ y: -2, borderColor: '#E85002', color: '#E85002' }}
                    transition={{ duration: 0.15 }}
                    className="font-mono text-[10px] sm:text-xs px-3 py-1.5 border border-[rgba(255,255,255,0.1)] text-[#A0A09C] cursor-default"
                  >
                    {chip}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Cell C: Academic */}
            <motion.div variants={itemVariants} whileHover={{ backgroundColor: '#C44000' }} transition={{ duration: 0.2 }} className="bg-[#E85002] p-8 lg:col-span-4 flex flex-col items-center justify-center text-center cursor-default">
              {isVisible ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="font-display font-extrabold text-7xl md:text-8xl tracking-tighter text-[#0A0A0A] mb-2">
                    <CountUp end={8.50} isVisible={isVisible} />
                  </div>
                  <div className="font-mono text-xs tracking-widest text-white/80">
                    CGPA / 10.0
                  </div>
                </motion.div>
              ) : (
                <div className="h-24"></div>
              )}
            </motion.div>

            {/* Cell D: Output */}
            <motion.div variants={itemVariants} className="bg-[#141414] p-8 lg:col-span-8 flex flex-col justify-center gap-8 font-display font-bold text-3xl md:text-4xl tracking-tight">
              <div className="flex items-center gap-6 group cursor-default">
                <span className="text-[#E85002] w-12 group-hover:scale-110 transition-transform origin-left">10</span>
                <span className="text-[#F2F2F0]">COMPLETED PROJECTS</span>
              </div>
              <div className="w-full h-px bg-[#333]"></div>
              <div className="flex items-center gap-6 group cursor-default">
                <span className="text-[#E85002] w-12 group-hover:scale-110 transition-transform origin-left">4+</span>
                <span className="text-[#F2F2F0]">INTERNSHIP STINTS</span>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
