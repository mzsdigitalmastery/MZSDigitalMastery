import React from 'react';
import {
  Bookmark,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Eye,
  Star,
  CheckCircle2,
  Lock,
  Layers,
  FileCode
} from 'lucide-react';
import { Resource } from '../../types';
import { Badge } from '../common/Badge';
import { useAuth } from '../../context/AuthContext';

interface ResourceCardProps {
  resource: Resource;
  onClick: (resource: Resource) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onClick }) => {
  const { savedResourceIds, toggleSaveResource } = useAuth();
  const isSaved = savedResourceIds.includes(resource.id);

  const getCtaLabel = (res: Resource) => {
    if (res.isPremium) return 'View Pro Pack';
    if (res.resourceType === 'Course') return 'Explore Course';
    if (res.resourceType === 'Tool' || res.resourceType === 'AI Tool') return 'Explore Tool';
    if (res.resourceType === 'Template') return 'Use Template';
    return 'Explore Resource';
  };

  return (
    <article
      onClick={() => onClick(resource)}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-[#1769FF]/50 shadow-xs hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer relative"
    >
      <div>
        {/* Card Header & Media Preview */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
          <img
            src={resource.thumbnail}
            alt={resource.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Badges on top of image */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-1.5 flex-wrap">
              {resource.isFeatured && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#07152E]/90 text-[#16D9FF] backdrop-blur-xs border border-cyan-400/30 shadow-xs">
                  <Sparkles className="w-3 h-3 text-[#16D9FF]" />
                  Featured
                </span>
              )}
              {resource.isFree ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow-xs">
                  FREE
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-xs">
                  <Lock className="w-2.5 h-2.5" />
                  PRO
                </span>
              )}
            </div>

            {/* Save / Bookmark Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleSaveResource(resource.id);
              }}
              title={isSaved ? 'Remove from Saved' : 'Save Resource'}
              className={`pointer-events-auto p-2 rounded-xl backdrop-blur-md transition-all ${
                isSaved
                  ? 'bg-[#1769FF] text-white shadow-md'
                  : 'bg-black/40 hover:bg-black/60 text-white'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Bottom Overlay Info on Image */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
            <span className="text-[11px] font-semibold text-slate-200 drop-shadow-xs">
              {resource.resourceType}
            </span>
            <span className="text-[11px] text-slate-300 drop-shadow-xs flex items-center gap-1">
              <Layers className="w-3 h-3 text-[#16D9FF]" />
              {resource.skillLevel}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span className="font-semibold text-[#1769FF] hover:underline">
              {resource.category}
            </span>
            <span>•</span>
            <span className="truncate">{resource.subcategory}</span>
          </div>

          <h3 className="font-bold text-base text-[#07152E] group-hover:text-[#1769FF] transition-colors line-clamp-2 leading-snug mb-2">
            {resource.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
            {resource.shortDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {resource.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-md transition-colors"
              >
                #{tag}
              </span>
            ))}
            {resource.tags.length > 3 && (
              <span className="text-[10px] text-slate-400 self-center">
                +{resource.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-4 sm:px-5 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3 text-slate-500 text-[11px]">
          {resource.rating && (
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              {resource.rating.toFixed(1)}
            </span>
          )}
          {resource.format && (
            <span className="truncate max-w-[100px] text-slate-500">
              {resource.format}
            </span>
          )}
        </div>

        <span className="inline-flex items-center gap-1 font-semibold text-[#1769FF] group-hover:translate-x-0.5 transition-transform text-xs">
          <span>{getCtaLabel(resource)}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
};
