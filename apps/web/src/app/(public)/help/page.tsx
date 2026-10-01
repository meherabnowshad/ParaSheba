'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ShieldCheck,
  CreditCard,
  Clock,
  PhoneCall,
} from 'lucide-react';

const FAQS = [
  {
    category: 'Booking & Scheduling',
    q: 'How does doorstep booking work?',
    a: 'Simply choose a service or provider, select your preferred 2-hour arrival window, enter your neighborhood street address, and confirm. Your assigned technician receives instant notification and arrives with necessary tools.',
  },
  {
    category: 'Booking & Scheduling',
    q: 'Can I cancel or reschedule my booking?',
    a: 'Yes, free cancellation and rescheduling is permitted up to 2 hours before the scheduled appointment window directly from your Customer Dashboard.',
  },
  {
    category: 'Trust & Verification',
    q: 'How are technicians and providers verified?',
    a: 'Every provider on ParaSheba must submit Government National ID (NID), undergo biometric verification, provide police clearance, and demonstrate technical skills to our field inspectors before receiving the "NID Verified" seal.',
  },
  {
    category: 'Payments & Pricing',
    q: 'What payment methods do you accept?',
    a: 'We accept Cash on Delivery (COD) upon job satisfaction, bKash, Nagad, and all major Bangladeshi debit/credit cards via secure SSLCommerz encryption.',
  },
  {
    category: 'Karigor & Tailoring',
    q: 'How does Karigor doorstep measurement work?',
    a: 'A master tailor visits your residence, takes precise measurements with tailoring tape, notes your personal fit preferences, and picks up your fabric. The measurements are permanently saved to your digital profile for 1-click reordering.',
  },
  {
    category: 'Emergency Dispatch',
    q: 'How fast will an ambulance arrive?',
    a: 'ParaSheba emergency ambulances are stationed across prime metro nodes (Dhanmondi, Gulshan, Mirpur, Uttara). The average arrival time is 12 to 20 minutes depending on traffic conditions.',
  },
];

export default function HelpPage() {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="rounded-3xl bg-gradient-to-r from-teal-950 via-teal-900 to-slate-900 p-8 sm:p-12 text-white shadow-xl text-center">
        <span className="inline-block rounded-full bg-teal-800/80 px-3 py-1 text-xs font-bold text-teal-200 border border-teal-600/50">
          Knowledge Base & Support
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-black">
          How can we help you today?
        </h1>

        <div className="relative mt-6 max-w-lg mx-auto">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions e.g. bKash, cancellation, NID..."
            className="w-full rounded-2xl bg-white py-3 pl-11 pr-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none shadow-md"
          />
        </div>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Frequently Asked Questions
        </h2>

        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm font-bold text-slate-900 hover:text-teal-700 transition"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${
                    isOpen ? 'rotate-180 text-teal-700' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center max-w-2xl mx-auto space-y-3">
        <h3 className="text-base font-bold text-slate-900">
          Didn’t find what you were looking for?
        </h3>
        <p className="text-xs text-slate-500">
          Our friendly customer support executives are available 24/7.
        </p>
        <Link
          href="/contact"
          className="inline-flex rounded-xl bg-teal-700 px-6 py-2.5 text-xs font-bold text-white hover:bg-teal-800 transition"
        >
          Contact Customer Support
        </Link>
      </div>
    </div>
  );
}
