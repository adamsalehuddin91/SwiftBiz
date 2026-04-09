# Deployment Guideline — Coolify + Hetzner + Cloudflare

**Author**: Tokwi | **Updated**: 2026-03-14
**Untuk**: Semua SwiftApps project deployment

---

## OVERVIEW

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  GitHub Repo │────▶│   Coolify     │────▶│  Hetzner VPS │
│  (source)    │     │  (build+run)  │     │  (hosting)   │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                          ┌──────────────┐
                                          │  Cloudflare  │
                                          │  (DNS + CDN) │
                                          └──────────────┘
```

**Flow**: Push code → Coolify detect → Build Docker → Deploy → Cloudflare route traffic

---

## PHASE 1: PERSIAPAN CODE

### 1.1 Pastikan `.gitignore` betul

**Laravel project — WAJIB exclude:**
```
.env                    # Secrets
/vendor                 # composer install balik
/node_modules           # npm install balik
/public/build           # npm run build balik
/public/storage         # symlink — artisan buat balik
/public/hot             # vite dev server
database/*.sqlite       # real data
database/*.sqlite-journal
storage/app/public/*    # user uploads
!storage/app/public/.gitignore
```

**Next.js project — WAJIB exclude:**
```
.env.local
/node_modules
/.next
/out
```

### 1.2 Pastikan Dockerfile ada

**Laravel (PHP-FPM + Nginx):**
```dockerfile
FROM php:8.3-fpm-alpine AS base

RUN apk add --no-cache \
    nginx supervisor curl zip unzip git \
    libpng-dev libjpeg-turbo-dev freetype-dev \
    oniguruma-dev libxml2-dev sqlite-dev \
    nodejs npm \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_sqlite pdo_mysql mbstring xml gd bcmath opcache

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts --no-interaction

COPY package.json package-lock.json ./
RUN npm ci --production=false

COPY . .
RUN npm run build && rm -rf node_modules

RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache \
    && php artisan storage:link

RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache \
    && chmod -R 775 /app/storage /app/bootstrap/cache

COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/supervisord.conf /etc/supervisord.conf

EXPOSE 80
CMD ["supervisord", "-c", "/etc/supervisord.conf"]
```

**Next.js (Standalone):**
```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

### 1.3 Support files (Laravel sahaja)

**`docker/nginx.conf`:**
```nginx
server {
    listen 80;
    server_name _;
    root /app/public;
    index index.php;
    client_max_body_size 10M;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* { deny all; }

    location /build/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**`docker/supervisord.conf`:**
```ini
[supervisord]
nodaemon=true
user=root
logfile=/dev/stdout
logfile_maxbytes=0

[program:php-fpm]
command=php-fpm -F
autostart=true
autorestart=true
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0

[program:nginx]
command=nginx -g "daemon off;"
autostart=true
autorestart=true
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0

[program:scheduler]
command=sh -c "while true; do php /app/artisan schedule:run --no-interaction >> /dev/null 2>&1; sleep 60; done"
autostart=true
autorestart=true
```

---

## PHASE 2: GITHUB

### 2.1 Push ke GitHub

```bash
cd "path/to/project"

# First time
git init
git add .
git commit -m "Initial commit — project description"
git branch -M main
git remote add origin https://github.com/adamsalehuddin91/[repo-name].git
git push -u origin main

# Subsequent pushes
git add .
git commit -m "feat: description"
git push
```

### 2.2 Commit Message Format

```
type: short description

Tokwi - SwiftApps OS Ecosystem
```

| Type | Bila guna |
|------|-----------|
| `feat` | Feature baru |
| `fix` | Bug fix |
| `build` | Deployment/Docker config |
| `refactor` | Code cleanup tanpa ubah behavior |
| `style` | UI/CSS changes |
| `docs` | Documentation |

---

## PHASE 3: COOLIFY SETUP (First Time)

### 3.1 Add Resource

1. Coolify Dashboard → **Project** → Pilih Environment (Production)
2. **+ Add New Resource**
3. Pilih **Private Repository (GitHub)**
4. Pilih repo, branch: `main`
5. Build Pack: **Docker** (auto-detect Dockerfile)

### 3.2 Environment Variables

Pergi tab **Environment Variables** → klik **Developer view** → paste semua sekali.

**Laravel project:**
```env
APP_NAME=[ProjectName]
APP_ENV=production
APP_KEY=base64:xxxxxx
APP_DEBUG=false
APP_URL=https://[subdomain].swiftapps.my
LOG_CHANNEL=stderr
DB_CONNECTION=sqlite
DB_DATABASE=/app/database/database.sqlite
SESSION_DRIVER=file
SESSION_LIFETIME=120
CACHE_STORE=file
QUEUE_CONNECTION=sync
FILESYSTEM_DISK=public
```

**Next.js project:**
```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://[subdomain].swiftapps.my
# Tambah API keys kalau ada (Supabase, etc.)
```

> **APP_KEY**: Generate sekali je per project — `php artisan key:generate --show`
> Tak perlu generate semula bila redeploy atau tukar server. Copy je key yang sama.

### 3.3 Persistent Storage

Tab **Persistent Storage** → **+ Add**

**Laravel (SQLite + uploads):**

| Container Path | Description |
|----------------|-------------|
| `/app/database` | SQLite database file |
| `/app/storage/app/public` | User uploads (receipts, images) |

**Next.js (kalau ada local storage):**
- Biasanya tak perlu — guna external DB (Supabase/PlanetScale)

> **PENTING**: Tanpa persistent storage, data HILANG setiap kali redeploy!

### 3.4 Domain Setup (Coolify)

Tab **General** → Domain:
- Masukkan: `https://[subdomain].swiftapps.my`
- Port: `80` (Laravel) atau `3000` (Next.js)

### 3.5 Auto-Deploy (Optional)

Tab **Webhooks**:
- Enable **GitHub webhook** supaya auto-deploy bila push ke `main`
- Atau manual deploy dari Coolify dashboard

---

## PHASE 4: CLOUDFLARE DNS

### 4.1 Add DNS Record

1. Cloudflare → Domain `swiftapps.my` → **DNS**
2. **+ Add Record**:

| Field | Value |
|-------|-------|
| Type | `A` |
| Name | `[subdomain]` (e.g. `money`, `lorry`, `salon`) |
| Content | `[Hetzner VPS IP]` |
| Proxy | ON (orange cloud) |
| TTL | Auto |

### 4.2 SSL Settings

**SSL/TLS** → Mode: **Full (Strict)**

> Coolify auto-generate Let's Encrypt SSL cert.
> Cloudflare Full Strict = end-to-end encrypted.

### 4.3 Subdomain Cheat Sheet

| Subdomain | Project | Stack |
|-----------|---------|-------|
| `swiftapps.my` | Landing Page | Next.js |
| `money.swiftapps.my` | SwiftMoney | Laravel |
| `lorry.swiftapps.my` | LorryTech OS | Laravel |
| `pos.swiftapps.my` | PokSystem | Laravel (Railway) |
| *(tambah sendiri)* | | |

---

## PHASE 5: DEPLOY

### 5.1 First Deploy

1. Klik **Deploy** dalam Coolify
2. Tunggu build selesai (check tab **Deployments** / **Logs**)
3. Masuk **Terminal** (tab atas):

```bash
# Laravel sahaja — first time
php artisan migrate --force
php artisan db:seed --force
```

4. Buka URL — verify site live

### 5.2 Routine Deploy (setiap kali)

```
┌─────────────────────────────────────────────┐
│  DEPLOY CHECKLIST                           │
│                                             │
│  [ ] 1. Test local    — npm run build clean │
│  [ ] 2. Commit        — git add + commit    │
│  [ ] 3. Push          — git push origin main│
│  [ ] 4. Deploy        — Coolify auto/manual │
│  [ ] 5. Migrate       — kalau ada migration │
│  [ ] 6. Verify        — buka site, test     │
└─────────────────────────────────────────────┘
```

**Migration (kalau ada table baru):**
```bash
# Dalam Coolify Terminal
php artisan migrate --force
```

---

## PHASE 6: TROUBLESHOOTING

| Masalah | Punca | Fix |
|---------|-------|-----|
| **502 Bad Gateway** | PHP-FPM crash / memory | Check Logs tab, restart container |
| **CSS/JS broken** | Cache lama | Terminal: `php artisan cache:clear && php artisan view:clear` |
| **SQLite database locked** | Concurrent writes | Restart container (SQLite single-writer) |
| **Upload fail** | Volume not mounted | Check Persistent Storage settings |
| **DNS not resolving** | Cloudflare propagation | Tunggu 5 min, check DNS record |
| **SSL error** | Mode mismatch | Cloudflare SSL → Full (Strict) |
| **Build fail** | Missing dependency | Check Dockerfile, composer.json/package.json |
| **Env var missing** | Tak set dalam Coolify | Environment Variables → tambah |
| **Site down after redeploy** | Data hilang | Persistent Storage tak setup! |

### Rollback
Coolify simpan previous builds. Kalau ada issue:
**Deployments** tab → Pilih build sebelumnya → **Rollback**

---

## QUICK REFERENCE CARD

```
╔══════════════════════════════════════════════╗
║  DEPLOYMENT QUICK REFERENCE                  ║
╠══════════════════════════════════════════════╣
║                                              ║
║  NEW PROJECT:                                ║
║  1. Dockerfile + .gitignore ✓                ║
║  2. git push to GitHub                       ║
║  3. Coolify: Add Resource → Docker           ║
║  4. Coolify: Env vars (APP_KEY!)             ║
║  5. Coolify: Persistent Storage              ║
║  6. Cloudflare: A record → VPS IP            ║
║  7. Deploy → migrate → verify                ║
║                                              ║
║  ROUTINE DEPLOY:                             ║
║  build → commit → push → auto-deploy         ║
║                                              ║
║  EMERGENCY:                                  ║
║  Coolify → Deployments → Rollback            ║
║                                              ║
╚══════════════════════════════════════════════╝
```

---

*Guideline ini cover Laravel + Next.js projects on Coolify + Hetzner + Cloudflare.*
*Update bila ada stack baru atau workflow berubah.*
