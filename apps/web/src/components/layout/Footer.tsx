import React from 'react';
import Link from 'next/link';
import { ShieldCheck, PhoneCall, MapPin, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="border-b border-slate-800 bg-slate-950/70 py-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">NID Verified Providers</h4>
              <p className="text-xs text-slate-400">Background and national identity checked professionals</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <span className="text-base font-bold">৳</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Transparent BDT Pricing</h4>
              <p className="text-xs text-slate-400">Clear rate cards, no hidden fees, pay cash or bKash</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <PhoneCall className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">24/7 Emergency Dispatch</h4>
              <p className="text-xs text-slate-400">Immediate ambulance & roadside support across Dhaka</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white font-black text-lg">
                প
              </div>
              <span className="text-xl font-black text-white">ParaSheba</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-4">
              Your neighborhood services platform. Discover, compare, book, order, and rent local services across Bangladesh with complete confidence and security.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="h-3.5 w-3.5 text-teal-400" />
              <span>Headquartered in Dhaka, Bangladesh</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Popular Services</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/services" className="hover:text-teal-400 transition">Electrician & Wiring</Link></li>
              <li><Link href="/services" className="hover:text-teal-400 transition">Plumbing & Sanitary</Link></li>
              <li><Link href="/services" className="hover:text-teal-400 transition">AC Service & Gas Top-up</Link></li>
              <li><Link href="/services" className="hover:text-teal-400 transition">Deep Home Cleaning</Link></li>
              <li><Link href="/services" className="hover:text-teal-400 transition">Appliance Repair</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Specialized Verticals</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/karigor" className="hover:text-teal-400 transition font-medium text-teal-300">Karigor Tailoring</Link></li>
              <li><Link href="/caregiver" className="hover:text-teal-400 transition font-medium text-teal-300">Caregiver & Nursing</Link></li>
              <li><Link href="/rental" className="hover:text-teal-400 transition">Apartments & Vehicles</Link></li>
              <li><Link href="/marketplace" className="hover:text-teal-400 transition">Local Shops & Pharmacy</Link></li>
              <li><Link href="/emergency" className="hover:text-rose-400 transition font-bold text-rose-300">24/7 Ambulance & Tow</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Partners</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/become-a-provider" className="hover:text-teal-400 transition">Become a Service Provider</Link></li>
              <li><Link href="/register-business" className="hover:text-teal-400 transition">Register Neighborhood Business</Link></li>
              <li><Link href="/provider/dashboard" className="hover:text-teal-400 transition">Provider Portal</Link></li>
              <li><Link href="/business/dashboard" className="hover:text-teal-400 transition">Business Portal</Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-teal-400 transition">Admin Dashboard</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ParaSheba Technologies Ltd. Built for Bangladesh with <Heart className="inline h-3 w-3 text-rose-500 fill-rose-500" />.</p>
        </div>
      </div>
    </footer>
  );
}
