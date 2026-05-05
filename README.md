## ReviewFlow SaaS

ReviewFlow is a production-oriented SaaS web app that helps businesses collect customer feedback via QR codes while increasing public Google reviews.

### Core Product Flow

1. Business signs up and logs in
2. Business creates one or more locations
3. System generates unique review links and downloadable QR codes
4. Customer scans QR and rates from 1-5 stars
5. Routing behavior:
   - Rating >= threshold: customer is asked to leave a Google review and gets redirected
   - Rating < threshold: customer is shown an internal feedback form (message required)

Each location has a configurable redirect threshold:
- `4` means `4-5` stars go to Google
- `3` means `3-5` stars go to Google

### Tech Stack

- Next.js 14 (App Router)
- Prisma + PostgreSQL
- JWT cookie auth (`jose`) + password hashing (`bcryptjs`)
- Tailwind CSS + Framer Motion
- `qrcode` for QR generation and download

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env variables:
   ```bash
   cp .env.example .env
   ```
3. Update `.env` with your real `DATABASE_URL` and `JWT_SECRET`.
4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```
5. Create and apply database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
6. Start development server:
   ```bash
   npm run dev
   ```

### Production Notes

- Set `NODE_ENV=production`
- Use a managed PostgreSQL service
- Set a strong `JWT_SECRET` (32+ random chars)
- Set `NEXT_PUBLIC_APP_URL` to your deployed domain
- Run `npx prisma migrate deploy` during deployment
