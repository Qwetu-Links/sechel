import React from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import {
  FolderKanban,
  SunMedium,
  Network,
  Sparkles,
  TrendingUp,
  Globe2,
  Cpu,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Bot
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  FolderKanban,
  SunMedium,
  Network,
  Sparkles,
  TrendingUp,
  Globe2
};

export const ServicesPage: React.FC = () => {
  const { language, services, setCurrentPage, openScopingModal } = useApp();

  // Generate structured data schema for SEO targeting DRC and Africa
  const generateSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfessionalService",
          "@id": "https://sechel.consulting/#organization",
          "name": "Sechel Consulting",
          "description": language === 'fr' ? 'Cabinet de conseil en automatisation (n8n), structuration solaire et expansion commerciale en Afrique.' : 'Consulting firm in automation (n8n), solar structuring, and market expansion in Africa.',
          "areaServed": [
            { "@type": "Country", "name": "Democratic Republic of the Congo" },
            { "@type": "Continent", "name": "Africa" }
          ],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kinshasa",
            "addressCountry": "CD"
          }
        },
        ...services.map((service) => ({
          "@type": "Service",
          "name": service.title[language],
          "description": service.fullDesc[language],
          "provider": { "@id": "https://sechel.consulting/#organization" },
          "areaServed": [
            { "@type": "Country", "name": "Democratic Republic of the Congo" },
            { "@type": "Continent", "name": "Africa" }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": language === 'fr' ? 'Livrables Clés' : 'Core Deliverables',
            "itemListElement": service.deliverables[language].map((del) => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": del
              }
            }))
          }
        }))
      ]
    };
    return JSON.stringify(schema);
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50">
      {/* SEO Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: generateSchema() }} />
      
      {/* Page Header Banner */}
      <div className="bg-[#0B1528] text-white py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-500/40 text-xs font-bold text-blue-300 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>{language === 'fr' ? 'Nos Pôles d\'Intervention' : 'Our Practice Areas'}</span>
            </div>
            <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
              {language === 'fr' ? '6 Piliers Stratégiques pour Accélérer Votre Réussite en Afrique' : '6 Core Strategic Pillars for Sustainable African Scale'}
            </h1>
            <div className="wp-divider my-2" />
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {language === 'fr'
                ? 'De l\'automatisation de processus avec n8n jusqu\'à la structuration solaire et l\'expansion commerciale panafricaine.'
                : 'From n8n workflow automation to off-grid solar structuring and pan-African market expansion.'}
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid Full Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pt-8">
        <Breadcrumb className="mb-2" />

        {/* Featured Automation Callout Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 border border-blue-500/30 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'fr' ? 'Priorité Productivité • n8n & Agents Intelligents' : 'High Velocity • n8n & Workflow Automation'}</span>
            </div>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
              {language === 'fr'
                ? 'Automatisez vos opérations & gagnez 15 à 30h par semaine'
                : 'Automate repetitive workflows & reclaim 15 to 30 hours every week'}
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              {language === 'fr'
                ? 'Supprimez les saisies manuelles, synchronisez vos ERP/CRM, automatisez la facturation et qualifiez vos prospects WhatsApp 24/7 avec des flux n8n robustes et sécurisés.'
                : 'Eliminate manual data entries, sync ERP/CRMs, automate billing, and qualify WhatsApp inquiries 24/7 with resilient n8n and automated pipelines.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto relative z-10 flex-shrink-0">
            <button
              onClick={() => openScopingModal('workflow-automation-n8n')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{language === 'fr' ? 'Cadrer mon automatisation' : 'Run Workflow Scoping'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = iconMap[service.iconName] || Layers;
            const isAutomation = service.id === 'workflow-automation-n8n';

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className={`rounded-2xl bg-white border p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-6 group ${
                  isAutomation ? 'border-blue-400 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-blue-400'
                }`}
              >
                <div className="space-y-4">
                  {/* Top bar with number, badge and icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                        PILIER {service.number}
                      </span>
                      {isAutomation && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-600" />
                          <span>VEDETTE</span>
                        </span>
                      )}
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif-display text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                    {service.title[language]}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {service.fullDesc[language]}
                  </p>

                  {/* Deliverables List */}
                  <div className="pt-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">
                      {language === 'fr' ? 'Livrables Clés :' : 'Core Deliverables:'}
                    </span>
                    <ul className="space-y-2">
                      {service.deliverables[language].slice(0, 3).map((del, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Metric and CTA */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[11px] text-slate-500 font-medium">{service.metricLabel[language]}</span>
                    <span className="font-serif-display font-bold text-blue-600 text-sm">{service.keyMetric}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => openScopingModal(service.id)}
                      className="py-2.5 px-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>{language === 'fr' ? 'Cadrage Mission' : 'Mission Scoping'}</span>
                    </button>

                    <button
                      onClick={() => setCurrentPage('contact')}
                      className="py-2.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold transition-all border border-slate-300 flex items-center justify-center gap-1"
                    >
                      <span>{language === 'fr' ? 'Contacter' : 'Inquire'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-serif-display text-xl font-bold text-slate-900">
              {language === 'fr' ? 'Besoin d\'un accompagnement transversal multi-pôles ?' : 'Need a cross-functional multi-disciplinary roadmap?'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              {language === 'fr'
                ? 'Nos missions combinent régulièrement automatisation n8n, structuration solaire, expansion commerciale et intégration FinTech.'
                : 'Our client engagements regularly combine n8n automation, solar structuring, wholesale scaling, and FinTech integration.'}
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-7 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md flex-shrink-0"
          >
            {language === 'fr' ? 'Échanger avec un Associé' : 'Speak to a Partner'}
          </button>
        </div>
      </div>
    </div>
  );
};

