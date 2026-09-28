import { ResourceCategory } from '../types';

export const SITE_CONFIG = {
  name: 'MZS Digital Mastery',
  descriptor: 'Digital Resources & Tools Hub',
  tagline: 'Explore • Learn • Master',
  domain: 'mzsdigitalmastery.site',
  url: 'https://mzsdigitalmastery.site',
  contactEmail: 'mzsdigitalmastery@gmail.com',
  colors: {
    navy: '#07152E',
    royalBlue: '#1769FF',
    electricBlue: '#258BFF',
    cyan: '#16D9FF',
    softBg: '#F4F7FB',
    darkText: '#172033',
  },
  social: {
    youtube: 'https://youtube.com/@mzsdigitalmastery',
    instagram: 'https://instagram.com/mzsdigitalmastery',
    twitter: 'https://x.com/mzsdigitalmastery',
    whatsappCommunity: 'https://chat.whatsapp.com/mzsdigitalmastery-community',
    whatsappChannel: 'https://whatsapp.com/channel/mzsdigitalmastery-updates',
  },
};

export interface CategoryMeta {
  title: ResourceCategory;
  slug: string;
  icon: string;
  shortDesc: string;
  accentColor: string;
  badge: string;
}

export const CATEGORIES_CONFIG: CategoryMeta[] = [
  {
    title: 'Courses & Learning',
    slug: 'learn',
    icon: 'GraduationCap',
    shortDesc: 'Structured courses, skill paths, video tutorials, and interactive roadmaps.',
    accentColor: '#1769FF',
    badge: 'Education',
  },
  {
    title: 'AI Resources',
    slug: 'ai',
    icon: 'Sparkles',
    shortDesc: 'AI tools, production prompts, automation workflows, and LLM integrations.',
    accentColor: '#16D9FF',
    badge: 'AI & Automations',
  },
  {
    title: 'Software & Tools',
    slug: 'tools',
    icon: 'Cpu',
    shortDesc: 'Verified developer utilities, productivity powerhouses, and creative software.',
    accentColor: '#258BFF',
    badge: 'Utilities',
  },
  {
    title: 'Graphics & Design',
    slug: 'graphics',
    icon: 'Palette',
    shortDesc: 'Vector kits, typography, icon packs, Figma design systems, and UI assets.',
    accentColor: '#8B5CF6',
    badge: 'Design',
  },
  {
    title: 'Templates',
    slug: 'templates',
    icon: 'LayoutTemplate',
    shortDesc: 'Productivity systems, Notion dashboards, presentation decks, and business sheets.',
    accentColor: '#10B981',
    badge: 'Frameworks',
  },
  {
    title: 'Video Editing & Reels',
    slug: 'video',
    icon: 'Film',
    shortDesc: 'Premiere Pro & After Effects presets, LUTs, sound effects, and viral reel hooks.',
    accentColor: '#F59E0B',
    badge: 'Media',
  },
  {
    title: 'eBooks & Knowledge',
    slug: 'knowledge',
    icon: 'BookOpen',
    shortDesc: 'Field manuals, comprehensive cheat sheets, architecture blueprints, and guides.',
    accentColor: '#6366F1',
    badge: 'Insights',
  },
  {
    title: 'Methods, Tips & Resources',
    slug: 'guides',
    icon: 'Compass',
    shortDesc: 'Step-by-step how-to tutorials, digital strategies, and tested productivity hacks.',
    accentColor: '#06B6D4',
    badge: 'Practice',
  },
  {
    title: 'Digital Store',
    slug: 'store',
    icon: 'ShoppingBag',
    shortDesc: 'Curated premium toolkits, master bundle packs, and enterprise-grade resources.',
    accentColor: '#EC4899',
    badge: 'Commercial',
  },
];
