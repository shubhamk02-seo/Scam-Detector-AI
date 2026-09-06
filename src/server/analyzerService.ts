import { GoogleGenAI, Type } from '@google/genai';

export interface AnalysisRequestPayload {
  type?: 'text' | 'url' | 'screenshot';
  text?: string;
  imageBase64?: string;
  mimeType?: string;
  language?: string;
}

export interface RedFlagItem {
  title: string;
  explanation: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  quote?: string;
}

export interface AnalysisResponseData {
  risk_score: number;
  risk_level: 'LOW_RISK' | 'CAUTION' | 'SUSPICIOUS' | 'HIGH_RISK';
  risk_label: string;
  category: string;
  category_name: string;
  summary: string;
  red_flags: RedFlagItem[];
  likely_goal: string;
  recommended_actions: string[];
  things_to_avoid: string[];
  verification_steps: string[];
  simple_explanation: string;
  hindi_summary?: string;
  hinglish_summary?: string;
  limitations: string;
}

// Fallback rule-based heuristic analyzer for offline resilience or missing key
export function analyzeFallback(content: string, type: 'text' | 'url' | 'screenshot' = 'text', _language: string = 'en'): AnalysisResponseData {
  const text = (content || '').toLowerCase();
  const redFlags: RedFlagItem[] = [];
  let score = 15; // baseline low risk
  let category = 'GENERAL_COMMUNICATION';
  let categoryName = 'General Communication';
  let likelyGoal = 'General communication or informational update.';

  // Heuristic pattern checks
  const hasUpfrontFee = text.includes('fee') || text.includes('charge') || text.includes('deposit') || text.includes('pay ₹') || text.includes('pay $') || text.includes('processing fee') || text.includes('registration fee');
  const hasPrize = text.includes('won') || text.includes('winner') || text.includes('lottery') || text.includes('crorepati') || text.includes('lucky draw') || text.includes('prize') || text.includes('reward points');
  const hasUrgency = text.includes('immediately') || text.includes('urgent') || text.includes('today only') || text.includes('blocked today') || text.includes('suspended') || text.includes('within 24 hours') || text.includes('9:30 pm') || text.includes('expire');
  const hasOtpOrPin = text.includes('otp') || text.includes('pin') || text.includes('cvv') || text.includes('password') || text.includes('passcode');
  const hasBankClaim = text.includes('sbi') || text.includes('hdfc') || text.includes('icici') || text.includes('bank') || text.includes('kyc') || text.includes('rbi') || text.includes('income tax');
  const hasRemoteApp = text.includes('anydesk') || text.includes('teamviewer') || text.includes('quicksupport') || text.includes('apk') || text.includes('install');
  const hasJobTask = text.includes('like youtube') || text.includes('work from home') || text.includes('earn ₹') || text.includes('part-time') || text.includes('daily income');
  const hasCrypto = text.includes('usdt') || text.includes('crypto') || text.includes('guaranteed 300%') || text.includes('arbitrage') || text.includes('binance');
  const hasDelivery = text.includes('parcel') || text.includes('courier') || text.includes('reschedule') || text.includes('indiapost') || text.includes('delivery');

  if (hasPrize && hasUpfrontFee) {
    score = 94;
    category = 'ADVANCE_FEE_PRIZE_SCAM';
    categoryName = 'Advance-Fee / Fake Prize Scam';
    likelyGoal = 'Convince you that you won a massive prize so you transfer an upfront processing or GST fee.';
    redFlags.push({
      title: 'Upfront Payment Required to Receive Prize',
      explanation: 'Legitimate lotteries and contests NEVER ask winners to pay fees, taxes, or deposits upfront to receive winnings.',
      severity: 'HIGH',
    });
    redFlags.push({
      title: 'Unexpected Reward Without Participation',
      explanation: 'You received a congratulatory prize notice without entering an official verified competition.',
      severity: 'HIGH',
    });
  } else if (hasBankClaim && (hasUrgency || text.includes('kyc') || text.includes('link'))) {
    score = 91;
    category = 'BANK_IMPERSONATION_PHISHING';
    categoryName = 'Bank Impersonation / KYC Phishing';
    likelyGoal = 'Panic you into clicking a phishing link to harvest your NetBanking passwords, Aadhaar, or card details.';
    redFlags.push({
      title: 'Threat of Immediate Account Suspension',
      explanation: 'Uses fear and urgency (account block/termination) to make you act before verifying with your bank.',
      severity: 'HIGH',
    });
    redFlags.push({
      title: 'Informal Verification Link',
      explanation: 'Official banks do not send generic SMS links to update KYC; KYC updates are done in branch or via secure official banking portals.',
      severity: 'HIGH',
    });
  } else if (hasJobTask && hasUpfrontFee) {
    score = 88;
    category = 'EMPLOYMENT_ADVANCE_FEE_SCAM';
    categoryName = 'Job / Work-from-Home Task Scam';
    likelyGoal = 'Lure you with effortless high earnings to extract registration deposits or prepaid task investments.';
    redFlags.push({
      title: 'Unrealistic Pay for Trivial Tasks',
      explanation: 'Offering thousands per day for simply liking videos or rating hotels is a trademark social-engineering hook.',
      severity: 'HIGH',
    });
    redFlags.push({
      title: 'Upfront Registration / Bond Fee',
      explanation: 'Legitimate employers never demand that candidates pay money to receive job tasks or employment portal IDs.',
      severity: 'HIGH',
    });
  } else if (hasDelivery) {
    score = 78;
    category = 'COURIER_DELIVERY_PHISHING';
    categoryName = 'Delivery / Courier Phishing Scam';
    likelyGoal = 'Use a tiny reschedule fee to lead you to a fraudulent payment portal that captures card details and OTPs.';
    redFlags.push({
      title: 'Fee Request for Address Update',
      explanation: 'National postal services and reputable couriers do not require a separate fee via SMS link to update street addresses.',
      severity: 'HIGH',
    });
  } else if (hasCrypto) {
    score = 92;
    category = 'CRYPTO_INVESTMENT_SCAM';
    categoryName = 'Cryptocurrency / Investment Scheme';
    likelyGoal = 'Entice you with guaranteed astronomical profits to deposit irreversible crypto tokens.';
    redFlags.push({
      title: 'Guaranteed Unrealistic Returns',
      explanation: 'No legal financial or crypto investment platform can guarantee 300% returns in 7 days without massive fraud risk.',
      severity: 'HIGH',
    });
  } else if (hasRemoteApp) {
    score = 95;
    category = 'TECH_SUPPORT_REMOTE_ACCESS';
    categoryName = 'Tech Support / Remote Access Scam';
    likelyGoal = 'Convince you to install screen-sharing software so the scammer can spy on your banking app and SMS OTPs.';
    redFlags.push({
      title: 'Request to Install Remote Desktop Software',
      explanation: 'Legitimate customer support will never ask you to install AnyDesk, TeamViewer, or QuickSupport to cancel a charge.',
      severity: 'HIGH',
    });
  } else if (hasOtpOrPin) {
    score = 89;
    category = 'CREDENTIAL_HARVESTING';
    categoryName = 'Credential & OTP Harvesting Attempt';
    likelyGoal = 'Steal your secret authorization code to take over accounts or initiate fund transfers.';
    redFlags.push({
      title: 'Request for Sensitive PIN / OTP',
      explanation: 'OTPs are strictly for authorizing transactions you initiate, never for receiving money or cancelling transactions.',
      severity: 'HIGH',
    });
  }

  if (hasUrgency && redFlags.length > 0) {
    redFlags.push({
      title: 'Artificial Time Pressure',
      explanation: 'The message pressures you to respond rapidly, a psychological tactic to prevent you from consulting others.',
      severity: 'MEDIUM',
    });
  }

  let riskLevel: 'LOW_RISK' | 'CAUTION' | 'SUSPICIOUS' | 'HIGH_RISK' = 'LOW_RISK';
  let riskLabel = 'Low risk based on provided information';

  if (score >= 76) {
    riskLevel = 'HIGH_RISK';
    riskLabel = 'Likely scam / strong signs of fraud';
  } else if (score >= 51) {
    riskLevel = 'SUSPICIOUS';
    riskLabel = 'Suspicious — verify before taking action';
  } else if (score >= 25) {
    riskLevel = 'CAUTION';
    riskLabel = 'Caution advised — verify details';
  }

  if (redFlags.length === 0) {
    redFlags.push({
      title: 'No Obvious Scam Signals Detected',
      explanation: 'The provided content does not exhibit common fraud indicators such as urgent demands, upfront fees, or credential requests.',
      severity: 'LOW',
    });
    likelyGoal = 'Appears to be standard communication, though vigilance is always advised.';
  }

  return {
    risk_score: score,
    risk_level: riskLevel,
    risk_label: riskLabel,
    category,
    category_name: categoryName,
    summary: score >= 70
      ? `This communication shows strong indicators of ${categoryName.toLowerCase()}. It employs characteristic pressure tactics and suspicious requests designed to mislead you.`
      : 'Based on the provided information, no immediate high-risk scam patterns were detected. However, always exercise care before clicking links or sharing details.',
    red_flags: redFlags,
    likely_goal: likelyGoal,
    recommended_actions: [
      'Do not transfer any requested money or fees.',
      'Never share OTPs, passwords, ATM PINs, or debit/credit card security numbers.',
      'Do not click embedded links or install suggested apps.',
      'Independently verify through the organization\'s official verified portal or phone number.',
      'If you have already sent money, contact your bank immediately to freeze the transaction.'
    ],
    things_to_avoid: [
      'Do not reply to the suspicious message or engage in conversation with the sender.',
      'Do not call phone numbers provided in the message.',
      'Do not click shortened or strange web addresses.',
      'Do not download attachments or remote access utilities.'
    ],
    verification_steps: [
      'Open your web browser and manually type the official website of the institution.',
      'Call the verified customer support number printed on the back of your bank card or on your physical utility bill.',
      'Ask a trusted tech-savvy family member or friend to inspect the message before taking action.'
    ],
    simple_explanation: score >= 70
      ? 'Someone is trying to trick you. They want you to panic or get excited so you send them money or secret codes. Do not do anything they ask. Keep your money and codes safe.'
      : 'This message does not appear to be dangerous right now, but always be careful before paying anyone or sharing information.',
    hindi_summary: score >= 70
      ? 'यह संदेश धोखाधड़ी (स्कैम) का प्रतीत होता है। इसमें आपको डराने या लालच देकर पैसे या गुप्त कोड (OTP) मांगने के संकेत हैं। कोई भुगतान न करें।'
      : 'इस संदेश में अभी कोई बड़ा खतरा नहीं दिखा है, फिर भी किसी अनजान को अपनी गुप्त जानकारी न दें।',
    hinglish_summary: score >= 70
      ? 'Yeh message clearly ek scam lag raha hai. Sender aapko rush ya lalach dekar paise ya OTP maangne ki koshish kar raha hai. Koi payment mat kijiye.'
      : 'Iss message mein filhal koi bada fraud signal nahi mila, par bina verify kiye kisi ko bhi paise ya OTP mat bhejna.',
    limitations: 'This assessment is based only on the information provided. AI detection is an evaluation, not legal proof. When money or identity is involved, always independently verify.',
  };
}

// Master analysis execution using Gemini AI with structured schema
export async function executeScamAnalysis(payload: AnalysisRequestPayload): Promise<AnalysisResponseData> {
  const { type = 'text', text = '', imageBase64 = '', mimeType = 'image/jpeg', language = 'en' } = payload;
  const apiKey = process.env.GEMINI_API_KEY;

  // Fallback if no API key is set
  if (!apiKey) {
    console.warn('[Analyzer] GEMINI_API_KEY not found in environment, falling back to heuristic engine.');
    return analyzeFallback(text, type, language);
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-scamcheck',
      },
    },
  });

  const systemPrompt = `You are SCAMCHECK AI, an expert cybersecurity and fraud awareness assistant.
Your goal is to help ordinary people identify suspicious messages, SMS, emails, job offers, investment pitches, websites, or screenshots, and teach them how to recognize the red flags.

CRITICAL PRODUCT PRINCIPLES:
1. NEVER present your assessment as absolute certainty. NEVER say "This is definitely a scam" or "This is 100% safe".
   Instead use nuanced, responsible phrasing:
   - High risk: "Likely scam / strong signs of fraud"
   - Moderate: "Suspicious — verify before taking action"
   - Caution: "Caution advised — some warning signs detected"
   - Low risk: "Low risk based on provided info, but independent verification is still recommended"
2. Tone: Calm, non-judgmental, educational, supportive, free of unnecessary hacker jargon.
3. Assess against 30 dimensions: Urgency, Fear/intimidation, Unexpected rewards, Upfront fees, OTP/password requests, Bank/Govt impersonation, Remote access (AnyDesk/TeamViewer), Unrealistic investment returns, Courier phishing, Typo-squatted domains, Fake customer support, QR code manipulation, Pressure to bypass normal processes, etc.
4. Output MUST be valid JSON adhering to the specified schema.
5. Provide simple_explanation suitable for elderly or non-tech users in everyday plain words.
6. Provide hindi_summary (in Devanagari Hindi) and hinglish_summary (conversational Romanized Hindi/English) so users across India and global diaspora can easily understand.`;

  let contentsPayload: any = '';

  if (type === 'screenshot') {
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');
    contentsPayload = {
      parts: [
        {
          inlineData: {
            data: cleanBase64,
            mimeType: mimeType || 'image/jpeg',
          },
        },
        {
          text: `Analyze this uploaded screenshot carefully. Extract visible text (OCR), analyze sender headers, interface layout, suspicious links, or payment prompts.\nUser context: ${text || 'None'}\nProvide your complete analysis in the required JSON format.`,
        },
      ],
    };
  } else if (type === 'url') {
    contentsPayload = `Inspect this suspicious link / website URL: "${text}".
Examine domain registration structure, typosquatting (e.g. sbi-kyc.co vs onlinesbi.sbi), deceptive TLDs (.xyz, .top, .tk), subdomains imitating major brands, IP address URLs, or phishing patterns.
Note: If unable to actively crawl live page, clearly explain: "I couldn't independently verify this website. Treat the link cautiously and verify it through the organization's official website."`;
  } else {
    contentsPayload = `Analyze this message / text for potential scam, phishing, or social engineering signals:\n\n"""\n${text}\n"""`;
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: contentsPayload,
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          risk_score: {
            type: Type.INTEGER,
            description: 'Risk score from 0 to 100 (0-20 low, 21-50 caution, 51-75 suspicious, 76-100 high risk)',
          },
          risk_level: {
            type: Type.STRING,
            description: 'Must be one of: LOW_RISK, CAUTION, SUSPICIOUS, HIGH_RISK',
          },
          risk_label: {
            type: Type.STRING,
            description: 'Human-friendly summary label e.g. "Likely scam / strong signs of fraud"',
          },
          category: {
            type: Type.STRING,
            description: 'Standard category code e.g. ADVANCE_FEE_SCAM, BANK_IMPERSONATION, PHISHING, JOB_SCAM, etc.',
          },
          category_name: {
            type: Type.STRING,
            description: 'Readable category title e.g. "Advance-Fee / Prize Scam"',
          },
          summary: {
            type: Type.STRING,
            description: '2 to 3 concise, calm sentences explaining the assessment.',
          },
          red_flags: {
            type: Type.ARRAY,
            description: 'List of specific warning signs detected',
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                explanation: { type: Type.STRING },
                severity: { type: Type.STRING, description: 'HIGH, MEDIUM, or LOW' },
                quote: { type: Type.STRING, description: 'Optional exact phrase from text that triggered this flag' },
              },
              required: ['title', 'explanation', 'severity'],
            },
          },
          likely_goal: {
            type: Type.STRING,
            description: 'What the scammer is likely trying to achieve in simple language.',
          },
          recommended_actions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: 'Concrete positive safety actions the user should take right now.',
          },
          things_to_avoid: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: 'Explicit list of what NOT to do (do not reply, do not pay, etc.).',
          },
          verification_steps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: 'Safe ways the user can independently verify through official channels.',
          },
          simple_explanation: {
            type: Type.STRING,
            description: 'Very simple, jargon-free explanation for elderly users or digital beginners.',
          },
          hindi_summary: {
            type: Type.STRING,
            description: 'Concise summary in Hindi (Devanagari script).',
          },
          hinglish_summary: {
            type: Type.STRING,
            description: 'Concise summary in conversational Hinglish.',
          },
          limitations: {
            type: Type.STRING,
            description: 'Disclaimer emphasizing that AI analysis is an assessment and not legal proof.',
          },
        },
        required: [
          'risk_score',
          'risk_level',
          'risk_label',
          'category',
          'category_name',
          'summary',
          'red_flags',
          'likely_goal',
          'recommended_actions',
          'things_to_avoid',
          'verification_steps',
          'simple_explanation',
          'limitations',
        ],
      },
    },
  });

  const rawJson = response.text ? response.text.trim() : '';
  if (!rawJson) {
    throw new Error('Empty response received from Gemini model');
  }

  return JSON.parse(rawJson) as AnalysisResponseData;
}
