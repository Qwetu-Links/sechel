import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';
import { PageRoute } from '../../types';
import { COMPANY_INFO } from '../../data/initialData';
import {
  Menu,
  X,
  Globe,
  ArrowRight,
  ShieldCheck,
  Phone,
  Mail,
  Clock,
  MapPin,
  Briefcase,
  Layers,
  BookOpen,
  Users,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const { language, setLanguage, currentPage, setCurrentPage, submissions, openScopingModal } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const newLeadsCount = submissions.filter(s => s.status === 'new').length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageRoute; label: { fr: string; en: string } }[] = [
    { id: 'home', label: { fr: 'Accueil', en: 'Home' } },
    { id: 'about', label: { fr: 'À Propos', en: 'About Us' } },
    { id: 'services', label: { fr: 'Expertises', en: 'Services' } },
    { id: 'projects', label: { fr: 'Réalisations', en: 'Case Studies' } },
    { id: 'blog', label: { fr: 'Analyses & Blog', en: 'Insights' } },
    { id: 'testimonials', label: { fr: 'Témoignages', en: 'Testimonials' } },
    { id: 'contact', label: { fr: 'Contact', en: 'Contact' } },
  ];

  const handleNavClick = (page: PageRoute) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* WordPress-Style Top Bar */}
      <div className="bg-[#0B1528] text-slate-300 text-xs py-2 border-b border-slate-800/80 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left contact info */}
          <div className="flex items-center gap-5">
            <a
              href={`tel:${COMPANY_INFO.contacts.phone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{COMPANY_INFO.contacts.phone}</span>
            </a>
            <a
              href={`mailto:${COMPANY_INFO.contacts.email}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{COMPANY_INFO.contacts.email}</span>
            </a>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'fr' ? 'Lun - Ven: 08h00 - 18h00' : 'Mon - Fri: 08:00 - 18:00'}</span>
            </div>
          </div>

          {/* Right info & utilities */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Lubumbashi • Douala • Johannesburg</span>
            </div>

            <div className="h-3 w-px bg-slate-700 hidden md:block" />

            {/* Language switch */}
            <div className="flex items-center bg-slate-800 rounded-md p-0.5 border border-slate-700">
              <button
                id="lang-switch-fr"
                onClick={() => setLanguage('fr')}
                className={`px-2 py-0.5 text-[11px] font-bold rounded transition-all ${
                  language === 'fr'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                FR
              </button>
              <button
                id="lang-switch-en"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 text-[11px] font-bold rounded transition-all ${
                  language === 'en'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* WP Admin Portal Quick Link */}
            <button
              id="nav-admin-portal-button"
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold transition-all ${
                currentPage === 'admin'
                  ? 'bg-amber-500 text-slate-900 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
              title="Interface Admin CMS & SEO"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>WP Admin</span>
              {newLeadsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                  {newLeadsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`bg-white transition-all duration-300 ${
          isScrolled
            ? 'shadow-md border-b border-slate-200 py-3'
            : 'border-b border-slate-200/80 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <div
              id="brand-logo-button"
              onClick={() => handleNavClick('home')}
              className="cursor-pointer transition-transform hover:opacity-95"
            >
              <BrandLogo size="md" />
            </div>

            {/* Desktop Navigation Links (WordPress theme menu style) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive =
                  currentPage === link.id ||
                  (link.id === 'projects' && currentPage === 'project-detail') ||
                  (link.id === 'blog' && currentPage === 'blog-detail');
                return (
                  <button
                    key={link.id}
                    id={`nav-link-${link.id}`}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative px-3.5 py-2 rounded-md text-sm font-semibold transition-colors duration-150 ${
                      isActive
                        ? 'text-blue-600 font-bold'
                        : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                  >
                    {link.label[language]}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-600 rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right CTA Buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              <button
                id="nav-book-consultation-btn"
                onClick={() => handleNavClick('contact')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
              >
                <span>{language === 'fr' ? 'Demander un Devis' : 'Get a Proposal'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Menu Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Lang switch mobile */}
              <button
                onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                className="px-2.5 py-1 bg-slate-100 rounded text-xs font-bold text-slate-700 border border-slate-200"
              >
                {language.toUpperCase()}
              </button>

              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md bg-slate-100 text-slate-800 hover:bg-slate-200 focus:outline-none"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-left text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.label[language]}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                  </button>
                );
              })}

              <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => handleNavClick('admin')}
                  className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-sm font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>Espace Admin CMS & SEO</span>
                  </div>
                  {newLeadsCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-xs">
                      {newLeadsCount} new
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-600 text-white text-sm font-bold shadow-md hover:bg-blue-700 transition-colors"
                >
                  <span>{language === 'fr' ? 'Demander un Rendez-vous' : 'Book a Meeting'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
