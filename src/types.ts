export type Language = 'fr' | 'en';

export type PageRoute = 
  | 'home'
  | 'about'
  | 'services'
  | 'projects'
  | 'project-detail'
  | 'blog'
  | 'blog-detail'
  | 'testimonials'
  | 'contact'
  | 'admin';

export interface ServiceItem {
  id: string;
  number: string;
  title: {
    fr: string;
    en: string;
  };
  shortDesc: {
    fr: string;
    en: string;
  };
  fullDesc: {
    fr: string;
    en: string;
  };
  iconName: string;
  colorAccent: string;
  deliverables: {
    fr: string[];
    en: string[];
  };
  targetClients: {
    fr: string[];
    en: string[];
  };
  keyMetric: string;
  metricLabel: {
    fr: string;
    en: string;
  };
}

export interface MetricItem {
  label: {
    fr: string;
    en: string;
  };
  value: string;
  subtext?: {
    fr: string;
    en: string;
  };
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: {
    fr: string;
    en: string;
  };
  client: string;
  clientBadge: string;
  subtitle: {
    fr: string;
    en: string;
  };
  category: 'solar' | 'market_expansion' | 'esg_health' | 'strategy';
  categoryLabel: {
    fr: string;
    en: string;
  };
  tagline: {
    fr: string;
    en: string;
  };
  location: string;
  period: string;
  featured: boolean;
  background: {
    fr: string;
    en: string;
  };
  journey: {
    fr: string;
    en: string;
  };
  results: {
    fr: string;
    en: string;
  };
  metrics: MetricItem[];
  partners: string[];
  heroImage: string;
  gallery: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: {
    fr: string;
    en: string;
  };
  excerpt: {
    fr: string;
    en: string;
  };
  content: {
    fr: string;
    en: string;
  };
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  isPublished: boolean;
  views: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: {
    fr: string;
    en: string;
  };
  avatar: string;
  rating: number;
  projectTag: string;
  date: string;
  isVerified: boolean;
}

export interface ContactSubmission {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  serviceInterest: string;
  budgetRange: string;
  timeline: string;
  message: string;
  status: 'new' | 'in_progress' | 'contacted' | 'closed';
  notes?: string;
  roleTitle?: string;
  engagementModel?: string;
  urgency?: string;
  referenceNumber?: string;
  isAutomationMapping?: boolean;
  mappingDossier?: {
    companyName: string;
    contactName: string;
    roleTitle?: string;
    email: string;
    phone: string;
    country: string;
    industry: string;
    teamSize: string;
    targetProcesses: string[];
    toolsList: string[];
    dailyVolume: string;
    weeklyHoursLost: string;
    painPoints: string;
    mainTrigger: string;
    outputDestinations: string;
    hostingPreference: string;
    aiIntegrationPreference: string;
    budgetRange: string;
    timeline: string;
    aiReport: string;
    workflowSchemaJson?: string;
    estimatedHoursSaved?: string;
    estimatedRoiDays?: string;
  };
}

export interface EmailNotificationLog {
  id: string;
  createdAt: string;
  recipient: string;
  subject: string;
  clientName: string;
  company: string;
  status: 'sent' | 'queued' | 'failed';
  summaryPreview: string;
  serviceInterest: string;
}

export interface EmailNotificationSettings {
  enabled: boolean;
  recipientEmails: string[];
  senderEmail: string;
  smtpProvider: string;
  autoNotifyOnScoping: boolean;
}

export interface SEOSettings {
  siteName: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: {
    fr: string;
    en: string;
  };
  canonicalUrl: string;
  keywords: string[];
  ogImage: string;
  twitterHandle: string;
  googleVerificationCode: string;
  enableStructuredData: boolean;
  robotsTxtContent: string;
  pageOverrides: {
    [key in PageRoute]?: {
      title: string;
      description: string;
      keywords: string[];
    };
  };
}
