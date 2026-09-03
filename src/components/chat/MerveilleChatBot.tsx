import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_INFO } from '../../data/initialData';
import { WhatsAppBridgeModal } from './WhatsAppBridgeModal';
import {
  Bot,
  Send,
  X,
  Sparkles,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RotateCcw,
  Zap,
  ArrowRight,
  MessageCircle,
  Clock,
  ShieldCheck,
  SunMedium,
  Network,
  FolderKanban,
  Globe2,
  Briefcase,
  Cpu,
  TrendingUp,
  Layers,
  CheckCircle2,
  ChevronUp,
  ChevronDown,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  quickAction?: 'open_scoping' | 'open_whatsapp';
}

interface MerveilleChatBotProps {
  onOpenScopingModal: (serviceId?: string) => void;
}

type FAQCategory = 'all' | 'services' | 'automation' | 'solar' | 'arsp_legal' | 'projects' | 'expansion' | 'pricing';

interface QuickPromptItem {
  id: string;
  category: FAQCategory;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  prompt: string;
}

export const MerveilleChatBot: React.FC<MerveilleChatBotProps> = ({ onOpenScopingModal }) => {
  const { language, isChatOpen } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isChatOpen) {
      setIsOpen(true);
    }
  }, [isChatOpen]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExplainer, setShowExplainer] = useState(false);
  const [isWhatsAppBridgeOpen, setIsWhatsAppBridgeOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>('all');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnreadNotice, setHasUnreadNotice] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-msg',
          sender: 'bot',
          text:
            language === 'fr'
              ? 'Bonjour ! Je suis **Merveille**, conseillère stratégique chez Sechel Consulting.\n\n🏛️ **Comment notre cabinet accélère-t-il la réussite de votre entreprise ?**\nNous accompagnons les dirigeants et organisations sur **6 piliers d\'excellence** en RDC et en Afrique subsaharienne :\n\n- ⚙️ **Automatisation des Processus & n8n :** Gagnez 15 à 30h/semaine, zéro erreur de facturation et réconciliation Mobile Money automatique.\n- ☀️ **Structuration Solaire & CleanTech :** Déploiement de marques (EcoFlow, Sun King), modèles PAYG et solutions B2B industrielles.\n- 📜 **Conformité ARSP & Droit OHADA :** Sécurisation de vos agréments de sous-traitance et conformité réglementaire.\n- 📊 **Gestion de Projets Institutionnels :** Direction d\'opérations complexes pour bailleurs internationaux (USAID, Heta).\n- 🔄 **Architecture Opérationnelle & ERP :** Cartographie des flux, rédaction de SOPs et optimisation logistique.\n- 🌍 **Expansion Panafricaine :** Accords distributeurs et pénétration de marché dans 9 pays.\n\nQuelle question avez-vous sur nos services, notre méthodologie ou vos projets ?'
              : 'Hello! I am **Merveille**, Strategic Advisor at Sechel Consulting.\n\n🏛️ **How does our firm accelerate your corporate growth and operational scale?**\nWe advise executive leaders and international organizations across **6 core practice areas** in DRC and Sub-Saharan Africa:\n\n- ⚙️ **Workflow Automation & n8n :** Save 15 to 30 hours weekly, eliminate billing errors, and automate Mobile Money reconciliation.\n- ☀️ **Solar Structuring & CleanTech :** Master distributor rollouts (EcoFlow, Sun King), PAYG models, and industrial B2B.\n- 📜 **ARSP Compliance & OHADA Law :** Subcontracting regulatory approvals and corporate security in DRC.\n- 📊 **Institutional Project Management :** Execution for global donors and development partners (USAID, Heta).\n- 🔄 **Operational Architecture & ERP :** Business process mapping, SOP design, and supply chain optimization.\n- 🌍 **Pan-African Market Expansion :** Master dealer networks and commercial growth across 9 countries.\n\nHow can I assist you regarding our services, methodology, or upcoming initiatives today?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnreadNotice(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const categoryTabs: Array<{ id: FAQCategory; label: string; icon: React.ComponentType<{ className?: string }> }> =
    language === 'fr'
      ? [
          { id: 'all', label: '⭐ FAQ Populaire', icon: Sparkles },
          { id: 'services', label: '🏛️ Pôles & Cabinet', icon: Briefcase },
          { id: 'automation', label: '⚙️ Automatisation n8n', icon: Cpu },
          { id: 'solar', label: '☀️ Solaire & Énergie', icon: SunMedium },
          { id: 'arsp_legal', label: '📜 ARSP & Droit', icon: ShieldCheck },
          { id: 'projects', label: '📊 Gestion Projets / USAID', icon: FolderKanban },
          { id: 'expansion', label: '🌍 Expansion 9 Pays', icon: Globe2 },
          { id: 'pricing', label: '💼 Tarifs & Démarche', icon: Clock }
        ]
      : [
          { id: 'all', label: '⭐ Top FAQ', icon: Sparkles },
          { id: 'services', label: '🏛️ Firm & Services', icon: Briefcase },
          { id: 'automation', label: '⚙️ n8n Automation', icon: Cpu },
          { id: 'solar', label: '☀️ Solar & CleanTech', icon: SunMedium },
          { id: 'arsp_legal', label: '📜 ARSP & Law', icon: ShieldCheck },
          { id: 'projects', label: '📊 Projects / USAID', icon: FolderKanban },
          { id: 'expansion', label: '🌍 9-Country Expansion', icon: Globe2 },
          { id: 'pricing', label: '💼 Engagement & Rates', icon: Clock }
        ];

  const allQuickPrompts: QuickPromptItem[] =
    language === 'fr'
      ? [
          // General / Popular FAQ
          {
            id: 'faq-overview',
            category: 'all',
            icon: Briefcase,
            label: 'Quels sont tous les services de Sechel Consulting ?',
            prompt: 'Présentez-moi l\'ensemble des 6 pôles de services de Sechel Consulting et comment votre cabinet accompagne concrètement une entreprise en Afrique centrale et australe.'
          },
          {
            id: 'faq-auto-roi',
            category: 'all',
            icon: Cpu,
            label: 'Automatisation : Quels gains concrets & quel ROI ?',
            prompt: 'Quels sont les objectifs concrets, les avantages mesurés (gain de 15 à 30h/semaine, zéro erreur de facturation, rentabilité) et en quoi l\'automatisation est indispensable pour développer mes affaires ?'
          },
          {
            id: 'faq-solar-katanga',
            category: 'all',
            icon: SunMedium,
            label: 'Solaire : Vos réalisations (EcoFlow, Conforta, USAID)',
            prompt: 'Quelles sont vos réalisations phares dans le secteur solaire en RDC (partenariat EcoFlow $2M+, Conforta Energy, et mission 200 centres de santé Heta / USAID) ?'
          },
          {
            id: 'faq-arsp-summary',
            category: 'all',
            icon: ShieldCheck,
            label: 'ARSP & Droit : Comment être en règle en RDC ?',
            prompt: 'Comment Sechel Consulting aide les entreprises et multinationales à se conformer à la loi ARSP sur la sous-traitance et au droit des affaires OHADA en RDC ?'
          },
          {
            id: 'faq-methodology',
            category: 'all',
            icon: Clock,
            label: 'Comment se déroule une mission de conseil ?',
            prompt: 'Comment se déroule une mission type avec Sechel Consulting : diagnostic initial, livrables, calendrier d\'intervention et garanties de résultats ?'
          },

          // Services & Cabinet
          {
            id: 'serv-who',
            category: 'services',
            icon: Briefcase,
            label: 'Qui sommes-nous & où intervient le cabinet ?',
            prompt: 'Pouvez-vous me présenter l\'histoire de Sechel Consulting, votre équipe d\'associés seniors, votre ancrage à Lubumbashi et vos bureaux régionaux en Afrique ?'
          },
          {
            id: 'serv-6pillars',
            category: 'services',
            icon: Layers,
            label: 'Détail des 6 piliers stratégiques d\'intervention',
            prompt: 'Expliquez-moi en détail les 6 piliers de conseil Sechel : Automatisation n8n, Structuration Solaire, Gestion de Projet, Architecture Opérationnelle, Stratégie de Marque et Expansion Panafricaine.'
          },
          {
            id: 'serv-differenciation',
            category: 'services',
            icon: TrendingUp,
            label: 'Pourquoi choisir Sechel plutôt qu\'un cabinet traditionnel ?',
            prompt: 'En quoi l\'approche d\'ingénierie d\'affaires de terrain de Sechel Consulting se différencie-t-elle des cabinets de conseil théoriques en Afrique ?'
          },

          // Automation & n8n
          {
            id: 'auto-how',
            category: 'automation',
            icon: Cpu,
            label: 'C\'est quoi l\'automatisation & comment ça marche ?',
            prompt: 'Expliquez-moi simplement : c\'est quoi l\'automatisation des processus métiers, comment fonctionne concrètement un workflow n8n (déclencheur, connecteurs, actions automatiques) et quel est son rôle dans une entreprise ?'
          },
          {
            id: 'auto-usecases',
            category: 'automation',
            icon: Zap,
            label: 'Exemples de flux automatisés (WhatsApp, Factures, MoMo)',
            prompt: 'Donnez-moi des exemples concrets de flux d\'automatisation applicables à mon entreprise : qualification WhatsApp, facturation automatique, encaissements Mobile Money (M-Pesa/Orange Money) et synchronisation CRM/ERP.'
          },
          {
            id: 'auto-scope',
            category: 'automation',
            icon: Sparkles,
            label: 'Cadrer un projet n8n & obtenir une estimation',
            prompt: 'Je souhaite faire un diagnostic interactif de cadrage pour cartographier les processus de mon entreprise, estimer le temps gagné et obtenir un devis.'
          },
          {
            id: 'auto-security',
            category: 'automation',
            icon: ShieldCheck,
            label: 'Sécurité des données & hébergement des flux n8n',
            prompt: 'Comment garantissez-vous la sécurité, la confidentialité des données clients et l\'hébergement souverain (serveur dédié / on-premise) des flux n8n ?'
          },

          // Solar & CleanTech
          {
            id: 'solar-support',
            category: 'solar',
            icon: SunMedium,
            label: 'Structuration de filières solaires & distributeurs',
            prompt: 'Comment accompagnez-vous les fabricants et distributeurs d\'équipements solaires pour structurer leur réseau de vente, fixer les marges et former les revendeurs ?'
          },
          {
            id: 'solar-ecoflow',
            category: 'solar',
            icon: TrendingUp,
            label: 'Étude de cas EcoFlow au Katanga ($2M+ générés)',
            prompt: 'Pouvez-vous détailler l\'étude de cas EcoFlow : comment Sechel Consulting a généré plus de 2 000 000 $ de chiffre d\'affaires en activant 5 distributeurs majeurs au Katanga ?'
          },
          {
            id: 'solar-payg',
            category: 'solar',
            icon: Zap,
            label: 'Modèles PAYG (Pay-As-You-Go) & Mobile Money',
            prompt: 'Comment déployer un modèle de vente solaire en Pay-As-You-Go (PAYG) connecté aux paiements mobiles (Orange Money, MTN MoMo, M-Pesa) pour maximiser les encaissements récurrents ?'
          },

          // ARSP & OHADA
          {
            id: 'arsp-rules',
            category: 'arsp_legal',
            icon: ShieldCheck,
            label: 'Conformité ARSP : Règles de sous-traitance en RDC',
            prompt: 'Quelles sont les obligations légales de la loi ARSP sur la sous-traitance en RDC (règle des 51% à capitaux congolais, secteurs minier et télécom) et comment obtenir le certificat d\'éligibilité ?'
          },
          {
            id: 'arsp-ohada',
            category: 'arsp_legal',
            icon: Briefcase,
            label: 'Sécurisation juridique & droit des affaires OHADA',
            prompt: 'Comment Sechel Consulting structure la gouvernance d\'entreprise, les pactes d\'actionnaires et la conformité contractuelle sous l\'espace juridique OHADA ?'
          },
          {
            id: 'arsp-foreign',
            category: 'arsp_legal',
            icon: Globe2,
            label: 'Implantation d\'une filiale internationale en RDC',
            prompt: 'Quelles sont les étapes pour implanter une société internationale ou une filiale en RDC : immatriculation GUCE, fiscalité d\'investissement et conformité locale ?'
          },

          // Projects & USAID
          {
            id: 'proj-donors',
            category: 'projects',
            icon: FolderKanban,
            label: 'Gestion de projets pour bailleurs internationaux (USAID)',
            prompt: 'Comment Sechel Consulting pilote des programmes complexes financés par les bailleurs de fonds internationaux (USAID, banques de développement, ONG) ?'
          },
          {
            id: 'proj-kasai',
            category: 'projects',
            icon: SunMedium,
            label: 'Mission Heta Kasaï : 2 400 km & 200 cliniques',
            prompt: 'Expliquez-moi le retour d\'expérience de la mission Heta / USAID au Kasaï : électrification de 200 centres de santé sans incident sur 2 400 km de pistes.'
          },
          {
            id: 'proj-audit',
            category: 'projects',
            icon: CheckCircle2,
            label: 'Audits de projet, jalons PMI & suivi des livrables',
            prompt: 'Quelles méthodologies de gestion de projet (PMI, Agile, audits d\'étapes, gestion des risques) déployez-vous pour garantir le respect des budgets et des délais ?'
          },

          // Pan-African Expansion
          {
            id: 'exp-9countries',
            category: 'expansion',
            icon: Globe2,
            label: 'Déploiement commercial dans 9 pays africains',
            prompt: 'Quels sont les 9 pays couverts par Sechel Consulting (RDC, Cameroun, Bénin, Côte d\'Ivoire, Sénégal, Afrique du Sud...) et comment ouvrez-vous un nouveau marché ?'
          },
          {
            id: 'exp-telecoms',
            category: 'expansion',
            icon: Network,
            label: 'Partenariats Télécoms & FinTech (Orange, MTN, Vodacom)',
            prompt: 'Comment négociez-vous des accords stratégiques avec les opérateurs télécoms (Orange, MTN, Vodacom) pour accélérer la distribution de produits et services ?'
          },

          // Engagement, Pricing & FAQ
          {
            id: 'price-packages',
            category: 'pricing',
            icon: Clock,
            label: 'Modalités tarifaires & formats d\'engagement',
            prompt: 'Quelles sont les formules d\'accompagnement tarifaire de Sechel Consulting (forfait au projet, retainer mensuel, diagnostic d\'audit) et comment obtenir un devis personnalisé ?'
          },
          {
            id: 'price-timeline',
            category: 'pricing',
            icon: Zap,
            label: 'Délais d\'intervention & calendrier de déploiement',
            prompt: 'Quels sont les délais habituels pour lancer une mission : cadrage initial, phase de déploiement et transfert de compétences aux équipes locales ?'
          },
          {
            id: 'price-contact',
            category: 'pricing',
            icon: MessageCircle,
            label: 'Prendre rendez-vous ou échanger sur WhatsApp',
            prompt: 'Comment contacter directement un consultant senior de Sechel Consulting ou organiser une session de travail par visioconférence ou à Lubumbashi ?'
          }
        ]
      : [
          // General / Popular FAQ (EN)
          {
            id: 'faq-overview',
            category: 'all',
            icon: Briefcase,
            label: 'What services does Sechel Consulting provide?',
            prompt: 'Present the full scope of Sechel Consulting\'s 6 practice pillars and how your advisory firm drives measurable growth in Central and Southern Africa.'
          },
          {
            id: 'faq-auto-roi',
            category: 'all',
            icon: Cpu,
            label: 'Automation: Concrete gains & ROI for business',
            prompt: 'What are the concrete business objectives, measurable advantages (saving 15 to 30h/week, zero billing errors, ROI), and why is automation critical for enterprise profitability?'
          },
          {
            id: 'faq-solar-katanga',
            category: 'all',
            icon: SunMedium,
            label: 'Solar: Proven track record (EcoFlow, Conforta, USAID)',
            prompt: 'What are your core solar achievements in DRC (EcoFlow $2M+ revenue milestone, Conforta Energy launch, and the 200 health clinics Heta / USAID mission)?'
          },
          {
            id: 'faq-arsp-summary',
            category: 'all',
            icon: ShieldCheck,
            label: 'ARSP & Law: How to stay compliant in DRC?',
            prompt: 'How does Sechel Consulting guide corporations and multinationals through ARSP subcontracting compliance and OHADA corporate governance in DRC?'
          },
          {
            id: 'faq-methodology',
            category: 'all',
            icon: Clock,
            label: 'How does an advisory engagement work?',
            prompt: 'How does a typical client engagement proceed with Sechel Consulting: initial diagnosis, key milestones, timeline, and ROI accountability?'
          },

          // Services & Firm (EN)
          {
            id: 'serv-who',
            category: 'services',
            icon: Briefcase,
            label: 'Who we are & our regional hubs in Africa',
            prompt: 'Tell me about Sechel Consulting\'s background, senior partner executive team, Lubumbashi headquarters, and African regional presence.'
          },
          {
            id: 'serv-6pillars',
            category: 'services',
            icon: Layers,
            label: 'Deep dive into our 6 strategic service pillars',
            prompt: 'Explain the 6 core practice pillars of Sechel Consulting: n8n Workflow Automation, Solar Structuring, Project Management, Operational Architecture, Brand Strategy, and Pan-African Expansion.'
          },
          {
            id: 'serv-differenciation',
            category: 'services',
            icon: TrendingUp,
            label: 'Why choose Sechel over traditional consulting firms?',
            prompt: 'How does Sechel Consulting\'s boots-on-the-ground business engineering model differ from theoretical slide-deck consulting in Africa?'
          },

          // Automation & n8n (EN)
          {
            id: 'auto-how',
            category: 'automation',
            icon: Cpu,
            label: 'What is automation & how does it work step-by-step?',
            prompt: 'Explain clearly: what is business process automation, how does an n8n workflow engine operate (triggers, connectors, automated actions), and what is its role in corporate operations?'
          },
          {
            id: 'auto-usecases',
            category: 'automation',
            icon: Zap,
            label: 'Automated workflows examples (WhatsApp, Billing, MoMo)',
            prompt: 'Give me practical examples of business workflows we can automate: WhatsApp lead qualification, automated invoicing, Mobile Money reconciliation (M-Pesa/Orange Money), and CRM/ERP sync.'
          },
          {
            id: 'auto-scope',
            category: 'automation',
            icon: Sparkles,
            label: 'Scope an n8n project & evaluate implementation',
            prompt: 'I want to run an interactive project scoping diagnostic for our organization and evaluate implementation costs and timeline.'
          },
          {
            id: 'auto-security',
            category: 'automation',
            icon: ShieldCheck,
            label: 'Data security & self-hosted n8n infrastructure',
            prompt: 'How do you ensure data confidentiality, banking-grade encryption, and sovereign hosting (dedicated cloud or on-premise) for enterprise n8n workflows?'
          },

          // Solar & CleanTech (EN)
          {
            id: 'solar-support',
            category: 'solar',
            icon: SunMedium,
            label: 'Solar distribution structuring & master dealer networks',
            prompt: 'How do you assist solar manufacturers and distributors in structuring wholesale networks, pricing policies, and dealer enablement across Africa?'
          },
          {
            id: 'solar-ecoflow',
            category: 'solar',
            icon: TrendingUp,
            label: 'EcoFlow Katanga Case Study ($2M+ generated)',
            prompt: 'Can you break down the EcoFlow case study: how Sechel Consulting scaled over $2,000,000 in gross revenue by activating 5 tier-1 distributors in Katanga?'
          },
          {
            id: 'solar-payg',
            category: 'solar',
            icon: Zap,
            label: 'Pay-As-You-Go (PAYG) models & Mobile Money',
            prompt: 'How can we structure a Pay-As-You-Go (PAYG) clean energy model connected directly to Mobile Money rails (Orange Money, MTN, M-Pesa) for recurring revenue?'
          },

          // ARSP & Law (EN)
          {
            id: 'arsp-rules',
            category: 'arsp_legal',
            icon: ShieldCheck,
            label: 'ARSP Subcontracting compliance rules in DRC',
            prompt: 'What are the legal requirements of the ARSP subcontracting law in DRC (51% Congolese ownership rule in mining & telecom sectors) and how to secure regulatory approval?'
          },
          {
            id: 'arsp-ohada',
            category: 'arsp_legal',
            icon: Briefcase,
            label: 'Corporate governance & OHADA legal frameworks',
            prompt: 'How does Sechel Consulting secure corporate governance, shareholder agreements, and commercial contracts within the OHADA jurisdiction?'
          },
          {
            id: 'arsp-foreign',
            category: 'arsp_legal',
            icon: Globe2,
            label: 'Establishing an international subsidiary in DRC',
            prompt: 'What are the steps to establish a foreign subsidiary in DRC: one-stop shop (GUCE) registration, investment tax incentives, and local compliance?'
          },

          // Projects & USAID (EN)
          {
            id: 'proj-donors',
            category: 'projects',
            icon: FolderKanban,
            label: 'Institutional project execution for global donors (USAID)',
            prompt: 'How does Sechel Consulting manage high-stakes field operations funded by international donors (USAID, development banks, NGOs)?'
          },
          {
            id: 'proj-kasai',
            category: 'projects',
            icon: SunMedium,
            label: 'Heta Kasai Mission: 2,400 km & 200 clinics',
            prompt: 'Explain the Heta / USAID Kasai field mission: electrifying 200 rural healthcare clinics with zero logistical downtime over 2,400 km of rugged roads.'
          },
          {
            id: 'proj-audit',
            category: 'projects',
            icon: CheckCircle2,
            label: 'PMI governance, project audits & milestone tracking',
            prompt: 'What project governance frameworks (PMI, Agile, stage-gate audits, risk management) do you deploy to ensure on-time and on-budget delivery?'
          },

          // Regional Expansion (EN)
          {
            id: 'exp-9countries',
            category: 'expansion',
            icon: Globe2,
            label: 'Commercial expansion across 9 African countries',
            prompt: 'Which 9 countries are covered by Sechel Consulting (DRC, Cameroon, Benin, Côte d\'Ivoire, Senegal, South Africa...) and what is your market entry roadmap?'
          },
          {
            id: 'exp-telecoms',
            category: 'expansion',
            icon: Network,
            label: 'Telecom & FinTech alliances (Orange, MTN, Vodacom)',
            prompt: 'How do you negotiate strategic partnerships with telecom operators (Orange, MTN, Vodacom) to hyper-scale retail and commercial distribution?'
          },

          // Pricing & FAQ (EN)
          {
            id: 'price-packages',
            category: 'pricing',
            icon: Clock,
            label: 'Pricing packages & engagement options',
            prompt: 'What are Sechel Consulting\'s pricing structures (fixed-scope project, monthly advisory retainer, audit diagnosis) and how can we get a tailored quotation?'
          },
          {
            id: 'price-timeline',
            category: 'pricing',
            icon: Zap,
            label: 'Deployment timelines & delivery phases',
            prompt: 'What are the standard engagement phases: scoping audit, implementation rollout, and knowledge transfer to internal teams?'
          },
          {
            id: 'price-contact',
            category: 'pricing',
            icon: MessageCircle,
            label: 'Book a consultation or chat on WhatsApp',
            prompt: 'How can I connect directly with a senior partner at Sechel Consulting or schedule a strategy meeting in Lubumbashi or online?'
          }
        ];

  const filteredPrompts =
    selectedCategory === 'all'
      ? allQuickPrompts.filter((p) => p.category === 'all')
      : allQuickPrompts.filter((p) => p.category === selectedCategory);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || inputText.trim();
    if (!messageText || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          conversationHistory: messages.map((m) => ({ sender: m.sender, text: m.text })),
          language
        })
      });

      const data = await response.json();
      const replyText = data.reply || (
        language === 'fr'
          ? 'Je suis à votre entière disposition. Souhaitez-vous planifier un échange avec un consultant senior de notre cabinet ou lancer un cadrage de projet ?'
          : 'I am at your service. Would you like to schedule a consultation with one of our senior partners or run an interactive project scoping?'
      );

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickAction:
          messageText.toLowerCase().includes('cadr') ||
          messageText.toLowerCase().includes('scop') ||
          messageText.toLowerCase().includes('devis') ||
          messageText.toLowerCase().includes('diagnostic')
            ? 'open_scoping'
            : undefined
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text:
            language === 'fr'
              ? 'Je suis momentanément occupée. N\'hésitez pas à joindre directement nos consultants seniors sur WhatsApp (+243 854 532 239) pour une prise en charge immédiate.'
              : 'I encountered a brief delay. Feel free to contact our senior advisory team directly on WhatsApp (+243 854 532 239).',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          quickAction: 'open_whatsapp'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeech = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanText = text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'fr' ? 'fr-FR' : 'en-US';
    utterance.rate = 1.05;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const resetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text:
          language === 'fr'
            ? 'Conversation réinitialisée. Comment puis-je vous orienter sur nos expertises : automatisation n8n, énergie solaire, conformité ARSP/OHADA ou gestion de projet ?'
            : 'Conversation reset. How may I guide you regarding n8n automation, solar energy, ARSP/OHADA compliance, or project management?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Action Dock: Side-by-Side Merveille & WhatsApp Agent Bridge */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 select-none">
        {/* WhatsApp Direct / Agent Bridge Floating Button */}
        <button
          onClick={() => setIsWhatsAppBridgeOpen(true)}
          className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-900/30 hover:scale-105 active:scale-95 transition-all duration-300 relative group border-2 border-white/80 cursor-pointer"
          title="Échanger avec un consultant senior sur WhatsApp (ou exporter l'échange)"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border border-white"></span>
          </span>

          {/* Hover Tooltip */}
          <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap border border-slate-700 pointer-events-none">
            {language === 'fr' ? 'WhatsApp Agent • Humain & Numérique' : 'WhatsApp Agent • Human & Expert'}
          </div>
        </button>

        {/* Merveille Floating Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`h-13 rounded-full flex items-center gap-2.5 px-4 shadow-xl transition-all duration-300 border-2 border-white/80 cursor-pointer ${
            isOpen
              ? 'bg-slate-900 text-white ring-2 ring-blue-500'
              : 'bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 hover:from-blue-600 hover:to-indigo-600 text-white shadow-blue-950/40 hover:scale-105'
          }`}
          title="Discuter avec Merveille (Conseillère Sechel)"
        >
          <div className="relative flex items-center justify-center">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border border-white"></span>
            </span>
          </div>

          <div className="text-left hidden sm:block">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold font-serif-display leading-none">Merveille</span>
            </div>
            <span className="text-[10px] text-blue-200 block font-medium">Conseil & Projets</span>
          </div>

          {/* Notice bubble if unread */}
          {hasUnreadNotice && !isOpen && (
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold animate-pulse">
              En ligne
            </span>
          )}
        </button>
      </div>

      {/* Main Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed z-50 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-900 transition-all ${
              isExpanded
                ? 'bottom-4 right-4 sm:right-6 w-[95vw] sm:w-[720px] h-[88vh] max-h-[820px]'
                : 'bottom-20 right-3 sm:right-6 w-[94vw] sm:w-[440px] h-[600px] max-h-[85vh]'
            }`}
          >
            {/* Header */}
            <div className="bg-[#0B1528] text-white p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md border border-blue-400/30">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0B1528] rounded-full"></span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif-display font-bold text-sm sm:text-base text-white">
                      Merveille
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-blue-900/80 border border-blue-500/40 text-[9px] font-bold text-blue-300">
                      Conseil Stratégique
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    {language === 'fr'
                      ? 'Conseillère Stratégique • Sechel Consulting'
                      : 'Strategic Advisory • Sechel Consulting'}
                  </p>
                </div>
              </div>

              {/* Window Controls with WhatsApp Agent Bridge Trigger */}
              <div className="flex items-center gap-1.5 text-slate-400">
                <button
                  onClick={() => setIsWhatsAppBridgeOpen(true)}
                  className="px-2.5 py-1 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1.5 transition-all border border-emerald-500/40 shadow-xs cursor-pointer"
                  title={
                    language === 'fr'
                      ? 'Transférer cette discussion ou échanger avec un agent physique sur WhatsApp'
                      : 'Transfer this chat or connect with a human consultant on WhatsApp'
                  }
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
                  <span className="hidden sm:inline">
                    {language === 'fr' ? 'Agent Physique' : 'Human Advisor'}
                  </span>
                </button>

                <button
                  onClick={resetChat}
                  className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                  title="Réinitialiser la conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors hidden sm:block cursor-pointer"
                  title={isExpanded ? 'Réduire' : 'Agrandir'}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                  title="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Services & FAQ Guide Banner with Explainer Toggle */}
            <div className="bg-gradient-to-r from-blue-900/95 via-indigo-950 to-slate-900 text-white px-3.5 py-2 text-xs border-b border-blue-800/40">
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => setShowExplainer(!showExplainer)}
                  className="flex items-center gap-1.5 text-left text-blue-200 hover:text-white transition-colors group"
                >
                  <Briefcase className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-semibold underline decoration-dotted underline-offset-2">
                    {language === 'fr'
                      ? 'Guide des 6 Piliers de Conseil & FAQ'
                      : '6 Advisory Pillars Guide & FAQ'}
                  </span>
                  {showExplainer ? (
                    <ChevronUp className="w-3 h-3 text-slate-300" />
                  ) : (
                    <ChevronDown className="w-3 h-3 text-slate-300" />
                  )}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      onOpenScopingModal();
                      setIsOpen(false);
                    }}
                    className="px-2.5 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] uppercase tracking-wide transition-colors flex items-center gap-1 shadow-sm flex-shrink-0"
                  >
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{language === 'fr' ? 'Cadrage Mission' : 'Mission Scoping'}</span>
                  </button>
                </div>
              </div>

              {/* Collapsible Explainer Card */}
              <AnimatePresence>
                {showExplainer && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden mt-2 pt-2 border-t border-blue-800/50"
                  >
                    <div className="bg-slate-900/90 rounded-xl p-3 border border-blue-500/30 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1">
                          <Layers className="w-3 h-3" />
                          {language === 'fr' ? 'Les 6 Pôles d\'Intervention Sechel' : 'Sechel\'s 6 Practice Pillars'}
                        </span>
                        <span className="text-[9px] text-slate-400">RDC & 9 pays africains</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[10px]">
                        <div className="bg-blue-950/70 p-2 rounded-lg border border-blue-800/50">
                          <div className="font-bold text-blue-300 flex items-center gap-1">
                            <Cpu className="w-3 h-3 text-amber-400" />
                            <span>1. Automatisation n8n</span>
                          </div>
                          <div className="text-slate-400 text-[9px] mt-0.5 leading-tight">
                            Gain 15-30h/sem, zéro erreur
                          </div>
                        </div>

                        <div className="bg-amber-950/40 p-2 rounded-lg border border-amber-800/40">
                          <div className="font-bold text-amber-300 flex items-center gap-1">
                            <SunMedium className="w-3 h-3 text-amber-400" />
                            <span>2. Solaire & CleanTech</span>
                          </div>
                          <div className="text-slate-400 text-[9px] mt-0.5 leading-tight">
                            EcoFlow $2M+, Sun King, PAYG
                          </div>
                        </div>

                        <div className="bg-emerald-950/50 p-2 rounded-lg border border-emerald-800/50">
                          <div className="font-bold text-emerald-300 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            <span>3. Conformité ARSP / Droit</span>
                          </div>
                          <div className="text-slate-400 text-[9px] mt-0.5 leading-tight">
                            Agrément sous-traitance, OHADA
                          </div>
                        </div>

                        <div className="bg-indigo-950/60 p-2 rounded-lg border border-indigo-800/50">
                          <div className="font-bold text-indigo-300 flex items-center gap-1">
                            <FolderKanban className="w-3 h-3 text-indigo-400" />
                            <span>4. Gestion de Projets</span>
                          </div>
                          <div className="text-slate-400 text-[9px] mt-0.5 leading-tight">
                            USAID (200 cliniques), audits
                          </div>
                        </div>

                        <div className="bg-purple-950/50 p-2 rounded-lg border border-purple-800/50">
                          <div className="font-bold text-purple-300 flex items-center gap-1">
                            <Network className="w-3 h-3 text-purple-400" />
                            <span>5. Architecture ERP/SOP</span>
                          </div>
                          <div className="text-slate-400 text-[9px] mt-0.5 leading-tight">
                            Processus & digitalisation
                          </div>
                        </div>

                        <div className="bg-cyan-950/50 p-2 rounded-lg border border-cyan-800/50">
                          <div className="font-bold text-cyan-300 flex items-center gap-1">
                            <Globe2 className="w-3 h-3 text-cyan-400" />
                            <span>6. Expansion 9 Pays</span>
                          </div>
                          <div className="text-slate-400 text-[9px] mt-0.5 leading-tight">
                            Télécoms, MoMo, revendeurs
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[10px]">
                        <span className="text-slate-400">
                          {language === 'fr' ? 'Besoin d\'un échange personnalisé ?' : 'Need customized guidance?'}
                        </span>
                        <button
                          onClick={() => {
                            setShowExplainer(false);
                            handleSendMessage(
                              language === 'fr'
                                ? 'Présentez-moi l\'ensemble des expertises et livrables de Sechel Consulting pour accompagner notre organisation.'
                                : 'Present the full portfolio of capabilities and deliverables Sechel Consulting provides for our organization.'
                            );
                          }}
                          className="text-amber-300 hover:text-amber-200 font-semibold underline"
                        >
                          {language === 'fr' ? 'Poser une question globale →' : 'Ask general question →'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Messages Stream */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50/70">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-start gap-2 max-w-[88%] sm:max-w-[82%]">
                      {!isUser && (
                        <div className="w-7 h-7 rounded-lg bg-blue-700 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm text-xs font-bold">
                          M
                        </div>
                      )}

                      <div
                        className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          isUser
                            ? 'bg-blue-600 text-white rounded-br-sm shadow-md'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm shadow-sm'
                        }`}
                      >
                        {/* Markdown formatting basic support */}
                        <div className="space-y-2 whitespace-pre-wrap">
                          {msg.text.split('\n\n').map((block, bIdx) => {
                            // Check for list
                            if (block.startsWith('- ') || block.startsWith('* ')) {
                              return (
                                <ul key={bIdx} className="space-y-1 pl-1">
                                  {block.split('\n').map((line, lIdx) => (
                                    <li key={lIdx} className="flex items-start gap-1.5">
                                      <span className={isUser ? 'text-blue-200' : 'text-blue-600 font-bold'}>•</span>
                                      <span>
                                        {line.replace(/^[-*]\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1')}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              );
                            }
                            return (
                              <p key={bIdx}>
                                {block.replace(/\*\*(.*?)\*\*/g, '$1')}
                              </p>
                            );
                          })}
                        </div>

                        {/* Bot Action Buttons */}
                        {!isUser && (
                          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                            <span className="font-mono text-[10px]">{msg.timestamp}</span>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleCopy(msg.id, msg.text)}
                                className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                                title="Copier la réponse"
                              >
                                {copiedId === msg.id ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <button
                                onClick={() => handleSpeech(msg.text)}
                                className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                                title="Lire la réponse"
                              >
                                {isSpeaking ? (
                                  <VolumeX className="w-3.5 h-3.5 text-blue-600" />
                                ) : (
                                  <Volume2 className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Trigger if offered by message */}
                    {msg.quickAction === 'open_scoping' && (
                      <div className="mt-2 ml-9">
                        <button
                          onClick={() => {
                            onOpenScopingModal('workflow-automation-n8n');
                            setIsOpen(false);
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>Ouvrir le Cadrage de Projet Interactif</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-start gap-2 max-w-[80%]">
                  <div className="w-7 h-7 rounded-lg bg-blue-700 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    M
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-slate-500 text-xs flex items-center gap-2 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-[11px] font-medium text-slate-500">Merveille réfléchit...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* General FAQ & Service Suggestions Panel with Category Navigation */}
            <div className="bg-slate-100/90 border-t border-slate-200 px-3 py-2 flex-shrink-0 space-y-1.5">
              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-thin scrollbar-thumb-slate-300">
                {categoryTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = selectedCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSelectedCategory(tab.id)}
                      className={`flex-shrink-0 px-2.5 py-1 rounded-md text-[10px] font-bold transition-all flex items-center gap-1 border whitespace-nowrap ${
                        isActive
                          ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <Icon className={`w-3 h-3 ${isActive ? 'text-amber-300' : 'text-slate-500'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Suggestions Chips Stream */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-300">
                {filteredPrompts.map((chip) => {
                  const ChipIcon = chip.icon;
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => handleSendMessage(chip.prompt)}
                      className="flex-shrink-0 max-w-[280px] sm:max-w-[320px] px-3 py-1.5 rounded-lg bg-white hover:bg-blue-50 hover:border-blue-300 text-slate-800 hover:text-blue-950 text-[11px] font-medium border border-slate-200/90 shadow-2xs transition-all flex items-center gap-2 group text-left"
                    >
                      <div className="w-5 h-5 rounded-md bg-blue-50 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-blue-700 transition-colors flex-shrink-0">
                        <ChipIcon className="w-3 h-3" />
                      </div>
                      <span className="leading-snug line-clamp-2">{chip.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={
                    language === 'fr'
                      ? 'Posez votre question sur nos services, automatisation, solaire, ARSP...'
                      : 'Ask about our services, automation, solar, ARSP compliance...'
                  }
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-grow px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-slate-50 focus:bg-white transition-colors"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white flex items-center justify-center transition-all flex-shrink-0 shadow-sm"
                  title="Envoyer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive WhatsApp Physical Agent & AI Bot Bridge Modal */}
      <WhatsAppBridgeModal
        isOpen={isWhatsAppBridgeOpen}
        onClose={() => setIsWhatsAppBridgeOpen(false)}
        onContinueWithBot={() => {
          setIsWhatsAppBridgeOpen(false);
          setIsOpen(true);
        }}
        messages={messages}
      />
    </>
  );
};
