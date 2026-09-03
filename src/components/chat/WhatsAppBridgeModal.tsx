import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_INFO } from '../../data/initialData';
import {
  MessageCircle,
  Bot,
  UserCheck,
  Send,
  Copy,
  Check,
  Phone,
  ArrowRight,
  X,
  FileText,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Clock,
  Briefcase,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface ChatMessageSummary {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

interface WhatsAppBridgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinueWithBot: () => void;
  messages?: ChatMessageSummary[];
  customTopic?: string;
}

export const WhatsAppBridgeModal: React.FC<WhatsAppBridgeModalProps> = ({
  isOpen,
  onClose,
  onContinueWithBot,
  messages = [],
  customTopic
}) => {
  const { language } = useApp();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'options' | 'preview'>('options');

  if (!isOpen) return null;

  // Filter meaningful conversation exchanges (ignoring pure welcome messages)
  const userMessages = messages.filter((m) => m.sender === 'user');
  const hasConversation = userMessages.length > 0;

  // Build clean text summary for export to physical WhatsApp agent
  const generateExportText = () => {
    const header =
      language === 'fr'
        ? `*SECHEL CONSULTING — TRANSMISSION DE DOSSIER*\n_Date: ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}_\n\nBonjour, je souhaite poursuivre mon échange avec un *Consultant Senior / Associé de Sechel Consulting* sur WhatsApp.`
        : `*SECHEL CONSULTING — CLIENT ENGAGEMENT DOSSIER*\n_Date: ${new Date().toLocaleDateString('en-US')} at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}_\n\nHello, I would like to continue my inquiry directly with a *Senior Partner / Advisory Consultant* on WhatsApp.`;

    if (customTopic) {
      return `${header}\n\n📌 *Sujet ciblé :* ${customTopic}\n\nDiscutons des modalités d'accompagnement et des prochaines étapes.`;
    }

    if (!hasConversation) {
      return (
        header +
        (language === 'fr'
          ? `\n\n📌 *Demande :* Conseil en stratégie, automatisation n8n, énergie solaire ou conformité ARSP/OHADA.\n\nPouvons-nous convenir d'un échange direct ?`
          : `\n\n📌 *Scope :* Strategy advisory, n8n workflow automation, solar structuring or ARSP/OHADA compliance.\n\nCould we schedule a preliminary review?`)
      );
    }

    // Include structured points from the ongoing conversation
    const exchanges = messages
      .slice(-6) // last 6 exchanges to stay concise on WhatsApp URL
      .map((m) => {
        const prefix = m.sender === 'user' ? '👤 *Client:*' : '🤖 *Merveille:*';
        // Clean markdown asterisks and truncate very long bot texts
        const cleanText = m.text
          .replace(/\*\*/g, '')
          .replace(/\n+/g, ' ')
          .slice(0, 180);
        return `${prefix} ${cleanText}${m.text.length > 180 ? '...' : ''}`;
      })
      .join('\n\n');

    const footer =
      language === 'fr'
        ? `\n\n✅ *Note :* Cet historique a été exporté depuis l'assistant Sechel pour vous permettre de reprendre directement mon dossier.`
        : `\n\n✅ *Note :* Exported from Sechel web advisor to facilitate direct continuation of this dossier.`;

    return `${header}\n\n📋 *SYNTHÈSE DE L'ÉCHANGE PRÉALABLE :*\n${exchanges}${footer}`;
  };

  const exportText = generateExportText();
  const rawWhatsAppNumber = COMPANY_INFO.contacts.whatsapp.replace(/[^0-9]/g, '');
  const whatsappExportUrl = `https://wa.me/${rawWhatsAppNumber}?text=${encodeURIComponent(exportText)}`;

  const directFreshWhatsAppUrl = `https://wa.me/${rawWhatsAppNumber}?text=${encodeURIComponent(
    language === 'fr'
      ? 'Bonjour Sechel Consulting, je souhaite échanger directement avec un consultant senior sur un projet stratégique pour mon entreprise.'
      : 'Hello Sechel Consulting, I would like to discuss an upcoming strategic project directly with a senior partner.'
  )}`;

  const handleCopyTranscript = () => {
    navigator.clipboard.writeText(exportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-[#0B1528] text-white p-5 sm:p-6 border-b border-slate-800 flex items-start justify-between relative">
          <div className="space-y-1.5 pr-8">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-[11px] font-bold text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {language === 'fr'
                  ? 'Canal Exécutif • Agent Physique & Numérique'
                  : 'Executive Channel • Human & Expert Advisor'}
              </span>
            </div>
            <h3 className="font-serif-display text-lg sm:text-xl font-bold text-white">
              {language === 'fr'
                ? 'Comment souhaitez-vous poursuivre votre échange ?'
                : 'How would you like to continue your consultation?'}
            </h3>
            <p className="text-xs text-slate-300">
              {language === 'fr'
                ? 'Choisissez entre un consultant senior physique sur WhatsApp ou la Conseillère Merveille.'
                : 'Select direct WhatsApp advisory with a senior partner or continue with Merveille.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-slate-800">
          {/* Option 1: Human Physical Agent on WhatsApp (Primary Highlight) */}
          <div className="rounded-xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-50/70 via-white to-slate-50 p-4 sm:p-5 shadow-sm space-y-3.5 relative">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm sm:text-base text-slate-900">
                      {language === 'fr'
                        ? '1. Échanger avec un Consultant Senior (Agent Physique)'
                        : '1. Connect with a Senior Partner (Human Consultant)'}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      WhatsApp Direct
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {language === 'fr'
                      ? 'Ligne directe cabinet : Haut-Katanga, RDC & International (+243 997 452 890)'
                      : 'Direct advisory desk: Haut-Katanga, DRC & Pan-Africa (+243 997 452 890)'}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {language === 'fr'
                ? 'Un associé de Sechel Consulting prend le relais pour cadrer vos besoins, établir une proposition sur-mesure ou étudier un protocole d\'accord confidentiel (NDA).'
                : 'A dedicated Sechel partner steps in to structure your roadmap, deliver custom quotes, and review engagement terms under strict NDA.'}
            </p>

            {/* Actions for Human Agent */}
            <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
              {hasConversation ? (
                <a
                  href={whatsappExportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-center"
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {language === 'fr'
                      ? 'Transférer & Exporter cette conversation sur WhatsApp'
                      : 'Export & Continue this chat on WhatsApp'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <a
                  href={directFreshWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-center"
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {language === 'fr'
                      ? 'Démarrer une discussion sur WhatsApp avec un Consultant'
                      : 'Start WhatsApp Chat with a Senior Consultant'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              )}

              <a
                href={`tel:${COMPANY_INFO.contacts.phone}`}
                className="px-3.5 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                title="Appel Téléphonique Direct"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>{language === 'fr' ? 'Appeler' : 'Call'}</span>
              </a>
            </div>

            {hasConversation && (
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-emerald-200/60">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {language === 'fr'
                    ? `${userMessages.length} message(s) prêt(s) pour transfert`
                    : `${userMessages.length} message(s) ready to transfer`}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab === 'preview' ? 'options' : 'preview')}
                  className="text-blue-600 hover:underline font-semibold cursor-pointer"
                >
                  {activeTab === 'preview'
                    ? language === 'fr'
                      ? 'Masquer l\'aperçu'
                      : 'Hide preview'
                    : language === 'fr'
                      ? 'Voir l\'aperçu du message WhatsApp'
                      : 'View WhatsApp message preview'}
                </button>
              </div>
            )}
          </div>

          {/* Collapsible WhatsApp Message Preview */}
          {activeTab === 'preview' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3.5 rounded-xl bg-slate-900 text-slate-200 border border-slate-700 text-[11px] font-mono leading-relaxed max-h-48 overflow-y-auto space-y-1.5"
            >
              <div className="flex items-center justify-between text-slate-400 font-sans pb-1 border-b border-slate-800 text-[10px]">
                <span>Aperçu du texte pré-rempli pour l'agent physique :</span>
                <button
                  onClick={handleCopyTranscript}
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copié' : 'Copier'}</span>
                </button>
              </div>
              <pre className="whitespace-pre-wrap font-mono text-[11px] text-emerald-300">
                {exportText}
              </pre>
            </motion.div>
          )}

          {/* Option 2: AI Bot Merveille (Website Chat) */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs hover:border-blue-300 transition-colors space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm sm:text-base text-slate-900">
                      {language === 'fr'
                        ? '2. Continuer avec Merveille (Conseillère 24/7)'
                        : '2. Continue with Merveille (Advisor 24/7)'}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                      Site Web
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {language === 'fr'
                      ? 'Réponses immédiates sur les 6 piliers, calculs de ROI & cadrage n8n'
                      : 'Instant answers on 6 practice areas, ROI modeling & n8n automation'}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'fr'
                ? 'Poursuivez le dialogue interactif directement sur le site web sans quitter la page pour affiner vos questions et explorer les cas d\'usage.'
                : 'Continue interactive discovery on this website to explore practice areas, assess workflows, and simulate operational savings.'}
            </p>

            <button
              type="button"
              onClick={() => {
                onClose();
                onContinueWithBot();
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>
                {language === 'fr'
                  ? 'Continuer la discussion avec Merveille sur le site'
                  : 'Continue chatting with Merveille on website'}
              </span>
            </button>
          </div>

          {/* Option 3: Copy Transcript or Share */}
          <div className="flex items-center justify-between pt-2 px-1 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span>{language === 'fr' ? 'Protocole de stricte confidentialité (NDA)' : 'Strict NDA Protocol'}</span>
            </span>

            <button
              onClick={handleCopyTranscript}
              className="text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>
                {copied
                  ? language === 'fr'
                    ? 'Synthèse copiée !'
                    : 'Copied!'
                  : language === 'fr'
                    ? 'Copier la transcription'
                    : 'Copy chat transcript'}
              </span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{language === 'fr' ? 'Permanence : Lun-Ven 08h-18h CAT' : 'Office hours: Mon-Fri 08:00-18:00 CAT'}</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold transition-colors cursor-pointer"
          >
            {language === 'fr' ? 'Fermer' : 'Close'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
