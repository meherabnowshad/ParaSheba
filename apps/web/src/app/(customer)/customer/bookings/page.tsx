'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_ACTIVE_BOOKINGS } from '@/lib/api';
import { BookingStatus } from '@parasheba/types';
import { formatBDT } from '@parasheba/ui';
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Phone,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';

export default function CustomerBookingsPage() {
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'COMPLETED'>('ALL');

  const bookings = MOCK_ACTIVE_BOOKINGS;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/customer/dashboard" className="hover:text-teal-700">
          Dashboard
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-slate-900">All Bookings</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            My Service Bookings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete history of your booked technicians and home services
          </p>
        </div>

        <Link
          href="/search"
          className="rounded-xl bg-teal-700 px-4 py-2 text-xs font-bold text-white hover:bg-teal-800 transition"
        >
          Book New Service
        </Link>
      </div>

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                  {b.trackingCode}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {b.service?.name}
                </h3>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs font-bold text-slate-900">
                  {formatBDT(b.totalAmount)}
                </span>
                <span className="block text-[11px] text-emerald-700 font-semibold">
                  Provider On The Way
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-teal-700" />
                <span>
                  {b.scheduledDate} ({b.scheduledTimeSlot})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-teal-700" />
                <span className="truncate">
                  {b.address}, {b.area}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-teal-700" />
                <span>Technician: {b.provider?.user?.fullName}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
