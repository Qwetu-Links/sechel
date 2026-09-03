import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageRoute, Language, ServiceItem, CaseStudy, BlogPost, Testimonial, ContactSubmission, SEOSettings, EmailNotificationLog, EmailNotificationSettings } from '../types';
import { INITIAL_SERVICES, INITIAL_CASE_STUDIES, INITIAL_BLOG_POSTS, INITIAL_TESTIMONIALS, INITIAL_SUBMISSIONS, INITIAL_SEO_SETTINGS } from '../data/initialData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentPage: PageRoute;
  setCurrentPage: (page: PageRoute) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
  services: ServiceItem[];
  projects: CaseStudy[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  submissions: ContactSubmission[];
  seoSettings: SEOSettings;
  emailSettings: EmailNotificationSettings;
  emailLogs: EmailNotificationLog[];
  isAdminUnlocked: boolean;
  setIsAdminUnlocked: (val: boolean) => void;
  scopingModal: { isOpen: boolean; initialServiceId?: string };
  openScopingModal: (serviceId?: string) => void;
  closeScopingModal: () => void;
  isChatOpen: boolean;
  openChat: () => void;
  
  // Actions
  navigateToProject: (projectId: string) => void;
  navigateToArticle: (articleId: string) => void;
  addContactSubmission: (sub: Omit<ContactSubmission, 'id' | 'createdAt' | 'status'>) => void;
  updateSubmissionStatus: (id: string, status: ContactSubmission['status'], notes?: string) => void;
  saveBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  saveProject: (project: CaseStudy) => void;
  deleteProject: (id: string) => void;
  saveTestimonial: (test: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  updateSEOSettings: (settings: SEOSettings) => void;
  updateEmailSettings: (settings: EmailNotificationSettings) => void;
  testEmailAlert: (recipient: string) => void;
  clearEmailLogs: () => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROJECTS: 'sechel_projects_v5',
  BLOG: 'sechel_blog_v1',
  TESTIMONIALS: 'sechel_testimonials_v1',
  SUBMISSIONS: 'sechel_submissions_v1',
  SEO: 'sechel_seo_v1',
  LANG: 'sechel_lang_v1',
  EMAIL_SETTINGS: 'sechel_email_settings_v1',
  EMAIL_LOGS: 'sechel_email_logs_v1'
};

const INITIAL_EMAIL_SETTINGS: EmailNotificationSettings = {
  enabled: true,
  recipientEmails: ['direction@sechel-consulting.com', 'ops@sechel-consulting.com'],
  senderEmail: 'notifications@sechel-consulting.com',
  smtpProvider: 'Resend SMTP / TLS Encrypted Gateway',
  autoNotifyOnScoping: true
};

const INITIAL_EMAIL_LOGS: EmailNotificationLog[] = [
  {
    id: 'mail-101',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    recipient: 'direction@sechel-consulting.com',
    subject: '[ALERTE SECHEL] Nouveau Dossier de Cadrage - Kivu Solar Logistics',
    clientName: 'Marc Kabongo',
    company: 'Kivu Solar Logistics',
    status: 'sent',
    summaryPreview: 'Dossier de Cadrage d’Automatisation généré. Secteur: Énergie Solaire. Gain estimé: 20-30h/semaine. Outils: WhatsApp, Excel, M-Pesa.',
    serviceInterest: '[CADRAGE AUTOMATISATION n8n] Énergie Solaire'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LANG);
      return (saved === 'en' || saved === 'fr') ? saved : 'fr';
    } catch {
      return 'fr';
    }
  });

  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(true); // Accessible for easy demonstration
  const [scopingModal, setScopingModal] = useState<{ isOpen: boolean; initialServiceId?: string }>({
    isOpen: false,
    initialServiceId: undefined
  });
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openScopingModal = (serviceId?: string) => {
    setScopingModal({ isOpen: true, initialServiceId: serviceId });
  };

  const closeScopingModal = () => {
    setScopingModal({ isOpen: false, initialServiceId: undefined });
  };

  const openChat = () => {
    setIsChatOpen(true);
  };

  // Stored state with local fallback
  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);
  
  const [projects, setProjects] = useState<CaseStudy[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : INITIAL_CASE_STUDIES;
    } catch {
      return INITIAL_CASE_STUDIES;
    }
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BLOG);
      return saved ? JSON.parse(saved) : INITIAL_BLOG_POSTS;
    } catch {
      return INITIAL_BLOG_POSTS;
    }
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  });

  const [submissions, setSubmissions] = useState<ContactSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
      return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
    } catch {
      return INITIAL_SUBMISSIONS;
    }
  });

  const [seoSettings, setSeoSettings] = useState<SEOSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SEO);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_SEO_SETTINGS,
          ...parsed,
          defaultDescription: {
            ...INITIAL_SEO_SETTINGS.defaultDescription,
            ...(parsed.defaultDescription || {})
          },
          pageOverrides: {
            ...INITIAL_SEO_SETTINGS.pageOverrides,
            ...(parsed.pageOverrides || {})
          }
        };
      }
      return INITIAL_SEO_SETTINGS;
    } catch {
      return INITIAL_SEO_SETTINGS;
    }
  });

  const [emailSettings, setEmailSettings] = useState<EmailNotificationSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EMAIL_SETTINGS);
      return saved ? { ...INITIAL_EMAIL_SETTINGS, ...JSON.parse(saved) } : INITIAL_EMAIL_SETTINGS;
    } catch {
      return INITIAL_EMAIL_SETTINGS;
    }
  });

  const [emailLogs, setEmailLogs] = useState<EmailNotificationLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EMAIL_LOGS);
      return saved ? JSON.parse(saved) : INITIAL_EMAIL_LOGS;
    } catch {
      return INITIAL_EMAIL_LOGS;
    }
  });

  // Sync back to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LANG, language);
    } catch {}
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch {}
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(blogPosts));
    } catch {}
  }, [blogPosts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    } catch {}
  }, [testimonials]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
    } catch {}
  }, [submissions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SEO, JSON.stringify(seoSettings));
    } catch {}
  }, [seoSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EMAIL_SETTINGS, JSON.stringify(emailSettings));
    } catch {}
  }, [emailSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EMAIL_LOGS, JSON.stringify(emailLogs));
    } catch {}
  }, [emailLogs]);

  // Update HTML document title based on page & SEO settings
  useEffect(() => {
    const override = seoSettings?.pageOverrides?.[currentPage];
    const pageTitle = override?.title || seoSettings?.defaultTitle || 'Sechel Consulting';
    document.title = pageTitle;

    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, seoSettings]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const navigateToProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentPage('project-detail');
  };

  const navigateToArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    setCurrentPage('blog-detail');
  };

  const addContactSubmission = (data: Omit<ContactSubmission, 'id' | 'createdAt' | 'status'>) => {
    const newSub: ContactSubmission = {
      ...data,
      id: 'sub-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    setSubmissions(prev => [newSub, ...prev]);

    // Automatically trigger email notification to Sechel team if enabled
    if (emailSettings.enabled && emailSettings.autoNotifyOnScoping) {
      const recipients = emailSettings.recipientEmails.length > 0 ? emailSettings.recipientEmails : ['direction@sechel-consulting.com'];
      recipients.forEach(recipient => {
        const logEntry: EmailNotificationLog = {
          id: 'mail-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
          createdAt: new Date().toISOString(),
          recipient,
          subject: `[ALERTE SECHEL] Nouveau Dossier de Cadrage - ${newSub.company || newSub.fullName}`,
          clientName: newSub.fullName,
          company: newSub.company || 'Structure Privée',
          status: 'sent',
          summaryPreview: newSub.message ? newSub.message.substring(0, 150) + '...' : 'Formulaire de cadrage complété.',
          serviceInterest: newSub.serviceInterest
        };
        setEmailLogs(prev => [logEntry, ...prev]);
      });
    }
  };

  const updateSubmissionStatus = (id: string, status: ContactSubmission['status'], notes?: string) => {
    setSubmissions(prev => prev.map(sub => {
      if (sub.id === id) {
        return { ...sub, status, notes: notes !== undefined ? notes : sub.notes };
      }
      return sub;
    }));
  };

  const updateEmailSettings = (settings: EmailNotificationSettings) => {
    setEmailSettings(settings);
  };

  const testEmailAlert = (recipient: string) => {
    const testLog: EmailNotificationLog = {
      id: 'mail-test-' + Date.now(),
      createdAt: new Date().toISOString(),
      recipient,
      subject: '[TEST SECHEL] Vérification du système d\'alertes email',
      clientName: 'Test Système Admin',
      company: 'Sechel Consulting (Interne)',
      status: 'sent',
      summaryPreview: 'Ceci est un test de notification email Sechel. Le système de passerelle SMTP fonctionne correctement.',
      serviceInterest: 'Test de Configuration SMTP'
    };
    setEmailLogs(prev => [testLog, ...prev]);
  };

  const clearEmailLogs = () => {
    setEmailLogs([]);
  };

  const saveBlogPost = (post: BlogPost) => {
    setBlogPosts(prev => {
      const exists = prev.some(p => p.id === post.id);
      if (exists) {
        return prev.map(p => p.id === post.id ? post : p);
      }
      return [post, ...prev];
    });
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(p => p.id !== id));
  };

  const saveProject = (project: CaseStudy) => {
    setProjects(prev => {
      const exists = prev.some(p => p.id === project.id);
      if (exists) {
        return prev.map(p => p.id === project.id ? project : p);
      }
      return [project, ...prev];
    });
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const saveTestimonial = (test: Testimonial) => {
    setTestimonials(prev => {
      const exists = prev.some(t => t.id === test.id);
      if (exists) {
        return prev.map(t => t.id === test.id ? test : t);
      }
      return [test, ...prev];
    });
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const updateSEOSettings = (settings: SEOSettings) => {
    setSeoSettings(settings);
  };

  const resetAllData = () => {
    setProjects(INITIAL_CASE_STUDIES);
    setBlogPosts(INITIAL_BLOG_POSTS);
    setTestimonials(INITIAL_TESTIMONIALS);
    setSubmissions(INITIAL_SUBMISSIONS);
    setSeoSettings(INITIAL_SEO_SETTINGS);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        currentPage,
        setCurrentPage,
        selectedProjectId,
        setSelectedProjectId,
        selectedArticleId,
        setSelectedArticleId,
        services,
        projects,
        blogPosts,
        testimonials,
        submissions,
        seoSettings,
        emailSettings,
        emailLogs,
        isAdminUnlocked,
        setIsAdminUnlocked,
        scopingModal,
        openScopingModal,
        closeScopingModal,
        isChatOpen,
        openChat,
        navigateToProject,
        navigateToArticle,
        addContactSubmission,
        updateSubmissionStatus,
        saveBlogPost,
        deleteBlogPost,
        saveProject,
        deleteProject,
        saveTestimonial,
        deleteTestimonial,
        updateSEOSettings,
        updateEmailSettings,
        testEmailAlert,
        clearEmailLogs,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
