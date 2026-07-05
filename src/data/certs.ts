export interface Cert {
  id: string;
  initials: string;
  issuer: string;
  title: string;
  url: string;
  type: 'core' | 'ai' | 'programming' | 'design' | 'internship' | 'achievement' | 'leadership';
}

export const certsData: Cert[] = [
  // ── Core / Engineering ──
  {
    id: 'cert-digital-mfg',
    initials: 'DMF',
    issuer: 'Workshop · PSG Tech',
    title: 'Digital Manufacturing — Workshop Certificate',
    url: 'https://drive.google.com/file/d/1LStO7K1pdLkwslt7-ygIJ1FpoNLFdpiR/view',
    type: 'core',
  },
  {
    id: 'cert-digital-twin',
    initials: 'DT',
    issuer: 'Workshop · PSG Tech',
    title: 'Digital Twin Technology — Workshop Certificate',
    url: 'https://drive.google.com/file/d/1RKH99eBJuPJiX5SHne0zi4hbL4dWnc0m/view',
    type: 'core',
  },
  {
    id: 'cert-integrated-mfg',
    initials: 'NPT',
    issuer: 'NPTEL',
    title: 'Integrated Manufacturing — Elite Certificate',
    url: 'https://drive.google.com/file/d/1xWAJW0kpkG4iv10YoAl8_vma719Sk4hb/view',
    type: 'core',
  },
  {
    id: 'cert-additive-mfg',
    initials: 'AM',
    issuer: 'NPTEL',
    title: 'Additive Manufacturing — Elite Certificate',
    url: 'https://drive.google.com/file/d/1SRo8tEGUwfQbaUBZktb1fNzfSXMIbVp-/view',
    type: 'core',
  },
  {
    id: 'cert-instruments-seminar',
    initials: 'INS',
    issuer: 'Seminar · PSG Tech',
    title: 'Instruments & Form Measurement — Seminar',
    url: 'https://drive.google.com/file/d/1kmhGCEaZF9kdluqNytMCgfh2SqVpYagi/view',
    type: 'core',
  },
  {
    id: 'cert-waam-seminar',
    initials: 'WAAM',
    issuer: 'Seminar · PSG Tech',
    title: 'Wire Arc Additive Manufacturing (WAAM) — Seminar',
    url: 'https://drive.google.com/file/d/1kpQZO7yZx_Fd0UxGDRAMt3qLKNqIlGIR/view',
    type: 'core',
  },
  {
    id: 'cert-ev-workshop',
    initials: 'EV',
    issuer: 'Workshop · PSG Tech',
    title: 'Electric Vehicle Design — Workshop Certificate',
    url: 'https://drive.google.com/file/d/1kmc_mSMwwlihvG-ZgQXjbsE8UA-Oicgu/view',
    type: 'core',
  },
  {
    id: 'cert-vev-challenge',
    initials: 'VEV',
    issuer: 'Virtual Challenge',
    title: 'Virtual Electric Vehicle Challenge',
    url: 'https://drive.google.com/file/d/1S5qE0TSk4X-1p3hxxtjFBMLxRgFSzXjg/view',
    type: 'core',
  },
  // ── AI / ML ──
  {
    id: 'cert-elements-ai',
    initials: 'AI',
    issuer: 'Elements of AI',
    title: 'Elements of Artificial Intelligence',
    url: 'https://drive.google.com/file/d/19tg0FIQuWeCdLaTj_wVIZWFjz2A6KXfN/view',
    type: 'ai',
  },
  {
    id: 'cert-ml-kaggle',
    initials: 'KGL',
    issuer: 'Kaggle',
    title: 'Machine Learning — Kaggle Certificate',
    url: 'https://drive.google.com/file/d/1V6_tsHBiJ5hBZLtKwRwFCbeOMwWLbHn4/view',
    type: 'ai',
  },
  {
    id: 'cert-prompt-eng',
    initials: 'LLM',
    issuer: 'AWS / Coursera',
    title: 'Foundations of Prompt Engineering',
    url: 'https://drive.google.com/file/d/1COZZHbD0mqLJgKi5PE-KNzjVdv-ojU3a/view',
    type: 'ai',
  },
  // ── Programming ──
  {
    id: 'cert-matlab',
    initials: 'MAT',
    issuer: 'MathWorks',
    title: 'MATLAB Onramp — Verified Certificate',
    url: 'https://drive.google.com/file/d/1Lh6JsE2BjwTfSepHorJqX2eoAHNGj8fN/view',
    type: 'programming',
  },
  {
    id: 'cert-java',
    initials: 'JVA',
    issuer: 'Spoken Tutorial · IIT Bombay',
    title: 'Java Programming — Spoken Tutorial Certificate',
    url: 'https://drive.google.com/file/d/1jElduJ29MLPbYzv0dunk092B-NHDtUIW/view',
    type: 'programming',
  },
  // ── Design ──
  {
    id: 'cert-davinci',
    initials: 'DRV',
    issuer: 'Blackmagic Design',
    title: 'Video Editing with DaVinci Resolve',
    url: 'https://drive.google.com/file/d/1IGegkOoetkoMAtAPGA4YvMWtEpXfHtsc/view',
    type: 'design',
  },
  {
    id: 'cert-sap-fiori',
    initials: 'SAP',
    issuer: 'SAP Learning',
    title: 'Mastering SAP Fiori — UX Design',
    url: 'https://drive.google.com/file/d/12usU7Ng7hLQ3Ccs2UhmPMP-HDrzUwCwL/view',
    type: 'design',
  },
  {
    id: 'cert-sap-bi',
    initials: 'SBI',
    issuer: 'SAP Learning',
    title: 'SAP Business Objects — Business Intelligence',
    url: 'https://drive.google.com/file/d/1aMgKmG_KVvoGOkuY-lpMehrgCKIcIPz4/view',
    type: 'design',
  },
  // ── Internship ──
  {
    id: 'cert-intern-tenneco',
    initials: 'TEN',
    issuer: 'Tenneco Automotive India Pvt. Ltd.',
    title: 'Industrial Training — Internship Certificate',
    url: 'https://drive.google.com/file/d/1ie6xAdIUeq0v77FOi-oCYsXNijvNR5Fx/view',
    type: 'internship',
  },
  {
    id: 'cert-intern-qfocus',
    initials: 'QFE',
    issuer: 'Q Focus Engineering India Pvt. Ltd.',
    title: 'Industrial Training — Internship Certificate',
    url: 'https://drive.google.com/file/d/1yvenMT9mFnvomQekNuGR-c1lQVRS6WgI/view',
    type: 'internship',
  },
  {
    id: 'cert-cnc-nut',
    initials: 'CNC',
    issuer: 'PSG Industrial Training Institute',
    title: 'CNC Machining — Nut Manufacturing Certificate',
    url: 'https://drive.google.com/file/d/1GegKob8kXq9fsuSusAS08kV-pU678sUl/view',
    type: 'internship',
  },
  {
    id: 'cert-funding-workshop',
    initials: 'FND',
    issuer: 'Workshop · Tamil Nadu',
    title: 'Funding Opportunities in Tamil Nadu — Workshop',
    url: 'https://drive.google.com/file/d/1xQDr6ogTo7J7jPFKaaRuTByZSVXfG7jB/view',
    type: 'internship',
  },
  // ── Achievement ──
  {
    id: 'cert-proficiency-award',
    initials: '3RD',
    issuer: 'PSG College of Technology',
    title: 'Academic Proficiency Award — 3rd Place',
    url: 'https://drive.google.com/file/d/1qSoVj55WAP7c9aa-bL6Bh59rdTxMCQdr/view',
    type: 'achievement',
  },
  {
    id: 'cert-mechnatron',
    initials: 'MEC',
    issuer: 'CIT Coimbatore',
    title: 'Mechnatron 2k24 — Participation Certificate',
    url: 'https://drive.google.com/file/d/1krvAFwJ7QoNAVBW-70-YY22n9ENo7njF/view',
    type: 'achievement',
  },
  {
    id: 'cert-profinity',
    initials: '2ND',
    issuer: 'Pro-Finity Design Competition',
    title: 'Pro-Finity Design Competition — Second Prize',
    url: 'https://drive.google.com/file/d/16G9Kjdyyixn6ywBFbNOrHp8uVQ4fpYiN/view',
    type: 'achievement',
  },
  // ── Leadership ──
  {
    id: 'cert-iic-volunteer',
    initials: 'IIC',
    issuer: "Institution's Innovation Council",
    title: "Volunteering — Institution's Innovation Council",
    url: 'https://drive.google.com/file/d/1kuINEb_TxFINLBF-4r_O7vRCBhU9eWTQ/view',
    type: 'leadership',
  },
  {
    id: 'cert-iste',
    initials: 'ISTE',
    issuer: 'ISTE',
    title: 'ISTE Student Membership Certificate',
    url: 'https://drive.google.com/file/d/1l0FdB6lFREkAKoGH12jhGLzfe0PnOyJq/view',
    type: 'leadership',
  },
];
