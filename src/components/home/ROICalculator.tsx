import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calculator, Sparkles, ArrowRight, CheckCircle2, TrendingUp, ShieldCheck, DollarSign } from 'lucide-react';

export const ROICalculator: React.FC = () => {
  const { language, setCurrentPage } = useApp();

  const [sector, setSector] = useState<'solar' | 'fintech' | 'b2b_trade' | 'health_esg'>('solar');
  const [targetRegion, setTargetRegion] = useState<'katanga' | 'kasai' | 'kinshasa' | 'cameroon' | 'panafrican'>('katanga');
  const [stage, setStage] = useState<'early' | 'scaling' | 'established'>('scaling');

  // Dynamic calculations based on real parameters
  const calculations = {
    solar: {
      katanga: {
        model: language === 'fr' ? 'Réseau Distributeurs Agréés + B2B Minier' : 'Tier-1 Master Resellers + Mining B2B',
        timeline: language === 'fr' ? '4 à 6 mois pour rentabilité' : '4 to 6 months to break-even',
        potentialVolume: '$300K - $1.5M+ USD / an',
        strategicLever: language === 'fr' ? 'Remplacement direct des groupes électrogènes et hubs hors-réseau' : 'Direct diesel displacement & off-grid industrial hubs'
      },
      kasai: {
        model: language === 'fr' ? 'Kits PAYG + Partenariat Bailleurs / Santé' : 'PAYG Kits + Institutional Donor/Health Alliance',
        timeline: language === 'fr' ? '3 à 5 mois de déploiement terrain' : '3 to 5 months field deployment',
        potentialVolume: '200 à 1,000 centres équipés',
        strategicLever: language === 'fr' ? 'Subventions mixtes et micro-crédits communautaires' : 'Blended donor finance & community micro-credits'
      },
      kinshasa: {
        model: language === 'fr' ? 'Retail Urbain & Grands Comptes Commerciaux' : 'Urban Retail & Commercial Key Accounts',
        timeline: language === 'fr' ? '6 à 9 mois' : '6 to 9 months',
        potentialVolume: '$500K - $2M+ USD / an',
        strategicLever: language === 'fr' ? 'Vente aux PME et résidences haut de gamme' : 'Commercial SME & high-income residential adoption'
      },
      cameroon: {
        model: language === 'fr' ? 'Partenariat Télécom & Kiosques Orange/MoMo' : 'Telecom Alliances & Orange/MoMo Retail Kiosks',
        timeline: language === 'fr' ? '4 à 8 mois' : '4 to 8 months',
        potentialVolume: '$400K - $1.2M+ USD / an',
        strategicLever: language === 'fr' ? 'Paiement sans friction par prélèvement mobile' : 'Frictionless mobile wallet recurring billing'
      },
      panafrican: {
        model: language === 'fr' ? 'Holding & Filiales Multi-pays (Sandton / Douala / RDC)' : 'Multi-country Holding & Subs (Sandton / Douala / DRC)',
        timeline: language === 'fr' ? '9 à 14 mois' : '9 to 14 months',
        potentialVolume: '$2M - $5M+ USD / an',
        strategicLever: language === 'fr' ? 'Optimisation fiscale OHADA et chaîne d\'approvisionnement groupée' : 'OHADA tax optimization & aggregated regional procurement'
      }
    },
    fintech: {
      katanga: {
        model: language === 'fr' ? 'Intégration M-Pesa / Airtel Money pour commerce B2B' : 'M-Pesa / Airtel Money Integration for B2B Retail',
        timeline: language === 'fr' ? '3 à 4 mois' : '3 to 4 months',
        potentialVolume: '$1M+ USD en flux mensuel',
        strategicLever: language === 'fr' ? 'Sécurisation des paiements marchands en dollar et franc congolais' : 'Multi-currency USD/CDF payment settlement'
      },
      kasai: {
        model: language === 'fr' ? 'Micro-paiements ruraux et inclusion financière' : 'Rural micro-wallets and cash-in/cash-out agency',
        timeline: language === 'fr' ? '5 à 7 mois' : '5 to 7 months',
        potentialVolume: '50K+ transactions mensuelles',
        strategicLever: language === 'fr' ? 'Réseaux d\'agents mobiles le long des axes miniers et agricoles' : 'Field mobile agent networks along transport corridors'
      },
      kinshasa: {
        model: language === 'fr' ? 'Passerelles de paiement eCommerce & facturation PME' : 'eCommerce checkout gateways & SME automated invoicing',
        timeline: language === 'fr' ? '2 à 4 mois' : '2 to 4 months',
        potentialVolume: '$3M+ USD flux traité',
        strategicLever: language === 'fr' ? 'Partenariats banques commerciales et régulateurs BCC' : 'Commercial bank API links and Central Bank compliance'
      },
      cameroon: {
        model: language === 'fr' ? 'Intégration Orange Money & MTN Mobile Money Cameroun' : 'Orange Money & MTN MoMo Cameroon Deep Hook',
        timeline: language === 'fr' ? '3 à 5 mois' : '3 to 5 months',
        potentialVolume: '$2M+ USD flux / an',
        strategicLever: language === 'fr' ? 'Encaissement automatique récurrent pour abonnements' : 'Automated recurring direct debit for utilities'
      },
      panafrican: {
        model: language === 'fr' ? 'Plateforme de paiement cross-border Afrique Centrale & Australe' : 'Cross-border payment infrastructure Central/Southern Africa',
        timeline: language === 'fr' ? '8 à 12 mois' : '8 to 12 months',
        potentialVolume: '$10M+ USD flux annuel',
        strategicLever: language === 'fr' ? 'Règlement multidevises instantané (USD, ZAR, XAF, CDF)' : 'Real-time multi-currency clearing (USD, ZAR, XAF, CDF)'
      }
    },
    b2b_trade: {
      katanga: {
        model: language === 'fr' ? 'Distribution Exclusive Grands Comptes Miniers & Industrie' : 'Exclusive Dealership for Mining & Heavy Industry',
        timeline: language === 'fr' ? '3 à 6 mois' : '3 to 6 months',
        potentialVolume: '$500K - $3M+ USD / an',
        strategicLever: language === 'fr' ? 'Accords-cadres avec sous-traitants miniers certifiés ARSP' : 'ARSP-certified mining contractor framework pacts'
      },
      kasai: {
        model: language === 'fr' ? 'Comptoirs de gros et distribution de biens essentiels' : 'Wholesale depots & essential supplies logistics',
        timeline: language === 'fr' ? '4 à 7 mois' : '4 to 7 months',
        potentialVolume: '$200K - $800K USD / an',
        strategicLever: language === 'fr' ? 'Logistique sécurisée via voies ferrées et convois routiers' : 'Secured rail & convoy logistics'
      },
      kinshasa: {
        model: language === 'fr' ? 'Distribution moderne grande surface & revendeurs de gros' : 'Modern supermarket FMCG & wholesale dealer networks',
        timeline: language === 'fr' ? '3 à 5 mois' : '3 to 5 months',
        potentialVolume: '$1M - $4M+ USD / an',
        strategicLever: language === 'fr' ? 'Visibilité de marque et conditions de crédit négociées' : 'Brand activation & trade credit insurance'
      },
      cameroon: {
        model: language === 'fr' ? 'Hub Douala vers Afrique Centrale (Tchad, RCA, Congo)' : 'Douala Hub Serving Chad, CAR, and Congo Basin',
        timeline: language === 'fr' ? '4 à 6 mois' : '4 to 6 months',
        potentialVolume: '$1.5M - $5M+ USD / an',
        strategicLever: language === 'fr' ? 'Transit portuaire Douala et accords douaniers CEMAC' : 'Douala port logistics & CEMAC customs corridors'
      },
      panafrican: {
        model: language === 'fr' ? 'Réseau de filiales intégrées ZLECAF (Zone de libre-échange)' : 'AfCFTA integrated regional distribution subsidiaries',
        timeline: language === 'fr' ? '10 à 18 mois' : '10 to 18 months',
        potentialVolume: '$5M - $20M+ USD / an',
        strategicLever: language === 'fr' ? 'Harmonisation juridique et contrats cadres d\'import-export' : 'Harmonized trade pacts and import-export frameworks'
      }
    },
    health_esg: {
      katanga: {
        model: language === 'fr' ? 'Électrification de cliniques minières & RSE d\'entreprise' : 'Mining clinic solar electrification & corporate CSR',
        timeline: language === 'fr' ? '3 à 5 mois' : '3 to 5 months',
        potentialVolume: '$300K - $1M+ USD / an',
        strategicLever: language === 'fr' ? 'Financement obligatoire RSE des opérateurs miniers' : 'Mandatory mining CSR budget allocation'
      },
      kasai: {
        model: language === 'fr' ? 'Programme HETA / Électrification 200 centres de santé' : 'HETA Health Facility Solarization (200 Clinics)',
        timeline: language === 'fr' ? '4 à 8 mois' : '4 to 8 months',
        potentialVolume: '200+ centres de santé équipés',
        strategicLever: language === 'fr' ? 'Modèle répliqué de la mission Heta / Kasaï' : 'Replication of proven Heta / Kasai operational blueprint'
      },
      kinshasa: {
        model: language === 'fr' ? 'Partenariats Public-Privé (PPP) & Ministère de la Santé' : 'Public-Private Partnerships (PPP) & Ministry of Health',
        timeline: language === 'fr' ? '6 à 12 mois' : '6 to 12 months',
        potentialVolume: '100+ hôpitaux et maternités',
        strategicLever: language === 'fr' ? 'Contrats d\'énergie continue garantie (SLA 99.5%)' : 'Guaranteed continuous power uptime SLAs'
      },
      cameroon: {
        model: language === 'fr' ? 'Programmes de santé rurale et chaîne de froid vaccinale' : 'Rural Health Programs & Solar Vaccine Cold Chain',
        timeline: language === 'fr' ? '4 à 8 mois' : '4 to 8 months',
        potentialVolume: '80+ centres équipés',
        strategicLever: language === 'fr' ? 'Certification OMS et traçabilité IoT en temps réel' : 'WHO standards & real-time IoT monitoring'
      },
      panafrican: {
        model: language === 'fr' ? 'Fonds d\'Impact ESG Panafricain & Électrification Sanitaire' : 'Pan-African ESG Impact Facility & Clinic Electrification',
        timeline: language === 'fr' ? '8 à 15 mois' : '8 to 15 months',
        potentialVolume: '500+ centres de santé à l\'échelle',
        strategicLever: language === 'fr' ? 'Crédits carbone et co-financement climatique international' : 'Carbon credits & blended climate finance'
      }
    }
  };

  const currentCalc = calculations[sector][targetRegion];

  return (
    <section className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* WordPress Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'fr' ? 'Outil Interactif de Cadrage' : 'Interactive Scoping Tool'}</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            {language === 'fr'
              ? 'Simulateur d\'Opportunité & Modèle Opérationnel'
              : 'Market Expansion & Feasibility Estimator'}
          </h2>
          <div className="wp-divider mx-auto my-3" />
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            {language === 'fr'
              ? 'Configurez votre secteur et zone cible pour visualiser immédiatement le modèle de structuration recommandé par Sechel Consulting.'
              : 'Select your sector and target African territory to discover the operational blueprint recommended by Sechel.'}
          </p>
        </div>

        {/* Diagnostic Simulator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            {/* Step 1: Sector */}
            <div>
              <label className="block text-xs uppercase font-bold tracking-wider text-slate-600 mb-2.5">
                1. {language === 'fr' ? 'Votre Secteur d\'Activité' : 'Your Business Sector'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'solar', label: { fr: 'Solaire & CleanTech', en: 'Solar & CleanTech' } },
                  { id: 'fintech', label: { fr: 'FinTech & Télécoms', en: 'FinTech & Telecoms' } },
                  { id: 'b2b_trade', label: { fr: 'Commerce B2B & Négoce', en: 'B2B Trade & Distribution' } },
                  { id: 'health_esg', label: { fr: 'Santé & Impact ESG', en: 'Health & ESG Impact' } },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSector(s.id as any)}
                    className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border ${
                      sector === s.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {s.label[language]}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Target Region */}
            <div>
              <label className="block text-xs uppercase font-bold tracking-wider text-slate-600 mb-2.5">
                2. {language === 'fr' ? 'Territoire Cible Prioritaire' : 'Priority Target Geography'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'katanga', label: 'Grand Katanga (RDC)' },
                  { id: 'kasai', label: 'Kasaï Rural & Urbain' },
                  { id: 'kinshasa', label: 'Kinshasa & Ouest' },
                  { id: 'cameroon', label: 'Cameroun (Douala)' },
                  { id: 'panafrican', label: 'Multi-Pays Panafricain' }
                ].map((reg) => (
                  <button
                    key={reg.id}
                    onClick={() => setTargetRegion(reg.id as any)}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-center transition-all border ${
                      targetRegion === reg.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {reg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Maturity */}
            <div>
              <label className="block text-xs uppercase font-bold tracking-wider text-slate-600 mb-2.5">
                3. {language === 'fr' ? 'Maturité Actuelle du Projet' : 'Current Project Maturity'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'early', label: { fr: 'Phase de Cadrage', en: 'Ideation / Scoping' } },
                  { id: 'scaling', label: { fr: 'Prêt au Lancement', en: 'Ready to Launch' } },
                  { id: 'established', label: { fr: 'Passage à l\'Échelle', en: 'Scale-Up' } }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setStage(st.id as any)}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-center transition-all border ${
                      stage === st.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {st.label[language]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Column (Corporate Executive WordPress Panel) */}
          <div className="lg:col-span-6 bg-[#0B1528] text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-xs uppercase font-bold tracking-wider text-blue-300">
                    {language === 'fr' ? 'Architecture Opérationnelle Recommandée' : 'Recommended Operational Architecture'}
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-blue-900/60 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-700">
                  SECHEL V4 FRAMEWORK
                </span>
              </div>

              {/* Model */}
              <div>
                <span className="text-[11px] text-slate-400 block mb-1 uppercase tracking-wider font-semibold">
                  {language === 'fr' ? 'Modèle de Distribution Optimal' : 'Optimal Distribution Model'}
                </span>
                <p className="text-lg sm:text-xl font-serif-display font-bold text-white">
                  {currentCalc.model}
                </p>
              </div>

              {/* Grid 2 Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                    {language === 'fr' ? 'Potentiel / Capacité Estimée' : 'Estimated Market Potential'}
                  </span>
                  <span className="text-sm font-bold text-emerald-400 block mt-0.5">
                    {currentCalc.potentialVolume}
                  </span>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                    {language === 'fr' ? 'Délai Moyen d\'Exécution' : 'Estimated Time-to-Scale'}
                  </span>
                  <span className="text-sm font-bold text-amber-400 block mt-0.5">
                    {currentCalc.timeline}
                  </span>
                </div>
              </div>

              {/* Strategic Lever */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
                <span className="text-[11px] font-bold text-blue-300 flex items-center gap-1.5 mb-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{language === 'fr' ? 'Levier Stratégique Clé' : 'Key Strategic Growth Driver'}</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentCalc.strategicLever}
                </p>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="pt-6 mt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[11px] text-slate-400">
                {language === 'fr'
                  ? 'Plan détaillé prêt à être déployé par nos équipes.'
                  : 'Ready-to-deploy execution roadmap by Sechel.'}
              </span>
              <button
                onClick={() => setCurrentPage('contact')}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>{language === 'fr' ? 'Demander l\'Étude Détaillée' : 'Request Full Execution Plan'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
