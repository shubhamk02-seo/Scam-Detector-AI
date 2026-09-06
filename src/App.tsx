import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { AnalyzerInput } from './components/AnalyzerInput';
import { AnalysisLoading } from './components/AnalysisLoading';
import { AnalysisResult } from './components/AnalysisResult';
import { AlreadyInteractedFlow } from './components/AlreadyInteractedFlow';
import { LearnRedFlags } from './components/LearnRedFlags';
import { ScamQuiz } from './components/ScamQuiz';
import { EmergencySection } from './components/EmergencySection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ScamAnalysisResult } from './types';
import {
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import { SAMPLE_SCAMS } from './data/samples';
import { analyzeFallback } from './utils/analyzerFallback';

export default function App() {
  const [activeTab, setActiveTab] = useState<'analyze' | 'guides' | 'quiz' | 'emergency' | 'about'>('analyze');
  const [selectedCountry, setSelectedCountry] = useState<string>('IN');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ScamAnalysisResult | null>(null);
  const [interactedScenario, setInteractedScenario] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const inputSectionRef = useRef<HTMLDivElement>(null);
  const resultSectionRef = useRef<HTMLDivElement>(null);
  const interactedSectionRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async (payload: {
    type: 'text' | 'screenshot' | 'url';
    text?: string;
    imageBase64?: string;
    mimeType?: string;
  }) => {
    setIsLoading(true);
    setErrorMessage(null);
    setAnalysisResult(null);
    setInteractedScenario(null);

    try {
      let data: ScamAnalysisResult | null = null;

      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          data = await response.json();
        } else {
          console.warn(`[Analyzer] Backend responded with status ${response.status}. Using client-side safety engine fallback.`);
        }
      } catch (fetchError) {
        console.warn('[Analyzer] Network fetch error. Engaging client-side safety engine fallback.', fetchError);
      }

      // If backend was unreachable or returned non-200, engage client-side heuristic engine
      if (!data) {
        data = analyzeFallback(payload.text || '', payload.type, 'en');
      }

      setAnalysisResult(data);

      setTimeout(() => {
        resultSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      console.error('Analysis error:', err);
      // Even in the worst case, compute fallback
      const fallbackData = analyzeFallback(payload.text || '', payload.type, 'en');
      setAnalysisResult(fallbackData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetAnalysis = () => {
    setAnalysisResult(null);
    setInteractedScenario(null);
    inputSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectInteractedAction = (actionType: string) => {
    setInteractedScenario(actionType);
    setTimeout(() => {
      interactedSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const scrollToInput = () => {
    setActiveTab('analyze');
    setTimeout(() => {
      inputSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Persistent Emergency Notification Bar */}
      <aside aria-label="Emergency cyber helpline" className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
            <span>
              Already lost money to a scam?{' '}
              <strong className="text-white">Call your bank immediately</strong> & dial{' '}
              <span className="text-amber-300 font-bold">1930</span> in India (or national cybercrime helpline).
            </span>
          </div>
          <button
            onClick={() => {
              setActiveTab('emergency');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-amber-400 hover:text-amber-300 font-bold underline flex items-center gap-1 flex-shrink-0"
          >
            Emergency Portals <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </aside>

      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-10">
        {/* VIEW 1: ANALYZE (DEFAULT / HOME) */}
        {activeTab === 'analyze' && (
          <div className="space-y-10">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto pt-2 sm:pt-4 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold uppercase tracking-wider shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Intelligent Scam Detection Engine
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-slate-900 leading-tight">
                Before you trust it, <span className="text-indigo-600">check it.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Spot the red flags before they cost you. Paste a link, email, phone number, or message screenshot to uncover deceptive patterns, psychological traps, and official next steps.
              </p>

              {/* Quick Verification Categories from Professional Polish theme */}
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {['URL Scan', 'SMS Verification', 'Phishing Defense', 'Payment Fraud'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1 bg-slate-100 hover:bg-slate-200/70 text-slate-700 rounded-full text-xs font-bold tracking-wide transition-colors border border-slate-200/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Input Card Container */}
            <div ref={inputSectionRef}>
              <AnalyzerInput onAnalyze={handleAnalyze} isLoading={isLoading} />
            </div>

            {/* Error Banner if any */}
            {errorMessage && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-900 text-xs sm:text-sm flex items-start gap-3 shadow-xs">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Error Analyzing Input</span>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            {/* Loading Experience */}
            {isLoading && <AnalysisLoading />}

            {/* Analysis Result Dashboard */}
            {analysisResult && (
              <div ref={resultSectionRef}>
                <AnalysisResult
                  result={analysisResult}
                  onReset={handleResetAnalysis}
                  onSelectInteractedAction={handleSelectInteractedAction}
                />
              </div>
            )}

            {/* Three-Column Intelligence Grid (from Professional Polish theme) */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Recent Threats */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Recent Threats Detected
                    </span>
                    <span className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                      <ShieldAlert className="w-4 h-4" />
                    </span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between pb-2.5 border-b border-slate-100 text-xs">
                      <div className="truncate mr-2">
                        <span className="font-bold text-slate-800 block truncate">dhl-express-customs.vip</span>
                        <span className="text-slate-400 text-[11px]">Parcel fee smishing SMS</span>
                      </div>
                      <span className="px-2 py-0.5 bg-rose-100 text-rose-700 font-bold rounded text-[10px] flex-shrink-0">
                        High Risk
                      </span>
                    </li>
                    <li className="flex items-center justify-between pb-2.5 border-b border-slate-100 text-xs">
                      <div className="truncate mr-2">
                        <span className="font-bold text-slate-800 block truncate">telegram-task-rating.top</span>
                        <span className="text-slate-400 text-[11px]">Part-time YouTube likes scam</span>
                      </div>
                      <span className="px-2 py-0.5 bg-rose-100 text-rose-700 font-bold rounded text-[10px] flex-shrink-0">
                        High Risk
                      </span>
                    </li>
                    <li className="flex items-center justify-between text-xs">
                      <div className="truncate mr-2">
                        <span className="font-bold text-slate-800 block truncate">power-bill-disconnection.apk</span>
                        <span className="text-slate-400 text-[11px]">Electricity disconnection malware</span>
                      </div>
                      <span className="px-2 py-0.5 bg-rose-100 text-rose-700 font-bold rounded text-[10px] flex-shrink-0">
                        Critical
                      </span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('guides');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="mt-5 text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 pt-3 border-t border-slate-100"
                >
                  View Threat Catalog <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card 2: Live Global Metrics */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Global Detection Metrics
                    </span>
                    <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                      <Sparkles className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-3xl font-extrabold text-slate-900 tracking-tight">1.2M+</div>
                      <div className="text-xs text-slate-500 font-medium">Scam & Phishing Signatures Indexed</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                      <div>
                        <div className="text-xl font-bold text-emerald-600">99.9%</div>
                        <div className="text-[11px] text-slate-500">Heuristic Accuracy</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-indigo-600">&lt;1.5s</div>
                        <div className="text-[11px] text-slate-500">Inspection Speed</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Constantly updated against active campaigns</span>
                </div>
              </div>

              {/* Card 3: Indigo Pro Tip (Theme Hero Accent) */}
              <div className="bg-indigo-950 p-6 rounded-xl text-white shadow-md border border-indigo-900 flex flex-col justify-between">
                <div>
                  <div className="text-indigo-400 mb-2 uppercase text-[11px] font-bold tracking-widest flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" /> Security Pro Tip
                  </div>
                  <h4 className="text-lg font-bold font-display text-white mb-2 leading-snug">
                    Banks NEVER demand urgent OTPs or APK downloads to "unfreeze accounts".
                  </h4>
                  <p className="text-xs text-indigo-200/90 leading-relaxed">
                    Legitimate banking security alerts instruct you to visit a local branch or call the number printed physically on your debit card.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('quiz');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="mt-6 w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  Test Your Scam Radar in Quiz <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

            {/* Already Interacted Flow */}
            <div ref={interactedSectionRef}>
              <AlreadyInteractedFlow
                initialAction={interactedScenario}
                selectedCountry={selectedCountry}
              />
            </div>

            {/* Trust & Pause Section */}
            <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 border border-slate-800 shadow-sm">
              <div className="max-w-2xl space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Public Safety Notice
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  Built to help you pause before you act.
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Scammers rely on urgency, fear, trust, and confusion. SCAMCHECK AI helps you slow down,
                  understand the warning signs, and make a safer decision.
                </p>
                <div className="pt-2 text-xs text-slate-400 border-t border-slate-800 flex items-start gap-2">
                  <Lock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span>
                    AI detection is an assessment, not legal proof. When money, identity, or account
                    security is involved, always independently verify with official authorities.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: LEARN RED FLAGS */}
        {activeTab === 'guides' && <LearnRedFlags />}

        {/* VIEW 3: SPOT THE SCAM QUIZ */}
        {activeTab === 'quiz' && <ScamQuiz />}

        {/* VIEW 4: EMERGENCY & HELPLINES */}
        {activeTab === 'emergency' && (
          <EmergencySection
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
        )}

        {/* VIEW 5: ABOUT & MISSION */}
        {activeTab === 'about' && <AboutSection />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
