# ParaSheba Technical Architecture Document

## 1. System Overview

ParaSheba is engineered as a **Modular Monolith** backend paired with a **Feature-based Frontend Web Platform** designed to allow future React Native mobile apps to integrate directly without altering backend contracts.

```text
                                  ┌────────────────────────┐
                                  │   Next.js 14 Web App   │
                                  │   (React + TypeScript) │
                                  └───────────┬────────────┘
                                              │ REST / WebSocket
                                              ▼
                                  ┌────────────────────────┐
                                  │     NestJS API V1      │
                                  │   (Modular Monolith)   │
                                  └───────────┬────────────┘
                         ┌────────────────────┼────────────────────┐
                         ▼                    ▼                    ▼
                ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
                │ PostgreSQL 16   │  │ Redis 7         │  │ Payment Gateways│
                │ + PostGIS Ext.  │  │ (Cache & Queue) │  │ (bKash/Nagad/   │
                │ (Spatial Index) │  │                 │  │  SSLCommerz)    │
                └─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## 2. Domain Boundaries

1. **Auth & Identity**: Role-Based Access Control (`CUSTOMER`, `PROVIDER`, `BUSINESS_OWNER`, `ADMIN`), OTP verification, JWT.
2. **Geo-Location**: PostGIS spatial indexing for neighborhood radius lookups (`ST_DWithin`).
3. **Bookings & Lifecycle**: Multi-step state machine with WebSocket status broadcast.
4. **Vertical Specialists**:
   - `karigor`: 6-stage bespoke tailoring workflow.
   - `caregiver`: Clinical care plan scheduling.
   - `rental`: Direct property & equipment listings.
   - `emergency`: Immediate 24/7 hotline & GPS dispatch.
5. **Marketplace & POS**: Neighborhood merchant catalog with express 35-minute delivery.
