import React, { useState, useEffect } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  HelpCircle,
  Copy,
  Check,
  Share2,
  Sparkles,
  ExternalLink,
  Info,
  Layers,
  Languages,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ScamAnalysisResult, RiskLevel } from '../types';

interface AnalysisResultProps {
  result: ScamAnalysisResult;
  onReset: () => void;
  onSelectInteractedAction: (actionType: string) => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({
  result,
  onReset,
  onSelectInteractedAction,
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isSimpleMode, setIsSimpleMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi' | 'hinglish'>('en');
  const [copied, setCopied] = useState(false);

  // Animated risk score counter from 0 to target score
  useEffect(() => {
    let start = 0;
    const target = result.risk_score;
    const duration = 800; // ms
    const stepTime = 25;
    const totalSteps = duration / stepTime;
    const increment = Math.ceil(target / totalSteps);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setAnimatedScore(target);
        clearInterval(timer);
      } else {
        setAnimatedScore(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [result.risk_score]);

  // Risk styling helpers
  const getRiskDetails = (level: RiskLevel) => {
    switch (level) {
      case 'HIGH_RISK':
        return {
          bg: 'bg-red-500',
          lightBg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-700',
          badgeText: 'text-white',
          icon: AlertOctagon,
          title: '🚨 HIGH RISK',
          sub: 'Likely scam / strong signs of fraud',
          badgeColor: 'bg-red-600',
        };
      case 'SUSPICIOUS':
        return {
          bg: 'bg-amber-500',
          lightBg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-800',
          badgeText: 'text-white',
          icon: AlertTriangle,
          title: '⚠️ SUSPICIOUS',
          sub: 'Significant red flags detected — verify before acting',
          badgeColor: 'bg-amber-600',
        };
      case 'CAUTION':
        return {
          bg: 'bg-yellow-500',
          lightBg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-800',
          badgeText: 'text-yellow-950',
          icon: HelpCircle,
          title: '⚠️ CAUTION ADVISED',
          sub: 'Some unusual signals — verify directly through official channels',
          badgeColor: 'bg-yellow-400',
        };
      case 'LOW_RISK':
      default:
        return {
          bg: 'bg-emerald-500',
          lightBg: 'bg-emerald-50',
          border: 'border-emerald-200',
          text: 'text-emerald-800',
          badgeText: 'text-white',
          icon: CheckCircle2,
          title: '✅ LOW RISK',
          sub: 'No major scam indicators detected based on provided information',
          badgeColor: 'bg-emerald-600',
        };
    }
  };

  const riskStyle = getRiskDetails(result.risk_level);
  const RiskIcon = riskStyle.icon;

  const handleCopySummary = () => {
    const summaryText = `SCAMCHECK AI Assessment:
Category: ${result.category_name}
Risk Assessment: ${result.risk_score}/100 (${result.risk_level.replace('_', ' ')})
Assessment: ${result.risk_label}
Key Red Flags:
${result.red_flags.map((rf) => `• ${rf.title}: ${rf.explanation}`).join('\n')}

Recommendation:
${result.recommended_actions.slice(0, 3).map((a) => `• ${a}`).join('\n')}

Verify safely: https://scamcheck.ai (Before you trust it, check it.)`;

    navigator.clipboard.writeText(summaryText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div id="scamcheck-result-dashboard" className="space-y-6">
      {/* Top Banner Card: Score & Classification */}
      <div className={`rounded-xl border ${riskStyle.border} ${riskStyle.lightBg} p-6 sm:p-8 shadow-sm`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${riskStyle.badgeColor} ${riskStyle.badgeText} shadow-xs`}
              >
                <RiskIcon className="w-3.5 h-3.5" />
                {riskStyle.title}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/80 border border-slate-200 text-slate-700">
                Type: {result.category_name}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
              {result.risk_label}
            </h2>

            <p className="text-sm text-slate-700 leading-relaxed max-w-2xl font-normal">
              {selectedLanguage === 'hi' && result.hindi_summary
                ? result.hindi_summary
                : selectedLanguage === 'hinglish' && result.hinglish_summary
                ? result.hinglish_summary
                : result.summary}
            </p>
          </div>

          {/* Gauge Meter Box */}
          <div className="flex-shrink-0 flex items-center gap-4 bg-white/90 border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-xs">
            <div className="text-center">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                AI Risk Assessment
              </span>
              <div className="flex items-baseline justify-center gap-1 mt-0.5">
                <span className={`text-4xl sm:text-5xl font-extrabold font-display ${riskStyle.text}`}>
                  {animatedScore}
                </span>
                <span className="text-sm font-semibold text-slate-400">/ 100</span>
              </div>
              <div className="w-28 h-2 bg-slate-100 rounded-full overflow-hidden mt-2 mx-auto">
                <div
                  className={`h-full ${riskStyle.bg} transition-all duration-700 ease-out`}
                  style={{ width: `${animatedScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action toolbar inside banner */}
        <div className="mt-6 pt-4 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Language & Elderly mode toggles */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              id="btn-simple-explain"
              onClick={() => setIsSimpleMode(!isSimpleMode)}
              className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isSimpleMode
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {isSimpleMode ? 'Standard View' : 'Explain More Simply (Elderly / Plain Language)'}
            </button>

            <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white p-0.5">
              <button
                type="button"
                onClick={() => setSelectedLanguage('en')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                  selectedLanguage === 'en' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setSelectedLanguage('hi')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                  selectedLanguage === 'hi' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                हिंदी
              </button>
              <button
                type="button"
                onClick={() => setSelectedLanguage('hinglish')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                  selectedLanguage === 'hinglish' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Hinglish
              </button>
            </div>
          </div>

          {/* Share & New Analysis */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="btn-copy-summary"
              onClick={handleCopySummary}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Summary</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onReset}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold transition-colors cursor-pointer"
            >
              Check Another Message
            </button>
          </div>
        </div>
      </div>

      {/* Simple Explanation Box if toggled */}
      {isSimpleMode && (
        <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-5 text-sm text-indigo-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-indigo-900">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Plain-Language Summary (Simple Mode):
          </div>
          <p className="text-slate-800 leading-relaxed text-sm sm:text-base font-medium">
            "{result.simple_explanation}"
          </p>
        </div>
      )}

      {/* Section 1: WHY WE FLAGGED IT (Red Flags) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Why We Flagged It ({result.red_flags.length} Red Flags Detected)
          </h3>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Objective Evidence</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          {result.red_flags.map((flag, idx) => {
            const isHigh = flag.severity === 'HIGH';
            const isMedium = flag.severity === 'MEDIUM';

            return (
              <div
                key={idx}
                className="rounded-lg border border-slate-200/90 bg-slate-50/70 p-4 hover:border-slate-300 transition-all space-y-1.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                        isHigh ? 'bg-red-500' : isMedium ? 'bg-amber-500' : 'bg-slate-400'
                      }`}
                    />
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">{flag.title}</h4>
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isHigh
                        ? 'bg-red-100 text-red-700'
                        : isMedium
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {flag.severity}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{flag.explanation}</p>

                {flag.quote && (
                  <div className="text-[11px] text-slate-500 font-mono bg-white border border-slate-200 rounded px-2 py-1 italic">
                    "{flag.quote}"
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: What The Scammer May Be Trying To Do */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-3">
        <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          What The Scammer May Be Trying To Do
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 border border-slate-200/80 rounded-lg p-4 font-normal">
          {result.likely_goal}
        </p>
      </div>

      {/* Section 3 & 4: What You Should Do vs What NOT To Do (2 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* WHAT YOU SHOULD DO */}
        <div className="bg-white rounded-xl border border-emerald-200/90 p-6 shadow-sm space-y-3">
          <h3 className="text-base font-bold font-display text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            What You Should Do
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            {result.recommended_actions.map((act, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* WHAT NOT TO DO */}
        <div className="bg-white rounded-xl border border-red-200/90 p-6 shadow-sm space-y-3">
          <h3 className="text-base font-bold font-display text-red-900 flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-red-600" />
            What NOT To Do
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            {result.things_to_avoid.map((avoid, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-red-100 text-red-700 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  ✕
                </span>
                <span>{avoid}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Section 5: How To Verify It Independently */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-3">
        <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-sky-600" />
          How To Verify It Safely
        </h3>
        <p className="text-xs text-slate-500">
          Always bypass the contact info provided in the message and use independent verification:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {result.verification_steps.map((step, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-900 block mb-1">Step {idx + 1}</span>
              {step}
            </div>
          ))}
        </div>
      </div>

      {/* Section 6: Already Interacted Quick Launch Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-7 border border-slate-800 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Immediate Safety Follow-Up
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-display text-white mt-0.5">
              Already interacted with this message?
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Select what happened to get an immediate, step-by-step containment protocol:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => onSelectInteractedAction('clicked_link')}
            className="p-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-center transition-all cursor-pointer hover:scale-[1.02]"
          >
            🔗 Clicked link
          </button>
          <button
            type="button"
            onClick={() => onSelectInteractedAction('shared_info')}
            className="p-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-center transition-all cursor-pointer hover:scale-[1.02]"
          >
            📝 Shared info
          </button>
          <button
            type="button"
            onClick={() => onSelectInteractedAction('sent_money')}
            className="p-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-xs font-bold text-amber-300 text-center transition-all cursor-pointer hover:scale-[1.02]"
          >
            💸 Sent money
          </button>
          <button
            type="button"
            onClick={() => onSelectInteractedAction('installed_app')}
            className="p-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-center transition-all cursor-pointer hover:scale-[1.02]"
          >
            📲 Installed app
          </button>
          <button
            type="button"
            onClick={() => onSelectInteractedAction('replied_only')}
            className="p-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-center transition-all cursor-pointer hover:scale-[1.02]"
          >
            💬 Replied only
          </button>
          <button
            type="button"
            onClick={() => onSelectInteractedAction('nothing_yet')}
            className="p-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 text-xs font-bold text-emerald-300 text-center transition-all cursor-pointer hover:scale-[1.02]"
          >
            🛡️ Nothing yet
          </button>
        </div>
      </div>

      {/* Limitations Disclaimer */}
      <div className="bg-slate-100/80 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 flex items-start gap-3">
        <Info className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold text-slate-800">AI Assessment Disclaimer:</span> {result.limitations}
        </div>
      </div>
    </div>
  );
};
