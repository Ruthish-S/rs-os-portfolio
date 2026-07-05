import { motion } from 'framer-motion';

export default function Marquee() {
  const text = "Production Engineer ✦ IIoT & Automation ✦ CAD / CAM ✦ Lean Six Sigma ✦ DMAIC · TCPL ✦ Visual Design ✦ PSG Tech '27 ✦ AGV Systems ✦ Smart Manufacturing ✦ ";
  
  return (
    <div className="bg-[#E85002] text-[#F2F2F0] py-3 overflow-hidden flex whitespace-nowrap font-mono text-xs tracking-wider uppercase border-y border-[#0A0A0A]">
      <motion.div
        className="flex shrink-0 gap-4"
        animate={{ x: [0, "-50%"] }}
        transition={{ ease: "linear", duration: 25, repeat: Infinity }}
      >
        <span className="pl-4">{text}</span>
        <span className="pl-4">{text}</span>
        <span className="pl-4">{text}</span>
        <span className="pl-4">{text}</span>
      </motion.div>
    </div>
  );
}
