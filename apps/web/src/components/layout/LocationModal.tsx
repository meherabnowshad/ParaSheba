'use client';

import React from 'react';
import { useLocationStore } from '@/stores/useLocationStore';
import { MapPin, X, Navigation, Check } from 'lucide-react';
import { DHAKA_AREAS, CHITTAGONG_AREAS, SYLHET_AREAS } from '@parasheba/ui';

export function LocationModal() {
  const { city, area, isModalOpen, setLocation, setModalOpen } = useLocationStore();

  if (!isModalOpen) return null;

  const handleSelect = (selectedCity: string, selectedArea: string) => {
    setLocation(selectedCity, selectedArea);
  };

  const handleUseCurrentLocation = () => {
    setLocation('Dhaka', 'Dhanmondi');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Choose Your Neighborhood</h3>
              <p className="text-xs text-slate-500">Show services and providers available near you</p>
            </div>
          </div>
          <button
            onClick={() => setModalOpen(false)}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={handleUseCurrentLocation}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50/50 py-2.5 px-4 text-sm font-semibold text-teal-800 hover:bg-teal-100 transition"
          >
            <Navigation className="h-4 w-4 text-teal-600 animate-pulse" />
            Use My Current GPS Location (Dhaka)
          </button>
        </div>

        <div className="mt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Dhaka Metro Areas</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {DHAKA_AREAS.map((a) => {
              const isSelected = city === 'Dhaka' && area === a;
              return (
                <button
                  key={a}
                  onClick={() => handleSelect('Dhaka', a)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium border text-left transition ${
                    isSelected
                      ? 'border-teal-600 bg-teal-600 text-white font-semibold shadow-sm'
                      : 'border-slate-200 hover:border-teal-400 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="truncate">{a}</span>
                  {isSelected && <Check className="h-3.5 w-3.5 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Other Divisions</h4>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleSelect('Chittagong', 'Agrabad')}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium border border-slate-200 hover:border-teal-400 hover:bg-slate-50 text-slate-700 text-left"
            >
              <span>Chittagong (Agrabad)</span>
            </button>
            <button
              onClick={() => handleSelect('Sylhet', 'Zindabazar')}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium border border-slate-200 hover:border-teal-400 hover:bg-slate-50 text-slate-700 text-left"
            >
              <span>Sylhet (Zindabazar)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
