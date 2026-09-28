'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_SERVICES, MOCK_PROVIDERS, MOCK_CATEGORIES, MOCK_BUSINESSES } from '@/lib/api';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { ProviderCard } from '@/components/cards/ProviderCard';
import { useLocationStore } from '@/stores/useLocationStore';
import { DHAKA_AREAS, formatBDT } from '@parasheba/ui';
import {
  Search,
  Filter,
  SlidersHorizontal,
  ShieldCheck,
  Star,
  MapPin,
  X,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const { area: currentArea } = useLocationStore();

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [nidOnly, setNidOnly] = useState(false);
  const [availableTodayOnly, setAvailableTodayOnly] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'all' | 'services' | 'providers' | 'shops'>('all');

  // Filtered Services
  const filteredServices = useMemo(() => {
    return MOCK_SERVICES.filter((srv) => {
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchesName = srv.name.toLowerCase().includes(q);
        const matchesBn = srv.nameBn?.toLowerCase().includes(q);
        const matchesDesc = srv.description.toLowerCase().includes(q);
        if (!matchesName && !matchesBn && !matchesDesc) return false;
      }

      if (selectedCategory !== 'all') {
        const cat = MOCK_CATEGORIES.find((c) => c.slug === selectedCategory);
        if (cat && srv.categoryId !== cat.id) return false;
      }

      return true;
    });
  }, [query, selectedCategory]);

  // Filtered Providers
  const filteredProviders = useMemo(() => {
    return MOCK_PROVIDERS.filter((prov) => {
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchesName = prov.user?.fullName.toLowerCase().includes(q);
        const matchesHeadline = prov.headline.toLowerCase().includes(q);
        const matchesBio = prov.bio.toLowerCase().includes(q);
        const matchesCat = prov.serviceCategories.some((c) =>
          c.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesHeadline && !matchesBio && !matchesCat)
          return false;
      }

      if (selectedArea !== 'all') {
        const servesArea = prov.serviceAreas.some(
          (a) => a.toLowerCase() === selectedArea.toLowerCase()
        );
        if (!servesArea) return false;
      }

      if (nidOnly && !prov.nidVerified) {
        return false;
      }

      if (availableTodayOnly && !prov.isAvailableToday) {
        return false;
      }

      if (minRating > 0 && prov.rating < minRating) {
        return false;
      }

      return true;
    });
  }, [query, selectedArea, nidOnly, availableTodayOnly, minRating]);

  const totalResults =
    (activeTab === 'all' || activeTab === 'services' ? filteredServices.length : 0) +
    (activeTab === 'all' || activeTab === 'providers' ? filteredProviders.length : 0);

  const resetFilters = () => {
    setQuery('');
    setSelectedCategory('all');
    setSelectedArea('all');
    setNidOnly(false);
    setAvailableTodayOnly(false);
    setMinRating(0);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Search Bar */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Find Local Services & Providers
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Search by skill, technician name, or neighborhood zone in Bangladesh
        </p>

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search electrician, AC repair, panjabi tailor, caregiver..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 shadow-xs focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-700 shadow-xs focus:border-teal-500 focus:outline-none"
            >
              <option value="all">All Service Areas</option>
              {DHAKA_AREAS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="mt-6 flex items-center justify-between border-b border-slate-200">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-3 text-sm font-bold border-b-2 transition ${
                activeTab === 'all'
                  ? 'border-teal-700 text-teal-800'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              All Matches ({filteredServices.length + filteredProviders.length})
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`pb-3 text-sm font-bold border-b-2 transition ${
                activeTab === 'services'
                  ? 'border-teal-700 text-teal-800'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Services ({filteredServices.length})
            </button>
            <button
              onClick={() => setActiveTab('providers')}
              className={`pb-3 text-sm font-bold border-b-2 transition ${
                activeTab === 'providers'
                  ? 'border-teal-700 text-teal-800'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Providers ({filteredProviders.length})
            </button>
          </div>

          <span className="text-xs text-slate-500 hidden sm:inline">
            Showing results for <strong>{selectedArea === 'all' ? 'All Areas' : selectedArea}</strong>
          </span>
        </div>
      </div>

      {/* Main Content Layout with Sidebar Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filter Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
                <SlidersHorizontal className="h-4 w-4 text-teal-700" />
                Filter Results
              </span>
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-teal-700 hover:underline"
              >
                Reset All
              </button>
            </div>

            {/* Category Filter */}
            <div className="border-t border-slate-100 pt-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Category
              </label>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="cat"
                    checked={selectedCategory === 'all'}
                    onChange={() => setSelectedCategory('all')}
                    className="accent-teal-700"
                  />
                  All Categories
                </label>
                {MOCK_CATEGORIES.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="cat"
                      checked={selectedCategory === cat.slug}
                      onChange={() => setSelectedCategory(cat.slug)}
                      className="accent-teal-700"
                    />
                    {cat.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Verification & Availability Toggles */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Trust & Timing
              </label>

              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={nidOnly}
                  onChange={(e) => setNidOnly(e.target.checked)}
                  className="rounded border-slate-300 text-teal-700 accent-teal-700 focus:ring-teal-500"
                />
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
                  NID Verified Only
                </span>
              </label>

              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availableTodayOnly}
                  onChange={(e) => setAvailableTodayOnly(e.target.checked)}
                  className="rounded border-slate-300 text-teal-700 accent-teal-700 focus:ring-teal-500"
                />
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available Today
                </span>
              </label>
            </div>

            {/* Minimum Rating */}
            <div className="border-t border-slate-100 pt-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Minimum Rating
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[0, 4.0, 4.5, 4.8].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold border transition ${
                      minRating === rating
                        ? 'bg-teal-700 text-white border-teal-700'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {rating === 0 ? 'Any' : `${rating}+ ★`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Results Area */}
        <main className="lg:col-span-3 space-y-8">
          {totalResults === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <AlertCircle className="mx-auto h-10 w-10 text-slate-400" />
              <h3 className="mt-3 text-base font-bold text-slate-900">
                No matching services or providers found
              </h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                We couldn’t find any matches for &quot;{query}&quot; with your selected filters. Try broadening your area or resetting the filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 rounded-xl bg-teal-700 px-4 py-2 text-xs font-bold text-white hover:bg-teal-800 transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              {/* Services Section */}
              {(activeTab === 'all' || activeTab === 'services') &&
                filteredServices.length > 0 && (
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-slate-900">
                        Matching Services ({filteredServices.length})
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredServices.map((srv) => (
                        <ServiceCard key={srv.id} service={srv} />
                      ))}
                    </div>
                  </section>
                )}

              {/* Providers Section */}
              {(activeTab === 'all' || activeTab === 'providers') &&
                filteredProviders.length > 0 && (
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-slate-900">
                        Matching Providers ({filteredProviders.length})
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredProviders.map((prov) => (
                        <ProviderCard key={prov.id} provider={prov} />
                      ))}
                    </div>
                  </section>
                )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <React.Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-16 text-center text-xs text-slate-500">
          Loading search results...
        </div>
      }
    >
      <SearchContent />
    </React.Suspense>
  );
}
