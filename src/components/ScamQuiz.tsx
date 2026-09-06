import React, { useState } from 'react';
import { QUIZ_SCENARIOS } from '../data/quiz';
import { CheckCircle2, AlertOctagon, HelpCircle, ArrowRight, RotateCcw, ShieldCheck } from 'lucide-react';
import { QuizScenario } from '../types';

export const ScamQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, 'SCAM' | 'LEGIT' | 'UNSURE'>>({});
  const [showResult, setShowResult] = useState(false);

  const scenario: QuizScenario = QUIZ_SCENARIOS[currentIndex];
  const selectedAnswer = userAnswers[scenario.id];

  const handleSelect = (answer: 'SCAM' | 'LEGIT' | 'UNSURE') => {
    setUserAnswers((prev) => ({ ...prev, [scenario.id]: answer }));
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    if (currentIndex < QUIZ_SCENARIOS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleRestart = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setShowResult(false);
  };

  // Score calculation
  const totalCompleted = Object.keys(userAnswers).length;
  const correctCount = Object.entries(userAnswers).filter(([id, ans]) => {
    const sc = QUIZ_SCENARIOS.find((q) => q.id === id);
    if (!sc) return false;
    if (sc.isScam && ans === 'SCAM') return true;
    if (!sc.isScam && ans === 'LEGIT') return true;
    return false;
  }).length;

  const isQuizFinished = totalCompleted === QUIZ_SCENARIOS.length && showResult;

  return (
    <div id="scam-quiz-section" className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
          Interactive Training Ground
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
          Can You Spot the Scam?
        </h2>
        <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Test your instincts on realistic, fictional messages. All scenarios are simulated for
          educational purposes.
        </p>

        {/* Progress Bar */}
        <div className="pt-3 max-w-md mx-auto">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
            <span>Scenario {currentIndex + 1} of {QUIZ_SCENARIOS.length}</span>
            <span>Score: {correctCount} / {totalCompleted}</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / QUIZ_SCENARIOS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Quiz Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Simulation Notice Tag */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
            Fictional Training Scenario
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Channel: {scenario.channel}
          </span>
        </div>

        {/* Sender Header */}
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs text-slate-400 block font-medium">Sender:</span>
          <span className="text-sm font-bold text-slate-800 font-mono">{scenario.sender}</span>
        </div>

        {/* Message Content Bubble */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 sm:p-6 text-sm text-slate-800 leading-relaxed font-sans shadow-xs whitespace-pre-line">
          {scenario.message}
        </div>

        {/* Decision Buttons */}
        {!showResult ? (
          <div className="space-y-2.5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
              What is your assessment?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                id="quiz-btn-scam"
                onClick={() => handleSelect('SCAM')}
                className="py-3 px-4 rounded-lg border-2 border-red-200 bg-red-50/50 hover:bg-red-100 text-red-700 font-bold text-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <AlertOctagon className="w-4 h-4 text-red-600" />
                Scam
              </button>

              <button
                type="button"
                id="quiz-btn-legit"
                onClick={() => handleSelect('LEGIT')}
                className="py-3 px-4 rounded-lg border-2 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100 text-emerald-700 font-bold text-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Probably Legit
              </button>

              <button
                type="button"
                id="quiz-btn-unsure"
                onClick={() => handleSelect('UNSURE')}
                className="py-3 px-4 rounded-lg border-2 border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <HelpCircle className="w-4 h-4 text-slate-500" />
                I'm Not Sure
              </button>
            </div>
          </div>
        ) : (
          /* Result & Clues Reveal */
          <div className="space-y-4 pt-2">
            <div
              className={`p-5 rounded-lg border ${
                (scenario.isScam && selectedAnswer === 'SCAM') || (!scenario.isScam && selectedAnswer === 'LEGIT')
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-base">
                {(scenario.isScam && selectedAnswer === 'SCAM') || (!scenario.isScam && selectedAnswer === 'LEGIT') ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    Spot on! Your instinct was accurate.
                  </>
                ) : (
                  <>
                    <AlertOctagon className="w-5 h-5 text-amber-600" />
                    Here is the breakdown of the clues:
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm mt-2 leading-relaxed">
                <strong>Verdict:</strong> {scenario.isScam ? '🚨 FRAUD / SCAM' : '✅ LEGITIMATE NOTIFICATION'} — {scenario.explanation}
              </p>
            </div>

            {/* Key Clues */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2 text-xs">
              <span className="font-bold text-slate-900 block uppercase tracking-wider text-[11px]">
                Key Forensic Clues to Notice:
              </span>
              <ul className="space-y-1.5 text-slate-700">
                {scenario.keyClues.map((clue, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>{clue}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Safe Action */}
            <div className="bg-white border border-slate-200 rounded-lg p-3.5 text-xs text-slate-700">
              <span className="font-bold text-slate-900">Recommended Next Step: </span>
              {scenario.recommendedAction}
            </div>

            {/* Navigation to next question */}
            <div className="flex items-center justify-end gap-3 pt-3">
              {currentIndex < QUIZ_SCENARIOS.length - 1 ? (
                <button
                  type="button"
                  id="quiz-btn-next"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors shadow-sm cursor-pointer active:scale-95"
                >
                  <span>Next Scenario</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRestart}
                  className="px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors shadow-sm cursor-pointer active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restart Quiz</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
