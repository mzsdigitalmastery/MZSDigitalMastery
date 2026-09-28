import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { signIn, signUp, loginAsDemoAdmin } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (isSignUp) {
        if (!name.trim()) throw new Error('Please enter your full name');
        await signUp(email, password, name);
      } else {
        await signIn(email, password);
      }
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoAdmin = () => {
    loginAsDemoAdmin();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07152E]/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1769FF] mx-auto flex items-center justify-center mb-3 border border-blue-100">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#07152E]">
            {isSignUp ? 'Join MZS Digital Mastery' : 'Sign in to Account'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Access saved learning paths, bookmark resources, and submit curation requests.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-600">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivers"
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1769FF]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1769FF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1769FF]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 px-4 bg-[#1769FF] hover:bg-[#1254cc] disabled:bg-blue-300 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            {submitting ? 'Authenticating...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-slate-600 hover:text-[#1769FF] font-medium transition-colors"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>

        {/* Demo Admin Quick Access */}
        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <span className="text-[11px] text-slate-500 block mb-2">
            Administrator or Evaluator Review:
          </span>
          <button
            type="button"
            onClick={handleDemoAdmin}
            className="w-full py-1.5 px-3 bg-[#07152E] hover:bg-slate-800 text-[#16D9FF] text-xs font-bold rounded-lg border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#16D9FF]" />
            <span>One-Click Admin Evaluation Access</span>
          </button>
        </div>
      </div>
    </div>
  );
};
