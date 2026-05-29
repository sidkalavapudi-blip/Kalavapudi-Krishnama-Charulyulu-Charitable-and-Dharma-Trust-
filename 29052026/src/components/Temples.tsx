import React from 'react';
import { CheckCircle, HeartHandshake, Landmark, MapPin } from 'lucide-react';
import { SUPPORTED_TEMPLES } from '../data';
import { motion } from 'motion/react';

interface TemplesProps {
  onSelectTemple: (templeName: string) => void;
}

const formatCurrency = (amount = 0) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

export default function Temples({ onSelectTemple }: TemplesProps) {
  return (
    <section id="temples" className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14" id="temples_header">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-100/60 px-3 py-1 rounded-full">
            Local Heritage Support
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold text-amber-950 tracking-wide">
            Temples And Community Programs We Support
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            The Trust identifies temples and community needs around Visakhapatnam, prioritising daily worship support, urgent repairs, annadanam, and educational assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SUPPORTED_TEMPLES.map((temple, index) => {
            const progress = Math.min(100, Math.round(((temple.raisedAmount || 0) / (temple.targetAmount || 1)) * 100));
            return (
              <motion.article
                key={temple.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="rounded-xl border border-amber-100 bg-amber-50/30 p-5 sm:p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                      <span className={`inline-flex mb-2 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        temple.status === 'Urgent'
                          ? 'bg-rose-50 text-rose-700 border border-rose-100'
                          : temple.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            : 'bg-blue-50 text-blue-700 border border-blue-100'
                      }`}>
                        {temple.status}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-amber-950 leading-tight">{temple.name}</h3>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-stone-500">
                        <MapPin className="w-3.5 h-3.5 text-orange-500" />
                        {temple.location}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-stone-700 leading-relaxed">{temple.history}</p>

                <div className="mt-5 space-y-2">
                  {temple.needs.map((need) => (
                    <div key={need} className="flex items-start gap-2 text-xs text-stone-700">
                      <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 shrink-0" />
                      <span>{need}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-[11px] font-bold text-stone-600 mb-2">
                    <span>{formatCurrency(temple.raisedAmount)} raised</span>
                    <span>{formatCurrency(temple.targetAmount)} goal</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white border border-amber-100 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-600 to-amber-400" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <button
                  onClick={() => onSelectTemple(temple.name)}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-amber-950 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-orange-700 transition-colors"
                >
                  <HeartHandshake className="w-4 h-4" />
                  Support This Cause
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
