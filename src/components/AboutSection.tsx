import React from 'react';
import { ShieldCheck, Lock, HeartHandshake, Eye, AlertTriangle, ArrowRight, UserCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div id="about-section-container" className="space-y-6 max-w-4xl mx-auto">
      {/* Social Mission Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
          The Social Mission
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
          Why SCAMCHECK AI Exists
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
          "Scammers don't need sophisticated technology. They only need you to act before you think."
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Modern cyber fraud rarely attacks firewalls or operating systems; it attacks human psychology.
          A simple SMS or WhatsApp message can manufacture enough urgency, fear, or excitement to make
          even educated people click links, share OTPs, or transfer life savings before taking a breath.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          <strong>SCAMCHECK AI</strong> was built to provide an instant, judgment-free second opinion.
          Our purpose is to give everyone that crucial 30-second pause: to inspect the clues, understand
          the hidden traps, and walk away safely.
        </p>

        {/* 4-Step Journey */}
        <div className="pt-4 border-t border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
            The Protection Loop
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-xl block mb-1">🚨</span>
              <span className="text-xs font-bold text-slate-900 block">1. The Problem</span>
              <span className="text-[11px] text-slate-500">Unsolicited urgency, fear, or prize promise</span>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-xl block mb-1">🧠</span>
              <span className="text-xs font-bold text-slate-900 block">2. AI Analysis</span>
              <span className="text-[11px] text-slate-500">Multidimensional forensic evaluation</span>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-xl block mb-1">💡</span>
              <span className="text-xs font-bold text-slate-900 block">3. Education</span>
              <span className="text-[11px] text-slate-500">Understand the red flags in plain words</span>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-xl block mb-1">🛡️</span>
              <span className="text-xs font-bold text-slate-900 block">4. Safer Action</span>
              <span className="text-[11px] text-slate-500">Bypass the scam, verify officially</span>
            </div>
          </div>
        </div>
      </div>

      {/* Built to help you pause */}
      <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-6 sm:p-8 space-y-3">
        <h3 className="text-lg sm:text-xl font-bold font-display text-indigo-950">
          Built to Help You Pause Before You Act
        </h3>
        <p className="text-xs sm:text-sm text-indigo-900 leading-relaxed">
          Scammers rely on urgency, fear, trust, and confusion. SCAMCHECK AI helps you slow down,
          understand the warning signs, and make a safer decision.
        </p>
        <p className="text-xs text-indigo-800 leading-relaxed">
          AI can make mistakes. When money, identity, or account security is involved, always verify
          through an official, verified channel.
        </p>
      </div>

      {/* Privacy Guarantee Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-bold font-display text-slate-900">Your Privacy Matters</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          We don't need to know who you are to help you analyze a suspicious message.
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 font-bold">•</span>
            <span>
              <strong>No Account Required:</strong> Anyone can verify suspicious content without
              signing up or providing personal email addresses or phone numbers.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 font-bold">•</span>
            <span>
              <strong>In-Memory Processing:</strong> Content submitted for analysis is evaluated in
              ephemeral server memory and is not stored in a persistent database.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 font-bold">•</span>
            <span>
              <strong>Client-Side Sensitive Info Detector:</strong> We actively check your input on your
              device and prompt you to redact live card numbers, Aadhaar details, or passwords before
              submission.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
