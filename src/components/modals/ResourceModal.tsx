import React from 'react';
import {
  X,
  ExternalLink,
  Bookmark,
  Share2,
  Calendar,
  Layers,
  Globe,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Lock,
  ArrowRight,
  User,
  Building,
  HardDrive
} from 'lucide-react';
import { Resource } from '../../types';
import { Badge } from '../common/Badge';
import { useAuth } from '../../context/AuthContext';

interface ResourceModalProps {
  resource: Resource | null;
  onClose: () => void;
  onSelectResource: (res: Resource) => void;
  allResources?: Resource[];
}

export const ResourceModal: React.FC<ResourceModalProps> = ({
  resource,
  onClose,
  onSelectResource,
  allResources = [],
}) => {
  const { savedResourceIds, toggleSaveResource } = useAuth();

  if (!resource) return null;

  const isSaved = savedResourceIds.includes(resource.id);

  // Find related resources in same category
  const related = allResources
    .filter((r) => r.id !== resource.id && r.category === resource.category)
    .slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: resource.title,
          text: resource.shortDescription,
          url: window.location.href,
        });
      } catch {
        // Ignored or cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const getPrimaryCta = () => {
    if (resource.isPremium) {
      return {
        label: 'Purchase & Access Toolkit',
        sub: resource.price || 'Commercial Single License',
      };
    }
    if (resource.resourceType === 'Course') {
      return {
        label: 'Start Learning Course',
        sub: 'Official Free Curriculum',
      };
    }
    if (resource.resourceType === 'Tool' || resource.resourceType === 'AI Tool') {
      return {
        label: 'Visit Official Tool Website',
        sub: 'Verified Publisher Portal',
      };
    }
    if (resource.resourceType === 'Template') {
      return {
        label: 'Access Verified Template',
        sub: 'Direct Free Duplicate / Download',
      };
    }
    return {
      label: 'Explore Resource Portal',
      sub: 'Official Verified Source',
    };
  };

  const cta = getPrimaryCta();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#07152E]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#1769FF] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
              {resource.category}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-medium text-slate-500">{resource.resourceType}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveResource(resource.id)}
              className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                isSaved
                  ? 'bg-blue-50 text-[#1769FF] border-blue-200'
                  : 'text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto px-6 py-6 sm:px-8 space-y-8">
          {/* Main Visual & Top Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5 relative rounded-2xl overflow-hidden bg-slate-900 h-52 md:h-full min-h-[220px]">
              <img
                src={resource.thumbnail}
                alt={resource.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#16D9FF]">
                  {resource.accessType}
                </span>
                <p className="text-xs font-medium text-slate-200">{resource.platform}</p>
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {resource.isFeatured && (
                    <Badge variant="cyan" size="sm">
                      <Sparkles className="w-3 h-3 text-[#0092B8]" />
                      Featured Resource
                    </Badge>
                  )}
                  {resource.isFree ? (
                    <Badge variant="emerald" size="sm">
                      Free Access
                    </Badge>
                  ) : (
                    <Badge variant="amber" size="sm">
                      <Lock className="w-3 h-3 text-amber-600" />
                      Pro Access
                    </Badge>
                  )}
                  <Badge variant="gray" size="sm">
                    {resource.skillLevel}
                  </Badge>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold text-[#07152E] tracking-tight leading-snug mb-3">
                  {resource.title}
                </h1>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {resource.shortDescription}
                </p>
              </div>

              {/* Primary Call to Action Box */}
              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Access Method
                  </span>
                  <span className="text-xs text-slate-700 font-medium">
                    {cta.sub}
                  </span>
                </div>

                <a
                  href={resource.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1769FF] hover:bg-[#1254cc] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all text-center"
                >
                  <span>{cta.label}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-slate-100">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-600 block mb-1 flex items-center gap-1">
                <User className="w-3 h-3 text-[#1769FF]" />
                Author / Creator
              </span>
              <p className="text-xs font-semibold text-[#07152E] truncate">{resource.author}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-600 block mb-1 flex items-center gap-1">
                <Building className="w-3 h-3 text-[#1769FF]" />
                Publisher
              </span>
              <p className="text-xs font-semibold text-[#07152E] truncate">
                {resource.publisher || 'MZS Verified'}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-600 block mb-1 flex items-center gap-1">
                <HardDrive className="w-3 h-3 text-[#1769FF]" />
                Format / Size
              </span>
              <p className="text-xs font-semibold text-[#07152E] truncate">
                {resource.format} {resource.fileSize ? `(${resource.fileSize})` : ''}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-600 block mb-1 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#1769FF]" />
                License
              </span>
              <p className="text-xs font-semibold text-[#07152E] truncate">
                {resource.license || 'Standard Terms'}
              </p>
            </div>
          </div>

          {/* Detailed Overview */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-[#07152E] uppercase tracking-wider">
              Comprehensive Overview
            </h2>
            <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
              <p>{resource.longDescription}</p>
            </div>
          </div>

          {/* Key Features or Curriculum if present */}
          {resource.keyFeatures && resource.keyFeatures.length > 0 && (
            <div className="space-y-3 bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
              <h3 className="text-xs font-bold text-[#07152E] uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1769FF]" />
                What&apos;s Included &amp; Key Highlights
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {resource.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#1769FF] font-bold">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Curriculum breakdown for courses */}
          {resource.curriculum && resource.curriculum.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#07152E] uppercase tracking-wider">
                Syllabus &amp; Curriculum Breakdown
              </h3>
              <div className="space-y-2">
                {resource.curriculum.map((mod, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
                    <div className="flex items-center justify-between text-xs font-bold text-[#07152E] mb-1">
                      <span>{mod.title}</span>
                      <span className="text-slate-400 font-normal">{mod.duration}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {mod.topics.map((t, tidx) => (
                        <span
                          key={tidx}
                          className="text-[11px] text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Usage & License Notes */}
          {resource.usageNotes && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
              <span className="font-bold text-[#07152E] block">Usage &amp; Distribution Notice:</span>
              <p>{resource.usageNotes}</p>
            </div>
          )}

          {/* Tags */}
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Metadata &amp; Keywords
            </span>
            <div className="flex flex-wrap gap-1.5">
              {resource.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related Resources */}
          {related.length > 0 && (
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <h3 className="text-xs font-bold text-[#07152E] uppercase tracking-wider">
                Related {resource.category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {related.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectResource(rel)}
                    className="p-3 rounded-xl border border-slate-200 hover:border-[#1769FF] bg-slate-50 hover:bg-white cursor-pointer transition-all"
                  >
                    <span className="text-[10px] font-semibold text-[#1769FF] block mb-1">
                      {rel.resourceType}
                    </span>
                    <h4 className="text-xs font-bold text-[#07152E] line-clamp-1 mb-1">
                      {rel.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {rel.shortDescription}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
