import React from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_INFO } from '../../data/initialData';
import { ArrowRight, Phone, Mail, MessageSquare, MapPin, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const CtaSection: React.FC = () => {
  const { language, setCurrentPage } = useApp();

  return (
    <section className="py-20 bg-slate-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* WordPress Corporate Action Banner */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#0B1528] via-[#0F233F] to-[#142B4D] border border-slate-700/80 p-8 sm:p-12 lg:p-16 shadow-2xl text-white overflow-hidden">
          {/* Subtle Background Geometric Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cta-wp-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-wp-grid)" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-500/40 text-xs font-bold text-blue-300 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>{language === 'fr' ? 'Démarrons votre Projet Stratégique' : 'Initiate Your Strategy'}</span>
              </div>

              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                {language === 'fr' ? (
                  <>
                    Prêt à accélérer vos opérations en <span className="text-blue-400">RDC</span> et en <span className="text-amber-400">Afrique</span> ?
                  </>
                ) : (
                  <>
                    Ready to scale your ventures in <span className="text-blue-400">DRC</span> & across <span className="text-amber-400">Africa</span>?
                  </>
                )}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                {language === 'fr'
                  ? 'Que vous souhaitiez implanter une marque clean tech, structurer un réseau de distribution ou accélérer vos flux commerciaux, nos associés seniors sont à votre écoute.'
                  : 'Whether you want to launch a clean tech product line, structure retail distribution networks, or de-risk complex field logistics, our senior partners are ready.'}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  id="cta-book-session-btn"
                  onClick={() => setCurrentPage('contact')}
                  className="px-7 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5"
                >
                  <span>{language === 'fr' ? 'Demander un Devis / Consultation' : 'Schedule Strategy Session'}</span>
                </button>

                <a
                  href={`https://wa.me/${COMPANY_INFO.contacts.whatsapp}?text=Bonjour%20Sechel%20Consulting`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md transition-all flex items-center gap-2"
                >
                  <span>WhatsApp Business</span>
                </a>
              </div>
            </div>

            {/* Right Contact Card (Clean White Corporate Box) */}
            <div className="lg:col-span-5 bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4 text-slate-800">
              <h3 className="font-serif-display font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
                {language === 'fr' ? 'Permanence Téléphonique & Hubs' : 'Direct Line & Corporate Hubs'}
              </h3>

              <div>
                <span className="text-[11px] uppercase font-bold text-blue-600 tracking-wider block mb-1">
                  {language === 'fr' ? 'Email Officiel' : 'Official Inquiries'}
                </span>
                <a
                  href={`mailto:${COMPANY_INFO.contacts.email}`}
                  className="text-sm sm:text-base font-bold text-slate-900 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>{COMPANY_INFO.contacts.email}</span>
                </a>
              </div>

              <div>
                <span className="text-[11px] uppercase font-bold text-blue-600 tracking-wider block mb-1">
                  {language === 'fr' ? 'Ligne Téléphonique Directe' : 'Direct Phone Line'}
                </span>
                <a
                  href={`tel:${COMPANY_INFO.contacts.phone}`}
                  className="text-sm sm:text-base font-bold text-slate-900 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>{COMPANY_INFO.contacts.phone}</span>
                </a>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] uppercase font-bold text-slate-500 tracking-wider block mb-1">
                  {language === 'fr' ? 'Siège Principal RDC' : 'DRC Corporate Headquarters'}
                </span>
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span>142 Boulevard M'siri, Quartier Makomeno, Lubumbashi, République Démocratique du Congo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
