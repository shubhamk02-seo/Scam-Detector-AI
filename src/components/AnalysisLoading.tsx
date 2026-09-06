import React, { useState, useEffect } from 'react';
import { ShieldCheck, Search, Zap, AlertCircle, FileCheck } from 'lucide-react';

const ANALYSIS_STEPS = [
  { text: 'Reading input and extracting message details...', icon: Search },
  { text: 'Scanning for known fraud & impersonation patterns...', icon: ShieldCheck },
  { text: 'Checking psychological pressure, urgency, & fear triggers...', icon: AlertCircle },
  { text: 'Analyzing payment, upfront fee, or OTP/credential demands...', icon: Zap },
  { text: 'Preparing plain-language safety recommendations...', icon: FileCheck },
];

export const AnalysisLoading: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < ANALYSIS_STEPS.length - 1 ? prev + 1 : prev));
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="analysis-loading-container"
      className="bg-white rounded-2xl p-6 sm:p-8 border border-indigo-100 shadow-sm text-center space-y-6 max-w-xl mx-auto my-6"
    >
      <div className="relative w-16 h-16 mx-auto">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-100 animate-ping opacity-30" />
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
          <ShieldCheck className="w-8 h-8 animate-pulse" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-900 font-display">
          Evaluating Signals & Red Flags
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Examining communication against 30 cyber fraud dimensions
        </p>
      </div>

      {/* Steps List */}
      <div className="space-y-2.5 max-w-md mx-auto text-left">
        {ANALYSIS_STEPS.map((step, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;
          const Icon = step.icon;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs transition-all ${
                isCurrent
                  ? 'bg-indigo-50/90 text-indigo-950 font-semibold border border-indigo-200'
                  : isDone
                  ? 'text-slate-500 bg-slate-50 opacity-80'
                  : 'text-slate-400 opacity-40'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${
                  isDone
                    ? 'bg-emerald-100 text-emerald-700 font-bold'
                    : isCurrent
                    ? 'bg-indigo-600 text-white animate-pulse'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isDone ? '✓' : idx + 1}
              </div>
              <span className="flex-1">{step.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
