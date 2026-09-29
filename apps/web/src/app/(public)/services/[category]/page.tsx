'use client';

import React from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { MOCK_CATEGORIES, MOCK_SERVICES, MOCK_PROVIDERS } from '@/lib/api';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { ProviderCard } from '@/components/cards/ProviderCard';
import { ChevronRight, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';

export default function CategoryDetailPage() {
  const params = useParams();
  const categorySlug = params.category as string;

  const category = MOCK_CATEGORIES.find((c) => c.slug === categorySlug);

  if (!category) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Category Not Found</h1>
        <p className="mt-2 text-sm text-slate-500">
          The requested service category does not exist or has been relocated.
        </p>
        <Link
          href="/services"
          className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2 text-xs font-bold text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Services
        </Link>
      </div>
    );
  }

  // Filter services under this category
  const services = MOCK_SERVICES.filter((s) => s.categoryId === category.id);

  // Filter providers that offer services in this category
  const matchingProviders = MOCK_PROVIDERS.filter((p) =>
    p.serviceCategories.some(
      (c) =>
        c.toLowerCase().includes(category.name.toLowerCase()) ||
        category.name.toLowerCase().includes(c.toLowerCase())
    )
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-teal-700">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/services" className="hover:text-teal-700">Services</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-slate-900">{category.name}</span>
      </nav>

      {/* Category Header */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-teal-50 px-2 py-0.5 text-xs font-bold text-teal-800 border border-teal-200">
                {category.nameBn || 'সেবা'}
              </span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
              {category.name}
            </h1>
            <p className="mt-1 text-sm text-slate-600 max-w-2xl">
              {category.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/search"
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              Filter by Neighborhood
            </Link>
          </div>
        </div>
      </div>

      {/* Services in this category */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Available Services in {category.name} ({services.length})
          </h2>
        </div>

        {services.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
            No specific sub-services listed under this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {services.map((srv) => (
              <ServiceCard key={srv.id} service={srv} />
            ))}
          </div>
        )}
      </section>

      {/* Top providers in this category */}
      <section className="border-t border-slate-200/80 pt-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Specialized Providers for {category.name}
            </h2>
            <p className="text-xs text-slate-500">
              Verified artisans and technicians available for on-demand booking
            </p>
          </div>
        </div>

        {matchingProviders.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MOCK_PROVIDERS.slice(0, 4).map((prov) => (
              <ProviderCard key={prov.id} provider={prov} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {matchingProviders.map((prov) => (
              <ProviderCard key={prov.id} provider={prov} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
