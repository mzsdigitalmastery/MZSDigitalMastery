import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ShieldCheck, Lock, FileText, Scale, Mail, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'copyright' | 'licenses' | 'about' | 'contact';
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const titles = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    copyright: 'Copyright & Intellectual Property',
    licenses: 'Licenses, Distribution & Verification',
    about: 'About MZS Digital Mastery',
    contact: 'Contact Editorial Desk & Support',
  };

  const getBreadcrumbLabel = () => titles[type];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: 'Ecosystem', path: '/' }, { label: getBreadcrumbLabel() }]}
        onNavigate={onNavigate}
      />

      <div className="mt-4 mb-8">
        <span className="text-xs font-bold text-[#1769FF] uppercase tracking-wider block mb-1">
          Governance &amp; Transparency
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#07152E] tracking-tight">
          {titles[type]}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Effective date: September 28, 2026 • Official policy of {SITE_CONFIG.domain}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 leading-relaxed space-y-6">
        {type === 'privacy' && (
          <>
            <h2 className="text-base font-bold text-[#07152E]">1. Overview</h2>
            <p>
              At MZS Digital Mastery ({SITE_CONFIG.domain}), we respect your personal privacy. We do not sell, rent, or monetize personal user data to third-party ad networks. We only collect the minimal information necessary to deliver and operate our digital skills ecosystem.
            </p>

            <h2 className="text-base font-bold text-[#07152E]">2. Information We Collect</h2>
            <p>
              When you submit a resource curation request or register an account via Firebase Authentication, we store your name and email address. When you bookmark or save resources locally, those preferences are stored within your browser&apos;s localStorage for fast, offline-first access.
            </p>

            <h2 className="text-base font-bold text-[#07152E]">3. Data Security &amp; Firebase</h2>
            <p>
              Our database infrastructure is hosted securely on Google Cloud Firebase. Access rules (ABAC) prevent unauthorized modification of ecosystem records.
            </p>
          </>
        )}

        {type === 'terms' && (
          <>
            <h2 className="text-base font-bold text-[#07152E]">1. Acceptance of Terms</h2>
            <p>
              By accessing MZS Digital Mastery, you agree to comply with all applicable local, national, and international laws regarding intellectual property, copyright, and digital commerce.
            </p>

            <h2 className="text-base font-bold text-[#07152E]">2. Authorized Usage</h2>
            <p>
              All educational roadmaps, prompt matrices, and curated open-source recommendations are provided for individual learning, product research, and professional creative work. Users must adhere strictly to the individual license terms of external utilities and repositories linked from our ecosystem.
            </p>

            <h2 className="text-base font-bold text-[#07152E]">3. Prohibition of Malicious Activity</h2>
            <p>
              Users may not submit requests for illicit circumvention tools, cracked executables, unauthorized accounts, or pirated copyrighted material. Any such attempts will result in an immediate permanent ban.
            </p>
          </>
        )}

        {type === 'copyright' && (
          <>
            <h2 className="text-base font-bold text-[#07152E]">Zero Piracy Standard</h2>
            <p>
              MZS Digital Mastery operates under a strict Zero Piracy Policy. We do not host, store, or distribute cracked executables, bypass software, stolen credentials, or copyrighted instructional media without author authorization.
            </p>

            <h2 className="text-base font-bold text-[#07152E]">DMCA &amp; Content Takedown Procedure</h2>
            <p>
              If you are a copyright owner or an agent thereof and believe that any content curated on our platform infringes upon your copyright, please submit an official notice to <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-[#1769FF] font-semibold">{SITE_CONFIG.contactEmail}</a>. Notices are processed within 24 business hours.
            </p>
          </>
        )}

        {type === 'licenses' && (
          <>
            <h2 className="text-base font-bold text-[#07152E]">Licensing Taxonomy</h2>
            <p>
              Every resource indexed in MZS Digital Mastery is marked with its exact licensing tier:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Open Source (MIT, Apache 2.0, ISC):</strong> Permitted for both personal and commercial software builds with author attribution where applicable.</li>
              <li><strong>Creative Commons (CC BY, CC BY-SA, CC0):</strong> Open educational and creative media licensed under standardized international terms.</li>
              <li><strong>Official Publisher Portals:</strong> Direct verified links to official tool maintainers (e.g. Next.js, Figma, Microsoft VS Code, DaVinci Resolve).</li>
              <li><strong>Commercial Pro Single License:</strong> Direct proprietary assets created by MZS Digital Mastery for verified commercial use.</li>
            </ul>
          </>
        )}

        {type === 'about' && (
          <>
            <h2 className="text-base font-bold text-[#07152E]">Ecosystem Mission</h2>
            <p>
              MZS Digital Mastery was founded to eliminate the noise, scams, and low-quality link dumps that plague modern digital learning. We believe that discovering high-leverage tools, AI prompt frameworks, design assets, and programming roadmaps should be straightforward, transparent, and structured.
            </p>

            <h2 className="text-base font-bold text-[#07152E]">The Core Journey</h2>
            <p>
              We guide students, engineers, and creators through a six-step journey: <strong>Discover → Explore → Learn → Create → Apply → Grow</strong>. Every curriculum and asset is vetted for genuine architectural quality and ethical licensing.
            </p>
          </>
        )}

        {type === 'contact' && (
          <>
            <h2 className="text-base font-bold text-[#07152E]">Contact Our Editorial Desk</h2>
            <p>
              Have a question regarding resource curation, copyright verification, or partnership inquiries? Reach out to us directly:
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 not-prose space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#1769FF]" />
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Official Email</span>
                  <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-sm font-semibold text-[#07152E] hover:text-[#1769FF]">
                    {SITE_CONFIG.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-200/80">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Direct WhatsApp Channel</span>
                  <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-emerald-600 hover:underline">
                    MZS Digital Mastery Broadcast Channel
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
