import { SensitiveInfoDetection } from '../types';

export function detectSensitiveInformation(input: string): SensitiveInfoDetection {
  if (!input || typeof input !== 'string') {
    return { hasSensitiveData: false, detectedTypes: [], warningMessage: '' };
  }

  const detected: string[] = [];

  // Detect 16-digit card numbers (standard Luhn-like or 4x4 blocks)
  const cardRegex = /\b(?:\d{4}[ -]?){3}\d{4}\b|\b\d{15,16}\b/;
  if (cardRegex.test(input)) {
    detected.push('Potential Payment Card Number');
  }

  // Detect explicit OTP / Security code patterns
  const otpPattern = /(?:otp|code|pin|cvv|password|passcode)\s*(?:is|:|=|-)?\s*([0-9]{4,8})/i;
  if (otpPattern.test(input)) {
    detected.push('Explicit Security PIN / OTP / Password');
  }

  // Detect 12-digit Indian Aadhaar patterns
  const aadhaarRegex = /\b\d{4}\s\d{4}\s\d{4}\b/;
  if (aadhaarRegex.test(input)) {
    detected.push('Potential National ID / Aadhaar Number');
  }

  const hasSensitiveData = detected.length > 0;
  let warningMessage = '';

  if (hasSensitiveData) {
    warningMessage = `We detected what looks like sensitive personal information (${detected.join(', ')}). For your safety, please remove real financial credentials, passwords, or live OTPs before submitting.`;
  }

  return {
    hasSensitiveData,
    detectedTypes: detected,
    warningMessage,
  };
}

export function sanitizeRedactInput(input: string): string {
  let sanitized = input;
  // Redact 16-digit card numbers
  sanitized = sanitized.replace(/\b(?:\d{4}[ -]?){3}\d{4}\b/g, '[REDACTED_CARD_NUMBER]');
  // Redact OTP/PIN codes
  sanitized = sanitized.replace(/(otp|code|pin|cvv)\s*(?:is|:|=|-)?\s*([0-9]{3,8})/gi, '$1: [REDACTED_CODE]');
  // Redact 12-digit national ID
  sanitized = sanitized.replace(/\b\d{4}\s\d{4}\s\d{4}\b/g, '[REDACTED_ID]');
  return sanitized;
}
