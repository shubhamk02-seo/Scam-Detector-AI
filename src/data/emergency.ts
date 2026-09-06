export interface EmergencyResource {
  countryCode: string;
  countryName: string;
  flag: string;
  hotline?: string;
  hotlineDescription?: string;
  officialPortals: Array<{
    name: string;
    organization: string;
    url: string;
    description: string;
  }>;
  bankActionChecklist: string[];
}

export const EMERGENCY_RESOURCES: Record<string, EmergencyResource> = {
  IN: {
    countryCode: 'IN',
    countryName: 'India',
    flag: '🇮🇳',
    hotline: '1930',
    hotlineDescription: 'National Cyber Crime Reporting Helpline (Toll-Free, 24/7)',
    officialPortals: [
      {
        name: 'National Cyber Crime Reporting Portal',
        organization: 'Ministry of Home Affairs (MHA)',
        url: 'https://cybercrime.gov.in',
        description: 'Official Government of India portal to report cyber financial fraud and online harassment.',
      },
      {
        name: 'Chakshu Portal (Sanchar Saathi)',
        organization: 'Department of Telecommunications (DoT)',
        url: 'https://sancharsaathi.gov.in',
        description: 'Official portal to report suspected fraud SMS, WhatsApp messages, and fake caller numbers.',
      },
      {
        name: 'RBI Sachet Portal',
        organization: 'Reserve Bank of India',
        url: 'https://sachet.rbi.org.in',
        description: 'Official portal to check and lodge complaints against illegal deposit schemes and unregistered loan apps.',
      }
    ],
    bankActionChecklist: [
      'Call your bank\'s official customer support number (from the back of your card) immediately to freeze your card, NetBanking, or UPI ID.',
      'Call 1930 within the "Golden Hour" (first 2-3 hours) so nodal cyber police officers can flag and block the fraudulent beneficiary account.',
      'Note down the UTR number, UPI transaction ID, date, time, and recipient account/VPA.',
      'Never send additional money to anyone claiming they can "hack and recover" your stolen funds.'
    ]
  },
  US: {
    countryCode: 'US',
    countryName: 'United States',
    flag: '🇺🇸',
    hotline: '1-877-382-4357',
    hotlineDescription: 'FTC Fraud Helpline',
    officialPortals: [
      {
        name: 'ReportFraud.ftc.gov',
        organization: 'Federal Trade Commission (FTC)',
        url: 'https://reportfraud.ftc.gov',
        description: 'Official US government website where you can report scams and bad business practices.',
      },
      {
        name: 'Internet Crime Complaint Center (IC3)',
        organization: 'FBI',
        url: 'https://www.ic3.gov',
        description: 'Official FBI division handling internet-facilitated cyber scams and wire fraud.',
      }
    ],
    bankActionChecklist: [
      'Contact your bank or credit card fraud division immediately to freeze compromised accounts.',
      'File a complaint with the FTC at ReportFraud.ftc.gov and keep your confirmation number.',
      'Place a fraud alert or credit freeze with the major credit bureaus (Equifax, Experian, TransUnion).'
    ]
  },
  UK: {
    countryCode: 'UK',
    countryName: 'United Kingdom',
    flag: '🇬🇧',
    hotline: '0300 123 2040',
    hotlineDescription: 'Action Fraud Police Helpline',
    officialPortals: [
      {
        name: 'Action Fraud',
        organization: 'City of London Police',
        url: 'https://www.actionfraud.police.uk',
        description: 'UK national reporting centre for fraud and cybercrime.',
      },
      {
        name: 'National Cyber Security Centre (NCSC)',
        organization: 'GCHQ / NCSC',
        url: 'https://www.ncsc.gov.uk/section/about-ncsc/report-an-incident',
        description: 'Official guidance on reporting phishing emails (report@phishing.gov.uk) and text messages (7726).',
      }
    ],
    bankActionChecklist: [
      'Call your bank immediately by dialling 159 (UK Stop Scams telephone service supported by major UK banks).',
      'Report suspicious text messages by forwarding them to 7726 (free of charge).',
      'Register with Action Fraud to receive a police crime reference number.'
    ]
  },
  OTHER: {
    countryCode: 'OTHER',
    countryName: 'International / Other Countries',
    flag: '🌐',
    hotlineDescription: 'Contact your bank\'s 24/7 fraud department',
    officialPortals: [
      {
        name: 'Global Anti-Scam Resources',
        organization: 'Interpol Cybercrime Division',
        url: 'https://www.interpol.int/Crimes/Cybercrime',
        description: 'International law enforcement resources and cyber safety awareness guidelines.',
      }
    ],
    bankActionChecklist: [
      'Contact the bank or financial institution that issued your payment card or account immediately.',
      'Notify local police or your national cybersecurity incident reporting center.',
      'Change passwords for your online banking and email accounts using a secure device.'
    ]
  }
};
