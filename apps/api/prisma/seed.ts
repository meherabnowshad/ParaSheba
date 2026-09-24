import { PrismaClient, Role, VerificationStatus, TailoringStage, CaregiverSpecialization, RentalType, EmergencyServiceType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting ParaSheba database seed...');

  const passwordHash = await bcrypt.hash('parasheba123', 10);

  // 1. Create Admins, Providers, Customers
  const adminUser = await prisma.user.upsert({
    where: { phone: '01700000001' },
    update: {},
    create: {
      phone: '01700000001',
      email: 'admin@parasheba.com',
      fullName: 'ParaSheba Admin',
      passwordHash,
      role: Role.ADMIN,
      isVerified: true,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    },
  });

  const customerUser = await prisma.user.upsert({
    where: { phone: '01711111111' },
    update: {},
    create: {
      phone: '01711111111',
      email: 'customer@parasheba.com',
      fullName: 'Kamrul Hasan',
      passwordHash,
      role: Role.CUSTOMER,
      isVerified: true,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      customerProfile: {
        create: {
          defaultAddress: 'House 42, Road 7A, Dhanmondi',
          defaultArea: 'Dhanmondi',
          defaultCity: 'Dhaka',
          savedAddresses: [
            { label: 'Home', address: 'House 42, Road 7A, Dhanmondi', area: 'Dhanmondi', city: 'Dhaka' },
            { label: 'Office', address: 'Plot 18, Block B, Banani', area: 'Banani', city: 'Dhaka' },
          ],
        },
      },
    },
  });

  // 2. Create Service Categories
  const categories = [
    {
      slug: 'home-services',
      name: 'Home Services',
      nameBn: 'বাসাবাড়ির সেবা',
      description: 'Electricians, plumbers, AC technicians, cleaners, painters & carpentry.',
      iconName: 'Wrench',
      group: 'home',
      orderIndex: 1,
    },
    {
      slug: 'personal-family',
      name: 'Personal & Family',
      nameBn: 'ব্যক্তিগত ও পারিবারিক',
      description: 'Home tutors, caregivers, babysitting, beauty parlour & salon at home.',
      iconName: 'HeartHandshake',
      group: 'personal',
      orderIndex: 2,
    },
    {
      slug: 'karigor',
      name: 'Karigor Tailoring',
      nameBn: 'কারিগর দর্জি সেবা',
      description: 'Doorstep custom tailoring, measurement visits, panjabi, suit & alteration.',
      iconName: 'Scissors',
      group: 'personal',
      orderIndex: 3,
    },
    {
      slug: 'caregiver',
      name: 'Caregiver & Nursing',
      nameBn: 'কেয়ারগিভার ও নার্সিং',
      description: 'Verified elderly care, post-surgery assistance, companion care & nursing.',
      iconName: 'Stethoscope',
      group: 'personal',
      orderIndex: 4,
    },
    {
      slug: 'vehicle-services',
      name: 'Vehicle Services',
      nameBn: 'গাড়ি ও বাইক সেবা',
      description: 'Car & bike mechanics, mobile car wash, professional drivers & emergency recovery.',
      iconName: 'Car',
      group: 'vehicle',
      orderIndex: 5,
    },
    {
      slug: 'marketplace',
      name: 'Local Marketplace',
      nameBn: 'পাড়ার দোকান ও বাজার',
      description: 'Local pharmacy, grocery, neighborhood restaurants & daily essentials delivered.',
      iconName: 'ShoppingBag',
      group: 'marketplace',
      orderIndex: 6,
    },
    {
      slug: 'rental',
      name: 'Rentals',
      nameBn: 'ভাড়া ও রেন্টাল',
      description: 'Apartments, family flats, cars, microbus, generators & event equipment.',
      iconName: 'Home',
      group: 'rental',
      orderIndex: 7,
    },
    {
      slug: 'emergency',
      name: 'Emergency 24/7',
      nameBn: 'জরুরি সেবা ২৪/৭',
      description: 'Immediate 24/7 ambulance, roadside breakdown rescue & emergency tech dispatch.',
      iconName: 'AlertCircle',
      group: 'emergency',
      orderIndex: 8,
    },
  ];

  const categoryMap = new Map();
  for (const cat of categories) {
    const record = await prisma.serviceCategory.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categoryMap.set(cat.slug, record);
  }

  // 3. Create Services
  const servicesData = [
    {
      categoryId: categoryMap.get('home-services').id,
      name: 'Electrician & Wiring',
      nameBn: 'ইলেকট্রিশিয়ান ও ওয়্যারিং',
      slug: 'electrician',
      description: 'Short circuit fix, switchboard installation, fan repair, circuit breaker maintenance.',
      startingPrice: 350,
      priceUnit: 'inspection starting from',
      durationEstimate: '1–2 hours',
      isPopular: true,
      icon: 'Zap',
    },
    {
      categoryId: categoryMap.get('home-services').id,
      name: 'Plumbing & Sanitary Repair',
      nameBn: 'প্লাম্বিং ও পাইপলাইন মেরামত',
      slug: 'plumber',
      description: 'Pipe leakage, commode & basin fixing, water pump installation, bathroom fittings.',
      startingPrice: 400,
      priceUnit: 'visit starting from',
      durationEstimate: '1–2 hours',
      isPopular: true,
      icon: 'Droplet',
    },
    {
      categoryId: categoryMap.get('home-services').id,
      name: 'AC Master Service & Gas Refill',
      nameBn: 'এসি সার্ভিস ও গ্যাস রিফিল',
      slug: 'ac-repair',
      description: 'Deep jet wash cleaning, cooling issue resolution, freon gas top-up, compressor inspection.',
      startingPrice: 850,
      priceUnit: 'per indoor/outdoor unit',
      durationEstimate: '1.5 hours',
      isPopular: true,
      icon: 'Wind',
    },
    {
      categoryId: categoryMap.get('home-services').id,
      name: 'Deep Home Cleaning',
      nameBn: 'বাড়ি ও কিচেন ডিপ ক্লিনিং',
      slug: 'cleaning',
      description: 'Complete floor scrubbing, kitchen chimney de-greasing, bathroom disinfection.',
      startingPrice: 1200,
      priceUnit: 'per room/kitchen',
      durationEstimate: '3–4 hours',
      isPopular: true,
      icon: 'Sparkles',
    },
    {
      categoryId: categoryMap.get('karigor').id,
      name: 'Custom Panjabi Tailoring',
      nameBn: 'পাঞ্জাবি সেলাই ও কাটিং',
      slug: 'custom-panjabi',
      description: 'Custom tailor-made semi-fitted, kabli or classic cotton panjabi with doorstep measurement.',
      startingPrice: 650,
      priceUnit: 'per panjabi stitching',
      durationEstimate: '3–5 days',
      isPopular: true,
      icon: 'Scissors',
    },
    {
      categoryId: categoryMap.get('caregiver').id,
      name: 'Elderly Daily Assistance',
      nameBn: 'বয়োজ্যেষ্ঠ সেবা ও সঙ্গী',
      description: 'Assistance with mobility, medicine schedule, nutrition, companionship and doctor visits.',
      startingPrice: 1200,
      priceUnit: 'per 8-hr shift',
      durationEstimate: 'Daily or Monthly plan',
      isPopular: true,
      icon: 'UserCheck',
    },
    {
      categoryId: categoryMap.get('vehicle-services').id,
      name: 'Doorstep Car Detailing & Wash',
      nameBn: 'বাসায় এসে গাড়ি ওয়াশ',
      slug: 'car-wash',
      description: 'Pressure foam wash, interior vacuuming, dashboard polish, tyre dressing right at your garage.',
      startingPrice: 600,
      priceUnit: 'per sedan/hatchback',
      durationEstimate: '1 hour',
      isPopular: true,
      icon: 'Car',
    },
  ];

  for (const s of servicesData) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s as any,
      create: s as any,
    });
  }

  // 4. Create Service Providers with Profiles
  const providerData = [
    {
      phone: '01811111111',
      fullName: 'Rafiqul Islam',
      email: 'rafiq.electric@parasheba.com',
      headline: 'Certified Master Electrician (12+ Years)',
      bio: 'Expert in residential wiring, short-circuit diagnostics, IPS/generator setup, and safety distribution board installation across Dhanmondi and Lalmatia.',
      experienceYears: 12,
      rating: 4.92,
      reviewCount: 148,
      verificationStatus: VerificationStatus.VERIFIED,
      nidVerified: true,
      tradeLicenseVerified: true,
      basePrice: 400,
      area: 'Dhanmondi',
      city: 'Dhaka',
      completedJobsCount: 312,
      badges: ['NID Verified', 'Top Rated', 'Quick Responder'],
      portfolio: [
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
      ],
      serviceAreas: ['Dhanmondi', 'Lalmatia', 'Mohammadpur', 'Kalabagan'],
    },
  ];

  for (const p of providerData) {
    const user = await prisma.user.upsert({
      where: { phone: p.phone },
      update: {},
      create: {
        phone: p.phone,
        email: p.email,
        fullName: p.fullName,
        passwordHash,
        role: Role.PROVIDER,
        isVerified: true,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.phone}`,
      },
    });

    const profile = await prisma.providerProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        headline: p.headline,
        bio: p.bio,
        experienceYears: p.experienceYears,
        rating: p.rating,
        reviewCount: p.reviewCount,
        verificationStatus: p.verificationStatus,
        nidVerified: p.nidVerified,
        tradeLicenseVerified: p.tradeLicenseVerified,
        basePrice: p.basePrice,
        address: `${p.area}, Dhaka`,
        area: p.area,
        city: p.city,
        completedJobsCount: p.completedJobsCount,
        badges: p.badges,
        portfolio: p.portfolio,
      },
    });

    for (const a of p.serviceAreas) {
      await prisma.serviceArea.create({
        data: {
          providerId: profile.id,
          areaName: a,
          city: 'Dhaka',
          radiusKm: 7.0,
        },
      });
    }
  }

  // 5. Emergency Listings
  const emergencies = [
    {
      name: 'Dhaka Central 24/7 ICU & AC Ambulance',
      serviceType: EmergencyServiceType.AMBULANCE,
      phone: '01711000999',
      altPhone: '029660000',
      operatingAreas: ['Dhanmondi', 'Mohammadpur', 'Shahbagh', 'Mirpur', 'Old Dhaka'],
      vehicleType: 'Type-C ICU Life Support Ambulance with Oxygen & Ventilator',
      isAvailable247: true,
      verifiedEmergencyProvider: true,
      etaMinutes: 12,
    },
    {
      name: 'Padma Roadside Towing & Breakdown Rescue',
      serviceType: EmergencyServiceType.ROADSIDE_ASSISTANCE,
      phone: '01912333444',
      altPhone: '01711555666',
      operatingAreas: ['All Dhaka Metro', 'Dhaka-Chittagong Highway'],
      vehicleType: 'Hydraulic Flatbed Heavy Towing Truck & Battery Jumpstart Van',
      isAvailable247: true,
      verifiedEmergencyProvider: true,
      etaMinutes: 20,
    },
  ];

  for (const em of emergencies) {
    await prisma.emergencyProvider.create({
      data: em,
    });
  }

  console.log('✅ ParaSheba database seeded successfully with authentic services & providers.');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
