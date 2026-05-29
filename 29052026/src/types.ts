/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Temple {
  id: string;
  name: string;
  location: string;
  history: string;
  needs: string[];
  status: 'Urgent' | 'Active Support' | 'Completed';
  targetAmount?: number;
  raisedAmount?: number;
}

export interface Initiative {
  id: string;
  title: string;
  category: 'Temple Support' | 'Community Welfare' | 'Cultural & Education';
  description: string;
  impact: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Professor' | 'Temples' | 'Welfare' | 'Events';
  image: string;
  description: string;
}

export interface DonationDetails {
  donorName: string;
  email: string;
  phone: string;
  panNumber: string; // Crucial for 80G tax benefit calculation and compliance
  address: string;
  nationality: 'Indian' | 'Foreign'; // Crucial for FCRA compliance check
  amount: number;
  paymentMode: 'Net Banking' | 'UPI' | 'Card' | 'Direct Bank Transfer';
  specificCause: string;
  isAnonymous: boolean;
}

export interface DonationReceipt {
  receiptNo: string;
  date: string;
  donorName: string;
  email: string;
  phone: string;
  panNumber: string;
  amount: number;
  paymentMode: string;
  specificCause: string;
  taxBenefits80GId: string;
  fcraRegId: string;
  certificate80GEligible: boolean;
  trustRegNo: string;
}

export interface ContactInquiry {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timestamp: string;
}
