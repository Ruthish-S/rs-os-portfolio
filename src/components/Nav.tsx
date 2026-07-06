import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';

const LINKS = [
  { href: '#about', label: 'Profile' },
  { href: '#skills', label: 'Tool Lab' },
  { href: '#experience', label: 'Timeline' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Vault' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;

      setScrollProgress(Number(scroll));
      setScrolled(totalScroll > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu on section navigation, resize past the mobile
  // breakpoint, or Escape — small details that make it feel finished
  // rather than just functional.
  useEffect(() => {
    if (!mobileOpen) return;
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  return (
    <>
      <div
        className="fixed top-0 left-0 h-[1px] bg-[#E85002] z-50 origin-left"
        style={{ width: '100%', transform: `scaleX(${scrollProgress})` }}
      />

      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled || mobileOpen ? 'bg-[rgba(242,242,240,0.95)] backdrop-blur-sm border-b border-[rgba(0,0,0,0.05)] py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between font-mono text-xs md:text-sm uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0A0A0A]">RS.OS</span>
            <span className="text-[#646464]">[v23]</span>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-[#646464]">
            {LINKS.map((l, i) => (
              <span key={l.href} className="flex items-center gap-6">
                {i > 0 && <span className="opacity-30">·</span>}
                <a href={l.href} className="hover:text-[#E85002] transition-colors">{l.label}</a>
              </span>
            ))}

            <Magnetic strength={12}>
              <a href="#contact" className="block ml-4 bg-[#0A0A0A] text-[#F2F2F0] px-4 py-2 hover:bg-[#E85002] transition-colors">
                [Connect]
              </a>
            </Magnetic>
          </div>

          {/* Mobile: hamburger + connect */}
          <div className="flex items-center gap-3 lg:hidden">
            <a href="#contact" className="bg-[#0A0A0A] text-[#F2F2F0] px-3 py-1.5 hover:bg-[#E85002] transition-colors">
              [Connect]
            </a>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="w-8 h-8 flex flex-col items-center justify-center gap-[5px] border border-[#0A0A0A]/20"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="w-4 h-px bg-[#0A0A0A]"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-px bg-[#0A0A0A]"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="w-4 h-px bg-[#0A0A0A]"
              />
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden border-t border-[rgba(0,0,0,0.08)] bg-[rgba(242,242,240,0.98)] backdrop-blur-sm"
            >
              <div className="container mx-auto px-6 max-w-7xl py-4 flex flex-col gap-1 font-mono text-sm uppercase tracking-wider">
                {LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * i }}
                    className="py-2.5 text-[#646464] hover:text-[#E85002] transition-colors border-b border-[rgba(0,0,0,0.06)] last:border-b-0"
                  >
                    {l.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
