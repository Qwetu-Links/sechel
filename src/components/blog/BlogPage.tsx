import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { BookOpen, Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { motion } from 'motion/react';

export const BlogPage: React.FC = () => {
  const { language, blogPosts, navigateToArticle } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCat = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch =
      post.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 bg-slate-50">
      {/* WordPress Page Header Banner */}
      <div className="bg-[#0B1528] text-white py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-500/40 text-xs font-bold text-blue-300 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>{language === 'fr' ? 'Veille & Analyses Stratégiques' : 'Strategic Insights & Intelligence'}</span>
            </div>
            <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
              {language === 'fr' ? 'Comprendre les Dynamiques de Croissance en Afrique' : 'Demystifying African Business Expansion'}
            </h1>
            <div className="wp-divider my-2" />
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {language === 'fr'
                ? 'Analyses sans fard, retours d\'expérience du terrain, guides sur l\'énergie solaire et stratégies de pénétration de marché.'
                : 'Unfiltered market notes, field lessons, clean tech guides, and tactical execution playbooks.'}
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
              placeholder={language === 'fr' ? 'Rechercher un article, un mot-clé...' : 'Search insights, keywords...'}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {[
              { id: 'all', label: { fr: 'Tous les Articles', en: 'All Articles' } },
              { id: 'Solaire & CleanTech', label: { fr: 'Solaire & Énergie', en: 'Solar & Energy' } },
              { id: 'Stratégie B2B', label: { fr: 'Stratégie B2B', en: 'B2B Strategy' } },
              { id: 'ESG & Santé BoP', label: { fr: 'Logistique & ESG', en: 'Logistics & ESG' } },
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

      {/* Blog Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              onClick={() => navigateToArticle(post.id)}
              className="group cursor-pointer rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <img
                  src={post.coverImage}
                  alt={post.title[language]}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-white/95 text-slate-900 text-[10px] font-bold shadow-sm">
                    {post.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-200">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>{post.publishedAt}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h2 className="font-serif-display text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                    {post.title[language]}
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {post.excerpt[language]}
                  </p>
                </div>

                {/* Author & Read CTA */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full object-cover border border-slate-200"
                    />
                    <span className="text-[11px] text-slate-500 font-medium">{post.author.name}</span>
                  </div>
                  <div className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>{language === 'fr' ? 'Lire l\'article' : 'Read Article'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};
