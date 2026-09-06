import { QuizScenario } from '../types';

export const QUIZ_SCENARIOS: QuizScenario[] = [
  {
    id: 'quiz-1',
    title: 'Electricity Bill Disconnection Warning',
    sender: '+91-9988112233 (Unknown Mobile)',
    channel: 'SMS Alert',
    message: 'Dear Consumer, Your electricity connection will be disconnected at 9:30 PM tonight from the state power board office because your previous month bill was not updated. Please immediately contact our power officer at 9845210987 to avoid black-out.',
    isScam: true,
    verdict: 'SCAM',
    explanation: 'State electricity boards send notices with your consumer number (CA number), never from random 10-digit personal mobile numbers. They never ask you to call an officer personal phone to pay.',
    keyClues: [
      'Sent from an ordinary personal mobile number (+91-99...) rather than an official registered header (e.g., AD-TNEB / VK-BESCOM).',
      'Uses extreme artificial urgency ("disconnected tonight at 9:30 PM") to cause panic.',
      'No consumer name, bill account number, or arrears breakdown provided.',
      'Directs you to call a personal mobile number instead of using the official utility portal or municipal office.'
    ],
    recommendedAction: 'Do not call the number. Check your electricity bill status via the official power corporation app or your municipal utility bill receipt.'
  },
  {
    id: 'quiz-2',
    title: 'Bank Debit Transaction Alert',
    sender: 'HDFCBK (Verified Sender Header)',
    channel: 'SMS Alert',
    message: 'Alert: INR 1,450.00 debited from A/C **4892 on 05-SEP-26 at ZOMATO BANGALORE. Avl Bal: INR 34,210.50. If not done by you, SMS BLOCK to 5676712 or call 1800-202-6161.',
    isScam: false,
    verdict: 'LEGIT',
    explanation: 'This is a standard transactional debit notification. It masks the account number (**4892), displays exact merchant details, provides the verified bank toll-free number, and crucially does NOT ask you to click an unverified link or send money.',
    keyClues: [
      'Sent from an official alphanumeric sender header (HDFCBK) registered with telecom providers.',
      'Partially masks sensitive account information (**4892).',
      'Does not include any clickable link or request for OTP/PIN.',
      'Toll-free number and shortcode match official bank published contact directories.'
    ],
    recommendedAction: 'Legitimate notification. If you didn’t make the transaction, call the official bank number on the back of your card to report unauthorized charges.'
  },
  {
    id: 'quiz-3',
    title: 'Customs Officer Parcel Confiscation',
    sender: '+91-7744110022 (WhatsApp Call/Chat)',
    channel: 'WhatsApp Message',
    message: 'Notice from Customs International Cargo, Mumbai Airport. A package sent in your name containing prohibited materials has been confiscated. To prevent the CBI / Narcotics bureau from issuing an FIR and arrest warrant, you must immediately connect to our officer via Skype/WhatsApp video call and pay a refundable clearance fee of ₹28,000.',
    isScam: true,
    verdict: 'SCAM',
    explanation: 'A classic "Digital Arrest / Fake Customs" extortion scam. Law enforcement and customs departments NEVER conduct investigations over WhatsApp or Skype, nor do they demand "refundable clearance fees" to drop charges.',
    keyClues: [
      'Claims law enforcement or customs is investigating you via WhatsApp chat/call.',
      'Threatens imminent arrest or FIR to trigger deep fear.',
      'Demands money transfer to settle legal or customs violations (illegal and fraudulent).',
      'No official legal summons, physical paperwork, or postal dispatch.'
    ],
    recommendedAction: 'Immediately block and report the contact. Never transfer money. Report this to cybercrime authorities (1930 in India).'
  },
  {
    id: 'quiz-4',
    title: 'Unsolicited Part-Time Rating Job',
    sender: '+62-812-990-1122 (International Number)',
    channel: 'Telegram / WhatsApp',
    message: 'Hi! You have been shortlisted by Google Maps Global Operations. Work 20 mins from home on your phone. Just give 5-star ratings to 3 hotels on Maps and earn ₹1,500 daily. Send "Interested" to receive your first task payout instantly to UPI.',
    isScam: true,
    verdict: 'SCAM',
    explanation: 'Unsolicited "Task / Review" fraud. They will pay you ₹150 for the first task to gain your confidence, then ask you to join a VIP Telegram group where you must deposit ₹10,000+ for "prepaid tasks" which you can never withdraw.',
    keyClues: [
      'Sent from an unknown international or virtual number with zero prior recruitment application.',
      'Offers unrealistic remuneration (₹1,500 for 20 minutes of trivial clicking).',
      'Promotes deceptive practices (paying for fake 5-star reviews on Google Maps).',
      'Leads to requests for upfront deposits or cryptocurrency transfers.'
    ],
    recommendedAction: 'Block the sender immediately. Legitimate companies never recruit or pay for fake consumer reviews.'
  },
  {
    id: 'quiz-5',
    title: 'E-commerce Security Code',
    sender: 'AMAZON',
    channel: 'SMS Alert',
    message: 'Your Amazon password reset code is: 820194. Do NOT share this code with anyone, including Amazon employees or customer support. If you did not request this, review your account security.',
    isScam: false,
    verdict: 'LEGIT',
    explanation: 'This is a genuine authentication message. It specifically instructs you NOT to share the code with anyone, contains no external links, and demands no payment or urgent reply.',
    keyClues: [
      'Standard short alphanumeric sender ID.',
      'Explicitly warns "Do NOT share this code with anyone".',
      'Does not contain any fishy link or demand to transfer funds.',
      'Informs user to check their own account security independently if not requested.'
    ],
    recommendedAction: 'Keep the code private. If you did not request a password reset, log into the official Amazon app directly and update your password.'
  },
  {
    id: 'quiz-6',
    title: 'Credit Card Reward Points Expiration',
    sender: '+91-9123456780',
    channel: 'SMS Alert',
    message: 'Dear Cardholder, Your 9,850 reward points worth ₹9,850 will expire at 11:59 PM today. Redeem immediately into your bank account as cash: http://rewardpoints-redemption-bank.top/cash',
    isScam: true,
    verdict: 'SCAM',
    explanation: 'Reward points phishing scam. Points rarely equal 1:1 rupee cash into a bank account, and legitimate redemption occurs inside your official banking portal, never on a shady `.top` domain.',
    keyClues: [
      'Suspicious, unofficial URL extension (`.top` domain rather than official bank domain).',
      'Urgency gimmick ("expires 11:59 PM today").',
      'Offers 1 point = 1 rupee cash transfer (standard bank points have much lower redemption value).',
      'The link will prompt for your 16-digit card number, CVV, and OTP.'
    ],
    recommendedAction: 'Never click the link. If you want to check your reward points, log in through your official banking app.'
  }
];
