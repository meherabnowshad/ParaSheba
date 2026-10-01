'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DHAKA_AREAS } from '@parasheba/ui';
import {
  Store,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Truck,
  ArrowRight,
} from 'lucide-react';

export default function RegisterBusinessPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    category: 'PHARMACY',
    area: 'Dhanmondi',
    tradeLicense: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-8 sm:p-12 text-white shadow-xl">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-800/80 px-3 py-1 text-xs font-bold text-emerald-200 border border-emerald-600/50">
            <Store className="h-3.5 w-3.5" />
            ParaSheba Merchant Network
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight">
            Bring Your Neighborhood Shop Online in 35-Minutes
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Register your local pharmacy, grocery supermarket, tailoring atelier, or restaurant. Reach thousands of verified residents in your para with our instant delivery rider fleet.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 mb-1">
              Business Registration Form
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Enter your trade license details to obtain the ParaSheba Verified Merchant seal.
            </p>

            {submitted ? (
              <div className="rounded-2xl bg-teal-50 p-8 text-center border border-teal-200 space-y-3">
                <CheckCircle2 className="mx-auto h-12 w-12 text-teal-700" />
                <h3 className="text-lg font-bold text-slate-900">
                  Business Registration Submitted!
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Our merchant success manager will visit <strong>{formData.businessName}</strong> within 24 hours to set up your product catalog and barcode scanner.
                </p>
                <div className="pt-2">
                  <Link
                    href="/business/dashboard"
                    className="inline-flex rounded-xl bg-teal-700 px-5 py-2.5 text-xs font-bold text-white hover:bg-teal-800"
                  >
                    Preview Business Dashboard Demo
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Business / Shop Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lazz Pharma (Dhanmondi)"
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData({ ...formData, businessName: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 p-3 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Proprietor / Owner Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mohammad Lutfur Rahman"
                      value={formData.ownerName}
                      onChange={(e) =>
                        setFormData({ ...formData, ownerName: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 p-3 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Business Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 p-3 focus:outline-none focus:border-teal-500"
                    >
                      <option value="PHARMACY">Pharmacy & Healthcare</option>
                      <option value="GROCERY">Grocery & Super shop</option>
                      <option value="RESTAURANT">Restaurant / Bakery</option>
                      <option value="LOCAL_SHOP">General Departmental Store</option>
                      <option value="REPAIR_SHOP">Electronics & Hardware</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Contact Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="017xxxxxxxx"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 p-3 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Location / Neighborhood
                    </label>
                    <select
                      value={formData.area}
                      onChange={(e) =>
                        setFormData({ ...formData, area: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 p-3 focus:outline-none focus:border-teal-500"
                    >
                      {DHAKA_AREAS.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Trade License Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="TRAD/DNCC/XXXXXX"
                      value={formData.tradeLicense}
                      onChange={(e) =>
                        setFormData({ ...formData, tradeLicense: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 p-3 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Includes dedicated delivery riders and POS integration.
                  </span>
                  <button
                    type="submit"
                    className="rounded-xl bg-teal-700 px-6 py-3 text-xs font-bold text-white shadow-xs hover:bg-teal-800 transition"
                  >
                    Register Business
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4 text-xs">
            <h3 className="font-bold uppercase tracking-wider text-slate-500">
              Merchant Privileges
            </h3>
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-teal-600 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900">Dedicated Para Riders</h4>
                <p className="text-slate-500">Riders pick up within 5 mins of packing.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-teal-600 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900">Verified Merchant Badge</h4>
                <p className="text-slate-500">Stand out with verified trade license crest.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
