# Deployment Guide – La Marquise Website

## Prerequisites

- **GitHub Account** with repository access
- **Vercel Account** (free tier supported)
- **PostgreSQL Database** (Neon, Render, Supabase, AWS RDS, etc.)
  - Connection string in format: `postgresql://user:password@host:5432/database`
  - Database must be created and accessible

---

## Step 1: Prepare PostgreSQL Database

1. **Create a database** (if not exists):
   ```sql
   CREATE DATABASE la_marquise;
   ```

2. **Get connection string**:
   - Format: `postgresql://[user]:[password]@[host]:[port]/[database]`
   - Example: `postgresql://admin:mypassword@neon.tech:5432/la_marquise`

3. **Test connection locally** (optional):
   ```bash
   DATABASE_URL="postgresql://user:password@host:5432/db" npm run migrate:push
   ```

---

## Step 2: Prepare Local Environment

1. **Copy environment template**:
   ```bash
   cp .env.example .env.local
   ```

2. **Update `.env.local` with your database URL**:
   ```
   DATABASE_URL=postgresql://user:password@host:5432/la_marquise
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run database migrations** (creates `reservations` table):
   ```bash
   npm run migrate:push
   ```

5. **Verify locally**:
   ```bash
   npm run dev
   # Visit http://localhost:3000
   ```

---

## Step 3: Push to GitHub

```bash
git add .
git commit -m "Deployment ready: add env template, logging, migrations"
git push origin main
```

---

## Step 4: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "Add New Project"**
3. **Import your GitHub repo**: `dnemetcha-cpu/la-marquise-website-proton`
4. **Select framework**: Next.js (auto-detected)
5. **Configure environment**:
   - Click **Environment Variables**
   - Add key: `DATABASE_URL`
   - Add value: `postgresql://user:password@host:5432/database`
   - Click **Add**
6. **Deploy**: Click **Deploy**
   - Vercel runs `npm run build`
   - Wait for completion (2-5 minutes)

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Follow prompts to set DATABASE_URL
```

---

## Step 5: Run Database Migrations on Vercel

After initial deployment:

```bash
# Pull Vercel environment variables locally
vercel env pull

# Run migrations
npm run migrate:push

# Push updated schema
git add .
git commit -m "Database schema migrated"
git push
```

Or use Vercel's CLI to run migrations:

```bash
vercel env pull .env.production.local
DATABASE_URL=$(cat .env.production.local | grep DATABASE_URL) npx drizzle-kit push:pg
```

---

## Step 6: Verify Deployment

### Test live endpoints:

1. **Health Check** (confirms DB connectivity):
   ```bash
   curl https://your-site.vercel.app/api/health
   # Expected: { "ok": true, "timestamp": "..." }
   ```

2. **Homepage**:
   ```
   https://your-site.vercel.app
   ```

3. **Reservation Form**:
   - Open homepage
   - Click "Book a Table"
   - Fill form and submit
   - Should see success message
   - Verify reservation saved in database

### Check logs:

```bash
vercel logs <deployment-url>
```

---

## Troubleshooting

### "DATABASE_URL is required" error

- ✅ **Solution**: Verify `DATABASE_URL` is set in Vercel dashboard → Settings → Environment Variables
- Redeploy after setting:
  ```bash
  vercel --prod
  ```

### Health check returns 500

- ✅ **Check**: Database connection string is correct
- ✅ **Check**: Database is accessible from internet (allow Vercel IPs)
- ✅ **Check**: `reservations` table exists (run migrations)

### Reservations not saving

- ✅ **Check**: Database has write permissions
- ✅ **Check**: `reservations` table schema matches `src/db/schema.ts`
- ✅ **Check**: Logs in Vercel dashboard for errors

### Build fails with TypeScript errors

```bash
npm run typecheck
# Fix issues locally, then push
git add .
git commit -m "Fix TypeScript errors"
git push
```

---

## Production Checklist

- [ ] Database created and accessible
- [ ] `DATABASE_URL` set in Vercel environment variables
- [ ] Migrations run: `npm run migrate:push`
- [ ] Health check passes: `/api/health` returns `{ "ok": true }`
- [ ] Homepage loads and renders correctly
- [ ] Reservation form submits and saves to database
- [ ] Email notifications configured (optional)
- [ ] Monitoring/logging set up (Sentry, Vercel Logs, etc.)
- [ ] Custom domain configured (if applicable)

---

## Optional Enhancements

### Add Email Notifications

When a reservation is made, send email to restaurant owner:

1. **Install email service** (Resend, SendGrid, etc.):
   ```bash
   npm install resend
   ```

2. **Update `/api/reservations/route.ts`**:
   ```typescript
   import { Resend } from "resend";

   const resend = new Resend(process.env.RESEND_API_KEY);

   // After successful insert:
   await resend.emails.send({
     from: "reservations@lamarquise.com",
     to: "lamarquisedouala@gmail.com",
     subject: `New Reservation: ${values.name}`,
     html: `<p>Name: ${values.name}</p>...`,
   });
   ```

3. **Add `RESEND_API_KEY`** to Vercel environment variables

### Add Monitoring (Sentry)

1. **Install Sentry**:
   ```bash
   npm install @sentry/nextjs
   ```

2. **Initialize in `src/instrumentation.ts`** (see Sentry docs)
3. **Add `SENTRY_DSN`** to Vercel environment variables

### Rate Limiting with Redis (Upstash)

For multi-instance deployments:

1. **Create Upstash Redis instance** at [upstash.com](https://upstash.com)
2. **Install client**:
   ```bash
   npm install @upstash/redis
   ```

3. **Update rate limiter** in `/api/reservations/route.ts`

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Drizzle ORM**: https://orm.drizzle.team
- **PostgreSQL**: https://www.postgresql.org/docs

---

**Last Updated**: 2026-09-03
**Maintainer**: La Marquise Development Team
