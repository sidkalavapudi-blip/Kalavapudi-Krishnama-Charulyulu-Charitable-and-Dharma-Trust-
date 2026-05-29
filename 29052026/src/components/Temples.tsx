/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Landmark, Compass, HeartHandshake, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { SUPPORTED_TEMPLES } from '../data';

interface TemplesProps {
  onSelectTemple: (templeName: string) => void;
}

export default function Temples({ onSelectTemple }: TemplesProps) {
  return (
    <section id="temples" className="py-16 sm:py-24 bg-gradient-to-b from-white via-amber-50/20 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="temples_header">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-100/60 px-3 py-1 rounded-full border border-orange-200/50">
            Local Heritage Restoration
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold text-amber-950 tracking-wide">
            Temples Requiring Immediate Care
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            In keeping with Professor Krishnamacharyulu's structural expertise and deep devotion, we have mapped and audited ancient shrines in remote parts of Visakhapatnam. Every donation directly funds specialized repairs and basic priest stipends.
          </p>
        </div>

        {/* Temple Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16" id="temples_grid_section">
          {SUPPORTED_TEMPLES.map((temple, i) => {
            const hasProgress = temple.targetAmount && temple.raisedAmount;
            const progressPercent = hasProgress
              ? Math.min(100, Math.round((temple.raisedAmount! / temple.targetAmount!) * 100))
              : 0;

            return (
              <motion.div
                key={temple.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-stone-200/60 shadow-md hover:shadow-xl hover:border-amber-200 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between"
                id={`temple_card_${temple.id}`}
              >
                <div>
                  {/* Status & Location line */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="flex items-center space-x-1.5 text-xs text-stone-500 font-medium">
                      <Compass className="w-3.5 h-3.5 text-stone-400" />
                      <span>{temple.location}</span>
                    </span>
                    <span
                      className={`text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider border ${
                        temple.status === 'Urgent'
                          ? 'bg-red-50 text-red-800 border-red-200'
                          : temple.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {temple.status === 'Completed' ? '✓ Fully Sponsored' : temple.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-950 mb-3 flex items-start gap-2">
                    <Landmark className="w-5 h-5 text-orange-600 shrink-0 mt-1" />
                    <span>{temple.name}</span>
                  </h3>

                  {/* History & Context */}
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6 italic">
                    {temple.history}
                  </p>

                  {/* Specific Needs Checklist */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-3 font-sans">
                      Critical Reclamation Work Needed:
                    </h4>
                    <ul className="space-y-2.5 text-xs text-stone-600">
                      {temple.needs.map((need, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                          <span>{need}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Progress bar section */}
                <div className="mt-4 pt-5 border-t border-stone-150">
                  {temple.status !== 'Completed' && hasProgress && (
                    <div className="mb-5">
                      <div className="flex justify-between items-end text-xs mb-1.5">
                        <span className="text-stone-500 font-medium font-sans">Campaign Progress</span>
                        <span className="text-orange-700 font-extrabold">{progressPercent}% Funded</span>
                      </div>
                      <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden border border-stone-200/40">
                        <motion.div
                          className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${progressPercent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] sm:text-xs mt-2 font-mono text-stone-500">
                        <span>Raised: <strong>₹{temple.raisedAmount!.toLocaleString('en-IN')}</strong></span>
                        <span>Target: <strong>₹{temple.targetAmount!.toLocaleString('en-IN')}</strong></span>
                      </div>
                    </div>
                  )}

                  {temple.status === 'Completed' && (
                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 text-emerald-900 rounded-xl p-3.5 mb-5 text-xs text-left">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div>
                        <strong>Fully Sponsored!</strong> All active restoration and priest welfare targets have been achieved for this sacred site by generous patrons.
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => onSelectTemple(temple.name)}
                    className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs transition-all flex items-center justify-center gap-2 ${
                      temple.status === 'Completed'
                        ? 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
                        : 'bg-amber-950 text-white hover:bg-amber-900 border border-amber-950 font-extrabold shadow-md hover:shadow-lg'
                    }`}
                  >
                    <HeartHandshake className="w-4 h-4" />
                    <span>{temple.status === 'Completed' ? 'Contribute Surplus Funds' : 'Sponsor This Shrine'}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Campaign Assessment Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-amber-50/40 rounded-2xl border border-amber-100 p-8 text-center max-w-2xl mx-auto"
          id="programs_initiatives_wip_card"
        >
          <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4 border border-orange-200/50">
            <TrendingUp className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="font-serif text-lg font-bold text-amber-950 mb-2">
            Have another ancient temple in mind?
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
            Our assessment team actively surveys and audits dilapidated shrines across North Coastal Andhra. Reach out to our team to submit structural details, priest contact coordinates, or immediate restoration requests.
          </p>
          <button
            onClick={() => onSelectTemple('General Temple Restoration')}
            className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Support General Restoration Ledger</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
