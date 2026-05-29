/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Image as ImageIcon, Sparkles, Database, FileImage, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_ITEMS } from '../data';

export default function Gallery() {
  const [filter, setFilter] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = ['All', 'Temples', 'Welfare'];

  const filteredItems = filter === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === filter);

  // Find selected item details for lightbox
  const selectedItemDetails = GALLERY_ITEMS.find(item => item.image === selectedImage);

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-gradient-to-b from-white to-amber-50/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12" id="gallery_header">
          {/* Active status tag */}
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/80 px-4 py-1.5 rounded-full mb-4 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] text-amber-900 font-bold uppercase tracking-wider">Historical & Restoration Archives Active</span>
          </div>

          <span className="text-xs font-bold text-orange-600 block mb-1">
            Devotional Archiving
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-amber-950 tracking-wide">
            Our Pictorial Gallery
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            A visual record of the late Professor Krishnamacharyulu's life-legacy, dynamic temple structural restorations, and continuous community service initiatives in Visakhapatnam.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center space-x-2.5 mb-10" id="gallery_filters">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-xs transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-amber-950 text-white border border-amber-950 font-extrabold'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-amber-300 hover:bg-stone-50'
              }`}
            >
              {cat === 'All' && 'All Gallery'}
              {cat === 'Temples' && '⛪ Dilapidated Temples'}
              {cat === 'Welfare' && '🤝 Seva & Annadanam'}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="gallery_item_grid">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative bg-white border border-stone-200/60 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer h-full flex flex-col"
                onClick={() => setSelectedImage(item.image)}
              >
                {/* Image Container with precise size aspect */}
                <div className="relative overflow-hidden aspect-video bg-stone-100 flex items-center justify-center shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 rounded-t-2xl select-none"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {/* Hover dark overlay with icon */}
                  <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-3 bg-white/90 rounded-full text-amber-950 shadow-lg scale-90 group-hover:scale-100 transition-transform duration-350">
                      <Search className="w-5 h-5 text-orange-600" />
                    </div>
                  </div>
                  {/* Category Pill Tag */}
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[9px] font-extrabold uppercase tracking-widest text-orange-700 px-2.5 py-1 rounded-md shadow border border-amber-150">
                    {item.category}
                  </span>
                </div>

                {/* Content descriptors */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-extrabold text-sm text-amber-950 group-hover:text-orange-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-stone-600 text-xs leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Click trigger indicator */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex justify-between items-center text-[10px] text-orange-600 font-bold uppercase tracking-wider">
                    <span>View Archival Evidence</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">🔍 Zoom →</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dynamic Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && selectedItemDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-55 flex items-center justify-center p-4 backdrop-blur-md"
              onClick={() => setSelectedImage(null)}
            >
              {/* Modal Card wrapper */}
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col md:flex-row max-h-[85vh] sm:max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button top-right absolute */}
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute right-4 top-4 z-40 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white cursor-pointer transition-colors"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Image panel */}
                <div className="w-full md:w-3/5 bg-stone-950 flex items-center justify-center overflow-hidden h-[40vh] md:h-auto">
                  <img
                    src={selectedImage}
                    alt={selectedItemDetails.title}
                    className="max-w-full max-h-full object-contain select-none"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details pane */}
                <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-amber-50/25">
                  <div>
                    {/* Header Details stamp */}
                    <span className="inline-block bg-orange-100 text-orange-850 font-black text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md mb-4 border border-orange-200">
                      🏛 {selectedItemDetails.category} Section
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-950 leading-tight">
                      {selectedItemDetails.title}
                    </h3>
                    <p className="mt-4 text-xs sm:text-sm leading-relaxed text-stone-600">
                      {selectedItemDetails.description}
                    </p>
                    <div className="mt-6 p-4 bg-amber-100/30 rounded-xl border border-amber-200/40 text-[11px] text-amber-900/90 leading-relaxed font-serif italic">
                      &ldquo;Every archival evidence stands testament to the direct, hands-on restoration and community projects monitored under our strict trust principles to honour Professor Krishnamacharyulu.&rdquo;
                    </div>
                  </div>

                  {/* Disclaimer close */}
                  <div className="mt-8 pt-4 border-t border-stone-200/60 flex items-center justify-between">
                    <span className="text-[9px] text-stone-400 font-mono">ID: {selectedItemDetails.id.toUpperCase()}</span>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="px-4 py-2 bg-amber-950 hover:bg-amber-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
                    >
                      Close Viewer
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
