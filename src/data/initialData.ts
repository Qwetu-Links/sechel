import { CaseStudy, ServiceItem, BlogPost, Testimonial, ContactSubmission, SEOSettings } from '../types';
import ecoflowProjectImage from '../components/img/555111457_122144848148860707_3377347782451543940_n.jpg';
import confortProjectImage from '../components/img/542716549_122140304324860707_5218000447467699572_n.jpg';

export const COMPANY_INFO = {
  name: 'Sechel Consulting',
  tagline: 'STRATEGY • STRUCTURING • OPERATIONAL EXCELLENCE',
  corporateType: {
    fr: "Cabinet International de Conseil en Stratégie, Ingénierie d'Affaires & Déploiement Opérationnel",
    en: 'International Strategy, Business Engineering & Operations Advisory Firm'
  },
  accreditation: {
    fr: 'Conformité Réglementaire OHADA • Sous-traitance ARSP RDC • Accords Économiques Panafricains',
    en: 'OHADA Business Law Compliance • DRC ARSP Subcontracting Certified • Pan-African Trade Frameworks'
  },
  definition: {
    fr: "Cabinet international d'ingénierie stratégique, financière et opérationnelle. Sechel Consulting accompagne les investisseurs institutionnels, multinationales, bailleurs de fonds et champions industriels dans la pénétration de marché, la structuration de filières énergétiques hors-réseau et l'accélération de la performance commerciale en RDC et en Afrique subsaharienne.",
    en: "An international strategic, financial, and operational advisory firm. Sechel Consulting partners with institutional investors, multinationals, development agencies, and industrial leaders to execute market expansion, structure off-grid clean energy ecosystems, and drive commercial performance across the DRC and Sub-Saharan Africa."
  },
  missionStatement: {
    fr: "Notre cabinet refuse le conseil purement théorique : nous déployons une ingénierie de terrain rigoureuse, structurons des unités d'affaires viables et garantissons un retour sur investissement mesurable dès les premières phases d'exploitation commerciale.",
    en: "Our firm rejects purely theoretical consulting. We deploy rigorous on-the-ground execution, structure resilient business units, and deliver measurable ROI from the earliest operational phases."
  },
  heroHeadline: {
    fr: "Conseil en Stratégie, Ingénierie Financière & Déploiement Opérationnel en Afrique",
    en: "Strategy Consulting, Financial Structuring & Operational Execution in Africa"
  },
  heroSubheadline: {
    fr: "Accompagnement de haut niveau pour l'expansion de marché, la structuration d'énergies renouvelables, la conformité réglementaire et l'excellence logistique à Lubumbashi, en RDC et en Afrique centrale & australe.",
    en: "Executive advisory in market penetration, clean energy structuring, regulatory compliance, and last-mile operations across Lubumbashi, the DRC, and Central & Southern Africa."
  },
  contacts: {
    email: 'contact@sechelconsulting.com',
    phone: '+243 997 452 890',
    altPhone: '+27 11 884 5200',
    whatsapp: '+243997452890',
    addresses: [
      {
        city: 'Lubumbashi (HQ RDC)',
        country: 'République Démocratique du Congo',
        street: "142 Boulevard M'siri, Quartier Makomeno",
        detail: 'Direction Régionale Katanga & Grands Lacs • Pôle Mines & CleanTech'
      },
      {
        city: 'Douala',
        country: 'Cameroun',
        street: 'Immeuble Akwa Tower, Boulevard de la Liberté, face BEAC',
        detail: 'Bureau Régional Afrique Centrale • Pôle Industrie & CEMAC'
      },
      {
        city: 'Johannesburg',
        country: 'Afrique du Sud',
        street: 'Nelson Mandela Square, Sandton, 2196',
        detail: 'Coordination Partenariats Internationaux & FinTech'
      }
    ]
  },
  stats: [
    { value: '$4.5M+', label: { fr: "Volume d'affaires structuré & généré", en: "Gross Revenue Structured & Scaled" } },
    { value: '200+', label: { fr: 'Centres de santé & infrastructures électrifiés', en: 'Off-grid Health Facilities & Hubs Equipped' } },
    { value: '9', label: { fr: 'Marchés africains cartographiés & pénétrés', en: 'African Markets Researched & Penetrated' } },
    { value: '99.4%', label: { fr: "Taux de conformité & d'exécution terrain", en: 'Field Execution & Governance Rate' } }
  ]
};

export const PARTNERS_LOGOS = [
  { name: 'EcoFlow', category: 'Energy Tech', note: 'Katanga Market Integration', logoUrl: '/assets/logos/ecoflow.png' },
  { name: 'Sun King', category: 'Solar BoP', note: 'Francophone Expansion', logoUrl: '/assets/logos/sunking.png' },
  { name: 'Orange', category: 'Telecom & MoMo', note: 'Distribution Partner', logoUrl: '/assets/logos/orange.svg' },
  { name: 'Vodacom', category: 'Telecom & M-Pesa', note: 'Strategic Alliance', logoUrl: '/assets/logos/vodacom.svg' },
  { name: 'MTN MoMo', category: 'Mobile Money', note: 'Payment Gateway Integration', logoUrl: '/assets/logos/mtn.svg' },
  { name: 'Huawei', category: 'Technology', note: 'Infrastructure Advisory', logoUrl: '/assets/logos/huawei.svg' },
  { name: 'USAID', category: 'International Dev', note: 'Health & Energy Kasai', logoUrl: '/assets/logos/usaid.svg' },
  { name: 'YALI', category: 'Leadership Center', note: 'East Africa Leadership Network', logoUrl: '/assets/logos/yali.jpg' },
  { name: 'Conforta Energy', category: 'Renewables', note: 'Venture Scaling $210k+', logoUrl: '/assets/logos/conforta.png' },
  { name: 'Content Connect Africa', category: 'Media & Digital', note: 'Pan-African Licensing', logoUrl: '/assets/logos/cca.png' },
  { name: 'Comviva', category: 'FinTech Tech', note: 'Digital Solutions', logoUrl: '/assets/logos/comviva.svg' },
  { name: 'Mondia', category: 'Digital Services', note: 'Global Content & Distribution', logoUrl: '/assets/logos/mondia.png' }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'workflow-automation-n8n',
    number: '01',
    title: {
      fr: 'Automatisation Commerciale & Efficacité Opérationnelle',
      en: 'Sales & Business Process Automation'
    },
    shortDesc: {
      fr: 'Interconnexion de vos outils du quotidien (WhatsApp, Excel, Mobile Money, ERP) pour supprimer les ressaisies manuelles, diviser par 10 le temps de traitement des commandes et récupérer 15 à 30h/semaine.',
      en: 'Seamlessly interconnect your everyday tools (WhatsApp, Excel, Mobile Money, ERP) to eliminate manual data entry, 10x order processing speed, and recover 15 to 30 hours per week.'
    },
    fullDesc: {
      fr: 'Pourquoi l\'automatisation est indispensable : 80% des retards de facturation et des ventes perdues proviennent de tâches manuelles lentes et répétitives. Nous concevons pour votre entreprise des flux automatisés sur mesure qui relient directement vos canaux de vente (WhatsApp, site web), vos stocks, vos encaissements Mobile Money (M-Pesa, Orange Money, Airtel, MTN) et votre logiciel de gestion. Résultat : vos devis et factures partent en quelques secondes 24h/24, vos comptes sont réconciliés en temps réel et votre équipe se consacre à 100% au développement commercial.',
      en: 'Why automation is critical: 80% of lost sales and billing delays stem from slow, repetitive manual tasks. We engineer tailored automated workflows connecting your sales channels (WhatsApp, web orders), live inventory, Mobile Money payment rails (M-Pesa, Orange Money, Airtel, MTN), and accounting software. Result: instant quotation and invoicing 24/7, real-time financial reconciliation, and teams 100% focused on revenue-generating activities.'
    },
    iconName: 'Cpu',
    colorAccent: 'from-blue-600/10 to-indigo-600/20 text-blue-700',
    deliverables: {
      fr: [
        'Interconnexion fluide de vos outils (WhatsApp, Excel/Google Sheets, CRM & ERP)',
        'Génération et envoi instantanés de devis & factures PDF aux clients',
        'Rapprochement automatique des encaissements Mobile Money & comptabilité',
        'Réponse commerciale et qualification automatique des demandes clients 24/7',
        'Tableaux de bord de suivi d\'activité et alertes financières en temps réel'
      ],
      en: [
        'Seamless integration across existing tools (WhatsApp, Excel, CRM & ERP)',
        'Instant automated quotation & legal PDF invoice generation',
        'Live Mobile Money payment reconciliation & bookkeeping sync',
        '24/7 automated client response & sales inquiry routing',
        'Real-time executive performance dashboards & instant financial alerts'
      ]
    },
    targetClients: {
      fr: ['PME & ETI cherchant à scaler sans surcoût de personnel', 'Distributeurs, logisticiens et importateurs en Afrique', 'Institutions financières, microfinances et scale-ups tech'],
      en: ['High-growth SMEs looking to scale without hiring bloat', 'African Wholesalers, Distributors & Logistics Operators', 'Financial Institutions, Microfinances & Tech Scale-ups']
    },
    keyMetric: '+85%',
    metricLabel: {
      fr: 'Gain de temps opérationnel & élimination des erreurs',
      en: 'Operational Time Saved & Error Elimination'
    }
  },
  {
    id: 'solar-renewable-energy',
    number: '02',
    title: {
      fr: 'Structuration Commerciale Solaire & Énergies Renouvelables',
      en: 'Solar & Renewable Energy Business Structuring'
    },
    shortDesc: {
      fr: 'Conception de modèles économiques hors-réseau (Pay-As-You-Go, B2B, BoP), structuration de chaînes d\'approvisionnement et réseaux d\'installateurs.',
      en: 'Designing off-grid business models (PAYG, B2B, BoP), structuring reliable supply chains, and technical installer dealer networks.'
    },
    fullDesc: {
      fr: 'Expertise unique dans le secteur énergétique en Afrique centrale et de l\'ouest. Nous aidons les marques internationales (EcoFlow, Sun King, etc.) et distributeurs locaux à pénétrer les marchés hors réseau et miniers avec des modèles de rentabilité durables.',
      en: 'Unrivaled expertise in Central and West African energy sectors. We assist global brands (EcoFlow, Sun King, etc.) and regional distributors in capturing off-grid and mining market demand with sustainable commercial models.'
    },
    iconName: 'SunMedium',
    colorAccent: 'from-amber-500/10 to-orange-500/20 text-amber-700',
    deliverables: {
      fr: ['Modélisation financière PAYG & Capex/Opex', 'Structuration de hubs de distribution solaire', 'Formation technique et habilitation des installateurs', 'Partenariats de garantie & SAV régional'],
      en: ['Financial Modeling (PAYG & Capex/Opex)', 'Solar Distribution Hub Architecture', 'Technical Installer Training & Certification', 'Regional Warranty & After-Sales Logistics']
    },
    targetClients: {
      fr: ['Fabricants solaires mondiaux', 'Distributeurs miniers et commerciaux', 'Programmes d\'électrification rurale'],
      en: ['Global Solar Manufacturers', 'Mining & Commercial Distributors', 'Rural Electrification Programs']
    },
    keyMetric: '$2.2M+',
    metricLabel: {
      fr: 'Volume généré dans le secteur solaire en RDC',
      en: 'Gross Solar Volume Scaled in DRC'
    }
  },
  {
    id: 'project-management',
    number: '03',
    title: {
      fr: 'Gestion de Projet & Développement Institutionnel',
      en: 'Project Management & Institutional Development'
    },
    shortDesc: {
      fr: 'Pilotage rigoureux de projets complexes, de la structuration méthodologique à la conformité institutionnelle pour bailleurs et grands comptes.',
      en: 'Rigorous management of high-stakes projects, from structural methodology to institutional compliance for international donors and corporates.'
    },
    fullDesc: {
      fr: 'Nous déployons des cadres méthodologiques éprouvés (PMI/Agile adaptés aux réalités africaines) pour transformer des financements et initiatives complexes en livrables opérationnels concrets, respectant budgets, délais et normes internationales.',
      en: 'We deploy robust project frameworks adapted to African environments to turn complex funding and strategic initiatives into tangible operational milestones, respecting budgets, deadlines, and governance.'
    },
    iconName: 'FolderKanban',
    colorAccent: 'from-emerald-500/10 to-teal-500/20 text-emerald-700',
    deliverables: {
      fr: ['Cahier des charges & gouvernance', 'Gestion des risques & audit opérationnel', 'Rapports bailleurs et KPIs institutionnels', 'Coordination multi-acteurs et gouvernance locale'],
      en: ['Project Governance & Scope Framework', 'Risk Management & Operational Audits', 'Donor Reporting & Institutional KPIs', 'Multi-stakeholder Local Coordination']
    },
    targetClients: {
      fr: ['Organisations internationales', 'Agences de développement (USAID, etc.)', 'Grandes entreprises en restructuration'],
      en: ['International Organizations', 'Development Agencies (USAID, etc.)', 'Corporate Institutions']
    },
    keyMetric: '100%',
    metricLabel: {
      fr: 'Conformité d\'exécution sur le terrain',
      en: 'On-field Execution Compliance'
    }
  },
  {
    id: 'operational-architecture',
    number: '04',
    title: {
      fr: 'Architecture Opérationnelle & Design de Systèmes',
      en: 'Operational Architecture & Systems Design'
    },
    shortDesc: {
      fr: 'Audit, modélisation des processus métier et digitalisation des flux logistiques et comptables pour une résilience opérationnelle absolue.',
      en: 'Audit, business process modeling, and full digitization of logistics and accounting workflows for total operational resilience.'
    },
    fullDesc: {
      fr: 'Nous éliminons les goulots d\'étranglement opérationnels en concevant des systèmes ERP/CRM légers, des protocoles de contrôle d\'inventaire et des structures hiérarchiques adaptées à la croissance rapide sur le continent.',
      en: 'We eliminate operational bottlenecks by designing agile ERP/CRM systems, inventory control protocols, and agile governance structures suited for high-speed African expansion.'
    },
    iconName: 'Network',
    colorAccent: 'from-orange-500/10 to-rose-500/20 text-orange-700',
    deliverables: {
      fr: ['Cartographie des processus & SOPs', 'Mise en place d\'outils de suivi des stocks et ventes', 'Tableaux de bord de direction en temps réel', 'Formation managériale et conduite du changement'],
      en: ['Process Mapping & Standard Operating Procedures', 'Stock & Sales Real-Time Tracking Tools', 'Executive Business Dashboards', 'Managerial Training & Change Management']
    },
    targetClients: {
      fr: ['PME en forte croissance', 'Groupes industriels régionaux', 'Importateurs et distributeurs'],
      en: ['High-Growth SMEs', 'Regional Industrial Groups', 'Importers & Wholesalers']
    },
    keyMetric: '+45%',
    metricLabel: {
      fr: 'Gain d\'efficience opérationnelle moyen',
      en: 'Average Operational Efficiency Boost'
    }
  },
  {
    id: 'strategic-business-transformation',
    number: '05',
    title: {
      fr: 'Transformation Stratégique & Croissance Commerciale',
      en: 'Strategic Business Transformation & Growth'
    },
    shortDesc: {
      fr: 'Redéfinition des business models, restructuration des unités commerciales et accélération des pipelines de vente B2B et B2G.',
      en: 'Redefining business models, restructuring sales teams, and accelerating B2B/B2G revenue generation pipelines.'
    },
    fullDesc: {
      fr: 'Nous intervenons directement aux côtés des dirigeants d\'entreprise pour identifier de nouvelles sources de revenus, structurer la force de vente et renégocier les accords-cadres clés.',
      en: 'We work side-by-side with executive leadership to uncover untapped revenue streams, restructure sales incentives, and close key commercial framework agreements.'
    },
    iconName: 'TrendingUp',
    colorAccent: 'from-blue-500/10 to-indigo-500/20 text-blue-700',
    deliverables: {
      fr: ['Diagnostic stratégique 360°', 'Plan de redressement et croissance à 3 ans', 'Restructuration de la politique tarifaire et marges', 'Coaching exécutif & immersion commerciale'],
      en: ['360° Strategic Business Diagnostic', '3-Year Growth & Turnaround Roadmap', 'Pricing Strategy & Margin Restructuring', 'Executive Leadership Coaching & Sales Enablement']
    },
    targetClients: {
      fr: ['Directions Générales et Conseils d\'Administration', 'Fonds d\'investissement en Private Equity', 'Entreprises familiales en transition'],
      en: ['Executive Boards & Managing Directors', 'Private Equity & Venture Portfolios', 'Family Businesses in Transition']
    },
    keyMetric: '$210K+',
    metricLabel: {
      fr: 'Générés dès la 1ère année pour Conforta Energy',
      en: 'Generated in Year 1 for Conforta Energy'
    }
  },
  {
    id: 'market-expansion-distribution',
    number: '06',
    title: {
      fr: 'Expansion de Marché & Stratégie de Distribution',
      en: 'Market Expansion & Distribution Strategy'
    },
    shortDesc: {
      fr: 'Pénétration commerciale ciblée, sélection et négociation avec les distributeurs clés (MoMo, grossistes, télécoms) dans 9 pays africains.',
      en: 'Targeted market entry, distributor onboarding, and master retail partnerships (MoMo, Telecoms, Wholesalers) across 9 African nations.'
    },
    fullDesc: {
      fr: 'De la RDC (Lubumbashi, Kinshasa, Kasai) au Cameroun, Afrique du Sud et Bénin, nous déverrouillons les circuits de distribution formels et informels grâce à notre réseau dense de partenaires institutionnels et logistiques.',
      en: 'From the DRC (Lubumbashi, Katanga, Kasai) to Cameroon, South Africa, and Benin, we unlock both formal and informal distribution networks through our proven ecosystem of local partners.'
    },
    iconName: 'Globe2',
    colorAccent: 'from-amber-600/10 to-yellow-500/20 text-amber-800',
    deliverables: {
      fr: ['Étude de marché granulaire et analyse concurrentielle', 'Implantation de filiales locales & conformité OHADA/locale', 'Intégration Mobile Money (Orange Money, MTN MoMo, M-Pesa)', 'Création de réseaux de revendeurs exclusifs'],
      en: ['Granular Market Intelligence & Regulatory Checks', 'Local Entity Setup & OHADA Compliance', 'Mobile Money Gateway Integration (Orange, MTN, Vodacom)', 'Master Dealership & Exclusive Reseller Networks']
    },
    targetClients: {
      fr: ['Multinationales cherchant un ancrage en Afrique', 'Distributeurs régionaux en expansion', 'Fournisseurs de solutions technologiques'],
      en: ['Multinationals Entering Sub-Saharan Africa', 'Regional Expanding Wholesalers', 'Tech & CleanTech Innovators']
    },
    keyMetric: '9 Pays',
    metricLabel: {
      fr: 'Marchés africains couverts activement',
      en: 'Actively Covered African Markets'
    }
  }
];

export const INITIAL_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'conforta-energy',
    slug: 'conforta-energy-scaling',
    title: {
      fr: 'Conforta Energy : Structuration Commerciale & Expansion Régionale',
      en: 'Conforta Energy: Business Development & Market Expansion'
    },
    client: 'Conforta Energy',
    clientBadge: 'Built & Scaled into a Profitable Business Unit',
    subtitle: {
      fr: 'Création, lancement et passage à l\'échelle d\'une unité commerciale solaire rentable dans le Grand Katanga.',
      en: 'Building and scaling a profitable solar distribution business unit in Greater Katanga from scratch.'
    },
    category: 'solar',
    categoryLabel: {
      fr: 'Énergies Renouvelables & Distribution',
      en: 'Renewable Energy & Distribution'
    },
    tagline: {
      fr: 'De l\'idée initiale à plus de 210 000 $ de chiffre d\'affaires en 12 mois.',
      en: 'From pitch to over $210,000 in gross solar revenue in 12 months.'
    },
    location: 'Lubumbashi, RDC',
    period: '2023 - 2024',
    featured: true,
    background: {
      fr: 'Rencontre avec le Directeur Général de Conforta, pitch du projet de création d\'une entité dédiée aux énergies propres "Conforta Energy", et obtention de l\'aval total du conseil d\'administration pour piloter le lancement opérationnel.',
      en: 'Met Conforta\'s MD, pitched the business plan for launching Conforta Energy, and secured full board backing to initiate complete operational deployment.'
    },
    journey: {
      fr: 'Sechel Consulting a dirigé la croissance en RDC : conception de la stratégie commerciale, formation des équipes techniques et commerciales, négociation des droits de distribution exclusifs et introduction des gammes de produits EcoFlow et Sun King sur le marché katangais.',
      en: 'Sechel drove DRC growth: designed strategies, trained technical and sales teams, and introduced EcoFlow and Sun King product lines across high-demand distribution hubs.'
    },
    results: {
      fr: 'Conforta Energy a généré plus de 210 000 $ dès la première année en développant la distribution solaire régionale via des pôles hors-réseau à forte demande à Lubumbashi et dans les zones minières environnantes.',
      en: 'Conforta Energy generated $210K+ by scaling regional solar distribution via high-demand off-grid hubs in its very first year.'
    },
    metrics: [
      {
        value: '$210K+',
        label: { fr: 'Chiffre d\'affaires an 1', en: 'Year 1 Gross Revenue' },
        subtext: { fr: 'Croissance 0 à rentabilité', en: 'Zero to profitability' }
      },
      {
        value: '100%',
        label: { fr: 'Autonomie opérationnelle', en: 'Operational Autonomy' },
        subtext: { fr: 'Équipes formées et autonomes', en: 'Trained & autonomous staff' }
      },
      {
        value: '2 Marques',
        label: { fr: 'Tier-1 introduites', en: 'Tier-1 Brands Integrated' },
        subtext: { fr: 'EcoFlow & Sun King', en: 'EcoFlow & Sun King' }
      }
    ],
    partners: ['EcoFlow', 'Sun King', 'Conforta'],
    heroImage: confortProjectImage,
    gallery: [
      'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'heta-usaid-kasai',
    slug: 'heta-powering-health-kasai',
    title: {
      fr: 'Projet Heta & USAID : Électrification de 200 Centres de Santé au Kasaï',
      en: 'Heta & USAID: Powering and Connecting Health in Africa'
    },
    client: 'Heta / USAID / Orange',
    clientBadge: 'Bottom of the Pyramid (BoP) Strategy & ESG-Driven Venture',
    subtitle: {
      fr: 'Déploiement de kits solaires et formation communautaire à travers 2 400 km dans les zones les plus reculées du Kasaï.',
      en: 'Deploying solar home systems and community training over 2,400 km across remote Kasai health centers.'
    },
    category: 'esg_health',
    categoryLabel: {
      fr: 'ESG, Santé & Inclusion Sociale',
      en: 'ESG, Health & Social Inclusion'
    },
    tagline: {
      fr: '2 400 km parcourus en 13 jours pour équiper et former 200 centres de santé hors réseau.',
      en: 'Traveled 2,400 km in 13 days to equip and train 200 off-grid health centers across Kasai.'
    },
    location: 'Province du Kasaï (Mbuji-Mayi, Bibanga, Gandajika, Miabi), RDC',
    period: '2023 - 2024',
    featured: true,
    background: {
      fr: 'Le projet a utilisé des systèmes solaires domestiques pour pallier les pénuries d\'électricité et améliorer drastiquement les services de santé primaires. Les centres de santé communautaires jouent un rôle vital pour rapprocher les soins des populations rurales.',
      en: 'The project used solar home systems to address electricity shortages and improve critical healthcare services in rural communities where Community Health Centres (CHSs) are vital.'
    },
    journey: {
      fr: 'Sechel Consulting a structuré et conduit la mission logistique et humaine : 2 400 km parcourus en 13 jours sur des pistes difficiles. Formation des communautés hors réseau avec USAID, Orange et Sun King pour déployer les systèmes et générer des revenus pérennes.',
      en: 'Sechel led the full operational expedition: 2,400 km in 13 days across challenging terrain. Trained off-grid communities with USAID, Orange, and Sun King to deploy solar systems and generate sustainable local income.'
    },
    results: {
      fr: '200 centres de santé équipés et opérationnels 24/7, garantissant l\'éclairage des salles d\'accouchement, la chaîne de froid médicale et la formation de relais communautaires autonomes.',
      en: '200 off-grid health centers equipped with reliable 24/7 power, securing childbirth lighting, medical refrigeration, and creating sustainable local micro-economies.'
    },
    metrics: [
      {
        value: '200',
        label: { fr: 'Centres de santé équipés', en: 'Off-grid Clinics Powered' },
        subtext: { fr: 'Soins assurés nuit et jour', en: '24/7 continuous health service' }
      },
      {
        value: '2,400 km',
        label: { fr: 'Parcourus en 13 jours', en: 'Traversed in 13 Days' },
        subtext: { fr: 'Mbuji-Mayi à Gandajika', en: 'Across Kasai province' }
      },
      {
        value: '3 Partenaires',
        label: { fr: 'Coalition internationale', en: 'Global Coalition' },
        subtext: { fr: 'USAID, Orange, Sun King', en: 'USAID, Orange, Sun King' }
      }
    ],
    partners: ['USAID', 'Orange', 'Sun King', 'Heta'],
    heroImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'sun-king-expansion',
    slug: 'sun-king-francophone-africa',
    title: {
      fr: 'Sun King : Conquête et Structuration des Marchés Francophones',
      en: 'Sun King: Francophone Africa Market Expansion'
    },
    client: 'Sun King (ex-Greenlight Planet)',
    clientBadge: 'Pan-African Market Penetration & MoMo Integration',
    subtitle: {
      fr: 'Étude de 9 marchés africains, création d\'entités au Cameroun, Afrique du Sud et Bénin avec intégration Mobile Money.',
      en: 'Researching 9 African markets; launching Sun King entities in Cameroon, South Africa, and Benin with MoMo & Orange Money.'
    },
    category: 'market_expansion',
    categoryLabel: {
      fr: 'Expansion Panafricaine & FinTech',
      en: 'Pan-African Expansion & FinTech'
    },
    tagline: {
      fr: 'Déploiement d\'entités opérationnelles et sièges régionaux à Douala et Johannesburg.',
      en: 'Establishment of regional HQs and operational retail channels in Douala and Sandton.'
    },
    location: 'Cameroun, Afrique du Sud, Bénin, RDC',
    period: '2022 - 2024',
    featured: true,
    background: {
      fr: 'Sun King souhaitait accélérer son expansion en Afrique francophone et australe en adaptant ses offres solaires aux canaux de paiement Mobile Money et aux régulations locales.',
      en: 'Sun King needed to accelerate expansion across Francophone and Southern Africa by integrating local Mobile Money payment gateways and establishing direct operational entities.'
    },
    journey: {
      fr: 'Sechel Consulting a mené la recherche terrain dans 9 marchés clés et piloté l\'implantation légale, logistique et commerciale des nouvelles entités au Cameroun (Douala HQ, Immeuble Akwa Tower), en Afrique du Sud (Sandton, Johannesburg) et au Bénin.',
      en: 'Sechel conducted granular field research in 9 countries and led legal, operational, and commercial establishment in Cameroon (Akwa Tower Douala), South Africa (Sandton HQ), and Benin.'
    },
    results: {
      fr: 'Ouverture réussie des filiales, intégration complète des paiements MTN MoMo et Orange Money, et mise en place de réseaux de distribution massifs touchant des centaines de milliers de foyers.',
      en: 'Flawless launch of operational subsidiaries, full integration with MTN MoMo & Orange Money, creating high-volume retail solar distribution pipelines.'
    },
    metrics: [
      {
        value: '9',
        label: { fr: 'Marchés analysés', en: 'African Markets Researched' },
        subtext: { fr: 'Données terrain exclusives', en: 'Proprietary market intelligence' }
      },
      {
        value: '3 Entités',
        label: { fr: 'Nouvelles filiales créées', en: 'New Country Entities Launched' },
        subtext: { fr: 'Cameroun, SA, Bénin', en: 'Cameroon, SA, Benin' }
      },
      {
        value: 'MoMo + OM',
        label: { fr: 'Intégration FinTech', en: 'FinTech Integration' },
        subtext: { fr: 'Paiement sans friction', en: 'Frictionless micro-payments' }
      }
    ],
    partners: ['Sun King', 'Orange Money', 'MTN MoMo', 'Vodacom'],
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'ecoflow-katanga',
    slug: 'ecoflow-market-integration',
    title: {
      fr: 'EcoFlow : Partenariat Stratégique et 2M$+ de Ventes en Katanga',
      en: 'EcoFlow: Market Integration & $2M+ USD Revenue Milestone'
    },
    client: 'EcoFlow',
    clientBadge: 'Market Entry & Strategic Execution Partner',
    subtitle: {
      fr: 'Pénétration du marché premium d\'énergie portable en RDC et structuration du réseau de distributeurs officiels.',
      en: 'Pioneering portable clean energy in DRC and building a tier-one authorized distributor network.'
    },
    category: 'market_expansion',
    categoryLabel: {
      fr: 'Intégration & Croissance B2B',
      en: 'Integration & B2B Growth'
    },
    tagline: {
      fr: 'Plus de 2 000 000 $ USD de chiffre d\'affaires brut généré en moins d\'un an.',
      en: 'Over $2,000,000 USD gross revenue scaled in less than 12 months.'
    },
    location: 'Katanga (Lubumbashi, Kolwezi, Likasi), RDC',
    period: '2024',
    featured: true,
    background: {
      fr: 'En 2024, le marché katangais subissait des coupures énergétiques chroniques impactant les résidences, commerces et sites miniers. EcoFlow offrait la technologie idéale (stations électriques portables sans carburant ni bruit), mais nécessitait un ancrage distributeur puissant.',
      en: 'In 2024, Katanga faced chronic power outages impacting businesses, residential sectors, and mining hubs. EcoFlow had world-class clean power stations, but required a strong distributor backbone.'
    },
    journey: {
      fr: 'Sechel Consulting a négocié et activé les accords de distribution avec les plus grands acteurs du secteur : Ultracomm, Sai Kirpa, Goshop, Dev Solaire et Sai Comm, organisant des événements de lancement VIP et des formations techniques.',
      en: 'Sechel negotiated and activated master distributor agreements with major players: Ultracomm, Sai Kirpa, Goshop, Dev Solaire & Sai Comm, organizing VIP launches and technical demos.'
    },
    results: {
      fr: 'En moins d\'un an, EcoFlow a dépassé les 2 000 000 $ USD de revenus bruts, devenant la référence incontournable de l\'énergie portable haut de gamme dans le Grand Katanga.',
      en: 'In less than a year, EcoFlow generated over $2M USD in gross revenue, establishing undisputed market leadership in Katanga.'
    },
    metrics: [
      {
        value: '$2M+ USD',
        label: { fr: 'Chiffre d\'affaires brut', en: 'Gross Revenue' },
        subtext: { fr: 'En moins de 12 mois', en: 'In less than 12 months' }
      },
      {
        value: '5 Distributeurs',
        label: { fr: 'Majeurs activés', en: 'Tier-1 Resellers Activated' },
        subtext: { fr: 'Ultracomm, Goshop, etc.', en: 'Ultracomm, Goshop, etc.' }
      },
      {
        value: '0 Carburant',
        label: { fr: 'Impact environnemental', en: 'Clean Power Adoption' },
        subtext: { fr: 'Remplacement des générateurs', en: 'Displacing diesel generators' }
      }
    ],
    partners: ['EcoFlow', 'Ultracomm', 'Goshop', 'Sai Kirpa', 'Dev Solaire'],
    heroImage: ecoflowProjectImage,
    gallery: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'structurer-la-distribution-solaire-en-rdc',
    title: {
      fr: 'Comment structurer un réseau de distribution solaire rentable en RDC et Afrique Centrale',
      en: 'How to Structure a Profitable Solar Distribution Network in DRC and Central Africa'
    },
    excerpt: {
      fr: 'Analyse des 5 facteurs critiques pour réussir la distribution hors-réseau : sélection des revendeurs, intégration Mobile Money, logistique du dernier kilomètre et service après-vente.',
      en: 'Analysis of the 5 critical levers for off-grid success: dealer selection, Mobile Money integration, last-mile logistics, and robust warranty ecosystems.'
    },
    content: {
      fr: `Le marché de l'énergie en République Démocratique du Congo représente à la fois un défi logistique colossal et une opportunité commerciale sans précédent. Avec un taux d'électrification national inférieur à 20% et une demande explosive dans les centres urbains comme Lubumbashi et Kolwezi, la transition vers les énergies propres n'est plus une option, c'est une nécessité économique.

### 1. La sélection rigoureuse des canaux de distribution
La première erreur commise par les équipementiers internationaux est de vouloir créer leur propre réseau de vente au détail ex nihilo. Notre expérience avec **EcoFlow** et **Conforta Energy** démontre qu'il est infiniment plus rentable de nouer des alliances stratégiques avec des distributeurs déjà établis (comme Ultracomm ou Goshop) tout en leur fournissant un accompagnement commercial sur-mesure.

### 2. L'intégration des micro-paiements (Mobile Money)
En Afrique subsaharienne, l'accès au crédit bancaire classique reste limité. L'intégration de passerelles de paiement automatisées telles qu'Orange Money, M-Pesa de Vodacom et MTN MoMo est le véritable déverrouilleur du volume de vente. Le modèle PAYG (Pay-As-You-Go) permet d'aligner le coût de l'énergie sur les flux de trésorerie quotidiens des ménages et artisans.

### 3. Le défi du dernier kilomètre au Kasaï
Notre mission de 2 400 km à travers le Kasaï pour le projet **Heta / USAID** a mis en lumière la nécessité d'une logistique robuste. Former des relais locaux et équiper les centres de santé avec des outils de maintenance simples garantit un taux de disponibilité des installations supérieur à 98%.

### Conclusion : Le bon sens opérationnel (*Sechel*)
Réussir en Afrique exige de conjuguer vision stratégique et présence physique sur le terrain. C'est l'essence même de la méthode Sechel.`,
      en: `The energy market in the Democratic Republic of Congo represents both a massive logistical challenge and an unprecedented commercial opportunity. With national grid connectivity below 20% and surging power demand in industrial hubs like Lubumbashi and Kolwezi, clean energy transition is a high-yield imperative.

### 1. Strategic Wholesaler Onboarding
Global equipment manufacturers often stumble when trying to build retail branches from scratch. Our track record with **EcoFlow** and **Conforta Energy** proves that partnering with reputable master dealers (such as Ultracomm, Goshop) combined with executive sales enablement delivers superior ROI.

### 2. Mobile Money Payment Gateways
In Sub-Saharan Africa, frictionless payment is the catalyst of scale. Integrating Orange Money, Vodacom M-Pesa, and MTN MoMo directly into solar hardware enables Pay-As-You-Go models that match local cash flow dynamics.

### 3. Last-Mile Logistics in Rural Provinces
Our 2,400 km field mission across Kasai for **Heta & USAID** proved that local community empowerment and rugged spare-parts supply chains ensure uptime exceeding 98%.`
    },
    category: 'Énergie & CleanTech',
    author: {
      name: 'Expertise Sechel',
      role: 'Pôle Conseil Énergie & Infrastructure',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    },
    publishedAt: '2026-08-15',
    readTime: '6 min',
    coverImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    tags: ['Solaire', 'RDC', 'Mobile Money', 'Distribution', 'Katanga'],
    isPublished: true,
    views: 1420,
    seoTitle: 'Structurer la distribution solaire en RDC | Guide Stratégique Sechel Consulting',
    seoDescription: 'Guide complet pour implanter et développer un réseau de distribution d\'énergie solaire en Afrique centrale : logistique, Mobile Money et partenariats.',
    seoKeywords: ['distribution solaire rdc', 'conseil lubumbashi', 'ecoflow rdc', 'sun king congo', 'energie renouvelable afrique']
  },
  {
    id: 'post-2',
    slug: 'pourquoi-le-conseil-traditionnel-echoue-en-afrique',
    title: {
      fr: 'Pourquoi le conseil traditionnel échoue en Afrique : Plaidoyer pour l\'ingénierie d\'affaires de terrain',
      en: 'Why Traditional Advisory Fails in Africa: The Case for Integrated Field Business Engineering'
    },
    excerpt: {
      fr: 'Analyse des limites des recommandations théoriques déconnectées du terrain : comment structurer des solutions opérationnelles résilientes face aux réalités douanières, monétaires et logistiques.',
      en: 'Analyzing the limits of theoretical slide decks disconnected from field realities: how to build resilient operational systems addressing customs, FX, and logistics friction.'
    },
    content: {
      fr: `Dans l'écosystème économique contemporain en Afrique subsaharienne, les cabinets de conseil traditionnels produisent fréquemment des rapports volumineux qui restent sans suite opérationnelle. En Afrique centrale et australe, une stratégie purement théorique s'effondre dès le premier obstacle douanier, logistique ou monétaire.

### 1. La fracture entre recommandation stratégique et exécution terrain
Le conseil d'entreprise moderne en Afrique ne peut plus se cantonner à l'analyse macroéconomique. Les conseils d'administration et directions générales n'ont pas besoin de diagnostics passifs, mais de partenaires d'ingénierie capables d'entrer en négociation avec des distributeurs régionaux, de structurer des politiques de marge viables et d'obtenir des agréments réglementaires rigoureux (tels que la conformité ARSP en RDC ou les cadres OHADA).

### 2. Les 3 piliers de l'ingénierie d'affaires Sechel
Pour garantir la pérennité d'un déploiement commercial ou industriel :
- **Sécurisation réglementaire et fiscale** : Maîtrise des régimes douaniers, des flux de rapatriement de devises (BCC, BEAC) et du droit des affaires OHADA.
- **Canaux de distribution tier-1** : Sélection d'acteurs de premier plan disposant d'infrastructures de stockage, de flottes logistiques et de solvabilité vérifiée.
- **Intégration technologique sans friction** : Connexion directe avec les écosystèmes Mobile Money (Orange Money, MTN MoMo, M-Pesa) pour fluidifier les encaissements récurrents.

### Conclusion : L'impératif de résultats mesurables
Chez Sechel Consulting, chaque intervention est contractuellement articulée autour de livrables précis et d'indicateurs de performance tangibles : chiffre d'affaires généré, taux d'autonomie des équipes locales et rentabilité des investissements.`,
      en: `In the contemporary Sub-Saharan African economy, legacy consulting firms often produce slide decks that fail upon contact with operational reality. A theoretical strategy designed in a remote corporate office quickly hits roadblocks when confronted with real-world customs, currency, and logistics friction.

### 1. The Disconnect Between Strategy and Field Execution
Consulting in Africa cannot be confined to passive macro analysis. Corporate boards and managing directors need execution partners capable of negotiating with regional master distributors, structuring pricing models suited to local purchasing power, and securing regulatory approvals (such as ARSP compliance in DRC or OHADA frameworks).

### 2. The Three Pillars of Sechel Business Engineering
To ensure sustainable commercial deployment:
- **Regulatory and Tax Security**: Deep mastery of customs corridors, foreign exchange regulations (BCC, BEAC), and OHADA business law.
- **Tier-1 Distribution Channels**: Partnering with established distributors possessing verified warehouses, logistics fleets, and capital strength.
- **Frictionless Tech Integration**: Direct integration with Mobile Money rails (Orange Money, MTN MoMo, M-Pesa) for automated cash reconciliation.

### Conclusion: Relentless Focus on Quantifiable ROI
At Sechel Consulting, every engagement is bound to tangible deliverables and measurable operational metrics: revenue generated, local team autonomy, and capital efficiency.`
    },
    category: 'Stratégie & Gouvernance',
    author: {
      name: 'Direction Stratégique',
      role: 'Associés - Sechel Consulting Partners',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
    },
    publishedAt: '2026-08-01',
    readTime: '5 min',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    tags: ['Stratégie', 'Gouvernance', 'Ingénierie d\'Affaires', 'RDC', 'Afrique'],
    isPublished: true,
    views: 1120,
    seoTitle: 'Ingénierie d\'Affaires & Exécution Stratégique en Afrique | Sechel Consulting',
    seoDescription: 'Découvrez comment dépasser le conseil théorique grâce à l\'ingénierie d\'affaires opérationnelle et la maîtrise du terrain africain.',
    seoKeywords: ['conseil strategique afrique', 'ingenierie affaires rdc', 'cabinet consulting lubumbashi', 'expansion afrique centrale']
  },
  {
    id: 'post-3',
    slug: 'expansion-marche-francophone-telecom-fintech',
    title: {
      fr: 'Pénétrer l\'Afrique Francophone : Le pont indispensable entre Télécoms, MoMo et Retail',
      en: 'Conquering Francophone Africa: The Essential Bridge Between Telecoms, MoMo, and Retail'
    },
    excerpt: {
      fr: 'Retour d\'expérience sur l\'implantation de Sun King au Cameroun et au Bénin : comment aligner les opérateurs télécoms pour accélérer vos ventes B2C.',
      en: 'Lessons from Sun King\'s expansion in Cameroon and Benin: how to align telecom operators to hyper-scale B2C retail volume.'
    },
    content: {
      fr: `L'Afrique subsaharienne francophone connaît une accélération sans précédent dans l'adoption des services financiers mobiles. Pour toute entreprise internationale souhaitant distribuer des biens d'équipement, s'associer avec les leaders télécoms (Orange, MTN, Vodacom) n'est pas un canal secondaire : c'est l'épine dorsale de la rentabilité.

### Les 3 enseignements de notre déploiement au Cameroun et Bénin
1. **La contractualisation MoMo** : Réduire le cycle de réconciliation financière à moins de 24h.
2. **Le maillage territorial des agences** : Utiliser les kiosques télécoms comme points de retrait et de service après-vente.
3. **La confiance de la marque** : Associer sa marque à un tiers de confiance télécom pour lever les réticences initiales des clients.`,
      en: `Francophone Sub-Saharan Africa is leading mobile financial services adoption worldwide. For global brands distributing high-value equipment, telecom alliances (Orange, MTN, Vodacom) are the indispensable backbone of scalability.`
    },
    category: 'FinTech & Télécoms',
    author: {
      name: 'Pôle FinTech & Télécoms',
      role: 'Sechel Market Expansion Team',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
    },
    publishedAt: '2026-07-20',
    readTime: '5 min',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    tags: ['FinTech', 'Télécoms', 'Cameroun', 'Bénin', 'Mobile Money'],
    isPublished: true,
    views: 1850,
    seoTitle: 'Expansion Télécoms et FinTech en Afrique Francophone | Sechel Consulting',
    seoDescription: 'Stratégies d\'intégration Mobile Money et partenariats télécoms en Afrique centrale et de l\'ouest.',
    seoKeywords: ['fintech afrique francophone', 'orange money cameroun', 'momo mtn', 'sun king afrique']
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Directeur Général',
    role: 'Managing Director',
    company: 'Conforta Energy (RDC)',
    quote: {
      fr: "Sechel Consulting n'a pas seulement rédigé un plan stratégique : ils ont mis les bottes sur le terrain, structuré nos équipes et généré plus de 210 000 $ de chiffre d'affaires dès notre première année d'activité. C'est l'incarnation même du bon sens et de l'excellence opérationnelle.",
      en: "Sechel Consulting didn't just hand over a strategy deck; they put boots on the ground, built our teams from scratch, and drove over $210,000 in revenue in year one. Outstanding execution."
    },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    projectTag: 'Conforta Energy Launch',
    date: '2024-03',
    isVerified: true
  },
  {
    id: 'test-2',
    author: 'Directeur Régional Expansion',
    role: 'Regional Head of Expansion',
    company: 'Sun King / Greenlight Planet',
    quote: {
      fr: "Leur connaissance fine des marchés francophones (Cameroun, Bénin, RDC) et leur capacité à débloquer des partenariats stratégiques avec Orange et MTN MoMo ont été déterminantes dans la réussite de notre déploiement panafricain.",
      en: "Their deep mastery of Francophone markets (Cameroon, Benin, DRC) and ability to unlock critical telecom/MoMo distribution partnerships were game-changers for our expansion."
    },
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    projectTag: 'Pan-African Market Entry',
    date: '2024-01',
    isVerified: true
  },
  {
    id: 'test-3',
    author: 'Coordinateur des Programmes Santé & Énergie',
    role: 'Program Director',
    company: 'Partenaire Projet Heta / Kasaï',
    quote: {
      fr: "Parcourir 2 400 km de pistes en 13 jours pour électrifier 200 centres de santé sans aucun incident logistique relève de la prouesse. Sechel a démontré une rigueur de gestion de projet institutionnelle de classe mondiale.",
      en: "Traversing 2,400 km of rural roads in 13 days to electrify 200 clinics with zero downtime was a masterclass in high-stakes project management."
    },
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    projectTag: 'Heta & USAID Health Initiative',
    date: '2023-11',
    isVerified: true
  },
  {
    id: 'test-4',
    author: 'Senior Executive',
    role: 'Africa Business Development',
    company: 'EcoFlow Partner Network',
    quote: {
      fr: "Plus de 2 millions USD de ventes générées au Katanga en moins d'un an : Sechel a structuré notre réseau de distribution officiel avec une précision chirurgicale.",
      en: "Over $2M USD in Katanga sales in under a year. Sechel orchestrated our official master dealer network with surgical precision."
    },
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    projectTag: 'EcoFlow Market Integration',
    date: '2024-06',
    isVerified: true
  }
];

export const INITIAL_SUBMISSIONS: ContactSubmission[] = [
  {
    id: 'sub-1',
    createdAt: '2026-08-30T10:14:00Z',
    fullName: 'Jean-Paul Mwamba',
    email: 'jpmwamba@miningcorp-katanga.cd',
    phone: '+243 812 345 678',
    company: 'Katanga Resources Ltd',
    country: 'RD Congo',
    serviceInterest: 'solar-renewable-energy',
    budgetRange: '$50,000 - $150,000',
    timeline: '1-3 mois',
    message: 'Nous souhaitons équiper nos bases-vie de Kolwezi avec un système d\'énergie solaire hybride autonome et cherchons un cabinet pour auditer et négocier l\'approvisionnement.',
    status: 'new'
  },
  {
    id: 'sub-2',
    createdAt: '2026-08-28T14:30:00Z',
    fullName: 'Clarisse N\'Dri',
    email: 'cndri@fintech-abidjan.com',
    phone: '+225 07 89 45 12 00',
    company: 'West Africa FinTech Ventures',
    country: 'Côte d\'Ivoire / Cameroun',
    serviceInterest: 'market-expansion-distribution',
    budgetRange: '$25,000 - $50,000',
    timeline: 'Immédiat',
    message: 'Étude d\'opportunité pour étendre nos solutions de micro-paiement marchand vers Douala et Lubumbashi.',
    status: 'in_progress',
    notes: 'Premier échange téléphonique très positif. Dossier d\'analyse transmis.'
  }
];

export const INITIAL_SEO_SETTINGS: SEOSettings = {
  siteName: 'Sechel Consulting',
  defaultTitle: 'Sechel Consulting | Conseil Stratégique, Ingénierie Financière & Opérations en Afrique',
  titleTemplate: '%s | Sechel Consulting',
  defaultDescription: {
    fr: 'Cabinet international de conseil d\'entreprise à Lubumbashi (RDC) : automatisation n8n des processus métiers, structuration de filières solaires, conformité ARSP/OHADA et expansion commerciale panafricaine.',
    en: 'International corporate consulting firm based in Lubumbashi (DRC): n8n workflow automation, off-grid solar structuring, ARSP/OHADA compliance, and pan-African market expansion.'
  },
  canonicalUrl: 'https://sechelconsulting.com',
  keywords: [
    'cabinet conseil lubumbashi',
    'conseil strategique rdc',
    'automatisation n8n afrique',
    'audit processus entreprise rdc',
    'energie solaire congo',
    'ecoflow lubumbashi',
    'sun king rdc',
    'sous traitance arsp rdc',
    'droit des affaires ohada rdc',
    'gestion de projet usaid rdc',
    'expansion afrique centrale',
    'sechel consulting'
  ],
  ogImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  twitterHandle: '@SechelConsult',
  googleVerificationCode: 'google-site-verification=sechel_demo_auth_token_2026',
  enableStructuredData: true,
  robotsTxtContent: `User-agent: *\nAllow: /\nSitemap: https://sechelconsulting.com/sitemap.xml\nDisallow: /admin\nDisallow: /api/`,
  pageOverrides: {
    home: {
      title: 'Sechel Consulting | Cabinet de Conseil Stratégique & Automatisation des Entreprises en RDC',
      description: 'Accélérez votre rentabilité : automatisation n8n des flux métiers, structuration d\'énergie propre et déploiement opérationnel en RDC et Afrique.',
      keywords: ['sechel consulting', 'conseil lubumbashi', 'automatisation processus rdc', 'energie solaire afrique', 'conforta energy']
    },
    about: {
      title: 'À Propos du Cabinet Sechel Consulting | Conseil Stratégique & Ingénierie d\'Affaires',
      description: 'Une équipe de consultants seniors aux standards internationaux pour accélérer la croissance mesurable et la conformité des entreprises en Afrique.',
      keywords: ['conseil strategique rdc', 'cabinet conseil lubumbashi', 'consultants seniors rdc', 'direction lubumbashi']
    },
    services: {
      title: 'Nos Pôles de Conseil & Automatisation Métier | Sechel Consulting',
      description: 'Nos 6 pôles d\'intervention : Automatisation n8n & intégrations, Structuration Solaire, Gestion de Projet Bailleurs, Architecture Opérationnelle, Stratégie de Marque, Expansion Panafricaine.',
      keywords: ['services consulting rdc', 'automatisation n8n rdc', 'structuration solaire katanga', 'conseil en gestion entreprise']
    },
    projects: {
      title: 'Études de Cas & Résultats Clients | Sechel Consulting',
      description: 'Découvrez nos réalisations à fort impact : Conforta Energy ($210k+ an 1), Heta/USAID (200 cliniques solaires), EcoFlow ($2M+ au Katanga).',
      keywords: ['etudes de cas sechel', 'projets solaires rdc', 'ecoflow katanga', 'heta usaid kasai', 'roi automatisation']
    },
    blog: {
      title: 'Analyses & Perspectives Économiques Africaines | Sechel Consulting',
      description: 'Guides d\'experts et analyses stratégiques : distribution solaire hors-réseau, intégration Mobile Money, conformité réglementaire et ingénierie d\'affaires.',
      keywords: ['blog affaires congo', 'analyse economique rdc', 'marche solaire afrique', 'mobile money rdc']
    },
    testimonials: {
      title: 'Références & Témoignages Clients | Sechel Consulting',
      description: 'Retours d\'expérience des multinationales, bailleurs et groupes régionaux accompagnés par Sechel Consulting.',
      keywords: ['avis clients sechel', 'recommandations consulting afrique', 'references sechel']
    },
    contact: {
      title: 'Contactez Nos Consultants Seniors | Sechel Consulting Lubumbashi',
      description: 'Prenez rendez-vous ou lancez un diagnostic pour structurer votre croissance, automatiser vos opérations ou réussir votre implantation en RDC.',
      keywords: ['contact sechel', 'adresse sechel lubumbashi', 'devis automatisation rdc', 'consultation entreprise katanga']
    }
  }
};
