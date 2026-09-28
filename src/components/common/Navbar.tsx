import React, { useState } from 'react';
import {
  Search,
  Menu,
  X,
  Sparkles,
  BookOpen,
  Cpu,
  Palette,
  ShoppingBag,
  Users,
  Compass,
  Bookmark,
  ShieldAlert,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  onOpenAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, isAdmin, savedResourceIds, signOut } = useAuth();

  const navLinks = [
    { name: 'Resources', path: '/resources' },
    { name: 'Learn', path: '/learn' },
    { name: 'Tools', path: '/tools' },
    { name: 'Create', path: '/create' },
    { name: 'AI Hub', path: '/ai' },
    { name: 'Knowledge', path: '/knowledge' },
    { name: 'Store', path: '/store' },
    { name: 'Community', path: '/community' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top Banner Notice */}
      <div className="bg-[#07152E] text-white text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#16D9FF] animate-pulse"></span>
            <span className="font-medium text-slate-300">
              MZS Digital Mastery • Digital Resources &amp; Tools Hub
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span>Explore • Learn • Master</span>
            <span className="text-slate-600">|</span>
            <a
              href="mailto:mzsdigitalmastery@gmail.com"
              className="hover:text-[#16D9FF] transition-colors"
            >
              mzsdigitalmastery@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#07152E] flex items-center justify-center text-white shadow-md shadow-blue-900/10 group-hover:scale-105 transition-transform border border-slate-800">
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
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-[#07152E]">
                  MZS <span className="text-[#1769FF]">Digital Mastery</span>
                </span>
              </div>
              <p className="text-[10px] tracking-wider uppercase font-semibold text-slate-500 hidden sm:block">
                Digital Resources &amp; Tools Hub
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.path ||
                (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-[#1769FF] bg-blue-50/80 font-semibold'
                      : 'text-slate-600 hover:text-[#07152E] hover:bg-slate-100/70'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Search Ecosystem"
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 bg-slate-100/80 hover:bg-slate-100 rounded-lg border border-slate-200/80 transition-colors"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden md:inline text-xs font-medium text-slate-500">
                Search resources...
              </span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-300 rounded shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Saved Items Counter */}
            <button
              onClick={() => handleLinkClick('/resources?saved=true')}
              title="Saved Resources"
              className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Bookmark className="w-5 h-5" />
              {savedResourceIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#1769FF] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {savedResourceIds.length}
                </span>
              )}
            </button>

            {/* Request a Resource CTA */}
            <button
              onClick={() => handleLinkClick('/request')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#07152E] bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors"
            >
              <span>Request Resource</span>
            </button>

            {/* Admin or Auth Button */}
            {isAdmin ? (
              <button
                onClick={() => handleLinkClick('/admin')}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg border transition-all ${
                  currentPath.startsWith('/admin')
                    ? 'bg-[#07152E] text-[#16D9FF] border-slate-800'
                    : 'bg-blue-50 text-[#1769FF] border-blue-200 hover:bg-blue-100'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            ) : currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={signOut}
                  className="text-xs font-medium text-slate-600 hover:text-slate-900 px-2 py-1"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-[#1769FF] hover:bg-[#1254cc] rounded-lg shadow-xs shadow-blue-500/20 transition-colors"
              >
                Sign In
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-150">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => handleLinkClick('/resources')}
              className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-blue-50"
            >
              <Compass className="w-4 h-4 text-[#1769FF]" />
              <span>All Resources</span>
            </button>
            <button
              onClick={() => handleLinkClick('/learn')}
              className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-blue-50"
            >
              <GraduationCap className="w-4 h-4 text-[#1769FF]" />
              <span>Learn &amp; Courses</span>
            </button>
            <button
              onClick={() => handleLinkClick('/ai')}
              className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-blue-50"
            >
              <Sparkles className="w-4 h-4 text-[#16D9FF]" />
              <span>AI Hub</span>
            </button>
            <button
              onClick={() => handleLinkClick('/tools')}
              className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-blue-50"
            >
              <Cpu className="w-4 h-4 text-[#258BFF]" />
              <span>Tools</span>
            </button>
            <button
              onClick={() => handleLinkClick('/create')}
              className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-blue-50"
            >
              <Palette className="w-4 h-4 text-purple-600" />
              <span>Create Hub</span>
            </button>
            <button
              onClick={() => handleLinkClick('/knowledge')}
              className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-blue-50"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Knowledge</span>
            </button>
            <button
              onClick={() => handleLinkClick('/store')}
              className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-blue-50"
            >
              <ShoppingBag className="w-4 h-4 text-pink-600" />
              <span>Digital Store</span>
            </button>
            <button
              onClick={() => handleLinkClick('/community')}
              className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-blue-50"
            >
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Community</span>
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => handleLinkClick('/request')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold bg-[#07152E] text-white"
            >
              <span>Submit Resource Request</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            {isAdmin && (
              <button
                onClick={() => handleLinkClick('/admin')}
                className="w-full py-2 px-4 rounded-lg text-xs font-bold bg-blue-50 text-[#1769FF] border border-blue-200"
              >
                Access Admin Dashboard
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
