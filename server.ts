import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

// Candidate models for fallback cascade
const GEMINI_TEXT_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-2.5-pro',
  'gemini-1.5-pro'
];

/**
 * Executes a Gemini content generation call with multi-model fallback cascade.
 */
async function generateGeminiContentWithFallback(
  ai: GoogleGenAI,
  params: {
    contents: any;
    systemInstruction?: string;
    temperature?: number;
    topP?: number;
  }
): Promise<string> {
  let lastError: any = null;

  for (const modelName of GEMINI_TEXT_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: params.contents,
        config: {
          systemInstruction: params.systemInstruction,
          temperature: params.temperature ?? 0.7,
          topP: params.topP ?? 0.95,
        },
      });

      if (response && response.text) {
        return response.text;
      }
    } catch (err: any) {
      lastError = err;
      const errMsg = err?.message || String(err);
      console.warn(`[Gemini API] Model ${modelName} unavailable/busy, cascading to next model: ${errMsg}`);
      // Continue to next available model in cascade
    }
  }

  throw lastError || new Error('All Gemini models were temporarily unavailable');
}

/**
 * Intelligent contextual fallback response generator when AI endpoints are unreachable.
 */
function getContextualFallbackChatReply(message: string, language: string = 'fr'): string {
  const q = (message || '').toLowerCase();

  // Why automation / What is it / How it works / Objectives & Benefits
  if (
    q.includes('c\'est quoi') ||
    q.includes('qu\'est-ce') ||
    q.includes('pourquoi') ||
    q.includes('comment ca marche') ||
    q.includes('comment ça marche') ||
    q.includes('avantage') ||
    q.includes('objectif') ||
    q.includes('role') ||
    q.includes('rôle') ||
    q.includes('important') ||
    q.includes('comprendre') ||
    q.includes('business') ||
    q.includes('n8n') ||
    q.includes('automat') ||
    q.includes('workflow') ||
    q.includes('temps') ||
    q.includes('gain') ||
    q.includes('processus')
  ) {
    return language === 'fr'
      ? `### 💡 Pourquoi & Comment l'Automatisation Révolutionne Votre Entreprise ?

L'**automatisation des processus** consiste à interconnecter vos logiciels d'entreprise (CRM, ERP, WhatsApp, Tableurs Excel/Google Sheets, passerelles Mobile Money, emails) pour que vos tâches répétitives s'exécutent seules, sans intervention manuelle et sans erreur.

---

### ⚙️ 1. Comment ça fonctionne concrètement ?
Un flux automatisé fonctionne selon une logique en **3 étapes simples** :
1. **Le Déclencheur (Trigger) :** Un événement se produit *(ex. : un prospect écrit sur WhatsApp, une commande est validée, un paiement M-Pesa est reçu)*.
2. **Le Traitement Métier :** Le système (orchestré par **n8n**) applique instantanément vos règles de gestion, calcule les montants ou met à jour la base de données.
3. **Les Actions Automatiques :** La facture PDF est émise, les stocks sont ajustés, le reçu est renvoyé au client sur WhatsApp et le manager reçoit une alerte financière.

---

### 🎯 2. Quels sont les objectifs majeurs pour votre business ?
- **Gagner 15 à 30 heures par semaine** par collaborateur en éliminant les saisies manuelles et les copier-coller.
- **Zéro erreur de facturation & de stock :** Plus d'oubli d'encaissement, de doublon ou de devis égaré.
- **Réactivité commerciale 24/7 :** Répondre à un client ou émettre un devis en 5 secondes au lieu de 24 heures.
- **Traçabilité financière totale :** Réconciliation automatique entre les encaissements Mobile Money (M-Pesa, Orange Money, Airtel, MTN) et votre comptabilité.
- **Scalabilité sans surcoût :** Traiter 10 fois plus de clients sans avoir à multiplier vos effectifs de saisie.

---

### 🚀 Passez à l'action :
Souhaitez-vous lancer un **Cadrage de Projet Express** pour cartographier vos processus ou échanger directement avec nos consultants seniors sur **WhatsApp (+243 854 532 239)** ?`
      : `### 💡 Why & How Business Automation Drives Exponential Growth

**Workflow Automation** seamlessly connects your core business tools (CRM, ERP, WhatsApp, Excel/Google Sheets, Mobile Money gateways, invoicing) so that routine, time-consuming operations execute automatically without manual errors.

---

### ⚙️ 1. How does it work in practice?
Every automated workflow follows an efficient **3-step mechanism**:
1. **The Trigger:** An event happens *(e.g., a lead messages on WhatsApp, an order is approved, or an M-Pesa payment is received)*.
2. **Business Logic Execution:** **n8n** verifies information, runs business rules, and syncs across your systems.
3. **Automated Actions:** An official PDF invoice is generated, inventory is updated in your ERP, an instant confirmation is sent to the client, and an alert is delivered to your finance team.

---

### 🎯 2. Key Objectives & Benefits for Your Enterprise:
- **Save 15 to 30 hours per week** per team member by eliminating manual data entry.
- **Eliminate costly human errors :** Prevent invoicing discrepancies and lost orders.
- **Instant 24/7 client response :** Qualify leads and issue quotations in seconds.
- **Automated financial reconciliation :** Connect Mobile Money payment rails directly into accounting.
- **Scalability :** Handle 10x more transactions without linear headcount growth.

Would you like to run a project scoping diagnostic or speak directly with our senior advisory team on **WhatsApp (+243 854 532 239)**?`;
  }

  if (q.includes('solaire') || q.includes('solar') || q.includes('ecoflow') || q.includes('sun king') || q.includes('katanga') || q.includes('kasaï') || q.includes('energie') || q.includes('energy')) {
    return language === 'fr'
      ? `**Sechel Consulting** dispose d'une expertise reconnue en structuration énergétique et solutions solaires hors-réseau en RDC et Afrique subsaharienne :\n\n☀️ **Conforta Energy :** Structuration de l'unité solaire de 0 à plus de 210 000 $ de chiffre d'affaires dès l'an 1 dans le Grand Katanga.\n☀️ **USAID (Initiative Heta) :** Déploiement et supervision logistique de 200 centres de santé solaires dans le Grand Kasaï.\n☀️ **Partenariats industriels :** Déploiement EcoFlow, Sun King et modèles de financement PAYG.\n\nQuel est votre objectif d'installation ou de distribution commerciale ?`
      : `**Sechel Consulting** holds recognized track record in renewable energy structuring and off-grid solar across DRC:\n\n☀️ **Conforta Energy:** Scaled solar division from 0 to $210K+ revenue in Year 1 across Katanga.\n☀️ **USAID (Heta Initiative):** Solar deployment across 200 rural health clinics in Greater Kasai.\n\nHow can our advisory team assist your solar deployment or commercial distribution goals?`;
  }

  if (q.includes('cabinet') || q.includes('sechel') || q.includes('consulting') || q.includes('equipe') || q.includes('service') || q.includes('qui')) {
    return language === 'fr'
      ? `**Sechel Consulting** est un cabinet international de conseil en stratégie, ingénierie d'affaires et déploiement opérationnel opérant en RDC (Lubumbashi) et en Afrique subsaharienne.\n\n🏢 **Nos pôles d'excellence :**\n- **Automatisation des Processus & n8n :** Élimination des goulots d'étranglement et gain de 15 à 30h/semaine\n- **Structuration Solaire & Énergie :** Partenariats EcoFlow, Sun King, B2B minier\n- **Conformité & Gouvernance :** Droit des affaires OHADA, agréments sous-traitance ARSP\n- **Expansion Panafricaine :** Accords distributeurs et pénétration de marché dans 9 pays\n\nSouhaitez-vous échanger avec l'un de nos consultants seniors ?`
      : `**Sechel Consulting** is an international strategy, business engineering, and operations advisory firm operating in the DRC (Lubumbashi) and Sub-Saharan Africa.\n\n🏢 **Core Capabilities:**\n- **Workflow Automation & Systems :** Saving 15 to 30h/week across corporate operations\n- **Clean Energy & Infrastructure :** EcoFlow, Sun King partnerships, mining B2B\n- **Regulatory & Governance :** OHADA corporate framework, ARSP subcontracting\n- **Pan-African Expansion :** Distributor frameworks and commercial scaling across 9 countries\n\nWould you like to schedule a consultation with our advisory partners?`;
  }

  return language === 'fr'
    ? `Bonjour ! Je suis **Merveille**, conseillère stratégique chez Sechel Consulting.\n\nNous accompagnons les dirigeants et entreprises dans :\n1. **L'automatisation des flux opérationnels avec n8n** (gain de 15 à 30h/semaine, zéro erreur de saisie)\n2. **La structuration solaire et projets énergétiques** (EcoFlow, Sun King, B2B)\n3. **La conformité ARSP/OHADA et l'implantation en RDC**\n\nComment pouvons-nous vous aider aujourd'hui ? Vous pouvez aussi joindre directement nos consultants au +243 854 532 239.`
    : `Hello! I am **Merveille**, strategic advisor at Sechel Consulting. We support organizations in workflow automation (n8n), clean energy structuring, and pan-African market expansion. How can we assist your business today?`;
}

const MERVEILLE_SYSTEM_INSTRUCTION = `Tu es "Merveille", la conseillère stratégique d'affaires et assistante interactive officielle du cabinet de conseil Sechel Consulting.

MISSION PRINCIPALE & POSTURE COMMERCIALE :
- Ton rôle est de conseiller les dirigeants, directeurs généraux, directeurs des opérations et entrepreneurs d'Afrique subsaharienne sur la rentabilité, l'efficacité opérationnelle et la croissance de leur entreprise.
- Tu dois faire comprendre de manière éclatante, pédagogique, concrète et persuasive :
  1. CE QU'EST L'AUTOMATISATION DES PROCESSUS MÉTIERS.
  2. COMMENT ÇA FONCTIONNE CONCRÈTEMENT (Déclencheur -> Traitement logique n8n -> Actions automatiques multi-outils).
  3. POUR QUELS OBJECTIFS ET AVEC QUELS RÉSULTATS (ROI chiffré, économie de 15 à 30h/semaine, zéro erreur manuelle, réactivité 24/7, traçabilité financière).
  4. EN QUOI C'EST VITAL pour la compétitivité et la rentabilité de leur business.
- STYLE DE COMMUNICATION : Professionnel, institutionnel, pragmatique et orienté business. Utilise des termes d'affaires clairs (interconnexion logicielle, cartographie de processus, n8n, passerelles de paiement, automatisation de facturation, réconciliation bancaire). Évite de jargonner ou de survendre l'acronyme "IA" : privilégie des explications concrètes sur les gains opérationnels et financiers.

CADRE PÉDAGOGIQUE SUR L'AUTOMATISATION DES AFFAIRES :
- Définition : L'automatisation consiste à relier automatiquement entre eux tous les outils informatiques d'une entreprise (CRM, ERP, WhatsApp Business, tableurs Excel/Google Sheets, passerelles Mobile Money, boîtes emails, facturation) pour que les flux d'information circulent sans ressaisie humaine.
- Les 3 étapes d'un workflow automatisé :
  * Étape 1 : Le Déclencheur (Trigger) - Un événement survient (message client WhatsApp, nouvelle commande, paiement Mobile Money, signature de contrat).
  * Étape 2 : Le Traitement & la Logique métier (n8n) - Le moteur applique instantanément les règles de gestion (calcul de TVA/remise, validation de solvabilité, vérification de stock).
  * Étape 3 : Les Actions automatiques - Génération immédiate de facture PDF, mise à jour du CRM/ERP, envoi du reçu au client par WhatsApp/Email et notification à la comptabilité.
- Les 5 Grands Bénéfices pour le Dirigeant :
  1. Gain de temps massif : 15 à 30 heures économisées chaque semaine par équipe.
  2. Élimination totale des erreurs de saisie et des oublis de relance.
  3. Réponse client instantanée (24h/24, 7j/7) qui multiplie par 3 les taux de conversion.
  4. Rapprochement automatique des flux financiers Mobile Money (Orange Money, M-Pesa, MTN MoMo, Airtel).
  5. Scalabilité : Capacité d'absorber une croissance x10 de l'activité sans explosion des charges fixes de personnel.

À PROPOS DU CABINET SECHEL CONSULTING :
- Identité : Cabinet international de conseil en stratégie, ingénierie d'affaires et déploiement opérationnel fondé par une équipe de consultants seniors chevronnés formés aux standards internationaux d'excellence stratégique.
- Présence & Hubs : Siège opérationnel RDC à Lubumbashi (Boulevard M'siri), bureau régional à Douala (Cameroun) et coordination partenariats à Johannesburg (Afrique du Sud).
- Références & Réalisations :
  * Conforta Energy : Structuration complète de l'unité commerciale solaire, passage de 0 à plus de 210 000 $ de chiffre d'affaires rentable dès la 1ère année dans le Grand Katanga (Lubumbashi, Kolwezi).
  * USAID (Initiative Heta) : Électrification et supervision logistique de 200 centres de santé ruraux dans le Grand Kasaï (2 400 km de logistique complexe).
  * Partenariats Industriels & Technologiques : EcoFlow, Sun King, Vodacom (M-Pesa), Orange (Orange Money), MTN MoMo, Huawei, Comviva, Mondia, Content Connect Africa (CCA).
  * Conformité Réglementaire RDC : Maîtrise éprouvée du cadre OHADA, de la loi ARSP sur la sous-traitance à capitaux majoritairement congolais, du code minier et des régimes fiscaux d'investissement.

PÔLES D'EXPERTISE & SERVICES DU CABINET :
1. Automatisation des Processus Métiers & n8n (SERVICE VEDETTE) :
   - Mise en place de flux de travail automatisés sur mesure avec n8n (auto-hébergé sécurisé sur serveur dédié ou Cloud), Make, APIs REST et connecteurs métiers.
   - Synchronisation bidirectionnelle CRM (HubSpot, Salesforce, Pipedrive), ERP, gestion des stocks, facturation et devis automatiques.
   - Passerelles d'automatisation des paiements Mobile Money (Orange Money, M-Pesa, MTN MoMo, Airtel) et rapprochement bancaire quotidien.
   - Assistants conversationnels WhatsApp Business / Web connectés aux catalogues et bases de données de l'entreprise pour qualifier les prospects et traiter les demandes clients 24/7.
2. Structuration Commerciale Solaire & Énergies Renouvelables (EcoFlow, Sun King, modèles PAYG, B2B minier et commercial).
3. Gestion de Projet & Développement Institutionnel (USAID, Bailleurs de fonds, standards PMI/Agile).
4. Architecture Opérationnelle & Design de Systèmes (SOPs, cartographie des flux, digitalisation).
5. Stratégie de Marque & Positionnement de Marché (B2B, retail, kits de vente distributeurs).
6. Expansion de Marché & Stratégie de Distribution Panafricaine (9 pays africains couverts).

CONSEILS ET INTERACTIONS AVEC LE VISITEUR :
- Réponds avec clarté, pertinence et structure aux questions des visiteurs.
- Mets en valeur l'utilité pratique de l'automatisation pour leur entreprise selon leur secteur (commerce, mines, distribution, services, énergie).
- Propose au visiteur d'utiliser le "Formulaire de Cadrage de Projet" interactif pour cartographier ses processus actuels et recevoir une estimation de gains.
- Propose également d'échanger directement avec nos consultants seniors via WhatsApp au +243 854 532 239 ou par email à contact@sechelconsulting.com.`;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Sechel Consulting Backend', bot: 'Merveille' });
});

// Chat endpoint for Merveille AI
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [], language = 'fr' } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback response if API key is not configured yet
      const fallbackReply = language === 'fr'
        ? `Bonjour ! Je suis Merveille, conseillère stratégique chez Sechel Consulting. Je peux vous orienter sur nos expertises : l'automatisation des processus avec n8n (gain de 15-30h/semaine), la structuration solaire hors-réseau (EcoFlow, Sun King), la conformité ARSP/OHADA et notre accompagnement en management stratégique. Vous pouvez également lancer un cadrage interactif ou contacter nos consultants sur WhatsApp au +243 854 532 239.`
        : `Hello! I am Merveille, strategic advisor at Sechel Consulting. I can guide you through our core capabilities: n8n workflow automation (saving 15-30h/week), off-grid solar structuring (EcoFlow, Sun King), ARSP/OHADA regulatory compliance, and senior advisory services. You can also run an interactive scoping diagnostic or contact our advisory team on WhatsApp.`;
      
      res.json({ reply: fallbackReply });
      return;
    }

    // Build contents for Gemini
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    // Append prior history if available
    for (const item of conversationHistory.slice(-8)) {
      if (item.sender === 'user') {
        contents.push({ role: 'user', parts: [{ text: item.text }] });
      } else if (item.sender === 'bot') {
        contents.push({ role: 'model', parts: [{ text: item.text }] });
      }
    }

    // Append current user message
    contents.push({ role: 'user', parts: [{ text: message }] });

    // Execute via multi-model fallback cascade
    let replyText = '';
    try {
      replyText = await generateGeminiContentWithFallback(ai, {
        contents: contents,
        systemInstruction: MERVEILLE_SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
      });
    } catch (genError) {
      console.warn('[Gemini API] All models busy/failed in /api/gemini/chat, activating intelligent fallback:', genError);
      replyText = getContextualFallbackChatReply(message, language);
    }

    res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Error in /api/gemini/chat:', error);
    const safeFallback = getContextualFallbackChatReply('', 'fr');
    res.json({
      reply: safeFallback,
      warning: 'Fallback mode active'
    });
  }
});

// Interactive AI Scoping & Process Mapping Generation Endpoint
app.post('/api/gemini/scoping', async (req, res) => {
  try {
    const {
      serviceId,
      serviceTitle,
      companyName,
      contactName,
      roleTitle,
      country,
      teamSize,
      industry,
      targetProcesses = [],
      toolsList = [],
      dailyVolume,
      weeklyHoursLost,
      currentTools,
      painPoints,
      mainTrigger,
      outputDestinations,
      hostingPreference,
      aiIntegrationPreference,
      goals,
      budgetRange,
      timeline,
      language = 'fr'
    } = req.body;

    const ai = getGeminiClient();

    const isAutomation = serviceId === 'workflow-automation-n8n-ai' || targetProcesses.length > 0;

    const scopingPrompt = `Tu es le Directeur de la Stratégie & de l'Ingénierie Opérationnelle chez Sechel Consulting.
Rédige un DOSSIER STRATÉGIQUE COMPLET DE CADRAGE & CARTOGRAPHIE DES PROCESSUS (Cahier des charges opérationnel et retour sur investissement) à destination du client et des associés de Sechel Consulting.

DONNÉES DU QUESTIONNAIRE CLIENT :
- Service concerné : ${serviceTitle || serviceId}
- Entreprise : ${companyName || 'Structure Privée'}
- Responsable du Projet : ${contactName || 'Responsable Opérations'} (${roleTitle || 'Direction'})
- Pays & Villes d'opération : ${country || 'RDC / Afrique subsaharienne'}
- Secteur d'activité : ${industry || 'Commerce / Distribution / Services'}
- Taille d'équipe concernée : ${teamSize || '5 - 25 collaborateurs'}
- Processus prioritaires à automatiser : ${Array.isArray(targetProcesses) && targetProcesses.length > 0 ? targetProcesses.join(', ') : 'Synchronisation commandes, facturation et relances'}
- Écosystème & Outils actuels : ${Array.isArray(toolsList) && toolsList.length > 0 ? toolsList.join(', ') : currentTools || 'Excel, WhatsApp, Saisie Manuelle'}
- Volumétrie quotidienne moyenne : ${dailyVolume || '20 à 50 dossiers / jour'}
- Temps humain actuellement perdu par semaine : ${weeklyHoursLost || '15 à 25 heures/semaine'}
- Goulots d'étranglement & erreurs actuelles : ${painPoints || 'Ressaisies manuelles, retards de devis/facturation, oublis de relance'}
- Déclencheur principal souhaité (Trigger) : ${mainTrigger || 'Nouveau message WhatsApp client / Nouvelle commande'}
- Destination des données (Outputs) : ${outputDestinations || 'Mise à jour CRM/ERP, envoi reçu client WhatsApp, alerte direction'}
- Préférence d'infrastructure : ${hostingPreference || 'Cloud Sécurisé & Haute Disponibilité'}
- Intégration logicielle & connecteurs : ${aiIntegrationPreference || 'Assistant interactif WhatsApp 24/7 + Extraction automatique des données'}
- Objectif stratégique global : ${goals || 'Éliminer les tâches manuelles, fiabiliser la facturation et accélérer la croissance'}
- Budget envisagé : ${budgetRange || '3 000 $ - 10 000 $ USD'}
- Échéance de déploiement : ${timeline || 'Sous 30 à 60 jours'}
- Langue : ${language === 'en' ? 'Anglais' : 'Français'}

EXIGENCE DE STRUCTURE DU DOCUMENT :
Rédige un rapport exécutif, commercial et structuré avec les sections suivantes :

### 📋 1. FICHE SYNTHÈSE DU PROJET & OBJECTIFS COMMERCIAUX
- Contexte de ${companyName || 'l\'entreprise'} et diagnostic des frictions identifiées.
- Objectif cible de l'automatisation et impact sur la croissance.

### 🔍 2. CARTOGRAPHIE AS-IS (Processus Actuel & Frictions Financières)
- Analyse des étapes manuelles actuelles (Saisie -> Validation -> Envoi -> Contrôle).
- Coût de l'inefficacité (Temps perdu : ${weeklyHoursLost || '20h/semaine'}, pertes de chiffre d'affaires et retards de facturation).

### ⚙️ 3. ARCHITECTURE CIBLE DES FLUX AUTOMATISÉS (To-Be Workflow)
- **Déclencheur d'Entrée (Trigger) :** Automatisation instantanée dès l'action client (WhatsApp, commande web, encaissement Mobile Money).
- **Logique de Traitement Métier :** Règles de validation automatique, calculs, filtrage des doublons et routage sans intervention humaine.
- **Connecteurs & Intégrations :** Synchronisation bidirectionnelle avec les outils existants (CRM, ERP, tableurs), passerelles de paiement et génération instantanée de factures PDF.
- **Sécurité, Alertes & Supervision :** Suivi en temps réel des transactions, alertes instantanées en cas d'anomalie et sécurité des données.

### 📊 4. GAINS MESURABLES & ANALYSE DE RENTABILITÉ (ROI)
- Heures de travail économisées par semaine (chiffrage précis : ex. 18 à 28h/semaine).
- Élimination complète des erreurs de ressaisie et accélération de la trésorerie.
- Délai d'amortissement de l'investissement (ROI positif en moins de 45 jours).

### 🗺️ 5. FEUILLE DE ROUTE DE DÉPLOIEMENT SECHEL (4 Semaines)
- **Semaine 1 (Cadrage & Audit fin) :** Validation des flux de données et cartographie des connecteurs.
- **Semaine 2 (Construction des Flux) :** Assemblage de l'architecture et paramétrage des règles métier.
- **Semaine 3 (Tests & Intégration Mobile Money) :** Validation des webhooks en conditions réelles et tests de charge.
- **Semaine 4 (Mise en production, Recette & Formation) :** Déploiement en production, formation des équipes et remise du dossier.

Sois précis, professionnel, avec un ton institutionnel, commercial et pragmatique.`;

    const fallbackReport = language === 'fr'
      ? `### 📋 1. FICHE SYNTHÈSE DU PROJET & OBJECTIFS
Pour **${companyName || 'votre entreprise'}** (${country || 'RDC'}), ce projet d'automatisation sur le pôle **${serviceTitle || 'Automatisation n8n & IA'}** vise à standardiser et interconnecter l'ensemble de vos flux opérationnels (${Array.isArray(toolsList) ? toolsList.join(', ') : currentTools || 'Excel, WhatsApp, CRM'}).

### 🔍 2. CARTOGRAPHIE AS-IS (Processus Actuel & Goulots)
- **Flux actuel :** Saisie manuelle récurrente sur ${currentTools || 'Excel/WhatsApp'}, vérification manuelle des transactions et relances client non systématisées.
- **Impact mesuré :** Environ ${weeklyHoursLost || '15 à 25 heures'} de temps perdu par semaine et risque d'erreurs de facturation ou de double saisie.

### ⚙️ 3. SPÉCIFICATIONS TECHNIQUES DU MAPPING TO-BE (Architecture n8n)
- **Nœud Déclencheur (Trigger) :** ${mainTrigger || 'Webhook temps réel sur événement WhatsApp / Formulaire / Commande'}.
- **Logique & Transformation :** Nœud de normalisation des données JSON, filtrage des doublons et validation des montants.
- **Connecteurs d'Intégration :**
  * Connecteur CRM/ERP pour mise à jour instantanée des fiches clients.
  * Passerelle de paiement Mobile Money (M-Pesa / Orange Money / Airtel) pour confirmation instantanée.
  * Génération automatique de bons de commande / factures sécurisées.
- **Module IA :** Agent intelligent pour qualification automatique des demandes et routage contextuel.
- **Sécurité & Fallback :** Nœud d'erreur n8n (Error Trigger) avec notification instantanée des administrateurs.

### 📊 4. GAINS MESURABLES & ANALYSE DU ROI
- **Temps économisé :** ${weeklyHoursLost || '18 à 25h/semaine'} restituées aux équipes commerciales.
- **Fiabilité opérationnelle :** 99% d'élimination des erreurs manuelles de transcription.
- **Délai de rentabilité (ROI) :** Amortissement complet sous 45 jours.

### 🗺️ 5. FEUILLE DE ROUTE DE DÉPLOIEMENT SECHEL (4 Semaines)
1. **Semaine 1 :** Cartographie exhaustive des champs de données et paramétrage de l'instance n8n.
2. **Semaine 2 :** Développement des flux principaux et interconnexion des APIs.
3. **Semaine 3 :** Tests unitaires, validation des webhooks et intégration Mobile Money.
4. **Semaine 4 :** Recette finale avec vos équipes, formation utilisateurs et mise en production.`
      : `### 📋 1. EXECUTIVE SUMMARY & OBJECTIVES
For **${companyName || 'your organization'}** (${country || 'Africa'}), this automation project establishes end-to-end operational orchestration across your tech stack.

### 🔍 2. AS-IS PROCESS MAPPING & BOTTLENECK AUDIT
- **Current Flow :** Manual processing across ${currentTools || 'Excel & WhatsApp'}, causing delays in order fulfillment and cash reconciliation.
- **Quantified Loss :** Estimated ${weeklyHoursLost || '15-25 hours'} wasted weekly on repetitive tasks.

### ⚙️ 3. TO-BE TECHNICAL MAPPING (n8n Architecture)
- **Trigger Node :** ${mainTrigger || 'Real-time Webhook from incoming lead or order'}.
- **Data Transformation :** JSON schema standardization, duplicate filters, and automated validation.
- **API Nodes :** Direct synchronization with CRM/ERP, Mobile Money payment gateways, and automated PDF invoice generator.
- **Security & Error Handling :** Error trigger with instant incident reporting.

### 📊 4. MEASURABLE GAINS & ROI ESTIMATION
- **Time Saved :** 18 to 25 hours per week.
- **Accuracy :** 99% error elimination in transactions.
- **ROI Payback :** Positive ROI achieved in under 45 days.

### 🗺️ 5. 4-WEEK IMPLEMENTATION ROADMAP
1. **Week 1 :** Data schema mapping & n8n environment setup.
2. **Week 2 :** Workflow node construction & business logic scripting.
3. **Week 3 :** Webhook stress-testing & payment gateway integration.
4. **Week 4 :** User acceptance testing, staff training, and live deployment.`;

    const fallbackWorkflowJson = {
      name: `Sechel_Workflow_${(companyName || 'Client').replace(/\s+/g, '_')}`,
      nodes: [
        {
          name: "Webhook Trigger",
          type: "n8n-nodes-base.webhook",
          parameters: { httpMethod: "POST", path: "sechel-intake-webhook" },
          position: [250, 300]
        },
        {
          name: "Filter & Validation",
          type: "n8n-nodes-base.if",
          parameters: { conditions: { string: [{ value1: "={{ $json.body.valid }}", value2: "true" }] } },
          position: [450, 300]
        },
        {
          name: "CRM / Database Sync",
          type: "n8n-nodes-base.httpRequest",
          parameters: { method: "POST", url: "https://api.crm.internal/v1/sync" },
          position: [650, 200]
        },
        {
          name: "Mobile Money / Payment Gateway",
          type: "n8n-nodes-base.httpRequest",
          parameters: { method: "POST", url: "https://api.mobilemoney.rails/verify" },
          position: [650, 400]
        },
        {
          name: "WhatsApp Notification Agent",
          type: "n8n-nodes-base.httpRequest",
          parameters: { method: "POST", url: "https://api.whatsapp.business/messages" },
          position: [850, 300]
        },
        {
          name: "Error Catcher & Alert",
          type: "n8n-nodes-base.errorTrigger",
          position: [250, 500]
        }
      ]
    };

    if (!ai) {
      res.json({
        report: fallbackReport,
        workflowSchemaJson: JSON.stringify(fallbackWorkflowJson, null, 2),
        estimatedHoursSaved: weeklyHoursLost ? `${weeklyHoursLost}` : '20h/semaine',
        estimatedRoiDays: '45 jours',
        recommendedStack: ['n8n Self-Hosted / Cloud', 'Webhooks & REST APIs', 'CRM/ERP Sync', 'WhatsApp Business API', 'Mobile Money Rails']
      });
      return;
    }

    let reportText = '';
    try {
      reportText = await generateGeminiContentWithFallback(ai, {
        contents: scopingPrompt,
        systemInstruction: MERVEILLE_SYSTEM_INSTRUCTION,
        temperature: 0.6,
      });
    } catch (genErr) {
      console.warn('[Gemini API] Scoping model fallback active due to high demand:', genErr);
      reportText = fallbackReport;
    }

    if (!reportText) {
      reportText = fallbackReport;
    }

    const workflowSchemaJson = {
      name: `Sechel_Workflow_${(companyName || 'Client').replace(/[^a-zA-Z0-9]/g, '_')}`,
      version: "1.0",
      description: `Architecture de cartographie automatisée générée par Sechel Consulting pour ${companyName || 'Client'}`,
      author: "Sechel Consulting Systems Engineering Practice",
      createdAt: new Date().toISOString(),
      metadata: {
        industry: industry || 'Commerce / Distribution',
        country: country || 'RDC',
        targetProcesses: targetProcesses,
        toolsList: toolsList,
        dailyVolume: dailyVolume,
        trigger: mainTrigger,
        output: outputDestinations,
        hosting: hostingPreference,
        aiEngine: aiIntegrationPreference
      },
      nodes: [
        {
          name: "Main Trigger (Webhook / Event)",
          type: "n8n-nodes-base.webhook",
          parameters: { httpMethod: "POST", path: "sechel-intake-pipeline" },
          position: [200, 300]
        },
        {
          name: "Data Normalizer & Sanitizer",
          type: "n8n-nodes-base.code",
          parameters: { language: "javaScript" },
          position: [400, 300]
        },
        {
          name: "Business Rules & Conditional Switch",
          type: "n8n-nodes-base.switch",
          position: [600, 300]
        },
        {
          name: "CRM / Database Upsert",
          type: "n8n-nodes-base.httpRequest",
          position: [800, 200]
        },
        {
          name: "Mobile Money & Payment Reconciliation",
          type: "n8n-nodes-base.httpRequest",
          position: [800, 400]
        },
        {
          name: "WhatsApp / Email Client Dispatcher",
          type: "n8n-nodes-base.httpRequest",
          position: [1000, 300]
        },
        {
          name: "Global Error Trigger & Sentry/Telegram Alert",
          type: "n8n-nodes-base.errorTrigger",
          position: [200, 500]
        }
      ]
    };

    res.json({
      report: reportText,
      workflowSchemaJson: JSON.stringify(workflowSchemaJson, null, 2),
      estimatedHoursSaved: weeklyHoursLost || '18 - 28h/semaine',
      estimatedRoiDays: '30 - 45 jours',
      recommendedStack: ['n8n Self-Hosted / Cloud', 'API Gateways', 'CRM/ERP Sync', 'WhatsApp Business API', 'Mobile Money Rails']
    });
  } catch (error: any) {
    console.error('Error in /api/gemini/scoping:', error);
    res.status(500).json({
      error: 'Failed to generate scoping report',
      details: error?.message || 'Unknown error',
    });
  }
});

// Configure Vite middleware in development or serve static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Sechel Consulting] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
