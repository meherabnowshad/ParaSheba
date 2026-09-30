'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_BUSINESSES, MOCK_PRODUCTS } from '@/lib/api';
import { formatBDT } from '@parasheba/ui';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Clock,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Search,
  ShoppingCart,
  Store,
} from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function MarketplacePage() {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'prod-1',
      name: 'Napa Extend 665mg (Box of 120 Tablets)',
      price: 240,
      quantity: 1,
    },
  ]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const business = MOCK_BUSINESSES[0];

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cart.length > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-8 sm:p-12 text-white shadow-xl">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-800/80 px-3 py-1 text-xs font-bold text-emerald-200 border border-emerald-600/50">
            <Store className="h-3.5 w-3.5" />
            ParaSheba Marketplace • পাড়ার দোকান
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight">
            Order from Verified Neighborhood Pharmacies & Groceries
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Delivering genuine medicines, fresh groceries, and daily essentials from your trusted local brick-and-mortar stores to your door in 35 minutes.
          </p>
        </div>
      </div>

      {/* Featured Local Store Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={business.logoUrl}
            alt={business.businessName}
            className="h-16 w-16 rounded-2xl object-cover border border-slate-200"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                {business.businessName}
              </h2>
              {business.isVerified && (
                <span className="inline-flex items-center gap-1 rounded bg-teal-50 px-2 py-0.5 text-[11px] font-bold text-teal-800 border border-teal-200">
                  <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
                  Trade License Verified
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {business.address} • {business.openingHours}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-800 border border-emerald-200">
          <Clock className="h-4 w-4 text-emerald-600" />
          <span>Avg. Delivery: 25–35 Mins</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Products Grid */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-slate-900">
            Available Pharmacy Products
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-36 w-full rounded-xl overflow-hidden bg-slate-50 mb-3">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute top-2 left-2 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-bold text-slate-800">
                      {prod.category}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">
                    {prod.name}
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                    {prod.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold">
                      Price per {prod.unit}
                    </span>
                    <span className="text-base font-black text-teal-800">
                      {formatBDT(prod.price)}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(prod)}
                    className="flex items-center gap-1 rounded-xl bg-teal-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-teal-800 transition"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Cart Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <ShoppingCart className="h-4 w-4 text-teal-700" />
                Your Delivery Basket ({cart.length})
              </h3>
            </div>

            {orderPlaced ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="mx-auto h-12 w-12 text-teal-600" />
                <h4 className="text-base font-bold text-slate-900">
                  Order Dispatched!
                </h4>
                <p className="text-xs text-slate-500">
                  A ParaSheba delivery partner is picking up your items from Lazz Pharma Dhanmondi. ETA: 25 mins.
                </p>
                <button
                  onClick={() => {
                    setOrderPlaced(false);
                    setCart([]);
                  }}
                  className="mt-3 text-xs font-bold text-teal-700 underline"
                >
                  Start New Order
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                Your basket is empty. Add products to order.
              </div>
            ) : (
              <div className="space-y-4">
                {/* Cart items list */}
                <div className="space-y-3 divide-y divide-slate-100">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="pt-2 flex items-center justify-between gap-2"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {formatBDT(item.price)} each
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="rounded-lg border border-slate-200 p-1 hover:bg-slate-50"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="rounded-lg border border-slate-200 p-1 hover:bg-slate-50"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotals */}
                <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="font-bold text-slate-900">
                      {formatBDT(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Express Delivery (35m)</span>
                    <span className="font-bold text-slate-900">
                      {formatBDT(deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-teal-900 pt-2 border-t border-slate-100">
                    <span>Total Payable</span>
                    <span>{formatBDT(total)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setOrderPlaced(true)}
                  className="w-full rounded-xl bg-teal-700 py-3 text-xs font-bold text-white shadow-xs hover:bg-teal-800 transition"
                >
                  Place Express Order ({formatBDT(total)})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
