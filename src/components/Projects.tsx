import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { createPortal } from 'react-dom';
import { projectsData } from '../data/projects';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { getBlueprint } from '../lib/blueprints';

/* ─── Seeded ASCII art panel ─────────────────────────────── */
// Generates a unique generative ASCII pattern per card using the project index as seed.
// Characters rendered in light-yellow on the orange bg to mimic the halftone silhouette look.
const AsciiArtPanel = ({ seed }: { seed: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.clientWidth  || 400;
    const H = canvas.clientHeight || 240;
    canvas.width  = W * window.devicePixelRatio;
    canvas.height = H * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const CHAR_SIZE = 9;
    const CHARS = ['█', '▓', '▒', '░', '·', '+', '×', ' ', ' ', ' '];

    // Seeded float in [0,1]
    const seededRand = (x: number, y: number) => {
      const n = Math.sin(x * 127.1 + y * 311.7 + seed * 91.3) * 43758.5453;
      return n - Math.floor(n);
    };

    ctx.font = `${CHAR_SIZE}px "IBM Plex Mono", monospace`;
    ctx.textBaseline = 'top';

    const cols = Math.ceil(W / CHAR_SIZE) + 1;
    const rows = Math.ceil(H / CHAR_SIZE) + 1;

    // Unique shape per seed: combination of 2 offset ellipses + wave
    const cx1 = 0.3 + 0.4 * Math.sin(seed * 1.7);
    const cy1 = 0.3 + 0.4 * Math.cos(seed * 2.3);
    const cx2 = 0.6 + 0.3 * Math.sin(seed * 0.9);
    const cy2 = 0.55 + 0.3 * Math.cos(seed * 1.1);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const nx = i / cols;
        const ny = j / rows;

        const d1 = Math.sqrt(((nx - cx1) * 1.4) ** 2 + ((ny - cy1) * 0.9) ** 2);
        const d2 = Math.sqrt(((nx - cx2) * 1.1) ** 2 + ((ny - cy2) * 1.3) ** 2);

        const wave = Math.sin(nx * 8 + seed * 1.3) * Math.cos(ny * 6 + seed * 0.7) * 0.25;
        const noise = (seededRand(i, j) - 0.5) * 0.3;

        // density: 0 = background (sparse), 1 = foreground (dense)
        const density = Math.max(0, 1 - Math.min(d1, d2) * 2.2 + wave + noise);

        const charIdx = Math.floor((1 - density) * (CHARS.length - 1));
        const char = CHARS[Math.max(0, Math.min(CHARS.length - 1, charIdx))];
        if (char === ' ') continue;

        // Light yellow-cream on orange bg, opacity driven by density
        const alpha = Math.min(0.85, 0.25 + density * 0.7);
        ctx.fillStyle = `rgba(255, 218, 120, ${alpha})`;
        ctx.fillText(char, i * CHAR_SIZE, j * CHAR_SIZE);
      }
    }
  }, [seed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40"
      aria-hidden="true"
    />
  );
};

/* ─── Blueprint art panel: technical line-art + tilt/hover motion ── */
const BlueprintPanel = ({ projectId, seed }: { projectId: string; seed: number }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });
  const scale = useSpring(1, { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { mx.set(0); my.set(0); scale.set(1); };
  const handleEnter = () => scale.set(1.06);

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="absolute inset-0"
      style={{ perspective: 600 }}
    >
      {/* Faint generative texture underneath, for depth */}
      <AsciiArtPanel seed={seed} />

      {/* Blueprint grid lines */}
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,236,204,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,236,204,0.5) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Technical drawing — tilts toward cursor, scales on hover */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center p-6"
        style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d' }}
      >
        <div className="w-[74%] h-[74%]">
          {getBlueprint(projectId)}
        </div>
      </motion.div>
    </div>
  );
};

/* ─── Stacked project card ───────────────────────────────────
   Each card pins itself (position: sticky) with an increasing top
   offset per index, so as you scroll, cards stack on top of one
   another like a deck — the next card slides up and covers the
   previous one, which settles back and dims slightly beneath it. ── */
/* ─── Pitch-deck style project stack ─────────────────────────
   One "stage" area. The current project renders as a full card at
   the front; up to 3 previously-viewed cards pile up behind it as
   thin receding header strips (like a stack of slides), matching a
   physical pitch-deck. Advancing is driven by scrolling through the
   pinned stage, plus explicit prev/next controls and keyboard arrows
   for click/hover-only interaction too. Clicking the front card opens
   the full case-file drawer. ── */

const DeckFrontCard = ({
  project,
  index,
  total,
  onClick,
}: {
  project: typeof projectsData[0];
  index: number;
  total: number;
  onClick: () => void;
}) => {
  const bullets = project.tags.slice(0, 4).map(t => t.toUpperCase());

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -14, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      role="button"
      tabIndex={0}
      aria-label={`Open case file: ${project.title}`}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      whileHover={{ y: -6 }}
      className="group cursor-pointer absolute inset-x-0 bottom-0 flex flex-col md:flex-row bg-[#0A0A0A] border border-[#0A0A0A] shadow-[0_28px_70px_-15px_rgba(0,0,0,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E85002] overflow-hidden"
      style={{ height: 'min(78vh, 560px)', zIndex: 50 }}
    >
      {/* ── Blueprint art panel ── */}
      <div className="relative bg-[#E85002] overflow-hidden md:w-[42%] shrink-0 h-[42%] md:h-full">
        <BlueprintPanel projectId={project.id} seed={index} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(10,10,10,0.55)] md:bg-gradient-to-r md:from-transparent md:to-[rgba(10,10,10,0.5)] pointer-events-none" />
        <div className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.2em] text-[rgba(255,218,120,0.75)] select-none">
          CASE /{project.case} · {project.category}
        </div>
        <div className="absolute top-4 right-4 font-mono text-[9px] tracking-widest text-[rgba(255,218,120,0.55)] select-none">
          {project.year} · {index + 1}/{total}
        </div>
      </div>

      {/* ── Dark content panel ── */}
      <div className="bg-[#0A0A0A] flex-1 p-6 md:p-10 flex flex-col gap-4 md:gap-5 justify-center overflow-y-auto">
        <h3 className="font-display text-xl md:text-3xl font-bold text-[#F2F2F0] leading-tight group-hover:text-[#E85002] transition-colors">
          {project.title}
        </h3>

        <p className="font-mono text-[11px] md:text-xs text-[#A0A09C] leading-relaxed max-w-xl">
          {project.problem.split('.')[0]}.
        </p>

        <div className="flex flex-wrap gap-2 mt-1">
          {bullets.map((b) => (
            <span key={b} className="font-mono text-[9px] md:text-[10px] text-[#C0C0BC] border border-[#333] px-2 py-1 tracking-wider leading-none">
              {b}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-2 md:mt-4 font-mono text-[10px] text-[#646464]">
          <span className="w-7 h-7 bg-[#141414] border border-[#333] flex items-center justify-center group-hover:bg-[#E85002] group-hover:border-[#E85002] transition-colors">
            <span className="text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform inline-block">→</span>
          </span>
          <span className="tracking-widest uppercase">Open full case file</span>
        </div>
      </div>
    </motion.div>
  );
};

/** Thin receding header strip for a previously-viewed card, peeking out behind the front card. */
const DeckPeekStrip = ({ project, layer }: { project: typeof projectsData[0]; layer: number }) => {
  const inset = layer * 14;      // narrows as it recedes
  const yOffset = layer * 16;    // rises further back
  const opacity = Math.max(0.18, 0.62 - layer * 0.16);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity, y: -yOffset }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[#141414] border border-[#333] px-5"
      style={{
        height: 46,
        left: inset, right: inset,
        zIndex: 50 - layer,
      }}
    >
      <span className="font-mono text-[9px] tracking-widest text-[#8A8A86] uppercase truncate">
        CASE /{project.case} · {project.title}
      </span>
      <span className="font-mono text-[9px] text-[#646464] shrink-0">{project.year}</span>
    </motion.div>
  );
};

const ProjectDeck = ({
  projects,
  onSelect,
}: {
  projects: typeof projectsData;
  onSelect: (p: typeof projectsData[0]) => void;
}) => {
  const total = projects.length;
  const stageRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lockRef = useRef(false);

  // Kept in a ref so the wheel closure below always reads the latest index
  // without having to re-bind the event listener on every change.
  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex;

  useEffect(() => { setCurrentIndex(0); }, [total]);

  const goTo = (idx: number) => setCurrentIndex(Math.max(0, Math.min(total - 1, idx)));

  // Advancing the deck never touches page scroll — it's driven only by
  // click (prev/next, dots) or, as a bonus while the pointer is right over
  // the stage, the mouse wheel. The moment the wheel would take you past
  // the first/last card, or the moment the pointer leaves, normal page
  // scrolling (via Lenis) takes back over immediately — so you're never
  // stuck scrolling through all ten cards to reach the next section.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    // Hover-driven wheel takeover only makes sense with a real mouse — on
    // touch devices there's no persistent "hover" (browsers can fire a
    // synthetic mouseenter after a tap with no matching mouseleave), which
    // would risk leaving Lenis permanently stopped. Touch users simply use
    // the prev/next/dot controls instead, and normal scrolling is never
    // touched.
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onEnter = () => window.__lenis?.stop();
    const onLeave = () => window.__lenis?.start();

    const onWheel = (e: WheelEvent) => {
      const forward = e.deltaY > 0;
      const canMove = forward ? currentIndexRef.current < total - 1 : currentIndexRef.current > 0;
      if (!canMove) {
        // At a boundary — let the page scroll normally instead of trapping the user.
        window.__lenis?.start();
        return;
      }
      e.preventDefault();
      if (lockRef.current) return;
      lockRef.current = true;
      setCurrentIndex((i) => Math.max(0, Math.min(total - 1, i + (forward ? 1 : -1))));
      setTimeout(() => { lockRef.current = false; }, 500);
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    // Failsafe: if the tab loses focus (or the pointer leaves the window
    // entirely) while "hovered", make sure scrolling isn't left stuck off.
    window.addEventListener('blur', onLeave);
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('blur', onLeave);
      el.removeEventListener('wheel', onWheel);
      window.__lenis?.start();
    };
  }, [total]);

  const behindLayers = [1, 2, 3]
    .map((layer) => currentIndex - layer)
    .filter((i) => i >= 0);

  return (
    <div ref={stageRef} className="relative" style={{ height: 'min(78vh, 560px)' }}>
      <AnimatePresence>
        {behindLayers.slice().reverse().map((i) => (
          <DeckPeekStrip key={projects[i].id} project={projects[i]} layer={currentIndex - i} />
        ))}
        <DeckFrontCard
          key={projects[currentIndex].id}
          project={projects[currentIndex]}
          index={currentIndex}
          total={total}
          onClick={() => onSelect(projects[currentIndex])}
        />
      </AnimatePresence>

      {/* Deck controls */}
      <div className="absolute left-0 right-0 -bottom-14 flex items-center justify-between font-mono text-[10px] text-[#8A8A86]">
        <button
          onClick={() => goTo(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-3 py-1.5 border border-[#333] hover:border-[#E85002] hover:text-[#E85002] disabled:opacity-30 disabled:hover:border-[#333] disabled:hover:text-[#8A8A86] transition-colors"
        >
          ← PREV
        </button>
        <div className="flex items-center gap-1.5">
          {projects.map((p, i) => (
            <button
              key={p.id}
              aria-label={`Go to case ${p.case}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all ${i === currentIndex ? 'w-5 bg-[#E85002]' : 'w-1.5 bg-[#333] hover:bg-[#646464]'}`}
            />
          ))}
        </div>
        <button
          onClick={() => goTo(currentIndex + 1)}
          disabled={currentIndex === total - 1}
          className="flex items-center gap-2 px-3 py-1.5 border border-[#333] hover:border-[#E85002] hover:text-[#E85002] disabled:opacity-30 disabled:hover:border-[#333] disabled:hover:text-[#8A8A86] transition-colors"
        >
          NEXT →
        </button>
      </div>
    </div>
  );
};

/* ─── Fullscreen drawer ──────────────────────────────────── */
const Drawer = ({
  isOpen, onClose, project,
}: {
  isOpen: boolean;
  onClose: () => void;
  project: typeof projectsData[0] | null;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose(); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && project && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0A0A0A]/80 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            role="dialog"
            aria-modal="true"
            className="fixed top-0 right-0 h-[100dvh] w-full max-w-[820px] bg-[#F2F2F0] z-[101] overflow-y-auto border-l border-[#0A0A0A]"
          >
            {/* Sticky header */}
            <div className="sticky top-0 bg-[#F2F2F0] z-10 border-b border-[#0A0A0A] px-6 py-4 flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest text-[#646464] uppercase">
                RS.OS · PROJECT DATABASE · CASE FILE VIEWER
              </span>
              <button
                onClick={onClose}
                className="bg-[#0A0A0A] text-[#F2F2F0] hover:bg-[#E85002] transition-colors px-4 py-2 font-mono text-xs uppercase tracking-wider"
              >
                [CLOSE ×]
              </button>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 lg:p-16">
              <div className="font-mono text-[#E85002] text-sm tracking-widest mb-4 uppercase">
                CASE /{project.case} · {project.category}
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A0A0A] leading-tight mb-6">
                {project.title}
              </h2>
              <div className="font-mono text-sm text-[#646464] flex flex-wrap gap-x-4 gap-y-2 mb-12 border-b border-[#DEDEDA] pb-8">
                <span>{project.organization}</span>
                <span className="text-[#C0C0BC]">|</span>
                <span>{project.date}</span>
                <span className="text-[#C0C0BC]">|</span>
                <span>{project.teamMembers}</span>
              </div>

              <div className="space-y-12">
                {([
                  ['01.', 'Problem Statement', project.problem],
                  ['02.', 'Methodology & Approach', project.approach],
                  ['03.', 'Outcome & Impact', project.outcome],
                ] as [string, string, string][]).map(([num, heading, body]) => (
                  <section key={num}>
                    <h3 className="font-mono text-lg font-medium tracking-wider mb-4 pb-2 border-b border-[rgba(0,0,0,0.1)] flex items-center gap-3">
                      <span className="text-[#E85002]">{num}</span> {heading}
                    </h3>
                    <p className="text-lg leading-relaxed">{body}</p>
                  </section>
                ))}
              </div>

              <div className="mt-16 pt-8 border-t border-[#DEDEDA]">
                <div className="font-mono text-xs text-[#646464] uppercase tracking-wider mb-4">Applied Technologies</div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs px-3 py-1.5 border border-[#A0A09C] text-[#0A0A0A] bg-white">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

/* ─── Projects section ───────────────────────────────────── */
export default function Projects() {
  const [filter, setFilter] = useState('ALL');
  const [selected, setSelected] = useState<typeof projectsData[0] | null>(null);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const filters = ['ALL', 'AUTOMATION', 'MECHANICAL', 'CAM', 'INDUSTRY'];
  const filterMap: Record<string, string[]> = {
    AUTOMATION: ['AUTOMATION', 'ROBOTICS'],
    MECHANICAL: ['MECHANICAL', 'MECHANICS', 'JIGS'],
    CAM:        ['CAM'],
    INDUSTRY:   ['SENSORS', 'INDUSTRY'],
  };

  const visible = filter === 'ALL'
    ? projectsData
    : projectsData.filter(p => (filterMap[filter] ?? []).includes(p.category));

  return (
    <section id="projects" className="py-24 bg-[#F2F2F0]">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="mb-12 border-b border-[#DEDEDA] pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[#E85002] text-xs tracking-[0.2em] mb-4">
                MODULE /05 — PROJECT_DATABASE
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0A] mb-2">
                Engineering Case Files
              </h2>
              <p className="font-mono text-sm text-[#646464]">
                10 classified projects. Click any case to open the full report.
              </p>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`font-mono text-[10px] px-4 py-2 border transition-colors ${
                    filter === f
                      ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                      : 'border-[#C0C0BC] text-[#646464] hover:border-[#0A0A0A] hover:text-[#0A0A0A]'
                  }`}
                >
                  {f}{f === 'ALL' && ' [10]'}
                </button>
              ))}
            </div>
          </div>

          {/* Pitch-deck style fan stack. Click the front card to open its
              case file. Use prev/next/dots, or hover directly over the
              stage and scroll to flip through cards — move the pointer
              away (or reach the first/last card) and normal page
              scrolling takes right back over, so you're never stuck
              scrolling through all ten to reach the next section. */}
          <div className="pb-24">
            <div className="relative mb-20">
              <ProjectDeck projects={visible} onSelect={(p) => setSelected(p)} />
            </div>
            <div className="text-center font-mono text-[9px] text-[#646464] tracking-widest uppercase">
              hover the stage to flip cards · scroll away anytime to continue ↓
            </div>
          </div>
        </motion.div>
      </div>

      <Drawer
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        project={selected}
      />
    </section>
  );
}
