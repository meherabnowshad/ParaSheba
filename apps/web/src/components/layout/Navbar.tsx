'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocationStore } from '@/stores/useLocationStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { UserRole } from '@parasheba/types';
import {
  MapPin,
  Search,
  User,
  Shield,
  Briefcase,
  AlertTriangle,
  Menu,
  X,
  LogOut,
  ChevronDown,
  ShoppingBag,
  Scissors,
  HeartHandshake,
  Home,
  CheckCircle2,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { city, area, setModalOpen } = useLocationStore();
  const { user, setAuthModal, logout, loginAsDemoUser } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Services', href: '/services' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Rentals', href: '/rental' },
    { label: 'Karigor', href: '/karigor' },
    { label: 'Caregiver', href: '/caregiver' },
    { label: 'Emergency 24/7', href: '/emergency', isEmergency: true },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo & Location Pill */}
        <div className="flex items-center gap-4 lg:gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white font-black text-xl shadow-md group-hover:bg-teal-800 transition">
              প
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-teal-700 transition">
                ParaSheba
              </span>
              <span className="hidden sm:inline-block ml-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                পড়াশেবা
              </span>
            </div>
          </Link>

          {/* Location Selector Pill */}
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-teal-400 hover:bg-teal-50/50 transition shadow-sm"
          >
            <MapPin className="h-3.5 w-3.5 text-teal-600 flex-shrink-0" />
            <span className="truncate max-w-[120px] sm:max-w-[160px]">
              {area}, {city}
            </span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>
        </div>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            if (link.isEmergency) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 border border-rose-200 hover:bg-rose-100 transition animate-pulse"
                >
                  <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
                  {link.label}
                </Link>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  isActive
                    ? 'text-teal-700 bg-teal-50 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Search, Role Switcher & Auth */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/search"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-teal-500 hover:text-teal-700 transition"
            title="Search services"
          >
            <Search className="h-4 w-4" />
          </Link>

          {/* Quick Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-100/70 px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-200/70 transition"
              title="Switch demo role"
            >
              <span className="text-slate-400">Role:</span>
              <span className="text-teal-800 uppercase font-bold">{user?.role || 'GUEST'}</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white p-1.5 shadow-xl border border-slate-100 text-xs z-50">
                <p className="px-2 py-1 text-[10px] font-bold uppercase text-slate-400">Switch Demo Role</p>
                <button
                  onClick={() => {
                    loginAsDemoUser(UserRole.CUSTOMER);
                    setRoleDropdownOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left hover:bg-slate-50"
                >
                  <span>Customer (Kamrul)</span>
                  {user?.role === UserRole.CUSTOMER && <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />}
                </button>
                <button
                  onClick={() => {
                    loginAsDemoUser(UserRole.PROVIDER);
                    setRoleDropdownOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left hover:bg-slate-50"
                >
                  <span>Provider (Rafiqul)</span>
                  {user?.role === UserRole.PROVIDER && <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />}
                </button>
                <button
                  onClick={() => {
                    loginAsDemoUser(UserRole.ADMIN);
                    setRoleDropdownOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left hover:bg-slate-50"
                >
                  <span>Platform Admin</span>
                  {user?.role === UserRole.ADMIN && <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />}
                </button>
                <div className="my-1 border-t border-slate-100" />
                <button
                  onClick={() => {
                    logout();
                    setRoleDropdownOpen(false);
                  }}
                  className="flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="h-3 w-3" />
                  Logout
                </button>
              </div>
            )}
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              {user.role === UserRole.CUSTOMER && (
                <Link
                  href="/customer/dashboard"
                  className="rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-teal-800 transition"
                >
                  My Dashboard
                </Link>
              )}
              {user.role === UserRole.PROVIDER && (
                <Link
                  href="/provider/dashboard"
                  className="rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-teal-800 transition"
                >
                  Provider Portal
                </Link>
              )}
              {user.role === UserRole.ADMIN && (
                <Link
                  href="/admin/dashboard"
                  className="rounded-lg bg-purple-700 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-purple-800 transition"
                >
                  Admin Portal
                </Link>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAuthModal(true, 'login')}
                className="text-xs font-semibold text-slate-700 hover:text-teal-700 px-2 py-1.5"
              >
                Log In
              </button>
              <button
                onClick={() => setAuthModal(true, 'register')}
                className="rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-teal-800 transition"
              >
                Get Started
              </button>
            </div>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 transition"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block rounded-lg px-3 py-2 text-sm font-semibold ${
                link.isEmergency
                  ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
