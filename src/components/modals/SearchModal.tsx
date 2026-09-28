import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles, Layers, Lock, Compass } from 'lucide-react';
import { Resource } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  resources: Resource[];
  onSelectResource: (resource: Resource) => void;
  onViewAllResults: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  resources,
  onSelectResource,
  onViewAllResults,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedCategory('All');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Handled by parent or triggered
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = resources.filter((res) => {
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      res.title.toLowerCase().includes(q) ||
      res.shortDescription.toLowerCase().includes(q) ||
      res.tags.some((t) => t.toLowerCase().includes(q)) ||
      res.subcategory.toLowerCase().includes(q) ||
      res.author.toLowerCase().includes(q)
    );
  });

  const categories = ['All', 'Courses & Learning', 'AI Resources', 'Software & Tools', 'Graphics & Design', 'Templates', 'Video Editing & Reels', 'eBooks & Knowledge', 'Digital Store'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-[#07152E]/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                onViewAllResults(query);
                onClose();
              }
            }}
            placeholder="Search courses, AI prompts, tools, templates, guides..."
            className="w-full text-sm sm:text-base font-medium text-[#07152E] placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-semibold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-md"
          >
            ESC
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 p-2 px-4 bg-slate-50/80 border-b border-slate-100 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#1769FF] text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-1.5 divide-y divide-slate-50 flex-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No matching resources found for &quot;{query}&quot;. Try a different keyword or category.
            </div>
          ) : (
            filtered.slice(0, 10).map((res) => (
              <div
                key={res.id}
                onClick={() => {
                  onSelectResource(res);
                  onClose();
                }}
                className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/60 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <img
                    src={res.thumbnail}
                    alt={res.title}
                    className="w-10 h-10 rounded-lg object-cover bg-slate-200 shrink-0"
                  />
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#1769FF] uppercase tracking-wider">
                        {res.category}
                      </span>
                      {res.isPremium && (
                        <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 rounded">
                          PRO
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-[#07152E] group-hover:text-[#1769FF] truncate transition-colors">
                      {res.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate">{res.shortDescription}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-3 shrink-0">
                  <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                    {res.resourceType}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1769FF] group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info bar */}
        {filtered.length > 0 && query.trim() && (
          <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              Showing top {Math.min(filtered.length, 10)} of {filtered.length} matches
            </span>
            <button
              onClick={() => {
                onViewAllResults(query);
                onClose();
              }}
              className="text-[#1769FF] font-semibold hover:underline flex items-center gap-1"
            >
              <span>View full directory results</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
