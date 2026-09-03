import React, { useEffect, lazy, Suspense } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/home/HomePage';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';
import { motion, AnimatePresence } from 'motion/react';

// Lazy loaded heavy components & pages for optimal Core Web Vitals
const AboutPage = lazy(() => import('./components/about/AboutPage').then(m => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./components/services/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ProjectsPage = lazy(() => import('./components/projects/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ProjectDetailPage = lazy(() => import('./components/projects/ProjectDetailPage').then(m => ({ default: m.ProjectDetailPage })));
const BlogPage = lazy(() => import('./components/blog/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogDetailPage = lazy(() => import('./components/blog/BlogDetailPage').then(m => ({ default: m.BlogDetailPage })));
const TestimonialsPage = lazy(() => import('./components/testimonials/TestimonialsPage').then(m => ({ default: m.TestimonialsPage })));
const ContactPage = lazy(() => import('./components/contact/ContactPage').then(m => ({ default: m.ContactPage })));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const MerveilleChatBot = lazy(() => import('./components/chat/MerveilleChatBot').then(m => ({ default: m.MerveilleChatBot })));
const AIServiceScopingModal = lazy(() => import('./components/services/AIServiceScopingModal').then(m => ({ default: m.AIServiceScopingModal })));

const PageFallback = () => (
  <div className="py-32 flex flex-col items-center justify-center space-y-4">
    <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent"></div>
    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Chargement du module Sechel...</p>
  </div>
);

const MainContent: React.FC = () => {
  const { currentPage, language, seoSettings, scopingModal, openScopingModal, closeScopingModal } = useApp();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Update dynamic document title & meta tags
  useEffect(() => {
    const pageTitles: Record<string, { fr: string; en: string }> = {
      home: { fr: 'Accueil', en: 'Home' },
      about: { fr: 'À Propos', en: 'About Us' },
      services: { fr: 'Services & Expertises', en: 'Services' },
      projects: { fr: 'Projets & Réalisations', en: 'Case Studies' },
      'project-detail': { fr: 'Dossier Projet', en: 'Project Dossier' },
      blog: { fr: 'Analyses & Veille', en: 'Strategic Insights' },
      'blog-detail': { fr: 'Article', en: 'Article' },
      testimonials: { fr: 'Témoignages Clients', en: 'Testimonials' },
      contact: { fr: 'Contact & Diagnostic', en: 'Contact' },
      admin: { fr: 'Studio CMS & SEO', en: 'CMS & SEO Studio' }
    };

    const siteName = seoSettings?.siteName || 'Sechel Consulting';
    const override = seoSettings?.pageOverrides?.[currentPage];
    const localizedPageTitle = pageTitles[currentPage]?.[language] || 'Sechel Consulting';

    // Update document title
    document.title = override?.title || `${localizedPageTitle} | ${siteName}`;

    // Update meta description safely
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      const descriptionText =
        override?.description ||
        seoSettings?.defaultDescription?.[language] ||
        seoSettings?.defaultDescription?.fr ||
        '';
      if (descriptionText) {
        metaDesc.setAttribute('content', descriptionText);
      }
    }
  }, [currentPage, language, seoSettings]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'project-detail':
        return <ProjectDetailPage />;
      case 'blog':
        return <BlogPage />;
      case 'blog-detail':
        return <BlogDetailPage />;
      case 'testimonials':
        return <TestimonialsPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] antialiased selection:bg-blue-600/20 selection:text-blue-700 font-sans">
      {/* Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Navigation */}
      <Navbar />

      {/* Main View Area with Smooth Transitions & Suspense Lazy Loading */}
      <main className="flex-grow">
        <Suspense fallback={<PageFallback />}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />

      {/* Side-by-Side Merveille ChatBot & WhatsApp Dock */}
      <Suspense fallback={null}>
        <MerveilleChatBot onOpenScopingModal={openScopingModal} />
      </Suspense>

      {/* Interactive Service Scoping Form Modal */}
      <Suspense fallback={null}>
        <AIServiceScopingModal
          isOpen={scopingModal.isOpen}
          onClose={closeScopingModal}
          initialServiceId={scopingModal.initialServiceId}
        />
      </Suspense>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
