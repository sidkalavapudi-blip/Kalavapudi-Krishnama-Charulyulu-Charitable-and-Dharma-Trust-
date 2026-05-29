/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Temples from './components/Temples';
import DonationForm from './components/DonationForm';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ArrowUp, PhoneCall, ShieldCheck, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedTemple, setSelectedTemple] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  // Scroll-to-top detection
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSupportTemple = (templeName: string) => {
    setSelectedTemple(templeName);
    setActiveSection('donate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-amber-50/20 text-stone-800 min-h-screen selection:bg-orange-500 selection:text-white">
      
      {/* Dynamic Trust Compliancy Alerts Banner */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-amber-950 text-amber-200 text-center py-2.5 px-4 text-[10px] sm:text-xs font-semibold flex items-center justify-center gap-2 border-b border-orange-500/30 relative z-50 mt-0"
            id="compliancy_notification_banner"
          >
            <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
            <span>
              <strong>Registration Code: VSP/BK4/108/2026</strong> | 80G & FCRA Compliant Donations qualify for active income-tax exemptions.
            </span>
            <button
              onClick={() => setShowNotification(false)}
              className="ml-3 font-extrabold text-orange-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Dismiss banner"
            >
              [✕]
            </button>
          </motion.div>
        )}
      </AnimatePresence>

       {/* Main sticky navigation */}
      <Navbar activeSection={activeSection} setActiveSection={scrollToSection} />

      {/* Content sections mounts */}
      <main className={`relative min-h-[60vh] ${activeSection !== 'home' ? 'pt-36 sm:pt-44' : 'pt-24 sm:pt-28'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {activeSection === 'home' && <Hero onNavigate={scrollToSection} />}
            {activeSection === 'about' && <About />}
            {activeSection === 'temples' && <Temples onSelectTemple={handleSupportTemple} />}
            {activeSection === 'gallery' && <Gallery />}
            {activeSection === 'donate' && (
              <DonationForm
                selectedTempleFromCard={selectedTemple}
                setSelectedTempleFromCard={setSelectedTemple}
              />
            )}
            {activeSection === 'contact' && <Contact />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Ground Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Side floats widgets */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40" id="floating_controls">
        
        {/* Floating Call Assistance button */}
        <a
          href="tel:+919440123456"
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all text-xs font-bold ring-4 ring-orange-100"
          title="Direct Support Hotline"
        >
          <PhoneCall className="w-5 h-5 animate-pulse" />
        </a>

        {/* Floating Scroll To Top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => scrollToSection('home')}
              className="w-12 h-12 rounded-full bg-amber-950 text-white flex items-center justify-center shadow-lg hover:bg-amber-900 transition-all cursor-pointer border border-amber-900"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
}

