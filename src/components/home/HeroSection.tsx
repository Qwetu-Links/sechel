import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_INFO } from '../../data/initialData';
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  MapPin,
  Briefcase,
  SunMedium,
  Truck,
  ChevronRight,
  Phone,
  Activity,
  Award,
  BarChart3,
  Globe2,
  Sparkles,
  Zap,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const HeroSection: React.FC = () => {
  const { language, setCurrentPage, openScopingModal } = useApp();

  // Dynamic Rotating Words for Headline (Optimized for Dark Blue Background)
  const rotatingWords = [
    {
      fr: 'dans l\'Énergie Solaire & CleanTech',
      en: 'in Solar Energy & CleanTech',
      accent: 'text-amber-300 bg-amber-950/70 border-amber-500/50'
    },
    {
      fr: 'dans les Corridors Miniers & la Logistique',
      en: 'in Mining Corridors & Logistics',
      accent: 'text-emerald-300 bg-emerald-950/70 border-emerald-500/50'
    },
    {
      fr: 'dans la Conformité OHADA & ARSP',
      en: 'in OHADA & ARSP Compliance',
      accent: 'text-blue-300 bg-blue-950/70 border-blue-500/50'
    },
    {
      fr: 'dans la Finance & l\'Expansion Panafricaine',
      en: 'in Finance & Pan-African Expansion',
      accent: 'text-purple-300 bg-purple-950/70 border-purple-500/50'
    }
  ];

  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3600);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  // Live Deal Flow Monitoring Projects (Auto-Cycling Terminal)
  const dealFlows = [
    {
      id: 'solar',
      title: 'EcoFlow Katanga • B2B & Retail',
      location: 'Lubumbashi • RDC',
      value: '+$2.0M USD',
      progress: 94,
      status: language === 'fr' ? 'Réseau Déployé' : 'Network Active',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      icon: SunMedium,
      statLabel: language === 'fr' ? 'Grossistes agréés miniers' : 'Tier-1 mining wholesalers',
      statVal: '4 Groupes',
      detail: language === 'fr' ? 'Déplacement de groupes électrogènes & kits solaires' : 'Diesel generator displacement & commercial solar'
    },
    {
      id: 'logistics',
      title: 'USAID / Heta • 200 Dispensaires',
      location: 'Kasaï Oriental & Central',
      value: '2 400 km',
      progress: 100,
      status: language === 'fr' ? '100% Livré' : '100% Delivered',
      statusColor: 'text-blue-700 bg-blue-50 border-blue-200',
      icon: Truck,
      statLabel: language === 'fr' ? 'Centres médicaux équipés' : 'Clinics fully equipped',
      statVal: '200 Sites',
      detail: language === 'fr' ? 'Logistique sécurisée dernier kilomètre & chaîne du froid' : 'Extreme last-mile secured supply & vaccine cold chain'
    },
    {
      id: 'advisory',
      title: 'Conforta Energy • Structuration M&A',
      location: 'Kinshasa & Douala',
      value: '+$210K USD',
      progress: 88,
      status: language === 'fr' ? 'Rentabilité Validée' : 'EBITDA Validated',
      statusColor: 'text-purple-700 bg-purple-50 border-purple-200',
      icon: TrendingUp,
      statLabel: language === 'fr' ? 'Modélisation financière' : 'P&L Optimization',
      statVal: 'An 1 Profitable',
      detail: language === 'fr' ? 'Audit juridique OHADA, fiscalité et levée bancaire' : 'OHADA legal compliance, tax & institutional debt'
    }
  ];

  const [activeDealIndex, setActiveDealIndex] = useState(0);

  useEffect(() => {
    const dealTimer = setInterval(() => {
      setActiveDealIndex((prev) => (prev + 1) % dealFlows.length);
    }, 5000);
    return () => clearInterval(dealTimer);
  }, [dealFlows.length]);

  const activeDeal = dealFlows[activeDealIndex];

  const featureCards = [
    {
      icon: Briefcase,
      title: { fr: 'Stratégie & Pénétration B2B', en: 'B2B Strategy & Expansion' },
      desc: {
        fr: 'Structuration de filiales, conformité OHADA & accès direct aux réseaux de distribution en RDC.',
        en: 'Corporate structuring, OHADA regulatory compliance & direct tier-1 reseller networks.'
      },
      color: 'text-blue-400 bg-blue-950/80 border-blue-700/60',
      actionPage: 'services' as const
    },
    {
      icon: SunMedium,
      title: { fr: 'Énergie Solaire & CleanTech', en: 'Solar Energy & CleanTech' },
      desc: {
        fr: 'Remplacement de générateurs diesel, kits PAYG, cliniques hors-réseau et concessions solaires.',
        en: 'Diesel generator displacement, PAYG solar systems, off-grid healthcare and mini-grids.'
      },
      color: 'text-amber-400 bg-amber-950/80 border-amber-700/60',
      actionPage: 'services' as const
    },
    {
      icon: Truck,
      title: { fr: 'Logistique Dernier Kilomètre', en: 'Extreme Last-Mile Logistics' },
      desc: {
        fr: '2 400+ km de pistes sécurisées au Kasaï, corridors miniers du Katanga et gestion des stocks.',
        en: 'Over 2,400 km of secured expeditions across the Kasai, Katanga mining belt and supply chains.'
      },
      color: 'text-emerald-400 bg-emerald-950/80 border-emerald-700/60',
      actionPage: 'projects' as const
    },
    {
      icon: ShieldCheck,
      title: { fr: 'Bailleurs & Alliances Télécoms', en: 'Donor & Telecom Alliances' },
      desc: {
        fr: 'Accompagnement de projets USAID, banques multilatérales et intégrations Orange/M-Pesa.',
        en: 'Structuring proposals for USAID, development finance institutions and mobile money channels.'
      },
      color: 'text-purple-400 bg-purple-950/80 border-purple-700/60',
      actionPage: 'services' as const
    }
  ];

  return (
    <section className="relative bg-[#0A1628] text-white pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden border-b border-blue-950">
      {/* 1. ARCHITECTURAL GEOMETRIC BACKGROUND (Clean, Subtle Crosshair & Grid Pattern on Dark Blue) */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="arch-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1E2E4A" strokeWidth="0.8" />
              <path d="M 28 30 L 32 30 M 30 28 L 30 32" stroke="#334E75" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arch-grid)" />
        </svg>
      </div>

      {/* Gentle ambient light gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Hero Content & Animated Typography */}
          <div className="lg:col-span-7 space-y-6">
            {/* Institution Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/80 text-xs font-bold text-blue-200 tracking-wide uppercase font-mono shadow-2xs">
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span>{language === 'fr' ? 'Cabinet de Conseil Stratégique & Opérationnel' : 'Strategic & Operational Advisory Firm'}</span>
            </div>

            {/* Display Title with Smooth Word Rotator */}
            <div className="space-y-2">
              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.12] tracking-tight text-white">
                {language === 'fr' ? (
                  <>
                    Bâtir l'Avenir de l'<span className="text-blue-400">Entreprise Africaine</span>
                  </>
                ) : (
                  <>
                    Building the Future of <span className="text-blue-400">African Enterprise</span>
                  </>
                )}
              </h1>

              {/* Dynamic Continuous Word Rotator */}
              <div className="h-10 sm:h-12 overflow-hidden flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={wordIndex}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="flex items-center gap-2"
                  >
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-sm sm:text-base font-semibold border ${rotatingWords[wordIndex].accent}`}>
                      <Activity className="w-4 h-4 animate-pulse" />
                      {rotatingWords[wordIndex][language]}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {COMPANY_INFO.heroSubheadline[language]}
            </p>

            {/* Value checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{language === 'fr' ? 'Conformité OHADA & Minier' : 'OHADA & Mining Compliance'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{language === 'fr' ? 'Transition Solaire Hors-Réseau' : 'Off-grid Solar Transition'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>{language === 'fr' ? 'Distribution B2B Terrain' : 'B2B Field Distribution'}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                id="hero-cta-consultation"
                onClick={() => setCurrentPage('contact')}
                className="px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-md shadow-blue-600/30 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <span>{language === 'fr' ? 'Demander un Rendez-vous' : 'Schedule Strategy Session'}</span>
              </button>

              <button
                id="hero-cta-scoping"
                onClick={() => openScopingModal('workflow-automation-n8n')}
                className="px-5 py-3.5 rounded-lg bg-gradient-to-r from-amber-500/20 to-blue-500/20 hover:from-amber-500/30 hover:to-blue-500/30 border border-amber-400/40 text-amber-200 text-sm font-bold transition-all flex items-center gap-2 shadow-2xs hover:border-amber-300 cursor-pointer"
              >
                <span>{language === 'fr' ? 'Diagnostic Automatisation & ROI' : 'Automation & ROI Diagnostic'}</span>
              </button>

              <button
                id="hero-cta-projects"
                onClick={() => setCurrentPage('projects')}
                className="px-5 py-3.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white text-sm font-semibold transition-all flex items-center gap-2 shadow-2xs hover:border-slate-600 cursor-pointer"
              >
                <span>{language === 'fr' ? 'Nos Réalisations' : 'Case Studies'}</span>
              </button>
            </div>

            {/* Direct hotline & Live Network Indicator */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{language === 'fr' ? 'Sièges : Lubumbashi • Douala • Johannesburg' : 'Hubs: Lubumbashi • Douala • Johannesburg'}</span>
              </div>
              <span className="hidden sm:inline-block text-slate-600">•</span>
              <div className="flex items-center gap-1.5 font-mono text-emerald-400 text-[11px] font-medium">
                <Globe2 className="w-3.5 h-3.5" />
                <span>{language === 'fr' ? 'Pôles Opérationnels Actifs' : 'Active Operational Hubs'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Executive Advisory Cockpit */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl bg-white border border-slate-200/90 shadow-2xl p-6 sm:p-7 space-y-5 text-slate-900 font-['Roboto',sans-serif]">
              {/* Header card info */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold text-slate-900 tracking-wide font-mono">PORTAIL SECHEL ADVISORY</h2>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        v2.4
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">Direction des Missions & Projets Stratégiques</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{language === 'fr' ? '3 Projets Clés' : '3 Key Projects'}</span>
                </div>
              </div>

              {/* Interactive Deal Flow Tabs with Auto-Cycle Progress Indicator */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-500 uppercase tracking-wider text-[11px]">
                    {language === 'fr' ? 'Supervision des Déploiements' : 'Mission & Deployment Oversight'}
                  </span>
                  <span className="text-[11px] font-mono text-blue-600">
                    {activeDealIndex + 1} / {dealFlows.length}
                  </span>
                </div>

                {/* Progress bar that resets on every cycle */}
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    key={activeDealIndex}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5, ease: 'linear' }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>

                {/* Deal Tabs selection */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {dealFlows.map((deal, idx) => {
                    const isSelected = idx === activeDealIndex;
                    return (
                      <button
                        key={deal.id}
                        onClick={() => setActiveDealIndex(idx)}
                        className={`px-2 py-2 rounded-lg text-left transition-all border text-xs cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50 border-blue-300 shadow-2xs'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80 text-slate-600'
                        }`}
                      >
                        <div className="font-mono text-[10px] text-slate-500 truncate">{deal.location.split('•')[0]}</div>
                        <div className={`font-bold text-[11px] truncate ${isSelected ? 'text-blue-700' : 'text-slate-800'}`}>
                          {deal.title.split('•')[0]}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Deal Detail Card with Smooth Fade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDeal.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 rounded-xl bg-slate-50/90 border border-slate-200 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{activeDeal.title}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {activeDeal.location}
                      </span>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${activeDeal.statusColor}`}>
                      {activeDeal.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {activeDeal.detail}
                  </p>

                  <div className="pt-2 border-t border-slate-200/80 grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">{activeDeal.statLabel}</span>
                      <span className="text-xs font-bold text-slate-900 font-mono">{activeDeal.statVal}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">Impact Chiffré</span>
                      <span className="text-xs font-bold text-blue-700 font-mono">{activeDeal.value}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Key verified metrics grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-1 border-t border-slate-100">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-xl font-bold font-serif-display text-slate-900">+$4.5M USD</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {language === 'fr' ? 'Chiffre d\'affaires structuré' : 'Structured client turnover'}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-xl font-bold font-serif-display text-emerald-700">99.4%</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {language === 'fr' ? 'Taux d\'exécution des missions' : 'Mission execution rate'}
                  </p>
                </div>
              </div>

              {/* Bottom Direct Contact */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {language === 'fr' ? 'Audit stratégique confidentiel :' : 'Confidential diagnostic:'}
                </span>
                <a
                  href={`tel:${COMPANY_INFO.contacts.phone}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors font-mono"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{COMPANY_INFO.contacts.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. FEATURE CARDS (Clean Grid, Crisp Elevation on Dark Blue) */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featureCards.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                onClick={() => setCurrentPage(feat.actionPage)}
                className="group p-6 rounded-xl bg-[#131B2E] hover:bg-[#1A2642] text-white border border-slate-700/90 shadow-md hover:shadow-xl hover:border-blue-500/70 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-4 transition-transform group-hover:scale-105 ${feat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-display text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {feat.title[language]}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-normal">
                    {feat.desc[language]}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs font-bold text-blue-400 group-hover:text-blue-300">
                  <span>{language === 'fr' ? 'En savoir plus' : 'Learn more'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

