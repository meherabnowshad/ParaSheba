'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_EMERGENCIES } from '@/lib/api';
import { EmergencyServiceType } from '@parasheba/types';
import {
  AlertCircle,
  PhoneCall,
  Ambulance,
  Car,
  Zap,
  Flame,
  Clock,
  ShieldAlert,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

export default function EmergencyPage() {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredEmergencies = MOCK_EMERGENCIES.filter((em) => {
    if (filterType !== 'all' && em.serviceType !== filterType) {
      return false;
    }
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* High-Alert Emergency Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-red-950 via-red-900 to-amber-950 p-8 sm:p-12 text-white shadow-2xl border border-red-700/50">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-800/80 px-3.5 py-1 text-xs font-bold text-red-100 border border-red-500/50 animate-pulse">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            24/7 Emergency Dispatch Center • জরুরি সেবা
          </div>

          <h1 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight">
            Immediate Ambulance, Roadside & Hazard Response
          </h1>

          <p className="mt-3 text-sm text-red-100/90 leading-relaxed">
            In an emergency, every second counts. Connect directly with verified ICU ambulances, highway towing flatbeds, and priority hazard technicians without delays.
          </p>

          {/* Quick National Emergency Hotlines Bar */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href="tel:999"
              className="flex items-center justify-between rounded-2xl bg-white/10 hover:bg-white/20 p-4 border border-white/20 transition"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-red-200">
                  National Emergency
                </span>
                <p className="text-xl font-black">999</p>
              </div>
              <PhoneCall className="h-5 w-5 text-red-200" />
            </a>

            <a
              href="tel:16263"
              className="flex items-center justify-between rounded-2xl bg-white/10 hover:bg-white/20 p-4 border border-white/20 transition"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-red-200">
                  Health Hotline (DGHS)
                </span>
                <p className="text-xl font-black">16263</p>
              </div>
              <PhoneCall className="h-5 w-5 text-red-200" />
            </a>

            <a
              href="tel:102"
              className="flex items-center justify-between rounded-2xl bg-white/10 hover:bg-white/20 p-4 border border-white/20 transition"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-red-200">
                  Fire & Rescue Service
                </span>
                <p className="text-xl font-black">102</p>
              </div>
              <PhoneCall className="h-5 w-5 text-red-200" />
            </a>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'All Emergency Units', icon: AlertCircle },
          {
            id: EmergencyServiceType.AMBULANCE,
            label: 'ICU & AC Ambulance',
            icon: Ambulance,
          },
          {
            id: EmergencyServiceType.ROADSIDE_ASSISTANCE,
            label: 'Roadside Towing & Rescue',
            icon: Car,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition shrink-0 ${
              filterType === tab.id
                ? 'bg-red-700 text-white shadow-xs'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Emergency Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmergencies.map((em) => (
          <div
            key={em.id}
            className="rounded-3xl border-2 border-red-200 bg-white p-6 shadow-sm hover:border-red-500 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-bold text-red-700 border border-red-200">
                  <span className="h-2 w-2 rounded-full bg-red-600 animate-ping" />
                  Available 24/7
                </span>

                <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  <Clock className="h-3.5 w-3.5" />
                  ETA: ~{em.etaMinutes} mins
                </div>
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                {em.name}
              </h3>

              <p className="mt-1 text-xs font-medium text-slate-600">
                {em.vehicleType}
              </p>

              {/* Operating Zones */}
              <div className="mt-4 border-t border-slate-100 pt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Immediate Operating Zones
                </span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {em.operatingAreas.map((a) => (
                    <span
                      key={a}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Call CTAs */}
            <div className="mt-6 border-t border-slate-100 pt-4 space-y-2">
              <a
                href={`tel:${em.phone}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-bold text-white shadow-md hover:bg-red-700 transition"
              >
                <PhoneCall className="h-4 w-4" />
                Call Driver Now ({em.phone})
              </a>

              {em.altPhone && (
                <a
                  href={`tel:${em.altPhone}`}
                  className="flex w-full items-center justify-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 py-1"
                >
                  Alternative Line: {em.altPhone}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Utility Repairs Note */}
      <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Need Urgent Hazard Technician (Gas Leak / Electrical Sparking)?
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Book our rapid emergency response electricians and plumbers for immediate 20-minute dispatch.
            </p>
          </div>
        </div>

        <Link
          href="/booking/srv-electrician"
          className="shrink-0 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-amber-700 transition"
        >
          Request Priority Technician
        </Link>
      </div>
    </div>
  );
}
