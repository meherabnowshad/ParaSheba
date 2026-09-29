'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { MOCK_SERVICES, MOCK_PROVIDERS } from '@/lib/api';
import { useLocationStore } from '@/stores/useLocationStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { formatBDT, DHAKA_AREAS } from '@parasheba/ui';
import { PaymentMethod } from '@parasheba/types';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  FileText,
  Copy,
} from 'lucide-react';

const TIME_SLOTS = [
  '09:00 AM - 11:00 AM (Morning)',
  '11:00 AM - 01:00 PM (Mid-day)',
  '02:00 PM - 04:00 PM (Afternoon)',
  '05:00 PM - 07:00 PM (Evening)',
  '07:00 PM - 09:00 PM (Night)',
];

function BookingContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = params.id as string;
  const isProviderType = searchParams.get('type') === 'provider';

  const { area: currentArea, city: currentCity } = useLocationStore();
  const { user } = useAuthStore();
  const isAuthenticated = !!user;

  // Resolve service or provider
  const service = MOCK_SERVICES.find((s) => s.id === id) || MOCK_SERVICES[0];
  const provider = isProviderType
    ? MOCK_PROVIDERS.find((p) => p.id === id) || MOCK_PROVIDERS[0]
    : MOCK_PROVIDERS[0];

  // Booking Flow Steps: 1: Service/Scope, 2: Date & Slot, 3: Address, 4: Payment, 5: Confirmed
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [scheduledDate, setScheduledDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [scheduledTimeSlot, setScheduledTimeSlot] = useState<string>(TIME_SLOTS[0]);
  const [selectedArea, setSelectedArea] = useState<string>(currentArea || 'Dhanmondi');
  const [streetAddress, setStreetAddress] = useState<string>(
    'House 42, Road 7A, Dhanmondi'
  );
  const [contactPhone, setContactPhone] = useState<string>(
    user?.phone || '01712345678'
  );
  const [customerName, setCustomerName] = useState<string>(
    user?.fullName || 'Kamrul Hasan'
  );
  const [notes, setNotes] = useState<string>(
    'Please inspect the circuit breaker board.'
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.CASH_ON_DELIVERY
  );

  // Confirmed booking state
  const [trackingCode, setTrackingCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const baseFee = isProviderType ? provider.basePrice : service.startingPrice;
  const platformSafetyFee = 50;
  const totalAmount = baseFee + platformSafetyFee;

  const handleConfirmBooking = () => {
    const code = `PSB-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setTrackingCode(code);
    setCurrentStep(5);
  };

  const copyTracking = () => {
    navigator.clipboard.writeText(trackingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Step Tracker Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Book Appointment
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Complete your 5-minute booking with guaranteed arrival & satisfaction
        </p>

        {/* Progress indicator */}
        <div className="mt-6 flex items-center justify-between">
          {[
            { num: 1, label: 'Service' },
            { num: 2, label: 'Schedule' },
            { num: 3, label: 'Address' },
            { num: 4, label: 'Payment' },
            { num: 5, label: 'Confirmed' },
          ].map((s) => (
            <div key={s.num} className="flex-1 flex flex-col items-center">
              <div className="flex items-center w-full">
                <div
                  className={`h-0.5 w-full ${
                    s.num === 1
                      ? 'bg-transparent'
                      : currentStep >= s.num
                      ? 'bg-teal-700'
                      : 'bg-slate-200'
                  }`}
                />
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                    currentStep > s.num
                      ? 'bg-teal-700 text-white'
                      : currentStep === s.num
                      ? 'border-2 border-teal-700 bg-white text-teal-800'
                      : 'border border-slate-200 bg-white text-slate-400'
                  }`}
                >
                  {currentStep > s.num ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    s.num
                  )}
                </div>
                <div
                  className={`h-0.5 w-full ${
                    s.num === 5
                      ? 'bg-transparent'
                      : currentStep > s.num
                      ? 'bg-teal-700'
                      : 'bg-slate-200'
                  }`}
                />
              </div>
              <span
                className={`mt-2 text-[11px] font-semibold ${
                  currentStep >= s.num ? 'text-teal-800' : 'text-slate-400'
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Current Active Step Content */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
            {/* STEP 1: SERVICE CONFIRMATION */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Step 1: Confirm Service & Technician
                  </h2>
                  <p className="text-xs text-slate-500">
                    Review the service scope and chosen verified technician
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-800 font-bold">
                      🛠️
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-slate-900">
                        {service.name}
                      </h3>
                      {service.nameBn && (
                        <p className="text-xs text-slate-500">{service.nameBn}</p>
                      )}
                      <p className="mt-1 text-xs text-slate-600">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-teal-100 bg-teal-50/50 p-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                    Assigned Master Technician
                  </span>
                  <div className="mt-2 flex items-center gap-3">
                    <img
                      src={
                        provider.user?.avatarUrl ||
                        'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200'
                      }
                      alt={provider.user?.fullName}
                      className="h-12 w-12 rounded-xl object-cover border border-teal-200"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        {provider.user?.fullName}
                        <ShieldCheck className="h-4 w-4 text-teal-600" />
                      </h4>
                      <p className="text-xs text-slate-600">
                        {provider.headline} • {provider.experienceYears} Years Exp.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center gap-2 rounded-xl bg-teal-700 px-6 py-3 text-xs font-bold text-white shadow-xs hover:bg-teal-800 transition"
                  >
                    Select Date & Time
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: DATE & TIME SLOT */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Step 2: Choose Date & Time Window
                  </h2>
                  <p className="text-xs text-slate-500">
                    Technician will arrive within your designated 2-hour arrival window
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Preferred Time Slot
                  </label>
                  <div className="space-y-2">
                    {TIME_SLOTS.map((slot) => (
                      <label
                        key={slot}
                        className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer text-xs font-semibold transition ${
                          scheduledTimeSlot === slot
                            ? 'border-teal-700 bg-teal-50/60 text-teal-900'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="timeSlot"
                          checked={scheduledTimeSlot === slot}
                          onChange={() => setScheduledTimeSlot(slot)}
                          className="accent-teal-700"
                        />
                        <Clock className="h-4 w-4 text-teal-600" />
                        <span>{slot}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="flex items-center gap-2 rounded-xl bg-teal-700 px-6 py-3 text-xs font-bold text-white shadow-xs hover:bg-teal-800 transition"
                  >
                    Continue to Address
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: ADDRESS & CONTACT DETAILS */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Step 3: Service Address & Contact Details
                  </h2>
                  <p className="text-xs text-slate-500">
                    Where should the technician arrive in {currentCity}?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Bangladeshi Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="017xxxxxxxx"
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Neighborhood Area
                    </label>
                    <select
                      value={selectedArea}
                      onChange={(e) => setSelectedArea(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                    >
                      {DHAKA_AREAS.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      House / Flat / Road
                    </label>
                    <input
                      type="text"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="e.g. Flat 4B, House 12, Road 5"
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Problem Description / Instructions for Technician
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe specific symptoms or details about the issue..."
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="flex items-center gap-2 rounded-xl bg-teal-700 px-6 py-3 text-xs font-bold text-white shadow-xs hover:bg-teal-800 transition"
                  >
                    Choose Payment Method
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: PAYMENT METHOD SELECTION */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Step 4: Select Payment Option
                  </h2>
                  <p className="text-xs text-slate-500">
                    Pay safely in BDT after service completion or digitally
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      id: PaymentMethod.CASH_ON_DELIVERY,
                      label: 'Cash on Service Completion',
                      desc: 'Pay directly to technician after job is completed to your satisfaction',
                      badge: 'Most Popular',
                    },
                    {
                      id: PaymentMethod.BKASH,
                      label: 'bKash Mobile Banking',
                      desc: 'Instant bKash payment gateway or direct merchant transfer',
                      badge: 'Instant',
                    },
                    {
                      id: PaymentMethod.NAGAD,
                      label: 'Nagad Mobile Banking',
                      desc: 'Government postal digital payment',
                      badge: null,
                    },
                    {
                      id: PaymentMethod.SSLCOMMERZ,
                      label: 'Debit / Credit Card (SSLCommerz)',
                      desc: 'Visa, Mastercard, City Bank, BRAC Bank, Dutch-Bangla Nexus',
                      badge: 'Encrypted',
                    },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-start justify-between rounded-2xl border p-4 cursor-pointer transition ${
                        paymentMethod === opt.id
                          ? 'border-teal-700 bg-teal-50/50'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === opt.id}
                          onChange={() => setPaymentMethod(opt.id as PaymentMethod)}
                          className="mt-1 accent-teal-700"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900">
                              {opt.label}
                            </span>
                            {opt.badge && (
                              <span className="rounded bg-teal-100 px-1.5 py-0.5 text-[10px] font-bold text-teal-800">
                                {opt.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {opt.desc}
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 text-xs text-slate-600 flex items-center gap-2 border border-slate-200">
                  <ShieldCheck className="h-4 w-4 text-teal-600 shrink-0" />
                  <span>
                    Your payment is backed by the <strong>ParaSheba Guarantee</strong>. If unsatisfied, a dispute manager will intervene within 2 hours.
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="flex items-center gap-2 rounded-xl bg-teal-700 px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-teal-800 transition"
                  >
                    Confirm & Dispatch Job
                    <CheckCircle2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: BOOKING CONFIRMED & REAL-TIME DISPATCH TRACKER */}
            {currentStep === 5 && (
              <div className="space-y-6 text-center py-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-700 ring-8 ring-teal-50">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                    Booking Confirmed • Provider Dispatched
                  </span>
                  <h2 className="mt-2 text-2xl font-black text-slate-900">
                    Technician Assigned Successfully!
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Your appointment has been confirmed and scheduled with{' '}
                    <strong>{provider.user?.fullName}</strong>.
                  </p>
                </div>

                {/* Tracking Code Box */}
                <div className="mx-auto max-w-sm rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    ParaSheba Tracking Code
                  </span>
                  <div className="mt-1 flex items-center justify-center gap-2">
                    <span className="font-mono text-xl font-black text-teal-800">
                      {trackingCode}
                    </span>
                    <button
                      onClick={copyTracking}
                      className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 transition"
                      title="Copy Tracking ID"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                  {copied && (
                    <span className="text-[11px] text-teal-700 font-bold">
                      Copied to clipboard!
                    </span>
                  )}
                </div>

                {/* Live Timeline status */}
                <div className="text-left rounded-2xl border border-slate-200 p-5 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Live Dispatch Timeline
                  </h4>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5" />
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          Booking Created & Confirmed
                        </p>
                        <p className="text-[11px] text-slate-500">Just now</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse mt-1.5" />
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          Provider Accepted: {provider.user?.fullName}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Scheduled for {scheduledDate} ({scheduledTimeSlot})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-slate-400">
                      <div className="h-2 w-2 rounded-full bg-slate-200 mt-1.5" />
                      <div>
                        <p className="text-xs font-medium">Provider On the Way</p>
                        <p className="text-[11px]">En route to {selectedArea}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-slate-400">
                      <div className="h-2 w-2 rounded-full bg-slate-200 mt-1.5" />
                      <div>
                        <p className="text-xs font-medium">Work Completed & Payment</p>
                        <p className="text-[11px]">Pay {formatBDT(totalAmount)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <Link
                    href="/customer/dashboard"
                    className="w-full sm:w-auto rounded-xl bg-teal-700 px-6 py-3 text-xs font-bold text-white hover:bg-teal-800 transition"
                  >
                    Go to Customer Dashboard
                  </Link>
                  <Link
                    href="/"
                    className="w-full sm:w-auto rounded-xl border border-slate-200 px-6 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Return to Home
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sticky Summary & Rate Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Booking Invoice Summary
            </h3>

            <div className="space-y-3 border-b border-slate-100 pb-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Base Service Charge</span>
                <span className="font-bold text-slate-900">
                  {formatBDT(baseFee)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600">Platform Safety & Warranty</span>
                <span className="font-bold text-slate-900">
                  {formatBDT(platformSafetyFee)}
                </span>
              </div>

              <div className="flex items-center justify-between text-emerald-700">
                <span>Neighborhood Discount</span>
                <span>-৳0</span>
              </div>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-sm font-bold text-slate-900">
                Total Payable (BDT)
              </span>
              <span className="text-2xl font-black text-teal-800">
                {formatBDT(totalAmount)}
              </span>
            </div>

            {/* Selected details badge */}
            <div className="rounded-xl bg-slate-50 p-3 text-[11px] space-y-1 text-slate-600">
              <p>
                <strong>Area:</strong> {selectedArea}, {currentCity}
              </p>
              <p>
                <strong>Date:</strong> {scheduledDate}
              </p>
              <p>
                <strong>Slot:</strong> {scheduledTimeSlot.split(' ')[0]}{' '}
                {scheduledTimeSlot.split(' ')[1]}
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 p-3 text-[11px] text-amber-800 border border-amber-200/60 flex items-start gap-1.5">
              <AlertCircle className="h-3.5 w-3.5 text-amber-700 shrink-0 mt-0.5" />
              <span>
                Free cancellation up to 2 hours before scheduled window.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <React.Suspense
      fallback={
        <div className="mx-auto max-w-5xl px-4 py-16 text-center text-xs text-slate-500">
          Loading booking details...
        </div>
      }
    >
      <BookingContent />
    </React.Suspense>
  );
}
