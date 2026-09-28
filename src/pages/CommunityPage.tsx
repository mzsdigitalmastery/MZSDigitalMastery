import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  MessageCircle,
  Users,
  Bell,
  CheckCircle2,
  ShieldCheck,
  Share2,
  ExternalLink,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface CommunityPageProps {
  onNavigate: (path: string) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: 'Ecosystem', path: '/' }, { label: 'Community' }]}
        onNavigate={onNavigate}
      />

      <div className="mt-4 mb-10 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#1769FF] uppercase tracking-wider block mb-2">
          Global Creator &amp; Learner Network
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#07152E] tracking-tight leading-tight">
          Join the MZS Digital Mastery Community
        </h1>
        <p className="text-sm text-slate-500 mt-3 leading-relaxed">
          Connect with forward-thinking developers, creators, video editors, and designers. Exchange practical knowledge, discuss modern AI workflows, and explore verified resources together.
        </p>
      </div>

      {/* Main Connect Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* WhatsApp Community */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 border border-emerald-100">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#07152E] mb-2">
              WhatsApp Discussion Community
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              Participate in active group discussions, ask technical questions, request community reviews of your designs and code, and collaborate on digital ventures.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Interactive group chats moderated by verified engineers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Weekly live Q&amp;A topics and portfolio critiques</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant notifications when community members launch projects</span>
              </li>
            </ul>
          </div>

          <a
            href="https://whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-900/10 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Join WhatsApp Community</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* WhatsApp Channel */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1769FF] flex items-center justify-center mb-5 border border-blue-100">
              <Bell className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#07152E] mb-2">
              Official WhatsApp Announcement Channel
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              Prefer broadcast updates without message clutter? Follow our read-only channel for curated daily tool releases, security bulletins, and verified field manuals.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1769FF] shrink-0" />
                <span>Zero chat clutter — curated announcement stream only</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1769FF] shrink-0" />
                <span>Direct 1-click links to new open-source templates and prompt matrices</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1769FF] shrink-0" />
                <span>Early access to MZS pro digital toolkit drops</span>
              </li>
            </ul>
          </div>

          <a
            href="https://whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#07152E] hover:bg-slate-900 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
          >
            <Bell className="w-4 h-4 text-[#16D9FF]" />
            <span>Follow Announcement Channel</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-10 mb-8">
        <div className="flex items-center gap-2 text-xs font-bold text-[#07152E] uppercase tracking-wider mb-4">
          <ShieldCheck className="w-4 h-4 text-[#1769FF]" />
          <span>Core Community Standards &amp; Philosophy</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
          <div className="p-4 bg-white rounded-2xl border border-slate-200/80">
            <h3 className="font-bold text-[#07152E] mb-2 text-sm">Quality &gt; Hype</h3>
            <p>
              We focus on genuine architectural utility, working codebases, and production-tested workflows rather than viral marketing hype or unrealistic promises.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200/80">
            <h3 className="font-bold text-[#07152E] mb-2 text-sm">Zero Piracy Policy</h3>
            <p>
              Strictly no links to cracked software, bypass exploits, or unauthorized accounts. We champion independent creators and ethical open-source standards.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200/80">
            <h3 className="font-bold text-[#07152E] mb-2 text-sm">Mutual Respect</h3>
            <p>
              Everyone in the ecosystem is on a journey of continuous improvement. We encourage helpful answers, clear documentation, and polite discourse.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
