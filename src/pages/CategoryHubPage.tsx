import React, { useState, useMemo } from 'react';
import { Resource, FilterState } from '../types';
import { ResourceCard } from '../components/resources/ResourceCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { Search, Sparkles, Filter, CheckCircle2, ArrowRight } from 'lucide-react';
import { CategoryMeta } from '../config/site';

interface CategoryHubPageProps {
  categoryMeta: CategoryMeta;
  resources: Resource[];
  loading: boolean;
  onSelectResource: (resource: Resource) => void;
  onNavigate: (path: string) => void;
}

export const CategoryHubPage: React.FC<CategoryHubPageProps> = ({
  categoryMeta,
  resources,
  loading,
  onSelectResource,
  onNavigate,
}) => {
  const [subFilter, setSubFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  // Extract unique subcategories
  const subcategories = useMemo(() => {
    const subs = new Set<string>();
    resources.forEach((r) => {
      if (r.category === categoryMeta.title && r.subcategory) {
        subs.add(r.subcategory);
      }
    });
    return ['All', ...Array.from(subs)];
  }, [resources, categoryMeta.title]);

  const categoryResources = useMemo(() => {
    return resources.filter((res) => {
      if (res.category !== categoryMeta.title) return false;
      if (subFilter !== 'All' && res.subcategory !== subFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          res.title.toLowerCase().includes(q) ||
          res.shortDescription.toLowerCase().includes(q) ||
          res.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [resources, categoryMeta.title, subFilter, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[
          { label: 'Ecosystem', path: '/' },
          { label: 'Categories', path: '/resources' },
          { label: categoryMeta.title },
        ]}
        onNavigate={onNavigate}
      />

      {/* Hub Hero Banner */}
      <div className="mt-4 mb-10 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#1769FF] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{categoryMeta.badge} Ecosystem Hub</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#07152E] tracking-tight leading-tight mb-3">
            {categoryMeta.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
            {categoryMeta.shortDesc}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Verified Licensure</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Zero Malware or Cracked Files</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Active Curriculum Updates</span>
            </span>
          </div>
        </div>
      </div>

      {/* Subcategory Pills & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSubFilter(sub)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                subFilter === sub
                  ? 'bg-[#07152E] text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${categoryMeta.title}...`}
            className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1769FF]"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <LoadingSkeleton count={6} />
      ) : categoryResources.length === 0 ? (
        <EmptyState
          title={`No ${categoryMeta.title} items found`}
          description="Try selecting a different subcategory or resetting your search term."
          actionText="Clear Filters"
          onAction={() => {
            setSubFilter('All');
            setSearch('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryResources.map((res) => (
            <ResourceCard
              key={res.id}
              resource={res}
              onClick={onSelectResource}
            />
          ))}
        </div>
      )}
    </div>
  );
};
