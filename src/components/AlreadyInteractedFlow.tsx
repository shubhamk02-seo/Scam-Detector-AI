import React, { useState } from 'react';
import {
  AlertOctagon,
  ShieldCheck,
  Smartphone,
  CreditCard,
  KeyRound,
  Link,
  PhoneCall,
  Lock,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import { EMERGENCY_RESOURCES } from '../data/emergency';

interface AlreadyInteractedFlowProps {
  initialAction?: string | null;
  selectedCountry: string;
  onClose?: () => void;
}

export const AlreadyInteractedFlow: React.FC<AlreadyInteractedFlowProps> = ({
  initialAction = null,
  selectedCountry,
  onClose,
}) => {
  const [currentScenario, setCurrentScenario] = useState<string | null>(initialAction || null);
  const [clickedEnteredData, setClickedEnteredData] = useState<boolean | null>(null);
  const [sharedInfoType, setSharedInfoType] = useState<string | null>(null);

  const countryData = EMERGENCY_RESOURCES[selectedCountry] || EMERGENCY_RESOURCES.IN;

  const handleReset = () => {
    setCurrentScenario(null);
    setClickedEnteredData(null);
    setSharedInfoType(null);
  };

  return (
    <div
      id="already-interacted-container"
      className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
            Emergency Response Assistant
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            What To Do If You Already Interacted
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Calm, step-by-step damage control. Select your situation below:
          </p>
        </div>

        {currentScenario && (
          <button
            type="button"
            onClick={handleReset}
            className="self-start sm:self-auto text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to situations
          </button>
        )}
      </div>

      {/* Primary Situation Selector */}
      {!currentScenario && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          <button
            type="button"
            id="interacted-btn-clicked"
            onClick={() => setCurrentScenario('clicked_link')}
            className="text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
              🔗
            </div>
            <h4 className="text-sm font-bold text-slate-900">I clicked the link</h4>
            <p className="text-xs text-slate-500 mt-1">
              Opened a phishing or suspicious web page on phone or computer.
            </p>
          </button>

          <button
            type="button"
            id="interacted-btn-shared-info"
            onClick={() => setCurrentScenario('shared_info')}
            className="text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
              📝
            </div>
            <h4 className="text-sm font-bold text-slate-900">I shared information</h4>
            <p className="text-xs text-slate-500 mt-1">
              Entered password, card details, OTP, Aadhaar, or bank details.
            </p>
          </button>

          <button
            type="button"
            id="interacted-btn-sent-money"
            onClick={() => setCurrentScenario('sent_money')}
            className="text-left p-4 rounded-xl border border-amber-300 bg-amber-50/30 hover:bg-amber-50 hover:border-amber-400 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
              💸
            </div>
            <h4 className="text-sm font-bold text-amber-900">I sent money</h4>
            <p className="text-xs text-slate-600 mt-1">
              Transferred funds via UPI, NetBanking, credit card, or crypto.
            </p>
          </button>

          <button
            type="button"
            id="interacted-btn-installed-app"
            onClick={() => setCurrentScenario('installed_app')}
            className="text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
              📲
            </div>
            <h4 className="text-sm font-bold text-slate-900">I installed an application</h4>
            <p className="text-xs text-slate-500 mt-1">
              Downloaded AnyDesk, TeamViewer, QuickSupport, or an APK file.
            </p>
          </button>

          <button
            type="button"
            id="interacted-btn-replied-only"
            onClick={() => setCurrentScenario('replied_only')}
            className="text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
              💬
            </div>
            <h4 className="text-sm font-bold text-slate-900">I only replied</h4>
            <p className="text-xs text-slate-500 mt-1">
              Chatted with or texted the sender without sending money or files.
            </p>
          </button>

          <button
            type="button"
            id="interacted-btn-nothing-yet"
            onClick={() => setCurrentScenario('nothing_yet')}
            className="text-left p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 hover:bg-emerald-50 hover:border-emerald-300 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
              🛡️
            </div>
            <h4 className="text-sm font-bold text-emerald-900">Nothing yet</h4>
            <p className="text-xs text-slate-600 mt-1">
              Stopped before clicking or paying anything.
            </p>
          </button>
        </div>
      )}

      {/* CASE 1: I CLICKED THE LINK */}
      {currentScenario === 'clicked_link' && (
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="text-sm font-bold text-slate-900">
              Don't panic. Your next steps depend on what happened after clicking.
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              Did you submit any information on the web page?
            </p>

            <div className="flex items-center gap-3 mt-3">
              <button
                type="button"
                onClick={() => setClickedEnteredData(false)}
                className={`px-4 py-2 rounded-lg text-xs font-bold border transition-colors ${
                  clickedEnteredData === false
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                No, I just looked and closed the tab
              </button>
              <button
                type="button"
                onClick={() => setClickedEnteredData(true)}
                className={`px-4 py-2 rounded-lg text-xs font-bold border transition-colors ${
                  clickedEnteredData === true
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                Yes, I filled out forms or submitted details
              </button>
            </div>
          </div>

          {clickedEnteredData === false && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-2.5 text-xs text-slate-800">
              <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Immediate Precautions (No Credentials Submitted):
              </div>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                <li>Close the browser tab immediately.</li>
                <li>Clear your browser cache and cookies for the last 24 hours.</li>
                <li>
                  Check your phone/computer's "Downloads" folder to make sure no background file or
                  installer (.apk, .exe) was downloaded.
                </li>
                <li>Do not click any other links or notifications from that sender.</li>
              </ul>
            </div>
          )}

          {clickedEnteredData === true && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 space-y-3 text-xs text-slate-800">
              <div className="flex items-center gap-2 font-bold text-red-900 text-sm">
                <AlertOctagon className="w-4 h-4 text-red-600" />
                Escalate Protective Measures Immediately:
              </div>
              <p className="text-slate-700">
                Because you submitted information on a fraudulent page, assume those credentials are
                compromised:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li>
                  <strong>If you entered a password:</strong> Change that password immediately on the
                  real, official website, and change it on any other service where you reused that
                  password.
                </li>
                <li>
                  <strong>If you entered card details:</strong> Open your banking app or call the bank
                  number on the back of your card to block that card immediately.
                </li>
                <li>
                  <strong>If you shared an OTP:</strong> Contact your bank's fraud helpline immediately
                  to check for unauthorized transactions.
                </li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* CASE 2: I SHARED INFORMATION */}
      {currentScenario === 'shared_info' && (
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="text-sm font-bold text-slate-900">What type of information was shared?</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              (We will never ask you to enter the actual information or secret codes)
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              {['Password', 'Bank Account Info', 'Credit / Debit Card', 'Personal / ID Info', 'OTP / Security Code'].map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSharedInfoType(item)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      sharedInfoType === item
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>

          {sharedInfoType === 'Password' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-2 text-xs text-slate-800">
              <h5 className="font-bold text-amber-900 text-sm flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-700" /> Password Compromise Protocol:
              </h5>
              <ol className="list-decimal pl-5 space-y-1.5 text-slate-700">
                <li>Go directly to the official service website manually and change your password.</li>
                <li>Select "Sign out of all other active sessions/devices" in your account settings.</li>
                <li>Enable Two-Factor Authentication (2FA) using an Authenticator app.</li>
                <li>If you reused this password across email or banking, change those passwords too.</li>
              </ol>
            </div>
          )}

          {sharedInfoType === 'Credit / Debit Card' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 space-y-2 text-xs text-slate-800">
              <h5 className="font-bold text-red-900 text-sm flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-red-700" /> Payment Card Compromise Protocol:
              </h5>
              <ol className="list-decimal pl-5 space-y-1.5 text-slate-700">
                <li>Open your bank's official mobile app and freeze or toggle off international/online transactions immediately.</li>
                <li>Call the 24/7 bank toll-free number printed on the back of your physical card.</li>
                <li>Request a permanent card block and order a replacement card with a new CVV and number.</li>
              </ol>
            </div>
          )}

          {sharedInfoType === 'OTP / Security Code' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 space-y-2 text-xs text-slate-800">
              <h5 className="font-bold text-red-900 text-sm flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-red-700" /> Immediate Critical Alert (OTP Shared):
              </h5>
              <ol className="list-decimal pl-5 space-y-1.5 text-slate-700 font-medium">
                <li>Call your bank's emergency customer service right now. Tell them: "I accidentally shared an OTP with an unauthorized party."</li>
                <li>Request an immediate freeze on NetBanking and outgoing UPI transfers.</li>
                <li>Check your recent SMS/statement to see if an unauthorized transaction already executed.</li>
              </ol>
            </div>
          )}

          {(sharedInfoType === 'Bank Account Info' || sharedInfoType === 'Personal / ID Info') && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 space-y-2 text-xs text-slate-800">
              <h5 className="font-bold text-indigo-950 text-sm flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-700" /> Personal / Account Info Protocol:
              </h5>
              <ol className="list-decimal pl-5 space-y-1.5 text-slate-700">
                <li>Alert your bank to place a security flag on your account for unexpected withdrawal requests.</li>
                <li>Enable biometric or SMS locking on government portals (e.g. UIDAI Aadhaar biometric lock in India).</li>
                <li>Be alert for spear-phishing calls pretending to be police or customs using your leaked name or address.</li>
              </ol>
            </div>
          )}
        </div>
      )}

      {/* CASE 3: I SENT MONEY */}
      {currentScenario === 'sent_money' && (
        <div className="bg-red-50 border border-red-300 rounded-xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-red-700 font-extrabold text-base sm:text-lg">
            <AlertOctagon className="w-6 h-6 text-red-600 flex-shrink-0" />
            <span>Act quickly. The first 2 to 3 hours are critical.</span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-800">
            <div className="bg-white border border-red-200 rounded-lg p-3.5 space-y-1">
              <span className="font-bold text-red-900 block">1. Contact Your Bank / Payment Provider Immediately</span>
              <p className="text-slate-600 text-xs">
                Call the bank's official fraud hotline (from back of card). Request them to raise a fraudulent charge dispute / recall request with the beneficiary bank.
              </p>
            </div>

            <div className="bg-white border border-red-200 rounded-lg p-3.5 space-y-1">
              <span className="font-bold text-red-900 block">
                2. Report to Cyber Crime Authorities (Helpline: {countryData.hotline || 'Local Police'})
              </span>
              <p className="text-slate-600 text-xs">
                {selectedCountry === 'IN'
                  ? 'Call 1930 (National Cyber Crime Reporting Helpline) right away. Police can coordinate with RBI nodal bank officers to freeze the fraudulent recipient account before funds are cashed out.'
                  : 'File an immediate fraud incident report with your national cybercrime portal.'}
              </p>
            </div>

            <div className="bg-white border border-red-200 rounded-lg p-3.5 space-y-1">
              <span className="font-bold text-red-900 block">3. Preserve All Evidence</span>
              <p className="text-slate-600 text-xs">
                Take screenshots of the chat, SMS, recipient UPI ID/account number, transaction ID/UTR, and time stamps. Do NOT delete the chat history.
              </p>
            </div>

            <div className="bg-amber-100/70 border border-amber-300 rounded-lg p-3 text-xs text-amber-950 font-semibold">
              ⚠️ WARNING: Never pay anyone who contacts you claiming they are a "recovery hacker" or "cyber expert" who can recover your lost money for an advance fee. That is a secondary "Recovery Scam"!
            </div>
          </div>
        </div>
      )}

      {/* CASE 4: I INSTALLED AN APPLICATION */}
      {currentScenario === 'installed_app' && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-xs sm:text-sm text-slate-800">
          <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-indigo-600" />
            Device Containment Guide (Remote Tool / APK Installed)
          </h4>
          <ol className="list-decimal pl-5 space-y-2 text-slate-700 text-xs sm:text-sm">
            <li>
              <strong>Disconnect from the internet immediately:</strong> Turn on Airplane Mode or turn off Wi-Fi and Mobile Data. This severs the scammer's live remote control session.
            </li>
            <li>
              <strong>Uninstall the suspicious app:</strong> Look in Settings &gt; Apps for AnyDesk, TeamViewer, QuickSupport, RustDesk, or any APK you downloaded. Uninstall immediately.
            </li>
            <li>
              <strong>Check Accessibility Permissions:</strong> In Phone Settings &gt; Accessibility, verify that no unknown application has screen-reading or remote-control permissions.
            </li>
            <li>
              <strong>Change passwords from a DIFFERENT device:</strong> Using a trusted second phone or computer, change your online banking and primary email passwords.
            </li>
            <li>
              <strong>Run a security scan:</strong> Use Google Play Protect or a reputable antivirus scanner to ensure no hidden keylogger remains.
            </li>
          </ol>
        </div>
      )}

      {/* CASE 5: I ONLY REPLIED */}
      {currentScenario === 'replied_only' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-2 text-xs sm:text-sm text-slate-800">
          <h4 className="font-bold text-emerald-950 text-base flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Low Danger — Contain the Communication
          </h4>
          <p className="text-slate-700 text-xs leading-relaxed">
            If you only answered the message without sending money, clicking strange links, or revealing passwords, your financial accounts are not compromised.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700 text-xs">
            <li>Block the phone number or sender account immediately.</li>
            <li>Mark the message as "Spam / Phishing" in WhatsApp or your SMS client.</li>
            <li>
              Be prepared for follow-up messages from alternate numbers. Scammers share lists of "responsive" phone numbers. Simply ignore and block.
            </li>
          </ul>
        </div>
      )}

      {/* CASE 6: NOTHING YET */}
      {currentScenario === 'nothing_yet' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h4 className="font-bold text-emerald-950 text-lg font-display">
            You made the right move by checking first!
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed">
            Scammers count on haste, panic, and pressure. Pausing to verify with SCAMCHECK AI stopped the scam in its tracks.
          </p>
          <div className="text-xs text-slate-500 pt-1">
            Tip: Delete and block the message to prevent accidental future clicks.
          </div>
        </div>
      )}
    </div>
  );
};
