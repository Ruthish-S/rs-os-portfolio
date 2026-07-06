import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import About from '../components/About';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Tools from '../components/Tools';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Leadership from '../components/Leadership';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SectionDivider from '../components/SectionDivider';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <SectionDivider label="/02 — Academic Record" from="#0A0A0A" to="#E8E8E4" textOn="light" />
      <Education />
      <SectionDivider label="/03 — Tool Lab" from="#E8E8E4" to="#0A0A0A" textOn="dark" />
      <Skills />
      <SectionDivider label="/03b — Engineering Toolchain" from="#0A0A0A" to="#F2F2F0" textOn="light" />
      <Tools />
      <SectionDivider label="/04 — Timeline" from="#F2F2F0" to="#0A0A0A" textOn="dark" />
      <Experience />
      <SectionDivider label="/05 — Project Database" from="#0A0A0A" to="#F2F2F0" textOn="light" />
      <Projects />
      <Certifications />
      <Leadership />
      <SectionDivider label="/08 — Comm Terminal" from="#F2F2F0" to="#0A0A0A" textOn="dark" />
      <Contact />
      <Footer />
    </>
  );
}
