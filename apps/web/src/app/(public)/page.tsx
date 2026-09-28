'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocationStore } from '@/stores/useLocationStore';
import { MOCK_CATEGORIES, MOCK_SERVICES, MOCK_PROVIDERS } from '@/lib/api';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { ProviderCard } from '@/components/cards/ProviderCard';
import {
  Search,
  MapPin,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Scissors,
  HeartHandshake,
  Car,
  Home,
  AlertCircle,
  Star,
  Users,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { city, area, setModalOpen, isLocating, detectCurrentLocation } =
    useLocationStore();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/search');
    }
  };

  // Filter providers that serve the current selected area or fallback to all
  const nearbyProviders = MOCK_PROVIDERS.filter(
    (p) =>
      p.serviceAreas.includes(area) ||
      p.serviceAreas.some((a) => a.toLowerCase().includes(area.toLowerCase()))
  );
  const displayedProviders =
    nearbyProviders.length > 0 ? nearbyProviders : MOCK_PROVIDERS;

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-white to-slate-50 border-b border-teal-100/50 pt-12 pb-20 md:pt-16 md:pb-24">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-1/4 -z-10 h-72 w-72 rounded-full bg-teal-200/30 blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-1/4 -z-10 h-64 w-64 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Neighborhood Location Badge */}
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-white/90 px-3.5 py-1 text-xs font-semibold text-teal-800 shadow-xs hover:border-teal-300 hover:bg-teal-50 transition"
            >
              <MapPin className="h-3.5 w-3.5 text-teal-600" />
              <span>
                Delivering in <strong className="underline">{area}, {city}</strong>
              </span>
              <span className="text-[10px] text-teal-600 bg-teal-100 px-1.5 py-0.5 rounded ml-1 font-bold">
                Change
              </span>
            </button>

            {/* Main Headline */}
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Everything You Need,{' '}
              <span className="text-teal-700 underline decoration-teal-300 decoration-wavy decoration-2">
                Right Around You.
              </span>
            </h1>

            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Find trusted local technicians, master karigor tailors, vetted caregivers,
              neighborhood shops, and 24/7 emergency help in your para.
            </p>

            {/* Search Box */}
            <form
              onSubmit={handleSearchSubmit}
              className="mt-8 flex flex-col sm:flex-row items-center gap-2 rounded-2xl bg-white p-2 shadow-lg shadow-teal-950/5 border border-slate-200"
            >
              <div className="relative flex-1 w-full flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Try 'Electrician', 'AC Service', 'Panjabi Stitching', 'Elderly Care'..."
                  className="w-full rounded-xl py-3.5 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={detectCurrentLocation}
                  disabled={isLocating}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition shrink-0"
                  title="Detect GPS neighborhood"
                >
                  <MapPin className="h-3.5 w-3.5 text-teal-600" />
                  <span className="hidden md:inline">
                    {isLocating ? 'Locating...' : 'Use My GPS'}
                  </span>
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-xl bg-teal-700 px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-teal-800 transition shrink-0"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Quick Keyword Pills */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500">
              <span className="font-semibold text-slate-600">Quick Searches:</span>
              {[
                'Electrician',
                'AC Repair',
                'Plumber',
                'Karigor Tailor',
                'Elderly Care',
                'Car Wash',
                'Lazz Pharma',
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => router.push(`/search?q=${encodeURIComponent(term)}`)}
                  className="rounded-full bg-white px-2.5 py-1 text-slate-700 border border-slate-200/80 hover:border-teal-500 hover:text-teal-700 transition"
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Trust Highlights */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-200/80 pt-6 text-left">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-100/60 text-teal-700">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">NID & Police Verified</h4>
                  <p className="text-[11px] text-slate-500">Identity-checked professionals</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-100/60 text-teal-700">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Fixed Upfront ৳ Rates</h4>
                  <p className="text-[11px] text-slate-500">No surprise or hidden charges</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100/70 text-amber-700">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">30-Min Quick Dispatch</h4>
                  <p className="text-[11px] text-slate-500">Fast local response guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY ICON BAR */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Browse by Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              All essential urban and neighborhood services organized for easy access
            </p>
          </div>
          <Link
            href="/services"
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-800"
          >
            All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {MOCK_CATEGORIES.map((cat) => {
            const getIcon = () => {
              switch (cat.slug) {
                case 'home-services':
                  return '🔧';
                case 'personal-family':
                  return '👨‍🏫';
                case 'karigor':
                  return '🧵';
                case 'caregiver':
                  return '🩺';
                case 'vehicle-services':
                  return '🚗';
                case 'marketplace':
                  return '🛍️';
                case 'rental':
                  return '🏢';
                case 'emergency':
                  return '🚨';
                default:
                  return '⚡';
              }
            };

            return (
              <Link
                key={cat.id}
                href={
                  cat.slug === 'karigor'
                    ? '/karigor'
                    : cat.slug === 'caregiver'
                    ? '/caregiver'
                    : cat.slug === 'rental'
                    ? '/rental'
                    : cat.slug === 'marketplace'
                    ? '/marketplace'
                    : cat.slug === 'emergency'
                    ? '/emergency'
                    : `/services/${cat.slug}`
                }
                className={`group flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-sm ${
                  cat.slug === 'emergency'
                    ? 'border-red-200 bg-red-50/50 hover:bg-red-50 hover:border-red-400'
                    : 'border-slate-200/90 bg-white hover:border-teal-400'
                }`}
              >
                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {getIcon()}
                </span>
                <span className="text-xs font-bold text-slate-800 group-hover:text-teal-700">
                  {cat.name}
                </span>
                {cat.nameBn && (
                  <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                    {cat.nameBn}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. POPULAR EVERYDAY SERVICES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-teal-600" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Most Requested Services
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Transparent standard rates, verified technicians, and free warranty
            </p>
          </div>
          <Link
            href="/services"
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-800"
          >
            View 40+ Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MOCK_SERVICES.map((srv) => (
            <ServiceCard key={srv.id} service={srv} />
          ))}
        </div>
      </section>

      {/* 4. HOW PARASHEBA WORKS */}
      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Frictionless & Reliable
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold">
              How ParaSheba Works in 4 Steps
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              Designed around how neighborhoods in Bangladesh actually function
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Search & Match',
                desc: 'Find vetted technicians, tailors, or daily goods within your specific neighborhood radius.',
                icon: Search,
              },
              {
                step: '02',
                title: 'Compare & Select',
                desc: 'Inspect NID verification status, past reviews, photo portfolios, and transparent upfront BDT rates.',
                icon: ShieldCheck,
              },
              {
                step: '03',
                title: 'Book Instantly',
                desc: 'Pick your preferred date slot or order 30-min doorstep arrival with real-time status updates.',
                icon: Clock,
              },
              {
                step: '04',
                title: 'Pay & Relax',
                desc: 'Pay cash after satisfaction or seamlessly via bKash, Nagad, or cards with guaranteed dispute protection.',
                icon: CheckCircle2,
              },
            ].map((st) => (
              <div
                key={st.step}
                className="relative rounded-2xl border border-slate-800 bg-slate-800/60 p-6 backdrop-blur-sm"
              >
                <span className="text-3xl font-black text-teal-400/40">
                  {st.step}
                </span>
                <div className="mt-3 flex items-center gap-2">
                  <st.icon className="h-5 w-5 text-teal-400" />
                  <h3 className="text-base font-bold text-white">{st.title}</h3>
                </div>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TOP PROVIDERS NEAR YOU */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Top Rated Providers in {area} & Nearby
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Verified professionals currently accepting jobs in your service zone
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setModalOpen(true)}
              className="text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200 hover:bg-teal-100 transition"
            >
              Change Area ({area})
            </button>
            <Link
              href="/search"
              className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5"
            >
              See All Providers →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayedProviders.map((prov) => (
            <ProviderCard key={prov.id} provider={prov} />
          ))}
        </div>
      </section>

      {/* 6. SPECIALIZED VERTICALS SPOTLIGHT */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
            Dedicated Specialized Hubs
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900">
            Built for Real Neighborhood Needs
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
            Distinct workflows customized for tailoring, elderly care, rentals, and emergency dispatch
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Karigor Tailor Card */}
          <div className="group rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:border-amber-400 hover:shadow-md transition">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <Scissors className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Karigor Tailoring
            </h3>
            <p className="text-xs font-medium text-amber-700">কারিগর দর্জি সেবা</p>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Book doorstep measurement visits. Save your custom fit profile for panjabi, suits, and dresses with real-time 6-stage stitching tracking.
            </p>
            <Link
              href="/karigor"
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900"
            >
              Explore Karigor Hub
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Caregiver Card */}
          <div className="group rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:border-teal-400 hover:shadow-md transition">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Caregiver & Nursing
            </h3>
            <p className="text-xs font-medium text-teal-700">কেয়ারগিভার সেবা</p>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Compassionate, background-checked nursing aides for elderly parents, post-operative recovery, and companion care. 8hr, 12hr or monthly plans.
            </p>
            <Link
              href="/caregiver"
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 hover:text-teal-900"
            >
              Explore Caregiver Plans
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Rental Hub Card */}
          <div className="group rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:border-blue-400 hover:shadow-md transition">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Home className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Rentals & Property
            </h3>
            <p className="text-xs font-medium text-blue-700">ভাড়া ও রেন্টাল</p>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Find verified family flats, microbuses with chauffeur for outstation trips, power generators, sound systems, and event equipment.
            </p>
            <Link
              href="/rental"
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 hover:text-blue-900"
            >
              Browse Rental Listings
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* 24/7 Emergency Card */}
          <div className="group rounded-2xl border border-red-200 bg-red-50/40 p-6 shadow-sm hover:border-red-400 hover:shadow-md transition">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-700">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-red-950">
              24/7 Emergency Hub
            </h3>
            <p className="text-xs font-medium text-red-700">জরুরি সেবা ২৪/৭</p>
            <p className="mt-2 text-xs text-slate-700 leading-relaxed">
              Immediate click-to-call dispatch for ICU/AC ambulances, highway towing, battery jumpstart, and urgent utility repair technicians.
            </p>
            <Link
              href="/emergency"
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-red-700 hover:text-red-800"
            >
              Emergency Dispatch Hub
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. BECOME A PROVIDER BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-900 via-teal-800 to-teal-950 p-8 sm:p-12 text-white shadow-xl">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-teal-700/60 px-3 py-1 text-xs font-bold text-teal-200 border border-teal-600/50">
              Earn With Pride
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight">
              Grow Your Trade or Business with ParaSheba
            </h2>
            <p className="mt-3 text-sm text-teal-100/90 leading-relaxed">
              Are you an electrician, plumber, master tailor, caregiver, mechanic, or local shopkeeper? Join thousands of trusted local professionals serving your own neighborhood.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/become-a-provider"
                className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-slate-900 shadow-md hover:bg-amber-400 transition"
              >
                Become a Service Provider
              </Link>
              <Link
                href="/register-business"
                className="rounded-xl border border-teal-500 bg-teal-800/60 px-5 py-3 text-sm font-bold text-white hover:bg-teal-700 transition"
              >
                Register Local Shop / Pharmacy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
