import React from 'react';
import {
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Heart,
  MessageCircle,
  ExternalLink,
  Mail
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#07152E] text-slate-300 border-t border-slate-800">
      {/* Top CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 border-b border-slate-800/80">
        <div className="bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 rounded-2xl p-6 sm:p-8 border border-blue-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1769FF]/20 text-[#16D9FF] border border-[#16D9FF]/30 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Community &amp; Live Updates
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Join the Official MZS Digital Mastery Network
            </h3>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Connect with fellow digital creators, developers, designers, and students. Get instant notifications when new tools and verified assets are released.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-emerald-900/30 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Channel</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => onNavigate('/community')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/10 transition-colors"
            >
              <span>Explore Community</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="col-span-2">
            <div
              onClick={() => onNavigate('/')}
              className="flex items-center gap-3 cursor-pointer group mb-4"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white border border-slate-700">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 72V28L42 54L62 28V72"
                    stroke="#1769FF"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="76" cy="32" r="7" fill="#16D9FF" />
                </svg>
              </div>
              <div>
                <span className="font-bold text-lg text-white">
                  MZS <span className="text-[#1769FF]">Digital Mastery</span>
                </span>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-[#16D9FF]">
                  {SITE_CONFIG.descriptor}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-4 max-w-sm">
              A structured digital platform designed to bring learning, verified tools, creative assets, practical knowledge, and pro workflows together in one ecosystem.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span className="text-white">Tagline:</span>
              <span className="text-[#16D9FF]">{SITE_CONFIG.tagline}</span>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <a
                href={`mailto:${SITE_CONFIG.contactEmail}`}
                className="hover:text-white transition-colors"
              >
                {SITE_CONFIG.contactEmail}
              </a>
            </div>
          </div>

          {/* Hubs */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Ecosystem Hubs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/resources')}
                  className="hover:text-white transition-colors"
                >
                  All Resources
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/learn')}
                  className="hover:text-white transition-colors"
                >
                  Courses &amp; Learn
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/tools')}
                  className="hover:text-white transition-colors"
                >
                  Software &amp; Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/ai')}
                  className="hover:text-white transition-colors"
                >
                  AI Resources &amp; Prompts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/create')}
                  className="hover:text-white transition-colors"
                >
                  Graphics &amp; Video
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/store')}
                  className="hover:text-white transition-colors"
                >
                  Digital Store
                </button>
              </li>
            </ul>
          </div>

          {/* Knowledge & Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Knowledge &amp; Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/knowledge')}
                  className="hover:text-white transition-colors"
                >
                  Field Manuals &amp; Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/request')}
                  className="hover:text-white transition-colors text-[#16D9FF] font-medium"
                >
                  Request a Resource
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors"
                >
                  About Platform
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/community')}
                  className="hover:text-white transition-colors"
                >
                  Community Guidelines
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Legal &amp; Rights
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/privacy')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms')}
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/copyright')}
                  className="hover:text-white transition-colors"
                >
                  Copyright Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/licenses')}
                  className="hover:text-white transition-colors"
                >
                  Licenses &amp; Attribution
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links & Trust Row */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-slate-300 font-medium">Follow MZS:</span>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#16D9FF] transition-colors"
            >
              YouTube
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#16D9FF] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#16D9FF] transition-colors"
            >
              X / Twitter
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#16D9FF] transition-colors"
            >
              TikTok
            </a>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#16D9FF]" />
            <span>Zero Piracy Policy • Strictly Verified Licenses</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-6 pt-4 border-t border-slate-900 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} MZS Digital Mastery ({SITE_CONFIG.domain}). All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3 h-3 text-red-500 inline fill-red-500" /> for creators &amp; builders
          </p>
        </div>
      </div>
    </footer>
  );
};
