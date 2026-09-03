import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageRoute } from '../../types';
import { Home, ChevronRight, ArrowLeft } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  page?: PageRoute;
  onClick?: () => void;
  isCurrent?: boolean;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  backAction?: {
    page: PageRoute;
    label?: string;
  };
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items: customItems,
  backAction,
  className = ''
}) => {
  const { language, currentPage, setCurrentPage, projects, selectedProjectId, blogPosts, selectedArticleId } = useApp();

  // If items are not passed explicitly, derive them automatically from current page state
  const getAutoItems = (): BreadcrumbItem[] => {
    const homeLabel = language === 'fr' ? 'Accueil' : 'Home';
    const base: BreadcrumbItem[] = [{ label: homeLabel, page: 'home' }];

    switch (currentPage) {
      case 'project-detail': {
        const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];
        base.push({
          label: language === 'fr' ? 'Projets & Réalisations' : 'Case Studies',
          page: 'projects'
        });
        if (currentProject) {
          base.push({
            label: currentProject.title[language] || currentProject.client,
            isCurrent: true
          });
        }
        break;
      }
      case 'blog-detail': {
        const currentPost = blogPosts.find((p) => p.id === selectedArticleId) || blogPosts[0];
        base.push({
          label: language === 'fr' ? 'Analyses & Veille' : 'Strategic Insights',
          page: 'blog'
        });
        if (currentPost) {
          base.push({
            label: currentPost.title[language],
            isCurrent: true
          });
        }
        break;
      }
      case 'projects':
        base.push({
          label: language === 'fr' ? 'Projets & Réalisations' : 'Case Studies',
          isCurrent: true
        });
        break;
      case 'blog':
        base.push({
          label: language === 'fr' ? 'Analyses & Veille' : 'Strategic Insights',
          isCurrent: true
        });
        break;
      case 'services':
        base.push({
          label: language === 'fr' ? 'Services & Expertises' : 'Services & Advisory Tracks',
          isCurrent: true
        });
        break;
      case 'about':
        base.push({
          label: language === 'fr' ? 'À Propos de Sechel' : 'About Sechel Advisory',
          isCurrent: true
        });
        break;
      case 'testimonials':
        base.push({
          label: language === 'fr' ? 'Témoignages Clients' : 'Client Endorsements',
          isCurrent: true
        });
        break;
      case 'contact':
        base.push({
          label: language === 'fr' ? 'Contact & Cadrage de Mission' : 'Contact & Mission Scoping',
          isCurrent: true
        });
        break;
      case 'admin':
        base.push({
          label: language === 'fr' ? 'Studio CMS & SEO' : 'CMS & SEO Studio',
          isCurrent: true
        });
        break;
      default:
        break;
    }

    return base;
  };

  const activeItems = customItems && customItems.length > 0 ? customItems : getAutoItems();

  // Determine back navigation target
  const resolvedBack = backAction || (() => {
    if (currentPage === 'project-detail') {
      return {
        page: 'projects' as PageRoute,
        label: language === 'fr' ? 'Retour aux Réalisations' : 'Back to Case Studies'
      };
    }
    if (currentPage === 'blog-detail') {
      return {
        page: 'blog' as PageRoute,
        label: language === 'fr' ? 'Retour aux Articles' : 'Back to Articles'
      };
    }
    return undefined;
  })();

  if (activeItems.length <= 1 && !resolvedBack) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center justify-between gap-3 py-2.5 px-3.5 sm:px-4 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200/90 shadow-2xs font-['Open_Sans',sans-serif] ${className}`}
    >
      {/* Breadcrumb path list */}
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs text-slate-500 min-w-0">
        {activeItems.map((item, index) => {
          const isLast = index === activeItems.length - 1 || item.isCurrent;
          const isFirst = index === 0;

          return (
            <li key={index} className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" aria-hidden="true" />
              )}

              {isLast ? (
                <span
                  className="font-bold text-slate-900 truncate max-w-[200px] sm:max-w-xs md:max-w-md"
                  aria-current="page"
                  title={item.label}
                >
                  {item.label}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    } else if (item.page) {
                      setCurrentPage(item.page);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 font-medium text-slate-600 hover:text-blue-600 transition-colors cursor-pointer group flex-shrink-0"
                >
                  {isFirst && <Home className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />}
                  <span>{item.label}</span>
                </button>
              )}
            </li>
          );
        })}
      </ol>

      {/* Quick Back Action */}
      {resolvedBack && (
        <button
          type="button"
          onClick={() => setCurrentPage(resolvedBack.page)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors py-1 px-2.5 rounded-lg hover:bg-slate-100 cursor-pointer ml-auto flex-shrink-0 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>{resolvedBack.label || (language === 'fr' ? 'Retour' : 'Back')}</span>
        </button>
      )}
    </nav>
  );
};
