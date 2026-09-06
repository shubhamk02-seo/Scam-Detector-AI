export type RiskLevel = 'LOW_RISK' | 'CAUTION' | 'SUSPICIOUS' | 'HIGH_RISK';

export type Severity = 'HIGH' | 'MEDIUM' | 'LOW';

export interface RedFlag {
  title: string;
  explanation: string;
  severity: Severity;
  quote?: string;
}

export interface ScamAnalysisResult {
  risk_score: number; // 0 - 100
  risk_level: RiskLevel;
  risk_label: string;
  category: string;
  category_name: string;
  summary: string;
  red_flags: RedFlag[];
  likely_goal: string;
  recommended_actions: string[];
  things_to_avoid: string[];
  verification_steps: string[];
  simple_explanation: string;
  hindi_summary?: string;
  hinglish_summary?: string;
  limitations: string;
  detected_entities?: {
    claimed_organization?: string;
    sender_info?: string;
    suspicious_links?: string[];
    monetary_amount_requested?: string;
    contact_methods?: string[];
  };
}

export interface SampleScenario {
  id: string;
  title: string;
  categoryName: string;
  type: 'text' | 'url';
  content: string;
  sourceType: 'WhatsApp' | 'SMS' | 'Email' | 'Job Portal' | 'Website' | 'Telegram';
  description: string;
  expectedRisk: RiskLevel;
}

export interface RedFlagGuideItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  whatItLooksLike: string;
  whyScammersUseIt: string;
  whatYouShouldDo: string;
  realisticExample: string;
}

export interface QuizScenario {
  id: string;
  title: string;
  sender: string;
  channel: string;
  message: string;
  isScam: boolean;
  verdict: 'SCAM' | 'LEGIT' | 'NEEDS_VERIFICATION';
  explanation: string;
  keyClues: string[];
  recommendedAction: string;
}

export interface SensitiveInfoDetection {
  hasSensitiveData: boolean;
  detectedTypes: string[];
  warningMessage: string;
}
