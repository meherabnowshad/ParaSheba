'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DHAKA_AREAS } from '@parasheba/ui';
import {
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Users,
  Award,
  ArrowRight,
} from 'lucide-react';

export default function BecomeAProviderPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    category: 'Electrician',
    experienceYears: '5',
    serviceArea: 'Dhanmondi',
    nidNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-950 via-teal-900 to-teal-800 p-8 sm:p-12 text-white shadow-xl">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-800/80 px-3 py-1 text-xs font-bold text-teal-200 border border-teal-600/50">
            <Briefcase className="h-3.5 w-3.5" />
            ParaSheba Provider Network
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight">
            Earn With Dignity in Your Own Neighborhood
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-teal-100/90 leading-relaxed">
            Join thousands of verified electricians, plumbers, master tailors, and caregivers. Get steady job bookings, guaranteed weekly payouts, and respect in your community.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Onboarding Form */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 mb-1">
              Provider Application Form
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Takes less than 3 minutes. Our verification team reviews all NID submissions within 24 hours.
            </p>

            {submitted ? (
              <div className="rounded-2xl bg-teal-50 p-8 text-center border border-teal-200 space-y-3">
                <CheckCircle2 className="mx-auto h-12 w-12 text-teal-700" />
                <h3 className="text-lg font-bold text-slate-900">
                  Application Submitted Successfully!
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. An onboarding officer will contact you at <strong>{formData.phone}</strong> for biometric NID verification and welcome kit delivery.
                </p>
                <div className="pt-2">
                  <Link
                    href="/provider/dashboard"
                    className="inline-flex rounded-xl bg-teal-700 px-5 py-2.5 text-xs font-bold text-white hover:bg-teal-800"
                  >
                    Preview Provider Dashboard Demo
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Full Legal Name (as per NID)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mohammad Rafiqul Islam"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 p-3 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Bangladeshi Mobile Phone
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="018xxxxxxxx"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 p-3 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Primary Trade / Specialty
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 p-3 focus:outline-none focus:border-teal-500"
                    >
                      <option value="Electrician">Electrician & Wiring</option>
                      <option value="Plumber">Plumber & Sanitary</option>
                      <option value="AC Technician">AC Repair & Gas Top-up</option>
                      <option value="Karigor">Master Karigor Tailor</option>
                      <option value="Caregiver">Elderly / Patient Caregiver</option>
                      <option value="Mechanic">Car / Bike Mechanic</option>
                      <option value="Cleaner">Deep Home Cleaning</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Years of Hands-on Experience
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.experienceYears}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          experienceYears: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 p-3 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Primary Operating Area
                    </label>
                    <select
                      value={formData.serviceArea}
                      onChange={(e) =>
                        setFormData({ ...formData, serviceArea: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 p-3 focus:outline-none focus:border-teal-500"
                    >
                      {DHAKA_AREAS.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      National ID (NID) Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="10 or 17 digit NID number"
                      value={formData.nidNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, nidNumber: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 p-3 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    By submitting, you agree to the ParaSheba Service Code of Conduct.
                  </span>
                  <button
                    type="submit"
                    className="rounded-xl bg-teal-700 px-6 py-3 text-xs font-bold text-white shadow-xs hover:bg-teal-800 transition"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Benefits Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Why Join ParaSheba?
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 font-bold">
                  ৳
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Direct Weekly Payouts</h4>
                  <p className="text-slate-500 mt-0.5">
                    Earnings deposited directly to your bKash, Nagad or bank every Tuesday.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 font-bold">
                  🛡️
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Zero Middleman Fraud</h4>
                  <p className="text-slate-500 mt-0.5">
                    Customers pay fixed platform rates. You never get cheated out of your fee.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 font-bold">
                  ⭐
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Build Your Reputation</h4>
                  <p className="text-slate-500 mt-0.5">
                    Get genuine reviews and repeat regular customers in your own neighborhood.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
