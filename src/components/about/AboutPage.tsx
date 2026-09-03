import React from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_INFO } from '../../data/initialData';
import { Breadcrumb } from '../common/Breadcrumb';
import { AfricaFootprintMap } from './AfricaFootprintMap';
import {
  Sparkles,
  Award,
  CheckCircle2,
  Compass,
  Zap,
  Globe2,
  Users,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  MapPin,
  Linkedin
} from 'lucide-react';
import { motion } from 'motion/react';

export const AboutPage: React.FC = () => {
  const { language, setCurrentPage } = useApp();

  const leadershipTeam = [
    {
      name: 'Associé Principal & Direction Stratégique',
      role: 'Managing Partner - Africa Growth & Energy',
      focus: 'Market Entry, Renewable Energy Structuring, Pan-African Alliances',
      bio: {
        fr: 'Plus de 15 années d\'expérience dans le déploiement de projets d\'infrastructures, télécoms et d\'énergies propres en RDC, Afrique centrale et australe.',
        en: 'Over 15 years structuring energy, telecoms, and infrastructure commercial ventures across Central and Southern Africa.'
      },
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Direction Opérationnelle & Architecture Systèmes',
      role: 'Partner - Operations & Last-Mile Logistics',
      focus: 'Last-Mile Supply Chains, BoP Healthcare, Team Enablement',
      bio: {
        fr: 'Spécialiste de la logistique du dernier kilomètre. A piloté l\'expédition historique de 2 400 km à travers le Kasaï pour le compte d\'USAID et Heta.',
        en: 'Expert in extreme last-mile logistics, having directed the 2,400 km Kasai expedition for USAID & Heta off-grid clinics.'
      },
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Direction Partenariats & FinTech',
      role: 'Senior Advisor - Telecoms & Mobile Money',
      focus: 'Orange Money, MTN MoMo, Vodacom M-Pesa, FinTech Gateways',
      bio: {
        fr: 'Expert en négociation télécoms et intégration de passerelles de paiement mobile en Afrique francophone (Cameroun, Bénin, RDC).',
        en: 'Leader in telecom negotiations and mobile wallet revenue integrations across Francophone West & Central Africa.'
      },
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const methodologySteps = [
    {
      step: '01',
      title: { fr: 'Immersion & Diagnostic Terrain 360°', en: 'Field Immersion & 360° Diagnostic' },
      desc: {
        fr: 'Analyse granulaire des freins réglementaires, douaniers et concurrentiels directement sur place, sans intermédiaires.',
        en: 'Granular assessment of regulatory, customs, and market friction points conducted directly on-site.'
      }
    },
    {
      step: '02',
      title: { fr: 'Design du Système & Modèle Économique', en: 'Systems Design & Financial Modeling' },
      desc: {
        fr: 'Conception de l\'architecture tarifaire, des flux logistiques et des mécanismes d\'incitation des distributeurs (PAYG, cash, crédit).',
        en: 'Designing pricing structures, inventory workflows, and reseller margin incentive plans (PAYG, cash, credit).'
      }
    },
    {
      step: '03',
      title: { fr: 'Négociation & Alliances Stratégiques', en: 'Strategic Deal Negotiation' },
      desc: {
        fr: 'Sélection et contractualisation des accords-cadres avec les grossistes clés, opérateurs télécoms (MoMo) et institutions.',
        en: 'Screening and negotiating master dealer framework pacts with top wholesalers, telecoms, and agencies.'
      }
    },
    {
      step: '04',
      title: { fr: 'Déploiement Opérationnel & Formation', en: 'Field Execution & Team Enablement' },
      desc: {
        fr: 'Mise en place des outils ERP/CRM, formation technique des installateurs et coaching immersif des forces de vente locales.',
        en: 'Deploying agile inventory tools, technical training for certified installers, and sales enablement.'
      }
    },
    {
      step: '05',
      title: { fr: 'Passage à l\'Échelle & Rentabilité Pérenne', en: 'Scale-Up & Profitability Autonomy' },
      desc: {
        fr: 'Suivi continu des indicateurs financiers (P&L), transfert total des compétences et autonomisation complète de votre unité.',
        en: 'P&L metric monitoring, full managerial skills transfer, and complete operational independence.'
      }
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50">
      {/* WordPress Page Header Banner (Astra / Avada Style) */}
      <div className="bg-[#0B1528] text-white py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-500/40 text-xs font-bold text-blue-300 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>{language === 'fr' ? 'Profil Institutionnel & Gouvernance' : 'Institutional Profile & Governance'}</span>
            </div>
            <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
              {language === 'fr' ? 'Conseil Stratégique & Ingénierie Opérationnelle en Afrique' : 'Strategic Advisory & Operations Engineering in Africa'}
            </h1>
            <div className="wp-divider my-2" />
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {COMPANY_INFO.heroSubheadline[language]}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pt-8">
        <Breadcrumb />
        {/* Institutional Positioning & Advisory Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-blue-600 font-mono">
              <Award className="w-4 h-4" />
              <span>POSITIONNEMENT INSTITUTIONNEL & ANCRAGE TERRAIN</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900">
              {language === 'fr' ? (
                <>
                  Réconcilier la <span className="text-blue-600">Vision Stratégique</span> et la <span className="text-amber-600">Réalité Opérationnelle</span>
                </>
              ) : (
                <>
                  Bridging <span className="text-blue-600">Strategic Vision</span> and <span className="text-amber-600">Field Execution</span>
                </>
              )}
            </h2>
            <div className="wp-divider" />
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {COMPANY_INFO.definition[language]}
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {language === 'fr'
                ? 'En Afrique subsaharienne, les modèles purement théoriques s\'effondrent dès le premier goulot d\'étranglement logistique, douanier ou monétaire. Sechel Consulting a été fondé sur une conviction centrale : la réussite d\'un projet ne se mesure pas au nombre de diapositives produites, mais à la création de valeur concrète, à la conformité légale et à la pérennité financière des opérations sur le terrain.'
                : 'Across Sub-Saharan Africa, theoretical business models often stumble against logistics bottlenecks, foreign exchange friction, and customs complexities. Sechel Consulting was established on a foundational belief: true consulting excellence is measured not by presentation decks, but by tangible revenue, full legal compliance, and resilient ground execution.'}
            </p>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif-display font-bold text-sm text-slate-900">
                  {language === 'fr' ? 'Gouvernance & Conformité Réglementaire' : 'Governance & Regulatory Accreditation'}
                </h4>
                <p className="text-xs text-blue-600 font-mono font-bold mt-0.5">
                  OHADA COMPLIANT • ARSP RDC ACCREDITED • AfCFTA ALIGNED
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white p-4">
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1000&q=80"
                alt="Strategy meeting Sechel"
                className="w-full h-80 object-cover rounded-xl"
              />
              <div className="p-4 pt-5 space-y-2 border-t border-slate-100 mt-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold">{language === 'fr' ? 'Présence Panafricaine' : 'Pan-African Reach'}</span>
                  <span className="font-bold text-slate-900">Lubumbashi • Douala • Sandton</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'fr'
                    ? 'Nos consultants allient une parfaite maîtrise des standards internationaux (USAID, multinationales) et une immersion intime dans les écosystèmes d\'affaires locaux.'
                    : 'Our senior partners combine international institutional standards with deep grassroots African business networks.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Pan-African Operational Footprint Map */}
        <AfricaFootprintMap />

        {/* 5-Step Methodology (WordPress Process Box) */}
        <div className="p-8 sm:p-12 rounded-2xl bg-white border border-slate-200 shadow-md space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === 'fr' ? 'Méthodologie Opérationnelle' : 'Our 5-Stage Framework'}</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900">
              {language === 'fr' ? 'De l\'Analyse à la Rentabilité Autonome' : 'From Scoping to Autonomous Profitability'}
            </h2>
            <div className="wp-divider mx-auto my-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {methodologySteps.map((m, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-3 group">
                <div>
                  <span className="text-xs font-mono font-bold text-white bg-blue-600 px-2 py-0.5 rounded-md inline-block mb-2">
                    PHASE {m.step}
                  </span>
                  <h3 className="font-serif-display font-bold text-xs sm:text-sm text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {m.title[language]}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {m.desc[language]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Section */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === 'fr' ? 'Direction & Experts Associés' : 'Senior Leadership'}</span>
            </div>
            <h2 className="font-serif-display text-3xl font-bold text-slate-900">
              {language === 'fr' ? 'Une Expertise Éprouvée sur le Terrain' : 'Leaders with Proven Field Track Record'}
            </h2>
            <div className="wp-divider mx-auto my-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipTeam.map((leader, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-400 transition-all p-6 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-4">
                  <div className="aspect-square w-full rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif-display font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600 mt-0.5">
                      {leader.role}
                    </p>
                    <span className="text-[11px] text-slate-500 block mt-1">
                      {leader.focus}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {leader.bio[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Contact */}
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#0B1528] to-[#142B4D] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-slate-700">
          <div className="space-y-2">
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
              {language === 'fr' ? 'Envie d\'échanger avec nos associés ?' : 'Ready to speak with our partners?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {language === 'fr'
                ? 'Planifions un diagnostic confidentiel de vos opportunités en RDC ou en Afrique centrale.'
                : 'Schedule a confidential diagnostic session for your African market roadmap.'}
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-7 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 flex-shrink-0"
          >
            <span>{language === 'fr' ? 'Prendre Rendez-vous' : 'Book Consultation'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
