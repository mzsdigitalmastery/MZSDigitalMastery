import React from 'react';
import { HelpCircle, ArrowRight, Sparkles } from 'lucide-react';

interface RequestCtaSectionProps {
  onRequestClick: () => void;
}

export const RequestCtaSection: React.FC<RequestCtaSectionProps> = ({ onRequestClick }) => {
  return (
    <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50/50 to-slate-50 rounded-3xl p-8 sm:p-12 border border-blue-200/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1769FF]/10 text-[#1769FF] mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Looking for a Specific Tool or Asset?</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07152E] tracking-tight">
              Request a Resource for Ecosystem Curation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Can&apos;t find the roadmap, template, or AI prompt matrix you need? Submit your request to the MZS curation desk and our team will research and verify it.
            </p>
          </div>

          <button
            onClick={onRequestClick}
            className="px-6 py-3.5 bg-[#07152E] hover:bg-slate-900 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 group shrink-0"
          >
            <span>Submit Resource Request</span>
            <ArrowRight className="w-4 h-4 text-[#16D9FF] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
