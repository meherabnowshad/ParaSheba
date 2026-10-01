'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Users,
  MapPin,
  HeartHandshake,
  Award,
  ArrowRight,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-950 via-teal-900 to-teal-800 p-8 sm:p-12 text-white shadow-xl text-center">
        <span className="inline-block rounded-full bg-teal-800/80 px-3 py-1 text-xs font-bold text-teal-200 border border-teal-600/50">
          Our Story & Mission
        </span>
        <h1 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight">
          About ParaSheba (পড়াশেবা)
        </h1>
        <p className="mt-3 text-sm text-teal-100/90 max-w-2xl mx-auto leading-relaxed">
          ParaSheba was founded with a singular conviction: Whatever you need around your neighborhood, you should be able to find it with absolute trust, fair pricing, and dignity for every worker.
        </p>
      </div>

      {/* Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 mb-4">
            <MapPin className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Neighborhood First (পাড়া কেন্দ্রিক)
          </h3>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            We do not believe in sending technicians across town through Dhaka gridlock. We empower artisans, tailors, and shops right inside your immediate ward and para.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 mb-4">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Dignity & Protection
          </h3>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            All technicians undergo NID biometric screening and police checks. Providers receive fair standard wages without predatory platform exploitation.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 mb-4">
            <Award className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            30-Day Guarantee
          </h3>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            Every booking is backed by our customer satisfaction warranty. If a repair or tailor fit fails, our dedicated dispute team resolves it immediately.
          </p>
        </div>
      </div>

      {/* Leadership & HQ */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Headquarters & Operations
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          ParaSheba Technologies Bangladesh Ltd. operates operations hubs in Dhanmondi, Gulshan, Mirpur, Uttara, Chittagong Agrabad, and Sylhet Zindabazar.
        </p>

        <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-teal-800">
          <Link href="/services" className="hover:underline">
            Explore Services →
          </Link>
          <Link href="/become-a-provider" className="hover:underline">
            Join Provider Network →
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact Support →
          </Link>
        </div>
      </div>
    </div>
  );
}
