import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Resource } from '../../types';
import { ResourceCard } from '../resources/ResourceCard';

interface FeaturedSectionProps {
  resources: Resource[];
  onSelectResource: (resource: Resource) => void;
  onViewAll: () => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  resources,
  onSelectResource,
  onViewAll,
}) => {
  const featured = resources.filter((r) => r.isFeatured).slice(0, 6);

  if (featured.length === 0) return null;

  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/70 text-[#1769FF] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curator Selected</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07152E] tracking-tight">
              Featured Ecosystem Highlights
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              High-value frameworks, tools, production prompt matrices, and learning roadmaps verified for real-world execution.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1769FF] hover:text-[#1254cc] transition-colors"
          >
            <span>View All Resources</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((res) => (
            <ResourceCard
              key={res.id}
              resource={res}
              onClick={onSelectResource}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
