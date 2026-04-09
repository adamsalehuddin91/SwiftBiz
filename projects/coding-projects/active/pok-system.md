# PokSystem Management
*Coding Project - Created 2026-02-23*

## Description
Business management system for a contractor/construction company. Modules: Invoicing, Purchase Orders, Quotations, Delivery Orders, Supplier Invoices, Inventory, Customers, Suppliers, Finance. Deployed on Railway.

## Project Details
- **Status**: 🟡 PRODUCTION LIVE (hosting decision pending)
- **Created**: 2026-01 (approx)
- **Last Accessed**: 2026-02-23
- **Position**: #2

## Stack
- **Framework**: Laravel 12 + React 18 + Inertia.js
- **Styling**: Tailwind CSS
- **Database**: Supabase PostgreSQL (pooler, transaction mode)
- **Auth**: Laravel Auth
- **Deploy**: Railway (auto-deploy on push to main)
- **Repo**: `adamsalehuddin91/PokSystemManagement`
- **URL**: `https://poksystemmanagement-production.up.railway.app`
- **Branch**: `main`

## Resume
```bash
cd "SwiftApp Dev/PokSystemManagement"
php artisan serve
npm run dev
```

## Active Tasks
- [ ] Decide hosting: Railway $5/month vs Render/Fly.io/DigitalOcean
- [ ] Authorization policies (role-based access)
- [ ] Dashboard N+1 query optimization
- [ ] Dynamic Tailwind classes fix

## Progress Log
### 2026-02-23
- Project added to LRU system

### 2026-02-19 (5 commits)
- `2674755` — Force HTTPS (`URL::forceScheme('https')`) in AppServiceProvider
- `654a2df` — Trust all proxies for Railway
- `53fd087` — Redirect root `/` to login
- `12fed4e` — Fix Invoice Record Payment (wrong route + payment method)
- `85b0e29` — Fix blank PO & Inventory (PostgreSQL sum() returns string → parseFloat)

### 2026-02-19 (Env fixes)
- `APP_URL` had trailing space → "Invalid URI: Host is malformed"
- `APP_KEY` missing `base64:` prefix

## Known Issues
- Railway free tier discontinued — needs $5/month or migration
- Dynamic Tailwind classes (purged in build)

## Memory Patterns
- PostgreSQL `sum()` returns string → always `parseFloat()` before `.toFixed()`
- `URL::forceScheme('https')` + `trustProxies(at: '*')` for Railway HTTPS
- Supabase pooler in transaction mode for Laravel
