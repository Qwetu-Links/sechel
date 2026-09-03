import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Award,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Phone,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

export const ProjectDetailPage: React.FC = () => {
  const { language, projects, selectedProjectId, setCurrentPage } = useApp();
  const [activeTab, setActiveTab] = useState<'journey' | 'revenue' | 'gallery'>('journey');

  const project = projects.find((p) => p.id === selectedProjectId) || projects[0];

  if (!project) return null;

  return (
    <div className="pt-28 pb-20 bg-slate-50">
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Breadcrumb />
      </div>

      {/* Main Project Dossier Card (WordPress Portfolio Single Post) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <article className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-lg">
          {/* Hero Banner Header */}
          <div className="relative aspect-[21/9] sm:aspect-[16/7] w-full bg-slate-950 overflow-hidden">
            <img
              src={project.heroImage}
              alt={project.title[language]}
              className="w-full h-full object-cover filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

            <div className="absolute top-6 left-6 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-md bg-white/95 text-slate-900 text-xs font-bold shadow-sm">
                {project.client}
              </span>
              <span className="px-3 py-1 rounded-md bg-blue-600 text-white text-xs font-bold shadow-sm">
                {project.clientBadge}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                {project.categoryLabel[language]}
              </span>
              <h1 className="font-serif-display text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                {project.title[language]}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>{project.period}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 bg-slate-50 border-b border-slate-200">
            {project.metrics.map((metric, i) => (
              <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
                <span className="text-xl sm:text-2xl font-serif-display font-bold text-blue-600 block">
                  {metric.value}
                </span>
                <span className="text-xs text-slate-500 font-medium block mt-1">
                  {metric.label[language]}
                </span>
              </div>
            ))}
          </div>

          {/* Dossier Tabs (WordPress Post Meta Tabs) */}
          <div className="border-b border-slate-200 px-6 sm:px-8 flex gap-6">
            <button
              onClick={() => setActiveTab('journey')}
              className={`py-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                activeTab === 'journey'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {language === 'fr' ? '1. Contexte & Déploiement Terrain' : '1. Context & Field Journey'}
            </button>
            <button
              onClick={() => setActiveTab('revenue')}
              className={`py-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                activeTab === 'revenue'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {language === 'fr' ? '2. Résultats & Impact Financier' : '2. Revenue & Measurable Impact'}
            </button>
            {project.gallery && project.gallery.length > 0 && (
              <button
                onClick={() => setActiveTab('gallery')}
                className={`py-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                  activeTab === 'gallery'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {language === 'fr' ? '3. Galerie Photos Terrain' : '3. Field Gallery'}
              </button>
            )}
          </div>

          {/* Content Body based on tab */}
          <div className="p-6 sm:p-10 space-y-8">
            {activeTab === 'journey' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
                    {language === 'fr' ? 'Le Défi Initial & Enjeux Stratégiques' : 'Initial Challenge & Market Context'}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {project.background[language]}
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-blue-600 flex items-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    <span>{language === 'fr' ? 'La Stratégie d\'Intervention Sechel (The Journey)' : 'The Sechel Execution Blueprint (The Journey)'}</span>
                  </h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {project.journey[language]}
                  </p>
                </div>

                {/* Partners List */}
                {project.partners && project.partners.length > 0 && (
                  <div>
                    <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
                      {language === 'fr' ? 'Partenaires Associés au Projet' : 'Project Partners'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.partners.map((partner, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700"
                        >
                          {partner}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'revenue' && (
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-blue-50/50 border border-blue-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs uppercase font-bold text-blue-700">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span>{language === 'fr' ? 'Croissance & Bilan Financier (Revenue Boom)' : 'Revenue Boom & Commercial Milestones'}</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {project.results[language]}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && project.gallery && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gallery.map((imgUrl, gIdx) => (
                  <div key={gIdx} className="rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100">
                    <img
                      src={imgUrl}
                      alt={`Mission snapshot ${gIdx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Card CTA */}
          <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-serif-display font-bold text-base text-slate-900">
                {language === 'fr' ? 'Vous avez un projet similaire à structurer ?' : 'Planning a similar expansion or structuring project?'}
              </h4>
              <p className="text-xs text-slate-500">
                {language === 'fr' ? 'Bénéficiez de la même expertise éprouvée sur votre secteur.' : 'Apply this exact operational blueprint to your venture.'}
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-2 flex-shrink-0 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{language === 'fr' ? 'Parler à l\'équipe de ce projet' : 'Speak to Project Lead'}</span>
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};
