# La Marquise — Restaurant & Lounge Website

A modern, bilingual (English/French) website for **La Marquise**, an upscale restaurant and lounge located in Bonapriso, Douala, Cameroon. Built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **PostgreSQL**.

## Features

- 🌍 **Bilingual UI** — Full English/French support with real-time language switching
- 🍽️ **Dynamic Menu** — Gastronomic restaurant, fast-food, and bar offerings
- 📅 **Reservation System** — Full booking form with validation, rate limiting, and database persistence
- 📱 **Responsive Design** — Mobile-first, optimized for all devices
- ⚡ **Performance Optimized** — Next.js Image optimization, server-side rendering, static generation
- 🔒 **Security** — Content Security Policy, input validation, rate limiting, XSS/injection protection
- ♿ **Accessible** — WCAG 2.1 compliance, semantic HTML, ARIA labels
- 📊 **SEO** — JSON-LD structured data, open graph, sitemap, robots.txt
- 🎨 **Beautiful UI** — Custom SVG icons, smooth animations, modern typography

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.2.6 | React framework, server components, API routes |
| React | 19.2.6 | UI library |
| TypeScript | 5.9.3 | Type safety |
| Tailwind CSS | 4.1.17 | Styling |
| Drizzle ORM | 0.45.2 | Database layer |
| PostgreSQL | 14+ | Data persistence |
| Node.js | 18+ | Runtime |

## Quick Start

### Prerequisites

- **Node.js** 18+
- **PostgreSQL** database
- **npm** or **yarn**

### Local Development

1. **Clone repository**:
   ```bash
   git clone https://github.com/dnemetcha-cpu/la-marquise-website-proton.git
   cd la-marquise-website-proton
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your DATABASE_URL
   ```

4. **Run migrations**:
   ```bash
   npm run migrate:push
   ```

5. **Start dev server**:
   ```bash
   npm run dev
   ```

6. **Open browser**:
   ```
   http://localhost:3000
   ```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/
│   │   ├── health/        # Database health check
│   │   └── reservations/  # Booking endpoint (POST)
│   ├── globals.css        # Tailwind & custom styles
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage (bilingual)
│   ├── manifest.ts        # PWA manifest
│   ├── robots.ts          # SEO robots.txt
│   └── sitemap.ts         # SEO sitemap
├── components/
│   └── ErrorBoundary.tsx  # React error boundary
├── db/
│   ├── index.ts           # Drizzle client setup
│   └── schema.ts          # Database schema (reservations table)
└── lib/
    ├── i18n.tsx           # Bilingual context & hooks
    ├── logger.ts          # Structured logging
    └── site.ts            # Content & config (menu, hours, FAQs)

Config files:
├── next.config.ts         # Security headers, image optimization
├── drizzle.config.ts      # ORM configuration
├── tsconfig.json          # TypeScript config
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.mjs     # CSS processing
├── eslint.config.mjs      # Linting rules
└── .prettierrc.json       # Code formatting
```

## Available Scripts

```bash
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production
npm start                # Run production server
npm run lint             # Run ESLint
npm run typecheck        # Run TypeScript checker
npm run format           # Format code with Prettier
npm run migrate:push     # Apply database migrations
npm run migrate:generate # Generate migration files
npm run db:studio        # Open Drizzle Studio (visual DB explorer)
```

## API Endpoints

### `POST /api/reservations`

Create a new reservation.

**Request**:
```json
{
  "name": "Amélie Njoya",
  "email": "amelie@example.com",
  "phone": "+237 698 434 343",
  "date": "2026-09-15",
  "time": "19:30",
  "guests": "4",
  "level": "gastronomic",
  "occasion": "Birthday",
  "message": "Please prepare a special surprise"
}
```

**Response** (201):
```json
{
  "success": true,
  "id": 42
}
```

**Error** (400/429/500):
```json
{
  "error": "Descriptive error message"
}
```

### `GET /api/health`

Check database connectivity.

**Response** (200):
```json
{
  "ok": true,
  "timestamp": "2026-09-03T12:34:56.789Z"
}
```

## Deployment

### Deploy to Vercel (Recommended)

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for step-by-step instructions.

**Quick summary**:
1. Push to GitHub
2. Import to Vercel
3. Set `DATABASE_URL` environment variable
4. Deploy & run migrations

### Environment Variables

| Variable | Required | Example |
|----------|----------|---------|
| `DATABASE_URL` | ✅ | `postgresql://user:pass@host:5432/db` |
| `NODE_ENV` | ❌ | `production` (set by Vercel) |
| `VERCEL_ENV` | ❌ | `production` (set by Vercel) |

## Development

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

### Code Formatting

```bash
npm run format
```

### Database Management

```bash
# Push schema to database
npm run migrate:push

# Generate migration files
npm run migrate:generate

# Open visual database explorer
npm run db:studio
```

## Testing Locally

### Test Health Check

```bash
curl http://localhost:3000/api/health
```

### Test Reservation

```bash
curl -X POST http://localhost:3000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+237 698 434 343",
    "date": "2026-09-15",
    "time": "19:30",
    "guests": "2"
  }'
```

## Features in Detail

### Bilingual Support

- **Language Context**: `src/lib/i18n.tsx` provides `useI18n()` hook
- **Content**: All strings in `src/lib/site.ts` with EN/FR variants
- **Storage**: Language preference in URL query param (`?lang=fr`)
- **Switching**: Language toggle in header and footer

### Security

- **Content Security Policy** (CSP) via `next.config.ts`
- **Input Validation** on all form fields
- **Rate Limiting** (8 requests per IP per 10 minutes)
- **XSS Protection** via React auto-escaping
- **SQL Injection Prevention** via Drizzle ORM (parameterized queries)

### Performance

- **Image Optimization**: Next.js Image component, WebP/AVIF support
- **Code Splitting**: Automatic per-route
- **Caching**: 1-year cache for assets, 1-hour for pages
- **Bundle Size**: ~50KB gzipped (optimized)

### SEO

- **Metadata**: Full Open Graph, Twitter cards, JSON-LD
- **Structured Data**: Restaurant schema with hours, address, menu
- **Sitemap**: Auto-generated at `/sitemap.xml`
- **Robots**: Auto-generated at `/robots.txt`
- **Mobile Friendly**: Responsive design, touch-optimized

## Troubleshooting

### `DATABASE_URL is required` Error

```bash
# Ensure .env.local has DATABASE_URL
cat .env.local | grep DATABASE_URL

# If missing, add it
echo 'DATABASE_URL=postgresql://user:pass@host:5432/db' >> .env.local
```

### Build Fails with TypeScript Errors

```bash
npm run typecheck
# Fix errors in source files
git add .
git commit -m "Fix TypeScript errors"
```

### Reservation Not Saving

1. Check `/api/health` returns `{ "ok": true }`
2. Verify database connectivity: `psql $DATABASE_URL`
3. Check `reservations` table exists: `\dt reservations`
4. Review logs: `npm run dev` and check console

### Styling Not Loading

```bash
# Rebuild Tailwind
rm -rf .next
npm run build
```

## Future Enhancements

- [ ] Email notifications on new reservations (Resend/SendGrid)
- [ ] Admin dashboard for viewing reservations
- [ ] Payment integration (Stripe/Paystack)
- [ ] Image gallery
- [ ] Google Reviews integration
- [ ] WhatsApp integration
- [ ] Multi-language support (beyond EN/FR)
- [ ] Dark mode

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private. All rights reserved © 2026 La Marquise.

## Support

- **Website**: https://lamarquise-douala.vercel.app
- **Email**: lamarquisedouala@gmail.com
- **Phone**: +237 698 434 343
- **Address**: Rue Tokoto, Bonapriso, Douala, Cameroon

---

**Built with ❤️ for La Marquise Restaurant & Lounge**
