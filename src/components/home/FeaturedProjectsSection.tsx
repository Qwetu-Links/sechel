import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, MapPin, Calendar, Award, Sparkles, TrendingUp, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const FeaturedProjectsSection: React.FC = () => {
  const { language, projects, navigateToProject, setCurrentPage } = useApp();
  const [filter, setFilter] = useState<'all' | 'solar' | 'market_expansion' | 'esg_health'>('all');

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* WordPress Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === 'fr' ? 'Portfolio & Études de Cas' : 'Case Studies & Track Record'}</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              {language === 'fr' ? 'Nos Réalisations Stratégiques Récentes' : 'Strategic Highlights & Field Impact'}
            </h2>
            <div className="wp-divider mt-3" />
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              {language === 'fr'
                ? 'Des missions d\'envergure documentées avec métriques financières et logistiques vérifiées.'
                : 'Documented field engagements featuring verified financial, operational, and distribution metrics.'}
            </p>
          </div>

          {/* WordPress Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {language === 'fr' ? 'Tous les Projets' : 'All Projects'}
            </button>
            <button
              onClick={() => setFilter('solar')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filter === 'solar'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {language === 'fr' ? 'Solaire & Énergie' : 'Solar & CleanTech'}
            </button>
            <button
              onClick={() => setFilter('market_expansion')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filter === 'market_expansion'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {language === 'fr' ? 'Expansion B2B' : 'Market Expansion'}
            </button>
            <button
              onClick={() => setFilter('esg_health')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filter === 'esg_health'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {language === 'fr' ? 'Dernier Kilomètre & ESG' : 'Last-Mile & ESG'}
            </button>
          </div>
        </div>

        {/* Projects Cards Grid (WordPress Portfolio Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => navigateToProject(project.id)}
              className="group cursor-pointer rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl hover:border-blue-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container with Badges */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                <img
                  src={project.heroImage}
                  alt={project.title[language]}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Client Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-md bg-white/95 text-slate-900 text-xs font-bold shadow-md">
                    {project.client}
                  </span>
                </div>

                {/* Category Pill Top Right */}
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-amber-300 text-[11px] font-bold border border-amber-400/30">
                    {project.clientBadge}
                  </span>
                </div>

                {/* Location & Period overlay bottom */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                  <div className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>{project.period}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    {project.categoryLabel[language]}
                  </span>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-slate-900 mt-1 group-hover:text-blue-600 transition-colors">
                    {project.title[language]}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {project.subtitle[language]}
                  </p>
                </div>

                {/* Metrics 3-box Grid */}
                <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-slate-100">
                  {project.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="bg-slate-50 p-2.5 rounded-lg text-center border border-slate-200">
                      <span className="text-sm sm:text-base font-bold font-serif-display text-slate-900 block leading-tight">
                        {m.value}
                      </span>
                      <span className="text-[10px] text-slate-500 block leading-tight mt-1 font-medium line-clamp-1">
                        {m.label[language]}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Trigger */}
                <div className="pt-3 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                  <span>{language === 'fr' ? 'Consulter le dossier d\'impact complet' : 'Read Full Case Study'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects CTA (Classic WordPress Section Bottom Button) */}
        <div className="mt-14 text-center">
          <button
            onClick={() => setCurrentPage('projects')}
            className="px-8 py-3.5 rounded-lg bg-slate-900 hover:bg-blue-600 text-white text-xs sm:text-sm font-bold transition-all shadow-md inline-flex items-center gap-2.5"
          >
            <span>{language === 'fr' ? 'Voir toutes nos études de cas et méthodologies' : 'View All Case Studies & Results'}</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
