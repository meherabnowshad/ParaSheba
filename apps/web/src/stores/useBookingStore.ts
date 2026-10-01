import { create } from 'zustand';
import { PaymentMethod } from '@parasheba/types';

export interface BookingFormState {
  step: number;
  serviceId: string;
  serviceName: string;
  providerId: string;
  providerName: string;
  providerPrice: number;
  providerArea: string;
  scheduledDate: string;
  scheduledTimeSlot: string;
  customerAddress: string;
  customerArea: string;
  customerPhone: string;
  customerNotes: string;
  paymentMethod: PaymentMethod;
  createdTrackingCode?: string;

  setStep: (step: number) => void;
  setService: (id: string, name: string) => void;
  setProvider: (id: string, name: string, price: number, area: string) => void;
  setDateTime: (date: string, timeSlot: string) => void;
  setAddressDetails: (address: string, area: string, phone: string, notes?: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setTrackingCode: (code: string) => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingFormState>((set) => ({
  step: 1,
  serviceId: 'electrician',
  serviceName: 'Electrician & Wiring',
  providerId: 'provider-rafiq',
  providerName: 'Rafiqul Islam',
  providerPrice: 400,
  providerArea: 'Dhanmondi',
  scheduledDate: new Date().toISOString().split('T')[0],
  scheduledTimeSlot: '10:00 AM - 12:00 PM',
  customerAddress: 'House 42, Road 7A, Dhanmondi',
  customerArea: 'Dhanmondi',
  customerPhone: '01711111111',
  customerNotes: '',
  paymentMethod: PaymentMethod.CASH_ON_DELIVERY,
  createdTrackingCode: undefined,

  setStep: (step) => set({ step }),
  setService: (id, name) => set({ serviceId: id, serviceName: name }),
  setProvider: (id, name, price, area) => set({ providerId: id, providerName: name, providerPrice: price, providerArea: area }),
  setDateTime: (date, timeSlot) => set({ scheduledDate: date, scheduledTimeSlot: timeSlot }),
  setAddressDetails: (address, area, phone, notes = '') =>
    set({ customerAddress: address, customerArea: area, customerPhone: phone, customerNotes: notes }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setTrackingCode: (code) => set({ createdTrackingCode: code }),
  resetBooking: () =>
    set({
      step: 1,
      serviceId: '',
      serviceName: '',
      providerId: '',
      providerName: '',
      providerPrice: 0,
      createdTrackingCode: undefined,
    }),
}));
