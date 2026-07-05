/* ─── Technical blueprint line-art per project ──────────────
   Schematic diagrams in the reference "isometric/blueprint" style,
   recoloured for the dark orange card theme (cream stroke on orange).
   viewBox 0 0 200 200, thin strokes, monospace micro-labels. */

const STROKE = 'rgba(255,236,204,0.92)';
const STROKE_DIM = 'rgba(255,236,204,0.45)';

const wrap = (num: string, tag: string, sub: string, children: React.ReactNode) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" stroke={STROKE} fill="none" strokeWidth="0.9">
    {children}
    <text x="100" y="26" fontFamily="monospace" fontSize="7" fill={STROKE} textAnchor="middle" letterSpacing="0.5">
      M·{num} · {tag}
    </text>
    <text x="100" y="182" fontFamily="monospace" fontSize="4.5" fill={STROKE_DIM} textAnchor="middle" letterSpacing="0.5">
      {sub}
    </text>
  </svg>
);

const BLUEPRINTS: Record<string, React.ReactNode> = {
  /* CASE 01 — Adaptive AGV navigation */
  'proj-agv-navigation': wrap('01', 'AGV NAV', 'PATH PLAN · SENSOR FUSION', <>
    <rect x="70" y="120" width="60" height="34" rx="3" />
    <circle cx="82" cy="154" r="6" />
    <circle cx="118" cy="154" r="6" />
    <path d="M 100 120 L 100 40" strokeDasharray="1.5 2" opacity="0.6" />
    <path d="M 100 40 A 26 26 0 0 1 126 66" strokeDasharray="2 2" />
    <path d="M 40 100 C 60 70, 80 130, 100 100 S 140 70, 160 100" opacity="0.85" />
    {[40,70,100,130,160].map((x,i)=>(
      <circle key={i} cx={x} cy={[100,72,100,72,100][i]} r="2.2" fill={STROKE} stroke="none" />
    ))}
    <rect x="30" y="90" width="16" height="16" strokeDasharray="1.5 1.5" opacity="0.6" />
  </>),

  /* CASE 02 — Geneva mechanism */
  'proj-geneva-mechanism': wrap('02', 'GENEVA', 'INTERMITTENT MOTION', <>
    <circle cx="80" cy="100" r="34" />
    {[0,60,120,180,240,300].map((a,i)=>{
      const r1=34, x1=80+r1*Math.cos(a*Math.PI/180), y1=100+r1*Math.sin(a*Math.PI/180);
      return <line key={i} x1="80" y1="100" x2={x1} y2={y1} strokeDasharray="1.5 2" opacity="0.5" />;
    })}
    <circle cx="80" cy="100" r="5" />
    <circle cx="146" cy="100" r="14" />
    <circle cx="146" cy="100" r="3" fill={STROKE} stroke="none" />
    <line x1="146" y1="86" x2="146" y2="66" />
    <circle cx="146" cy="66" r="4" />
  </>),

  /* CASE 03 — Catapult trajectory optimisation */
  'proj-catapult-trajectory': wrap('03', 'TRAJECTORY', 'PROJECTILE MOTION', <>
    <rect x="55" y="140" width="60" height="10" />
    <line x1="65" y1="140" x2="90" y2="80" />
    <line x1="90" y1="80" x2="105" y2="95" />
    <circle cx="105" cy="95" r="4" fill={STROKE} stroke="none" />
    <path d="M 105 95 Q 135 55, 165 105" strokeDasharray="2 2" opacity="0.85" />
    <circle cx="165" cy="105" r="3" />
    <line x1="55" y1="150" x2="175" y2="150" strokeDasharray="1.5 2" opacity="0.5" />
  </>),

  /* CASE 04 — CAM optimized tool path */
  'proj-cam-toolpath': wrap('04', 'CAM PATH', 'NC CODE · MILLING', <>
    <rect x="42" y="42" width="116" height="116" />
    <path d="M 62 62 L 138 62 M 62 82 L 138 82 M 62 102 L 138 102 M 62 122 L 138 122 M 62 142 L 138 142" strokeDasharray="1.5 2" opacity="0.6" />
    <circle cx="155" cy="55" r="7" />
    <line x1="155" y1="55" x2="120" y2="90" strokeDasharray="2 2" />
    <path d="M 62 62 L 100 100 L 62 142" opacity="0.8" />
  </>),

  /* CASE 05 — 6-DOF robotic arm, multi-physics FEA & ML */
  'proj-robotic-arm-fea': wrap('05', '6-DOF ARM', 'ANSYS · FEA · ML', <>
    <circle cx="55" cy="150" r="7" />
    <line x1="55" y1="143" x2="55" y2="115" />
    <line x1="55" y1="115" x2="95" y2="95" />
    <circle cx="95" cy="95" r="4" />
    <line x1="95" y1="95" x2="130" y2="70" />
    <circle cx="130" cy="70" r="4" />
    <line x1="130" y1="70" x2="160" y2="85" />
    <path d="M 145 62 L 155 62 L 155 78" strokeDasharray="1.5 1.5" />
    <path d="M 88 88 L 102 88 L 95 102 Z" strokeDasharray="1 1" opacity="0.7" />
    <path d="M 123 63 L 137 63 L 130 77 Z" strokeDasharray="1 1" opacity="0.7" />
  </>),

  /* CASE 06 — Welding T-joint fabrication & ANSYS analysis */
  'proj-welding-tjoint': wrap('06', 'T-JOINT', 'WELD · ANSYS', <>
    <rect x="45" y="95" width="110" height="14" />
    <rect x="93" y="45" width="14" height="50" />
    <path d="M 93 95 L 79 109 M 107 95 L 121 109" strokeDasharray="1.5 1.5" />
    <path d="M 60 70 L 60 92" strokeDasharray="2 2" opacity="0.6" />
    <path d="M 140 70 L 140 92" strokeDasharray="2 2" opacity="0.6" />
    <text x="100" y="130" fontFamily="monospace" fontSize="4.5" fill={STROKE_DIM} textAnchor="middle">FILLET · σ</text>
  </>),

  /* CASE 07 — SQC & ML defect detection, aerospace turbine blades */
  'proj-sqc-ml-defect': wrap('07', 'SPC · ML', 'Cp/Cpk · ISOFOREST', <>
    <line x1="40" y1="150" x2="160" y2="150" />
    <line x1="40" y1="150" x2="40" y2="55" />
    <line x1="40" y1="75" x2="160" y2="75" strokeDasharray="2 2" opacity="0.7" />
    <line x1="40" y1="130" x2="160" y2="130" strokeDasharray="2 2" opacity="0.7" />
    <path d="M 45 105 L 60 95 L 75 112 L 90 88 L 105 100 L 120 80 L 135 118 L 150 98" />
    {[45,60,75,90,105,120,135,150].map((x,i)=>(
      <circle key={i} cx={x} cy={[105,95,112,88,100,80,118,98][i]} r="2" fill={STROKE} stroke="none" />
    ))}
    <circle cx="90" cy="88" r="5" strokeDasharray="1.5 1.5" opacity="0.8" />
  </>),

  /* CASE 08 — Automated colour-based sorting */
  'proj-colour-sorting': wrap('08', 'SORTING', 'TCS3200 · SERVO', <>
    <line x1="35" y1="120" x2="165" y2="120" />
    <line x1="35" y1="132" x2="165" y2="132" />
    {[55,85,115,145].map((x,i)=>(
      <rect key={i} x={x-6} y="108" width="12" height="6" fill={STROKE} stroke="none" opacity={0.5+0.15*i} />
    ))}
    <rect x="90" y="55" width="20" height="20" rx="3" />
    <line x1="100" y1="75" x2="100" y2="108" strokeDasharray="1.5 1.5" />
    <path d="M 130 60 L 145 60 L 145 90 L 160 90" strokeDasharray="2 2" opacity="0.7" />
  </>),

  /* CASE 09 — Smart diameter jig, ESP32 cross-drilling */
  'proj-smart-diameter-jig': wrap('09', 'JIG', 'ESP32 · SERVO · IR', <>
    <rect x="45" y="90" width="110" height="36" />
    <path d="M 65 90 L 65 68 L 105 68 L 105 90" />
    <circle cx="135" cy="108" r="7" />
    <line x1="135" y1="101" x2="135" y2="115" />
    <line x1="128" y1="108" x2="142" y2="108" />
    <path d="M 165 108 A 26 26 0 1 1 165 107.9" strokeDasharray="2 2" />
    <rect x="62" y="132" width="76" height="18" strokeDasharray="2 2" />
    <path d="M 45 105 L 60 95 L 75 112 L 90 88 L 105 100 L 120 80 L 135 118 L 150 98" />
    {[45,60,75,90,105,120,135,150].map((x,i)=>(
      <circle key={i} cx={x} cy={[95,95,112,88,100,80,118,98][i]} r="2" fill={STROKE} stroke="none" />
    ))}
  </>),

  /* CASE 10 — Engine oil condition monitor */
  'proj-engine-oil-monitor': wrap('10', 'OIL MONITOR', 'ESP32 · TCS3200 · DS18B20', <>
    <rect x="72" y="55" width="56" height="96" rx="4" />
    <line x1="100" y1="55" x2="100" y2="38" strokeDasharray="2 2" />
    <rect x="82" y="72" width="36" height="18" strokeDasharray="1.5 1.5" />
    <rect x="82" y="98" width="36" height="18" strokeDasharray="1.5 1.5" />
    <rect x="82" y="126" width="36" height="10" fill={STROKE} stroke="none" opacity="0.85" />
  </>),
};

export function getBlueprint(id: string): React.ReactNode {
  return BLUEPRINTS[id] ?? wrap('XX', 'CASE FILE', 'RS.OS', <rect x="50" y="50" width="100" height="100" />);
}
