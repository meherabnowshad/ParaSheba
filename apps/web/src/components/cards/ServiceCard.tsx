'use client';

import React from 'react';
import Link from 'next/link';
import { ServiceItem } from '@parasheba/types';
import { formatBDT } from '@parasheba/ui';
import {
  Wrench,
  Zap,
  Droplet,
  Wind,
  Sparkles,
  Scissors,
  HeartHandshake,
  Car,
  Clock,
  ArrowRight,
  Flame,
} from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
  variant?: 'compact' | 'standard';
}

const ICON_MAP: Record<string, React.ElementType> = {
  Zap,
  Droplet,
  Wind,
  Sparkles,
  Scissors,
  HeartHandshake,
  Car,
  Wrench,
};

export function ServiceCard({ service, variant = 'standard' }: ServiceCardProps) {
  const IconComponent = (service.icon && ICON_MAP[service.icon]) || Wrench;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-teal-400 hover:shadow-md">
      {/* Top Banner / Badges */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700 border border-teal-100/80 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-200">
            <IconComponent className="h-6 w-6" />
          </div>

          {service.popular && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200/80">
              <Flame className="h-3 w-3 fill-amber-500 text-amber-500" />
              Popular
            </span>
          )}
        </div>

        {/* Title & Bengali Subtitle */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
          {service.name}
        </h3>
        {service.nameBn && (
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            {service.nameBn}
          </p>
        )}

        {/* Description */}
        <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {service.description}
        </p>

        {/* Duration / SLA info */}
        {service.durationEstimate && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>Avg. {service.durationEstimate}</span>
          </div>
        )}
      </div>

      {/* Pricing & CTA */}
      <div className="mt-5 border-t border-slate-100 pt-3.5 flex items-center justify-between">
        <div>
          <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-medium">
            {service.priceUnit || 'Starting from'}
          </span>
          <span className="text-base font-extrabold text-teal-800">
            {formatBDT(service.startingPrice)}
          </span>
        </div>

        <Link
          href={`/booking/${service.id}`}
          className="inline-flex items-center gap-1 rounded-lg bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700 transition hover:bg-teal-600 hover:text-white"
        >
          Book Now
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
