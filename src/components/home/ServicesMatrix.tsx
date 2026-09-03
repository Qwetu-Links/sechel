import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Cpu,
  FolderKanban,
  SunMedium,
  Network,
  Sparkles,
  TrendingUp,
  Globe2,
  ArrowRight,
  CheckCircle2,
  Layers,
  ChevronRight,
  Zap,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  FolderKanban,
  SunMedium,
  Network,
  Sparkles,
  TrendingUp,
  Globe2
};

export const ServicesMatrix: React.FC = () => {
  const { language, services, setCurrentPage, openScopingModal, openChat } = useApp();
  const [activeTab, setActiveTab] = useState<string>(services[0]?.id || 'workflow-automation-n8n');

  const currentService = services.find((s) => s.id === activeTab) || services[0];
  const CurrentIcon = iconMap[currentService.iconName] || Layers;
  const isAutomation = currentService.id === 'workflow-automation-n8n';

  return (
    <section className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* WordPress Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'fr' ? 'Champs d\'Intervention' : 'Core Advisory Capabilities'}</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            {language === 'fr' ? 'Nos 6 Pôles d\'Expertise Stratégique' : 'Our 6 Strategic Advisory Practices'}
          </h2>
          <div className="wp-divider mx-auto my-3" />
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            {language === 'fr'
              ? 'De l\'automatisation commerciale et l\'efficacité opérationnelle aux montages solaires complexes et à la conquête de marchés panafricains.'
              : 'From sales automation and operational efficiency to solar structuring and pan-African market conquest.'}
          </p>
        </div>

        {/* 6 Services Grid / Interactive Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left list of 6 services */}
          <div className="lg:col-span-5 space-y-2">
            {services.map((service) => {
              const IconC = iconMap[service.iconName] || Layers;
              const isSelected = service.id === activeTab;
              const isServiceAuto = service.id === 'workflow-automation-n8n';

              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 flex items-center justify-between border ${
                    isSelected
                      ? 'bg-white border-blue-600 border-l-[6px] shadow-md text-blue-950 font-bold'
                      : 'bg-white hover:bg-slate-100/80 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {service.number}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold leading-tight">
                        {service.title[language]}
                      </span>
                      {isServiceAuto && (
                        <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                          <Zap className="w-3 h-3" />
                          <span>{language === 'fr' ? 'WhatsApp, Mobile Money & Facturation' : 'WhatsApp, Mobile Money & Invoicing'}</span>
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 flex-shrink-0 transition-transform ${
                      isSelected ? 'text-blue-600 translate-x-1' : 'text-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Detailed Service Spotlight */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentService.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Top Badge & Metric */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                        <CurrentIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-blue-600">
                            PÔLE 0{currentService.number}
                          </span>
                          {isAutomation && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                              ⚡ Gain 15-30h/sem.
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold font-serif-display text-slate-900">
                          {currentService.title[language]}
                        </h3>
                      </div>
                    </div>

                    <div className="text-right bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                      <span className="text-lg font-bold font-serif-display text-blue-600 block">
                        {currentService.keyMetric}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium block">
                        {currentService.metricLabel[language]}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {currentService.fullDesc[language]}
                  </p>

                  {/* Deliverables Grid */}
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-3">
                      {language === 'fr' ? 'Livrables & Actions Concrètes' : 'Key Deliverables & Action Points'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentService.deliverables[language].map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-2">
                      {language === 'fr' ? 'Profils Clients & Segments Cibles' : 'Target Client Segments'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentService.targetClients[language].map((client, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200"
                        >
                          {client}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Trigger */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-slate-500 italic">
                    {language === 'fr'
                      ? 'Feuille de route validée par nos directeurs associés.'
                      : 'Operational roadmap vetted by managing partners.'}
                  </span>
                  
                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => openScopingModal(currentService.id)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      <span>
                        {language === 'fr'
                          ? isAutomation
                            ? 'Automatiser votre entreprise maintenant'
                            : 'Structurer votre projet maintenant'
                          : isAutomation
                          ? 'Automate Your Business Now'
                          : 'Scope Your Project Now'}
                      </span>
                    </button>

                    <button
                      onClick={openChat}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all border border-emerald-300 flex items-center justify-center gap-1.5"
                    >
                      <span>{language === 'fr' ? 'Discuter avec Merveille' : 'Chat with Merveille'}</span>
                    </button>

                    <button
                      onClick={() => setCurrentPage('contact')}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-300 flex items-center justify-center gap-1.5"
                    >
                      <span>{language === 'fr' ? 'Contacter' : 'Contact'}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

