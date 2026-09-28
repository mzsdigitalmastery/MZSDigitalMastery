import React from 'react';
import { Filter, X, RotateCcw, Check, Sparkles } from 'lucide-react';
import { FilterState, ResourceCategory, ResourceType } from '../../types';
import { CATEGORIES_CONFIG } from '../../config/site';

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalCount: number;
}

const RESOURCE_TYPES: ResourceType[] = [
  'Course',
  'Tool',
  'AI Tool',
  'AI Prompt',
  'AI Workflow',
  'Template',
  'Graphic',
  'Video',
  'eBook',
  'Guide',
  'Digital Product',
  'Bundle'
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onChange,
  onReset,
  totalCount,
}) => {
  const hasActiveFilters =
    filters.category !== '' ||
    filters.resourceType !== '' ||
    filters.skillLevel !== '' ||
    filters.accessType !== '' ||
    filters.featuredOnly ||
    filters.searchQuery !== '';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#1769FF]" />
          <h3 className="font-bold text-sm text-[#07152E]">Refine Discovery</h3>
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
            {totalCount}
          </span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="space-y-5 pt-4">
        {/* Featured Only Toggle */}
        <div>
          <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#16D9FF]" />
              Featured Resources
            </span>
            <input
              type="checkbox"
              checked={filters.featuredOnly}
              onChange={(e) => onChange({ ...filters, featuredOnly: e.target.checked })}
              className="w-4 h-4 rounded text-[#1769FF] focus:ring-blue-500 border-slate-300"
            />
          </label>
        </div>

        {/* Categories */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            Category
          </label>
          <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
            <button
              onClick={() => onChange({ ...filters, category: '' })}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                filters.category === ''
                  ? 'bg-blue-50 text-[#1769FF] font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>All Categories</span>
              {filters.category === '' && <Check className="w-3.5 h-3.5 text-[#1769FF]" />}
            </button>
            {CATEGORIES_CONFIG.map((cat) => (
              <button
                key={cat.title}
                onClick={() => onChange({ ...filters, category: cat.title })}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                  filters.category === cat.title
                    ? 'bg-blue-50 text-[#1769FF] font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="truncate">{cat.title}</span>
                {filters.category === cat.title && <Check className="w-3.5 h-3.5 text-[#1769FF]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Resource Type */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            Resource Type
          </label>
          <select
            value={filters.resourceType}
            onChange={(e) => onChange({ ...filters, resourceType: e.target.value })}
            className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1769FF]"
          >
            <option value="">All Types</option>
            {RESOURCE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Skill Level */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            Skill Level
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {['', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
              <button
                key={lvl || 'all'}
                onClick={() => onChange({ ...filters, skillLevel: lvl })}
                className={`text-xs py-1.5 px-2 rounded-lg text-center font-medium transition-colors ${
                  filters.skillLevel === lvl
                    ? 'bg-[#07152E] text-white shadow-2xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                {lvl || 'All Levels'}
              </button>
            ))}
          </div>
        </div>

        {/* Access Type (Free vs Pro) */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            Access Model
          </label>
          <div className="space-y-1">
            <button
              onClick={() => onChange({ ...filters, accessType: '' })}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                filters.accessType === ''
                  ? 'bg-blue-50 text-[#1769FF] font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>Everything</span>
              {filters.accessType === '' && <Check className="w-3.5 h-3.5 text-[#1769FF]" />}
            </button>
            <button
              onClick={() => onChange({ ...filters, accessType: 'Free' })}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                filters.accessType === 'Free'
                  ? 'bg-blue-50 text-[#1769FF] font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>Free &amp; Open Source</span>
              {filters.accessType === 'Free' && <Check className="w-3.5 h-3.5 text-[#1769FF]" />}
            </button>
            <button
              onClick={() => onChange({ ...filters, accessType: 'Premium' })}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                filters.accessType === 'Premium'
                  ? 'bg-blue-50 text-[#1769FF] font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>Pro &amp; Premium</span>
              {filters.accessType === 'Premium' && <Check className="w-3.5 h-3.5 text-[#1769FF]" />}
            </button>
          </div>
        </div>

        {/* Sort Order */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onChange({
                ...filters,
                sortBy: e.target.value as 'relevance' | 'newest' | 'popular' | 'title',
              })
            }
            className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1769FF]"
          >
            <option value="relevance">Relevance</option>
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
            <option value="title">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
