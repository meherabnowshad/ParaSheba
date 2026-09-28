'use client';

import React from 'react';
import Link from 'next/link';
import { ProviderProfile } from '@parasheba/types';
import { formatBDT } from '@parasheba/ui';
import {
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  Briefcase,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

interface ProviderCardProps {
  provider: ProviderProfile;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const avatarUrl =
    provider.user?.avatarUrl ||
    `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200`;

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-teal-500 hover:shadow-md">
      {/* Top Header: Avatar + Info */}
      <div>
        <div className="flex items-start gap-3.5">
          <div className="relative">
            <img
              src={avatarUrl}
              alt={provider.user?.fullName || 'Provider'}
              className="h-16 w-16 rounded-2xl object-cover border border-slate-200 shadow-xs"
            />
            {provider.isAvailableToday && (
              <span
                title="Available for booking today"
                className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-xs"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-100 animate-pulse" />
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-base font-bold text-slate-900 truncate">
                {provider.user?.fullName}
              </h3>
              {provider.nidVerified && (
                <span
                  title="NID and National Identity Verified"
                  className="inline-flex items-center gap-0.5 rounded bg-teal-50 px-1.5 py-0.5 text-[10px] font-bold text-teal-700 border border-teal-200"
                >
                  <ShieldCheck className="h-3 w-3 text-teal-600" />
                  NID Verified
                </span>
              )}
            </div>

            <p className="text-xs font-medium text-slate-600 line-clamp-1 mt-0.5">
              {provider.headline}
            </p>

            {/* Ratings & Completed count */}
            <div className="mt-1.5 flex items-center gap-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 font-bold text-slate-800">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {provider.rating.toFixed(1)}
                <span className="font-normal text-slate-500">
                  ({provider.reviewCount})
                </span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Briefcase className="h-3 w-3 text-slate-400" />
                {provider.experienceYears} yrs exp.
              </span>
            </div>
          </div>
        </div>

        {/* Bio preview */}
        <p className="mt-3.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {provider.bio}
        </p>

        {/* Service areas pills */}
        <div className="mt-3 flex items-center gap-1.5 flex-wrap">
          <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
          <div className="flex flex-wrap gap-1">
            {provider.serviceAreas.slice(0, 3).map((area) => (
              <span
                key={area}
                className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
              >
                {area}
              </span>
            ))}
            {provider.serviceAreas.length > 3 && (
              <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                +{provider.serviceAreas.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer: Price + CTAs */}
      <div className="mt-5 border-t border-slate-100 pt-3.5 flex items-center justify-between">
        <div>
          <span className="block text-[11px] text-slate-400 font-medium">
            Starting from
          </span>
          <span className="text-base font-extrabold text-teal-800">
            {formatBDT(provider.basePrice)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/providers/${provider.id}`}
            className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Profile
          </Link>
          <Link
            href={`/booking/${provider.id}?type=provider`}
            className="rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-teal-800 transition"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
