import React from 'react';
import { ShieldCheck, ShieldAlert, BookOpen, HelpCircle, PhoneCall, Info, Lock } from 'lucide-react';

interface HeaderProps {
  activeTab: 'analyze' | 'guides' | 'quiz' | 'emergency' | 'about';
  setActiveTab: (tab: 'analyze' | 'guides' | 'quiz' | 'emergency' | 'about') => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedCountry,
  setSelectedCountry,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Subtitle */}
          <button
            id="nav-brand-logo"
            onClick={() => setActiveTab('analyze')}
            className="flex items-center gap-3.5 text-left focus:outline-none group cursor-pointer"
            aria-label="SCAMCHECK AI Home"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-indigo-100 shadow-lg text-white group-hover:scale-105 transition-transform flex-shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                  SCAMCHECK <span className="text-indigo-600">AI</span>
                </h1>
                <span className="hidden lg:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Lock className="w-2.5 h-2.5" /> Privacy First
                </span>
              </div>
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">
                Intelligence Engine v2.4
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
            <button
              id="nav-tab-analyze"
              onClick={() => setActiveTab('analyze')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'analyze'
                  ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              Check Scam
            </button>

            <button
              id="nav-tab-guides"
              onClick={() => setActiveTab('guides')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'guides'
                  ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Learn Red Flags
            </button>

            <button
              id="nav-tab-quiz"
              onClick={() => setActiveTab('quiz')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'quiz'
                  ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              Spot Scam Quiz
            </button>

            <button
              id="nav-tab-emergency"
              onClick={() => setActiveTab('emergency')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'emergency'
                  ? 'bg-red-50 text-red-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-red-700 hover:bg-red-50/60'
              }`}
            >
              <PhoneCall className="w-4 h-4 text-red-600" />
              Emergency & Helplines
            </button>

            <button
              id="nav-tab-about"
              onClick={() => setActiveTab('about')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'about'
                  ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Info className="w-4 h-4" />
              About
            </button>
          </nav>

          {/* Right Status & Controls */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Network Status Badge from Professional Polish theme */}
            <div className="hidden xl:flex flex-col items-end text-right">
              <span className="text-[11px] font-semibold text-slate-400">Network Status</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Encrypted & Online
              </span>
            </div>

            {/* Region / Country Selector */}
            <div className="relative inline-flex items-center">
              <label htmlFor="country-selector" className="sr-only">
                Select Country for Emergency Helpline Resources
              </label>
              <select
                id="country-selector"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-semibold text-slate-800 rounded-lg py-2 pl-2.5 pr-7 focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer appearance-none transition-colors"
              >
                <option value="IN">🇮🇳 India (1930)</option>
                <option value="US">🇺🇸 USA (FTC/IC3)</option>
                <option value="UK">🇬🇧 UK (159/ActionFraud)</option>
                <option value="OTHER">🌐 Global</option>
              </select>
              <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 text-[10px]">
                ▼
              </div>
            </div>

            {/* Quick action button from theme */}
            <button
              type="button"
              id="header-btn-dashboard"
              onClick={() => setActiveTab('analyze')}
              className="hidden sm:inline-flex px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 shadow-sm transition-all"
            >
              Verify Now
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-between overflow-x-auto py-2.5 border-t border-slate-100 gap-1.5 no-scrollbar text-xs">
          <button
            onClick={() => setActiveTab('analyze')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'analyze' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Check Scam
          </button>
          <button
            onClick={() => setActiveTab('guides')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'guides' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Red Flags
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'quiz' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Quiz
          </button>
          <button
            onClick={() => setActiveTab('emergency')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'emergency' ? 'bg-red-600 text-white shadow-xs' : 'text-red-700 bg-red-50'
            }`}
          >
            Emergency
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'about' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            About
          </button>
        </div>
      </div>
    </header>
  );
};
