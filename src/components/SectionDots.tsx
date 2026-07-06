import { useState, useEffect } from 'react';

export default function SectionDots() {
  const [activeSection, setActiveSection] = useState('hero');
  
  const sections = [
    { id: 'hero', name: 'ROOT' },
    { id: 'about', name: '/01 ENGINEER_PROFILE' },
    { id: 'education', name: '/02 ACADEMIC' },
    { id: 'skills', name: '/03 TOOL_LAB' },
    { id: 'tools', name: '/03b TOOLCHAIN' },
    { id: 'experience', name: '/04 TIMELINE' },
    { id: 'projects', name: '/05 PROJECTS' },
    { id: 'certifications', name: '/06 CERT_VAULT' },
    { id: 'leadership', name: '/07 CAMPUS_NODES' },
    { id: 'contact', name: '/08 COMM_TERMINAL' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const pageYOffset = window.scrollY;
      let newActiveSection = sections[0].id;
      
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          // Offset by half window height for natural activation
          if (pageYOffset >= offsetTop - window.innerHeight / 2) {
            newActiveSection = section.id;
          }
        }
      });
      
      setActiveSection(newActiveSection);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
      {sections.map(section => (
        <a 
          key={section.id} 
          href={`#${section.id}`}
          className="group relative flex items-center justify-end"
          aria-label={`Scroll to ${section.name}`}
        >
          <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] font-mono bg-[#0A0A0A] text-[#F2F2F0] px-2 py-1 uppercase tracking-wider">
            {section.name}
          </span>
          <div 
            className={`w-1.5 h-1.5 rounded-none transition-colors duration-300 ${
              activeSection === section.id ? 'bg-[#E85002]' : 'bg-[#C0C0BC] group-hover:bg-[#A0A09C]'
            }`}
          />
        </a>
      ))}
    </div>
  );
}
