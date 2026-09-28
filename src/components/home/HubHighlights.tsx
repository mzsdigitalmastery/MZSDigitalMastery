import React from 'react';
import {
  GraduationCap,
  Sparkles,
  Cpu,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  ExternalLink
} from 'lucide-react';
import { Resource } from '../../types';

interface HubHighlightsProps {
  resources: Resource[];
  onSelectResource: (resource: Resource) => void;
  onNavigate: (path: string) => void;
}

export const HubHighlights: React.FC<HubHighlightsProps> = ({
  resources,
  onSelectResource,
  onNavigate,
}) => {
  const courses = resources.filter((r) => r.category === 'Courses & Learning').slice(0, 2);
  const aiTools = resources.filter((r) => r.category === 'AI Resources').slice(0, 2);
  const storeItems = resources.filter((r) => r.category === 'Digital Store').slice(0, 2);

  return (
    <div className="space-y-16 py-8">
      {/* 1. Learning Hub Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#1769FF] uppercase tracking-wider mb-2">
                <GraduationCap className="w-4 h-4" />
                <span>Learning &amp; Skill Development Hub</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#07152E] tracking-tight">
                Master Modern Digital Disciplines
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                Hands-on engineering tracks, UI/UX systems design, full-stack Next.js patterns, and production video editing curricula.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/learn')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#07152E] hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-colors"
            >
              <span>Explore All Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                onClick={() => onSelectResource(course)}
                className="group flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border border-slate-200/80 hover:border-[#1769FF]/50 bg-slate-50/50 hover:bg-white cursor-pointer transition-all"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full sm:w-36 h-32 rounded-xl object-cover"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-[#1769FF] mb-1">
                      <span>{course.subcategory}</span>
                      <span>•</span>
                      <span className="text-slate-500">{course.skillLevel}</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#07152E] group-hover:text-[#1769FF] transition-colors line-clamp-2 mb-1">
                      {course.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {course.shortDescription}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-between text-xs font-semibold text-[#1769FF]">
                    <span>{course.duration || 'Free Syllabus'}</span>
                    <span className="flex items-center gap-1">
                      <span>View Course</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. AI Hub Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#07152E] via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#16D9FF] uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Next-Gen Artificial Intelligence</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                AI Prompt Engineering &amp; Agent Workflows
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Eliminate generic output. Harness structured prompts, LLM function-calling matrices, and agentic workflows built for engineers and creators.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/ai')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1769FF] hover:bg-[#1254cc] text-white text-xs font-bold rounded-xl shadow-md transition-colors"
            >
              <span>Explore AI Ecosystem</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiTools.map((ai) => (
              <div
                key={ai.id}
                onClick={() => onSelectResource(ai)}
                className="group p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#16D9FF]/40 cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-[#16D9FF] uppercase tracking-wider">
                      {ai.subcategory}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-300 bg-white/10 px-2 py-0.5 rounded-full">
                      {ai.format}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-[#16D9FF] transition-colors mb-2">
                    {ai.title}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2 mb-4">
                    {ai.shortDescription}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{ai.author}</span>
                  <span className="text-[#16D9FF] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Explore Prompt Matrix</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Digital Store Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">
                <ShoppingBag className="w-4 h-4" />
                <span>Verified Commercial Store</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#07152E] tracking-tight">
                Curated Pro Toolkits &amp; Master Bundles
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                100% compliant, royalty-free commercial licenses. No cracked software, no unauthorized accounts. Only authenticated professional digital assets.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/store')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#07152E] text-xs font-bold rounded-xl transition-colors"
            >
              <span>Visit Digital Store</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {storeItems.map((prod) => (
              <div
                key={prod.id}
                onClick={() => onSelectResource(prod)}
                className="group flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border border-slate-200 hover:border-pink-300 bg-slate-50/50 hover:bg-white cursor-pointer transition-all"
              >
                <img
                  src={prod.thumbnail}
                  alt={prod.title}
                  className="w-full sm:w-36 h-32 rounded-xl object-cover"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded">
                        PRO ASSET
                      </span>
                      <span className="text-xs font-bold text-[#07152E]">
                        {prod.price || 'Commercial'}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#07152E] group-hover:text-pink-600 transition-colors line-clamp-2 mb-1">
                      {prod.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {prod.shortDescription}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-between text-xs font-semibold text-pink-600">
                    <span className="text-slate-400 font-normal">{prod.format}</span>
                    <span className="flex items-center gap-1">
                      <span>View License</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
