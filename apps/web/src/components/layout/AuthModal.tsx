'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { UserRole } from '@parasheba/types';
import { X, Lock, Phone, User, ShieldCheck, ArrowRight } from 'lucide-react';

export function AuthModal() {
  const { isAuthModalOpen, authModalMode, setAuthModal, setUser, loginAsDemoUser } = useAuthStore();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  if (!isAuthModalOpen) return null;

  const handleDemoLogin = (role: UserRole) => {
    loginAsDemoUser(role);
    setAuthModal(false);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authModalMode === 'register' && !isOtpStep) {
      setIsOtpStep(true);
      return;
    }
    setUser(
      {
        id: `user-${Date.now()}`,
        fullName: fullName || 'Demo User',
        phone: phone || '01700000000',
        role: UserRole.CUSTOMER,
      },
      'jwt-token-manual',
    );
    setAuthModal(false);
    setIsOtpStep(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {authModalMode === 'login' ? 'Login to ParaSheba' : 'Join ParaSheba'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Your neighborhood services platform</p>
          </div>
          <button
            onClick={() => {
              setAuthModal(false);
              setIsOtpStep(false);
            }}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 rounded-xl bg-teal-50 border border-teal-200 p-3.5">
          <p className="text-xs font-semibold text-teal-900 flex items-center gap-1.5 mb-2">
            <ShieldCheck className="h-4 w-4 text-teal-700" />
            Quick Demo Login (Single Click)
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleDemoLogin(UserRole.CUSTOMER)}
              className="rounded-lg bg-white border border-teal-300 py-1.5 px-2 text-center text-xs font-medium text-teal-900 shadow-sm hover:bg-teal-100 hover:border-teal-400 transition"
            >
              Customer
            </button>
            <button
              onClick={() => handleDemoLogin(UserRole.PROVIDER)}
              className="rounded-lg bg-white border border-teal-300 py-1.5 px-2 text-center text-xs font-medium text-teal-900 shadow-sm hover:bg-teal-100 hover:border-teal-400 transition"
            >
              Provider
            </button>
            <button
              onClick={() => handleDemoLogin(UserRole.ADMIN)}
              className="rounded-lg bg-white border border-teal-300 py-1.5 px-2 text-center text-xs font-medium text-teal-900 shadow-sm hover:bg-teal-100 hover:border-teal-400 transition"
            >
              Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleManualSubmit} className="mt-4 space-y-3.5">
          {authModalMode === 'register' && !isOtpStep && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Kamrul Hasan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 pl-9 pr-3 py-2 text-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
                />
              </div>
            </div>
          )}

          {!isOtpStep ? (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number (BD)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 pl-9 pr-3 py-2 text-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 pl-9 pr-3 py-2 text-sm focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>
              </div>
            </>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Enter 6-Digit SMS Code
              </label>
              <input
                type="text"
                placeholder="123456"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-center text-lg tracking-widest font-mono focus:border-teal-600 focus:outline-none"
              />
              <p className="text-xs text-slate-400 mt-1">Hint: Test OTP is 123456</p>
            </div>
          )}

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-teal-800 transition"
          >
            {isOtpStep
              ? 'Verify OTP & Finish'
              : authModalMode === 'login'
              ? 'Log In'
              : 'Continue to SMS Verify'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
