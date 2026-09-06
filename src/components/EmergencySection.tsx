import React from 'react';
import { EMERGENCY_RESOURCES } from '../data/emergency';
import { PhoneCall, ExternalLink, ShieldAlert, CheckCircle2, AlertTriangle, Building, Lock } from 'lucide-react';

interface EmergencySectionProps {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
}

export const EmergencySection: React.FC<EmergencySectionProps> = ({
  selectedCountry,
  setSelectedCountry,
}) => {
  const currentResource = EMERGENCY_RESOURCES[selectedCountry] || EMERGENCY_RESOURCES.IN;

  return (
    <div id="emergency-section-container" className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-red-50/60 border border-red-200 rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-red-600 text-white shadow-xs">
              <ShieldAlert className="w-3.5 h-3.5" />
              Official Cyber Safety & Emergency Portals
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
              Already Lost Money or Shared Sensitive Information?
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              Act quickly. Contact your bank/payment provider through an official channel immediately,
              and file a report with your national cybercrime/fraud authority.
            </p>
          </div>

          {/* Emergency Hotline Box */}
          {currentResource.hotline && (
            <div className="flex-shrink-0 bg-white border border-red-200 rounded-xl p-5 text-center shadow-xs w-full md:w-auto">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                {currentResource.countryName} Toll-Free Helpline
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-red-600 my-1 flex items-center justify-center gap-2">
                <PhoneCall className="w-6 h-6" />
                <span>{currentResource.hotline}</span>
              </div>
              <span className="text-xs text-slate-500 max-w-[200px] block mx-auto">
                {currentResource.hotlineDescription}
              </span>
            </div>
          )}
        </div>

        {/* Country Selector Inside Emergency Box */}
        <div className="mt-6 pt-4 border-t border-red-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-600 font-medium">
            Showing verified emergency reporting channels for:
          </span>
          <div className="flex items-center gap-1.5">
            {Object.values(EMERGENCY_RESOURCES).map((res) => (
              <button
                key={res.countryCode}
                type="button"
                onClick={() => setSelectedCountry(res.countryCode)}
                className={`px-3 py-1.5 rounded-lg font-semibold border transition-all cursor-pointer ${
                  selectedCountry === res.countryCode
                    ? 'bg-red-600 text-white border-red-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {res.flag} {res.countryName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Verified Official Portals */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
          <Building className="w-5 h-5 text-indigo-600" />
          Verified Government & Law Enforcement Portals ({currentResource.countryName})
        </h3>
        <p className="text-xs text-slate-500">
          Only report scams on authenticated official domains (.gov.in, .gov, .police.uk). Never report scams to third-party social media accounts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {currentResource.officialPortals.map((portal, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 space-y-2 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{portal.name}</h4>
                  <span className="text-[10px] font-semibold text-slate-500 px-2 py-0.5 rounded bg-slate-200/60">
                    Official
                  </span>
                </div>
                <p className="text-xs text-indigo-700 font-medium">{portal.organization}</p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{portal.description}</p>
              </div>

              <div className="pt-2">
                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline"
                >
                  Visit Official Portal ({portal.url.replace('https://', '')})
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bank Action Checklist */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          Immediate Bank Action Protocol
        </h3>
        <p className="text-xs text-slate-500">
          Follow these sequential actions to stop further financial loss:
        </p>

        <div className="space-y-2.5">
          {currentResource.bankActionChecklist.map((step, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800"
            >
              <div className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <div className="leading-relaxed">{step}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
