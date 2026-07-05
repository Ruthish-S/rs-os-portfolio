import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function Contact() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'invalid' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setStatus('invalid');
      return;
    }

    setStatus('sending');

    // Simulate transmission delay for the physical feel
    setTimeout(() => {
      // Create mailto link
      const mailtoLink = `mailto:contactruthish@gmail.com?subject=${encodeURIComponent(formState.subject)}&body=${encodeURIComponent(`From: ${formState.name} (${formState.email})\n\n${formState.message}`)}`;
      window.location.href = mailtoLink;
      
      setStatus('sent');
      
      // Reset form after delay
      setTimeout(() => {
        setFormState({ name: '', email: '', subject: '', message: '' });
        setStatus('idle');
      }, 3500);
    }, 800);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (status === 'invalid') setStatus('idle');
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0A0A] text-[#F2F2F0]">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="mb-12 border-b border-[#333] pb-6">
            <div className="font-mono text-[#E85002] text-xs tracking-[0.2em] mb-4">
              MODULE /08 — COMM_TERMINAL
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Get In Touch
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Left: Contact Form */}
            <div className="bg-[#141414] border border-[#333] relative">
              <div className="absolute top-0 left-0 bg-[#E85002] text-white font-mono text-[10px] tracking-wider px-4 py-1 -mt-px -ml-px">
                COMMUNICATION TERMINAL
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 pt-12">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block font-mono text-xs text-[#A0A09C] mb-2 uppercase">Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                      className="w-full bg-[#0A0A0A] border border-[#333] focus:border-[#E85002] outline-none px-4 py-3 font-mono text-sm text-[#F2F2F0] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-mono text-xs text-[#A0A09C] mb-2 uppercase flex justify-between">
                      <span>Email</span>
                      {status === 'invalid' && <span className="text-[#E85002]">Please enter a valid email address.</span>}
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      className={`w-full bg-[#0A0A0A] border outline-none px-4 py-3 font-mono text-sm text-[#F2F2F0] transition-colors ${status === 'invalid' ? 'border-[#E85002]' : 'border-[#333] focus:border-[#E85002]'}`}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-mono text-xs text-[#A0A09C] mb-2 uppercase">Subject</label>
                    <input 
                      type="text" 
                      id="subject"
                      name="subject"
                      required
                      value={formState.subject}
                      onChange={handleInputChange}
                      className="w-full bg-[#0A0A0A] border border-[#333] focus:border-[#E85002] outline-none px-4 py-3 font-mono text-sm text-[#F2F2F0] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-mono text-xs text-[#A0A09C] mb-2 uppercase">Message</label>
                    <textarea 
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formState.message}
                      onChange={handleInputChange}
                      className="w-full bg-[#0A0A0A] border border-[#333] focus:border-[#E85002] outline-none px-4 py-3 font-mono text-sm text-[#F2F2F0] transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === 'sending' || status === 'sent'}
                    className={`w-full py-4 font-mono text-sm tracking-widest uppercase transition-colors flex items-center justify-center gap-3 ${
                      status === 'sent' 
                        ? 'bg-[#22C55E] text-[#0A0A0A] cursor-default' 
                        : status === 'sending'
                        ? 'bg-[#E85002]/70 text-white cursor-wait'
                        : 'bg-[#E85002] hover:bg-[#C44000] text-white'
                    }`}
                  >
                    {status === 'idle' || status === 'invalid' ? (
                      <>TRANSMIT MESSAGE →</>
                    ) : status === 'sending' ? (
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                        TRANSMITTING...
                      </span>
                    ) : (
                      <>TRANSMITTED ✓</>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Direct Lines */}
            <div className="flex flex-col justify-center">
              <p className="text-[#C0C0BC] text-lg font-medium leading-relaxed mb-10">
                Currently interning at Tata Consumer Products Ltd. Open to new opportunities from mid-2026. Graduating March 2027.
              </p>

              <div className="space-y-4 mb-12">
                <motion.a
                  href="mailto:contactruthish@gmail.com"
                  whileHover={{ x: 8, borderColor: '#E85002', backgroundColor: '#171717' }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-6 p-4 border border-[#333] group bg-[#141414]"
                >
                  <motion.span whileHover={{ scale: 1.25, rotate: -8 }} transition={{ type: 'spring', stiffness: 300, damping: 12 }} className="text-xl">✉️</motion.span>
                  <div className="font-mono">
                    <div className="text-[10px] text-[#A0A09C] uppercase tracking-wider mb-1">Email</div>
                    <div className="text-[#F2F2F0] group-hover:text-[#E85002] transition-colors">contactruthish@gmail.com</div>
                  </div>
                </motion.a>

                <motion.a
                  href="tel:+919361735535"
                  whileHover={{ x: 8, borderColor: '#E85002', backgroundColor: '#171717' }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-6 p-4 border border-[#333] group bg-[#141414]"
                >
                  <motion.span whileHover={{ scale: 1.25, rotate: -8 }} transition={{ type: 'spring', stiffness: 300, damping: 12 }} className="text-xl">📞</motion.span>
                  <div className="font-mono">
                    <div className="text-[10px] text-[#A0A09C] uppercase tracking-wider mb-1">Phone</div>
                    <div className="text-[#F2F2F0] group-hover:text-[#E85002] transition-colors">+91 93617 35535</div>
                  </div>
                </motion.a>

                <motion.a
                  href="https://linkedin.com/in/ruthish-s"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 8, borderColor: '#E85002', backgroundColor: '#171717' }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-6 p-4 border border-[#333] group bg-[#141414]"
                >
                  <motion.span whileHover={{ scale: 1.25, rotate: -8 }} transition={{ type: 'spring', stiffness: 300, damping: 12 }} className="text-xl">💼</motion.span>
                  <div className="font-mono">
                    <div className="text-[10px] text-[#A0A09C] uppercase tracking-wider mb-1">LinkedIn</div>
                    <div className="text-[#F2F2F0] group-hover:text-[#E85002] transition-colors">linkedin.com/in/ruthish-s</div>
                  </div>
                </motion.a>
              </div>

              <div className="inline-flex items-center gap-3 border border-[#E85002] px-4 py-2 w-fit bg-[#E85002]/10">
                <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></span>
                <span className="font-mono text-xs tracking-widest text-[#E85002] uppercase font-bold">OPEN TO OPPORTUNITIES</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
