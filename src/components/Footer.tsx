import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { lenisScrollTo } from '../hooks/useLenis';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import Magnetic from './Magnetic';

export default function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => lenisScrollTo(0);

  return (
    <motion.footer
      ref={ref as React.RefObject<HTMLElement>}
      initial={{ opacity: 0, y: 16 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#0A0A0A] text-[#F2F2F0] border-t border-[#333] py-6 relative"
    >
      <div className="container mx-auto px-6 max-w-[1400px] flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[9px] sm:text-[10px] tracking-widest uppercase">
        
        {/* Left Stats */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[#A0A09C] justify-center md:justify-start">
          <span>CPU NORMAL</span>
          <span className="hidden sm:inline">|</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full"></span>NETWORK CONNECTED</span>
          <span className="hidden sm:inline">|</span>
          <span>VERSION 12.0</span>
          <span className="hidden sm:inline">|</span>
          <span>ACCESS PUBLIC</span>
        </div>

        {/* Right Copyright */}
        <div className="text-[#646464] text-center md:text-right">
          © 2026 RUTHISH S · PSG TECH · PRODUCTION ENGINEERING '27
        </div>
      </div>

      {/* Back to Top Button */}
      <Magnetic
        strength={10}
        className={`fixed bottom-6 right-6 z-40 transition-opacity duration-300 ${
          showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <button
          onClick={scrollToTop}
          className="w-8 h-8 border border-[#333] bg-[#141414] text-[#F2F2F0] flex items-center justify-center hover:bg-[#E85002] hover:border-[#E85002] transition-colors"
          aria-label="Back to top"
        >
          ↑
        </button>
      </Magnetic>
    </motion.footer>
  );
}
