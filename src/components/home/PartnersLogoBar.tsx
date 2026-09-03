import React from 'react';
import { useApp } from '../../context/AppContext';
import { PARTNERS_LOGOS } from '../../data/initialData';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const PartnersLogoBar: React.FC = () => {
  const { language } = useApp();

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* WordPress Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'fr' ? 'Partenaires & Alliances Stratégiques' : 'Partners & Strategic Alliances'}</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900">
            {language === 'fr' ? 'Ils nous font confiance à travers l\'Afrique' : 'Trusted by Leading Brands Across Africa'}
          </h2>
          <div className="wp-divider mx-auto my-3" />
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            {language === 'fr'
              ? 'Marques mondiales de clean tech, agences internationales de développement et géants des télécoms.'
              : 'Global clean tech leaders, international development agencies, and telecom conglomerates.'}
          </p>
        </div>

        {/* Logo Cards Grid (WordPress style clean white cards with border & hover effect) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {PARTNERS_LOGOS.map((partner, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center group min-h-[115px]"
            >
              <span className="font-serif-display font-bold text-base text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                {partner.name}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 mt-1">
                {partner.category}
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5 opacity-90">
                {partner.note}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom micro-statement */}
        <div className="mt-8 text-center">
          <p className="text-xs sm:text-sm font-serif-display italic text-slate-600">
            {language === 'fr'
              ? '"Nous avons réalisé bien plus de projets que ceux listés ici. Contactez notre équipe pour étudier vos besoins spécifiques !"'
              : '"We’ve delivered significantly more projects than listed here. Contact our team to explore your custom requirements!"'}
          </p>
        </div>
      </div>
    </section>
  );
};
