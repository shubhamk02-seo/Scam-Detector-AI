import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Image as ImageIcon,
  Link2,
  Sparkles,
  AlertTriangle,
  Upload,
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { SAMPLE_SCAMS } from '../data/samples';
import { detectSensitiveInformation, sanitizeRedactInput } from '../utils/privacy';
import { SampleScenario } from '../types';

interface AnalyzerInputProps {
  onAnalyze: (payload: {
    type: 'text' | 'screenshot' | 'url';
    text?: string;
    imageBase64?: string;
    mimeType?: string;
  }) => void;
  isLoading: boolean;
}

export const AnalyzerInput: React.FC<AnalyzerInputProps> = ({ onAnalyze, isLoading }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'screenshot' | 'url'>('text');
  const [textInput, setTextInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [screenshotBase64, setScreenshotBase64] = useState<string | null>(null);
  const [screenshotMime, setScreenshotMime] = useState<string>('image/jpeg');
  const [screenshotName, setScreenshotName] = useState<string>('');
  const [screenshotSize, setScreenshotSize] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [activeSampleId, setActiveSampleId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sensitive info detection on current text
  const currentContent = activeTab === 'text' ? textInput : activeTab === 'url' ? urlInput : '';
  const sensitiveCheck = detectSensitiveInformation(currentContent);

  const handleApplySample = (sample: SampleScenario) => {
    setActiveSampleId(sample.id);
    if (sample.type === 'url') {
      setActiveTab('url');
      setUrlInput(sample.content);
    } else {
      setActiveTab('text');
      setTextInput(sample.content);
    }
  };

  const handleFileProcess = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WEBP, or screenshot).');
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      alert('Image file is too large. Please select an image under 12MB.');
      return;
    }

    setScreenshotName(file.name);
    setScreenshotSize(file.size);
    setScreenshotMime(file.type);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setScreenshotBase64(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleRedact = () => {
    if (activeTab === 'text') {
      setTextInput(sanitizeRedactInput(textInput));
    }
  };

  const handleClear = () => {
    setTextInput('');
    setUrlInput('');
    setScreenshotBase64(null);
    setScreenshotName('');
    setActiveSampleId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (activeTab === 'text') {
      if (!textInput.trim()) return;
      onAnalyze({
        type: 'text',
        text: textInput.trim(),
      });
    } else if (activeTab === 'screenshot') {
      if (!screenshotBase64) return;
      onAnalyze({
        type: 'screenshot',
        imageBase64: screenshotBase64,
        mimeType: screenshotMime,
        text: textInput.trim() || undefined,
      });
    } else if (activeTab === 'url') {
      if (!urlInput.trim()) return;
      onAnalyze({
        type: 'url',
        text: urlInput.trim(),
      });
    }
  };

  const canSubmit =
    (activeTab === 'text' && textInput.trim().length > 0) ||
    (activeTab === 'screenshot' && screenshotBase64 !== null) ||
    (activeTab === 'url' && urlInput.trim().length > 0);

  return (
    <div id="analyzer-input-card" className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Tab Selector */}
      <div className="flex border-b border-slate-200 bg-slate-50/80 p-1.5 gap-1.5">
        <button
          type="button"
          id="tab-paste-message"
          onClick={() => setActiveTab('text')}
          className={`flex-1 py-3 px-4 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'text'
              ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-indigo-600" />
          <span>Paste Message</span>
        </button>

        <button
          type="button"
          id="tab-upload-screenshot"
          onClick={() => setActiveTab('screenshot')}
          className={`flex-1 py-3 px-4 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'screenshot'
              ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ImageIcon className="w-4 h-4 text-indigo-600" />
          <span>Upload Screenshot</span>
        </button>

        <button
          type="button"
          id="tab-check-link"
          onClick={() => setActiveTab('url')}
          className={`flex-1 py-3 px-4 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'url'
              ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Link2 className="w-4 h-4 text-indigo-600" />
          <span>Check a Link</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-5">
        {/* Sensitive Information Alert */}
        {sensitiveCheck.hasSensitiveData && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Privacy Reminder:</span> {sensitiveCheck.warningMessage}
              </div>
            </div>
            <button
              type="button"
              onClick={handleRedact}
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium whitespace-nowrap transition-colors"
            >
              Auto-Mask Credentials
            </button>
          </div>
        )}

        {/* Tab 1: Text Input */}
        {activeTab === 'text' && (
          <div className="space-y-2">
            <div className="relative">
              <textarea
                id="message-textarea"
                rows={5}
                value={textInput}
                onChange={(e) => {
                  setTextInput(e.target.value);
                  if (activeSampleId) setActiveSampleId(null);
                }}
                placeholder="Paste the suspicious WhatsApp text, SMS alert, email body, job offer, or prize announcement here...&#10;&#10;Example: 'Congratulations! You have won ₹25,00,000. Pay ₹12,500 processing fees to claim your prize.'"
                className="w-full rounded-xl border border-slate-300 p-4 text-sm sm:text-base text-slate-800 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all resize-none placeholder:text-slate-400 leading-relaxed font-sans shadow-2xs"
              />
              {textInput && (
                <button
                  type="button"
                  onClick={() => setTextInput('')}
                  className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
                  title="Clear text"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>Never paste passwords, real card numbers, or live OTPs.</span>
              <span>{textInput.length} characters</span>
            </div>
          </div>
        )}

        {/* Tab 2: Screenshot Upload */}
        {activeTab === 'screenshot' && (
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileProcess(e.target.files[0]);
                }
              }}
            />

            {!screenshotBase64 ? (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-3 ${
                  isDragging
                    ? 'border-indigo-600 bg-indigo-50/50'
                    : 'border-slate-300 hover:border-indigo-400 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-xs">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Click to upload or drag and drop screenshot
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    WhatsApp chat, SMS, Email, Payment request, Job DM, or Website screenshot (PNG, JPG up to 12MB)
                  </p>
                </div>
              </div>
            ) : (
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/60 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0 border border-slate-300">
                  <img
                    src={screenshotBase64}
                    alt="Screenshot preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" /> Ready for multimodal vision inspection
                  </div>
                  <p className="text-sm font-bold text-slate-800 truncate mt-1">{screenshotName}</p>
                  <p className="text-xs text-slate-500">
                    {(screenshotSize / (1024 * 1024)).toFixed(2)} MB • AI will extract text, examine UI & detect fraud cues
                  </p>
                  <div className="mt-2 flex items-center justify-center sm:justify-start gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
                    >
                      Change screenshot
                    </button>
                    <span className="text-slate-300">•</span>
                    <button
                      type="button"
                      onClick={() => {
                        setScreenshotBase64(null);
                        setScreenshotName('');
                      }}
                      className="text-xs font-medium text-red-600 hover:text-red-800 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Optional context note with screenshot */}
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Optional: Add a brief note (e.g. 'Received on WhatsApp from unknown number claiming to be DHL')"
              className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:border-indigo-600"
            />
          </div>
        )}

        {/* Tab 3: URL Check */}
        {activeTab === 'url' && (
          <div className="space-y-3">
            <div className="relative">
              <input
                id="url-input"
                type="text"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  if (activeSampleId) setActiveSampleId(null);
                }}
                placeholder="https://example-kyc-update.com/login.php"
                className="w-full rounded-xl border border-slate-300 p-4 text-sm text-slate-800 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all placeholder:text-slate-400 font-mono"
              />
              {urlInput && (
                <button
                  type="button"
                  onClick={() => setUrlInput('')}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
                  title="Clear link"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>URL Inspection:</strong> AI inspects domain structure, typosquatting, deceptive subdomains, and known phishing patterns. Never click unverified links directly.
              </span>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Submissions are analyzed in-memory. Your analysis is not permanently saved.</span>
          </div>

          <div className="flex items-center gap-2.5">
            {(textInput || urlInput || screenshotBase64) && (
              <button
                type="button"
                id="btn-clear-input"
                onClick={handleClear}
                disabled={isLoading}
                className="px-4 py-3 rounded-lg text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200 cursor-pointer"
              >
                Clear
              </button>
            )}

            <button
              type="submit"
              id="btn-analyze-submit"
              disabled={!canSubmit || isLoading}
              className={`px-7 sm:px-8 py-3.5 rounded-lg text-sm sm:text-base font-bold text-white transition-all flex items-center justify-center gap-2 cursor-pointer ${
                !canSubmit || isLoading
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-100'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Analyzing Threat Signals...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {activeTab === 'screenshot'
                      ? 'Analyze Screenshot'
                      : activeTab === 'url'
                      ? 'Verify URL'
                      : 'Verify Now'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Try a Sample Scam quick selector */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Try a Sample Scam (One-Click Demo)
            </span>
            <span className="text-[11px] text-slate-400 font-medium">Pre-loaded scenarios</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {SAMPLE_SCAMS.map((sample) => {
              const isSelected = activeSampleId === sample.id;
              return (
                <button
                  key={sample.id}
                  type="button"
                  id={`sample-btn-${sample.id}`}
                  onClick={() => handleApplySample(sample)}
                  className={`flex-shrink-0 text-xs px-3.5 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="opacity-75 mr-1.5">
                    {sample.sourceType === 'WhatsApp' ? '💬' : sample.sourceType === 'SMS' ? '📱' : '✉️'}
                  </span>
                  {sample.title}
                </button>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
};
