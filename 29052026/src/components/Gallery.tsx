import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import { motion } from 'motion/react';

export default function Gallery() {
  return (
    <section id="gallery" className="py-16 sm:py-24 bg-gradient-to-b from-white to-amber-50/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12" id="gallery_header">
          <span className="text-xs font-bold text-orange-600 block mb-1 uppercase tracking-widest">
            Devotional Archiving
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-amber-950 tracking-wide">
            Gallery Of Trust Activities
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            A visual record of Professor Krishnamacharyulu's inspiration, temple restoration work, and community welfare initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GALLERY_ITEMS.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="overflow-hidden rounded-xl border border-amber-100 bg-white shadow-sm"
            >
              <div className="aspect-[4/3] overflow-hidden bg-amber-50">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-700">
                  <ImageIcon className="w-3 h-3" />
                  {item.category}
                </div>
                <h3 className="font-serif text-base font-bold leading-tight text-amber-950">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-stone-600">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
