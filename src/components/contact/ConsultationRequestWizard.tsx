import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_INFO } from '../../data/initialData';
import {
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Calendar,
  DollarSign,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Send,
  FileCheck,
  Layers,
  Lock,
  Clock,
  Printer,
  Compass,
  Zap,
  TrendingUp,
  Award,
  Truck,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  company?: string;
  roleTitle?: string;
  serviceInterest?: string;
  engagementModel?: string;
  country?: string;
  budgetRange?: string;
  timeline?: string;
  message?: string;
  confidentialityAccepted?: string;
}

export const ConsultationRequestWizard: React.FC = () => {
  const { language, addContactSubmission } = useApp();

  // Multi-step form state: 1, 2, 3, 4, or 5 (success)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 4;

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [roleTitle, setRoleTitle] = useState('Directeur Général / CEO');

  const [serviceInterest, setServiceInterest] = useState('Structuration Solaire & Énergie Propre');
  const [engagementModel, setEngagementModel] = useState('Mission d\'Ingénierie & Exécution Terrain (3 à 6 mois)');

  const [country, setCountry] = useState('Grand Katanga (Lubumbashi, Kolwezi - Pôle Minier)');
  const [budgetRange, setBudgetRange] = useState('150 000 - 500 000 USD (Déploiement Commercial / Solaire)');
  const [timeline, setTimeline] = useState('1 à 3 mois (Prochain trimestre fiscal)');
  const [message, setMessage] = useState('');

  const [confidentialityAccepted, setConfidentialityAccepted] = useState(false);

  // Errors & touched states
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string>('');
  const [submissionDate, setSubmissionDate] = useState<string>('');

  // Service offerings with badges and descriptions
  const serviceOptions = [
    {
      id: 'solar',
      title: {
        fr: 'Structuration Solaire & Énergies Renouvelables',
        en: 'Clean Energy & Solar Off-Grid Structuring'
      },
      tag: { fr: 'Off-Grid • C&I • Santé', en: 'Off-Grid • C&I • Health' },
      desc: {
        fr: 'Dimensionnement Capex/Opex, ingénierie de distribution PAYG, électrification rurale et sites miniers.',
        en: 'Capex/Opex modeling, PAYG distribution engineering, and off-grid mini-grids for health & mining hubs.'
      },
      icon: Zap,
      color: 'border-amber-500/30 bg-amber-50/50 hover:border-amber-500'
    },
    {
      id: 'market_expansion',
      title: {
        fr: 'Expansion Commerciale & Réseaux Tier-1',
        en: 'Market Expansion & Tier-1 Distribution'
      },
      tag: { fr: 'B2B • Grossistes • Ventes', en: 'B2B • Wholesalers • Sales' },
      desc: {
        fr: 'Pénétration de marché, négociation d\'accords grossistes exclusifs, constitution de force commerciale.',
        en: 'Strategic market entry, master dealer negotiations, and localized B2B distribution channels.'
      },
      icon: TrendingUp,
      color: 'border-blue-500/30 bg-blue-50/50 hover:border-blue-500'
    },
    {
      id: 'compliance',
      title: {
        fr: 'Conformité Réglementaire, ARSP & Droit OHADA',
        en: 'Regulatory Compliance, ARSP & OHADA Law'
      },
      tag: { fr: 'Agrément ARSP • Mines RDC', en: 'ARSP Certification • DRC Mining' },
      desc: {
        fr: 'Homologation de sous-traitance en RDC, sécurisation contractuelle OHADA et audit fiscal préalable.',
        en: 'DRC subcontracting clearance (ARSP), OHADA legal alignment, and cross-border regulatory structuring.'
      },
      icon: ShieldCheck,
      color: 'border-emerald-500/30 bg-emerald-50/50 hover:border-emerald-500'
    },
    {
      id: 'logistics',
      title: {
        fr: 'Logistique Dernier Kilomètre & Chaîne d\'Approvisionnement',
        en: 'Last-Mile Logistics & Supply Chain Corridors'
      },
      tag: { fr: 'Corridors Sud • Kasaï • Transit', en: 'Southern Corridor • Kasaï' },
      desc: {
        fr: 'Sécurisation du fret transfrontalier, gestion des stocks régionaux et supervision d\'axes routiers complexes.',
        en: 'Cross-border customs routing, regional warehousing, and supervision across critical transport corridors.'
      },
      icon: Truck,
      color: 'border-indigo-500/30 bg-indigo-50/50 hover:border-indigo-500'
    },
    {
      id: 'fintech',
      title: {
        fr: 'Ingénierie Financière & Monétique Mobile',
        en: 'Financial Structuring & Mobile Money Rails'
      },
      tag: { fr: 'P&L • Mobile Money • BCC/BEAC', en: 'P&L • Mobile Money • FX' },
      desc: {
        fr: 'Intégration Orange Money / M-Pesa / MTN MoMo, politique de marge et rapatriement de devises.',
        en: 'Automated Mobile Money reconciliation, multi-currency pricing, and foreign exchange compliance.'
      },
      icon: Award,
      color: 'border-purple-500/30 bg-purple-50/50 hover:border-purple-500'
    }
  ];

  const engagementModels = [
    {
      title: {
        fr: 'Diagnostic Préalable & Cadrage Stratégique (2 à 4 semaines)',
        en: 'Initial Diagnostic & Strategic Scoping (2 to 4 weeks)'
      },
      detail: {
        fr: 'Audit 360° du marché, vérification de conformité légale et feuille de route opérationnelle.',
        en: '360° market audit, regulatory check, and actionable execution roadmap.'
      }
    },
    {
      title: {
        fr: 'Mission d\'Ingénierie & Exécution Terrain (3 à 6 mois)',
        en: 'Engineering & Field Execution Mission (3 to 6 months)'
      },
      detail: {
        fr: 'Déploiement physique, négociation des accords distributeurs et mise en place des processus.',
        en: 'On-the-ground operational deployment, distributor contracting, and KPI rollout.'
      }
    },
    {
      title: {
        fr: 'Conseil Stratégique Continu & Gouvernance (12 mois)',
        en: 'Retainer Strategic Advisory & Board Governance (12 months)'
      },
      detail: {
        fr: 'Accompagnement continu de la direction générale, comités stratégiques et expansion régionale.',
        en: 'Ongoing executive advisory, quarterly strategy reviews, and multi-market scale.'
      }
    }
  ];

  const territories = [
    { id: 'katanga', label: 'Grand Katanga (Lubumbashi, Kolwezi, Likasi - Pôle Minier)' },
    { id: 'kinshasa', label: 'Kinshasa & Kongo Central (Port de Matadi, Sièges Nationaux)' },
    { id: 'kasai', label: 'Espace Grand Kasaï (Mbuji-Mayi, Kananga, Tshikapa)' },
    { id: 'cemac', label: 'Cameroun & Bassin du Congo / CEMAC (Douala, Yaoundé)' },
    { id: 'sadc', label: 'Afrique du Sud & Hub SADC (Johannesburg, Durban)' },
    { id: 'pan_africa', label: 'Déploiement Multi-Pays Panafricain' }
  ];

  const budgetOptions = [
    { label: '< 50 000 USD (Cadrage Ciblé / Audit Préalable)' },
    { label: '50 000 - 150 000 USD (Mission d\'Ingénierie d\'Affaires Spécifique)' },
    { label: '150 000 - 500 000 USD (Déploiement Commercial / Structuration Solaire)' },
    { label: '500 000 - 2 000 000 USD+ (Mission Industrielle ou Infrastructure)' }
  ];

  const timelineOptions = [
    { label: 'Immédiat (< 2 semaines - Opportunité urgente / Situation critique)' },
    { label: '1 à 3 mois (Prochain trimestre fiscal)' },
    { label: '3 à 6 mois (Préparation d\'exercice annuel)' },
    { label: 'En phase de cadrage exploratoire' }
  ];

  // Validation functions
  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = language === 'fr' ? 'Le nom complet est obligatoire.' : 'Full name is required.';
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = language === 'fr' ? 'Veuillez saisir au moins 3 caractères.' : 'Must be at least 3 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = language === 'fr' ? 'L\'adresse email professionnelle est obligatoire.' : 'Professional email is required.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = language === 'fr' ? 'Format d\'adresse email invalide.' : 'Invalid email address format.';
    }

    if (!phone.trim()) {
      newErrors.phone = language === 'fr' ? 'Le numéro de téléphone est obligatoire.' : 'Phone number is required.';
    } else if (phone.trim().length < 8) {
      newErrors.phone = language === 'fr' ? 'Indiquez un numéro valide avec l\'indicatif pays (ex: +243...)' : 'Provide a valid phone with country code (e.g. +243...)';
    }

    if (!company.trim()) {
      newErrors.company = language === 'fr' ? 'Le nom de l\'entreprise ou institution est requis.' : 'Company or institution name is required.';
    }

    if (!roleTitle.trim()) {
      newErrors.roleTitle = language === 'fr' ? 'Veuillez préciser votre fonction décisionnelle.' : 'Please specify your executive role.';
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};
    if (!serviceInterest) {
      newErrors.serviceInterest = language === 'fr' ? 'Veuillez sélectionner un domaine d\'expertise principal.' : 'Please select a primary service area.';
    }
    if (!engagementModel) {
      newErrors.engagementModel = language === 'fr' ? 'Veuillez sélectionner un modèle d\'intervention.' : 'Please select an engagement model.';
    }
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: FormErrors = {};
    if (!country) {
      newErrors.country = language === 'fr' ? 'Veuillez choisir un territoire prioritaire.' : 'Please select a target territory.';
    }
    if (!budgetRange) {
      newErrors.budgetRange = language === 'fr' ? 'Veuillez spécifier une enveloppe prévisionnelle.' : 'Please specify an investment range.';
    }
    if (!timeline) {
      newErrors.timeline = language === 'fr' ? 'Veuillez préciser l\'échéance souhaitée.' : 'Please select your target timeline.';
    }
    if (!message.trim()) {
      newErrors.message = language === 'fr' ? 'Veuillez décrire brièvement vos objectifs ou votre projet.' : 'Please describe your project or objectives.';
    } else if (message.trim().length < 20) {
      newErrors.message = language === 'fr'
        ? `Description trop succincte (${message.trim().length}/20 caractères min). Merci de préciser votre contexte.`
        : `Brief is too short (${message.trim().length}/20 chars min). Please provide additional context.`;
    }
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = (): boolean => {
    const newErrors: FormErrors = {};
    if (!confidentialityAccepted) {
      newErrors.confidentialityAccepted = language === 'fr'
        ? 'L\'acceptation des conditions de confidentialité est requise pour finaliser la transmission.'
        : 'Acceptance of the confidentiality terms is required to submit your dossier.';
    }
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    } else if (currentStep === 3) {
      isValid = validateStep3();
    }

    if (isValid) {
      setErrors({});
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      // Scroll to form header smoothly
      const formEl = document.getElementById('consultation-wizard');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handlePrev = () => {
    setErrors({});
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep4()) return;

    setIsSubmitting(true);

    const generatedRef = `MDT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const nowIso = new Date().toISOString();

    setTimeout(() => {
      addContactSubmission({
        fullName,
        email,
        phone,
        company,
        country,
        serviceInterest,
        budgetRange,
        timeline,
        message,
        roleTitle,
        engagementModel,
        referenceNumber: generatedRef
      });

      setReferenceId(generatedRef);
      setSubmissionDate(nowIso);
      setIsSubmitting(false);
      setCurrentStep(5); // Success step
    }, 600);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setFullName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setRoleTitle('Directeur Général / CEO');
    setServiceInterest('Structuration Solaire & Énergies Renouvelables');
    setEngagementModel('Mission d\'Ingénierie & Exécution Terrain (3 à 6 mois)');
    setCountry('Grand Katanga (Lubumbashi, Kolwezi - Pôle Minier)');
    setBudgetRange('150 000 - 500 000 USD (Déploiement Commercial / Solaire)');
    setTimeline('1 à 3 mois (Prochain trimestre fiscal)');
    setMessage('');
    setConfidentialityAccepted(false);
    setErrors({});
    setTouched({});
  };

  return (
    <div id="consultation-wizard" className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Enterprise Top Header Cockpit */}
      <div className="bg-[#0B1528] text-white p-6 sm:p-8 border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-blue-900/80 border border-blue-500/40 text-blue-300 font-mono text-[11px] font-bold uppercase tracking-wider">
                PORTAIL DE CADRAGE STRATÉGIQUE
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Protocole Sécurisé 256-bit
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif-display text-white tracking-tight">
              {language === 'fr' ? 'Demande de Consultation & Cadrage de Mission' : 'Consultation Request & Engagement Scoping'}
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              {language === 'fr'
                ? 'Processus structuré en 4 étapes pour qualifier précisément votre projet, assigner le Directeur de mission adéquat et garantir un échange à forte valeur ajoutée sous 24h ouvrées.'
                : 'A structured 4-step intake process designed to qualify your project objectives, assign the appropriate Senior Partner, and deliver rapid executive feedback within 24 business hours.'}
            </p>
          </div>

          {currentStep <= totalSteps && (
            <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 px-4 py-2.5 rounded-xl flex-shrink-0">
              <div className="text-right">
                <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">
                  {language === 'fr' ? 'Progression' : 'Progress'}
                </span>
                <span className="text-xs font-mono font-bold text-blue-400">
                  {language === 'fr' ? `Étape ${currentStep} sur ${totalSteps}` : `Step ${currentStep} of ${totalSteps}`}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center font-mono font-bold text-sm text-blue-300">
                {Math.round((currentStep / totalSteps) * 100)}%
              </div>
            </div>
          )}
        </div>

        {/* Stepper Navigation Pills (Desktop & Mobile) */}
        {currentStep <= totalSteps && (
          <div className="mt-6 pt-6 border-t border-slate-800/80">
            {/* Progress line */}
            <div className="relative mb-4">
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300 ease-out"
                  style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                />
              </div>
            </div>

            {/* Stepper tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
              {[
                { step: 1, title: { fr: '1. Identité & Rôle', en: '1. Identity & Role' }, icon: User },
                { step: 2, title: { fr: '2. Domaine de la Mission', en: '2. Engagement Track' }, icon: Briefcase },
                { step: 3, title: { fr: '3. Périmètre & Budget', en: '3. Scope & Budget' }, icon: Compass },
                { step: 4, title: { fr: '4. Synthèse & Accord', en: '4. Review & NDA' }, icon: ShieldCheck }
              ].map((s) => {
                const IconComponent = s.icon;
                const isCompleted = currentStep > s.step;
                const isActive = currentStep === s.step;

                return (
                  <button
                    key={s.step}
                    type="button"
                    disabled={s.step > currentStep}
                    onClick={() => {
                      if (s.step < currentStep) setCurrentStep(s.step);
                    }}
                    className={`flex items-center gap-2 p-2 sm:p-2.5 rounded-lg text-left transition-all ${
                      isActive
                        ? 'bg-blue-600/20 border border-blue-500 text-white shadow-sm'
                        : isCompleted
                        ? 'bg-slate-900/60 border border-slate-700/60 text-emerald-400 cursor-pointer hover:bg-slate-800'
                        : 'bg-slate-900/30 border border-slate-800/40 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : s.step}
                    </div>
                    <span className="text-xs font-medium truncate">
                      {s.title[language]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main Form Content Area */}
      <div className="p-6 sm:p-10 bg-white">
        {/* SUCCESS VIEW (Step 5) */}
        {currentStep === 5 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-6 space-y-8"
          >
            {/* Header Success Alert */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-bold uppercase tracking-wider inline-block">
                {language === 'fr' ? 'Dossier Transmis avec Succès' : 'Mission Dossier Successfully Registered'}
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900">
                {language === 'fr' ? 'Votre Demande de Cadrage est Enregistrée' : 'Your Scoping Request Has Been Logged'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {language === 'fr'
                  ? 'Nous vous remercions pour votre confiance. Votre dossier a été transmis directement au Comité de Direction de Sechel Consulting. Un Associé Senior analysera vos objectifs sous 24h ouvrées.'
                  : 'Thank you for your trust. Your dossier has been routed to the Sechel Consulting Executive Committee. A Senior Partner will review your scope within 24 business hours.'}
              </p>
            </div>

            {/* Official Confirmation Receipt Card */}
            <div className="max-w-2xl mx-auto bg-slate-50 border border-slate-300 rounded-xl p-6 space-y-5 text-xs text-slate-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                    Numéro de Référence Mission
                  </span>
                  <span className="font-mono font-bold text-base text-blue-700">{referenceId}</span>
                </div>
                <div className="sm:text-right">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                    Date d'enregistrement
                  </span>
                  <span className="font-mono text-slate-600">
                    {new Date(submissionDate).toLocaleDateString()} • {new Date(submissionDate).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              {/* Summary table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-mono uppercase font-bold block">Commanditaire</span>
                  <p className="font-bold text-slate-900 mt-0.5">{fullName}</p>
                  <p className="text-slate-500">{roleTitle} • {company}</p>
                </div>

                <div className="p-3 bg-white rounded border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-mono uppercase font-bold block">Coordonnées</span>
                  <p className="font-mono text-slate-900 mt-0.5">{email}</p>
                  <p className="font-mono text-blue-600">{phone}</p>
                </div>

                <div className="p-3 bg-white rounded border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-mono uppercase font-bold block">Pôle & Modèle</span>
                  <p className="font-bold text-slate-900 mt-0.5">{serviceInterest}</p>
                  <p className="text-slate-500 truncate">{engagementModel}</p>
                </div>

                <div className="p-3 bg-white rounded border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-mono uppercase font-bold block">Territoire & Budget</span>
                  <p className="font-bold text-slate-900 mt-0.5">{country}</p>
                  <p className="text-slate-500">{budgetRange} ({timeline})</p>
                </div>
              </div>

              {/* Next Steps Protocol SLA */}
              <div className="p-4 rounded-lg bg-blue-50/70 border border-blue-200 space-y-2">
                <span className="text-xs font-bold text-blue-900 uppercase font-mono block">
                  {language === 'fr' ? 'Protocole de Traitement Sechel :' : 'Standard Operating SLA :'}
                </span>
                <ul className="space-y-1.5 text-[11px] text-blue-950">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Accusé de réception formel :</strong> Envoyé à votre adresse email avec l'accord bilatéral de confidentialité (NDA).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Entretien de cadrage préliminaire :</strong> Un appel vidéo ou une rencontre dans nos bureaux (Lubumbashi, Douala, Sandton) vous sera proposé sous 24h.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Note d'orientation stratégique :</strong> Formulation d'une proposition technique et financière détaillée sous 5 jours ouvrés.</span>
                  </li>
                </ul>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200">
                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>{language === 'fr' ? 'Imprimer l\'accusé de réception' : 'Print Confirmation Receipt'}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'fr' ? 'Soumettre un autre dossier' : 'Submit Another Request'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {/* STEP 1: IDENTITY & ROLE */}
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
                    <User className="w-4 h-4" />
                    <span>{language === 'fr' ? 'Étape 1 : Identité du Demandeur & Organisation' : 'Step 1: Requester Identity & Organization'}</span>
                  </div>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                    {language === 'fr' ? 'Qui porte cette initiative stratégique ?' : 'Who is leading this strategic initiative?'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {language === 'fr'
                      ? 'Ces informations nous permettent de calibrer le niveau de séniorité des consultants mobilisés et de vérifier l\'absence de conflit d\'intérêts.'
                      : 'This information ensures the appropriate Senior Partner is assigned and allows preliminary conflict-of-interest screening.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      {language === 'fr' ? 'Nom et Prénom du Décisionnaire *' : 'Full Name of Executive *'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors(prev => ({ ...prev, fullName: undefined }));
                        }}
                        onBlur={() => setTouched(prev => ({ ...prev, fullName: true }))}
                        placeholder="e.g. Jean-Paul Kabamba"
                        className={`w-full px-3.5 py-2.5 rounded-lg text-xs text-slate-900 transition-colors focus:outline-none ${
                          errors.fullName
                            ? 'bg-red-50/60 border-2 border-red-500 focus:bg-white'
                            : fullName.trim().length >= 3
                            ? 'bg-slate-50 border border-emerald-500/80 focus:bg-white'
                            : 'bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white'
                        }`}
                      />
                      {fullName.trim().length >= 3 && !errors.fullName && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 absolute right-3 top-3 pointer-events-none" />
                      )}
                    </div>
                    {errors.fullName && (
                      <div className="flex items-center gap-1 text-[11px] text-red-600 font-medium mt-1">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{errors.fullName}</span>
                      </div>
                    )}
                  </div>

                  {/* Professional Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      {language === 'fr' ? 'Adresse Email Professionnelle *' : 'Professional Email Address *'}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                        }}
                        onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                        placeholder="e.g. direction@groupe-minier.cd"
                        className={`w-full px-3.5 py-2.5 rounded-lg text-xs text-slate-900 transition-colors focus:outline-none ${
                          errors.email
                            ? 'bg-red-50/60 border-2 border-red-500 focus:bg-white'
                            : email.includes('@') && email.includes('.')
                            ? 'bg-slate-50 border border-emerald-500/80 focus:bg-white'
                            : 'bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white'
                        }`}
                      />
                      {email.includes('@') && email.includes('.') && !errors.email && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 absolute right-3 top-3 pointer-events-none" />
                      )}
                    </div>
                    {errors.email && (
                      <div className="flex items-center gap-1 text-[11px] text-red-600 font-medium mt-1">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Phone with Country Code */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      {language === 'fr' ? 'Téléphone & Ligne Directe (avec indicatif) *' : 'Direct Phone Line (with Country Code) *'}
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                        }}
                        onBlur={() => setTouched(prev => ({ ...prev, phone: true }))}
                        placeholder="+243 997 000 000 ou +27 11 000 0000"
                        className={`w-full px-3.5 py-2.5 rounded-lg text-xs text-slate-900 transition-colors focus:outline-none ${
                          errors.phone
                            ? 'bg-red-50/60 border-2 border-red-500 focus:bg-white'
                            : phone.trim().length >= 8
                            ? 'bg-slate-50 border border-emerald-500/80 focus:bg-white'
                            : 'bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white'
                        }`}
                      />
                      {phone.trim().length >= 8 && !errors.phone && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 absolute right-3 top-3 pointer-events-none" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 block">
                      {language === 'fr' ? 'Indicatifs fréquents : +243 (RDC), +237 (Cameroun), +27 (Afrique du Sud)' : 'Common codes: +243 (DRC), +237 (Cameroon), +27 (South Africa)'}
                    </span>
                    {errors.phone && (
                      <div className="flex items-center gap-1 text-[11px] text-red-600 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{errors.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Company / Institution */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      {language === 'fr' ? 'Entreprise ou Institution Commanditaire *' : 'Company or Client Organization *'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => {
                          setCompany(e.target.value);
                          if (errors.company) setErrors(prev => ({ ...prev, company: undefined }));
                        }}
                        onBlur={() => setTouched(prev => ({ ...prev, company: true }))}
                        placeholder="e.g. Katanga Mining Logistics SARL"
                        className={`w-full px-3.5 py-2.5 rounded-lg text-xs text-slate-900 transition-colors focus:outline-none ${
                          errors.company
                            ? 'bg-red-50/60 border-2 border-red-500 focus:bg-white'
                            : company.trim().length >= 2
                            ? 'bg-slate-50 border border-emerald-500/80 focus:bg-white'
                            : 'bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white'
                        }`}
                      />
                      {company.trim().length >= 2 && !errors.company && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 absolute right-3 top-3 pointer-events-none" />
                      )}
                    </div>
                    {errors.company && (
                      <div className="flex items-center gap-1 text-[11px] text-red-600 font-medium mt-1">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{errors.company}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Role selection quick pills */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold text-slate-800">
                    {language === 'fr' ? 'Votre Rôle / Fonction au sein de l\'Organisation *' : 'Your Executive Function / Title *'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Directeur Général / CEO',
                      'Directeur Financier / CFO',
                      'Directeur des Opérations / COO',
                      'Directeur du Développement & Stratégie',
                      'Conseil d\'Administration / Investisseur',
                      'Autre Fonction'
                    ].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => {
                          setRoleTitle(role);
                          if (errors.roleTitle) setErrors(prev => ({ ...prev, roleTitle: undefined }));
                        }}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                          roleTitle === role
                            ? 'bg-blue-600 text-white font-bold shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                  {roleTitle === 'Autre Fonction' && (
                    <input
                      type="text"
                      placeholder={language === 'fr' ? 'Précisez votre fonction exacte...' : 'Specify your exact title...'}
                      onChange={(e) => setRoleTitle(e.target.value)}
                      className="mt-2 w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  )}
                  {errors.roleTitle && (
                    <div className="flex items-center gap-1 text-[11px] text-red-600 font-medium mt-1">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{errors.roleTitle}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 2: MISSION SCOPE & TRACK */}
            {currentStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
                    <Briefcase className="w-4 h-4" />
                    <span>{language === 'fr' ? 'Étape 2 : Cadrage de la Mission & Expertise Requise' : 'Step 2: Mission Scope & Service Track'}</span>
                  </div>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                    {language === 'fr' ? 'Sur quel pôle d\'intervention sollicitez-vous notre cabinet ?' : 'Which strategic advisory track do you require?'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {language === 'fr'
                      ? 'Sélectionnez le pôle principal. Nos équipes combinent fréquemment plusieurs compétences selon la complexité du déploiement.'
                      : 'Select your primary operational track. Multi-disciplinary capabilities are commonly bundled.'}
                  </p>
                </div>

                {/* Service Cards Grid */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-800">
                    {language === 'fr' ? 'Pôle d\'Expertise Prioritaire *' : 'Primary Advisory Domain *'}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {serviceOptions.map((opt) => {
                      const IconCmp = opt.icon;
                      const isSelected = serviceInterest === opt.title.fr || serviceInterest === opt.title.en;

                      return (
                        <div
                          key={opt.id}
                          onClick={() => {
                            setServiceInterest(opt.title[language]);
                            if (errors.serviceInterest) setErrors(prev => ({ ...prev, serviceInterest: undefined }));
                          }}
                          className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/60 shadow-md ring-1 ring-blue-600/20'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                                isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                              }`}>
                                <IconCmp className="w-4 h-4" />
                              </div>
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                                isSelected ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {opt.tag[language]}
                              </span>
                            </div>

                            <h4 className="text-sm font-bold text-slate-900">
                              {opt.title[language]}
                            </h4>

                            <p className="text-xs text-slate-600 leading-relaxed">
                              {opt.desc[language]}
                            </p>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                            <span className={isSelected ? 'text-blue-700 font-bold' : 'text-slate-400'}>
                              {isSelected ? (language === 'fr' ? '● Pôle Sélectionné' : '● Selected Track') : (language === 'fr' ? 'Cliquer pour sélectionner' : 'Click to choose')}
                            </span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {errors.serviceInterest && (
                    <div className="flex items-center gap-1 text-[11px] text-red-600 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{errors.serviceInterest}</span>
                    </div>
                  )}
                </div>

                {/* Engagement Model */}
                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <label className="block text-xs font-bold text-slate-800">
                    {language === 'fr' ? 'Modèle d\'Engagement Opérationnel Souhaité *' : 'Preferred Engagement & Delivery Model *'}
                  </label>
                  <div className="space-y-2.5">
                    {engagementModels.map((m, idx) => {
                      const isSelected = engagementModel === m.title.fr || engagementModel === m.title.en;

                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            setEngagementModel(m.title[language]);
                            if (errors.engagementModel) setErrors(prev => ({ ...prev, engagementModel: undefined }));
                          }}
                          className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 flex-shrink-0 ${
                            isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-400 bg-white'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div className="space-y-0.5">
                            <strong className="text-xs text-slate-900 font-bold block">
                              {m.title[language]}
                            </strong>
                            <p className="text-[11px] text-slate-500">
                              {m.detail[language]}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {errors.engagementModel && (
                    <div className="flex items-center gap-1 text-[11px] text-red-600 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{errors.engagementModel}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 3: SCOPE, BUDGET & SPECIFICS */}
            {currentStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
                    <Compass className="w-4 h-4" />
                    <span>{language === 'fr' ? 'Étape 3 : Territoire, Enveloppe & Cahier des Charges' : 'Step 3: Territory, Investment & Project Brief'}</span>
                  </div>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                    {language === 'fr' ? 'Précisez le cadre géographique et vos objectifs' : 'Define your geographic scope & operational parameters'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {language === 'fr'
                      ? 'Ces éléments permettent de modéliser les contraintes logistiques, douanières et monétaires spécifiques à chaque zone.'
                      : 'These factors define the specific customs, logistics, and foreign exchange requirements for the mission.'}
                  </p>
                </div>

                {/* Geography & Budget Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Territory */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      {language === 'fr' ? 'Territoire Géographique Prioritaire *' : 'Target Geographic Corridor *'}
                    </label>
                    <select
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                        if (errors.country) setErrors(prev => ({ ...prev, country: undefined }));
                      }}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    >
                      {territories.map((t) => (
                        <option key={t.id} value={t.label}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                    {errors.country && (
                      <div className="flex items-center gap-1 text-[11px] text-red-600 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{errors.country}</span>
                      </div>
                    )}
                  </div>

                  {/* Budget Enveloppe */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      {language === 'fr' ? 'Enveloppe Prévisionnelle du Projet *' : 'Estimated Mission / Project Budget *'}
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => {
                        setBudgetRange(e.target.value);
                        if (errors.budgetRange) setErrors(prev => ({ ...prev, budgetRange: undefined }));
                      }}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    >
                      {budgetOptions.map((b, idx) => (
                        <option key={idx} value={b.label}>
                          {b.label}
                        </option>
                      ))}
                    </select>
                    {errors.budgetRange && (
                      <div className="flex items-center gap-1 text-[11px] text-red-600 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{errors.budgetRange}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    {language === 'fr' ? 'Échéance / Horizon Temporel de Démarrage *' : 'Target Timeline / Launch Urgency *'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {timelineOptions.map((tl, idx) => {
                      const isSelected = timeline === tl.label;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setTimeline(tl.label);
                            if (errors.timeline) setErrors(prev => ({ ...prev, timeline: undefined }));
                          }}
                          className={`p-2.5 rounded-lg text-left text-xs transition-all border ${
                            isSelected
                              ? 'bg-blue-50 border-blue-600 font-bold text-blue-900 shadow-xs'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Clock className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                            <span className="truncate">{tl.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {errors.timeline && (
                    <div className="flex items-center gap-1 text-[11px] text-red-600 font-medium mt-1">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{errors.timeline}</span>
                    </div>
                  )}
                </div>

                {/* Project Brief */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-800">
                      {language === 'fr' ? 'Description Synthétique de Vos Objectifs & Contraintes *' : 'Executive Brief & Key Objectives *'}
                    </label>
                    <span className={`text-[11px] font-mono ${
                      message.trim().length < 20 ? 'text-slate-400' : 'text-emerald-600 font-bold'
                    }`}>
                      {message.trim().length} / 20 {language === 'fr' ? 'caractères min' : 'chars min'}
                    </span>
                  </div>

                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message && e.target.value.trim().length >= 20) {
                        setErrors(prev => ({ ...prev, message: undefined }));
                      }
                    }}
                    placeholder={
                      language === 'fr'
                        ? "Précisez vos objectifs majeurs : volumes cibles, typologie des distributeurs ou partenaires recherchés, contraintes réglementaires ou logistiques déjà identifiées..."
                        : "Describe your core goals: targeted turnover volume, distributor profiles needed, known customs or regulatory hurdles..."
                    }
                    className={`w-full p-3.5 rounded-lg text-xs text-slate-900 focus:outline-none transition-colors ${
                      errors.message
                        ? 'bg-red-50/60 border-2 border-red-500 focus:bg-white'
                        : message.trim().length >= 20
                        ? 'bg-slate-50 border border-emerald-500/80 focus:bg-white'
                        : 'bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white'
                    }`}
                  />
                  {errors.message && (
                    <div className="flex items-center gap-1 text-[11px] text-red-600 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{errors.message}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 4: REVIEW & NDA CONFIRMATION */}
            {currentStep === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{language === 'fr' ? 'Étape 4 : Synthèse de la Mission & Accord de Confidentialité' : 'Step 4: Mission Review & NDA Confirmation'}</span>
                  </div>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                    {language === 'fr' ? 'Vérification avant transmission au Comité de Direction' : 'Final verification before transmission to Partners'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {language === 'fr'
                      ? 'Relisez les éléments renseignés. Vous pouvez modifier chaque section d\'un simple clic avant l\'enregistrement définitif.'
                      : 'Please review the summary below. You can adjust any parameter prior to submission.'}
                  </p>
                </div>

                {/* Recap Banners */}
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-4 text-xs">
                  {/* Section 1 */}
                  <div className="flex items-start justify-between pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">1. Commanditaire & Organisation</span>
                      <strong className="text-sm text-slate-900 font-bold block mt-0.5">{fullName}</strong>
                      <p className="text-slate-600">{roleTitle} • <span className="font-semibold text-slate-800">{company}</span></p>
                      <p className="text-slate-500 font-mono mt-0.5">{email} • {phone}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {language === 'fr' ? 'Modifier' : 'Edit'}
                    </button>
                  </div>

                  {/* Section 2 */}
                  <div className="flex items-start justify-between pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">2. Domaine de la Mission & Modalités</span>
                      <strong className="text-sm text-slate-900 font-bold block mt-0.5">{serviceInterest}</strong>
                      <p className="text-slate-600 mt-0.5">{engagementModel}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {language === 'fr' ? 'Modifier' : 'Edit'}
                    </button>
                  </div>

                  {/* Section 3 */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">3. Périmètre, Budget & Cahier des Charges</span>
                      <p className="text-slate-800"><strong>Territoire :</strong> {country}</p>
                      <p className="text-slate-800"><strong>Enveloppe :</strong> {budgetRange} | <strong>Délai :</strong> {timeline}</p>
                      <div className="p-3 bg-white rounded border border-slate-200 text-slate-700 italic text-[11px] mt-2">
                        "{message}"
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex-shrink-0 ml-2"
                    >
                      {language === 'fr' ? 'Modifier' : 'Edit'}
                    </button>
                  </div>
                </div>

                {/* Confidentiality Commitment / NDA Box */}
                <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
                    <Lock className="w-4 h-4" />
                    <span>{language === 'fr' ? 'Engagement Réciproque de Confidentialité (NDA)' : 'Bilateral Non-Disclosure Commitment (NDA)'}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {language === 'fr'
                      ? 'Toutes les informations stratégiques, financières et techniques soumises par ce formulaire sont strictement couvertes par le secret professionnel et la politique de conformité de Sechel Consulting. Aucun partage tiers n\'est opéré sans accord écrit exprès.'
                      : 'All proprietary data, corporate parameters, and financial targets submitted through this portal are protected by professional non-disclosure protocols and strict regulatory compliance.'}
                  </p>

                  <label className="flex items-start gap-3 pt-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={confidentialityAccepted}
                      onChange={(e) => {
                        setConfidentialityAccepted(e.target.checked);
                        if (errors.confidentialityAccepted) {
                          setErrors(prev => ({ ...prev, confidentialityAccepted: undefined }));
                        }
                      }}
                      className="w-4 h-4 rounded border-slate-600 text-blue-600 focus:ring-blue-500 mt-0.5 cursor-pointer"
                    />
                    <span className="text-xs text-slate-200">
                      {language === 'fr' ? (
                        <>
                          Je certifie l'exactitude des informations fournies et accepte la transmission du dossier sous couvert de l'accord de confidentialité standard Sechel Consulting. *
                        </>
                      ) : (
                        <>
                          I certify the accuracy of the provided dossier and agree to transmission under the Sechel Consulting Non-Disclosure framework. *
                        </>
                      )}
                    </span>
                  </label>
                  {errors.confidentialityAccepted && (
                    <div className="flex items-center gap-1 text-[11px] text-red-400 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{errors.confidentialityAccepted}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Navigation & Submission Bar */}
            <div className="pt-6 border-t border-slate-200 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>{language === 'fr' ? 'Étape précédente' : 'Previous step'}</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <span>{language === 'fr' ? 'Continuer vers l\'étape suivante' : 'Proceed to next step'}</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{language === 'fr' ? 'Chiffrement & Transmission...' : 'Encrypting & Routing...'}</span>
                      </>
                    ) : (
                      <span>{language === 'fr' ? 'Transmettre le Dossier de Cadrage' : 'Submit Mission Dossier'}</span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Footer Security Badges */}
      <div className="bg-slate-50 px-6 sm:px-10 py-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-slate-400" />
            <span>Données Chiffrées TLS 1.3</span>
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-slate-400" />
            <span>Conformité OHADA & RGPD</span>
          </span>
        </div>
        <span className="font-mono text-slate-400">
          Sechel Executive Intake Portal • SLA Réponse 24h
        </span>
      </div>
    </div>
  );
};
