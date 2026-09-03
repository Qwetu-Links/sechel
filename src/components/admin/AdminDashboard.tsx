import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  LayoutDashboard,
  FileText,
  Briefcase,
  Star,
  Globe,
  Inbox,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  X,
  RefreshCw,
  ExternalLink,
  Code,
  Search,
  Sliders,
  Settings,
  Workflow,
  Download,
  FileCode,
  Zap,
  Clock,
  TrendingUp,
  Cpu,
  Copy,
  Check,
  Eye,
  Printer,
  Mail
} from 'lucide-react';
import { BlogPost, CaseStudy, Testimonial, SEOSettings, ContactSubmission, EmailNotificationSettings, EmailNotificationLog } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    language,
    blogPosts,
    projects,
    testimonials,
    seoSettings,
    submissions,
    emailSettings,
    emailLogs,
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
    updateSubmissionStatus,
    resetAllData,
    setCurrentPage
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'blog' | 'projects' | 'testimonials' | 'seo' | 'leads' | 'emails'>('overview');

  // Edit / Creation states
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const [editingProject, setEditingProject] = useState<CaseStudy | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const [seoForm, setSeoForm] = useState<SEOSettings>({ ...seoSettings });
  const [savedSeoToast, setSavedSeoToast] = useState(false);

  // Email Notification Settings state
  const [emailForm, setEmailForm] = useState<EmailNotificationSettings>({ ...emailSettings });
  const [newRecipient, setNewRecipient] = useState('');
  const [savedEmailToast, setSavedEmailToast] = useState(false);
  const [testEmailToast, setTestEmailToast] = useState(false);
  const [viewingEmailLog, setViewingEmailLog] = useState<EmailNotificationLog | null>(null);

  // Mapping Dossier Viewer modal state
  const [viewingMappingDossier, setViewingMappingDossier] = useState<ContactSubmission | null>(null);
  const [copiedAdminJson, setCopiedAdminJson] = useState(false);

  // Quick stats
  const newLeads = submissions.filter((s) => s.status === 'new').length;

  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    updateSEOSettings(seoForm);
    setSavedSeoToast(true);
    setTimeout(() => setSavedSeoToast(false), 3000);
  };

  const handleSaveEmailSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmailSettings(emailForm);
    setSavedEmailToast(true);
    setTimeout(() => setSavedEmailToast(false), 3000);
  };

  const handleAddRecipient = () => {
    if (newRecipient.trim() && !emailForm.recipientEmails.includes(newRecipient.trim())) {
      setEmailForm(prev => ({
        ...prev,
        recipientEmails: [...prev.recipientEmails, newRecipient.trim()]
      }));
      setNewRecipient('');
    }
  };

  const handleRemoveRecipient = (email: string) => {
    setEmailForm(prev => ({
      ...prev,
      recipientEmails: prev.recipientEmails.filter(e => e !== email)
    }));
  };

  const handleRunTestEmail = () => {
    const target = emailForm.recipientEmails[0] || 'direction@sechel-consulting.com';
    testEmailAlert(target);
    setTestEmailToast(true);
    setTimeout(() => setTestEmailToast(false), 3000);
  };

  const handleDownloadAdminDossier = (lead: ContactSubmission) => {
    const md = `# DOSSIER DE MAPPING AUTOMATISATION - SECHEL CONSULTING
**Client :** ${lead.company} (${lead.country})
**Contact :** ${lead.fullName} (${lead.roleTitle || 'Direction'})
**Email :** ${lead.email} | **Téléphone :** ${lead.phone}
**Date :** ${new Date(lead.createdAt).toLocaleDateString('fr-FR')}

---
${lead.message}
`;
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Sechel_Lead_${(lead.company || lead.fullName).replace(/[^a-zA-Z0-9]/g, '_')}_Mapping.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAdminJson = (lead: ContactSubmission) => {
    if (!lead.mappingDossier?.workflowSchemaJson) return;
    const blob = new Blob([lead.mappingDossier.workflowSchemaJson], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `n8n_blueprint_${(lead.company || lead.fullName).replace(/[^a-zA-Z0-9]/g, '_')}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-20 pb-20 bg-[#F0F0F1] min-h-screen text-slate-800">
      {/* WordPress Admin Top Bar */}
      <div className="bg-[#1D2327] text-slate-200 border-b border-[#2C3338] shadow-sm mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-serif font-black text-base shadow-xs">
                W
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm font-bold text-white tracking-wide">
                    Sechel Consulting
                  </h1>
                  <span className="text-[10px] bg-[#2C3338] text-slate-300 px-2 py-0.5 rounded font-mono">
                    WP v6.4
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Tableau de bord d'administration WordPress & SEO
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (window.confirm('Voulez-vous réinitialiser toutes les données aux valeurs par défaut de Sechel ?')) {
                    resetAllData();
                  }
                }}
                className="px-3 py-1.5 rounded bg-[#2C3338] hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Réinitialiser</span>
              </button>

              <button
                onClick={() => setCurrentPage('home')}
                className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Aller sur le site</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* WordPress Tabs (Menu style) */}
        <div className="flex flex-wrap gap-1 mb-6 bg-white p-1.5 rounded border border-slate-300 shadow-xs">
          {[
            { id: 'overview', label: 'Tableau de bord', icon: LayoutDashboard, count: null },
            { id: 'leads', label: 'Formulaires & Prospects', icon: Inbox, count: newLeads },
            { id: 'blog', label: 'Articles & Veille', icon: FileText, count: blogPosts.length },
            { id: 'projects', label: 'Études de Cas & Projets', icon: Briefcase, count: projects.length },
            { id: 'testimonials', label: 'Témoignages Clients', icon: Star, count: testimonials.length },
            { id: 'seo', label: 'Yoast SEO & Référencement', icon: Globe, count: null },
            { id: 'emails', label: 'Alertes Email & Notifications', icon: Mail, count: emailLogs.length },
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setEditingPost(null);
                  setIsCreatingPost(false);
                  setEditingProject(null);
                  setIsCreatingProject(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#2271B1] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                      isActive
                        ? 'bg-white text-blue-900'
                        : tab.id === 'leads' && tab.count > 0
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview (WordPress At a Glance / D’un coup d’œil) */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* At a glance widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded bg-white border border-slate-300 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
                  <span>D’un coup d’œil : Demandes</span>
                  <Inbox className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="font-serif-display text-3xl font-bold text-slate-900">{submissions.length}</p>
                  {newLeads > 0 && (
                    <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-bold">
                      {newLeads} nouveaux
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-2">Formulaires envoyés via la page contact</p>
              </div>

              <div className="p-5 rounded bg-white border border-slate-300 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
                  <span>Articles de blog</span>
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="font-serif-display text-3xl font-bold text-slate-900">{blogPosts.length}</p>
                  <span className="text-xs text-emerald-600 font-bold">Tous publiés</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">Analyses marché, énergie solaire, B2B</p>
              </div>

              <div className="p-5 rounded bg-white border border-slate-300 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
                  <span>Études de cas réelles</span>
                  <Briefcase className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="font-serif-display text-3xl font-bold text-slate-900">{projects.length}</p>
                  <span className="text-xs text-blue-600 font-bold">Projets clients</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">Conforta, Heta Kasaï, Sun King, EcoFlow</p>
              </div>

              <div className="p-5 rounded bg-white border border-slate-300 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
                  <span>Score SEO Yoast</span>
                  <Globe className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="font-serif-display text-3xl font-bold text-emerald-600">100 / 100</p>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">Excellent</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">Balises Meta, OpenGraph & JSON-LD</p>
              </div>
            </div>

            {/* Recent Leads Preview in WordPress Table */}
            <div className="bg-white rounded border border-slate-300 shadow-xs overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Inbox className="w-4 h-4 text-blue-600" />
                  Dernières demandes reçues
                </h3>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  Voir tous les leads ({submissions.length}) →
                </button>
              </div>

              {submissions.length === 0 ? (
                <p className="text-xs text-slate-500 py-6 text-center">Aucune demande reçue pour le moment.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-100 text-slate-600 font-semibold">
                        <th className="py-2.5 px-4">Date</th>
                        <th className="py-2.5 px-4">Contact</th>
                        <th className="py-2.5 px-4">Entreprise</th>
                        <th className="py-2.5 px-4">Pôle Service</th>
                        <th className="py-2.5 px-4">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {submissions.slice(0, 5).map((s) => (
                        <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{new Date(s.createdAt).toLocaleDateString()}</td>
                          <td className="py-3 px-4 font-bold text-slate-900">{s.fullName}</td>
                          <td className="py-3 px-4">{s.company || '-'}</td>
                          <td className="py-3 px-4">{s.serviceInterest}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                s.status === 'new'
                                  ? 'bg-red-100 text-red-700 border border-red-200'
                                  : s.status === 'contacted'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                  : 'bg-slate-100 text-slate-700 border border-slate-200'
                              }`}
                            >
                              {s.status === 'new' ? 'Nouveau' : s.status === 'contacted' ? 'Contacté' : s.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Leads Management */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded border border-slate-300 p-6 shadow-xs space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="font-bold text-base text-slate-900">
                Gestion des Prospects & Formulaires de Contact
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Consultez les détails, géographies cibles, budgets et mettez à jour le statut de suivi en direct.
              </p>
            </div>

            <div className="space-y-4">
              {submissions.map((lead) => {
                const isMapping = lead.isAutomationMapping || lead.serviceInterest.includes('MAPPING') || !!lead.mappingDossier;
                return (
                  <div
                    key={lead.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isMapping
                        ? 'border-blue-300 bg-blue-50/40 shadow-xs'
                        : 'border-slate-200 bg-slate-50'
                    } space-y-3`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {isMapping && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                            <Workflow className="w-3 h-3" />
                            <span>Dossier Mapping n8n</span>
                          </span>
                        )}
                        <strong className="text-sm text-slate-900 font-bold">{lead.fullName}</strong>
                        {lead.roleTitle && <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">{lead.roleTitle}</span>}
                        {lead.referenceNumber && (
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-bold">
                            {lead.referenceNumber}
                          </span>
                        )}
                        <span className="text-xs text-slate-500">({lead.email})</span>
                        {lead.phone && <span className="text-xs font-mono text-blue-700 font-semibold">{lead.phone}</span>}
                      </div>

                      <div className="flex items-center gap-2">
                        {isMapping && (
                          <button
                            type="button"
                            onClick={() => setViewingMappingDossier(lead)}
                            className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Consulter le Mapping Complet</span>
                          </button>
                        )}

                        <select
                          value={lead.status}
                          onChange={(e) => updateSubmissionStatus(lead.id, e.target.value as any)}
                          className="px-2.5 py-1 rounded bg-white border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
                        >
                          <option value="new">Nouveau (En attente)</option>
                          <option value="in_progress">En cours d'étude</option>
                          <option value="contacted">Contacté / RDV fixé</option>
                          <option value="closed">Clôturé / Signé</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Entreprise</span>
                        <span className="font-semibold text-slate-800">{lead.company || 'N/A'}</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Service & Modèle</span>
                        <span className="font-semibold text-slate-800 block truncate">{lead.serviceInterest}</span>
                        {lead.engagementModel && <span className="text-[10px] text-slate-500 truncate block">{lead.engagementModel}</span>}
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Territoire cible</span>
                        <span className="font-semibold text-slate-800">{lead.country}</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Budget & Délai</span>
                        <span className="font-semibold text-slate-800">{lead.budgetRange} ({lead.timeline})</span>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Détail de la demande :</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDownloadAdminDossier(lead)}
                            className="text-blue-600 hover:text-blue-800 font-semibold text-[11px] flex items-center gap-1"
                          >
                            <Download className="w-3 h-3" />
                            <span>Exporter .md</span>
                          </button>
                          {lead.mappingDossier?.workflowSchemaJson && (
                            <button
                              type="button"
                              onClick={() => handleDownloadAdminJson(lead)}
                              className="text-purple-600 hover:text-purple-800 font-semibold text-[11px] flex items-center gap-1"
                            >
                              <FileCode className="w-3 h-3" />
                              <span>JSON n8n</span>
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto font-sans">{lead.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Blog Management (WordPress Posts List) */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Articles & Publications
                </h3>
                <p className="text-xs text-slate-500">Ajoutez, modifiez ou supprimez vos publications.</p>
              </div>

              {!isCreatingPost && !editingPost && (
                <button
                  onClick={() => setIsCreatingPost(true)}
                  className="px-4 py-2 rounded bg-[#2271B1] hover:bg-[#135E96] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajouter un article</span>
                </button>
              )}
            </div>

            {/* Create or Edit Form */}
            {(isCreatingPost || editingPost) && (
              <div className="bg-white rounded border border-slate-300 p-6 shadow-sm space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <h4 className="font-bold text-sm text-slate-900">
                    {editingPost ? 'Modifier l’article' : 'Rédiger un nouvel article'}
                  </h4>
                  <button
                    onClick={() => {
                      setIsCreatingPost(false);
                      setEditingPost(null);
                    }}
                    className="p-1 text-slate-500 hover:text-slate-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const formData = new FormData(form);
                    const titleFr = formData.get('titleFr') as string;
                    const titleEn = formData.get('titleEn') as string;
                    const excerptFr = formData.get('excerptFr') as string;
                    const contentFr = formData.get('contentFr') as string;
                    const category = formData.get('category') as string;
                    const coverImage = formData.get('coverImage') as string;
                    const authorName = formData.get('authorName') as string;

                    const postObj: BlogPost = {
                      id: editingPost?.id || `post-${Date.now()}`,
                      slug: (titleFr || 'article').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                      title: { fr: titleFr, en: titleEn || titleFr },
                      excerpt: { fr: excerptFr, en: excerptFr },
                      content: { fr: contentFr, en: contentFr },
                      category,
                      coverImage: coverImage || editingPost?.coverImage || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
                      publishedAt: editingPost?.publishedAt || new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
                      author: {
                        name: authorName || 'Équipe Sechel Consulting',
                        role: 'Associé Senior',
                        avatar: editingPost?.author.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
                      },
                      readTime: '5 min',
                      tags: ['Stratégie', category],
                      isPublished: true,
                      views: editingPost?.views || 120
                    };

                    saveBlogPost(postObj);
                    setIsCreatingPost(false);
                    setEditingPost(null);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Titre (Français) *</label>
                      <input
                        type="text"
                        name="titleFr"
                        required
                        defaultValue={editingPost?.title.fr || ''}
                        className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Titre (Anglais)</label>
                      <input
                        type="text"
                        name="titleEn"
                        defaultValue={editingPost?.title.en || ''}
                        className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Catégorie</label>
                      <select
                        name="category"
                        defaultValue={editingPost?.category || 'Solaire & CleanTech'}
                        className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 text-slate-900"
                      >
                        <option value="Solaire & CleanTech">Solaire & CleanTech</option>
                        <option value="Stratégie B2B">Stratégie B2B</option>
                        <option value="ESG & Santé BoP">ESG & Santé BoP</option>
                        <option value="FinTech & Télécoms">FinTech & Télécoms</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Nom de l'Auteur</label>
                      <input
                        type="text"
                        name="authorName"
                        defaultValue={editingPost?.author.name || 'Équipe Sechel Consulting'}
                        className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">URL Image de Couverture</label>
                      <input
                        type="url"
                        name="coverImage"
                        defaultValue={editingPost?.coverImage || ''}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Extrait / Résumé Court *</label>
                    <textarea
                      name="excerptFr"
                      rows={2}
                      required
                      defaultValue={editingPost?.excerpt.fr || ''}
                      className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Corps de l'Article *</label>
                    <textarea
                      name="contentFr"
                      rows={6}
                      required
                      defaultValue={editingPost?.content.fr || ''}
                      className="w-full px-3 py-2 rounded bg-slate-50 border border-slate-300 text-slate-900 font-mono text-xs"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreatingPost(false);
                        setEditingPost(null);
                      }}
                      className="px-4 py-2 rounded bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded bg-[#2271B1] hover:bg-[#135E96] text-white font-semibold shadow-xs"
                    >
                      Publier / Mettre à jour
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Posts List */}
            <div className="bg-white rounded border border-slate-300 overflow-hidden shadow-xs">
              <div className="divide-y divide-slate-200">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={post.coverImage}
                        alt={post.title.fr}
                        className="w-12 h-12 rounded object-cover flex-shrink-0 border border-slate-200"
                      />
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                          {post.title.fr}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          {post.category} • Publié le {post.publishedAt} • Par {post.author.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => setEditingPost(post)}
                        className="p-2 rounded bg-slate-100 text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Supprimer cet article ?')) {
                            deleteBlogPost(post.id);
                          }
                        }}
                        className="p-2 rounded bg-slate-100 text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Projects Management */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Études de Cas & Réalisations
                </h3>
                <p className="text-xs text-slate-500">
                  Gérez les projets stratégiques réels (Conforta Energy, Heta Kasaï, Sun King, EcoFlow...).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 rounded bg-white border border-slate-300 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded border border-blue-200">
                        {proj.client}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{proj.location}</span>
                    </div>
                    <h4 className="font-bold text-base text-slate-900">
                      {proj.title.fr}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {proj.tagline.fr}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-700">
                      {proj.metrics[0]?.value} ({proj.metrics[0]?.label.fr})
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      En ligne
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Testimonials Management */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Avis & Témoignages Clients
                </h3>
                <p className="text-xs text-slate-500">Modérez ou supprimez les recommandations de vos clients.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map((testi) => (
                <div
                  key={testi.id}
                  className="p-5 rounded bg-white border border-slate-300 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(testi.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                        {testi.projectTag}
                      </span>
                    </div>
                    <p className="text-xs italic text-slate-700">
                      "{testi.quote.fr}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <strong className="text-xs text-slate-900 block">{testi.author}</strong>
                      <span className="text-[10px] text-slate-500">{testi.role} • {testi.company}</span>
                    </div>

                    <button
                      onClick={() => {
                        if (window.confirm('Supprimer ce témoignage ?')) {
                          deleteTestimonial(testi.id);
                        }
                      }}
                      className="p-1.5 rounded bg-slate-100 text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: SEO & Meta Settings (Yoast SEO Plugin Style) */}
        {activeTab === 'seo' && (
          <div className="bg-white rounded border border-slate-300 p-6 sm:p-8 shadow-xs space-y-8">
            <div className="border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-purple-600 text-white flex items-center justify-center text-xs font-black">
                  Y
                </div>
                <h3 className="font-bold text-base text-slate-900">
                  Yoast SEO — Référencement Naturel & Métadonnées
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Configurez le titre de site, les balises de prévisualisation Google et le schéma JSON-LD structuré.
              </p>
            </div>

            {savedSeoToast && (
              <div className="p-4 rounded bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Paramètres SEO mis à jour avec succès ! Les balises meta de la page sont actualisées.</span>
              </div>
            )}

            <form onSubmit={handleSaveSeo} className="space-y-6 text-xs">
              {/* Site Name & Default Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Nom du Site (Site Name)
                  </label>
                  <input
                    type="text"
                    value={seoForm.siteName}
                    onChange={(e) =>
                      setSeoForm({ ...seoForm, siteName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Titre Global SEO par Défaut
                  </label>
                  <input
                    type="text"
                    value={seoForm.defaultTitle}
                    onChange={(e) =>
                      setSeoForm({ ...seoForm, defaultTitle: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Meta Description in FR / EN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Meta Description (Français)
                  </label>
                  <textarea
                    rows={3}
                    value={seoForm.defaultDescription.fr}
                    onChange={(e) =>
                      setSeoForm({
                        ...seoForm,
                        defaultDescription: { ...seoForm.defaultDescription, fr: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Meta Description (Anglais)
                  </label>
                  <textarea
                    rows={3}
                    value={seoForm.defaultDescription.en}
                    onChange={(e) =>
                      setSeoForm({
                        ...seoForm,
                        defaultDescription: { ...seoForm.defaultDescription, en: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Keywords & Open Graph Image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Mots-Clés Principaux (séparés par des virgules)
                  </label>
                  <input
                    type="text"
                    value={seoForm.keywords.join(', ')}
                    onChange={(e) =>
                      setSeoForm({
                        ...seoForm,
                        keywords: e.target.value.split(',').map((k) => k.trim())
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    URL Image Open Graph (Partages réseaux sociaux)
                  </label>
                  <input
                    type="url"
                    value={seoForm.ogImage}
                    onChange={(e) => setSeoForm({ ...seoForm, ogImage: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Canonical URL & Twitter Handle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    URL Canonique Principale
                  </label>
                  <input
                    type="url"
                    value={seoForm.canonicalUrl}
                    onChange={(e) => setSeoForm({ ...seoForm, canonicalUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Twitter / X Handle
                  </label>
                  <input
                    type="text"
                    value={seoForm.twitterHandle}
                    onChange={(e) => setSeoForm({ ...seoForm, twitterHandle: e.target.value })}
                    placeholder="@SechelConsulting"
                    className="w-full px-3.5 py-2.5 rounded bg-slate-50 border border-slate-300 text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* JSON-LD Structured Data Preview */}
              <div>
                <div className="flex items-center gap-1.5 font-bold text-slate-700 mb-1.5">
                  <Code className="w-3.5 h-3.5 text-blue-600" />
                  <span>Schéma JSON-LD Organisation Schema.org (Généré automatiquement)</span>
                </div>
                <div className="p-4 rounded bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800">
                  {JSON.stringify(
                    {
                      "@context": "https://schema.org",
                      "@type": "ConsultingFirm",
                      "name": "Sechel Consulting",
                      "legalName": "Sechel Consulting SARL",
                      "url": seoForm.canonicalUrl,
                      "logo": `${seoForm.canonicalUrl}/icon.png`,
                      "description": seoForm.defaultDescription.fr,
                      "address": [
                        {
                          "@type": "PostalAddress",
                          "streetAddress": "142 Boulevard M'siri, Makomeno",
                          "addressLocality": "Lubumbashi",
                          "addressCountry": "CD"
                        },
                        {
                          "@type": "PostalAddress",
                          "streetAddress": "Akwa Tower, Boulevard de la Liberté",
                          "addressLocality": "Douala",
                          "addressCountry": "CM"
                        }
                      ],
                      "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+243-997-452-890",
                        "contactType": "customer service",
                        "availableLanguage": ["French", "English"]
                      }
                    },
                    null,
                    2
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 rounded bg-[#2271B1] hover:bg-[#135E96] text-white font-bold transition-all flex items-center gap-2 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Mettre à jour les réglages SEO</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 7: Email Alerts & Notifications */}
        {activeTab === 'emails' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-xs border border-slate-300 p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="font-serif-display text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span>Passerelle d'Alertes Email Automatiques (Sechel Team)</span>
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Configurez l'envoi automatique d'alertes email à la direction lorsque des clients complètent le formulaire de cadrage d'automatisation.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleRunTestEmail}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>Envoyer un Test Email</span>
                  </button>
                </div>
              </div>

              {testEmailToast && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Test d'alerte email envoyé avec succès à la direction. Un log d'audit a été enregistré.</span>
                </div>
              )}

              {savedEmailToast && (
                <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Paramètres de la passerelle email mis à jour avec succès.</span>
                </div>
              )}

              <form onSubmit={handleSaveEmailSettings} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* General Email Settings */}
                  <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Règles de Notification
                    </h4>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-xs font-bold text-slate-900 block">Activer les alertes automatiques</label>
                        <span className="text-[11px] text-slate-500">Envoie un email immédiat lors d'un nouveau cadrage</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={emailForm.autoNotifyOnScoping}
                        onChange={(e) => setEmailForm({ ...emailForm, autoNotifyOnScoping: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <label className="text-xs font-bold text-slate-700 block">Passerelle SMTP & Protocole</label>
                      <input
                        type="text"
                        value={emailForm.smtpProvider}
                        onChange={(e) => setEmailForm({ ...emailForm, smtpProvider: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none bg-white font-medium"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Adresse Expéditeur (Sender Email)</label>
                      <input
                        type="email"
                        value={emailForm.senderEmail}
                        onChange={(e) => setEmailForm({ ...emailForm, senderEmail: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none bg-white font-medium"
                      />
                    </div>
                  </div>

                  {/* Recipients Management */}
                  <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Destinataires des Alertes Équipe Sechel
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Adresses email recevant instantanément le cahier des charges et la synthèse ROI.
                    </p>

                    <div className="space-y-2">
                      {emailForm.recipientEmails.map((email) => (
                        <div key={email} className="flex items-center justify-between px-3 py-2 bg-white rounded-lg border border-slate-200 text-xs">
                          <span className="font-medium text-slate-800 font-mono">{email}</span>
                          {emailForm.recipientEmails.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveRecipient(email)}
                              className="text-red-600 hover:text-red-800 text-[11px] font-semibold cursor-pointer"
                            >
                              Supprimer
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <input
                        type="email"
                        placeholder="nouvelle.adresse@sechel-consulting.com"
                        value={newRecipient}
                        onChange={(e) => setNewRecipient(e.target.value)}
                        className="flex-grow px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleAddRecipient}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Sauvegarder les paramètres de notification</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Email Dispatch Audit Log Table */}
            <div className="bg-white rounded-xl shadow-xs border border-slate-300 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h4 className="font-serif-display text-base font-bold text-slate-900">
                    Journal des Alertes Email Envoyées ({emailLogs.length})
                  </h4>
                  <p className="text-xs text-slate-500">
                    Historique des notifications transmises à l'équipe Sechel suite aux soumissions de formulaires de cadrage.
                  </p>
                </div>

                {emailLogs.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Voulez-vous effacer l’historique des logs email ?')) {
                        clearEmailLogs();
                      }
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Effacer le journal</span>
                  </button>
                )}
              </div>

              {emailLogs.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  Aucun email d'alerte enregistré pour le moment.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
                        <th className="py-2.5 px-3">Date / Heure</th>
                        <th className="py-2.5 px-3">Destinataire</th>
                        <th className="py-2.5 px-3">Client / Entreprise</th>
                        <th className="py-2.5 px-3">Sujet de l'Alerte</th>
                        <th className="py-2.5 px-3">Statut</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {emailLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50">
                          <td className="py-3 px-3 font-mono text-slate-600 text-[11px]">
                            {new Date(log.createdAt).toLocaleString('fr-FR')}
                          </td>
                          <td className="py-3 px-3 font-semibold text-slate-900">
                            {log.recipient}
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-bold text-slate-900 block">{log.clientName}</span>
                            <span className="text-[10px] text-slate-500 block">{log.company}</span>
                          </td>
                          <td className="py-3 px-3 text-slate-700 font-medium max-w-xs truncate">
                            {log.subject}
                          </td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              Envoyé
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              type="button"
                              onClick={() => setViewingEmailLog(log)}
                              className="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Voir l'email</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mapping Dossier Full Viewer Modal */}
      {viewingMappingDossier && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-slate-900">
            {/* Modal Header */}
            <div className="bg-[#0B1528] text-white p-5 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                  <Workflow className="w-5 h-5" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-900/60 border border-blue-500/30 text-[10px] font-bold text-blue-300 uppercase">
                    <span>Cahier des Charges & Cartographie de Processus</span>
                  </div>
                  <h3 className="font-serif-display text-lg font-bold text-white">
                    {viewingMappingDossier.company} • {viewingMappingDossier.country}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDownloadAdminDossier(viewingMappingDossier)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Télécharger .md</span>
                </button>

                {viewingMappingDossier.mappingDossier?.workflowSchemaJson && (
                  <button
                    type="button"
                    onClick={() => handleDownloadAdminJson(viewingMappingDossier)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold flex items-center gap-1.5 border border-slate-700"
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>JSON n8n</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setViewingMappingDossier(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 space-y-6 flex-grow">
              {/* Contact summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Contact & Rôle</span>
                  <span className="font-bold text-slate-900 block mt-0.5">{viewingMappingDossier.fullName}</span>
                  {viewingMappingDossier.roleTitle && <span className="text-slate-600 block">{viewingMappingDossier.roleTitle}</span>}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Coordonnées</span>
                  <span className="font-semibold text-blue-700 block mt-0.5">{viewingMappingDossier.phone}</span>
                  <span className="text-slate-600 block truncate">{viewingMappingDossier.email}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Budget & Échéance</span>
                  <span className="font-bold text-slate-900 block mt-0.5">{viewingMappingDossier.budgetRange}</span>
                  <span className="text-slate-600 block">{viewingMappingDossier.timeline}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Statut du Dossier</span>
                  <select
                    value={viewingMappingDossier.status}
                    onChange={(e) => {
                      updateSubmissionStatus(viewingMappingDossier.id, e.target.value as any);
                      setViewingMappingDossier({ ...viewingMappingDossier, status: e.target.value as any });
                    }}
                    className="mt-1 px-2 py-1 rounded bg-white border border-slate-300 text-xs font-bold text-slate-800"
                  >
                    <option value="new">Nouveau</option>
                    <option value="in_progress">En cours d'étude</option>
                    <option value="contacted">Contacté / RDV fixé</option>
                    <option value="closed">Clôturé / Signé</option>
                  </select>
                </div>
              </div>

              {/* Full Dossier text */}
              <div className="bg-slate-900 text-slate-100 p-6 rounded-xl border border-slate-800 space-y-4 font-sans text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h4 className="font-serif-display text-sm font-bold text-blue-300">
                    Cahier des Charges & Rapport de Cartographie n8n
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400">
                    Reçu le {new Date(viewingMappingDossier.createdAt).toLocaleString('fr-FR')}
                  </span>
                </div>

                <div className="whitespace-pre-wrap leading-relaxed text-slate-300 space-y-3 font-sans">
                  {viewingMappingDossier.message}
                </div>
              </div>

              {/* JSON Architecture preview if available */}
              {viewingMappingDossier.mappingDossier?.workflowSchemaJson && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-400 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-sans pb-2 border-b border-slate-800">
                    <span>Blueprint JSON n8n</span>
                    <button
                      type="button"
                      onClick={() => {
                        if (viewingMappingDossier.mappingDossier?.workflowSchemaJson) {
                          navigator.clipboard.writeText(viewingMappingDossier.mappingDossier.workflowSchemaJson);
                          setCopiedAdminJson(true);
                          setTimeout(() => setCopiedAdminJson(false), 2000);
                        }
                      }}
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
                    >
                      {copiedAdminJson ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedAdminJson ? 'Copié' : 'Copier JSON'}</span>
                    </button>
                  </div>
                  <pre className="max-h-60 overflow-y-auto whitespace-pre-wrap">
                    {viewingMappingDossier.mappingDossier.workflowSchemaJson}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Email Log Detail Modal */}
      {viewingEmailLog && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden text-slate-900">
            <div className="bg-[#0B1528] text-white p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-blue-300 uppercase">Alerte Email Sechel Dispatchée</span>
                  <h3 className="font-serif-display text-base font-bold text-white">{viewingEmailLog.subject}</h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingEmailLog(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Destinataire</span>
                  <span className="font-semibold text-slate-900">{viewingEmailLog.recipient}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Date & Heure</span>
                  <span className="font-mono text-slate-700">{new Date(viewingEmailLog.createdAt).toLocaleString('fr-FR')}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Service / Intérêt Client</span>
                <div className="p-2.5 bg-blue-50 text-blue-900 font-bold rounded-lg">{viewingEmailLog.serviceInterest}</div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Résumé du Cadrage Transmis à la Direction</span>
                <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-sans whitespace-pre-wrap leading-relaxed">
                  {viewingEmailLog.summaryPreview}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setViewingEmailLog(null)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
