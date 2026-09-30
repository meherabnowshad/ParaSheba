'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_TAILORING_ORDERS, MOCK_MEASUREMENTS, MOCK_PROVIDERS } from '@/lib/api';
import { TailoringStage } from '@parasheba/types';
import { formatBDT } from '@parasheba/ui';
import {
  Scissors,
  Ruler,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Truck,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Shirt,
  User,
} from 'lucide-react';

const GARMENT_TYPES = [
  { id: 'panjabi', name: 'Panjabi (পাঞ্জাবি)', price: 650, icon: '🥻', desc: 'Classic, Kabli or Semi-fitted tailored Panjabi' },
  { id: 'shirt', name: 'Formal Shirt (শার্ট)', price: 450, icon: '👔', desc: 'Crisp spread collar, slim or regular fit executive shirt' },
  { id: 'trouser', name: 'Formal Trouser (প্যান্ট)', price: 500, icon: '👖', desc: 'Precision pleated or flat-front formal trousers' },
  { id: 'suit', name: 'Executive Suit (স্যুট / ব্লেজার)', price: 4500, icon: '🧥', desc: 'Two-piece tailored bespoke suit with canvassed lapel' },
  { id: 'salwar', name: 'Salwar Kameez (সালোয়ার কামিজ)', price: 750, icon: '👗', desc: 'Three-piece ladies custom tailoring and finishing' },
];

const STAGES = [
  { stage: TailoringStage.MEASUREMENT, label: 'Measurement Taken' },
  { stage: TailoringStage.FABRIC, label: 'Fabric Received' },
  { stage: TailoringStage.CUTTING, label: 'Pattern & Cutting' },
  { stage: TailoringStage.STITCHING, label: 'Artisan Stitching' },
  { stage: TailoringStage.QUALITY_CHECK, label: 'Quality & Press' },
  { stage: TailoringStage.DELIVERY, label: 'Doorstep Delivery' },
];

export default function KarigorPage() {
  const [selectedGarment, setSelectedGarment] = useState(GARMENT_TYPES[0]);
  const [doorstepMeasurement, setDoorstepMeasurement] = useState(true);
  const [fabricOption, setFabricOption] = useState<'PROVIDED_BY_CUSTOMER' | 'SOURCED_BY_KARIGOR'>('PROVIDED_BY_CUSTOMER');
  const [activeOrder, setActiveOrder] = useState(MOCK_TAILORING_ORDERS[0]);
  const [savedMeasurement, setSavedMeasurement] = useState(MOCK_MEASUREMENTS[0]);

  // Master Karigor providers
  const karigors = MOCK_PROVIDERS.filter((p) =>
    p.serviceCategories.includes('Karigor') || p.serviceCategories.includes('Tailoring')
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950 via-amber-900 to-amber-800 p-8 sm:p-12 text-white shadow-xl">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-800/80 px-3 py-1 text-xs font-bold text-amber-200 border border-amber-600/50">
            <Scissors className="h-3.5 w-3.5" />
            ParaSheba Karigor Hub • কারিগর
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight">
            Bespoke Doorstep Tailoring for Bangladesh
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-amber-100/90 leading-relaxed">
            Forget battling Dhaka traffic to visit the tailor shop. Book a Master Karigor to take measurements at your doorstep, pick up fabric, craft fine garments, and deliver to your home.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-amber-200">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-amber-400" />
              100% Perfect Fit Guarantee
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-amber-400" />
              Doorstep Fabric Pickup & Drop
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-amber-400" />
              Saved Digital Fit Profiles
            </span>
          </div>
        </div>
      </div>

      {/* Live Order Stage Tracker Showcase */}
      {activeOrder && (
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Live Order Tracking
              </span>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                Order #{activeOrder.orderNumber} ({activeOrder.garmentType})
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Estimated Delivery:</span>
              <strong className="text-slate-900">{activeOrder.estimatedDeliveryDate}</strong>
            </div>
          </div>

          {/* 6-Stage Stepper */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {STAGES.map((s, index) => {
              const currentStageIndex = STAGES.findIndex(
                (st) => st.stage === activeOrder.currentStage
              );
              const isDone = index <= currentStageIndex;
              const isCurrent = s.stage === activeOrder.currentStage;

              return (
                <div
                  key={s.stage}
                  className={`rounded-2xl border p-4 text-center transition ${
                    isCurrent
                      ? 'border-amber-500 bg-amber-50/80 shadow-xs ring-2 ring-amber-200'
                      : isDone
                      ? 'border-slate-200 bg-slate-50'
                      : 'border-slate-100 bg-white opacity-50'
                  }`}
                >
                  <div
                    className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                      isDone
                        ? 'bg-amber-600 text-white'
                        : 'border border-slate-200 text-slate-400'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                  </div>
                  <h4 className="mt-2 text-xs font-bold text-slate-900">
                    {s.label}
                  </h4>
                  {isCurrent && (
                    <span className="mt-1 inline-block text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                      In Progress
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <span>
              Fabric: <strong>{activeOrder.fabricDetails}</strong>
            </span>
            <Link
              href="/customer/dashboard"
              className="font-bold text-amber-800 hover:underline"
            >
              View Full Order History in Customer Dashboard →
            </Link>
          </div>
        </div>
      )}

      {/* Interactive Garment Selection & Order Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              1. Select Your Garment Type
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GARMENT_TYPES.map((g) => (
                <div
                  key={g.id}
                  onClick={() => setSelectedGarment(g)}
                  className={`flex items-start gap-3.5 rounded-2xl border p-4 cursor-pointer transition ${
                    selectedGarment.id === g.id
                      ? 'border-amber-600 bg-amber-50/40 ring-1 ring-amber-500'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <span className="text-3xl">{g.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900">{g.name}</h3>
                      <span className="text-xs font-extrabold text-amber-800">
                        {formatBDT(g.price)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Measurement Options */}
            <div className="mt-8 border-t border-slate-100 pt-6 space-y-4">
              <h2 className="text-base font-bold text-slate-900">
                2. Measurement Method
              </h2>

              <div className="space-y-3">
                <label
                  className={`flex items-start gap-3 rounded-2xl border p-4 cursor-pointer transition ${
                    doorstepMeasurement
                      ? 'border-amber-600 bg-amber-50/50'
                      : 'border-slate-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="measure"
                    checked={doorstepMeasurement}
                    onChange={() => setDoorstepMeasurement(true)}
                    className="mt-1 accent-amber-700"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      Doorstep Master Karigor Visit (Recommended)
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      An experienced master tailor visits your home with measurement tape and fabric sample book.
                    </p>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-3 rounded-2xl border p-4 cursor-pointer transition ${
                    !doorstepMeasurement
                      ? 'border-amber-600 bg-amber-50/50'
                      : 'border-slate-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="measure"
                    checked={!doorstepMeasurement}
                    onChange={() => setDoorstepMeasurement(false)}
                    className="mt-1 accent-amber-700"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      Use Saved Measurement Profile ({savedMeasurement.profileName})
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Chest: {savedMeasurement.measurements.chest}&quot;, Length: {savedMeasurement.measurements.length}&quot;, Sleeve: {savedMeasurement.measurements.sleeve}&quot;
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Fabric Source */}
            <div className="mt-8 border-t border-slate-100 pt-6 space-y-4">
              <h2 className="text-base font-bold text-slate-900">
                3. Fabric Source
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFabricOption('PROVIDED_BY_CUSTOMER')}
                  className={`rounded-2xl border p-4 text-left transition ${
                    fabricOption === 'PROVIDED_BY_CUSTOMER'
                      ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-500'
                      : 'border-slate-200'
                  }`}
                >
                  <h4 className="text-xs font-bold text-slate-900">
                    I Have My Own Fabric
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Free doorstep pickup of your cut-piece fabric by our rider.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFabricOption('SOURCED_BY_KARIGOR')}
                  className={`rounded-2xl border p-4 text-left transition ${
                    fabricOption === 'SOURCED_BY_KARIGOR'
                      ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-500'
                      : 'border-slate-200'
                  }`}
                >
                  <h4 className="text-xs font-bold text-slate-900">
                    Source Premium Fabric for Me
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Karigor brings 100% Cotton, Linen, and Jacquard fabric swatches to choose from.
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sticky Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Karigor Order Summary
            </h3>

            <div className="rounded-2xl bg-amber-50/50 p-4 border border-amber-200/60">
              <span className="text-[11px] font-semibold text-amber-700">Garment</span>
              <h4 className="text-base font-extrabold text-slate-900">
                {selectedGarment.name}
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Stitching rate: <strong>{formatBDT(selectedGarment.price)}</strong>
              </p>
            </div>

            <div className="space-y-2 text-xs border-b border-slate-100 pb-4">
              <div className="flex justify-between text-slate-600">
                <span>Doorstep Measurement Visit</span>
                <span className="font-bold text-emerald-700">FREE</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Fabric Pickup & Delivery</span>
                <span className="font-bold text-slate-900">৳60</span>
              </div>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-sm font-bold text-slate-900">
                Total Tailoring Cost
              </span>
              <span className="text-2xl font-black text-amber-900">
                {formatBDT(selectedGarment.price + 60)}
              </span>
            </div>

            <Link
              href={`/booking/srv-panjabi?type=karigor`}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 py-3.5 text-xs font-bold text-white shadow-md hover:bg-amber-700 transition"
            >
              <Scissors className="h-4 w-4" />
              Book Measurement Visit
            </Link>

            <p className="text-center text-[10px] text-slate-400">
              Guaranteed delivery within 5 business days with free alterations.
            </p>
          </div>
        </div>
      </div>

      {/* Master Karigor Showcase */}
      <section className="border-t border-slate-200/80 pt-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Meet Our Master Karigors
          </h2>
          <p className="text-xs text-slate-500">
            Senior bespoke artisans with over a decade of tailoring excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {karigors.map((k) => (
            <div
              key={k.id}
              className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4">
                  <img
                    src={k.user?.avatarUrl}
                    alt={k.user?.fullName}
                    className="h-16 w-16 rounded-2xl object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {k.user?.fullName}
                    </h3>
                    <p className="text-xs text-amber-700 font-semibold">
                      {k.headline}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {k.experienceYears} Years Crafting • {k.completedJobsCount} Panjabis & Suits
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-600 line-clamp-2">
                  {k.bio}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs font-bold text-slate-800">
                  Rating: ★ {k.rating.toFixed(1)} ({k.reviewCount})
                </span>
                <Link
                  href={`/providers/${k.id}`}
                  className="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-600 hover:text-white transition"
                >
                  View Artisan Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
