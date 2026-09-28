import React, { useState } from 'react';
import { submitResourceRequest } from '../firebase/firestore';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CheckCircle2, AlertCircle, HelpCircle, Send, ShieldCheck, ArrowRight } from 'lucide-react';

interface RequestPageProps {
  onNavigate: (path: string) => void;
}

export const RequestPage: React.FC<RequestPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resourceType: 'Course',
    resourceName: '',
    description: '',
    preferredFormat: '',
    referenceLink: '',
    additionalNotes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resourceTypes = [
    'Course',
    'Template',
    'Graphics',
    'Video Resource',
    'Software',
    'Tool',
    'AI Resource',
    'eBook',
    'Digital Product',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setError('Please provide your full name (minimum 2 characters).');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!formData.resourceName.trim()) {
      setError('Please specify the resource or tool name.');
      return;
    }
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      setError('Please provide a descriptive explanation of what you are looking for (at least 10 characters).');
      return;
    }

    setSubmitting(true);
    try {
      await submitResourceRequest(formData);
      setSubmitted(true);
    } catch (err: any) {
      console.error('Request submission error:', err);
      setError('Failed to submit request. Please verify connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: 'Ecosystem', path: '/' }, { label: 'Request a Resource' }]}
        onNavigate={onNavigate}
      />

      <div className="mt-4 mb-8">
        <span className="text-xs font-bold text-[#1769FF] uppercase tracking-wider block mb-1">
          Curation System
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#07152E] tracking-tight">
          Request a Digital Resource
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
          Need a specific developer roadmap, production AI prompt schema, video editing preset pack, or verified software utility? Our research team reviews requests weekly for curation into the public ecosystem.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-4 border border-emerald-100">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#07152E] mb-2">
            Request Received Successfully
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
            Thank you, <span className="font-semibold text-[#07152E]">{formData.name}</span>. Your request for <span className="font-semibold text-[#07152E]">{formData.resourceName}</span> has been logged into our Firestore curation queue.
          </p>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 max-w-md mx-auto text-xs text-slate-500 mb-8 text-left space-y-1.5">
            <span className="font-bold text-slate-700 block">Editorial Notice:</span>
            <p>
              We evaluate every item for copyright legality, code quality, and utility. Submission does not guarantee that every request will be added.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  resourceType: 'Course',
                  resourceName: '',
                  description: '',
                  preferredFormat: '',
                  referenceLink: '',
                  additionalNotes: '',
                });
              }}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
            >
              Submit Another Request
            </button>
            <button
              onClick={() => onNavigate('/resources')}
              className="px-5 py-2.5 bg-[#1769FF] hover:bg-[#1254cc] text-white text-xs font-bold rounded-xl transition-colors"
            >
              Browse Existing Resources
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-xs text-red-700 font-medium">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Jordan Lee"
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1769FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1769FF]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Resource Category / Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.resourceType}
                  onChange={(e) => setFormData({ ...formData, resourceType: e.target.value })}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1769FF]"
                >
                  {resourceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Resource / Tool Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.resourceName}
                  onChange={(e) => setFormData({ ...formData, resourceName: e.target.value })}
                  placeholder="e.g. Claude 3.5 Sonnet Coding Prompt Matrix"
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1769FF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                What does this resource do and why is it useful? <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the skills it teaches, problems it solves, or target workflow..."
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1769FF]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Preferred Format (Optional)
                </label>
                <input
                  type="text"
                  value={formData.preferredFormat}
                  onChange={(e) => setFormData({ ...formData, preferredFormat: e.target.value })}
                  placeholder="e.g. Video, Figma File, PDF, Web App"
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1769FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Reference or Official Link (Optional)
                </label>
                <input
                  type="url"
                  value={formData.referenceLink}
                  onChange={(e) => setFormData({ ...formData, referenceLink: e.target.value })}
                  placeholder="https://example.com/item"
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1769FF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Additional Notes
              </label>
              <input
                type="text"
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                placeholder="Any special versions, operating systems, or license notes..."
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1769FF]"
              />
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#1769FF] shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                By submitting this request, you agree that MZS Digital Mastery does not accept requests for cracked software, pirated media, stolen credentials, or illegal keys. All approved assets strictly conform to creator licensing terms.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3.5 bg-[#1769FF] hover:bg-[#1254cc] disabled:bg-blue-300 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting to Firestore...' : 'Submit Resource Request'}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
