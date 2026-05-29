/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Facebook, Twitter, Youtube, Shield, Award, Landmark, ExternalLink, Mail, Heart } from 'lucide-react';
import { TRUST_META } from '../data';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app_footer" className="bg-amber-950 text-white font-sans border-t border-amber-900 overflow-hidden relative">
      
      {/* Visual background splash */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-orange-700/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Upper Footer Segment */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Logo Info Box */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={(e) => handleLinkClick(e, 'home')}>
              <img
                src="/src/assets/images/trust_logo_1780041770605.png"
                alt="Trust Logo"
                className="w-10 h-10 object-contain rounded-full shadow-md bg-white p-0.5 border border-amber-800/40"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-amber-100 font-serif font-bold text-xs sm:text-sm tracking-wide block">
                  Kalavapudi Krishnamacharyulu
                </span>
                <span className="text-orange-400 font-sans text-[9px] sm:text-[10px] font-bold tracking-widest uppercase block">
                  Memorial Charitable and Dharma Trust
                </span>
              </div>
            </div>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed text-justify max-w-md">
              Founded in 2026 to commemorate the illustrious indological scholarship and noble community service of the late Professor Krishnamacharyulu, the Trust is devoted to the restoration of remote ancient temples across North Coastal Andhra Pradesh and to the benevolent distribution of nourishing food and educational materials to those in need.
            </p>

            {/* Official Registration Detail line */}
            <div className="text-[10px] bg-amber-900/60 p-3 rounded-lg border border-amber-800/40 divide-y divide-amber-800/20 space-y-1.5 max-w-md font-mono text-stone-300">
              <p>✔ Central Registration ID: <strong className="text-white">{TRUST_META.regNo}</strong></p>
              <p className="pt-1.5">✔ 80G Order Number: <span className="text-orange-400 font-bold">{TRUST_META.taxCode80G}</span></p>
              <p className="pt-1.5">✔ FCRA Registration Code: <span className="text-orange-400 font-bold">{TRUST_META.fcraRegNo}</span></p>
            </div>
          </div>

          {/* Quick links box */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-extrabold text-amber-200 uppercase tracking-widest">
              Trust Directory
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="hover:text-orange-400 transition-colors flex items-center">
                  <span>Home Welcome Page</span>
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-orange-400 transition-colors flex items-center">
                  <span>Our Legacy & Inspiration</span>
                </a>
              </li>
              <li>
                <a href="#temples" onClick={(e) => handleLinkClick(e, 'temples')} className="hover:text-orange-400 transition-colors flex items-center">
                  <span>Supported Dilapidated Temples</span>
                </a>
              </li>
              <li>
                <a href="#gallery" onClick={(e) => handleLinkClick(e, 'gallery')} className="hover:text-orange-400 transition-colors flex items-center">
                  <span>Archived Gallery Photos</span>
                </a>
              </li>
              <li>
                <a href="#donate" onClick={(e) => handleLinkClick(e, 'donate')} className="hover:text-orange-400 transition-colors flex items-center">
                  <span>Online SECURED Donating Portal</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick contact / locations */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif text-sm font-extrabold text-amber-200 uppercase tracking-widest">
              Physical Desk
            </h4>
            <p className="text-stone-300 text-xs leading-relaxed">
              Serving ancient neglected shrines in Visakhapatnam, Anandapuram, Sabbavaram, and rural pockets of Andhra Pradesh.
            </p>
            
            <div className="space-y-1.5 pt-1 text-xs">
              <p className="text-stone-400">Phone: <strong className="text-stone-100 font-mono">{TRUST_META.contact.phone}</strong></p>
              <p className="text-stone-400">Alternate: <span className="font-mono text-stone-200">{TRUST_META.contact.altPhone}</span></p>
              <p className="text-stone-400">Email: <span className="text-orange-400 font-bold font-mono">{TRUST_META.contact.email}</span></p>
              <p className="text-stone-400">Website: <a href="https://kkgovinda.org" target="_blank" rel="noopener noreferrer" className="text-orange-400 font-bold hover:underline font-mono">kkgovinda.org</a></p>
            </div>

            {/* Social templates */}
            <div className="pt-2 flex items-center space-x-3 text-stone-300" id="footer_socials">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-amber-900/40 hover:bg-orange-600 hover:text-white transition-all text-stone-300" aria-label="Facebook link">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-amber-900/40 hover:bg-orange-600 hover:text-white transition-all text-stone-300" aria-label="Twitter link">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-amber-900/40 hover:bg-orange-600 hover:text-white transition-all text-stone-300" aria-label="YouTube channel">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Solid compliance panel & Legal Copyright */}
      <div className="bg-amber-955 py-6 text-center text-[10px] text-stone-400 font-mono border-t border-amber-900/50 relative z-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-[11px]" id="compliance_info_footer_section">
            <div className="flex items-center gap-2.5 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-lg shrink-0" id="amber_status_badge">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">Active & Verified</span>
            </div>
            <p className="text-stone-400 text-xs text-center md:text-left" id="compliance_text_p">
              Statutory verification ledgers, audited compliance logs, and tax exemption certification assets are maintained with full transparency under Indian Trust Laws.
            </p>
          </div>

          <div className="text-xs text-stone-300 font-sans md:text-right" id="copyright_info_footer">
            &copy; {currentYear} Kalavapudi Krishnamacharyulu Memorial Charitable and Dharma Trust. Srimathe Ramanujaya Namaha. All Rights Reserved.
          </div>
          
        </div>
      </div>

    </footer>
  );
}
