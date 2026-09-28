export type ResourceCategory =
  | 'Courses & Learning'
  | 'Templates'
  | 'Graphics & Design'
  | 'Video Editing & Reels'
  | 'Software & Tools'
  | 'AI Resources'
  | 'eBooks & Knowledge'
  | 'Methods, Tips & Resources'
  | 'Digital Store';

export type ResourceType =
  | 'Course'
  | 'Tutorial'
  | 'Template'
  | 'Graphic'
  | 'Video'
  | 'Software'
  | 'Tool'
  | 'AI Tool'
  | 'AI Prompt'
  | 'AI Workflow'
  | 'eBook'
  | 'Guide'
  | 'Cheat Sheet'
  | 'Roadmap'
  | 'Bundle'
  | 'Digital Product'
  | 'Other';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export type AccessType = 'Free' | 'Freemium' | 'Open Source' | 'Premium' | 'Official';

export type ResourceStatus = 'draft' | 'review' | 'ready' | 'published' | 'updated' | 'archived';

export interface Resource {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  thumbnail: string;
  gallery?: string[];
  category: ResourceCategory;
  subcategory: string;
  resourceType: ResourceType;
  tags: string[];
  language: string;
  skillLevel: SkillLevel;
  format: string;
  fileSize?: string;
  platform: string;
  externalUrl: string;
  accessType: AccessType;
  isFree: boolean;
  isPremium: boolean;
  isFeatured: boolean;
  status: ResourceStatus;
  author: string;
  publisher?: string;
  license?: string;
  usageNotes?: string;
  rating?: number;
  views?: number;
  downloadsCount?: number;
  duration?: string;
  price?: string;
  curriculum?: { title: string; duration: string; topics: string[] }[];
  keyFeatures?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ResourceRequest {
  id: string;
  name: string;
  email: string;
  resourceType: string;
  resourceName: string;
  description: string;
  preferredFormat?: string;
  referenceLink?: string;
  additionalNotes?: string;
  status: 'pending' | 'in-review' | 'fulfilled' | 'declined';
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'editor' | 'moderator' | 'user';
  createdAt: string;
  updatedAt: string;
  savedResourceIds?: string[];
}

export interface FilterState {
  searchQuery: string;
  category: string;
  resourceType: string;
  skillLevel: string;
  accessType: string;
  sortBy: 'relevance' | 'newest' | 'popular' | 'title';
  featuredOnly: boolean;
}
