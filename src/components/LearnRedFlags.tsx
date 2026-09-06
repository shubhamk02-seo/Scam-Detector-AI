import React, { useState } from 'react';
import { RED_FLAG_GUIDES } from '../data/guides';
import {
  Coins,
  Clock,
  KeyRound,
  Building2,
  Briefcase,
  Package,
  MonitorSmartphone,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { RedFlagGuideItem } from '../types';

const ICON_MAP: Record<string, any> = {
  Coins,
  Clock,
  KeyRound,
  Building2,
  Briefcase,
  Package,
  MonitorSmartphone,
  TrendingUp,
};

export const LearnRedFlags: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<RedFlagGuideItem>(RED_FLAG_GUIDES[0]);

  return (
    <div id="learn-red-flags-section" className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
          Knowledge is Defense
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mt-1">
          Master the Red Flags of Modern Scams
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          "Don't just detect scams. Teach people how to recognize them." Scammers constantly rotate
          storylines, but their psychological traps remain identical. Learn how to spot them in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Category Navigator */}
        <div className="lg:col-span-4 space-y-2">
          {RED_FLAG_GUIDES.map((item) => {
            const Icon = ICON_MAP[item.icon] || HelpCircle;
            const isSelected = selectedGuide.id === item.id;

            return (
              <button
                key={item.id}
                type="button"
                id={`guide-card-${item.id}`}
                onClick={() => setSelectedGuide(item)}
                className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white text-slate-800 border-slate-200/90 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-bold truncate">{item.title}</h4>
                  <p
                    className={`text-[11px] truncate ${
                      isSelected ? 'text-indigo-100' : 'text-slate-500'
                    }`}
                  >
                    {item.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Deep-Dive Card */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                Pattern Analysis
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mt-0.5">
                {selectedGuide.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{selectedGuide.subtitle}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
              {React.createElement(ICON_MAP[selectedGuide.icon] || HelpCircle, { className: 'w-6 h-6' })}
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* What it looks like */}
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-500">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                What It Looks Like in the Real World
              </h4>
              <p className="text-slate-700 leading-relaxed bg-slate-50 border border-slate-200/80 rounded-lg p-4">
                {selectedGuide.whatItLooksLike}
              </p>
            </div>

            {/* Why scammers use it */}
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-500">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                Why Scammers Rely on This Tactic
              </h4>
              <p className="text-slate-700 leading-relaxed bg-slate-50 border border-slate-200/80 rounded-lg p-4">
                {selectedGuide.whyScammersUseIt}
              </p>
            </div>

            {/* Realistic Example */}
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-500">
                <span>💬</span>
                Realistic Example
              </h4>
              <div className="font-mono text-xs text-slate-800 bg-amber-50/60 border border-amber-200 rounded-lg p-4 italic">
                {selectedGuide.realisticExample}
              </div>
            </div>

            {/* What you should do */}
            <div className="space-y-1.5 pt-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                What You Should Always Do
              </h4>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-emerald-950 font-medium leading-relaxed">
                {selectedGuide.whatYouShouldDo}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
