import React, { useState, useMemo } from 'react';
import { Resource, FilterState } from '../types';
import { ResourceCard } from '../components/resources/ResourceCard';
import { FilterPanel } from '../components/resources/FilterPanel';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface ResourcesHubPageProps {
  resources: Resource[];
  loading: boolean;
  onSelectResource: (resource: Resource) => void;
  onNavigate: (path: string) => void;
  initialCategory?: string;
  initialSearch?: string;
  savedOnly?: boolean;
  savedResourceIds?: string[];
}

export const ResourcesHubPage: React.FC<ResourcesHubPageProps> = ({
  resources,
  loading,
  onSelectResource,
  onNavigate,
  initialCategory = '',
  initialSearch = '',
  savedOnly = false,
  savedResourceIds = [],
}) => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: initialSearch,
    category: initialCategory,
    resourceType: '',
    skillLevel: '',
    accessType: '',
    sortBy: 'relevance',
    featuredOnly: false,
  });

  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      // Saved-only filter
      if (savedOnly && !savedResourceIds.includes(res.id)) {
        return false;
      }

      // Category
      if (filters.category && res.category !== filters.category) {
        return false;
      }

      // Resource Type
      if (filters.resourceType && res.resourceType !== filters.resourceType) {
        return false;
      }

      // Skill Level
      if (filters.skillLevel && res.skillLevel !== filters.skillLevel) {
        return false;
      }

      // Access Type
      if (filters.accessType) {
        if (filters.accessType === 'Free' && !res.isFree) return false;
        if (filters.accessType === 'Premium' && !res.isPremium) return false;
      }

      // Featured only
      if (filters.featuredOnly && !res.isFeatured) {
        return false;
      }

      // Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const inTitle = res.title.toLowerCase().includes(q);
        const inDesc = res.shortDescription.toLowerCase().includes(q);
        const inTags = res.tags.some((t) => t.toLowerCase().includes(q));
        const inSub = res.subcategory.toLowerCase().includes(q);
        const inAuthor = res.author.toLowerCase().includes(q);
        if (!inTitle && !inDesc && !inTags && !inSub && !inAuthor) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (filters.sortBy === 'popular') {
        return (b.views || 0) - (a.views || 0);
      }
      if (filters.sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0; // relevance / default
    });
  }, [resources, filters, savedOnly, savedResourceIds]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      category: '',
      resourceType: '',
      skillLevel: '',
      accessType: '',
      sortBy: 'relevance',
      featuredOnly: false,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[
          { label: 'Ecosystem', path: '/' },
          { label: savedOnly ? 'Saved Bookmarks' : 'Resource Directory' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Page Title & Search Bar Header */}
      <div className="mt-4 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#07152E] tracking-tight">
            {savedOnly ? 'Your Saved Resources' : 'Digital Resource Directory'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            {savedOnly
              ? 'Quickly access all bookmarked roadmaps, prompts, templates, and courses.'
              : 'Browse our complete catalog of verified digital assets, courses, and workflows.'}
          </p>
        </div>

        {/* Quick Search Field */}
        <div className="flex items-center gap-2 w-full md:w-80">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              placeholder="Filter by keyword..."
              className="w-full text-xs font-medium bg-white border border-slate-200/90 rounded-xl pl-9 pr-3 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1769FF]"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters({ ...filters, searchQuery: '' })}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50"
            title="Open Filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid with Sidebar Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-3 sticky top-28">
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
            totalCount={filteredResources.length}
          />
        </div>

        {/* Resources Grid */}
        <div className="lg:col-span-9">
          {loading ? (
            <LoadingSkeleton count={6} />
          ) : filteredResources.length === 0 ? (
            <EmptyState
              title={savedOnly ? 'No saved resources yet' : 'No matching resources found'}
              description={
                savedOnly
                  ? 'Click the bookmark icon on any resource card to save items for quick offline reference.'
                  : 'Try broadening your search query or resetting filters.'
              }
              actionText="Reset All Filters"
              onAction={handleResetFilters}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((res) => (
                <ResourceCard
                  key={res.id}
                  resource={res}
                  onClick={onSelectResource}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs lg:hidden p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-base text-[#07152E]">Filter Resources</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              totalCount={filteredResources.length}
            />
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="mt-4 w-full py-2.5 bg-[#1769FF] text-white text-xs font-bold rounded-xl"
            >
              Apply Filters ({filteredResources.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
