import React from 'react';
import { Award, BookOpen, Quote, ShieldCheck } from 'lucide-react';
import { PROFESSOR_BIO, TRUST_META } from '../data';
import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14" id="about_header">
          <span className="text-xs font-bold text-orange-600 block mb-1 uppercase tracking-widest">
            Inspiration & Legacy
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-amber-950 tracking-wide">
            Our History And Sacred Foundation
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            The Kalavapudi Krishnamacharyulu Memorial Charitable and Dharma Trust was founded in 2026 to continue a life of service through temple restoration, education support, and community welfare.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="overflow-hidden rounded-xl border border-amber-100 bg-white shadow-xl">
              <img
                src={PROFESSOR_BIO.photo}
                alt={PROFESSOR_BIO.name}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
            id="professor_biography_text"
          >
            <div>
              <span className="text-orange-600 font-sans font-bold text-xs uppercase tracking-widest block mb-2">
                The Inspiration
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-amber-950 tracking-wide">
                {PROFESSOR_BIO.name}
              </h3>
              <p className="font-sans text-amber-900/90 text-xs sm:text-sm font-semibold italic mt-1.5">
                {PROFESSOR_BIO.lifespan} | {PROFESSOR_BIO.title}
              </p>
            </div>

            <p className="text-stone-700 text-sm leading-relaxed font-sans">
              {PROFESSOR_BIO.intro}
            </p>

            <div className="relative bg-amber-50/80 border border-amber-200/60 rounded-xl p-5 italic text-stone-700 text-sm leading-relaxed font-serif text-amber-950/90">
              <Quote className="w-5 h-5 text-orange-400 absolute -top-2.5 left-4 fill-amber-50" />
              <p className="mt-1">"Service to humanity is service to God. Let no oil lamp in a village go dark for lack of support."</p>
            </div>

            <p className="text-stone-700 text-sm leading-relaxed font-sans">
              The Trust continues this guiding principle by supporting remote temples, priest welfare, annadanam, and education assistance with clear reporting and trustee oversight.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-amber-100 bg-white p-4">
                <ShieldCheck className="w-5 h-5 text-orange-600 mb-2" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">Registration</span>
                <span className="text-xs font-semibold text-amber-950">{TRUST_META.regNo}</span>
              </div>
              <div className="rounded-xl border border-amber-100 bg-white p-4">
                <Award className="w-5 h-5 text-orange-600 mb-2" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">Core Work</span>
                <span className="text-xs font-semibold text-amber-950">Temple and Seva Programs</span>
              </div>
              <div className="rounded-xl border border-amber-100 bg-white p-4">
                <BookOpen className="w-5 h-5 text-orange-600 mb-2" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">Education</span>
                <span className="text-xs font-semibold text-amber-950">Vidyadana Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
