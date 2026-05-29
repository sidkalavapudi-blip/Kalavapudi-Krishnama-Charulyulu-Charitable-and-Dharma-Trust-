/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShieldCheck, HeartHandshake, Landmark, FileText, CheckCircle, Flame, DollarSign, RefreshCw, Printer, Info, ExternalLink } from 'lucide-react';
import { TRUST_META, SUPPORTED_TEMPLES } from '../data';
import { DonationDetails, DonationReceipt } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface DonationFormProps {
  selectedTempleFromCard: string;
  setSelectedTempleFromCard: (name: string) => void;
}

export default function DonationForm({ selectedTempleFromCard, setSelectedTempleFromCard }: DonationFormProps) {
  // Input fields state
  const [formData, setFormData] = useState<DonationDetails>({
    donorName: '',
    email: '',
    phone: '',
    panNumber: '',
    address: '',
    nationality: 'Indian',
    amount: '' as any,
    paymentMode: '' as any,
    specificCause: '',
    isAnonymous: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState<string>('');
  const [completedReceipt, setCompletedReceipt] = useState<DonationReceipt | null>(null);

  // Sync selected temple from external Card clicks
  useEffect(() => {
    if (selectedTempleFromCard) {
      setFormData(prev => ({
        ...prev,
        specificCause: `Renovation of ${selectedTempleFromCard}`
      }));
    }
  }, [selectedTempleFromCard]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Clean specific error on edit
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleAmountSelect = (val: number) => {
    setFormData(prev => ({ ...prev, amount: val }));
  };

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.donorName.trim()) tempErrors.donorName = "Donor Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Please specify a valid email address";
    if (!formData.phone.trim() || formData.phone.length < 10) tempErrors.phone = "Provide a valid 10-digit telephone number";
    
    // PAN card code is Indian tax compliance standard
    if (formData.nationality === 'Indian') {
      const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/i;
      if (!formData.panNumber.trim()) {
        tempErrors.panNumber = "Permanent Account Number (PAN) is required for 80G tax exemption benefits";
      } else if (!panRegex.test(formData.panNumber.trim())) {
        tempErrors.panNumber = "PAN format should match standard Indian structure (e.g., ABCDE1234F)";
      }
    }

    if (!formData.address.trim()) tempErrors.address = "Address is required for audit trails and physical copy posting";
    if (!formData.amount || formData.amount <= 0) {
      tempErrors.amount = "Donation amount must be greater than 0";
    }
    if (!formData.specificCause) {
      tempErrors.specificCause = "Please select a specific cause for your contribution";
    }
    if (!formData.paymentMode) {
      tempErrors.paymentMode = "Please select a payment gateway service";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmitDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStep('Initiating Secure SSL encrypted channel...');
    
    // PG Simulation steps
    setTimeout(() => {
      setSubmitStep('Generating bank authorization token...');
      setTimeout(() => {
        setSubmitStep('Routing funds to Kalavapudi Memorial Charitable and Dharma Trust central ledger...');
        setTimeout(() => {
          setSubmitStep('Generating official 80G tax compliant receipt...');
          setTimeout(() => {
            // Success creation of Receipt
            const receiptNo = `KKMT/2026-27/REC-${Math.floor(100000 + Math.random() * 900000)}`;
            const today = new Date().toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            });

            const newReceipt: DonationReceipt = {
              receiptNo,
              date: today,
              donorName: formData.isAnonymous ? "ANONYMOUS DEVOTEE" : formData.donorName,
              email: formData.email,
              phone: formData.phone,
              panNumber: formData.nationality === 'Indian' ? formData.panNumber.toUpperCase() : 'FCRA-NON-PAN',
              amount: formData.amount,
              paymentMode: formData.paymentMode,
              specificCause: formData.specificCause,
              taxBenefits80GId: TRUST_META.taxCode80G,
              fcraRegId: TRUST_META.fcraRegNo,
              certificate80GEligible: formData.nationality === 'Indian',
              trustRegNo: TRUST_META.regNo
            };

            setCompletedReceipt(newReceipt);
            setIsSubmitting(false);
            setSubmitStep('');
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1200);
  };

  const resetForm = () => {
    setCompletedReceipt(null);
    setFormData({
      donorName: '',
      email: '',
      phone: '',
      panNumber: '',
      address: '',
      nationality: 'Indian',
      amount: '' as any,
      paymentMode: '' as any,
      specificCause: '',
      isAnonymous: false
    });
    setSelectedTempleFromCard('');
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <section id="donate" className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="donate_header">
          {/* Pulsing Under Construction status */}
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/80 px-4 py-1.5 rounded-full mb-4 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
            </span>
            <span className="text-[10px] text-amber-900 font-bold uppercase tracking-wider">Donations System Under Construction</span>
          </div>

          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block mb-1">
            Contributions Workspace
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-amber-950 tracking-wide">
            Secure Foundation Contributions
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Support rural reconstruction and priest welfare. Main banking rails and direct gateways are currently in the compliance setup phase. The donation desk features a complete simulator below for audit preview.
          </p>
        </div>

        {/* Bank Details Panel (Static) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-12 bg-amber-50 rounded-2xl p-6 sm:p-8 border border-amber-200/50 shadow-sm" id="trustee_accounts_card">
            <div className="flex items-center space-x-2.5 mb-6">
              <Landmark className="w-5 h-5 text-orange-600" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-950 tracking-wide">
                Direct Bank Transfer & Wire details
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Indian Account */}
              <div className="bg-white p-6 rounded-xl border border-amber-100 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4 gap-2">
                    <div className="inline-flex items-center space-x-1.5 text-[10px] bg-amber-100 text-amber-800 font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                      <span>Indian Nationals (INR)</span>
                    </div>
                    <span className="text-[10px] bg-amber-50 text-amber-600 font-bold border border-amber-200 uppercase tracking-wider px-2.5 py-1 rounded-md shrink-0">
                      Work In Progress
                    </span>
                  </div>
                  <h4 className="font-bold text-amber-950 text-sm mb-3 font-sans">
                    Direct Bank Transfer Integration
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    The registration and automated ledger linkage with our clearing bank is currently being finalized. Direct transfer details will be updated here shortly as soon as verification completes.
                  </p>
                  <ul className="space-y-2.5 text-xs text-stone-600 font-mono">
                    <li className="flex justify-between border-b border-stone-100 pb-1.5">
                      <span className="font-sans text-stone-400">Registration Status:</span>
                      <span className="font-sans font-semibold text-right text-amber-700">Bank Audit Pending</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-sans text-stone-400">80G Validation:</span>
                      <span className="font-sans font-semibold text-right text-stone-500">In Progress</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 bg-amber-50/50 p-2.5 rounded-lg border border-amber-100 text-[10px] text-amber-900 flex items-start">
                  <Info className="w-3.5 h-3.5 mr-1.5 shrink-0 text-orange-500 mt-0.5" />
                  <span>Please use our secure online contribution portal below to donate via UPI or Card in the interim.</span>
                </div>
              </div>

              {/* FCRA Global Funds Account */}
              <div className="bg-white p-6 rounded-xl border border-blue-100 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4 gap-2">
                    <div className="inline-flex items-center space-x-1.5 text-[10px] bg-blue-50 text-blue-800 font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-blue-100">
                      <span>FCRA Foreign Remittance Account</span>
                    </div>
                    <span className="text-[10px] bg-blue-50/50 text-blue-600 font-bold border border-blue-200 uppercase tracking-wider px-2.5 py-1 rounded-md shrink-0">
                      Work In Progress
                    </span>
                  </div>
                  <h4 className="font-bold text-amber-950 text-sm mb-3 font-sans">
                    FCRA Central Bank Routing Hub
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    Establishment of our dedicated SBI New Delhi Main Branch FCRA clearance routing account is in progress. International wire credentials will be listed upon statutory approval activation.
                  </p>
                  <ul className="space-y-2.5 text-xs text-stone-600 font-mono">
                    <li className="flex justify-between border-b border-stone-100 pb-1.5">
                      <span className="font-sans text-stone-400">FCRA Compliance:</span>
                      <span className="font-sans font-semibold text-right text-blue-700">Application Under Review</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-sans text-stone-400">Central Bank Hub:</span>
                      <span className="font-sans font-semibold text-right text-stone-500">Awaiting Node Setup</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 bg-blue-50/50 p-2.5 rounded-lg border border-blue-100 text-[10px] text-blue-900 flex items-start">
                  <Info className="w-3.5 h-3.5 mr-1.5 shrink-0 text-blue-500 mt-0.5" />
                  <span>Our online donation gateway supports global international credit cards for overseas devotees.</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Dynamic Payment Gate Panel and Interactive Receipt display */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Donation Input Panel LHS */}
          <div className="w-full lg:w-7/12 bg-white rounded-2xl border border-amber-100 shadow-xl p-6 sm:p-8" id="donations_input_wrapper">
            <h3 className="font-serif text-lg sm:text-2xl font-bold text-amber-950 mb-6 pb-3 border-b border-stone-100 flex items-center space-x-2">
              <HeartHandshake className="w-6 h-6 text-orange-600" />
              <span>Sponsor Securely Portal</span>
            </h3>

            {completedReceipt ? (
              /* Success Panel */
              <div className="text-center py-6" id="donation_completed_portal">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-amber-950 mb-2">
                  Contribution Verified!
                </h4>
                <p className="text-stone-600 text-sm max-w-md mx-auto mb-6">
                  Thank you immensely. Your transaction was finalized securely. Your digital receipt is visual on the right panel. Please view, print or save for tax compliance archiving.
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handlePrintReceipt}
                    className="px-4 py-2.5 bg-amber-900 hover:bg-amber-950 text-white rounded-lg font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Bill Receipt</span>
                  </button>
                  <button
                    onClick={resetForm}
                    className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Donate Again</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Form input fields */
              <form onSubmit={handleSubmitDonation} className="space-y-6">
                
                {/* Mode Selectors toggle (Indian vs Foreign) */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, nationality: 'Indian' }))}
                    className={`py-3 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-center ${
                      formData.nationality === 'Indian'
                        ? 'bg-amber-950 border-amber-950 text-white shadow'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    🇮🇳 Indian Citizen (INR)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, nationality: 'Foreign' }))}
                    className={`py-3 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-center ${
                      formData.nationality === 'Foreign'
                        ? 'bg-amber-950 border-amber-950 text-white shadow'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    🌐 Global Citizen (FCRA)
                  </button>
                </div>

                {/* Amount section */}
                <div>
                  <label className="text-xs font-bold text-amber-950 block mb-2 uppercase tracking-wide">
                    Contribution Amount (₹ INR Equivalent)
                  </label>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {[2000, 5000, 10000, 25000].map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => handleAmountSelect(amt)}
                        className={`py-2 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                          formData.amount === amt
                            ? 'bg-gradient-to-r from-orange-600 to-amber-500 border-orange-500 text-white'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-amber-300'
                        }`}
                      >
                        ₹{amt.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500 font-bold text-sm">₹</span>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount || ''}
                      onChange={handleInputChange}
                      placeholder="Specify custom amount"
                      className="w-full pl-8 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-amber-950 font-bold focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  {errors.amount && <span className="text-[10px] text-rose-600 font-bold mt-1 block">{errors.amount}</span>}
                </div>

                {/* Donor Name & Nationality parameters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-amber-955 block mb-1 uppercase tracking-wider">Donor Full Name <span className="text-red-500 font-sans">*</span></label>
                    <input
                      type="text"
                      name="donorName"
                      value={formData.donorName}
                      onChange={handleInputChange}
                      placeholder="Siddharth Kalavapudi"
                      className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-orange-500 text-stone-900"
                    />
                    {errors.donorName && <span className="text-[10px] text-rose-600 font-bold mt-1 block">{errors.donorName}</span>}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-amber-955 block mb-1 uppercase tracking-wider">Permanent PAN Code (80G standard) <span className="text-red-500 font-sans">*</span></label>
                    <input
                      type="text"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleInputChange}
                      disabled={formData.nationality === 'Foreign'}
                      placeholder={formData.nationality === 'Foreign' ? "FCRA Exempted" : "ABCDE1234F"}
                      className={`w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-orange-500 uppercase text-stone-900 ${formData.nationality === 'Foreign' && 'opacity-60 cursor-not-allowed'}`}
                    />
                    {errors.panNumber && <span className="text-[10px] text-rose-600 font-bold mt-1 block">{errors.panNumber}</span>}
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-amber-955 block mb-1 uppercase tracking-wider">Active Email Address <span className="text-red-500 font-sans">*</span></label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="mohsiddiq1987@gmail.com"
                      className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-orange-500 text-stone-900"
                    />
                    {errors.email && <span className="text-[10px] text-rose-600 font-bold mt-1 block">{errors.email}</span>}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-amber-955 block mb-1 uppercase tracking-wider">WhatsApp Telephone Number <span className="text-red-500 font-sans">*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 94458 10899"
                      className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-orange-500 text-stone-900"
                    />
                    {errors.phone && <span className="text-[10px] text-rose-600 font-bold mt-1 block">{errors.phone}</span>}
                  </div>
                </div>

                {/* Main Physical Address */}
                <div>
                  <label className="text-xs font-bold text-amber-955 block mb-1 uppercase tracking-wider">Donor Mailing Address <span className="text-red-500 font-sans">*</span></label>
                  <textarea
                    rows={2}
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Provide full correspondence address for audit compliance verification"
                    className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-orange-500 text-stone-900"
                  />
                  {errors.address && <span className="text-[10px] text-rose-600 font-bold mt-1 block">{errors.address}</span>}
                </div>

                {/* Specific Temple Specific Cause Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-amber-955 block mb-1 uppercase tracking-wider">Donation Directed Toward <span className="text-red-500 font-sans">*</span></label>
                    <select
                      name="specificCause"
                      value={formData.specificCause}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-bold text-amber-950 focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    >
                      <option value="">-- Choose Cause --</option>
                      <option value="General Temple Restoration">General Temple Restoration Desk</option>
                      <option value="Nitya Annadanam (Daily Meals)">Nitya Annadanam (Daily Meals) Fund host</option>
                      <option value="Vedic Vidyadana Educational scholarships">Vedic Vidyadana (Vedic/Sanskrit Education)</option>
                      {SUPPORTED_TEMPLES.map(temp => (
                        <option key={temp.id} value={`Renovation of ${temp.name}`}>Support: {temp.name}</option>
                      ))}
                    </select>
                    {errors.specificCause && <span className="text-[10px] text-rose-600 font-bold mt-1 block">{errors.specificCause}</span>}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-amber-955 block mb-1 uppercase tracking-wider">Payment Gateway Service <span className="text-red-500 font-sans">*</span></label>
                    <select
                      name="paymentMode"
                      value={formData.paymentMode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-bold text-stone-900 focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    >
                      <option value="">-- Choose Payment Mode --</option>
                      <option value="UPI">UPI (GooglePay / PhonePe / Paytm)</option>
                      <option value="Net Banking">Indian Netbanking Transfer</option>
                      <option value="Card">Visa / MasterCard / Rupay Gateways</option>
                      <option value="Direct Bank Transfer">Overseas Direct Wire Transfer</option>
                    </select>
                    {errors.paymentMode && <span className="text-[10px] text-rose-600 font-bold mt-1 block">{errors.paymentMode}</span>}
                  </div>
                </div>

                {/* Is Anonymous Checkbox */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="isAnonymous"
                    id="isAnonymous"
                    checked={formData.isAnonymous}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-stone-300 rounded-sm cursor-pointer"
                  />
                  <label htmlFor="isAnonymous" className="text-xs font-semibold text-stone-600 cursor-pointer select-none">
                    Keep my identity anonymous on the public support tracker wall
                  </label>
                </div>

                {/* Consent & Processing Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, ease: 'linear', duration: 1 }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Processing Payment Simulator...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Sponsor {formData.amount ? `₹${formData.amount.toLocaleString('en-IN')}` : ''} Securely</span>
                    </>
                  )}
                </button>

                {/* Submitting Loading Step Detail */}
                <AnimatePresence>
                  {isSubmitting && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[10px] font-mono text-center text-orange-700 font-bold"
                    >
                      {submitStep}
                    </motion.p>
                  )}
                </AnimatePresence>

              </form>
            )}
          </div>

          {/* Donation Receipt Preview RHS */}
          <div className="w-full lg:w-5/12 bg-stone-100 rounded-2xl border border-stone-200/60 p-4 sm:p-6" id="donation_receipt_preview_aside">
            <span className="text-[10px] font-bold text-stone-500 block mb-3 uppercase tracking-widest text-center">
              Compliance Receipt Frame
            </span>

            {completedReceipt ? (
              /* Actual beautiful Printable official receipt */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 border-2 border-amber-500 relative overflow-hidden"
                id="printable_receipt_visual"
              >
                {/* Traditional background watermark seal */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] rotate-12 pointer-events-none select-none">
                  <Flame className="w-80 h-80 text-orange-600" />
                </div>

                {/* Receipt Header */}
                <div className="text-center border-b-2 border-amber-500 pb-4 mb-4">
                  <span className="font-serif font-black text-[10px] uppercase tracking-widest text-amber-950 block">OFFICIAL DONATION RECEIPT</span>
                  <h4 className="font-serif font-extrabold text-xs text-orange-700 uppercase tracking-tight leading-tight mt-1">
                    {TRUST_META.name}
                  </h4>
                  <p className="text-[8px] text-stone-500 font-sans leading-tight mt-1">
                    Regd 2026 under AP Endowments. Reg No: {completedReceipt.trustRegNo}
                  </p>
                  <p className="text-[8px] text-stone-500 font-semibold uppercase tracking-wider text-amber-900 mt-1">
                    ★ 80G & FCRA STATUTORY CLEARANCE GRANTED ★
                  </p>
                </div>

                {/* Specifics layout */}
                <div className="space-y-2 text-[10px] text-stone-700 font-mono">
                  <div className="flex justify-between border-b border-dashed border-stone-200 pb-1">
                    <span>Receipt No:</span>
                    <span className="font-bold text-amber-950">{completedReceipt.receiptNo}</span>
                  </div>
                  <div className="flex justify-between border-b border-dashed border-stone-200 pb-1">
                    <span>Date Issued:</span>
                    <span className="font-bold text-stone-900">{completedReceipt.date}</span>
                  </div>
                  <div className="flex justify-between border-b border-dashed border-stone-200 pb-1">
                    <span>Donated By:</span>
                    <span className="font-bold text-orange-800 uppercase">{completedReceipt.donorName}</span>
                  </div>
                  <div className="flex justify-between border-b border-dashed border-stone-200 pb-1">
                    <span>PAN Linked:</span>
                    <span className="font-bold text-stone-900">{completedReceipt.panNumber}</span>
                  </div>
                  <div className="flex justify-between border-b border-dashed border-stone-200 pb-1">
                    <span>Directed Cause:</span>
                    <span className="font-bold text-stone-900 text-right max-w-[200px] select-none">{completedReceipt.specificCause}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-2 mb-2">
                    <span>Settlement Gateway:</span>
                    <span className="font-semibold text-stone-800">{completedReceipt.paymentMode}</span>
                  </div>

                  {/* Net Amount with giant graphic font */}
                  <div className="py-2.5 my-3 bg-amber-50 border border-amber-200/50 rounded-lg text-center">
                    <span className="text-[9px] font-sans font-bold text-amber-900 uppercase tracking-widest block">GRAND SPONSORED AMOUNT</span>
                    <span className="font-serif font-black text-2xl text-orange-700">
                      ₹{completedReceipt.amount.toLocaleString('en-IN')}.00
                    </span>
                  </div>

                  {/* 80G compliance box */}
                  {completedReceipt.certificate80GEligible ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-lg text-[8px] font-sans leading-relaxed">
                      <span className="font-bold uppercase tracking-wide block text-emerald-800 mb-0.5">80G Tax Deductible Code Eligible</span>
                      <span>Certified that this contribution qualifies for 50% income deduction for Indian Passport Holders. Approval: {completedReceipt.taxBenefits80GId}</span>
                    </div>
                  ) : (
                    <div className="p-3 bg-blue-50 border border-blue-200 text-blue-950 rounded-lg text-[8px] font-sans leading-relaxed">
                      <span className="font-bold uppercase tracking-wide block text-blue-800 mb-0.5">FCRA Compliance Accounted</span>
                      <span>Verified international donation routed to State Bank of India New Delhi FCRA special accounts. FCRA Reg: {completedReceipt.fcraRegId}</span>
                    </div>
                  )}
                </div>

                {/* Signatures */}
                <div className="mt-8 pt-4 border-t border-dashed border-stone-200 flex justify-between items-end">
                  <div className="text-center">
                    <span className="text-[7px] text-stone-400 block mb-3 font-sans">Official Trust Seal</span>
                    <div className="w-10 h-10 rounded-full border border-orange-200 bg-orange-50 flex items-center justify-center text-orange-600 font-serif font-black text-[9px] rotate-12 opacity-80 leading-none">
                      KKMCT<br />SEAL
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-stone-700 italic block font-serif text-[11px] select-none text-right">K. Siddharth</span>
                    <span className="w-24 h-0.5 bg-stone-300 block my-1"></span>
                    <span className="text-[8px] text-stone-500 uppercase tracking-wider block text-right font-sans">Authorized Trustee</span>
                  </div>
                </div>

                {/* Print Hint */}
                <p className="text-[7px] text-stone-400 font-sans text-center mt-5 leading-normal">
                  *This document is digitally locked, certified, and officially reported directly to Central Board of Direct Taxes (CBDT), New Delhi.
                </p>

              </motion.div>
            ) : (
              /* Simple mock receipt empty frame */
              <div className="h-96 border-2 border-dashed border-stone-300 rounded-xl flex flex-col items-center justify-center p-6 text-center text-stone-400">
                <FileText className="w-12 h-12 mb-3 text-stone-300 animate-pulse" />
                <p className="text-xs font-semibold">Receipt Pending Processing</p>
                <p className="text-[10px] mt-1 max-w-[200px]">Fill the contribution form and click sponsor to instantly generate your legal 80G tax receipt here.</p>
              </div>
            )}
            
            {/* Direct legal checklist */}
            <div className="mt-6 space-y-3 bg-stone-200/50 p-4 rounded-xl border border-stone-300/20 text-xs text-stone-600 leading-normal">
              <span className="font-sans font-bold text-amber-950 uppercase text-[10px] block tracking-wider">Statutory compliance verification</span>
              <p className="text-[10px]">✔ State of Andhra Pradesh Endowments Registry Code: <strong>{TRUST_META.regNo}</strong>.</p>
              <p className="text-[10px]">✔ Section 80G deduction credentials globally accepted on annual returns filing.</p>
              <p className="text-[10px]">✔ Real-time tracking keeps 100% transparent audit trails visually traced.</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
