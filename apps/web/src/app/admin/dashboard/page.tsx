'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { formatBDT } from '@parasheba/ui';
import {
  ShieldCheck,
  Users,
  Briefcase,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  DollarSign,
  Activity,
} from 'lucide-react';

interface VerificationItem {
  id: string;
  name: string;
  role: string;
  nid: string;
  submittedAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

interface DisputeItem {
  id: string;
  customer: string;
  provider: string;
  service: string;
  complaint: string;
  amount: number;
  status: 'OPEN' | 'RESOLVED';
}

export default function AdminDashboardPage() {
  const [verifications, setVerifications] = useState<VerificationItem[]>([
    {
      id: 'v-1',
      name: 'Mohammad Faruk Hossain',
      role: 'Electrician & Wiring',
      nid: '19842691234567890',
      submittedAt: 'Today, 11:20 AM',
      status: 'PENDING',
    },
    {
      id: 'v-2',
      name: 'Rasheda Khatun',
      role: 'Caregiver & Nursing Attendant',
      nid: '19902699876543210',
      submittedAt: 'Yesterday, 04:45 PM',
      status: 'PENDING',
    },
    {
      id: 'v-3',
      name: 'Bismillah Pharmacy (Uttara)',
      role: 'Merchant (Trade License TRAD/DNCC/11029)',
      nid: '26918844220011',
      submittedAt: 'Oct 01, 09:15 AM',
      status: 'PENDING',
    },
  ]);

  const [disputes, setDisputes] = useState<DisputeItem[]>([
    {
      id: 'dsp-101',
      customer: 'Sabbir Ahmed (Gulshan)',
      provider: 'Tanvir Ahmed (AC Tech)',
      service: 'AC Master Service & Gas Refill',
      complaint: 'AC cooling stopped after 4 days of service. Requesting free warranty re-inspection.',
      amount: 850,
      status: 'OPEN',
    },
  ]);

  const handleVerify = (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    setVerifications((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: newStatus } : v))
    );
  };

  const handleResolveDispute = (id: string) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'RESOLVED' } : d))
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Admin Header */}
      <div className="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="rounded-md bg-teal-500/20 px-2.5 py-1 text-xs font-bold text-teal-300 border border-teal-500/30">
            System Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-2">
            ParaSheba Central Ops Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time Bangladesh marketplace metrics, verification queue and dispute mediation
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-semibold text-emerald-400 border border-slate-700">
            <Activity className="h-4 w-4" /> All Systems Nominal
          </span>
        </div>
      </div>

      {/* Platform KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Total Users
          </span>
          <p className="mt-2 text-2xl font-black text-slate-900">14,280</p>
          <span className="mt-1 text-[11px] text-emerald-600 font-semibold">
            +342 this week
          </span>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Active Verified Providers
          </span>
          <p className="mt-2 text-2xl font-black text-teal-800">1,420</p>
          <span className="mt-1 text-[11px] text-slate-500">
            Across 16 Dhaka wards
          </span>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Monthly GMV (Gross Value)
          </span>
          <p className="mt-2 text-2xl font-black text-slate-900">৳2,840,000</p>
          <span className="mt-1 text-[11px] text-emerald-600 font-semibold">
            +22.4% MoM growth
          </span>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Dispute Resolution Rate
          </span>
          <p className="mt-2 text-2xl font-black text-emerald-600">99.4%</p>
          <span className="mt-1 text-[11px] text-slate-500">
            Avg. resolution &lt; 2 hrs
          </span>
        </div>
      </div>

      {/* NID Verification Queue */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-teal-700" />
              Pending NID & Trade License Verification Queue
            </h2>
            <p className="text-xs text-slate-500">
              Biometric and National ID check before granting the ParaSheba Verified seal
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {verifications.map((v) => (
            <div
              key={v.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-sm">{v.name}</h4>
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                      v.status === 'APPROVED'
                        ? 'bg-emerald-50 text-emerald-700'
                        : v.status === 'REJECTED'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {v.status}
                  </span>
                </div>
                <p className="text-slate-600 mt-0.5">Role / Trade: {v.role}</p>
                <p className="text-slate-400 font-mono mt-0.5">
                  NID / License: {v.nid} • Submitted {v.submittedAt}
                </p>
              </div>

              {v.status === 'PENDING' ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleVerify(v.id, 'APPROVED')}
                    className="flex items-center gap-1 rounded-xl bg-teal-700 px-3.5 py-2 font-bold text-white hover:bg-teal-800 transition shadow-xs"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Approve Verified
                  </button>
                  <button
                    onClick={() => handleVerify(v.id, 'REJECTED')}
                    className="flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 font-bold text-red-700 hover:bg-red-100 transition"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    Reject
                  </button>
                </div>
              ) : (
                <span className="font-bold text-slate-500">Processed</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Disputes & Mediation Queue */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Customer Disputes & Warranty Cases
            </h2>
            <p className="text-xs text-slate-500">
              Cases requiring platform warranty intervention and free rework re-assignment
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {disputes.map((d) => (
            <div
              key={d.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                    {d.id}
                  </span>
                  <span className="font-bold text-slate-900">
                    {d.customer} vs. {d.provider}
                  </span>
                  <span className="rounded bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                    {d.status}
                  </span>
                </div>
                <p className="text-slate-600">
                  <strong>Service:</strong> {d.service} ({formatBDT(d.amount)})
                </p>
                <p className="text-slate-500 italic">&quot;{d.complaint}&quot;</p>
              </div>

              {d.status === 'OPEN' ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleResolveDispute(d.id)}
                    className="rounded-xl bg-teal-700 px-4 py-2 font-bold text-white hover:bg-teal-800 transition shadow-xs"
                  >
                    Dispatch Warranty Re-Inspection
                  </button>
                </div>
              ) : (
                <span className="font-bold text-emerald-700">Resolved</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
