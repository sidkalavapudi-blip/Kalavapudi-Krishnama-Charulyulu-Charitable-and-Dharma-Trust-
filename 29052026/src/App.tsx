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
import { ArrowUp, PhoneCall, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedTemple, setSelectedTemple] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  // Scrollspy & Scroll-to-top detection
  useEffect(() => {
    const handleScroll = () => {
      // Show/Hide back to top
      setShowScrollTop(window.scrollY > 400);

      // Simple bounding calculations for scrollspy
      const sections = ['home', 'about', 'temples', 'gallery', 'donate', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSupportTemple = (templeName: string) => {
    setSelectedTemple(templeName);
    const element = document.getElementById('donate');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveSection('donate');
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
              <strong>Registration Code: VSP/BK4/108/2026</strong> | Donation records, receipts, and statutory details are maintained for transparent public service.
            </span>
            <button
              onClick={() => setShowNotification(false)}
              className="ml-3 font-extrabold text-orange-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Dismiss banner"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main sticky navigation */}
      <Navbar activeSection={activeSection} setActiveSection={scrollToSection} />

      {/* Content sections mounts */}
      <main className="relative">
        <Hero onNavigate={scrollToSection} />
        <About />
        <Temples onSelectTemple={handleSupportTemple} />
        <Gallery />
        <DonationForm
          selectedTempleFromCard={selectedTemple}
          setSelectedTempleFromCard={setSelectedTemple}
        />
        <Contact />
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
