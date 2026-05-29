/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Landmark, Compass, PhoneCall, HeartHandshake, Image as ImageIcon, BookOpen } from 'lucide-react';
import { TRUST_META } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'about', label: 'About Us', icon: BookOpen },
    { id: 'temples', label: 'Temples', icon: Landmark },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'donate', label: 'Donations', icon: HeartHandshake },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        id="app_navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-amber-50/98 backdrop-blur-lg shadow-lg border-b border-amber-200'
            : 'bg-gradient-to-b from-amber-50/95 via-amber-50/80 to-amber-50/10 backdrop-blur-xs'
        }`}
      >
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${scrolled ? 'py-1 sm:py-2' : 'py-3 sm:py-4'}`}>
          <div className="flex justify-between items-center h-20 gap-x-6 sm:gap-x-10">
            {/* Logo and Brand Title */}
            <div
              className="flex items-center space-x-3 sm:space-x-4 cursor-pointer group shrink-0"
              onClick={() => handleNavClick('home')}
              id="brand_logo_section"
            >
              <img
                src="/src/assets/images/trust_logo_1780041770605.png"
                alt="Trust Logo"
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-full shadow-md border-2 border-amber-300 bg-white p-0.5 group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="text-amber-950 font-serif font-bold text-sm sm:text-lg tracking-wide leading-tight line-clamp-2 max-w-xs sm:max-w-md">
                  Kalavapudi Krishnamacharyulu
                </span>
                <span className="text-orange-700 font-sans text-[10px] sm:text-[11px] font-extrabold tracking-widest uppercase mt-0.5">
                  Memorial Charitable and Dharma Trust
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-5" id="desktop_nav_links">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav_btn_${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-4 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-colors duration-200 flex items-center space-x-2 cursor-pointer shrink-0 ${
                      isActive
                        ? 'text-orange-700 font-extrabold bg-amber-100/50'
                        : 'text-amber-950/90 hover:text-orange-600 hover:bg-amber-100/30'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-orange-600 to-yellow-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}

              <button
                id="cta_nav_donate"
                onClick={() => handleNavClick('donate')}
                className="ml-6 px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md hover:shadow-lg hover:from-orange-700 hover:to-amber-600 transition-all cursor-pointer flex items-center space-x-1.5 shrink-0"
              >
                <HeartHandshake className="w-4.5 h-4.5" />
                <span>Donate Now</span>
              </button>
            </div>

            {/* Right Compliance Tag on desktop */}
            <div className="hidden xl:flex items-center space-x-2 text-xs bg-amber-100/90 border border-amber-300 px-3.5 py-1.5 rounded-full text-amber-950 font-bold shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>80G & FCRA Compliant</span>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center">
              <button
                id="mobile_menu_toggle"
                onClick={() => setIsOpen(!isOpen)}
                className="text-amber-950 p-2 rounded-md hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Under Construction slow horizontal crawling marquee - positioned in the bottom section of this navbar element */}
        <div 
          id="under_construction_marquee_crawler" 
          className="w-full bg-orange-600 text-amber-50 uppercase font-mono text-[9px] sm:text-xs py-1.5 sm:py-2 tracking-widest border-t border-amber-500 overflow-hidden flex select-none"
        >
          <div className="flex animate-marquee whitespace-nowrap gap-x-12 shrink-0">
            <span>⚠️ WEBSITE UNDER ROUTINE CONSTRUCTION &amp; GENERAL REMODELING • DIGITAL ARCHIVE MODE IN PROGRESS • RECLAMATION CAMPAIGNS FULLY SIMULATED • 80G INCOME TAX BENEFITS SIMULATOR ENGAGED</span>
            <span>⚠️ WEBSITE UNDER ROUTINE CONSTRUCTION &amp; GENERAL REMODELING • DIGITAL ARCHIVE MODE IN PROGRESS • RECLAMATION CAMPAIGNS FULLY SIMULATED • 80G INCOME TAX BENEFITS SIMULATOR ENGAGED</span>
            <span>⚠️ WEBSITE UNDER ROUTINE CONSTRUCTION &amp; GENERAL REMODELING • DIGITAL ARCHIVE MODE IN PROGRESS • RECLAMATION CAMPAIGNS FULLY SIMULATED • 80G INCOME TAX BENEFITS SIMULATOR ENGAGED</span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />

            {/* Drawer Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-amber-50 shadow-2xl z-50 lg:hidden border-l border-amber-100 flex flex-col justify-between"
              id="mobile_nav_drawer"
            >
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                      <span className="font-serif">KK</span>
                    </div>
                    <span className="font-serif font-bold text-xs text-amber-900 uppercase tracking-widest">
                      KK Memorial Trust
                    </span>
                  </div>
                  <button
                    id="close_mobile_menu"
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-full text-amber-950 hover:bg-amber-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-1" id="mobile_drawer_items">
                  {navItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        id={`mobile_nav_btn_${item.id}`}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-orange-50 text-orange-700 border-l-4 border-orange-600 font-semibold'
                            : 'text-amber-950/80 hover:bg-amber-100/50 hover:text-orange-600'
                        }`}
                      >
                        <IconComponent className="w-4 h-4 text-orange-500" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Footer / Trust Compliance details */}
              <div className="p-4 bg-amber-100/50 border-t border-amber-200/50 text-center">
                <p className="text-[10px] text-amber-900 font-bold mb-2">
                  Reg No: {TRUST_META.regNo}
                </p>
                <div className="flex justify-center items-center space-x-1.5 text-[9px] text-orange-700 font-bold uppercase tracking-wider bg-orange-100/60 px-3 py-1 rounded-full w-fit mx-auto mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>80G & FCRA Registrations Active</span>
                </div>
                <button
                  id="mobile_drawer_donate_btn"
                  onClick={() => handleNavClick('donate')}
                  className="w-full py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors cursor-pointer"
                >
                  Donate Securely
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
