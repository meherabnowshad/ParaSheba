# ParaSheba (পড়াশেবা)

> **Your Neighborhood. Your Services. One Platform.**

ParaSheba is a Bangladesh-focused local services marketplace that connects customers with trusted local technicians, master karigor tailors, vetted caregivers, neighborhood shops, rentals, and 24/7 emergency services across Bangladesh.

---

## Architecture & Technology Stack

- **Monorepo**: npm workspaces
- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Lucide icons, Zustand
- **Backend API**: NestJS, TypeScript, Prisma ORM, PostgreSQL + PostGIS, Redis, WebSockets
- **Packages**:
  - `@parasheba/types`: Domain interfaces, enums, and API contracts
  - `@parasheba/ui`: Design tokens, BDT `formatBDT` formatters, Bangladesh geographic models
  - `@parasheba/validation`: Zod validation schemas for BD phone, bookings, and onboarding

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Build Shared Packages
```bash
npm run build --workspaces
```

### 3. Run Development Servers
```bash
# Start frontend web application (runs at http://localhost:3000)
npm run dev --workspace=@parasheba/web

# In a separate terminal, start backend API (runs at http://localhost:4000/api/v1)
npm run dev --workspace=@parasheba/api
```

---

## Core Verticals

1. **Home Services**: Electrician, Plumber, AC Repair, Deep Cleaning
2. **Karigor Tailoring**: Doorstep measurement visits, digital fit profiles, 6-stage stitching tracking
3. **Caregiver & Nursing**: Vetted elderly care, patient attendants, 8hr/12hr/24hr shift plans
4. **Vehicle Services**: Car wash, detailing, mechanic, roadside assistance
5. **Local Marketplace**: 35-minute delivery from local pharmacies (Lazz Pharma) and grocery shops
6. **Rentals**: Zero-broker family flats, chauffeur-driven microbuses, generators
7. **24/7 Emergency Hub**: Click-to-call ambulance dispatch (ICU/AC) and roadside recovery towing

---

## License

Private & Proprietary. All rights reserved.
