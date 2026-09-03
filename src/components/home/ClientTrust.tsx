import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { PARTNERS_LOGOS } from '../../data/initialData';
import {
  ShieldCheck,
  CheckCircle2,
  Building2,
  Sparkles,
  ArrowRight,
  Pause,
  Play,
  Award,
  Globe2,
  TrendingUp,
  Briefcase
} from 'lucide-react';
import { motion } from 'motion/react';
import orangeLogo from '../img/images.png';
import ecoflowLogo from '../img/ecoflow-logo-png_seeklogo-563427.png';
import mondiaLogo from '../img/a9fd4d0ee1eadb8837aa89c2238202df24b538e800732e87f7132fb47e26157f-Mondia_Logo_Primary-removebg-preview.png';
import unknownLogo from '../img/images.jpg';

interface PartnerExtended {
  name: string;
  category: string;
  categoryKey: 'all' | 'energy' | 'telecom' | 'development' | 'tech';
  note: string;
  badge: string;
  initials: string;
  logoUrl: string;
  colorScheme: {
    bg: string;
    text: string;
    border: string;
    pill: string;
  };
}

export const ClientTrust: React.FC = () => {
  const { language, setCurrentPage } = useApp();
  const [isPaused, setIsPaused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPartner, setSelectedPartner] = useState<PartnerExtended | null>(null);

  // Extended client/partner data with visual cues & categorization
  const partners: PartnerExtended[] = [
    {
      name: 'EcoFlow',
      category: language === 'fr' ? 'Énergie Solaire & CleanTech' : 'Solar & CleanTech',
      categoryKey: 'energy',
      note: language === 'fr' ? 'Intégration Marché Katanga & Réseau B2B' : 'Katanga Market Integration & B2B Distribution',
      badge: 'Tier-1 B2B',
      initials: 'EF',
      logoUrl: ecoflowLogo,
      colorScheme: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        pill: 'bg-emerald-100/70 text-emerald-800 border-emerald-300'
      }
    },
    {
      name: 'Sun King',
      category: language === 'fr' ? 'Solaire Hors-Réseau' : 'Off-grid Solar Systems',
      categoryKey: 'energy',
      note: language === 'fr' ? 'Expansion Francophone & Réseaux de Vente' : 'Francophone Expansion & Retail Networks',
      badge: 'Clean Energy',
      initials: 'SK',
      logoUrl: '/assets/logos/sunking.png',
      colorScheme: {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        pill: 'bg-amber-100/70 text-amber-800 border-amber-300'
      }
    },
    {
      name: 'USAID',
      category: language === 'fr' ? 'Bailleur International' : 'International Development',
      categoryKey: 'development',
      note: language === 'fr' ? 'Projet Heta • 200 Dispensaires Équipés' : 'Heta Initiative • 200 Clinics Supplied',
      badge: 'Institutionnel',
      initials: 'US',
      logoUrl: '/assets/logos/usaid.svg',
      colorScheme: {
        bg: 'bg-blue-50',
        text: 'text-blue-800',
        border: 'border-blue-200',
        pill: 'bg-blue-100/70 text-blue-900 border-blue-300'
      }
    },
    {
      name: 'Orange',
      category: language === 'fr' ? 'Télécoms & Mobile Money' : 'Telecom & Mobile Money',
      categoryKey: 'telecom',
      note: language === 'fr' ? 'Réseau de Distribution & Orange Money' : 'Distribution Partner & MoMo Rails',
      badge: 'Telecom Hub',
      initials: 'OR',
      logoUrl: orangeLogo,
      colorScheme: {
        bg: 'bg-orange-50',
        text: 'text-orange-700',
        border: 'border-orange-200',
        pill: 'bg-orange-100/70 text-orange-800 border-orange-300'
      }
    },
    {
      name: 'Vodacom',
      category: language === 'fr' ? 'Télécoms & M-Pesa' : 'Telecom & M-Pesa',
      categoryKey: 'telecom',
      note: language === 'fr' ? 'Alliance Stratégique & Canaux RDC' : 'Strategic Alliance & DRC Channels',
      badge: 'M-Pesa Rail',
      initials: 'VD',
      logoUrl: '/assets/logos/vodacom.svg',
      colorScheme: {
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-200',
        pill: 'bg-rose-100/70 text-rose-800 border-rose-300'
      }
    },
    {
      name: 'MTN MoMo',
      category: language === 'fr' ? 'Paiement Mobile & FinTech' : 'Mobile Payments & FinTech',
      categoryKey: 'telecom',
      note: language === 'fr' ? 'Passerelle Régionale CEMAC & SADC' : 'Regional Gateway CEMAC & SADC',
      badge: 'FinTech',
      initials: 'MM',
      logoUrl: '/assets/logos/mtn.svg',
      colorScheme: {
        bg: 'bg-yellow-50',
        text: 'text-yellow-800',
        border: 'border-yellow-200',
        pill: 'bg-yellow-100/70 text-yellow-900 border-yellow-300'
      }
    },
    {
      name: 'Huawei',
      category: language === 'fr' ? 'Infrastructure & Tech' : 'Tech Infrastructure',
      categoryKey: 'tech',
      note: language === 'fr' ? 'Conseil & Déploiements Systèmes' : 'Infrastructure & Advisory Services',
      badge: 'Global Tech',
      initials: 'HW',
      logoUrl: '/assets/logos/huawei.svg',
      colorScheme: {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        pill: 'bg-red-100/70 text-red-800 border-red-300'
      }
    },
    {
      name: 'Conforta Energy',
      category: language === 'fr' ? 'Énergies Renouvelables' : 'Renewable Ventures',
      categoryKey: 'energy',
      note: language === 'fr' ? 'Structuration Filiale & P&L Rentable' : 'Subsidiary Structuring & P&L Modeling',
      badge: '+$210K USD',
      initials: 'CE',
      logoUrl: '/assets/logos/conforta.png',
      colorScheme: {
        bg: 'bg-teal-50',
        text: 'text-teal-700',
        border: 'border-teal-200',
        pill: 'bg-teal-100/70 text-teal-800 border-teal-300'
      }
    },
    {
      name: 'YALI',
      category: language === 'fr' ? 'Développement & Leadership' : 'Leadership & Governance',
      categoryKey: 'development',
      note: language === 'fr' ? 'Centre Régional Afrique de l\'Est' : 'East Africa Regional Leadership Center',
      badge: 'Excellence',
      initials: 'YA',
      logoUrl: '/assets/logos/yali.jpg',
      colorScheme: {
        bg: 'bg-indigo-50',
        text: 'text-indigo-700',
        border: 'border-indigo-200',
        pill: 'bg-indigo-100/70 text-indigo-800 border-indigo-300'
      }
    },
    {
      name: 'Content Connect Africa',
      category: language === 'fr' ? 'Médias & Numérique' : 'Media & Content Distribution',
      categoryKey: 'tech',
      note: language === 'fr' ? 'Licensing & Droits Panafricains' : 'Pan-African Licensing & Digital Rights',
      badge: 'Pan-African',
      initials: 'CCA',
      logoUrl: '/assets/logos/cca.png',
      colorScheme: {
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-200',
        pill: 'bg-purple-100/70 text-purple-800 border-purple-300'
      }
    },
    {
      name: 'Comviva',
      category: language === 'fr' ? 'FinTech & Core Solutions' : 'Digital Finance Solutions',
      categoryKey: 'tech',
      note: language === 'fr' ? 'Intégration API & Systèmes Mobiles' : 'API Gateways & Mobile Integrations',
      badge: 'Solutions FinTech',
      initials: 'CV',
      logoUrl: '/assets/logos/comviva.svg',
      colorScheme: {
        bg: 'bg-cyan-50',
        text: 'text-cyan-700',
        border: 'border-cyan-200',
        pill: 'bg-cyan-100/70 text-cyan-800 border-cyan-300'
      }
    },
    {
      name: 'Mondia',
      category: language === 'fr' ? 'Services Numériques' : 'Digital Services & Content',
      categoryKey: 'tech',
      note: language === 'fr' ? 'Paiement Direct & Agrégation Contenus' : 'Carrier Billing & Content Aggregation',
      badge: 'Paiement Télécom',
      initials: 'MD',
      logoUrl: mondiaLogo,
      colorScheme: {
        bg: 'bg-slate-100',
        text: 'text-slate-800',
        border: 'border-slate-300',
        pill: 'bg-slate-200 text-slate-800 border-slate-300'
      }
    }
  ];

  // Filter categories
  const categories = [
    { key: 'all', label: language === 'fr' ? 'Tous les Partenaires' : 'All Partners' },
    { key: 'energy', label: language === 'fr' ? 'Solaire & CleanTech' : 'Solar & CleanTech' },
    { key: 'telecom', label: language === 'fr' ? 'Télécoms & FinTech' : 'Telecom & FinTech' },
    { key: 'development', label: language === 'fr' ? 'Bailleurs & Institutions' : 'Institutional Donors' },
    { key: 'tech', label: language === 'fr' ? 'Tech & Médias' : 'Tech & Media' }
  ];

  const filteredPartners = selectedCategory === 'all'
    ? partners
    : partners.filter(p => p.categoryKey === selectedCategory);

  // Triple the list for seamless continuous infinite marquee scrolling
  const marqueeItems = [...filteredPartners, ...filteredPartners, ...filteredPartners];

  return (
    <section id="client-trust-section" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 uppercase tracking-wider font-mono">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>{language === 'fr' ? 'Confiance & Preuve Sociale' : 'Client Trust & Social Proof'}</span>
            </div>

            <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
              {language === 'fr' ? (
                <>
                  Ils Déploient avec <span className="text-blue-700">Sechel Advisory</span> à Travers l'Afrique
                </>
              ) : (
                <>
                  Trusted by Global & Pan-African Leaders with <span className="text-blue-700">Sechel Advisory</span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {language === 'fr'
                ? 'Entreprises technologiques internationales, leaders de l\'énergie renouvelable, agences de développement et conglomérats des télécoms.'
                : 'International technology innovators, clean energy leaders, development finance agencies, and pan-African telecoms.'}
            </p>
          </div>

          {/* Social Proof Metric Chips */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="font-bold text-xs sm:text-sm text-slate-900 block leading-none font-mono">12+ Alliances</span>
                <span className="text-[10px] text-slate-500 font-medium">B2B & Multinationales</span>
              </div>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
                <Award className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="font-bold text-xs sm:text-sm text-slate-900 block leading-none font-mono">99.4% Exécution</span>
                <span className="text-[10px] text-slate-500 font-medium">Conformité ARSP / OHADA</span>
              </div>
            </div>

            <button
              id="client-trust-pause-toggle"
              onClick={() => setIsPaused(!isPaused)}
              className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-colors shadow-xs cursor-pointer"
              title={isPaused ? (language === 'fr' ? 'Reprendre le défilement' : 'Resume autoscroll') : (language === 'fr' ? 'Mettre en pause' : 'Pause autoscroll')}
              aria-label="Toggle carousel autoscroll"
            >
              {isPaused ? <Play className="w-4 h-4 text-emerald-600" /> : <Pause className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
        </div>

        {/* Industry Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                id={`filter-${cat.key}`}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Auto-Scrolling Logo Carousel Container with Fade Edges */}
      <div
        className="relative w-full overflow-hidden py-3"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left and Right Gradient Masks for Professional Polished Depth */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />

        {/* Continuous Smooth Auto-Scrolling Marquee Track */}
        <motion.div
          animate={{
            x: isPaused ? undefined : ['0%', '-33.333%']
          }}
          transition={{
            duration: selectedCategory === 'all' ? 32 : 18,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="flex items-center gap-5 w-max pl-4"
        >
          {marqueeItems.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              onClick={() => setSelectedPartner(partner)}
              className="flex-shrink-0 w-[270px] sm:w-[300px] p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              {/* Top Row: Monogram Brand Avatar + Category Pill */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold font-serif-display text-sm tracking-wider border shadow-2xs transition-transform group-hover:scale-105 overflow-hidden bg-white ${partner.colorScheme.border}`}
                  >
                    {partner.logoUrl ? (
                      <img src={partner.logoUrl} alt={partner.name} className="w-full h-full object-contain p-1.5" />
                    ) : (
                      <span className={`${partner.colorScheme.text}`}>{partner.initials}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-serif-display text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {partner.name}
                    </h3>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      {partner.category}
                    </span>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border whitespace-nowrap ${partner.colorScheme.pill}`}>
                  {partner.badge}
                </span>
              </div>

              {/* Bottom Note & Verification */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <p className="text-[11px] text-slate-600 font-normal truncate max-w-[210px]" title={partner.note}>
                  {partner.note}
                </p>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 ml-1" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Interactive Trust Statement & Navigation CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-serif-display">
                {language === 'fr' ? 'Vous préparez un déploiement stratégique en Afrique ?' : 'Planning a Strategic African Deployment?'}
              </h4>
              <p className="text-xs text-slate-500">
                {language === 'fr'
                  ? 'Nos experts structurent vos partenariats locaux, conformités ARSP/OHADA et réseaux de distribution terrain.'
                  : 'Our advisors structure local partnerships, ARSP/OHADA compliance, and boots-on-the-ground distribution.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              id="client-trust-cta-projects"
              onClick={() => setCurrentPage('projects')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{language === 'fr' ? 'Études de Cas' : 'Case Studies'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              id="client-trust-cta-contact"
              onClick={() => setCurrentPage('contact')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{language === 'fr' ? 'Initier une Mission' : 'Initiate Engagement'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal for Selected Partner */}
      {selectedPartner && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedPartner(null)}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold font-serif-display text-base border overflow-hidden bg-white ${selectedPartner.colorScheme.border}`}
                >
                  {selectedPartner.logoUrl ? (
                    <img src={selectedPartner.logoUrl} alt={selectedPartner.name} className="w-full h-full object-contain p-1.5" />
                  ) : (
                    <span className={`${selectedPartner.colorScheme.text}`}>{selectedPartner.initials}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-serif-display text-lg font-bold text-slate-900">{selectedPartner.name}</h3>
                  <p className="text-xs text-slate-500">{selectedPartner.category}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPartner(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500 uppercase">{language === 'fr' ? 'Portée de la Collaboration' : 'Collaboration Scope'}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${selectedPartner.colorScheme.pill}`}>
                  {selectedPartner.badge}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {selectedPartner.note}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{language === 'fr' ? 'Partenariat vérifié par la direction des missions Sechel Advisory.' : 'Partnership verified by Sechel Advisory executive board.'}</span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedPartner(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                {language === 'fr' ? 'Fermer' : 'Close'}
              </button>
              <button
                onClick={() => {
                  setSelectedPartner(null);
                  setCurrentPage('contact');
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
              >
                {language === 'fr' ? 'Collaborer avec Sechel' : 'Partner with Sechel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
