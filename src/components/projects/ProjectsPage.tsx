import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { Award, ArrowRight, MapPin, Calendar, Search, Filter } from 'lucide-react';
import { motion } from 'motion/react';

export const ProjectsPage: React.FC = () => {
  const { language, projects, navigateToProject } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filtered = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 bg-slate-50">
      {/* WordPress Page Header Banner */}
      <div className="bg-[#0B1528] text-white py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-500/40 text-xs font-bold text-blue-300 uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span>{language === 'fr' ? 'Dossiers & Études de Cas' : 'Case Studies & Track Record'}</span>
            </div>
            <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
              {language === 'fr' ? 'Nos Réalisations d\'Impact à Travers l\'Afrique' : 'Proven High-Impact Ventures Across Africa'}
            </h1>
            <div className="wp-divider my-2" />
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {language === 'fr'
                ? 'Découvrez comment nous avons transformé des idées audacieuses en unités commerciales rentables et résilientes.'
                : 'Explore how we turned high-ambition concepts into scaled, highly profitable, and sustainable ventures.'}
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation & Filter Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 pt-6">
        <Breadcrumb className="mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'fr' ? 'Rechercher par client, pays, projet...' : 'Search by client, country, venture...'}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {[
              { id: 'all', label: { fr: 'Tous', en: 'All' } },
              { id: 'solar', label: { fr: 'Solaire & Énergie', en: 'Solar & CleanTech' } },
              { id: 'market_expansion', label: { fr: 'Expansion B2B', en: 'B2B Expansion' } },
              { id: 'esg_health', label: { fr: 'Dernier Kilomètre & ESG', en: 'Last-Mile & ESG' } },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label[language]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects List Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              onClick={() => navigateToProject(project.id)}
              className="group cursor-pointer rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                <img
                  src={project.heroImage}
                  alt={project.title[language]}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-md bg-white/95 text-slate-900 text-xs font-bold shadow-md">
                    {project.client}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-amber-300 text-[11px] font-bold border border-amber-400/30">
                    {project.clientBadge}
                  </span>
                </div>

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

              {/* Body */}
              <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    {project.categoryLabel[language]}
                  </span>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-slate-900 mt-1 group-hover:text-blue-600 transition-colors">
                    {project.title[language]}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {project.tagline[language]}
                  </p>
                </div>

                {/* Metrics */}
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

                {/* Bottom trigger */}
                <div className="pt-2 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                  <span>{language === 'fr' ? 'Consulter le dossier complet' : 'Read Case Dossier'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
