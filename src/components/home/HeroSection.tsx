import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Cpu,
  Layers,
  ShieldCheck,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onExploreResources: () => void;
  onStartLearning: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onExploreResources,
  onStartLearning,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-[#F4F7FB]">
      {/* Subtle Background Geometry */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute top-60 -left-20 w-80 h-80 rounded-full bg-cyan-100/50 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-[#1769FF] border border-blue-200/70 mb-6 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#1769FF] animate-ping" />
            <span className="font-bold text-[#07152E]">MZS Digital Mastery</span>
            <span className="text-slate-300">•</span>
            <span>Digital Resources &amp; Tools Hub</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#07152E] tracking-tight leading-[1.15] mb-5">
            Explore Digital Skills, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1769FF] via-[#258BFF] to-[#16D9FF]">
              Resources &amp; Tools.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            Discover useful learning resources, modern tools, creative assets, practical knowledge, and curated digital products — all in one structured professional ecosystem.
          </p>

          {/* Prominent Global Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto mb-8 relative flex items-center shadow-lg shadow-blue-900/5 rounded-2xl bg-white border border-slate-200/90 focus-within:border-[#1769FF] focus-within:ring-4 focus-within:ring-blue-100 transition-all p-1.5"
          >
            <div className="pl-4 pr-2 text-slate-400">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search across courses, AI prompts, software, Figma kits, LUTs..."
              className="w-full text-xs sm:text-sm font-medium text-[#07152E] placeholder:text-slate-400 bg-transparent py-2.5 focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#1769FF] hover:bg-[#1254cc] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
            >
              <span>Search</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
            <button
              onClick={onExploreResources}
              className="px-6 py-3 bg-[#07152E] hover:bg-slate-900 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 group"
            >
              <Compass className="w-4 h-4 text-[#16D9FF]" />
              <span>Explore Resources</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onStartLearning}
              className="px-6 py-3 bg-white hover:bg-slate-50 text-[#07152E] border border-slate-300/80 text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-[#1769FF]" />
              <span>Start Learning</span>
            </button>
          </div>

          {/* Core User Journey Flow */}
          <div className="pt-6 border-t border-slate-200/70">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-3">
              The Ecosystem Journey
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-slate-700">
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs">
                1. Discover
              </span>
              <span className="text-slate-300">→</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs">
                2. Explore
              </span>
              <span className="text-slate-300">→</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs text-[#1769FF]">
                3. Learn
              </span>
              <span className="text-slate-300">→</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs">
                4. Create
              </span>
              <span className="text-slate-300">→</span>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs">
                5. Apply
              </span>
              <span className="text-slate-300">→</span>
              <span className="px-3 py-1 bg-[#07152E] text-white rounded-lg shadow-2xs">
                6. Grow
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
