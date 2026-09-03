import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_INFO } from '../../data/initialData';
import {
  Sparkles,
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Clock,
  TrendingUp,
  Cpu,
  Send,
  MessageSquare,
  Copy,
  Check,
  Building2,
  Download,
  FileCode,
  FileText,
  Zap,
  Workflow
} from 'lucide-react';
import { motion } from 'motion/react';

interface AIServiceScopingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

// 8 Rich Industry Sectors with Intelligent Presets
export interface IndustrySectorPreset {
  id: string;
  nameFr: string;
  nameEn: string;
  icon: string;
  taglineFr: string;
  taglineEn: string;
  targetProcesses: string[];
  typicalBottlenecks: string[];
  recommendedTools: string[];
  suggestedTrigger: string;
  suggestedOutputs: string;
  suggestedGoal: string;
  estimatedHours: string;
}

export const INDUSTRY_PRESETS: IndustrySectorPreset[] = [
  {
    id: 'retail_commerce',
    nameFr: 'Commerce, Retail & E-commerce',
    nameEn: 'Retail, Commerce & E-commerce',
    icon: '🛍️',
    taglineFr: 'Ventes WhatsApp, stocks, facturation instantanée & encaissements Mobile Money',
    taglineEn: 'WhatsApp sales, live stock sync, instant invoicing & Mobile Money rails',
    targetProcesses: [
      'Réception commandes WhatsApp & catalogue interactif',
      'Facturation PDF & reçus de vente automatiques',
      'Rapprochement automatique Mobile Money (M-Pesa, Orange, Airtel)',
      'Alerte de rupture de stock & mise à jour inventaire'
    ],
    typicalBottlenecks: [
      'Saisie manuelle des commandes WhatsApp dans Excel',
      'Vérification manuelle des SMS de paiement M-Pesa un par un',
      'Devis et factures envoyés avec plusieurs heures de retard',
      'Erreurs fréquentes d\'écart de stock entre boutiques et dépôt'
    ],
    recommendedTools: ['WhatsApp Business / API', 'Excel / Google Sheets', 'M-Pesa (Vodacom)', 'Orange Money', 'Gmail / Google Workspace'],
    suggestedTrigger: 'Nouveau message ou panier validé sur WhatsApp Business / Web',
    suggestedOutputs: 'Génération facture PDF, décrémentation stock Excel/ERP, confirmation WhatsApp client et notification caisse',
    suggestedGoal: 'Traiter 100% des commandes en moins de 30 secondes, éliminer les erreurs de stock et sécuriser les encaissements.',
    estimatedHours: '20 à 30 heures/semaine'
  },
  {
    id: 'mining_industry',
    nameFr: 'Mines, Sous-traitance & Industrie (B2B)',
    nameEn: 'Mining, Subcontracting & Industry (B2B)',
    icon: '🏗️',
    taglineFr: 'Demandes d\'achats, réquisitions, suivi de bons de commande & conformité ARSP',
    taglineEn: 'Procurement requests, PO tracking, dispatch logs & ARSP compliance',
    targetProcesses: [
      'Circuit de validation hiérarchique des Demandes d\'Achat (PR/PO)',
      'Suivi de conformité réglementaire & agréments ARSP',
      'Traçabilité des bons de livraison sur sites miniers',
      'Contrôle automatique des factures fournisseurs & échéances'
    ],
    typicalBottlenecks: [
      'Bons de commande bloqués en attente de signatures par email',
      'Suivi fastidieux des livraisons physiques sur sites distants (Kolwezi, Likasi)',
      'Risque de non-conformité ARSP sur les sous-traitants',
      'Rapprochement manuel laborieux entre bons de livraison et factures'
    ],
    recommendedTools: ['Outlook / Office 365', 'Odoo ERP', 'Excel / Google Sheets', 'WhatsApp Business / API', 'PostgreSQL / MySQL'],
    suggestedTrigger: 'Dépôt d\'une Demande d\'Achat ou signature d\'un Bon de Livraison',
    suggestedOutputs: 'Routage automatique pour approbation, mise à jour ERP/Sage, alerte logistique et rapport de conformité ARSP',
    suggestedGoal: 'Réduire le cycle d\'approbation des achats de 5 jours à 2 heures et assurer une traçabilité 100% sans faille.',
    estimatedHours: '25 à 40 heures/semaine'
  },
  {
    id: 'logistics_transport',
    nameFr: 'Logistique, Fret & Transport',
    nameEn: 'Logistics, Freight & Fleet Transport',
    icon: '🚛',
    taglineFr: 'Suivi de livraisons en temps réel, lettres de voiture & alertes clients automatiques',
    taglineEn: 'Real-time dispatch tracking, waybill processing & automated client milestones',
    targetProcesses: [
      'Notification automatique de statut d\'expédition par WhatsApp/SMS',
      'Lecture automatique OCR & archivage des Lettres de Voiture (CMR)',
      'Facturation automatique dès validation du bon de livraison',
      'Suivi des passages frontaliers et alertes de retard'
    ],
    typicalBottlenecks: [
      'Clients qui appellent constamment pour savoir où est leur camion/colis',
      'Bordereaux de livraison égarés ou transmis avec plusieurs jours de retard',
      'Décalage de plusieurs semaines entre la livraison et l\'émission de la facture',
      'Saisie manuelle des coûts de carburant et frais de péage'
    ],
    recommendedTools: ['WhatsApp Business / API', 'Google Sheets', 'Gmail / Google Workspace', 'Dolibarr', 'GPS Webhooks'],
    suggestedTrigger: 'Scan de la Lettre de Voiture par le chauffeur ou franchissement de checkpoint GPS',
    suggestedOutputs: 'Mise à jour statut en temps réel, SMS/WhatsApp au destinataire, émission automatique de facture transporteur',
    suggestedGoal: 'Supprimer 80% des appels de suivi client et émettre les factures le jour même de la livraison.',
    estimatedHours: '20 à 35 heures/semaine'
  },
  {
    id: 'solar_energy',
    nameFr: 'Énergie Solaire, Off-Grid & Mini-Grids',
    nameEn: 'Clean Energy, Solar & Off-Grid PAYG',
    icon: '☀️',
    taglineFr: 'Dimensionnement solaire, gestion des paiements échelonnés PAYG & dispatch SAV',
    taglineEn: 'Solar sizing calculators, PAYG recurring collections & maintenance dispatch',
    targetProcesses: [
      'Génération instantanée de devis solaire selon le bilan de puissance',
      'Relance et suivi des paiements échelonnés PAYG (Mobile Money)',
      'Ticket SAV et routage intelligent des techniciens sur le terrain',
      'Synchronisation des numéros de série et garanties des batteries/onduleurs'
    ],
    typicalBottlenecks: [
      'Calcul manuel long des bilans de puissance et propositions techniques',
      'Taux d\'impayés sur les kits solaires vendus à crédit sans relances automatiques',
      'Rapports d\'intervention des installateurs éparpillés sur WhatsApp',
      'Absence de visibilité sur les stocks d\'onduleurs et panneaux solaires'
    ],
    recommendedTools: ['WhatsApp Business / API', 'M-Pesa (Vodacom)', 'Airtel Money', 'HubSpot CRM', 'Google Sheets'],
    suggestedTrigger: 'Formulaire de demande de kit solaire ou échéance mensuelle de paiement PAYG',
    suggestedOutputs: 'Calcul automatique de capacité, envoi devis PDF par WhatsApp, rappel d\'échéance MoMo avec lien de paiement',
    suggestedGoal: 'Automatiser 90% des relances de paiement PAYG et diviser par 4 le temps de réponse aux demandes de devis.',
    estimatedHours: '15 à 30 heures/semaine'
  },
  {
    id: 'health_clinics',
    nameFr: 'Santé, Cliniques & Pharmacies',
    nameEn: 'Healthcare, Clinics & Pharmacies',
    icon: '🏥',
    taglineFr: 'Rendez-vous médicaux, rappels anti-absentéisme, résultats PDF & stocks de médicaments',
    taglineEn: 'Patient appointments, SMS/WhatsApp reminders, lab PDF delivery & pharmacy stock',
    targetProcesses: [
      'Prise de rendez-vous en ligne / WhatsApp 24/7',
      'Rappels automatiques de consultation (SMS/WhatsApp) à J-1 et H-2',
      'Envoi sécurisé des résultats d\'analyses médicales par PDF crypté',
      'Alertes de réapprovisionnement automatique de la pharmacie'
    ],
    typicalBottlenecks: [
      'Fort taux de rendez-vous non honorés (no-show) par manque de rappels',
      'Secrétariat médical débordé par la gestion des créneaux horaires',
      'Distribution papier lente des résultats d\'analyses créant des files d\'attente',
      'Ruptures inattendues de médicaments essentiels'
    ],
    recommendedTools: ['WhatsApp Business / API', 'Google Calendar', 'Gmail / Google Workspace', 'PostgreSQL / MySQL', 'SMS Gateway'],
    suggestedTrigger: 'Demande de consultation WhatsApp ou validation d\'un résultat de laboratoire',
    suggestedOutputs: 'Confirmation d\'agenda, rappel automatique au patient, génération PDF sécurisé et alerte médecin',
    suggestedGoal: 'Réduire le taux d\'absentéisme de 70% et libérer 4 heures par jour au personnel d\'accueil.',
    estimatedHours: '15 à 25 heures/semaine'
  },
  {
    id: 'fintech_finance',
    nameFr: 'FinTech, Microfinance & Services Financiers',
    nameEn: 'FinTech, Microfinance & Financial Services',
    icon: '💳',
    taglineFr: 'Onboarding KYC, analyse de solvabilité, réconciliation multi-opérateurs & recouvrement',
    taglineEn: 'KYC onboarding, credit scoring, multi-operator reconciliation & debt collection',
    targetProcesses: [
      'Rapprochement bancaire & Mobile Money en temps réel (M-Pesa, Orange, MTN, Airtel)',
      'Vérification automatique de pièces d\'identité et KYC client',
      'Relances programmées des échéances de micro-crédits',
      'Génération quotidienne des états financiers et balances de caisse'
    ],
    typicalBottlenecks: [
      'Heures perdues chaque soir à pointer manuellement les relevés de caisse Mobile Money',
      'Dossiers de crédit traités sur papier avec risque de fraude',
      'Relances de recouvrement tardives provoquant des impayés',
      'Erreurs de calcul des intérêts et pénalités'
    ],
    recommendedTools: ['M-Pesa (Vodacom)', 'Orange Money', 'Airtel Money', 'MTN MoMo', 'PostgreSQL / MySQL', 'Excel / Google Sheets'],
    suggestedTrigger: 'Transaction Mobile Money entrante ou échéance de remboursement atteinte',
    suggestedOutputs: 'Rapprochement comptable immédiat, reçu SMS au client, mise à jour solde compte et alerte conformité',
    suggestedGoal: 'Réconciliation financière 100% automatisée sans écart de caisse et recouvrement optimisé.',
    estimatedHours: '25 à 40 heures/semaine'
  },
  {
    id: 'hospitality_events',
    nameFr: 'Hôtellerie, Restauration & Événements',
    nameEn: 'Hospitality, Restaurants & Event Management',
    icon: '🍽️',
    taglineFr: 'Réservations de chambres/tables WhatsApp, acomptes Mobile Money & confirmations',
    taglineEn: 'WhatsApp room/table bookings, Mobile Money deposit confirmation & guest concierge',
    targetProcesses: [
      'Assistant WhatsApp 24/7 pour réservations et menus',
      'Validation automatique des acomptes Mobile Money et émission de voucher QR Code',
      'Message d\'accueil automatisé le jour du check-in',
      'Enquête de satisfaction automatique post-séjour'
    ],
    typicalBottlenecks: [
      'Réservations perdues la nuit ou le week-end faute de réponse rapide',
      'Double réservations (surbooking) gérées sur des cahiers papiers',
      'Difficulté à vérifier si l\'acompte a bien été versé avant de bloquer la chambre',
      'Aucun suivi des avis clients après leur passage'
    ],
    recommendedTools: ['WhatsApp Business / API', 'Google Calendar', 'M-Pesa (Vodacom)', 'Orange Money', 'Google Sheets'],
    suggestedTrigger: 'Demande de disponibilité sur WhatsApp ou paiement d\'acompte reçu',
    suggestedOutputs: 'Mise à jour du planning de réservation, confirmation instantanée avec QR Code et notification réception',
    suggestedGoal: 'Transformer 80% des demandes nocturnes en réservations confirmées et supprimer le surbooking.',
    estimatedHours: '15 à 25 heures/semaine'
  },
  {
    id: 'education_ngo',
    nameFr: 'Éducation, Formations, ONG & Projets Bailleurs',
    nameEn: 'Education, NGOs, Grants & Donor Programs',
    icon: '🎓',
    taglineFr: 'Inscriptions d\'apprenants, suivi d\'indicateurs bailleurs, attestations & reporting',
    taglineEn: 'Student registrations, donor KPI tracking, certificate generation & field reporting',
    targetProcesses: [
      'Formulaire d\'inscription & génération automatique d\'attestations PDF',
      'Consolidation automatique des données d\'impact de terrain (USAID, Bailleurs)',
      'Suivi des présences et rappels d\'échéances de bourses',
      'Génération automatique de rapports d\'étape pour les bailleurs de fonds'
    ],
    typicalBottlenecks: [
      'Collecte chaotique de fiches de présence et rapports terrain sur papier',
      'Des semaines entières passées à compiler les tableaux pour les rapports bailleurs',
      'Génération manuelle fastidieuse des attestations et diplômes un par un',
      'Retards dans le suivi des justificatifs de dépenses de projets'
    ],
    recommendedTools: ['Google Forms / KoboToolbox', 'Google Sheets', 'Notion / Airtable', 'Gmail / Google Workspace', 'WhatsApp Business / API'],
    suggestedTrigger: 'Soumission d\'un formulaire terrain ou fin d\'une session de formation',
    suggestedOutputs: 'Consolidation sur base centrale, génération certificat PDF, email aux participants et export bailleur',
    suggestedGoal: 'Diviser par 5 le temps de production des rapports bailleurs et automatiser 100% des attestations.',
    estimatedHours: '15 à 30 heures/semaine'
  }
];

export const TOOL_CATEGORIES = [
  {
    category: '💬 Communication & WhatsApp',
    tools: ['WhatsApp Business / API', 'Gmail / Google Workspace', 'Outlook / Office 365', 'Telegram API', 'SMS Gateway']
  },
  {
    category: '📊 Tableurs & Bases de Données',
    tools: ['Excel / Google Sheets', 'Notion / Airtable', 'PostgreSQL / MySQL', 'KoboToolbox / Forms']
  },
  {
    category: '🏢 CRM & Logiciels de Gestion (ERP)',
    tools: ['Odoo ERP', 'HubSpot CRM', 'Salesforce', 'Pipedrive', 'Sage / QuickBooks', 'Dolibarr']
  },
  {
    category: '💳 Paiements & Mobile Money',
    tools: ['M-Pesa (Vodacom)', 'Orange Money', 'Airtel Money', 'MTN MoMo', 'Passerelle Bancaire / POS']
  }
];

export const AIServiceScopingModal: React.FC<AIServiceScopingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId
}) => {
  const { language, services, addContactSubmission } = useApp();

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || 'workflow-automation-n8n'
  );

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedSectorId, setSelectedSectorId] = useState<string>('retail_commerce');

  // Intelligent Form State
  const [formData, setFormData] = useState({
    // Step 1: Profile
    companyName: '',
    contactName: '',
    roleTitle: '',
    email: '',
    phone: '',
    country: 'RDC (Kinshasa / Lubumbashi)',
    teamSize: '5 - 25 personnes',
    industry: 'Commerce, Retail & E-commerce',

    // Step 2: As-Is Processes & Pain Points
    targetProcesses: INDUSTRY_PRESETS[0].targetProcesses,
    dailyVolume: '15 à 50 dossiers / transactions par jour',
    weeklyHoursLost: '15 à 25 heures/semaine',
    painPoints: INDUSTRY_PRESETS[0].typicalBottlenecks[0] + '. ' + INDUSTRY_PRESETS[0].typicalBottlenecks[1],

    // Step 3: Ecosystem & Triggers
    toolsList: INDUSTRY_PRESETS[0].recommendedTools,
    customTools: '',
    mainTrigger: INDUSTRY_PRESETS[0].suggestedTrigger,
    outputDestinations: INDUSTRY_PRESETS[0].suggestedOutputs,

    // Step 4: To-Be Specs & Engagement
    hostingPreference: 'n8n Cloud / VPS Dédié sécurisé (Recommandé par Sechel)',
    aiIntegrationPreference: 'Agent conversationnel WhatsApp 24/7 + Extraction automatique de factures',
    goals: INDUSTRY_PRESETS[0].suggestedGoal,
    budgetRange: '3 000 $ - 10 000 $ USD',
    timeline: 'Sous 30 à 60 jours'
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [workflowJson, setWorkflowJson] = useState<string | null>(null);
  const [reportStats, setReportStats] = useState<{
    hoursSaved?: string;
    roiDays?: string;
    stack?: string[];
  }>({});
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState<'report' | 'json'>('report');

  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
    }
  }, [initialServiceId]);

  if (!isOpen) return null;

  const currentService = services.find((s) => s.id === selectedServiceId) || services[0];
  const activePreset = INDUSTRY_PRESETS.find((p) => p.id === selectedSectorId) || INDUSTRY_PRESETS[0];

  // Apply Industry Preset smoothly
  const handleSelectIndustryPreset = (preset: IndustrySectorPreset) => {
    setSelectedSectorId(preset.id);
    setFormData((prev) => ({
      ...prev,
      industry: language === 'fr' ? preset.nameFr : preset.nameEn,
      targetProcesses: preset.targetProcesses,
      toolsList: preset.recommendedTools,
      painPoints: preset.typicalBottlenecks.slice(0, 2).join('. ') + '.',
      mainTrigger: preset.suggestedTrigger,
      outputDestinations: preset.suggestedOutputs,
      goals: preset.suggestedGoal,
      weeklyHoursLost: preset.estimatedHours
    }));
  };

  const toggleProcess = (label: string) => {
    setFormData((prev) => {
      const exists = prev.targetProcesses.includes(label);
      if (exists) {
        return { ...prev, targetProcesses: prev.targetProcesses.filter((p) => p !== label) };
      } else {
        return { ...prev, targetProcesses: [...prev.targetProcesses, label] };
      }
    });
  };

  const toggleTool = (tool: string) => {
    setFormData((prev) => {
      const exists = prev.toolsList.includes(tool);
      if (exists) {
        return { ...prev, toolsList: prev.toolsList.filter((t) => t !== tool) };
      } else {
        return { ...prev, toolsList: [...prev.toolsList, tool] };
      }
    });
  };

  // Live ROI Calculations
  const parseHours = (str: string) => {
    if (str.includes('40')) return 40;
    if (str.includes('25')) return 25;
    if (str.includes('15')) return 20;
    return 10;
  };
  const weeklyHoursNum = parseHours(formData.weeklyHoursLost);
  const annualHoursLost = weeklyHoursNum * 52;
  const annualDaysLost = Math.round(annualHoursLost / 8);
  const estimatedAnnualCost = Math.round(annualHoursLost * 8.5); // Average hourly productivity cost in USD

  const handleGenerateScoping = async () => {
    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/gemini/scoping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: currentService.id,
          serviceTitle: currentService.title[language],
          companyName: formData.companyName,
          contactName: formData.contactName,
          roleTitle: formData.roleTitle,
          country: formData.country,
          teamSize: formData.teamSize,
          industry: formData.industry,
          targetProcesses: formData.targetProcesses,
          toolsList: formData.toolsList,
          dailyVolume: formData.dailyVolume,
          weeklyHoursLost: formData.weeklyHoursLost,
          currentTools: formData.toolsList.join(', ') + (formData.customTools ? `, ${formData.customTools}` : ''),
          painPoints: formData.painPoints,
          mainTrigger: formData.mainTrigger,
          outputDestinations: formData.outputDestinations,
          hostingPreference: formData.hostingPreference,
          aiIntegrationPreference: formData.aiIntegrationPreference,
          goals: formData.goals,
          budgetRange: formData.budgetRange,
          timeline: formData.timeline,
          language
        })
      });

      const data = await response.json();
      if (data.report) {
        setAiReport(data.report);
        setWorkflowJson(data.workflowSchemaJson || null);
        setReportStats({
          hoursSaved: data.estimatedHoursSaved || formData.weeklyHoursLost || '20h/semaine',
          roiDays: data.estimatedRoiDays || '45 jours',
          stack: data.recommendedStack || ['n8n Engine', 'APIs & Webhooks', 'CRM/ERP Sync', 'WhatsApp API', 'Mobile Money Rails']
        });
        setCurrentStep(5);
      } else {
        throw new Error(data.error || 'Erreur lors de la génération');
      }
    } catch (err: any) {
      console.warn('Fallback scoping active:', err);
      // Fallback structured proposal
      const fallbackText = language === 'fr'
        ? `### 📋 1. FICHE SYNTHÈSE DU PROJET & OBJECTIFS D'AUTOMATISATION
Pour **${formData.companyName || 'votre entreprise'}** (${formData.country} • Secteur ${formData.industry}), ce dossier de cadrage conçu par l'équipe d'ingénierie de **Sechel Consulting** structure le déploiement d'une architecture d'automatisation n8n robuste reliant l'ensemble de vos outils métiers (${formData.toolsList.join(', ')}).

---

### 🔍 2. CARTOGRAPHIE AS-IS (Processus Actuel & Pertes Mesurées)
- **Flux actuels identifiés :** ${formData.targetProcesses.join(', ')}.
- **Goulots d'étranglement critiques :** ${formData.painPoints}.
- **Pertes humaines mesurées :** Environ **${formData.weeklyHoursLost}** gaspillées en ressaisies manuelles (soit **${annualHoursLost} heures/an** ou **${annualDaysLost} jours ouvrés perdus** par an).
- **Risques opérationnels :** Retards de facturation, doublons, perte de traçabilité des paiements Mobile Money.

---

### ⚙️ 3. SPÉCIFICATIONS TECHNIQUES DU MAPPING TO-BE (Architecture n8n)
1. **Nœud Déclencheur (Trigger Node) :**
   * *Type :* ${formData.mainTrigger} (Webhook temps réel / Polling API).
2. **Nœuds de Normalisation & Logique Métier :**
   * Validation automatique des champs de données entrants.
   * Règles de calcul de remises, TVA et vérification de stock temps réel.
   * Filtres conditionnels (Switch/If) pour router les dossiers prioritaires.
3. **Nœuds d'Intégration & Connecteurs :**
   * **CRM / ERP :** Mise à jour instantanée des fiches clients et statut des commandes.
   * **Passerelle Mobile Money :** Rapprochement automatique des encaissements M-Pesa / Orange Money / Airtel.
   * **Génération Documentaire :** Création immédiate de devis et factures PDF aux normes légales.
   * **Actions de Sortie (Outputs) :** ${formData.outputDestinations}.
4. **Gestion de Sécurité & Robustesse :**
   * Nœud n8n *Error Trigger* avec alerte immédiate en cas d'anomalie réseau.
   * Chiffrement sécurisé des clés d'API et journaux d'audit.

---

### 📊 4. GAINS MESURABLES & ANALYSE DE RENTABILITÉ (ROI)
- **Temps restitué à vos équipes :** **${formData.weeklyHoursLost}** (équivalent à ~${estimatedAnnualCost} $ de gain de productivité annuelle).
- **Fiabilité opérationnelle :** 99.8% d'élimination des erreurs humaines de saisie.
- **Réactivité commerciale :** Réponses et devis émis en moins de 15 secondes 24h/24.
- **Délai d'amortissement (ROI) :** Rentabilité nette atteinte en **moins de 45 jours**.

---

### 🗺️ 5. FEUILLE DE ROUTE DE DÉPLOIEMENT SECHEL (4 Semaines)
- **Semaine 1 (Cadrage & Préparation) :** Cartographie fine des données, validation des accès API et configuration de l'instance n8n dédiée.
- **Semaine 2 (Développement des Workflows) :** Assemblage des nœuds n8n, règles de gestion métier et synchronisation bidirectionnelle.
- **Semaine 3 (Raccordement Mobile Money & Tests) :** Intégration des webhooks réels et tests d'étanchéité sous forte charge.
- **Semaine 4 (Recette, Mise en Production & Formation) :** Déploiement opérationnel, formation des utilisateurs et remise de la documentation technique.`
        : `### 📋 1. EXECUTIVE SUMMARY & AUTOMATION OBJECTIVES
For **${formData.companyName || 'your enterprise'}** (${formData.country} • ${formData.industry}), this blueprint by **Sechel Consulting** deploys a secure n8n automation engine connecting your software stack (${formData.toolsList.join(', ')}).

---

### 🔍 2. AS-IS AUDIT & MEASURED BOTTLENECK LOSSES
- **Target Processes :** ${formData.targetProcesses.join(', ')}.
- **Friction Points :** ${formData.painPoints}.
- **Labor Waste :** Estimated **${formData.weeklyHoursLost}** (~${annualHoursLost} hours/year).

---

### ⚙️ 3. TO-BE TECHNICAL SPECIFICATIONS (n8n Engine)
- **Trigger :** ${formData.mainTrigger}.
- **Business Logic :** Real-time data parsing, duplicate prevention, automated tax/pricing calculation.
- **Integrations :** CRM/ERP synchronization, Mobile Money rails, instant PDF generation, WhatsApp output alerts.

---

### 📊 4. MEASURED GAINS & ROI
- **Time Saved :** **${formData.weeklyHoursLost}** recovered.
- **Error Reduction :** 99.8% manual data entry error elimination.
- **Payback Period :** Positive ROI within **45 days**.`;

      setAiReport(fallbackText);
      setWorkflowJson(
        JSON.stringify(
          {
            name: `Sechel_${(formData.companyName || 'Client').replace(/[^a-zA-Z0-9]/g, '_')}_Workflow`,
            nodes: [
              {
                id: '1',
                name: `Trigger : ${formData.mainTrigger.slice(0, 30)}`,
                type: 'n8n-nodes-base.webhook',
                parameters: { httpMethod: 'POST', path: 'incoming-event' },
                position: [250, 300]
              },
              {
                id: '2',
                name: 'Data Parser & Business Logic',
                type: 'n8n-nodes-base.switch',
                parameters: { mode: 'rules' },
                position: [450, 300]
              },
              {
                id: '3',
                name: 'CRM / ERP Synchronization',
                type: 'n8n-nodes-base.httpRequest',
                parameters: { method: 'POST', url: 'https://api.erp.local/sync' },
                position: [680, 200]
              },
              {
                id: '4',
                name: 'Mobile Money Rails & PDF Gen',
                type: 'n8n-nodes-base.httpRequest',
                parameters: { method: 'POST', url: 'https://api.payment.local/verify' },
                position: [680, 400]
              },
              {
                id: '5',
                name: 'WhatsApp / Output Dispatcher',
                type: 'n8n-nodes-base.httpRequest',
                parameters: { method: 'POST', url: 'https://api.whatsapp.local/send' },
                position: [920, 300]
              },
              {
                id: '6',
                name: 'Error Handling Sentinel',
                type: 'n8n-nodes-base.errorTrigger',
                position: [920, 500]
              }
            ],
            connections: {
              [`Trigger : ${formData.mainTrigger.slice(0, 30)}`]: {
                main: [[{ node: 'Data Parser & Business Logic', type: 'main', index: 0 }]]
              },
              'Data Parser & Business Logic': {
                main: [
                  [{ node: 'CRM / ERP Synchronization', type: 'main', index: 0 }],
                  [{ node: 'Mobile Money Rails & PDF Gen', type: 'main', index: 0 }]
                ]
              },
              'CRM / ERP Synchronization': {
                main: [[{ node: 'WhatsApp / Output Dispatcher', type: 'main', index: 0 }]]
              },
              'Mobile Money Rails & PDF Gen': {
                main: [[{ node: 'WhatsApp / Output Dispatcher', type: 'main', index: 0 }]]
              }
            }
          },
          null,
          2
        )
      );
      setReportStats({
        hoursSaved: formData.weeklyHoursLost || '20h/semaine',
        roiDays: '45 jours',
        stack: ['n8n Engine', 'REST APIs', 'CRM/ERP Sync', 'WhatsApp API', 'Mobile Money Rails']
      });
      setCurrentStep(5);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendToSechelTeam = () => {
    addContactSubmission({
      fullName: formData.contactName || formData.companyName || 'Prospect Cadrage Automatisation',
      email: formData.email || 'contact@client.com',
      phone: formData.phone || 'Non renseigné',
      company: formData.companyName || 'Structure Privée',
      country: formData.country,
      serviceInterest: `[CADRAGE AUTOMATISATION n8n] ${formData.industry}`,
      budgetRange: formData.budgetRange,
      timeline: formData.timeline,
      roleTitle: formData.roleTitle,
      isAutomationMapping: true,
      mappingDossier: {
        companyName: formData.companyName,
        contactName: formData.contactName,
        roleTitle: formData.roleTitle,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        industry: formData.industry,
        teamSize: formData.teamSize,
        targetProcesses: formData.targetProcesses,
        toolsList: formData.toolsList,
        dailyVolume: formData.dailyVolume,
        weeklyHoursLost: formData.weeklyHoursLost,
        painPoints: formData.painPoints,
        mainTrigger: formData.mainTrigger,
        outputDestinations: formData.outputDestinations,
        hostingPreference: formData.hostingPreference,
        aiIntegrationPreference: formData.aiIntegrationPreference,
        goals: formData.goals,
        generatedReport: aiReport || ''
      },
      message: `Dossier de Cadrage d'Automatisation généré pour ${formData.companyName || 'notre entreprise'}.\nSecteur: ${formData.industry}\nGain estimé: ${formData.weeklyHoursLost}\nOutils: ${formData.toolsList.join(', ')}\nDéclencheur: ${formData.mainTrigger}`
    });

    setIsSubmitted(true);
  };

  const handleCopyReport = () => {
    if (!aiReport) return;
    navigator.clipboard.writeText(aiReport);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadDossier = () => {
    if (!aiReport) return;
    const blob = new Blob([aiReport], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sechel_Cadrage_Automatisation_${(formData.companyName || 'Entreprise').replace(/\s+/g, '_')}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadWorkflowJson = () => {
    if (!workflowJson) return;
    const blob = new Blob([workflowJson], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `n8n_workflow_${(formData.companyName || 'blueprint').toLowerCase().replace(/\s+/g, '_')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const rawWhatsApp = COMPANY_INFO.contacts.whatsapp.replace(/[^0-9]/g, '');
  const whatsappDossierUrl = `https://wa.me/${rawWhatsApp}?text=${encodeURIComponent(
    `Bonjour Sechel Consulting, nous avons complété notre Cadrage d'Automatisation pour *${formData.companyName || 'notre entreprise'}* (${formData.industry}).\n\n📌 *Objectif :* ${formData.goals}\n⏱️ *Temps à récupérer :* ${formData.weeklyHoursLost}\n⚙️ *Déclencheur :* ${formData.mainTrigger}\n\nNous souhaitons planifier un échange avec un consultant senior pour la mise en œuvre.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0B1528] via-[#111F3C] to-[#0B1528] text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800 relative overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-radial-gradient from-blue-600/10 via-transparent to-transparent pointer-events-none" />

          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg border border-blue-400/30 flex-shrink-0">
              <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
            </div>

            <div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-400 mb-0.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pôle Automatisation & Systèmes n8n • Sechel Consulting</span>
              </div>
              <h3 className="font-serif-display text-base sm:text-xl font-bold text-white leading-tight">
                {language === 'fr'
                  ? 'Parcours Intelligent de Cadrage & Mapping de Workflow'
                  : 'Smart Workflow Automation Scoping & Intake Journey'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors relative z-10"
            title="Fermer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Multi-Step Stepper Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-3 sm:px-6 py-2.5 flex items-center justify-between text-xs overflow-x-auto flex-shrink-0">
          <div className="flex items-center gap-1 sm:gap-2 min-w-max">
            {[
              { num: 1, title: '1. Domaine & Profil' },
              { num: 2, title: '2. Audit As-Is & Pertes' },
              { num: 3, title: '3. Connecteurs & Triggers' },
              { num: 4, title: '4. Simulation To-Be' },
              { num: 5, title: '5. Dossier & Blueprint n8n' }
            ].map((step) => {
              const isActive = currentStep === step.num;
              const isPassed = currentStep > step.num;
              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => {
                    if (step.num <= 4 || aiReport) {
                      setCurrentStep(step.num);
                    }
                  }}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : isPassed
                      ? 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                      isActive ? 'bg-white text-blue-600' : isPassed ? 'bg-blue-200 text-blue-900' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isPassed ? '✓' : step.num}
                  </span>
                  <span className="hidden sm:inline">{step.title}</span>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] font-bold text-slate-500 hidden md:block">
            {currentStep < 5 ? `Étape ${currentStep} sur 4` : '✅ Dossier Prêt'}
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-grow">
          {/* STEP 1: Industry Selector & Company Profile */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-serif-display text-lg font-bold text-slate-900">
                    Étape 1 : Choisissez votre Domaine d'Activité
                  </h4>
                  <span className="text-xs text-blue-600 font-bold hidden sm:inline">
                    💡 Sélection intelligente avec préréglages automatiques
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Cliquez sur votre secteur pour pré-configurer automatiquement les flux, goulots et connecteurs typiques.
                </p>
              </div>

              {/* 8 Industry Bento Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {INDUSTRY_PRESETS.map((preset) => {
                  const isSelected = selectedSectorId === preset.id;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectIndustryPreset(preset)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-blue-50/90 border-blue-600 ring-2 ring-blue-600/30 shadow-sm'
                          : 'bg-white hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-2xl">{preset.icon}</span>
                          {isSelected && (
                            <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white text-[9px] font-bold uppercase">
                              Actif
                            </span>
                          )}
                        </div>
                        <h5 className="font-bold text-xs text-slate-900 leading-tight mb-1">
                          {language === 'fr' ? preset.nameFr : preset.nameEn}
                        </h5>
                        <p className="text-[10px] text-slate-500 leading-snug line-clamp-2">
                          {language === 'fr' ? preset.taglineFr : preset.taglineEn}
                        </p>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                        <span className="text-amber-700 font-semibold flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-500" />
                          {preset.estimatedHours}
                        </span>
                        <span className="text-blue-600 font-bold hover:underline">
                          Appliquer →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Profile Details Form */}
              <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 space-y-4">
                <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>Coordonnées de l'Entreprise & du Porteur de Projet</span>
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Nom de l'entreprise * :
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ex: Katanga Retail SAS / Congo Logistics"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none bg-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Nom & Prénom du responsable :
                    </label>
                    <input
                      type="text"
                      placeholder="ex: Patrick Mulumba (Directeur Ops)"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none bg-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Téléphone / WhatsApp direct * :
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+243 854 532 239"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Email professionnel :
                    </label>
                    <input
                      type="email"
                      placeholder="contact@entreprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Pays & Villes d'opération :
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Taille de l'équipe :
                    </label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none bg-white"
                    >
                      <option value="1 - 5 personnes">1 - 5 personnes (Équipe restreinte)</option>
                      <option value="5 - 25 personnes">5 - 25 personnes (PME opérationnelle)</option>
                      <option value="25 - 100 personnes">25 - 100 personnes (Moyenne entreprise)</option>
                      <option value="100+ personnes">100+ personnes (Grande structure)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>Suivant : Audit As-Is & Pertes</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: As-Is Audit, Target Processes & Live Loss Calculator */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-5"
            >
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <h4 className="font-serif-display text-lg font-bold text-slate-900">
                    Étape 2 : Processus Actuels (As-Is) & Diagnostic des Goulots
                  </h4>
                  <p className="text-xs text-slate-600">
                    Sélectionnez les flux à automatiser pour votre secteur : <span className="font-bold text-blue-700">{formData.industry}</span>.
                  </p>
                </div>
                <span className="text-xl hidden sm:block">{activePreset.icon}</span>
              </div>

              {/* Target Processes Multi-Check */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  1. Processus prioritaires ciblés pour l'automatisation :
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activePreset.targetProcesses.map((proc, idx) => {
                    const isChecked = formData.targetProcesses.includes(proc);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleProcess(proc)}
                        className={`p-3 rounded-xl text-left border transition-all text-xs flex items-start gap-2.5 ${
                          isChecked
                            ? 'bg-blue-50/90 border-blue-600 text-blue-950 font-bold ring-1 ring-blue-600 shadow-2xs'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="leading-snug">{proc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Loss & ROI Calculator Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/90 via-slate-900 to-indigo-950 text-white border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Calculateur d'Impact & Gaspillage Opérationnel
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-300 bg-white/10 px-2 py-0.5 rounded">
                    Temps & Coûts Récupérables
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-center">
                  <div className="bg-white/5 p-2.5 rounded-lg border border-white/10">
                    <div className="text-xs text-slate-300">Temps perdu / an</div>
                    <div className="text-lg font-bold text-amber-300 font-mono">
                      {annualHoursLost} heures
                    </div>
                    <div className="text-[10px] text-slate-400">soit ~{annualDaysLost} jours ouvrés</div>
                  </div>

                  <div className="bg-white/5 p-2.5 rounded-lg border border-white/10">
                    <div className="text-xs text-slate-300">Coût salarial improductif</div>
                    <div className="text-lg font-bold text-emerald-400 font-mono">
                      ~{estimatedAnnualCost.toLocaleString()} $ USD
                    </div>
                    <div className="text-[10px] text-slate-400">récupérable par l'automatisation</div>
                  </div>

                  <div className="bg-white/5 p-2.5 rounded-lg border border-white/10">
                    <div className="text-xs text-slate-300">Taux d'erreur manuel</div>
                    <div className="text-lg font-bold text-blue-300 font-mono">
                      0 % visé
                    </div>
                    <div className="text-[10px] text-slate-400">au lieu de 5 à 12% actuel</div>
                  </div>
                </div>
              </div>

              {/* Typical Bottlenecks Suggestion Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    2. Goulots d'étranglement & Frictions constatées :
                  </label>
                  <span className="text-[10px] text-blue-600 font-semibold">
                    💡 Cliquez pour ajouter une friction typique
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-2">
                  {activePreset.typicalBottlenecks.map((bottleneck, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (!formData.painPoints.includes(bottleneck)) {
                          setFormData((prev) => ({
                            ...prev,
                            painPoints: prev.painPoints ? `${prev.painPoints} ${bottleneck}.` : `${bottleneck}.`
                          }));
                        }
                      }}
                      className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-[11px] font-medium border border-amber-200 transition-colors flex items-center gap-1 text-left cursor-pointer"
                    >
                      <span>+ {bottleneck}</span>
                    </button>
                  ))}
                </div>

                <textarea
                  rows={2}
                  value={formData.painPoints}
                  onChange={(e) => setFormData({ ...formData, painPoints: e.target.value })}
                  placeholder="Décrivez les frictions manuelles précises de votre équipe..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none bg-white resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Précédent</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>Suivant : Connecteurs & Triggers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Tools & Connectors Ecosystem & Triggers */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-5"
            >
              <div className="border-b border-slate-200 pb-3">
                <h4 className="font-serif-display text-lg font-bold text-slate-900">
                  Étape 3 : Écosystème d'Outils, Connecteurs & Déclencheurs (Triggers)
                </h4>
                <p className="text-xs text-slate-600">
                  Sélectionnez tous les logiciels que le moteur n8n interconnectera sans ressaisie.
                </p>
              </div>

              {/* Categorized Tools Palette */}
              <div className="space-y-3">
                {TOOL_CATEGORIES.map((cat, cIdx) => (
                  <div key={cIdx} className="space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      {cat.category}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.tools.map((tool) => {
                        const isSelected = formData.toolsList.includes(tool);
                        return (
                          <button
                            key={tool}
                            type="button"
                            onClick={() => toggleTool(tool)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                              isSelected
                                ? 'bg-blue-600 border-blue-600 text-white shadow-2xs'
                                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            <span>{tool}</span>
                            {isSelected ? <Check className="w-3 h-3" /> : <span className="text-slate-400 text-[10px]">+</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Trigger & Output interactive fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                  <label className="block text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>1. Déclencheur Principal (Trigger) :</span>
                  </label>
                  <input
                    type="text"
                    value={formData.mainTrigger}
                    onChange={(e) => setFormData({ ...formData, mainTrigger: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none bg-white font-medium"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    Événement qui lance le scénario (message WhatsApp, commande web, reçu Mobile Money).
                  </span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                  <label className="block text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>2. Actions & Destinations de Sortie (Outputs) :</span>
                  </label>
                  <input
                    type="text"
                    value={formData.outputDestinations}
                    onChange={(e) => setFormData({ ...formData, outputDestinations: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none bg-white font-medium"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    Où les données doivent être envoyées (Facture PDF, CRM/ERP, reçu WhatsApp).
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Précédent</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>Suivant : Simulation To-Be & Déploiement</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Live Architecture Simulator & Launch Generation */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-5"
            >
              <div className="border-b border-slate-200 pb-3">
                <h4 className="font-serif-display text-lg font-bold text-slate-900">
                  Étape 4 : Simulation du Workflow Cible (To-Be) & Paramètres
                </h4>
                <p className="text-xs text-slate-600">
                  Visualisez l'architecture logique qui sera générée pour <span className="font-bold text-blue-700">{formData.companyName || 'votre entreprise'}</span>.
                </p>
              </div>

              {/* Interactive Live Workflow Visual Diagram */}
              <div className="p-4 rounded-xl bg-slate-900 text-white border border-blue-500/30 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Workflow className="w-4 h-4" />
                    <span>Aperçu de la Chaîne d'Automatisation</span>
                  </span>
                  <span className="text-[10px] text-slate-400 bg-white/10 px-2 py-0.5 rounded">
                    Flux continu 24h/24
                  </span>
                </div>

                {/* Workflow Horizontal Node Chain */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-blue-950/80 p-3 rounded-lg border border-blue-600/50 space-y-1">
                    <div className="text-[10px] font-bold text-amber-400 uppercase">1. Trigger</div>
                    <div className="font-bold text-white leading-tight text-[11px]">
                      {formData.mainTrigger.slice(0, 35)}...
                    </div>
                    <div className="text-[9px] text-slate-400">Webhook instantané</div>
                  </div>

                  <div className="bg-indigo-950/80 p-3 rounded-lg border border-indigo-600/50 space-y-1">
                    <div className="text-[10px] font-bold text-indigo-300 uppercase">2. Logique Métier</div>
                    <div className="font-bold text-white leading-tight text-[11px]">
                      Parsing, Calculs & Validation
                    </div>
                    <div className="text-[9px] text-slate-400">Zéro ressaisie humaine</div>
                  </div>

                  <div className="bg-purple-950/80 p-3 rounded-lg border border-purple-600/50 space-y-1">
                    <div className="text-[10px] font-bold text-purple-300 uppercase">3. Connecteurs</div>
                    <div className="font-bold text-white leading-tight text-[11px]">
                      {formData.toolsList.slice(0, 2).join(' + ')}
                    </div>
                    <div className="text-[9px] text-slate-400">Sync bidirectionnelle</div>
                  </div>

                  <div className="bg-emerald-950/80 p-3 rounded-lg border border-emerald-600/50 space-y-1">
                    <div className="text-[10px] font-bold text-emerald-300 uppercase">4. Actions</div>
                    <div className="font-bold text-white leading-tight text-[11px]">
                      Facture PDF, Reçu & Alerte
                    </div>
                    <div className="text-[9px] text-slate-400">Exécution en &lt;10s</div>
                  </div>
                </div>
              </div>

              {/* Hosting & Budget selections */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mode d'hébergement & Infrastructure :
                  </label>
                  <select
                    value={formData.hostingPreference}
                    onChange={(e) => setFormData({ ...formData, hostingPreference: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none bg-white font-medium"
                  >
                    <option value="Cloud Sécurisé & Haute Disponibilité (Recommandé par Sechel)">
                      Cloud Sécurisé & Haute Disponibilité (Recommandé par Sechel)
                    </option>
                    <option value="Auto-hébergé sur serveur privé interne (Souveraineté 100%)">
                      Auto-hébergé sur serveur privé interne (Souveraineté 100%)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Budget d'investissement envisagé :
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none bg-white font-medium"
                  >
                    <option value="Moins de 3 000 $ USD">&lt; 3 000 $ USD (Projet pilote ciblé)</option>
                    <option value="3 000 $ - 10 000 $ USD">3 000 $ - 10 000 $ USD (Déploiement complet standard)</option>
                    <option value="10 000 $ - 30 000 $ USD">10 000 $ - 30 000 $ USD (Multi-systèmes / ERP & Automatisation avancée)</option>
                    <option value="Plus de 30 000 $ USD">30 000 $ USD + (Transformation globale)</option>
                  </select>
                </div>
              </div>

              {/* Ready to generate action banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-blue-500/30">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>Prêt pour la Génération du Dossier Stratégique & Schéma</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Le moteur Sechel va compiler l'audit As-Is, l'architecture des flux, le schéma technique et le ROI estimé.
                  </p>
                </div>

                <button
                  type="button"
                  disabled={isAnalyzing}
                  onClick={handleGenerateScoping}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 flex-shrink-0 cursor-pointer"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                      <span>Compilation du Dossier...</span>
                    </>
                  ) : (
                    <>
                      <Workflow className="w-4 h-4" />
                      <span>Générer le Dossier & Schéma Commercial</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-2 flex items-center justify-start">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Précédent</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: Complete Deliverable Dossier, JSON Blueprint & Actions */}
          {currentStep === 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              {/* Success Banner */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Dossier de Cadrage & Blueprint n8n généré avec succès pour {formData.companyName || 'votre entreprise'} !</span>
                </div>
                <span className="text-[10px] bg-emerald-200/80 px-2 py-0.5 rounded font-mono font-bold text-emerald-900">
                  Prêt pour la production
                </span>
              </div>

              {/* KPI Summary Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Temps Économisé</div>
                  <div className="text-sm font-bold text-blue-700 font-mono">
                    {reportStats.hoursSaved || formData.weeklyHoursLost}
                  </div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Amortissement ROI</div>
                  <div className="text-sm font-bold text-emerald-600 font-mono">
                    {reportStats.roiDays || '45 jours'}
                  </div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Moteur n8n</div>
                  <div className="text-sm font-bold text-indigo-600 font-mono">
                    Standard Sechel
                  </div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-center">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Taux d'Erreur</div>
                  <div className="text-sm font-bold text-slate-800 font-mono">
                    &lt; 0.2 %
                  </div>
                </div>
              </div>

              {/* Tabs for Deliverables */}
              <div className="flex border-b border-slate-200 gap-2 text-xs font-bold">
                <button
                  onClick={() => setActiveResultTab('report')}
                  className={`pb-2 px-3 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeResultTab === 'report'
                      ? 'border-blue-600 text-blue-700'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Dossier de Cadrage Stratégique</span>
                </button>

                <button
                  onClick={() => setActiveResultTab('json')}
                  className={`pb-2 px-3 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeResultTab === 'json'
                      ? 'border-blue-600 text-blue-700'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Schéma Technique n8n (JSON Blueprint)</span>
                </button>
              </div>

              {/* Tab 1: Structured Report */}
              {activeResultTab === 'report' && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-h-[340px] overflow-y-auto font-sans text-xs text-slate-800 space-y-3 leading-relaxed">
                  <div className="whitespace-pre-wrap font-sans">
                    {aiReport}
                  </div>
                </div>
              )}

              {/* Tab 2: JSON Blueprint */}
              {activeResultTab === 'json' && (
                <div className="relative">
                  <pre className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[11px] max-h-[340px] overflow-y-auto overflow-x-auto border border-slate-800">
                    {workflowJson || '// Schéma en cours de compilation'}
                  </pre>
                  <button
                    onClick={handleDownloadWorkflowJson}
                    className="absolute top-3 right-3 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold flex items-center gap-1 border border-slate-700 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>Télécharger JSON</span>
                  </button>
                </div>
              )}

              {/* Action Toolbar */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyReport}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copié !' : 'Copier le Dossier'}</span>
                  </button>

                  <button
                    onClick={handleDownloadDossier}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Télécharger (.md)</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={whatsappDossierUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Échanger sur WhatsApp ({COMPANY_INFO.contacts.whatsapp})</span>
                  </a>

                  <button
                    onClick={handleSendToSechelTeam}
                    disabled={isSubmitted}
                    className={`px-4 py-2 rounded-xl font-bold text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer ${
                      isSubmitted
                        ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitted ? '✓ Transmis à Sechel' : 'Transmettre à l\'Équipe Sechel'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
