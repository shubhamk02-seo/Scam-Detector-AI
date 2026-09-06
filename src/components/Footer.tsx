import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'analyze' | 'guides' | 'quiz' | 'emergency' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 mt-16 py-10 text-slate-600 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-100">
                <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-display font-extrabold text-slate-900 text-lg tracking-tight">
                SCAMCHECK <span className="text-indigo-600">AI</span>
              </span>
            </div>
            <p className="font-bold text-slate-600 text-xs">"Before you trust it, check it."</p>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Don't just detect scams. Teach people how to recognize them. AI-powered fraud analysis and public safety toolkit.
            </p>
          </div>

          {/* Navigation Links with uppercase tracking from theme */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">
            <button
              onClick={() => {
                setActiveTab('analyze');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Check Scam
            </button>
            <button
              onClick={() => {
                setActiveTab('guides');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Threat Catalog
            </button>
            <button
              onClick={() => {
                setActiveTab('quiz');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Radar Quiz
            </button>
            <button
              onClick={() => {
                setActiveTab('emergency');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-red-600 transition-colors cursor-pointer"
            >
              Helplines
            </button>
            <button
              onClick={() => {
                setActiveTab('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Privacy & About
            </button>
          </div>
        </div>

        {/* Intelligence partner strip from Professional Polish theme */}
        <div className="border-t border-slate-200/80 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-[11px] max-w-xl text-center md:text-left">
            AI-generated assessments are advisory tools designed for public awareness. In the event of unauthorized transactions or security breaches, always immediately contact official banking channels.
          </p>
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Trusted Intelligence</span>
            <div className="flex gap-4 opacity-50 grayscale font-black text-slate-600 text-xs italic tracking-wider">
              <span>CYBERGUARD</span>
              <span>FINSEC</span>
              <span>NETTRUST</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
