# Food Waste Management System

A modernized, Next.js 16-powered logistical platform dedicated to eradicating local food waste by bridging the gap between excess food sources (restaurants, weddings, citizens) and local distribution charities/NGOs.

## Key Features

- Decentralized Roles: Secure, autonomous dashboards for Donors, Administrators, and Delivery logisticians.
- Hardware Geolocation Logistics: Mandatory one-click Locate Me browser-GPS integration securely maps food pickup coordinates without typing.
- Live PostgreSQL Integration: Real-time data persistence using Supabase and Prisma 7.6.0.
- Dual-Storage Failover: Engineered to utilize browser caching (localStorage) if the database connection is unavailable, ensuring the application remains functional during demonstrations.

---

## Getting Started

This application requires Node.js (v18+) and npm to run. If you do not have them, install them from the [official website](https://nodejs.org/).

### 1. Installation

Open your terminal (Mac/Linux) or Command Prompt/PowerShell (Windows) and navigate into the application root directory:

```bash
cd next-app
npm install
```

### 2. Environment Configuration

Create a file named `.env` at the root of the project directory (next-app/.env) and add the following configuration:

```env
OPENROUTER_API_KEY="sk-or-v1-yours"
DATABASE_URL="postgresql://postgres:password@host:port/postgres"
```

Replace the values with your actual database credentials and API keys.

### 3. Database Setup (Automated)

This project features an automated database initializer. To synchronize your database schema:

1. Log in to the Admin Dashboard (Credentials below).
2. Locate the "Sync Database" button at the bottom of the sidebar.
3. Click to automatically build all required PostgreSQL tables on your connected Supabase instance.

Alternatively, you can synchronize via the command line:

```bash
npx prisma db push
npx prisma generate
```

### 4. Running the Development Server

Start the development server on your machine:

```bash
npm run dev
```

The application will be available at http://localhost:3000.

---

## Operating the Platform

This application uses a dual-storage strategy. It prioritizes the PostgreSQL database but falls back to localStorage if the database is offline.

### Admin Gateway
To access the administrative dashboard, use the following credentials:
- Email: admin@gmail.com
- Password: admin123

### User Roles
- Donors: Sign up as a regular user to begin donating food.
- Delivery: Create a delivery driver account to view map coordinates and manage pickups.

---

## Hosting and Deployment

This application is optimized for free hosting using industry-standard cloud providers.

### 1. Frontend Hosting (Vercel)
The project is built with Next.js 16 and can be deployed directly to Vercel:
1. Push your project files to a GitHub repository.
2. Connect the repository to a new project on [Vercel](https://vercel.com/).
3. In the Vercel project settings, navigate to 'Environment Variables'.
4. Add your `DATABASE_URL` and `OPENROUTER_API_KEY` from your local `.env` file.
5. Deploy the project. The application will be live on a public URL.

### 2. Database Hosting (Supabase)
The PostgreSQL database is hosted on Supabase's free tier:
1. Ensure your Supabase instance is active.
2. Use the "Sync Database" feature in the Admin Dashboard to build your tables on the live instance.
3. The application will automatically utilize the live database when the `DATABASE_URL` is configured in your hosting environment.
