import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const TestimonialsSlider: React.FC = () => {
  const { language, testimonials, setCurrentPage } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? testimonials.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === testimonials.length - 1 ? 0 : prevIdx + 1));
  };

  const current = testimonials[currentIndex] || testimonials[0];

  return (
    <section className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* WordPress Section Header with Slider Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
              <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === 'fr' ? 'Recommandations & Références' : 'Client Testimonials'}</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              {language === 'fr' ? 'La Confiance de nos Clients en RDC' : 'What Leaders Say About Sechel'}
            </h2>
            <div className="wp-divider mt-3" />
          </div>

          {/* Slider Prev / Next Controls (WordPress Carousel Style) */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="p-3 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="p-3 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Card (Clean Corporate Box) */}
        <div className="relative rounded-2xl bg-white border border-slate-200 p-8 sm:p-12 shadow-xl overflow-hidden">
          {/* Subtle Decorative Quote Icon */}
          <Quote className="absolute -bottom-6 -right-6 w-40 h-40 text-slate-100 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 space-y-6"
            >
              {/* Rating stars & verified project badge */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{current.projectTag}</span>
                  </span>
                </div>
              </div>

              {/* Quote text */}
              <blockquote className="font-serif-display text-xl sm:text-2xl lg:text-3xl text-slate-800 font-normal leading-relaxed">
                "{current.quote[language]}"
              </blockquote>

              {/* Author Info and Avatars */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <img
                    src={current.avatar}
                    alt={current.author}
                    className="w-14 h-14 rounded-xl object-cover border-2 border-blue-600 shadow-sm"
                  />
                  <div>
                    <h4 className="font-serif-display font-bold text-base sm:text-lg text-slate-900">
                      {current.author}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {current.role} • <strong className="text-slate-700 font-semibold">{current.company}</strong>
                    </p>
                  </div>
                </div>

                {/* Dot indicators */}
                <div className="hidden sm:flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-2.5 rounded-full transition-all ${
                        currentIndex === i ? 'w-8 bg-blue-600' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom CTA to view all reviews */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setCurrentPage('testimonials')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider underline underline-offset-4"
          >
            {language === 'fr' ? 'Consulter l\'ensemble des avis et recommandations clients →' : 'Read all client endorsements & reviews →'}
          </button>
        </div>
      </div>
    </section>
  );
};
