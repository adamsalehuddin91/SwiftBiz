# SwiftSalon
*Coding Project - Created 2026-04-02*

## Description
Multi-tenant SaaS salon management system for the Malaysian market. Productized version of HMS Salon — modern UI, Malaysia-first (FPX/DuitNow), salon-specific features, transparent pricing. Competes directly with WESS and fills the gap that global tools (Fresha, Vagaro) miss in Malaysia.

## Project Details
- **Status**: 🗓️ PLANNING
- **Created**: 2026-04-02
- **Last Accessed**: 2026-04-02
- **Position**: #1

## Stack
- **Framework**: Next.js 16 + React 19 + TypeScript + Tailwind CSS
- **Database**: Supabase (PostgreSQL) + RLS multi-tenancy
- **Auth**: Supabase Auth (per-salon user management)
- **Deploy**: Vercel
- **Billing**: Stripe
- **Repo**: TBD
- **URL**: swiftsalon.my (planned)
- **Branch**: `main`

## Pricing Strategy
- Basic: RM 149/mo — POS + booking + 3 staff
- Pro: RM 199/mo — full features + unlimited staff + reports
- Trial: 14 days free
- Target: 10 salons by end 2026

## Competitive Position
- vs Fresha/Vagaro: Local payment (FPX/DuitNow), BM language, MYR pricing
- vs WESS: Modern UI, self-serve onboarding, transparent pricing
- vs StoreHub: Salon-specific (commission, appointment, client history)

## Roadmap

### Phase 1 — Multi-tenancy (4–6 weeks)
- [ ] Add `salon_id` to all tables
- [ ] Update RLS policies for tenant isolation
- [ ] Supabase Auth → tie user to salon
- [ ] Signup + onboarding flow

### Phase 2 — Billing (2–3 weeks)
- [ ] Stripe subscription integration
- [ ] Plan enforcement (Basic/Pro limits)
- [ ] 14-day trial flow
- [ ] Suspend on non-payment

### Phase 3 — Onboarding UX (2–3 weeks)
- [ ] Setup wizard (business info, logo, services)
- [ ] Staff invitation system
- [ ] Import from Zobaze/CSV
- [ ] Demo data for new signups

### Phase 4 — Go-to-market
- [ ] Landing page swiftsalon.my
- [ ] Beta: 3–5 salons free, gather testimonials
- [ ] Facebook Groups (salon owners Malaysia)
- [ ] FPX/DuitNow payment at POS

## Active Tasks
- [ ] Finalize tech approach for multi-tenancy
- [ ] Create repo
- [ ] Design system (brand: SwiftSalon)

## Progress Log
### 2026-04-02
- Project created based on HMS Salon foundation
- Decision: productize HMS Salon → SwiftSalon SaaS
- Market research done — clear gap vs WESS (legacy), Fresha/Vagaro (no MY support)
- HMS Salon client (Haida Muslimah Salon) kept as separate dedicated instance

## Known Issues
- None yet

## Key Decisions
- Multi-tenancy via RLS (not schema-per-tenant) — simpler, Supabase-native
- HMS Salon stays as dedicated single-tenant for existing client
- SwiftSalon = fresh codebase forked from HMS, not modifying HMS
