'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_PROVIDERS } from '@/lib/api';
import { CaregiverSpecialization } from '@parasheba/types';
import { formatBDT } from '@parasheba/ui';
import {
  HeartHandshake,
  ShieldCheck,
  Stethoscope,
  Clock,
  Calendar,
  PhoneCall,
  CheckCircle2,
  FileCheck,
  Award,
  AlertCircle,
  ArrowRight,
  UserCheck,
} from 'lucide-react';

const SHIFT_OPTIONS = [
  { id: '8hr', title: '8-Hour Day Shift', hours: '09:00 AM – 05:00 PM', pricePerDay: 1200, desc: 'Mobility support, daily meal assistance, medication timing, doctor visit accompaniment' },
  { id: '12hr', title: '12-Hour Day or Night', hours: '08:00 AM – 08:00 PM', pricePerDay: 1600, desc: 'Complete day/night monitoring, vital checks (BP, Glucose), bed-bound turning' },
  { id: '24hr', title: '24-Hour Residential Stay', hours: 'Round-the-clock live-in', pricePerDay: 2600, desc: 'Dedicated full-time caregiver residing at home with weekly rest rotations' },
  { id: 'monthly', title: 'Monthly Care Package', hours: '30-day continuous support', pricePerDay: 32000, desc: 'Discounted recurring plan with free emergency replacement caregiver guarantee' },
];

export default function CaregiverPage() {
  const [selectedShift, setSelectedShift] = useState(SHIFT_OPTIONS[0]);
  const [specialization, setSpecialization] = useState<CaregiverSpecialization>(
    CaregiverSpecialization.ELDERLY_CARE
  );

  // Form states for care intake
  const [recipientName, setRecipientName] = useState('Abdul Gafur');
  const [recipientAge, setRecipientAge] = useState('74');
  const [condition, setCondition] = useState('Post-stroke mild paralysis, requires mobility and medication reminders');
  const [submitted, setSubmitted] = useState(false);

  // Caregivers
  const caregivers = MOCK_PROVIDERS.filter((p) =>
    p.serviceCategories.includes('Caregiver') || p.serviceCategories.includes('Nursing')
  );

  const handleSubmitIntake = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-950 via-teal-900 to-teal-800 p-8 sm:p-12 text-white shadow-xl">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-800/80 px-3 py-1 text-xs font-bold text-teal-200 border border-teal-600/50">
            <HeartHandshake className="h-3.5 w-3.5" />
            ParaSheba Caregiver & Patient Assistance • কেয়ারগিভার
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight">
            Compassionate Care for Loved Ones at Home
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-teal-100/90 leading-relaxed">
            Finding trustworthy, trained elderly caregivers and patient attendants in Bangladesh shouldn’t rely on unverified middlemen. All ParaSheba caregivers are NID verified, background-checked, and nursing certified.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-teal-200">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-teal-400" />
              100% Police & NID Verified
            </span>
            <span className="flex items-center gap-1">
              <Award className="h-4 w-4 text-teal-400" />
              Diploma in Nursing & Geriatric Training
            </span>
            <span className="flex items-center gap-1">
              <UserCheck className="h-4 w-4 text-teal-400" />
              Free Instant Replacement Guarantee
            </span>
          </div>
        </div>
      </div>

      {/* Shift Plans & Rate Calculator */}
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Choose Flexible Care Shift Plans
          </h2>
          <p className="text-xs text-slate-500">
            Transparent standard rates in BDT. No hidden placement fees.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SHIFT_OPTIONS.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedShift(plan)}
              className={`rounded-2xl border p-5 cursor-pointer transition ${
                selectedShift.id === plan.id
                  ? 'border-teal-700 bg-teal-50/50 ring-2 ring-teal-600/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                {plan.hours}
              </span>
              <h3 className="mt-1 text-base font-bold text-slate-900">
                {plan.title}
              </h3>
              <p className="mt-2 text-2xl font-black text-teal-900">
                {formatBDT(plan.pricePerDay)}
                <span className="text-xs font-normal text-slate-500">
                  {plan.id === 'monthly' ? ' / month' : ' / day'}
                </span>
              </p>
              <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                {plan.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Patient Assessment & Care Plan Request */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Patient Assessment & Care Request
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Tell us about your patient so our clinical team can pair the best nurse or attendant
            </p>

            {submitted ? (
              <div className="rounded-2xl bg-teal-50 p-6 text-center border border-teal-200">
                <CheckCircle2 className="mx-auto h-10 w-10 text-teal-700" />
                <h3 className="mt-2 text-base font-bold text-teal-950">
                  Care Plan Request Received!
                </h3>
                <p className="mt-1 text-xs text-teal-800">
                  Our clinical care coordinator will call you within 30 minutes to finalize caregiver matching and interview scheduling.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-bold text-teal-900 underline"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitIntake} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Recipient / Patient Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Patient Age
                    </label>
                    <input
                      type="number"
                      required
                      value={recipientAge}
                      onChange={(e) => setRecipientAge(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Specialization Required
                  </label>
                  <select
                    value={specialization}
                    onChange={(e) =>
                      setSpecialization(e.target.value as CaregiverSpecialization)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  >
                    <option value={CaregiverSpecialization.ELDERLY_CARE}>
                      Elderly Companion & Mobility Care
                    </option>
                    <option value={CaregiverSpecialization.PATIENT_ASSISTANCE}>
                      Post-Surgery / Stroke Recovery Patient Assistance
                    </option>
                    <option value={CaregiverSpecialization.CHILDCARE}>
                      Childcare / Verified Babysitter
                    </option>
                    <option value={CaregiverSpecialization.HOME_ASSISTANCE}>
                      Bed-Bound Palliative Support
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Patient Condition & Medical History
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    placeholder="E.g., diabetic, wheelchair-bound, needs assistance standing..."
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-xl bg-teal-700 px-6 py-3 text-xs font-bold text-white shadow-xs hover:bg-teal-800 transition"
                >
                  Request Caregiver Assignment ({selectedShift.title})
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Selected Care Plan
            </h3>

            <div className="rounded-2xl bg-teal-50/60 p-4 border border-teal-200/80">
              <span className="text-[11px] font-semibold text-teal-800">
                Plan
              </span>
              <h4 className="text-base font-extrabold text-slate-900">
                {selectedShift.title}
              </h4>
              <p className="text-2xl font-black text-teal-900 mt-2">
                {formatBDT(selectedShift.pricePerDay)}
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-teal-600" />
                <span>NID & Police Verified Caregiver</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-teal-600" />
                <span>Daily vital records & feeding log</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-teal-600" />
                <span>Free trial day with full refund</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <a
                href="tel:01711000999"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-800 hover:bg-slate-50 transition"
              >
                <PhoneCall className="h-4 w-4 text-teal-700" />
                Call Care Specialist (01711-000999)
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Caregivers Showcase */}
      <section className="border-t border-slate-200/80 pt-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Verified Caregivers & Nurses
          </h2>
          <p className="text-xs text-slate-500">
            Trained professionals available for immediate home assignment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caregivers.map((c) => (
            <div
              key={c.id}
              className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4">
                  <img
                    src={c.user?.avatarUrl}
                    alt={c.user?.fullName}
                    className="h-16 w-16 rounded-2xl object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {c.user?.fullName}
                    </h3>
                    <p className="text-xs text-teal-700 font-semibold">
                      {c.headline}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {c.experienceYears} Years Experience • {c.completedJobsCount} Patients Served
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-600 line-clamp-2">
                  {c.bio}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {c.badges.map((b) => (
                    <span
                      key={b}
                      className="rounded bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-800"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs font-bold text-slate-800">
                  ★ {c.rating.toFixed(1)} ({c.reviewCount})
                </span>
                <Link
                  href={`/providers/${c.id}`}
                  className="rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-teal-800 transition"
                >
                  View Profile & Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
