'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MOCK_ACTIVE_BOOKINGS,
  MOCK_MEASUREMENTS,
  MOCK_TAILORING_ORDERS,
} from '@/lib/api';
import { useAuthStore } from '@/stores/useAuthStore';
import { formatBDT } from '@parasheba/ui';
import { BookingStatus, TailoringStage } from '@parasheba/types';
import {
  User,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Scissors,
  ShieldCheck,
  Phone,
  Plus,
  AlertCircle,
  Package,
  Settings,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export default function CustomerDashboardPage() {
  const { user, loginAsDemoUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'bookings' | 'karigor' | 'measurements'>('bookings');

  const bookings = MOCK_ACTIVE_BOOKINGS;
  const tailoringOrders = MOCK_TAILORING_ORDERS;
  const measurements = MOCK_MEASUREMENTS;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Customer Header Banner */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-100 text-teal-800 text-xl font-bold">
              {user?.fullName?.charAt(0) || 'K'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {user?.fullName || 'Kamrul Hasan'}
                </h1>
                <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-800 border border-teal-200">
                  Customer
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {user?.phone || '01712345678'} • Dhanmondi, Dhaka
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/search"
              className="rounded-xl bg-teal-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-teal-800 transition"
            >
              Book New Service
            </Link>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="mt-8 flex items-center gap-4 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition ${
              activeTab === 'bookings'
                ? 'border-teal-700 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Service Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('karigor')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition ${
              activeTab === 'karigor'
                ? 'border-teal-700 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Karigor Tailoring ({tailoringOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('measurements')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition ${
              activeTab === 'measurements'
                ? 'border-teal-700 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Saved Measurement Profiles ({measurements.length})
          </button>
        </div>
      </div>

      {/* TAB 1: SERVICE BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Active Bookings</h2>

          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                      {booking.trackingCode}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Provider On the Way
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-slate-900">
                    {booking.service?.name}
                  </h3>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[11px] text-slate-400 block font-bold">
                    Total Amount
                  </span>
                  <span className="text-xl font-black text-slate-900">
                    {formatBDT(booking.totalAmount)}
                  </span>
                  <span className="block text-[11px] text-amber-700 font-semibold">
                    Cash on Delivery
                  </span>
                </div>
              </div>

              {/* Provider Info & Live ETA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={booking.provider?.user?.avatarUrl}
                      alt={booking.provider?.user?.fullName}
                      className="h-12 w-12 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1">
                        {booking.provider?.user?.fullName}
                        <ShieldCheck className="h-4 w-4 text-teal-600" />
                      </h4>
                      <p className="text-xs text-slate-500">
                        {booking.provider?.headline}
                      </p>
                    </div>
                  </div>

                  <a
                    href="tel:01811111111"
                    className="flex items-center gap-1 rounded-xl bg-teal-700 px-3 py-2 text-xs font-bold text-white hover:bg-teal-800 transition"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    Call
                  </a>
                </div>

                <div className="rounded-2xl bg-teal-50/70 p-4 border border-teal-100 text-xs space-y-1">
                  <p className="font-bold text-teal-950 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-teal-700" />
                    Arrival Window: {booking.scheduledTimeSlot}
                  </p>
                  <p className="text-teal-800">
                    <strong>Address:</strong> {booking.address}, {booking.area}
                  </p>
                  <p className="text-teal-700">
                    <strong>Note:</strong> {booking.notes}
                  </p>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="border-t border-slate-100 pt-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  Live Dispatch Log
                </span>
                <div className="space-y-2">
                  {booking.statusHistory.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className="h-2 w-2 rounded-full bg-teal-600" />
                      <span className="font-bold text-slate-800">
                        {h.timestamp}:
                      </span>
                      <span className="text-slate-600">{h.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: KARIGOR TAILORING */}
      {activeTab === 'karigor' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              Your Tailoring Orders
            </h2>
            <Link
              href="/karigor"
              className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg hover:bg-amber-100"
            >
              + New Tailoring Request
            </Link>
          </div>

          {tailoringOrders.map((order) => (
            <div
              key={order.id}
              className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                    {order.orderNumber}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    {order.garmentType} Bespoke Tailoring
                  </h3>
                </div>

                <div className="text-xs">
                  <span className="text-slate-500">Current Stage:</span>
                  <span className="ml-1 font-bold text-amber-800 uppercase">
                    {order.currentStage}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-slate-500">Fabric Details:</p>
                  <p className="font-semibold text-slate-800">
                    {order.fabricDetails}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Estimated Delivery:</p>
                  <p className="font-semibold text-slate-800">
                    {order.estimatedDeliveryDate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: MEASUREMENT PROFILES */}
      {activeTab === 'measurements' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Saved Digital Measurement Profiles
              </h2>
              <p className="text-xs text-slate-500">
                Use your saved measurements anytime for instant tailoring reorders
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {measurements.map((m) => (
              <div
                key={m.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {m.profileName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {m.garmentType} ({m.gender})
                    </p>
                  </div>
                  <span className="rounded-lg bg-teal-50 px-2 py-1 text-xs font-bold text-teal-800">
                    Verified Fit
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  {Object.entries(m.measurements).map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-slate-50 p-2.5 text-center">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        {k}
                      </span>
                      <span className="font-bold text-slate-800">{v}&quot;</span>
                    </div>
                  ))}
                </div>

                {m.notes && (
                  <p className="text-xs text-slate-500 italic">
                    Note: &quot;{m.notes}&quot;
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
