import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LocationModal } from '@/components/layout/LocationModal';
import { AuthModal } from '@/components/layout/AuthModal';

export const metadata: Metadata = {
  title: 'ParaSheba | পড়াশেবা — Your Neighborhood Services & Marketplace',
  description:
    'ParaSheba connects you with verified local service providers, home technicians, karigor tailors, caregivers, rentals, and 24/7 emergency support across Bangladesh.',
  keywords: [
    'ParaSheba',
    'Dhaka home service',
    'electrician dhaka',
    'plumber dhaka',
    'karigor tailor',
    'caregiver bangladesh',
    'emergency ambulance dhaka',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-teal-100 selection:text-teal-900">
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>

        {/* Global Modals managed by Zustand stores */}
        <LocationModal />
        <AuthModal />
      </body>
    </html>
  );
}
