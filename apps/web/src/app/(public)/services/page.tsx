'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_CATEGORIES, MOCK_SERVICES } from '@/lib/api';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { Search, ArrowRight, ShieldCheck, Clock, ThumbsUp } from 'lucide-react';

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredServices = MOCK_SERVICES.filter((s) => {
    if (activeCategory !== 'all' && s.categoryId !== activeCategory) {
      return false;
    }
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.nameBn?.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-900 to-teal-800 p-8 sm:p-10 text-white shadow-md">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
            Official Directory
          </span>
          <h1 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight">
            ParaSheba All Services
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-teal-100">
            Discover all verified residential, personal, automotive, and emergency services available across Bangladesh with transparent BDT pricing.
          </p>

          {/* Quick Search */}
          <div className="relative mt-6 max-w-md">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search by service name or keyword..."
              className="w-full rounded-xl bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveCategory('all')}
          className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition ${
            activeCategory === 'all'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Categories ({MOCK_SERVICES.length})
        </button>

        {MOCK_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeCategory === cat.id
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Available Services ({filteredServices.length})
          </h2>
        </div>

        {filteredServices.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-sm font-semibold text-slate-700">
              No services found for &quot;{searchFilter}&quot;
            </p>
            <button
              onClick={() => {
                setSearchFilter('');
                setActiveCategory('all');
              }}
              className="mt-3 text-xs font-bold text-teal-700 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredServices.map((srv) => (
              <ServiceCard key={srv.id} service={srv} />
            ))}
          </div>
        )}
      </div>

      {/* Trust Badges Footer in Services */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">
              30-Day Service Warranty
            </h4>
            <p className="text-[11px] text-slate-500">
              Free rework if issue persists within 30 days
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">
              Scheduled or Immediate
            </h4>
            <p className="text-[11px] text-slate-500">
              Choose your exact 2-hour window or instant visit
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
            <ThumbsUp className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">
              Standard BDT Rate Card
            </h4>
            <p className="text-[11px] text-slate-500">
              Pay what you see, no unauthorized add-ons
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
