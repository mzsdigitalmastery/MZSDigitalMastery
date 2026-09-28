import React from 'react';
import { MessageCircle, Users, Bell, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

export const CommunitySection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
                <Users className="w-3.5 h-3.5" />
                <span>MZS Digital Mastery Community</span>
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#07152E] tracking-tight leading-tight mb-4">
                Connect, Learn &amp; Share in the Official Network
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Our community connects creators, software developers, video editors, and digital learners. Get immediate updates when new field manuals are published, share workflows, and discuss modern AI productivity tools.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Curated weekly tool drops</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Peer feedback on creative projects</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified open-source resources</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct resource request priority</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Join WhatsApp Community</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-[#07152E] text-xs font-bold rounded-xl border border-slate-200 transition-colors"
                >
                  <Bell className="w-4 h-4 text-slate-600" />
                  <span>Follow WhatsApp Channel</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-[#07152E] to-blue-950 p-6 sm:p-8 rounded-2xl text-white border border-slate-800">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#16D9FF]" />
                <span>Community Code of Conduct</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                We maintain an atmosphere of genuine quality, mutual respect, and intellectual curiosity.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#16D9FF] font-bold">1.</span>
                  <span>Share verified knowledge and working links only.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#16D9FF] font-bold">2.</span>
                  <span>Strict zero-piracy, zero-spam rule enforced at all times.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#16D9FF] font-bold">3.</span>
                  <span>Constructive, helpful feedback for all experience levels.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
