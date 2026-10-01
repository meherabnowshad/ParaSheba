'use client';

import React, { useState } from 'react';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Send,
} from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="rounded-3xl bg-gradient-to-r from-teal-950 via-teal-900 to-slate-900 p-8 sm:p-12 text-white shadow-xl">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
          We Are Here To Help
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-black">
          Contact ParaSheba Support
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-teal-100 max-w-xl">
          Have an inquiry, service complaint, or partner request? Our Dhaka support team is available 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Send us a message
            </h2>

            {submitted ? (
              <div className="rounded-2xl bg-teal-50 p-6 text-center border border-teal-200">
                <CheckCircle2 className="mx-auto h-10 w-10 text-teal-700" />
                <h3 className="text-base font-bold text-slate-900 mt-2">
                  Message Dispatched!
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Our customer happiness team will respond via SMS or phone within 15 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 p-3 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Phone Number or Email
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.emailOrPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, emailOrPhone: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 p-3 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Inquiry Category
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 p-3 focus:outline-none focus:border-teal-500"
                  >
                    <option value="General">General Inquiry</option>
                    <option value="Booking">Active Booking Assistance</option>
                    <option value="Provider">Become a Service Provider</option>
                    <option value="Dispute">Dispute or Quality Complaint</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 p-3 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-teal-700 px-6 py-3 text-xs font-bold text-white shadow-xs hover:bg-teal-800 transition"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Contact Info Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4 text-xs">
            <h3 className="font-bold uppercase tracking-wider text-slate-500">
              Immediate Contact Lines
            </h3>

            <div className="flex items-start gap-3">
              <PhoneCall className="h-5 w-5 text-teal-700 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900">Customer Helpline</h4>
                <p className="text-slate-500 mt-0.5">09612-PARASHEBA (72727)</p>
                <p className="text-slate-400 text-[10px]">24/7 Toll-Free</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-teal-700 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900">Email Inquiries</h4>
                <p className="text-slate-500 mt-0.5">support@parasheba.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-teal-700 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900">Principal Office</h4>
                <p className="text-slate-500 mt-0.5">
                  House 18, Road 27 (Old), Dhanmondi R/A, Dhaka-1209
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
