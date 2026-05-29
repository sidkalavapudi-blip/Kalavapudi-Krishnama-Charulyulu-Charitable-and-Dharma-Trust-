/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, HeartHandshake, HelpCircle, ArrowRight, Landmark } from 'lucide-react';
import { TRUST_META, MISSION_VISION } from '../data';
import { motion } from 'motion/react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <div id="home" className="relative pt-18 overflow-hidden bg-amber-50">
      
      {/* Main Banner Block */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 lg:pt-12 lg:pb-16 flex flex-col items-center">

        {/* Banner with Saffron/Gold Background Overlay */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-200/50 min-h-[480px] lg:min-h-[520px] flex flex-col justify-end p-6 sm:p-10 lg:p-12 mb-12">
          
          {/* Background Image with Referrer Policy and Elegant Dark Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/src/assets/images/temple_hero_banner_1780024008035.png"
              alt="Mahnificent Temple Gopuram at Sunrise"
              className="w-full h-full object-cover select-none scale-105 hover:scale-100 transition-transform duration-10000 ease-out"
              referrerPolicy="no-referrer"
            />
            {/* Spiritual gradient overlay: saffron tinted black */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950 via-amber-950/70 to-orange-950/40" />
            <div className="absolute inset-0 bg-amber-900/10 mix-blend-color" />
          </div>

          {/* Banner Content (Foreground) */}
          <div className="relative z-10 max-w-3xl text-left" id="hero_header_content">
            {/* Saffron status tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-sm shadow-orange-900/30 mb-4 sm:mb-6 border border-yellow-400/20"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Registered Charitable And Dharma Trust</span>
            </motion.div>

            {/* Trust Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-wide leading-tight mb-3 hover:text-amber-100 transition-colors duration-300"
            >
              {TRUST_META.name}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl font-serif italic text-amber-300 tracking-wider mb-6 sm:mb-8"
            >
              &ldquo;{TRUST_META.tagline}&rdquo;
            </motion.p>

            {/* Compliance Quick Fact */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs sm:text-sm text-stone-200 leading-relaxed font-sans mb-8 max-w-2xl border-l-2 border-orange-500 pl-4"
            >
              Preserving neglected temples, supporting daily worship, and extending annadanam and educational assistance across Visakhapatnam and North Coastal Andhra Pradesh.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap gap-4"
            >
              <button
                id="hero_btn_donate"
                onClick={() => onNavigate('donate')}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-orange-950/50 transition-all cursor-pointer flex items-center space-x-2"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Donate Securely</span>
                <ArrowRight className="w-4 h-4 animate-pulse" />
              </button>

              <button
                id="hero_btn_learn"
                onClick={() => onNavigate('about')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white hover:text-amber-100 font-bold text-sm uppercase tracking-wider rounded-xl transition-all cursor-pointer border border-white/20 backdrop-blur-xs flex items-center space-x-2"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Learn Our Work</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Vision & Mission Statement Grid */}
        <div id="vision_mission_grid" className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-4">
          
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border-t-4 border-amber-500 border border-amber-100 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 mb-5 border border-orange-100">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-950 mb-3 tracking-wide">
                Our Immutable Vision
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed font-sans italic">
                &ldquo;{MISSION_VISION.vision}&rdquo;
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-amber-100 text-[11px] text-amber-900/60 font-semibold uppercase tracking-wider">
              Cultural Integrity & Preservation
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border-t-4 border-orange-600 border border-amber-100 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-5 border border-amber-100">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-950 mb-3 tracking-wide">
                Our Sacred Mission
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed font-sans">
                {MISSION_VISION.mission}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-100 text-[11px] text-orange-600/60 font-semibold uppercase tracking-wider">
              Direct Ground Support & Sincerity
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
