import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';
import { COMPANY_INFO } from '../../data/initialData';
import {
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Linkedin,
  Twitter,
  Facebook,
  Sparkles,
  Layers,
  FileText
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, setCurrentPage } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#0B1528] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column WordPress Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-slate-800">
          {/* Column 1: Brand & Definition */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="light" size="lg" />

            <p className="text-sm leading-relaxed text-slate-400 pt-2">
              {COMPANY_INFO.heroSubheadline[language]}
            </p>

            {/* Corporate accreditation & governance badge */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 font-mono font-bold text-blue-400 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Gouvernance & Conformité</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                {COMPANY_INFO.accreditation[language]}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation & Services */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white border-b border-slate-700/80 pb-2">
              {language === 'fr' ? 'Expertises' : 'Services'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentPage('services')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  {language === 'fr' ? 'Gestion de Projet' : 'Project Management'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('services')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  {language === 'fr' ? 'Structuring Solaire' : 'Solar Structuring'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('services')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  {language === 'fr' ? 'Architecture Opérationnelle' : 'Systems Design'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('services')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  {language === 'fr' ? 'Stratégie de Marque' : 'Brand Strategy'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('services')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  {language === 'fr' ? 'Transformation Commerciale' : 'Business Growth'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('services')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  {language === 'fr' ? 'Expansion Panafricaine' : 'Market Expansion'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Regional Hubs */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white border-b border-slate-700/80 pb-2">
              {language === 'fr' ? 'Bureaux Régionaux' : 'Regional Offices'}
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              {COMPANY_INFO.contacts.addresses.map((addr, idx) => (
                <div key={idx} className="flex gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">{addr.city} ({addr.country})</strong>
                    <span className="text-[11px] block text-slate-400">{addr.street}</span>
                    <span className="text-[10px] text-amber-400">{addr.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Newsletter & Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white border-b border-slate-700/80 pb-2">
              {language === 'fr' ? 'Veille Stratégique' : 'Strategic Insights'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'fr'
                ? 'Recevez nos analyses exclusives sur l\'économie, l\'énergie solaire et le B2B en RDC.'
                : 'Receive our exclusive market notes on clean energy, OHADA compliance, and B2B growth across Africa.'}
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={language === 'fr' ? 'votre.email@entreprise.cd' : 'your.email@company.com'}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-bold flex items-center transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{language === 'fr' ? 'Merci ! Vous êtes bien inscrit.' : 'Thank you! You are subscribed.'}</span>
                </div>
              )}
            </form>

            <div className="pt-2 text-xs space-y-2 text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <a href={`mailto:${COMPANY_INFO.contacts.email}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.contacts.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <a href={`tel:${COMPANY_INFO.contacts.phone}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.contacts.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Quick Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Sechel Consulting. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setCurrentPage('about')}
              className="hover:text-white transition-colors"
            >
              {language === 'fr' ? 'À Propos' : 'About'}
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="hover:text-white transition-colors"
            >
              {language === 'fr' ? 'Prendre Rendez-vous' : 'Consultation'}
            </button>

          </div>
        </div>
      </div>
    </footer>
  );
};
