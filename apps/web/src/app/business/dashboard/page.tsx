'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_BUSINESSES, MOCK_PRODUCTS } from '@/lib/api';
import { formatBDT } from '@parasheba/ui';
import {
  Store,
  Package,
  Truck,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Plus,
} from 'lucide-react';

export default function BusinessDashboardPage() {
  const business = MOCK_BUSINESSES[0];
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  const toggleStock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Store Banner */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={business.logoUrl}
              alt={business.businessName}
              className="h-16 w-16 rounded-2xl object-cover border border-slate-200"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {business.businessName}
                </h1>
                <span className="rounded-md bg-teal-50 px-2 py-0.5 text-xs font-bold text-teal-800 border border-teal-200">
                  Merchant
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Trade License: {business.tradeLicenseNumber} • {business.address}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-800 border border-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Store Open (24 Hours)
            </span>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Today's Delivered Sales
          </span>
          <p className="mt-2 text-2xl font-black text-teal-900">৳14,850</p>
          <span className="mt-1 text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> 28 orders today
          </span>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Active Dispatched Orders
          </span>
          <p className="mt-2 text-2xl font-black text-slate-900">3</p>
          <span className="mt-1 text-[11px] text-slate-500">
            Riders on route to customer
          </span>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Active Catalog SKUs
          </span>
          <p className="mt-2 text-2xl font-black text-slate-900">
            {products.length}
          </p>
          <span className="mt-1 text-[11px] text-emerald-600">
            All items in stock
          </span>
        </div>
      </div>

      {/* Inventory & Products Table */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Store Catalog Inventory
            </h2>
            <p className="text-xs text-slate-500">
              Manage product pricing, availability and inventory
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="h-12 w-12 rounded-xl object-cover bg-slate-50"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{prod.name}</h4>
                  <p className="text-slate-500">
                    Category: {prod.category} • Unit: {prod.unit}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">
                    Retail Price
                  </span>
                  <span className="font-bold text-slate-900">
                    {formatBDT(prod.price)}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">
                    Stock Status
                  </span>
                  <button
                    onClick={() => toggleStock(prod.id)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-bold ${
                      prod.inStock
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {prod.inStock ? 'In Stock' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
