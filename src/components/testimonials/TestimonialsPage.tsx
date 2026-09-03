import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { Star, Quote, Plus, CheckCircle, ShieldCheck, X } from 'lucide-react';
import { Testimonial } from '../../types';

export const TestimonialsPage: React.FC = () => {
  const { language, testimonials, saveTestimonial } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form states
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [quoteFr, setQuoteFr] = useState('');
  const [quoteEn, setQuoteEn] = useState('');
  const [rating, setRating] = useState(5);
  const [projectTag, setProjectTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !company || !quoteFr) return;

    const newTestimonial: Testimonial = {
      id: `test-${Date.now()}`,
      author,
      role: role || (language === 'fr' ? 'Dirigeant d\'Entreprise' : 'Executive Director'),
      company,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`,
      rating,
      quote: {
        fr: quoteFr,
        en: quoteEn || quoteFr
      },
      projectTag: projectTag || 'Partenaire Stratégique',
      date: '2025',
      isVerified: true
    };

    saveTestimonial(newTestimonial);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setModalOpen(false);
      // Reset
      setAuthor('');
      setRole('');
      setCompany('');
      setQuoteFr('');
      setQuoteEn('');
      setProjectTag('');
    }, 2000);
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50">
      {/* WordPress Page Header Banner */}
      <div className="bg-[#0B1528] text-white py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-500/40 text-xs font-bold text-blue-300 uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{language === 'fr' ? 'Confiance & Reconnaissance' : 'Client Trust & Endorsements'}</span>
              </div>
              <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
                {language === 'fr' ? 'Ce que Disent nos Partenaires & Clients' : 'What Our Business Partners Say'}
              </h1>
              <div className="wp-divider my-2" />
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                {language === 'fr'
                  ? 'Retours d\'expérience de dirigeants d\'entreprises solaires, agences internationales et groupes télécoms ayant collaboré avec Sechel.'
                  : 'Real testimonials from solar CEOs, institutional directors, and telecom leaders partnering with Sechel Consulting.'}
              </p>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'fr' ? 'Laisser un Témoignage' : 'Leave a Review'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials Grid (WordPress Testimonials Grid) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumb className="mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-blue-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Rating & Project Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
                    {t.projectTag}
                  </span>
                </div>

                {/* Quote */}
                <p className="font-serif-display text-sm sm:text-base text-slate-800 italic leading-relaxed">
                  "{t.quote[language]}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-11 h-11 rounded-full object-cover border-2 border-slate-200 shadow-xs"
                />
                <div>
                  <h4 className="font-serif-display font-bold text-xs sm:text-sm text-slate-900">{t.author}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {t.role} • <strong className="text-slate-800">{t.company}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Testimonial Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 mb-6">
              <h3 className="font-serif-display text-2xl font-bold text-slate-900">
                {language === 'fr' ? 'Déposer un Témoignage Client' : 'Submit a Partner Review'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'fr'
                  ? 'Partagez votre retour d\'expérience sur votre collaboration avec Sechel Consulting.'
                  : 'Share your authentic experience collaborating with Sechel Consulting.'}
              </p>
            </div>

            {submittedSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-serif-display font-bold text-base text-slate-900">
                  {language === 'fr' ? 'Témoignage Publié avec Succès !' : 'Review Published Successfully!'}
                </h4>
                <p className="text-xs text-slate-500">
                  {language === 'fr' ? 'Merci pour votre confiance continue.' : 'Thank you for your continued partnership.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {language === 'fr' ? 'Nom & Prénom *' : 'Your Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Samuel Kanyinda"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {language === 'fr' ? 'Entreprise / Organisation *' : 'Company *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Conforta Energy / Sun King"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {language === 'fr' ? 'Fonction / Titre' : 'Job Title'}
                    </label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Directeur Général / VP"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {language === 'fr' ? 'Mission / Tag Projet' : 'Project Tag'}
                    </label>
                    <input
                      type="text"
                      value={projectTag}
                      onChange={(e) => setProjectTag(e.target.value)}
                      placeholder="e.g. Expansion Solaire Katanga"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {language === 'fr' ? 'Votre Témoignage (Français) *' : 'Your Review (French / Primary) *'}
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={quoteFr}
                    onChange={(e) => setQuoteFr(e.target.value)}
                    placeholder="Partagez l'impact concret de Sechel sur vos opérations..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">{language === 'fr' ? 'Note :' : 'Rating:'}</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((st) => (
                        <button
                          type="button"
                          key={st}
                          onClick={() => setRating(st)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              rating >= st ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-sm"
                  >
                    {language === 'fr' ? 'Publier le Témoignage' : 'Submit Review'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
