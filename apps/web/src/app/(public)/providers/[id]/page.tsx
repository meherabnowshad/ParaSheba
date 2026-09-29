'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_PROVIDERS } from '@/lib/api';
import { formatBDT } from '@parasheba/ui';
import {
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  Briefcase,
  CheckCircle2,
  Calendar,
  Share2,
  Heart,
  ChevronRight,
  Phone,
  MessageSquare,
  Award,
  AlertCircle,
} from 'lucide-react';

export default function ProviderProfilePage() {
  const params = useParams();
  const router = useRouter();
  const providerId = params.id as string;

  const provider =
    MOCK_PROVIDERS.find((p) => p.id === providerId) || MOCK_PROVIDERS[0];

  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-teal-700">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/search" className="hover:text-teal-700">Providers</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-slate-900">{provider.user?.fullName}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info Card */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className="relative">
                <img
                  src={
                    provider.user?.avatarUrl ||
                    'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300'
                  }
                  alt={provider.user?.fullName}
                  className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover border-2 border-slate-200 shadow-sm"
                />
                {provider.isAvailableToday && (
                  <span className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-xs">
                    <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                  </span>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                      {provider.user?.fullName}
                    </h1>
                    {provider.nidVerified && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-teal-50 px-2 py-0.5 text-xs font-bold text-teal-800 border border-teal-200">
                        <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
                        NID Verified
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setSaved(!saved)}
                    className="rounded-full border border-slate-200 p-2 text-slate-400 hover:text-red-500 hover:border-red-200 transition"
                  >
                    <Heart className={`h-4 w-4 ${saved ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {provider.headline}
                </p>

                {/* Rating & Stats row */}
                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1 font-bold text-slate-900">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {provider.rating.toFixed(2)}
                    <span className="font-normal text-slate-500">
                      ({provider.reviewCount} customer reviews)
                    </span>
                  </span>

                  <span className="flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                    <strong>{provider.experienceYears} Years</strong> Experience
                  </span>

                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
                    <strong>{provider.completedJobsCount}</strong> Jobs Completed
                  </span>
                </div>

                {/* Badges */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {provider.badges.map((b) => (
                    <span
                      key={b}
                      className="rounded-lg bg-teal-50/70 px-2.5 py-1 text-xs font-medium text-teal-800 border border-teal-100"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* About / Bio */}
            <div className="mt-6 border-t border-slate-100 pt-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Professional Bio & Qualifications
              </h2>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {provider.bio}
              </p>
            </div>

            {/* Service Areas */}
            <div className="mt-6 border-t border-slate-100 pt-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Covered Service Neighborhoods
              </h2>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {provider.serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700"
                  >
                    <MapPin className="h-3.5 w-3.5 text-teal-700" />
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="mt-6 rounded-2xl bg-amber-50/60 p-4 border border-amber-200/80">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <AlertCircle className="h-4 w-4 text-amber-700" />
                Cancellation & Rescheduling Terms
              </div>
              <p className="mt-1 text-xs text-amber-800 leading-relaxed">
                {provider.cancellationPolicy}
              </p>
            </div>
          </div>

          {/* Portfolio & Past Work Showcase */}
          {provider.portfolio.length > 0 && (
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs">
              <h2 className="text-base font-bold text-slate-900 mb-4">
                Verified Work Gallery
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {provider.portfolio.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Work photo ${i + 1}`}
                    className="h-40 w-full rounded-2xl object-cover border border-slate-200"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Reviews section */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">
                Verified Customer Reviews ({provider.reviewCount})
              </h2>
              <span className="flex items-center gap-1 text-sm font-bold text-slate-900">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {provider.rating.toFixed(2)} out of 5.0
              </span>
            </div>

            {/* Sample verified reviews */}
            <div className="space-y-4 divide-y divide-slate-100">
              <div className="pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    Mohammad Ashraful (Dhanmondi 7A)
                  </span>
                  <span className="text-[11px] text-slate-400">2 days ago</span>
                </div>
                <div className="flex items-center gap-1 my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600">
                  Extremely professional and on time. Quickly diagnosed a dangerous short-circuit behind our refrigerator socket and fixed the circuit breaker. Highly recommended!
                </p>
              </div>

              <div className="pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    Farzana Rahman (Lalmatia)
                  </span>
                  <span className="text-[11px] text-slate-400">1 week ago</span>
                </div>
                <div className="flex items-center gap-1 my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600">
                  Very polite and transparent about the spare parts pricing. Saved me a lot of hassle. Will definitely book again through ParaSheba.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Sticky Booking Action Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-md space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Starting Visit Fee
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-teal-800">
                  {formatBDT(provider.basePrice)}
                </span>
                <span className="text-xs text-slate-500">
                  / inspection & diagnosis
                </span>
              </div>
            </div>

            {/* Quick Status */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Availability</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Available Today
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Safety Check</span>
                <span className="font-semibold text-teal-700 flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Police & NID Cleared
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500">Service Guarantee</span>
                <span className="font-semibold text-slate-800">
                  30-Day Warranty
                </span>
              </div>
            </div>

            {/* Primary Action Button */}
            <Link
              href={`/booking/${provider.id}?type=provider`}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 py-3.5 text-sm font-bold text-white shadow-md hover:bg-teal-800 transition"
            >
              <Calendar className="h-4 w-4" />
              Book Appointment Now
            </Link>

            <p className="text-center text-[11px] text-slate-400">
              No prepayment required. Pay cash or bKash after job completion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
