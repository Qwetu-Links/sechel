import React from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_INFO } from '../../data/initialData';
import { Breadcrumb } from '../common/Breadcrumb';
import { ConsultationRequestWizard } from './ConsultationRequestWizard';
import {
  Mail,
  Phone,
  MessageSquare,
  Building,
  ShieldCheck,
  Clock,
  Award,
  FileText,
  Lock,
  Headphones
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language } = useApp();

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      {/* Enterprise Header Banner */}
      <div className="bg-[#0B1528] text-white py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-500/40 text-xs font-bold text-blue-300 uppercase tracking-wider font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>{language === 'fr' ? 'Portail de Cadrage & Prise de Mission' : 'Executive Engagement Intake'}</span>
            </div>
            <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
              {language === 'fr' ? 'Initiez une Mission avec nos Associés Seniors' : 'Initiate an Engagement with Our Senior Partners'}
            </h1>
            <div className="wp-divider my-2" />
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {language === 'fr'
                ? 'Que vous prépariez une entrée sur le marché congolais, une structuration solaire Capex/Opex, une mise en conformité ARSP ou une restructuration commerciale, notre cabinet intervient sous protocole de stricte confidentialité.'
                : 'Whether structuring off-grid clean energy, negotiating mining subcontracting clearance (ARSP), or launching last-mile distribution across Central & Southern Africa, our firm operates under strict NDA protocols.'}
            </p>

            {/* Quick Guarantees Row */}
            <div className="flex flex-wrap gap-4 pt-3 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>{language === 'fr' ? 'Accusé & Réponse sous 24h ouvrées' : 'Executive review within 24 business hours'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>{language === 'fr' ? 'Accord de Non-Divulgation (NDA)' : 'Mutual Non-Disclosure Agreement (NDA)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>{language === 'fr' ? 'Conformité OHADA & ARSP RDC' : 'OHADA & DRC ARSP Compliant'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <Breadcrumb className="mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Column: Dedicated Multi-Step Consultation Request Wizard */}
          <div className="lg:col-span-8">
            <ConsultationRequestWizard />
          </div>

          {/* Right Column: Direct Executive Channels & Regional Hubs */}
          <div className="lg:col-span-4 space-y-6">
            {/* Direct Channels Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-display text-lg font-bold text-slate-900">
                  {language === 'fr' ? 'Canaux Directs d\'Urgence' : 'Direct Executive Channels'}
                </h3>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Ligne Ouverte" />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'fr'
                  ? 'Pour les situations opérationnelles critiques (rupture logistique, audit douanier, appel d\'offres minier urgent), notre secrétariat général est joignable directement.'
                  : 'For urgent operational situations (logistics alerts, mining tender deadlines, customs hold), our executive office is directly reachable.'}
              </p>

              <div className="space-y-3 pt-1">
                <a
                  href={`tel:${COMPANY_INFO.contacts.phone}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-white transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Ligne Directe Cabinet</span>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors font-mono">{COMPANY_INFO.contacts.phone}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${COMPANY_INFO.contacts.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-white transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Courriel Institutionnel</span>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors font-mono">{COMPANY_INFO.contacts.email}</span>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${COMPANY_INFO.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    language === 'fr'
                      ? 'Bonjour Sechel Consulting, je souhaite échanger directement avec un associé du cabinet.'
                      : 'Hello Sechel Consulting, I would like to speak directly with a senior partner.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 hover:border-emerald-300 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white flex-shrink-0 shadow-xs">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 block font-mono">WhatsApp Business Exécutif</span>
                    <span className="text-xs font-bold text-emerald-950">Discuter directement sur WhatsApp</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Why structured scoping card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 text-xs">
              <div className="flex items-center gap-2 font-mono font-bold text-slate-900 uppercase">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>{language === 'fr' ? 'Méthodologie de Cadrage' : 'Advisory Scoping Model'}</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {language === 'fr'
                  ? 'Chaque demande fait l\'objet d\'une étude de faisabilité préalable par deux Associés Seniors avant tout engagement contractuel :'
                  : 'Every engagement dossier undergoes rigorous preliminary feasibility screening by two Senior Partners prior to formal deployment :'}
              </p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-blue-600 font-bold text-[11px] mt-0.5">01.</span>
                  <span><strong>Audit de faisabilité juridique :</strong> Contrôle des prérequis OHADA, fiscalité et conformité ARSP.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-blue-600 font-bold text-[11px] mt-0.5">02.</span>
                  <span><strong>Modélisation logistique :</strong> Évaluation des corridors d'approvisionnement et des délais douaniers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-blue-600 font-bold text-[11px] mt-0.5">03.</span>
                  <span><strong>Proposition technique & NDA :</strong> Transmission sous 5 jours d'un plan d'exécution bancable.</span>
                </li>
              </ul>
            </div>

            {/* Regional Hubs Card */}
            <div className="p-6 rounded-2xl bg-[#0B1528] text-white border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase font-bold font-mono tracking-wider text-blue-400">
                <Building className="w-4 h-4" />
                <span>{language === 'fr' ? 'Bureaux Régionaux' : 'Regional Hubs'}</span>
              </div>

              <div className="space-y-3 pt-1">
                {COMPANY_INFO.contacts.addresses.map((addr, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-white font-serif-display text-sm">{addr.city}</strong>
                      <span className="text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-800 px-2 py-0.5 rounded">
                        {addr.country}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">{addr.street}</p>
                    <p className="text-[10px] text-amber-400">{addr.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

