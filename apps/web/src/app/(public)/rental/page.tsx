'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_RENTALS } from '@/lib/api';
import { RentalType } from '@parasheba/types';
import { formatBDT } from '@parasheba/ui';
import {
  Home,
  Car,
  Tv,
  MapPin,
  Star,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Search,
  Filter,
  Phone,
  X,
} from 'lucide-react';

export default function RentalPage() {
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedRental, setSelectedRental] = useState<any | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filteredRentals = MOCK_RENTALS.filter((r) => {
    if (filterType !== 'all' && r.type !== filterType) {
      return false;
    }
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-teal-950 p-8 sm:p-12 text-white shadow-xl">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-800/80 px-3 py-1 text-xs font-bold text-blue-200 border border-blue-600/50">
            <Home className="h-3.5 w-3.5" />
            ParaSheba Rentals • ভাড়া ও রেন্টাল
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight">
            Rent Homes, Vehicles & Equipment with Zero Broker Scams
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
            Direct owner listings. Verified NID ownership documentation. Transparent monthly or daily rates without deceptive third-party middleman fees.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'All Rentals', icon: null },
          { id: RentalType.PROPERTY, label: 'Flats & Apartments', icon: Home },
          { id: RentalType.VEHICLE, label: 'Cars & Microbus', icon: Car },
          { id: RentalType.EQUIPMENT, label: 'Generators & Tools', icon: Tv },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition shrink-0 ${
              filterType === tab.id
                ? 'bg-teal-700 text-white shadow-xs'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tab.icon && <tab.icon className="h-4 w-4" />}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Rental Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRentals.map((rental) => (
          <div
            key={rental.id}
            className="group rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:border-teal-500 hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              {/* Image banner */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={rental.images[0]}
                  alt={rental.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-slate-900 shadow-xs">
                  {rental.type}
                </span>
                <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-xs font-bold text-slate-900 shadow-xs">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {rental.rating}
                </span>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                  <MapPin className="h-3.5 w-3.5 text-teal-600" />
                  <span>
                    {rental.location}, {rental.city}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition line-clamp-1">
                  {rental.title}
                </h3>

                <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                  {rental.description}
                </p>

                {/* Specs Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {Object.entries(rental.specs).map(([key, val]) => (
                    <span
                      key={key}
                      className="rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700"
                    >
                      {String(val)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div className="border-t border-slate-100 p-5 flex items-center justify-between">
              <div>
                <span className="block text-[10px] uppercase font-bold text-slate-400">
                  {rental.pricePerMonth ? 'Monthly Rent' : 'Daily Rent'}
                </span>
                <span className="text-lg font-black text-teal-900">
                  {rental.pricePerMonth
                    ? `${formatBDT(rental.pricePerMonth)} /mo`
                    : `${formatBDT(rental.pricePerDay || 0)} /day`}
                </span>
              </div>

              <button
                onClick={() => {
                  setSelectedRental(rental);
                  setBookingSuccess(false);
                }}
                className="rounded-xl bg-teal-700 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-teal-800 transition"
              >
                Inquire / Book
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking / Inquiry Modal */}
      {selectedRental && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                  Verified Owner Contact
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedRental.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRental(null)}
                className="rounded-full p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="mx-auto h-12 w-12 text-teal-600" />
                <h4 className="text-base font-bold text-slate-900">
                  Rental Inquiry Sent!
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Owner <strong>{selectedRental.ownerName}</strong> has received your contact request. ParaSheba guarantees lease paperwork verification.
                </p>
                <button
                  onClick={() => setSelectedRental(null)}
                  className="mt-4 rounded-xl bg-teal-700 px-5 py-2 text-xs font-bold text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p>
                    <strong>Owner:</strong> {selectedRental.ownerName} (NID Verified)
                  </p>
                  <p className="mt-1">
                    <strong>Rules:</strong> {selectedRental.rules.join(' • ')}
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Kamrul Hasan"
                    className="w-full rounded-xl border border-slate-200 p-2.5 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Your Mobile Number
                  </label>
                  <input
                    type="tel"
                    defaultValue="01712345678"
                    className="w-full rounded-xl border border-slate-200 p-2.5 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setSelectedRental(null)}
                    className="rounded-xl border border-slate-200 px-4 py-2 font-bold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setBookingSuccess(true)}
                    className="rounded-xl bg-teal-700 px-5 py-2 font-bold text-white hover:bg-teal-800"
                  >
                    Submit Booking Request
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
