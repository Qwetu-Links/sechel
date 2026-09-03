import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_INFO } from '../../data/initialData';
import {
  Compass,
  TrendingUp,
  Award,
  Zap,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileCheck,
  Layers,
  Clock,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';

export const PhilosophySection: React.FC = () => {
  const { language, setCurrentPage } = useApp();
  const [activeStage, setActiveStage] = useState<number>(0);

  const pillars = [
    {
      code: 'PIL-01',
      title: { fr: 'Intelligence Économique & Due Diligence Terrain', en: 'Economic Intelligence & Field Due Diligence' },
      badge: { fr: 'Conformité OHADA & ARSP', en: 'OHADA & Mining Compliance' },
      desc: {
        fr: 'Analyse granulaire des cadres juridiques OHADA, de la loi sur la sous-traitance ARSP en RDC et des chaînes de valeur minières et commerciales locales.',
        en: 'In-depth audit of OHADA corporate law, DRC ARSP subcontracting frameworks, and mining value chains across Central and Southern Africa.'
      },
      deliverables: {
        fr: ['Cartographie des acteurs clés', 'Audit réglementaire & fiscal', 'Matrice d\'évaluation des risques'],
        en: ['Key stakeholder mapping', 'Regulatory & tax audit', 'Risk mitigation matrix']
      },
      icon: Compass,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      code: 'PIL-02',
      title: { fr: 'Ingénierie Financière & Modélisation Économique', en: 'Financial Structuring & Economic Modeling' },
      badge: { fr: 'Modèles Capex / Opex & PAYG', en: 'Capex / Opex & PAYG Models' },
      desc: {
        fr: 'Conception de modèles d\'affaires robustes : structuration tarifaire multi-devises (USD / CDF / XAF), plans de trésorerie et marges distributeurs sécurisées.',
        en: 'Designing resilient business models: multi-currency pricing (USD/CDF/XAF), cash-flow forecasting, and master dealer margin incentive frameworks.'
      },
      deliverables: {
        fr: ['P&L prévisionnel dynamique', 'Modélisation du seuil de rentabilité', 'Grilles tarifaires adaptées au pouvoir d\'achat'],
        en: ['Dynamic P&L model', 'Break-even financial scoping', 'Purchasing-power adjusted price tiers']
      },
      icon: TrendingUp,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      code: 'PIL-03',
      title: { fr: 'Structuration Commerciale & Alliances Tier-1', en: 'Commercial Structuring & Tier-1 Alliances' },
      badge: { fr: 'Accords Grossistes & Télécoms', en: 'Master Resellers & Telecom Rails' },
      desc: {
        fr: 'Négociation d\'accords-cadres exclusifs avec les plus grands réseaux de distribution, intégration de la monétique mobile (Orange Money, MTN MoMo, M-Pesa).',
        en: 'Negotiating exclusive framework contracts with tier-1 wholesalers and integrating frictionless Mobile Money billing gateways.'
      },
      deliverables: {
        fr: ['Contrats de distribution exclusifs', 'Interconnexion passerelles Mobile Money', 'Protocoles de gouvernance de marque'],
        en: ['Exclusive distribution contracts', 'Mobile Money API integration', 'Brand governance pacts']
      },
      icon: Award,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      code: 'PIL-04',
      title: { fr: 'Déploiement Opérationnel & Conduite du Changement', en: 'Operational Deployment & Field Execution' },
      badge: { fr: 'Dernier Kilomètre & ERP/CRM', en: 'Last-Mile & Operational ERP' },
      desc: {
        fr: 'Présence physique sur le terrain : encadrement logistique sur les axes miniers et ruraux, formation continue des équipes locales et outillage de pilotage.',
        en: 'Hands-on execution: fleet and logistics supervision across rugged corridors, technical certification of local teams, and ERP/CRM roll-out.'
      },
      deliverables: {
        fr: ['Manuels opératoires de procédure (SOP)', 'Système de reporting analytique', 'Autonomisation de la direction de filiale'],
        en: ['Standard Operating Procedures (SOP)', 'Weekly analytics dashboards', 'Full local managerial autonomy']
      },
      icon: Zap,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    }
  ];

  const executionStages = [
    {
      stage: 'Phase 01',
      period: { fr: 'Semaines 1 à 4', en: 'Weeks 1 to 4' },
      title: { fr: 'Cadrage Réglementaire & Audit 360°', en: 'Regulatory Scoping & 360° Audit' },
      focus: {
        fr: 'Validation juridique OHADA, consultation des autorités sectorielles (ARSP, Douanes) et étude de la solvabilité des distributeurs cibles.',
        en: 'OHADA legal compliance verification, sector authority consultation (ARSP, Customs), and solvency audits of prospective distributors.'
      },
      lead: { fr: 'Associé Stratégie & Juridique', en: 'Senior Legal & Strategy Partner' },
      output: { fr: 'Dossier d\'Homologation & Diagnostic de Marché', en: 'Market Feasibility & Regulatory Clearance File' }
    },
    {
      stage: 'Phase 02',
      period: { fr: 'Semaines 5 à 10', en: 'Weeks 5 to 10' },
      title: { fr: 'Architecture Financière & Négociation Tier-1', en: 'Financial Architecture & Tier-1 Contracting' },
      focus: {
        fr: 'Modélisation des marges commerciales, négociation des contrats-cadres d\'approvisionnement et paramétrage des canaux de paiement mobile.',
        en: 'Wholesale margin modeling, execution of binding master dealer agreements, and Mobile Money API settlement configuration.'
      },
      lead: { fr: 'Directeur Ingénierie Financière', en: 'Financial Structuring Lead' },
      output: { fr: 'Contrats de Partenariat Signés & Business Plan Bancable', en: 'Executed Distribution Pacts & Bankable P&L' }
    },
    {
      stage: 'Phase 03',
      period: { fr: 'Mois 3 à 6', en: 'Months 3 to 6' },
      title: { fr: 'Déploiement Logistique & Formation Opérationnelle', en: 'Logistics Rollout & Team Enablement' },
      focus: {
        fr: 'Supervision de la chaîne logistique jusqu\'au dernier kilomètre, certification technique des installateurs et coaching de la force de vente.',
        en: 'Supervision of last-mile inventory transit, technical certification of installation engineers, and intensive sales coaching.'
      },
      lead: { fr: 'Directeur des Opérations Terrain', en: 'Field Operations Director' },
      output: { fr: 'Réseau Distributeur Actif & Outils ERP Opérationnels', en: 'Active Reseller Network & ERP Cockpit Live' }
    },
    {
      stage: 'Phase 04',
      period: { fr: 'Mois 6 à 12', en: 'Months 6 to 12' },
      title: { fr: 'Stabilisation P&L & Transfert de Compétences', en: 'P&L Stabilization & Skills Transfer' },
      focus: {
        fr: 'Suivi hebdomadaire des encaissements et ratios d\'exploitation, optimisation des stocks et passage de témoin complet au management local.',
        en: 'Weekly cash reconciliation monitoring, inventory replenishment optimization, and full governance transfer to local executives.'
      },
      lead: { fr: 'Comité de Gouvernance & Associés', en: 'Executive Governance Committee' },
      output: { fr: 'Unité Commerciale Rentable & Autonome', en: 'Profitable, Self-Sustaining Operating Unit' }
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Enterprise Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === 'fr' ? 'Méthodologie & Cadre d\'Intervention' : 'Advisory Framework & Methodology'}</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              {language === 'fr' ? (
                <>
                  L'Ingénierie d'Affaires au Service de la <span className="text-blue-600">Performance Réelle</span>
                </>
              ) : (
                <>
                  Enterprise Engineering Driven by <span className="text-blue-600">Measurable Performance</span>
                </>
              )}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
              {COMPANY_INFO.missionStatement[language]}
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 w-full sm:w-auto">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-900 uppercase">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Normes & Gouvernance</span>
              </div>
              <p className="text-xs text-slate-600">
                {COMPANY_INFO.accreditation[language]}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Pillars Enterprise Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => {
            const IconComp = pillar.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-400 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-lg ${pillar.color} border flex items-center justify-center`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {pillar.code}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wide block mb-1">
                      {pillar.badge[language]}
                    </span>
                    <h3 className="font-serif-display font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                      {pillar.title[language]}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc[language]}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    {language === 'fr' ? 'Livrables contractuels :' : 'Key deliverables:'}
                  </span>
                  {pillar.deliverables[language].map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                      <CheckCircle2 className="w-3 h-3 text-blue-600 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enterprise Execution Matrix (Odoo / Django ERP Style Tabbed Workflow View) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
                  MATRICE D'ENGAGEMENT OPÉRATIONNEL
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  ISO / OHADA Standard
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif-display text-white mt-1">
                {language === 'fr' ? 'Cycle d\'Exécution d\'une Mission Sechel' : 'Sechel Advisory Mission Execution Cycle'}
              </h3>
            </div>

            {/* Stage Selector Tabs (ERP style tabs) */}
            <div className="flex flex-wrap gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700">
              {executionStages.map((stg, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => setActiveStage(sIdx)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
                    activeStage === sIdx
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {stg.stage}
                </button>
              ))}
            </div>
          </div>

          {/* Active Stage Data Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-blue-900/60 text-blue-300 border border-blue-500/30">
                  {executionStages[activeStage].period[language]}
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-white">
                  {executionStages[activeStage].title[language]}
                </h4>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {executionStages[activeStage].focus[language]}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-lg bg-slate-800/70 border border-slate-700/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Users className="w-3.5 h-3.5 text-blue-400" />
                    <span>{language === 'fr' ? 'Supervision Associée' : 'Lead Partner'}</span>
                  </div>
                  <p className="text-xs font-bold text-white">
                    {executionStages[activeStage].lead[language]}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-800/70 border border-slate-700/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{language === 'fr' ? 'Livrable Contractuel Clé' : 'Binding Deliverable'}</span>
                  </div>
                  <p className="text-xs font-bold text-emerald-300">
                    {executionStages[activeStage].output[language]}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 p-5 rounded-xl bg-slate-800/90 border border-slate-700 space-y-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                {language === 'fr' ? 'Garanties d\'exécution :' : 'Execution Guarantees:'}
              </span>
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Présence physique des consultants à Lubumbashi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Comptabilité transparente en dollars et monnaies locales</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Clause d'intéressement au chiffre d'affaires</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <span>{language === 'fr' ? 'Lancer un Cadrage Initial' : 'Request Diagnostic Scoping'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
