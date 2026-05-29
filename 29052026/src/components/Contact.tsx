/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckSquare, Clock, Globe, HelpCircle } from 'lucide-react';
import { TRUST_META } from '../data';
import { ContactInquiry } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Temple Restoration Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiries, setSubmittedInquiries] = useState<ContactInquiry[]>([]);

  const [successMsg, setSuccessMsg] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[e.target.name];
        return copy;
      });
    }
  };

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Full Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Please specify a valid email address";
    if (!formData.phone.trim() || formData.phone.length < 10) tempErrors.phone = "Provide a valid 10-digit phone number";
    if (!formData.message.trim()) tempErrors.message = "Message text is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const nowStr = new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      }) + " (Just now)";

      const newInquiry: ContactInquiry = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        timestamp: nowStr
      };

      setSubmittedInquiries(prev => [newInquiry, ...prev]);
      setIsSubmitting(false);
      setSuccessMsg(true);

      // Clean inputs
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Temple Restoration Inquiry',
        message: ''
      });

      // Clear success notification
      setTimeout(() => setSuccessMsg(false), 5000);

    }, 1500);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="contact_header">
          {/* Trust Compliance Status */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-4 py-1.5 rounded-full mb-4 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] text-emerald-950 font-bold uppercase tracking-wider">Trust Communication Hub Certified & Active</span>
          </div>

          <span className="text-xs font-bold text-orange-600 block mb-1">
            Communication Portal
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-amber-950 tracking-wide">
            Connect With Our Trustees
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Have questions about an ongoing restoration project? Or perhaps you wish to suggest an ancient temple in your locality that requires support? We review all submissions thoroughly.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Left Column: Direct Coordinates Cards */}
          <div className="lg:col-span-5 space-y-6" id="contact_details_column">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-950 mb-2 leading-tight tracking-wide">
              Official Trust Coordinates
            </h3>
            <p className="text-stone-600 text-sm leading-normal pb-4 border-b border-stone-100">
              For letters, audit verifications, cash deposit receipt inquiries, or physical documents processing.
            </p>

            {/* Address Card */}
            <div className="flex items-start space-x-4 bg-amber-50/40 p-5 rounded-xl border border-amber-100/50">
              <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-widest">Trust Head Office</h4>
                <p className="text-stone-700 text-xs sm:text-sm mt-1 leading-relaxed font-sans font-medium">
                  {TRUST_META.contact.address}
                </p>
                <span className="text-[10px] text-stone-400 font-mono mt-2 block">
                  Coordinates: {TRUST_META.contact.mapCoords}
                </span>
              </div>
            </div>

            {/* Phone numbers Card */}
            <div className="flex items-start space-x-4 bg-amber-50/40 p-5 rounded-xl border border-amber-100/50">
              <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="w-full">
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-widest">Telephone & WhatsApp</h4>
                <div className="mt-1 flex flex-col space-y-1 text-xs sm:text-sm text-stone-700 font-mono">
                  <span className="font-sans font-bold text-amber-950">{TRUST_META.contact.phone}</span>
                  <span className="font-sans text-stone-500">{TRUST_META.contact.altPhone} (Office)</span>
                </div>
              </div>
            </div>

            {/* Emails Card */}
            <div className="flex items-start space-x-4 bg-amber-50/40 p-5 rounded-xl border border-amber-100/50">
              <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-widest">Electronic Mail</h4>
                <div className="mt-1 flex flex-col space-y-1 text-xs sm:text-sm text-stone-700 font-mono">
                  <span className="font-sans font-bold text-orange-700">{TRUST_META.contact.email}</span>
                  <span className="font-sans text-stone-500">{TRUST_META.contact.backupEmail}</span>
                </div>
              </div>
            </div>

            {/* Global Compliance stamp */}
            <div className="p-4 rounded-xl border-t-4 border-amber-500 bg-amber-50 text-[11px] leading-relaxed text-amber-900 font-medium">
              ✔ Official communications under Visakhapatnam jurisdiction are fully audited. Registered 2026.
            </div>

          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-amber-150/50 shadow-xl" id="contact_form_column">
            <h3 className="font-serif text-lg sm:text-2xl font-bold text-amber-950 mb-4 tracking-wide">
              Leave An Inquiry Letter
            </h3>
            <p className="text-stone-600 text-sm leading-normal mb-8">
              Fill out this form to submit suggestions, feedback, historical archives, or donation processing questions.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-amber-900 block mb-1 uppercase">Full Name <span className="text-red-500 font-sans">*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Sri G. Srinivasarao"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-orange-500 text-stone-900"
                  />
                  {errors.name && <span className="text-[10px] text-rose-600 font-bold mt-1 block">{errors.name}</span>}
                </div>

                <div>
                  <label className="text-xs font-bold text-amber-900 block mb-1 uppercase">Email Address <span className="text-red-500 font-sans">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="srinivasa.g@outlook.com"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-orange-500 text-stone-900"
                  />
                  {errors.email && <span className="text-[10px] text-rose-600 font-bold mt-1 block">{errors.email}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-amber-900 block mb-1 uppercase">WhatsApp Phone <span className="text-red-500 font-sans">*</span></label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 95530 40108"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-orange-500 text-stone-900"
                  />
                  {errors.phone && <span className="text-[10px] text-rose-600 font-bold mt-1 block">{errors.phone}</span>}
                </div>

                <div>
                  <label className="text-xs font-bold text-amber-900 block mb-1 uppercase">Inquiry Topic</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-bold text-stone-900 focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  >
                    <option value="Temple Restoration Inquiry">Temple Restoration Collaboration</option>
                    <option value="Nitya Annadanam Suggestion">Nitya Annadanam (Meals Service)</option>
                    <option value="Sankrita Vidyadana Contribution">Scholarships Support Drive</option>
                    <option value="Other Charitable Matters">General Trust Inquiries</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-amber-900 block mb-1 uppercase">Your Detailed message <span className="text-red-500 font-sans">*</span></label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your suggestion, the location of the temple requiring attention, or questions regarding continuous donation transparency..."
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-orange-500 text-stone-900"
                />
                {errors.message && <span className="text-[10px] text-rose-600 font-bold mt-1 block">{errors.message}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-amber-950 to-amber-900 hover:from-amber-950 hover:to-orange-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ ease: 'linear', repeat: Infinity, duration: 1 }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Submitting Inquiry Letter...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Official Inquiry</span>
                  </>
                )}
              </button>

              <AnimatePresence>
                {successMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center space-x-2"
                  >
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Inquiry processed! It is listed dynamically in the Active Inquiries Monitor wall below.</span>
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </div>

        </div>

        {/* Local Active Submissions Log */}
        <div className="bg-amber-50/50 rounded-2xl border border-amber-100 p-6 sm:p-8" id="active_inquiries_monitor_section">
          <div className="flex items-center space-x-2 mb-6">
            <Clock className="w-5 h-5 text-orange-600 animate-pulse" />
            <div>
              <h3 className="font-serif text-lg font-bold text-amber-950 leading-tight">
                Active Inquiries Monitor Wall
              </h3>
              <p className="text-[11px] text-stone-500 font-sans uppercase tracking-widest mt-0.5">
                • Public Transparency Communication Board
              </p>
            </div>
          </div>

          <div className="space-y-4" id="inquiries_log_layout">
            {submittedInquiries.length === 0 ? (
              <div className="text-center py-8 bg-white border border-dashed border-stone-200 rounded-xl" id="no_inquiries_placeholder">
                <HelpCircle className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                <p className="text-xs text-stone-500 font-sans">No recent inquiries recorded. Your submitted letters will appear here in real time.</p>
              </div>
            ) : (
              submittedInquiries.map((inq, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  key={idx}
                  className="bg-white p-5 rounded-xl border border-stone-150 shadow-xs hover:border-amber-200 transition-colors"
                >
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-serif font-black text-xs">
                        {inq.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-amber-950">{inq.name}</h4>
                        <p className="text-[10px] text-stone-400 font-mono">{inq.email} • {inq.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-[9px] font-sans font-bold bg-amber-100 text-amber-800 uppercase px-2 py-0.5 rounded-sm">
                        {inq.subject}
                      </span>
                      <span className="text-[9px] text-stone-400 font-mono">
                        {inq.timestamp}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed italic ml-9 pl-0">
                    &ldquo;{inq.message}&rdquo;
                  </p>
                </motion.div>
              ))
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
