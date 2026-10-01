'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_ACTIVE_BOOKINGS, MOCK_PROVIDERS } from '@/lib/api';
import { useAuthStore } from '@/stores/useAuthStore';
import { formatBDT } from '@parasheba/ui';
import { BookingStatus } from '@parasheba/types';
import {
  Briefcase,
  Star,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Power,
  TrendingUp,
  DollarSign,
  AlertCircle,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

export default function ProviderDashboardPage() {
  const { user } = useAuthStore();
  const provider = MOCK_PROVIDERS[0]; // Rafiqul Islam

  const [isAvailable, setIsAvailable] = useState(true);
  const [jobStatus, setJobStatus] = useState<BookingStatus>(
    BookingStatus.PROVIDER_ON_THE_WAY
  );
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const activeJob = MOCK_ACTIVE_BOOKINGS[0];

  const handleUpdateStatus = (newStatus: BookingStatus, msg: string) => {
    setJobStatus(newStatus);
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner & Availability Toggle */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={provider.user?.avatarUrl}
              alt={provider.user?.fullName}
              className="h-16 w-16 rounded-2xl object-cover border-2 border-slate-200"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {provider.user?.fullName}
                </h1>
                <span className="rounded-md bg-teal-50 px-2 py-0.5 text-xs font-bold text-teal-800 border border-teal-200">
                  Master Electrician
                </span>
                {provider.nidVerified && (
                  <span className="inline-flex items-center gap-1 rounded bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-800">
                    <ShieldCheck className="h-3 w-3 text-teal-600" />
                    NID Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Covering {provider.serviceAreas.join(', ')}
              </p>
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 sm:p-3">
            <div className="text-right">
              <span className="block text-xs font-bold text-slate-900">
                {isAvailable ? 'Available for Jobs' : 'Off-Duty'}
              </span>
              <span className="text-[10px] text-slate-500">
                {isAvailable ? 'Ready for 30m dispatch' : 'No new requests'}
              </span>
            </div>
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isAvailable ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  isAvailable ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Action feedback toast */}
        {actionMessage && (
          <div className="mt-4 rounded-xl bg-teal-50 p-3 text-xs font-bold text-teal-800 border border-teal-200 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-teal-600" />
            {actionMessage}
          </div>
        )}
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            This Month's Earnings
          </span>
          <p className="mt-2 text-2xl font-black text-teal-900">৳34,200</p>
          <span className="mt-1 text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> +18% vs last month
          </span>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Completed Jobs
          </span>
          <p className="mt-2 text-2xl font-black text-slate-900">
            {provider.completedJobsCount}
          </p>
          <span className="mt-1 text-[11px] text-slate-500">
            100% On-time completion
          </span>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Customer Rating
          </span>
          <p className="mt-2 text-2xl font-black text-amber-500 flex items-center gap-1">
            ★ {provider.rating.toFixed(2)}
          </p>
          <span className="mt-1 text-[11px] text-slate-500">
            {provider.reviewCount} positive reviews
          </span>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Next Payout Day
          </span>
          <p className="mt-2 text-2xl font-black text-slate-900">Tuesday</p>
          <span className="mt-1 text-[11px] text-slate-500">
            Direct deposit to bKash
          </span>
        </div>
      </div>

      {/* Active Job Queue */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Live Assigned Job
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Active Job #{activeJob.trackingCode}
            </h2>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              jobStatus === BookingStatus.COMPLETED
                ? 'bg-emerald-100 text-emerald-800'
                : jobStatus === BookingStatus.IN_PROGRESS
                ? 'bg-amber-100 text-amber-800'
                : 'bg-teal-100 text-teal-800'
            }`}
          >
            Status: {jobStatus.replace(/_/g, ' ')}
          </span>
        </div>

        {/* Job details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-3">
            <div>
              <span className="text-slate-400 font-bold uppercase">
                Customer & Location
              </span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">
                Kamrul Hasan
              </p>
              <p className="text-slate-600">
                {activeJob.address}, {activeJob.area}
              </p>
            </div>

            <div>
              <span className="text-slate-400 font-bold uppercase">
                Service Requested
              </span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">
                {activeJob.service?.name}
              </p>
              <p className="text-slate-600 mt-0.5">
                <strong>Customer Note:</strong> {activeJob.notes}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-slate-400 font-bold uppercase">
                Scheduled Slot
              </span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">
                {activeJob.scheduledDate} ({activeJob.scheduledTimeSlot})
              </p>
            </div>

            <div>
              <span className="text-slate-400 font-bold uppercase">
                Payment & Collection
              </span>
              <p className="text-sm font-bold text-teal-900 mt-0.5">
                Collect {formatBDT(activeJob.totalAmount)} (Cash on Delivery)
              </p>
            </div>
          </div>
        </div>

        {/* Provider Workflow Action Buttons */}
        <div className="border-t border-slate-100 pt-6 flex flex-wrap items-center gap-3">
          <a
            href="tel:01712345678"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            <Phone className="h-4 w-4 text-teal-700" />
            Call Customer
          </a>

          {jobStatus !== BookingStatus.PROVIDER_ON_THE_WAY && (
            <button
              onClick={() =>
                handleUpdateStatus(
                  BookingStatus.PROVIDER_ON_THE_WAY,
                  'Status updated: Customer notified you are on the way!'
                )
              }
              className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-xs font-bold text-teal-800 hover:bg-teal-100 transition"
            >
              I Am On the Way
            </button>
          )}

          {jobStatus !== BookingStatus.IN_PROGRESS && (
            <button
              onClick={() =>
                handleUpdateStatus(
                  BookingStatus.IN_PROGRESS,
                  'Status updated: Work started at customer premise.'
                )
              }
              className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs font-bold text-amber-800 hover:bg-amber-100 transition"
            >
              Start Work
            </button>
          )}

          <button
            onClick={() =>
              handleUpdateStatus(
                BookingStatus.COMPLETED,
                `Job completed successfully! Cash of ${formatBDT(
                  activeJob.totalAmount
                )} collected.`
              )
            }
            className="rounded-xl bg-teal-700 px-5 py-2.5 text-xs font-bold text-white hover:bg-teal-800 transition shadow-xs"
          >
            Mark Job Completed & Collect ৳400
          </button>
        </div>
      </div>
    </div>
  );
}
