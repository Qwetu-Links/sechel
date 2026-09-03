import React, { useState, useId } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Sun,
  ShieldCheck,
  TrendingUp,
  MapPin,
  ExternalLink,
  Navigation,
  Globe2,
  CheckCircle2,
  Layers,
  Sparkles,
  Truck,
  Zap,
  ArrowRight,
  Filter
} from 'lucide-react';

export type FootprintCategory = 'all' | 'hubs' | 'solar' | 'corridors' | 'expansion';

export interface OperationalLocation {
  id: string;
  name: { fr: string; en: string };
  city: string;
  country: { fr: string; en: string };
  region: { fr: string; en: string };
  type: 'hq' | 'regional_hub' | 'deployment' | 'corridor_port' | 'market';
  category: 'hubs' | 'solar' | 'corridors' | 'expansion';
  coordinates: { x: number; y: number }; // SVG viewBox 0 0 900 850
  badge: { fr: string; en: string };
  metrics: {
    primaryValue: string;
    primaryLabel: { fr: string; en: string };
    secondaryValue: string;
    secondaryLabel: { fr: string; en: string };
  };
  address?: string;
  scopeSummary: { fr: string; en: string };
  keyAchievements: { fr: string[]; en: string[] };
  partners: string[];
  framework: string;
  color: string;
  accentClass: string;
  hasPulse?: boolean;
}

export const OPERATIONAL_HUBS: OperationalLocation[] = [
  {
    id: 'lubumbashi',
    name: {
      fr: 'Siège Principal RDC & Pôle Grand Katanga',
      en: 'DRC Executive HQ & Greater Katanga Hub'
    },
    city: 'Lubumbashi',
    country: { fr: 'RDC (République Démocratique du Congo)', en: 'DRC (Democratic Republic of the Congo)' },
    region: { fr: 'Haut-Katanga • Ceinture Cuprifère', en: 'Haut-Katanga • Copperbelt' },
    type: 'hq',
    category: 'hubs',
    coordinates: { x: 508, y: 588 },
    badge: { fr: 'Siège Opérationnel & Direction', en: 'Executive & Operational HQ' },
    metrics: {
      primaryValue: '$2.2M+',
      primaryLabel: { fr: 'Volume solaire structuré', en: 'Solar volume structured' },
      secondaryValue: '100%',
      secondaryLabel: { fr: 'Agrément ARSP sous-traitance', en: 'ARSP compliance clearance' }
    },
    address: "142 Boulevard M'siri, Quartier Makomeno, Lubumbashi",
    scopeSummary: {
      fr: 'Direction générale des opérations RDC, pilotage des missions minières et structuration de la filière énergies renouvelables et stations solaires portables.',
      en: 'General management of DRC operations, steering mining energy projects, and scaling portable solar generators & off-grid networks.'
    },
    keyAchievements: {
      fr: [
        'Introduction et déploiement exclusif de la marque EcoFlow avec plus de 2M$ USD générés',
        'Création et passage à l\'échelle de la filiale Conforta Energy (+210 000 $ dès l\'an 1)',
        'Accréditation officielle ARSP pour la sous-traitance minière et industrielle'
      ],
      en: [
        'Exclusive rollout of EcoFlow commercial channels exceeding $2M+ USD in under 12 months',
        'Venture scaling of Conforta Energy generating $210K+ in year one',
        'Full ARSP local subcontracting accreditation for mining Tier-1 suppliers'
      ]
    },
    partners: ['EcoFlow', 'Sun King', 'Ultracomm', 'Goshop', 'Conforta', 'ARSP'],
    framework: 'OHADA • ARSP RDC • Loi Minière',
    color: '#F59E0B',
    accentClass: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
    hasPulse: true
  },
  {
    id: 'douala',
    name: {
      fr: 'Direction Régionale CEMAC & Afrique Centrale',
      en: 'CEMAC & Central Africa Regional HQ'
    },
    city: 'Douala',
    country: { fr: 'Cameroun', en: 'Cameroon' },
    region: { fr: 'Afrique Centrale • Bassin du Congo', en: 'Central Africa • Congo Basin' },
    type: 'regional_hub',
    category: 'hubs',
    coordinates: { x: 382, y: 418 },
    badge: { fr: 'Siège Régional CEMAC', en: 'CEMAC Regional Hub' },
    metrics: {
      primaryValue: '3 Filiales',
      primaryLabel: { fr: 'Entités créées & opérées', en: 'Country entities incorporated' },
      secondaryValue: 'MTN + OM',
      secondaryLabel: { fr: 'Intégration Mobile Money', en: 'MoMo gateway integration' }
    },
    address: 'Immeuble Akwa Tower, Boulevard de la Liberté, Douala',
    scopeSummary: {
      fr: 'Hub stratégique pour les marchés francophones d\'Afrique centrale, structuration des filiales locales et logistique portuaire maritime.',
      en: 'Strategic hub for Central Africa francophone expansion, corporate entity structuring, and deep-water maritime logistics.'
    },
    keyAchievements: {
      fr: [
        'Implantation légale et commerciale de la filiale camerounaise de Sun King à Akwa Tower',
        'Négociation des passerelles de micro-paiement avec MTN MoMo et Orange Money Cameroun',
        'Coordination logistique des conteneurs maritimes à destination de la sous-région CEMAC'
      ],
      en: [
        'Corporate establishment and physical launch of Sun King Cameroon at Akwa Tower',
        'API integration of frictionless micro-payments via MTN MoMo and Orange Money',
        'End-to-end maritime container clearance and customs coordination across CEMAC'
      ]
    },
    partners: ['Sun King', 'Orange Cameroun', 'MTN MoMo', 'BEAC'],
    framework: 'OHADA • CEMAC Trade Area',
    color: '#3B82F6',
    accentClass: 'text-blue-500 bg-blue-500/10 border-blue-500/30',
    hasPulse: true
  },
  {
    id: 'sandton',
    name: {
      fr: 'Hub International & Coordination SADC',
      en: 'SADC International & Finance Gateway'
    },
    city: 'Johannesburg (Sandton)',
    country: { fr: 'Afrique du Sud', en: 'South Africa' },
    region: { fr: 'Afrique Australe • SADC', en: 'Southern Africa • SADC' },
    type: 'regional_hub',
    category: 'hubs',
    coordinates: { x: 502, y: 720 },
    badge: { fr: 'Hub Financier SADC', en: 'SADC Financial Hub' },
    metrics: {
      primaryValue: '$4.5M+',
      primaryLabel: { fr: 'Capitaux & partenariats', en: 'Capital & partnerships' },
      secondaryValue: 'SADC',
      secondaryLabel: { fr: 'Accord de libre-échange', en: 'Free Trade Protocol' }
    },
    address: 'Nelson Mandela Square, Sandton, Johannesburg, 2196',
    scopeSummary: {
      fr: 'Relations avec les bailleurs institutionnels, syndications financières, accords de distribution panafricains et corridors de fret minier.',
      en: 'Institutional investor relations, financial syndication, cross-border corporate governance, and southern road transport corridors.'
    },
    keyAchievements: {
      fr: [
        'Structuration de la filiale sud-africaine Sun King et accords FinTech institutionnels',
        'Sécurisation des corridors de transit routier Sandton-Durban-Lusaka-Lubumbashi',
        'Partenariats de distribution de contenu numérique avec Mondia et Content Connect Africa'
      ],
      en: [
        'Corporate structuring of Sun King South Africa and institutional debt/equity alignment',
        'Securing bonded road transit corridors from Durban/Sandton through Zambia into Katanga',
        'Digital content licensing alliances with Mondia, Comviva, and Content Connect Africa'
      ]
    },
    partners: ['Sun King', 'Mondia', 'Content Connect Africa', 'Vodacom'],
    framework: 'SADC Protocol • South African Reserve Bank Compliance',
    color: '#8B5CF6',
    accentClass: 'text-purple-500 bg-purple-500/10 border-purple-500/30',
    hasPulse: true
  },
  {
    id: 'kinshasa',
    name: {
      fr: 'Pôle Institutionnel & Réglementaire Ouest RDC',
      en: 'DRC Capital & Regulatory Affairs Hub'
    },
    city: 'Kinshasa',
    country: { fr: 'RDC', en: 'DRC' },
    region: { fr: 'Kinshasa & Bas-Congo', en: 'Kinshasa & Kongo Central' },
    type: 'market',
    category: 'expansion',
    coordinates: { x: 412, y: 504 },
    badge: { fr: 'Liaison Ministérielle & ARSP', en: 'Gov & Regulatory Affairs' },
    metrics: {
      primaryValue: '100%',
      primaryLabel: { fr: 'Conformité institutionnelle', en: 'Institutional clearance' },
      secondaryValue: 'Tier-1',
      secondaryLabel: { fr: 'Réseau opérateurs télécoms', en: 'Telecom master channels' }
    },
    scopeSummary: {
      fr: 'Interface avec les ministères de tutelle (Énergie, Mines, PME), l\'ARSP, l\'ANAPI et les sièges nationaux d\'Orange RDC et Vodacom M-Pesa.',
      en: 'Interface with national ministries (Energy, Mining, SMEs), ARSP clearance, ANAPI investment incentives, and telecom carrier headquarters.'
    },
    keyAchievements: {
      fr: [
        'Homologation des modèles contractuels d\'énergie renouvelable',
        'Coordination stratégique des partenariats Orange Money et M-Pesa RDC',
        'Représentation institutionnelle de consortiums énergétiques internationaux'
      ],
      en: [
        'Regulatory clearance for distributed clean energy off-grid concessions',
        'Strategic alignment with national executives at Orange Money and Vodacom M-Pesa',
        'Institutional representation for international energy and mining consortiums'
      ]
    },
    partners: ['ARSP', 'Orange RDC', 'Vodacom M-Pesa', 'ANAPI'],
    framework: 'Loi sur l\'Électricité RDC • Droit OHADA',
    color: '#06B6D4',
    accentClass: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/30'
  },
  {
    id: 'kasai',
    name: {
      fr: 'Mission ESG Kasaï • Électrification Rurale Santé',
      en: 'Kasai ESG Mission • Rural Health Electrification'
    },
    city: 'Mbuji-Mayi / Gandajika',
    country: { fr: 'RDC', en: 'DRC' },
    region: { fr: 'Grand Kasaï • Zone Enclavée', en: 'Grand Kasai Province' },
    type: 'deployment',
    category: 'solar',
    coordinates: { x: 472, y: 522 },
    badge: { fr: 'Projet Phare Bailleurs 200 Cliniques', en: 'Flagship Donor Mission' },
    metrics: {
      primaryValue: '200',
      primaryLabel: { fr: 'Centres de santé équipés 24/7', en: 'Health facilities powered' },
      secondaryValue: '2 400 km',
      secondaryLabel: { fr: 'Parcourus en 13 jours', en: 'Traversed in 13 days' }
    },
    scopeSummary: {
      fr: 'Déploiement logistique et formation communautaire sur 2 400 km de pistes pour alimenter en solaire continu 200 centres de santé primaires.',
      en: 'Last-mile logistic expedition across 2,400 km of rugged terrain powering 200 rural maternity and health clinics with solar micro-grids.'
    },
    keyAchievements: {
      fr: [
        'Expédition opérationnelle sans accroc de Mbuji-Mayi à Bibanga et Gandajika',
        'Sécurisation de la chaîne de froid vaccinale et éclairage nocturne des maternités',
        'Formation de 200 techniciens de maintenance et relais communautaires locaux'
      ],
      en: [
        'Flawless expedition logistics through remote territory connecting isolated health posts',
        'Securing medical refrigeration for vaccines and 24/7 power for maternal delivery rooms',
        'Capacity building and technical certification for 200 local community maintenance staff'
      ]
    },
    partners: ['USAID', 'Heta', 'Orange RDC', 'Sun King'],
    framework: 'ESG Guidelines • USAID Grant Compliance',
    color: '#10B981',
    accentClass: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
    hasPulse: true
  },
  {
    id: 'kolwezi',
    name: {
      fr: 'Corridor Minier Kolwezi & Lualaba CleanTech',
      en: 'Kolwezi Mining Corridor & CleanTech'
    },
    city: 'Kolwezi',
    country: { fr: 'RDC', en: 'DRC' },
    region: { fr: 'Province du Lualaba', en: 'Lualaba Mining Hub' },
    type: 'deployment',
    category: 'solar',
    coordinates: { x: 480, y: 580 },
    badge: { fr: 'Capitale Mondiale du Cobalt', en: 'World Cobalt Capital' },
    metrics: {
      primaryValue: '$2M+',
      primaryLabel: { fr: 'Énergie de secours déployée', en: 'Clean backup deployed' },
      secondaryValue: '0 dB',
      secondaryLabel: { fr: 'Remplacement groupes diesel', en: 'Zero-emission power' }
    },
    scopeSummary: {
      fr: 'Fourniture de centrales d\'énergie portables haut de gamme aux sous-traitants miniers, laboratoires géologiques et bases de vie.',
      en: 'Supplying industrial-grade portable clean battery generators to mining contractors, geological labs, and remote site compounds.'
    },
    keyAchievements: {
      fr: [
        'Remplacement massif des générateurs diesel polluants par des solutions EcoFlow Delta Pro',
        'Structuration de stocks tampons et points SAV agréés à Kolwezi',
        'Audits de conformité sécurité HSE pour les concessions minières multinationales'
      ],
      en: [
        'Direct substitution of noisy diesel generators with ruggedized EcoFlow battery stations',
        'Establishment of authorized regional spares inventory and fast-turnaround repair hubs',
        'Full HSE safety audit compliance for tier-one multinational mining sites'
      ]
    },
    partners: ['EcoFlow', 'Dev Solaire', 'Sai Kirpa', 'Mining Subcontractors'],
    framework: 'Mining Code DRC • HSE Industrial Standards',
    color: '#F97316',
    accentClass: 'text-orange-500 bg-orange-500/10 border-orange-500/30'
  },
  {
    id: 'cotonou',
    name: {
      fr: 'Comptoir Bénin & Corridor CEDEAO',
      en: 'Benin Entity & ECOWAS Retail Network'
    },
    city: 'Cotonou',
    country: { fr: 'Bénin', en: 'Benin' },
    region: { fr: 'Afrique de l\'Ouest • Golfe de Guinée', en: 'West Africa • Gulf of Guinea' },
    type: 'market',
    category: 'expansion',
    coordinates: { x: 326, y: 395 },
    badge: { fr: 'Entité Opérationnelle Bénin', en: 'Operational Subsidiary' },
    metrics: {
      primaryValue: '100% MoMo',
      primaryLabel: { fr: 'Distribution digitalisée', en: 'Cashless distribution' },
      secondaryValue: 'UEMOA',
      secondaryLabel: { fr: 'Zone monétaire CFA', en: 'CFA Currency Zone' }
    },
    scopeSummary: {
      fr: 'Création de la filiale Sun King Bénin, recrutement des équipes commerciales locales et déploiement du modèle Pay-As-You-Go.',
      en: 'Incorporation of Sun King Benin, direct recruitment of ground distribution agents, and rollout of micro-PAYG solar.'
    },
    keyAchievements: {
      fr: [
        'Enregistrement juridique rapide sous droit OHADA et obtention des exonérations douanières',
        'Partenariats avec les réseaux d\'agents Mobile Money dans le sud et le centre du pays',
        'Mise en place d\'un réseau de 120 points de vente franchisés'
      ],
      en: [
        'Rapid incorporation under OHADA and securing renewable duty import exemptions',
        'Strategic partnership with mobile money agent networks across southern Benin',
        'Launch of 120 franchised retail points of sale in secondary commercial towns'
      ]
    },
    partners: ['Sun King', 'MTN Bénin', 'Moov Africa'],
    framework: 'OHADA • UEMOA Standards',
    color: '#14B8A6',
    accentClass: 'text-teal-500 bg-teal-500/10 border-teal-500/30'
  },
  {
    id: 'nairobi',
    name: {
      fr: 'Pôle Partenariats Est-Africains & YALI Hub',
      en: 'East Africa Gateway & YALI Network'
    },
    city: 'Nairobi',
    country: { fr: 'Kenya', en: 'Kenya' },
    region: { fr: 'Afrique de l\'Est • Communauté Est-Africaine (EAC)', en: 'East Africa • EAC' },
    type: 'market',
    category: 'expansion',
    coordinates: { x: 618, y: 462 },
    badge: { fr: 'Hub Innovation Est-Africain', en: 'East Africa Hub' },
    metrics: {
      primaryValue: 'EAC',
      primaryLabel: { fr: 'Zone Économique Est-Africaine', en: 'East African Community' },
      secondaryValue: 'M-Pesa',
      secondaryLabel: { fr: 'Benchmark FinTech mondial', en: 'Global FinTech Benchmark' }
    },
    scopeSummary: {
      fr: 'Veille technologique, relations avec les bailleurs anglophones et alliances avec le Regional Leadership Center YALI.',
      en: 'Technology scouting, interaction with pan-African development finance institutions, and YALI Regional Leadership integration.'
    },
    keyAchievements: {
      fr: [
        'Partage de bonnes pratiques FinTech et Pay-As-You-Go pour transposition en RDC',
        'Réseau d\'anciens auditeurs et experts en gouvernance publique et privée',
        'Relations étroites avec les fabricants technologiques et solar-tech basés à Nairobi'
      ],
      en: [
        'Cross-pollination of PAYG FinTech mechanisms adapted into Congolese commercial contexts',
        'Strong executive alumni network across public policy and private commercial infrastructure',
        'Key liaisons with leading East African clean-energy component manufacturers'
      ]
    },
    partners: ['YALI East Africa', 'Safaricom', 'CleanTech EAC'],
    framework: 'EAC Common Market Protocol',
    color: '#6366F1',
    accentClass: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/30'
  },
  {
    id: 'daressalaam',
    name: {
      fr: 'Corridor Maritime Transit Portuaire Océan Indien',
      en: 'Indian Ocean Port & Central Corridor Transit'
    },
    city: 'Dar es Salaam',
    country: { fr: 'Tanzanie', en: 'Tanzania' },
    region: { fr: 'Corridor Central • Océan Indien', en: 'Central Corridor • Indian Ocean' },
    type: 'corridor_port',
    category: 'corridors',
    coordinates: { x: 624, y: 532 },
    badge: { fr: 'Corridor Maritime Minier', en: 'Mining Maritime Ingress' },
    metrics: {
      primaryValue: '1 900 km',
      primaryLabel: { fr: 'Transit sécurisé vers Katanga', en: 'Bonded freight to Katanga' },
      secondaryValue: '14 Jours',
      secondaryLabel: { fr: 'Délai moyen dédouanement', en: 'Average clearance transit' }
    },
    scopeSummary: {
      fr: 'Port d\'entrée principal des conteneurs maritimes d\'équipements solaires et industriels en transit vers Lubumbashi et Kolwezi.',
      en: 'Primary port of entry for maritime containers of solar equipment and industrial inverters routing into Katanga mining belt.'
    },
    keyAchievements: {
      fr: [
        'Dédouanement anticipé des conteneurs EcoFlow et Sun King',
        'Suivi GPS en temps réel des convois routiers transitant par Kasumbalesa',
        'Réduction des temps d\'immobilisation portuaire de plus de 35%'
      ],
      en: [
        'Pre-clearance protocols for high-value clean-tech containers arriving from Asia/Europe',
        'Real-time GPS monitored road convoys across the border at Kasumbalesa',
        'Demurrage penalty reduction exceeding 35% through expedited documentation'
      ]
    },
    partners: ['Tanzania Ports Authority', 'Kasumbalesa Customs Border', 'Logistics Freight Forwarders'],
    framework: 'SADC Customs Transit Protocol',
    color: '#0284C7',
    accentClass: 'text-sky-500 bg-sky-500/10 border-sky-500/30'
  },
  {
    id: 'lusaka',
    name: {
      fr: 'Corridor Routier Sud & Hub Transfrontalier Zambie',
      en: 'Southern Road Transit & Zambian Copperbelt'
    },
    city: 'Lusaka / Ndola',
    country: { fr: 'Zambie', en: 'Zambia' },
    region: { fr: 'Corridor Sud • Frontière Kasumbalesa', en: 'Southern Corridor • Kasumbalesa' },
    type: 'corridor_port',
    category: 'corridors',
    coordinates: { x: 520, y: 636 },
    badge: { fr: 'Poste Frontière Stratégique', en: 'Strategic Border Link' },
    metrics: {
      primaryValue: '24/7',
      primaryLabel: { fr: 'Flux logistique supervisé', en: 'Monitored freight flow' },
      secondaryValue: 'COMESA',
      secondaryLabel: { fr: 'Régime de transit sous douane', en: 'Bonded transit regime' }
    },
    scopeSummary: {
      fr: 'Axe logistique vital reliant Sandton/Durban aux mines du Katanga via le poste frontière à haut trafic de Kasumbalesa.',
      en: 'Vital logistics artery connecting Sandton & Durban ports to Katanga mining concessions via Kasumbalesa border post.'
    },
    keyAchievements: {
      fr: [
        'Résolution des blocages de fret transfrontalier et facilitation des escortes douanières',
        'Sécurisation des convois de batteries lithium et de stations électriques',
        'Accords bilatéraux avec les transitaires agréés COMESA/SADC'
      ],
      en: [
        'Overcoming cross-border bottlenecks and coordinating bonded customs escorts',
        'Securing specialized transport compliance for lithium battery energy storage systems',
        'Master service agreements with bonded COMESA/SADC forwarders'
      ]
    },
    partners: ['Kasumbalesa Border Control', 'COMESA', 'Trans-Kalahari Transport Operators'],
    framework: 'COMESA Yellow Card • SADC Road Protocol',
    color: '#84CC16',
    accentClass: 'text-lime-500 bg-lime-500/10 border-lime-500/30'
  }
];

export const AfricaFootprintMap: React.FC = () => {
  const { language, setCurrentPage } = useApp();
  const [selectedId, setSelectedId] = useState<string>('lubumbashi');
  const [activeCategory, setActiveCategory] = useState<FootprintCategory>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const selectedLocation = OPERATIONAL_HUBS.find((h) => h.id === selectedId) || OPERATIONAL_HUBS[0];

  const filteredHubs = OPERATIONAL_HUBS.filter((hub) => {
    if (activeCategory === 'all') return true;
    return hub.category === activeCategory;
  });

  // Filter labels
  const filterOptions: { id: FootprintCategory; label: { fr: string; en: string }; icon: any; count: number }[] = [
    {
      id: 'all',
      label: { fr: 'Tout l\'Ancrage (10 Pôles)', en: 'All Footprint (10 Hubs)' },
      icon: Globe2,
      count: OPERATIONAL_HUBS.length
    },
    {
      id: 'hubs',
      label: { fr: 'Sièges & Bureaux Régionaux', en: 'Executive & Regional HQs' },
      icon: Building2,
      count: OPERATIONAL_HUBS.filter((h) => h.category === 'hubs').length
    },
    {
      id: 'solar',
      label: { fr: 'Projets Solaire & CleanTech', en: 'Solar & CleanTech Projects' },
      icon: Sun,
      count: OPERATIONAL_HUBS.filter((h) => h.category === 'solar').length
    },
    {
      id: 'corridors',
      label: { fr: 'Corridors Douane & Fret', en: 'Freight & Trade Corridors' },
      icon: Truck,
      count: OPERATIONAL_HUBS.filter((h) => h.category === 'corridors').length
    },
    {
      id: 'expansion',
      label: { fr: 'Expansion & FinTech', en: 'Expansion & FinTech' },
      icon: TrendingUp,
      count: OPERATIONAL_HUBS.filter((h) => h.category === 'expansion').length
    }
  ];

  return (
    <div id="africa-footprint-section" className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider font-mono">
            <Globe2 className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'fr' ? 'Cartographie Opérationnelle Interactive' : 'Interactive Operational Footprint'}</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            {language === 'fr' ? (
              <>
                Un Ancrage Panafricain <span className="text-blue-600">Vérifiable</span> sur le Terrain
              </>
            ) : (
              <>
                A Pan-African Footprint <span className="text-blue-600">Grounded</span> in Field Execution
              </>
            )}
          </h2>
          <div className="wp-divider" />
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {language === 'fr'
              ? 'De notre siège opérationnel de Lubumbashi jusqu\'aux corridors logistiques de Dar es Salaam et Sandton, explorez nos implantations juridiques, nos centres de déploiement solaire et nos axes d\'approvisionnement sécurisés à travers le continent.'
              : 'From our operational headquarters in Lubumbashi to bonded trade corridors in Dar es Salaam and Sandton, explore our registered legal subsidiaries, rural solar deployments, and cross-border logistics pipelines.'}
          </p>
        </div>

        {/* Global Key Stats Pill Badges */}
        <div className="flex flex-wrap items-center gap-3 self-start lg:self-end">
          <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <div>
              <span className="text-[10px] text-slate-400 font-mono uppercase font-bold block">Sièges Régionaux</span>
              <span className="text-sm font-serif-display font-bold text-slate-900">3 Pôles Permanents</span>
            </div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <div>
              <span className="text-[10px] text-slate-400 font-mono uppercase font-bold block">Santé Électrifiée</span>
              <span className="text-sm font-serif-display font-bold text-slate-900">200 Centres 24/7</span>
            </div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <div>
              <span className="text-[10px] text-slate-400 font-mono uppercase font-bold block">Chiffre d\'Affaires</span>
              <span className="text-sm font-serif-display font-bold text-slate-900">$4.5M+ Structurés</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/80 rounded-xl border border-slate-300/80 text-xs font-semibold">
        {filterOptions.map((opt) => {
          const Icon = opt.icon;
          const isActive = activeCategory === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setActiveCategory(opt.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
                isActive
                  ? 'bg-white text-slate-900 shadow-sm font-bold border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
              <span>{opt.label[language]}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isActive ? 'bg-blue-100 text-blue-800 font-bold' : 'bg-slate-300/70 text-slate-700'
                }`}
              >
                {opt.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Map + Inspection Dossier Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Map Canvas (8 Cols) */}
        <div className="lg:col-span-7 xl:col-span-8 bg-[#0B1528] rounded-2xl border border-slate-800 shadow-2xl p-4 sm:p-6 overflow-hidden relative text-white">
          {/* Subtle Cartographic Background Elements */}
          <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

          {/* Top Map Action Bar & Legend */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700 text-slate-300 text-[11px]">
                <Navigation className="w-3.5 h-3.5 text-blue-400 rotate-45" />
                <span>AFRICA BASIN • UTM COORDINATES</span>
              </span>
              <span className="hidden sm:inline-block text-slate-500 text-[11px]">
                {language === 'fr' ? 'Cliquez sur un pôle ou un pays' : 'Click any node to inspect dossier'}
              </span>
            </div>

            {/* Micro Legend */}
            <div className="flex items-center gap-3 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
                <span className="text-slate-300">{language === 'fr' ? 'HQ Lubumbashi' : 'HQ Hub'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                <span className="text-slate-300">{language === 'fr' ? 'Sièges Régionaux' : 'Regional HQs'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-slate-300">{language === 'fr' ? 'CleanTech / Solaire' : 'Solar Deployments'}</span>
              </div>
            </div>
          </div>

          {/* SVG Map Container */}
          <div className="relative w-full aspect-[1/0.95] max-h-[640px] flex items-center justify-center my-2">
            <svg
              viewBox="0 0 900 850"
              className="w-full h-full select-none"
              style={{ filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.45))' }}
            >
              <defs>
                {/* Radial Glows */}
                <radialGradient id="hqGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="blueGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#3B82F6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="greenGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#10B981" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </radialGradient>

                {/* Corridor Dash Patterns */}
                <linearGradient id="corridorGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>

                <linearGradient id="corridorIndian" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284C7" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>

                {/* Country Fill Gradients */}
                <linearGradient id="drcFill" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1A365D" />
                  <stop offset="100%" stopColor="#1E293B" />
                </linearGradient>
              </defs>

              {/* Grid Reference Lat / Long lines */}
              <g className="opacity-15 stroke-slate-400 stroke-[0.7]" strokeDasharray="3 4">
                {/* Equator */}
                <line x1="100" y1="460" x2="800" y2="460" />
                <text x="120" y="455" fill="#94A3B8" fontSize="10" fontFamily="monospace" letterSpacing="1">
                  ÉQUATEUR 0° LAT
                </text>

                {/* Tropic of Capricorn */}
                <line x1="250" y1="700" x2="760" y2="700" />
                <text x="260" y="695" fill="#94A3B8" fontSize="9" fontFamily="monospace" letterSpacing="1">
                  TROPIQUE DU CAPRICORNE 23.5°S
                </text>

                {/* Tropic of Cancer */}
                <line x1="120" y1="210" x2="760" y2="210" />
                <text x="130" y="205" fill="#94A3B8" fontSize="9" fontFamily="monospace" letterSpacing="1">
                  TROPIQUE DU CANCER 23.5°N
                </text>

                {/* Meridian 20°E */}
                <line x1="450" y1="100" x2="450" y2="780" />
                <text x="455" y="120" fill="#94A3B8" fontSize="9" fontFamily="monospace">
                  20° EST
                </text>
              </g>

              {/* 1. Continental Silhouette Outline (Africa) */}
              <path
                d="M 235 90 
                   C 310 75, 410 70, 480 95
                   C 530 110, 580 140, 595 190
                   C 610 230, 640 260, 690 310
                   C 730 350, 725 380, 680 405
                   C 645 425, 630 460, 640 520
                   C 648 570, 615 620, 570 680
                   C 530 730, 500 780, 470 810
                   C 440 840, 410 830, 395 780
                   C 380 730, 340 680, 330 630
                   C 320 570, 350 510, 340 460
                   C 330 430, 270 420, 240 430
                   C 200 440, 160 380, 150 330
                   C 135 280, 150 220, 175 180
                   C 190 150, 205 110, 235 90 Z"
                fill="#0F1E36"
                stroke="#1E3A5F"
                strokeWidth="2"
                className="transition-colors"
              />

              {/* Madagascar */}
              <path
                d="M 685 550
                   C 720 580, 735 630, 715 700
                   C 700 720, 680 710, 675 660
                   C 670 610, 665 570, 685 550 Z"
                fill="#0F1E36"
                stroke="#1E3A5F"
                strokeWidth="1.5"
              />

              {/* 2. Specific Footprint Country Polygons (Interactive) */}
              
              {/* Cameroon Polygon */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedId('douala')}
                onMouseEnter={() => setHoveredId('douala')}
                onMouseLeave={() => setHoveredId(null)}
              >
                <path
                  d="M 360 395 
                     L 405 380 
                     L 415 440 
                     L 380 455 
                     L 355 425 Z"
                  fill={selectedId === 'douala' ? '#1E40AF' : '#172554'}
                  stroke={selectedId === 'douala' ? '#60A5FA' : '#2563EB'}
                  strokeWidth={selectedId === 'douala' ? '2.5' : '1.5'}
                  className="transition-all duration-300 group-hover:fill-blue-800"
                />
                <text x="370" y="405" fill="#93C5FD" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  CMR
                </text>
              </g>

              {/* Democratic Republic of the Congo (DRC) Polygon */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedId('lubumbashi')}
                onMouseEnter={() => setHoveredId('lubumbashi')}
                onMouseLeave={() => setHoveredId(null)}
              >
                <path
                  d="M 405 445 
                     L 460 435 
                     L 520 440 
                     L 545 490 
                     L 535 560 
                     L 515 620 
                     L 475 605 
                     L 440 560 
                     L 400 525 
                     L 385 475 Z"
                  fill={selectedLocation.country.fr.includes('RDC') ? '#1E3A8A' : '#1E293B'}
                  stroke={selectedLocation.country.fr.includes('RDC') ? '#F59E0B' : '#3B82F6'}
                  strokeWidth={selectedLocation.country.fr.includes('RDC') ? '2.5' : '1.5'}
                  className="transition-all duration-300 group-hover:fill-blue-900"
                />
                <text x="445" y="475" fill="#FDE68A" fontSize="13" fontWeight="bold" fontFamily="monospace" letterSpacing="1.5">
                  RDC
                </text>
                <text x="430" y="490" fill="#93C5FD" fontSize="8" fontFamily="sans-serif">
                  Siège & Opérations
                </text>
              </g>

              {/* South Africa Polygon */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedId('sandton')}
                onMouseEnter={() => setHoveredId('sandton')}
                onMouseLeave={() => setHoveredId(null)}
              >
                <path
                  d="M 440 705 
                     L 540 690 
                     L 555 745 
                     L 505 805 
                     L 445 805 
                     L 415 765 Z"
                  fill={selectedId === 'sandton' ? '#4C1D95' : '#2E1065'}
                  stroke={selectedId === 'sandton' ? '#A78BFA' : '#7C3AED'}
                  strokeWidth={selectedId === 'sandton' ? '2.5' : '1.5'}
                  className="transition-all duration-300 group-hover:fill-purple-900"
                />
                <text x="470" y="750" fill="#DDD6FE" fontSize="10" fontWeight="bold" fontFamily="monospace">
                  ZAF
                </text>
              </g>

              {/* Benin Polygon */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedId('cotonou')}
                onMouseEnter={() => setHoveredId('cotonou')}
                onMouseLeave={() => setHoveredId(null)}
              >
                <path
                  d="M 315 375 L 335 375 L 332 410 L 318 410 Z"
                  fill={selectedId === 'cotonou' ? '#115E59' : '#134E4A'}
                  stroke={selectedId === 'cotonou' ? '#2DD4BF' : '#0D9488'}
                  strokeWidth="1.5"
                  className="transition-all duration-300 group-hover:fill-teal-800"
                />
                <text x="310" y="370" fill="#99F6E4" fontSize="8" fontWeight="bold" fontFamily="monospace">
                  BEN
                </text>
              </g>

              {/* Kenya Polygon */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedId('nairobi')}
                onMouseEnter={() => setHoveredId('nairobi')}
                onMouseLeave={() => setHoveredId(null)}
              >
                <path
                  d="M 590 435 L 635 430 L 645 480 L 595 485 Z"
                  fill={selectedId === 'nairobi' ? '#3730A3' : '#1E1B4B'}
                  stroke={selectedId === 'nairobi' ? '#818CF8' : '#4F46E5'}
                  strokeWidth="1.5"
                  className="transition-all duration-300 group-hover:fill-indigo-900"
                />
                <text x="605" y="455" fill="#C7D2FE" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  KEN
                </text>
              </g>

              {/* Tanzania Polygon */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedId('daressalaam')}
                onMouseEnter={() => setHoveredId('daressalaam')}
                onMouseLeave={() => setHoveredId(null)}
              >
                <path
                  d="M 550 495 L 635 490 L 640 560 L 565 565 Z"
                  fill={selectedId === 'daressalaam' ? '#075985' : '#082F49'}
                  stroke={selectedId === 'daressalaam' ? '#38BDF8' : '#0284C7'}
                  strokeWidth="1.5"
                  className="transition-all duration-300 group-hover:fill-sky-900"
                />
                <text x="580" y="525" fill="#BAE6FD" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  TZA
                </text>
              </g>

              {/* Zambia Polygon */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedId('lusaka')}
                onMouseEnter={() => setHoveredId('lusaka')}
                onMouseLeave={() => setHoveredId(null)}
              >
                <path
                  d="M 480 610 L 560 610 L 540 665 L 470 655 Z"
                  fill={selectedId === 'lusaka' ? '#3F6212' : '#1A2E05'}
                  stroke={selectedId === 'lusaka' ? '#A3E635' : '#65A30D'}
                  strokeWidth="1.5"
                  className="transition-all duration-300 group-hover:fill-lime-950"
                />
                <text x="500" y="635" fill="#D9F99D" fontSize="8" fontWeight="bold" fontFamily="monospace">
                  ZMB
                </text>
              </g>

              {/* 3. Trade & Logistic Corridors (Animated Dash Lines) */}
              
              {/* Corridor A: Sandton -> Lusaka -> Lubumbashi -> Kolwezi (Southern Mining Route) */}
              <g className="corridor-southern">
                <path
                  d="M 502 720 L 520 636 L 508 588 L 480 580"
                  fill="none"
                  stroke="url(#corridorGold)"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
                <text x="525" y="680" fill="#FCD34D" fontSize="8" fontFamily="monospace" fontWeight="bold">
                  CORRIDOR MINIER SUD (SANDTON-KATANGA)
                </text>
              </g>

              {/* Corridor B: Dar es Salaam -> Lubumbashi (Indian Ocean Maritime Transit Route) */}
              <g className="corridor-eastern">
                <path
                  d="M 624 532 L 560 550 L 508 588"
                  fill="none"
                  stroke="url(#corridorIndian)"
                  strokeWidth="2.5"
                  strokeDasharray="5 3"
                />
                <text x="550" y="575" fill="#38BDF8" fontSize="7.5" fontFamily="monospace">
                  PORT TRANSIT (DAR ES SALAAM)
                </text>
              </g>

              {/* Corridor C: Lubumbashi -> Mbuji-Mayi Kasaï (2 400 km ESG Route) */}
              <g className="corridor-kasai">
                <path
                  d="M 508 588 L 472 522"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <text x="420" y="555" fill="#34D399" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
                  2 400 KM KASAÏ EXPEDITION
                </text>
              </g>

              {/* Corridor D: Douala -> Kinshasa (CEMAC-Congo Basin Trade Axis) */}
              <g className="corridor-west">
                <path
                  d="M 382 418 L 400 455 L 412 504"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                />
              </g>

              {/* 4. Operational Hub Pins & Pulsing Rings */}
              {filteredHubs.map((hub) => {
                const isSelected = selectedId === hub.id;
                const isHovered = hoveredId === hub.id;
                const { x, y } = hub.coordinates;

                return (
                  <g
                    key={hub.id}
                    className="cursor-pointer transition-transform duration-200"
                    onClick={() => setSelectedId(hub.id)}
                    onMouseEnter={() => setHoveredId(hub.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      transformOrigin: `${x}px ${y}px`,
                      transform: isSelected || isHovered ? 'scale(1.25)' : 'scale(1)'
                    }}
                  >
                    {/* Glowing outer pulse ring for priority hubs */}
                    {hub.hasPulse && (
                      <circle
                        cx={x}
                        cy={y}
                        r="18"
                        fill="none"
                        stroke={hub.color}
                        strokeWidth="1.5"
                        opacity="0.5"
                        className="animate-ping"
                      />
                    )}

                    {/* Secondary aura */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? '14' : '10'}
                      fill={hub.color}
                      opacity={isSelected ? '0.35' : '0.15'}
                    />

                    {/* Outer border ring */}
                    <circle
                      cx={x}
                      cy={y}
                      r={hub.type === 'hq' ? '7.5' : '5.5'}
                      fill={isSelected ? '#FFFFFF' : hub.color}
                      stroke="#0B1528"
                      strokeWidth="2"
                    />

                    {/* Inner core dot */}
                    <circle
                      cx={x}
                      cy={y}
                      r={hub.type === 'hq' ? '3.5' : '2.5'}
                      fill={isSelected ? hub.color : '#0B1528'}
                    />

                    {/* Text Label next to pin */}
                    <g
                      transform={`translate(${
                        x > 540 ? x - 10 : x + 12
                      }, ${y > 700 ? y - 10 : y + 4})`}
                      textAnchor={x > 540 ? 'end' : 'start'}
                    >
                      <rect
                        x={x > 540 ? -75 : -4}
                        y="-10"
                        width={hub.type === 'hq' ? 95 : 80}
                        height="18"
                        rx="4"
                        fill="#0B1528"
                        fillOpacity="0.85"
                        stroke={isSelected ? hub.color : '#1E293B'}
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="2"
                        fill={isSelected ? '#FFFFFF' : '#E2E8F0'}
                        fontSize="9"
                        fontWeight={isSelected || hub.type === 'hq' ? 'bold' : 'normal'}
                        fontFamily="system-ui, sans-serif"
                      >
                        {hub.city}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Quick Hub Ribbon at Bottom of Map */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'fr' ? 'Accès Rapide :' : 'Quick Access:'}</span>
            </span>
            {OPERATIONAL_HUBS.map((h) => (
              <button
                key={h.id}
                onClick={() => setSelectedId(h.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  selectedId === h.id
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: h.color }} />
                <span>{h.city}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Dynamic Executive Inspection Dossier (5 or 4 Cols) */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-7 space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Top Metadata Badge & Status */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${selectedLocation.accentClass}`}>
                {selectedLocation.badge[language]}
              </div>
              <span className="text-xs font-mono text-slate-500 font-bold">
                {selectedLocation.country[language]}
              </span>
            </div>

            {/* Title & Region */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>{selectedLocation.region[language]}</span>
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-slate-900">
                {selectedLocation.name[language]}
              </h3>
              {selectedLocation.address && (
                <p className="text-xs text-slate-500 mt-1 font-mono">
                  {selectedLocation.address}
                </p>
              )}
            </div>

            {/* Scope Summary Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              {selectedLocation.scopeSummary[language]}
            </p>

            {/* Metrics Dual-Box */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-center">
                <span className="font-serif-display text-xl sm:text-2xl font-bold text-blue-900 block">
                  {selectedLocation.metrics.primaryValue}
                </span>
                <span className="text-[11px] text-blue-700 font-medium leading-tight block mt-0.5">
                  {selectedLocation.metrics.primaryLabel[language]}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="font-serif-display text-xl sm:text-2xl font-bold text-slate-900 block">
                  {selectedLocation.metrics.secondaryValue}
                </span>
                <span className="text-[11px] text-slate-600 font-medium leading-tight block mt-0.5">
                  {selectedLocation.metrics.secondaryLabel[language]}
                </span>
              </div>
            </div>

            {/* Key Field Achievements */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold font-mono text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'fr' ? 'Réalisations & Impact Terrain' : 'Ground Impact & Milestones'}</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {selectedLocation.keyAchievements[language].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Regulatory Framework Pill */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span className="font-bold uppercase tracking-wider font-mono text-[10px]">Cadre Réglementaire :</span>
                <span className="font-mono text-blue-600 font-bold text-[11px]">{selectedLocation.framework}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedLocation.partners.map((partner, pIdx) => (
                  <span
                    key={pIdx}
                    className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium border border-slate-200"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button: Initiate Mission in this Territory */}
          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentPage('contact')}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>
                {language === 'fr'
                  ? `Initier une Mission dans ce Territoire (${selectedLocation.city})`
                  : `Initiate Mission for this Hub (${selectedLocation.city})`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
