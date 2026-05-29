/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Quote } from 'lucide-react';
import { PROFESSOR_BIO, TRUST_META } from '../data';
import { motion } from 'motion/react';
import Founder from './Founder';

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="about_header">
          {/* Trust Constitution status */}
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/80 px-4 py-1.5 rounded-full mb-4 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
            </span>
            <span className="text-[10px] text-amber-900 font-bold uppercase tracking-wider">Trust Constitution Under Routine Construction</span>
          </div>

          <span className="text-xs font-bold text-orange-600 block mb-1">
            Inspiration & Legacy
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-amber-950 tracking-wide">
            Our History & Sacred Foundation
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            The Kalavapudi Krishnamacharyulu Memorial Charitable and Dharma Trust was founded in 2026 to formalize the persistent charitable activities championed by Professor Krishnamacharyulu during his lifetime.
          </p>
        </div>

        {/* Biography Text Centered Layout */}
        <div className="max-w-3xl mx-auto space-y-6" id="professor_biography_text">
          <Founder />

          <p className="text-stone-700 text-sm leading-relaxed text-justify font-sans">
            {PROFESSOR_BIO.intro}
          </p>

          <div className="relative bg-amber-50/70 border border-amber-200/50 rounded-xl p-5 italic text-stone-700 text-sm leading-relaxed font-serif text-amber-950/90">
            <Quote className="w-5 h-5 text-orange-400 absolute -top-2.5 left-4 fill-amber-50" />
            <p className="mt-1">&ldquo;Service to humanity is service to God. Let no oil lamp in a village go dark for lack of support.&rdquo;</p>
          </div>

          <p className="text-stone-700 text-sm leading-relaxed text-justify font-sans">
            Established with legal trust guidelines, we focus heavily on temples in and around Visakhapatnam that require immediate structural remediation and daily puja funds, ensuring transparency and professional monitoring.
          </p>

          {/* Regulatory Credentials & Verification Status - Certified */}
          <div className="bg-emerald-50/20 border border-emerald-200/50 rounded-xl p-5 mt-6" id="regulatory_wip_section">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 mb-4 border-b border-stone-200/40 gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-900 block font-sans">Statutory Registration Details</span>
                <h4 className="font-serif font-bold text-sm text-amber-950">Charitable Trust Compliance Ledger</h4>
              </div>
              <span className="text-[10px] bg-emerald-100/80 text-emerald-950 font-bold border border-emerald-300 shadow-xs px-3 py-1 rounded-md uppercase tracking-wider self-start sm:self-auto flex items-center shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1.5"></span>
                Archived & Active
              </span>
            </div>
            
            <p className="text-xs text-stone-600 mb-4 leading-relaxed">
              In accordance with local legal trust patterns, our structural compliance indices, verified accounts ledger, and official 80G tax benefit files are maintained with total transparency. Review the direct validation registry indexes below.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded-lg border border-emerald-150 flex flex-col justify-center shadow-xs">
                <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">Registration Status</span>
                <span className="text-xs font-bold text-amber-950">AP/VSP-108/2026</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-emerald-150 flex flex-col justify-center shadow-xs">
                <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">80G Validation</span>
                <span className="text-xs font-bold text-amber-950">CIT Approved 80G</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-emerald-150 flex flex-col justify-center shadow-xs">
                <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">FCRA Compliance</span>
                <span className="text-xs font-bold text-amber-950">FCRA-Registered</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
