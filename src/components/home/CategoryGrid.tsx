import React from 'react';
import {
  GraduationCap,
  Sparkles,
  Cpu,
  Palette,
  LayoutTemplate,
  Film,
  BookOpen,
  Compass,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES_CONFIG, CategoryMeta } from '../../config/site';

interface CategoryGridProps {
  onSelectCategory: (categoryTitle: string, path: string) => void;
  resourceCounts?: Record<string, number>;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  onSelectCategory,
  resourceCounts = {},
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-[#1769FF]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#16D9FF]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#258BFF]" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-purple-600" />;
      case 'LayoutTemplate':
        return <LayoutTemplate className="w-5 h-5 text-emerald-600" />;
      case 'Film':
        return <Film className="w-5 h-5 text-amber-600" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-indigo-600" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-cyan-600" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5 text-pink-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#1769FF]" />;
    }
  };

  return (
    <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1769FF] block mb-1">
            Ecosystem Taxonomy
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07152E] tracking-tight">
            Explore Nine Core Digital Hubs
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mt-2 md:mt-0 leading-relaxed">
          Structured domains providing verified open-source assets, industry-standard workflows, and educational roadmaps.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CATEGORIES_CONFIG.map((cat) => {
          const count = resourceCounts[cat.title] || 0;
          return (
            <div
              key={cat.title}
              onClick={() => onSelectCategory(cat.title, `/${cat.slug}`)}
              className="group p-5 bg-white rounded-2xl border border-slate-200/90 hover:border-[#1769FF]/50 shadow-xs hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(cat.icon)}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {cat.badge}
                  </span>
                </div>

                <h3 className="font-bold text-base text-[#07152E] group-hover:text-[#1769FF] transition-colors mb-1.5">
                  {cat.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {cat.shortDesc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">
                  {count > 0 ? `${count} Curated Assets` : 'Curated Hub'}
                </span>
                <span className="font-semibold text-[#1769FF] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Enter Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
