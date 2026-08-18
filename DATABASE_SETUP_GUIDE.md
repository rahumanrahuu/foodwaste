# Database & Schema Setup Guide

The system currently relies seamlessly on high-speed browser cache (`localStorage`) which ensures the platform works perfectly for off-grid demonstrations instantly.

However, the complete **Prisma ORM Schema** mapping has been natively integrated for real SQL database deployments!

### The Schema

The physical schema defining the exact relationships between Users, Delivery Persons, and Food Donations is already safely configured in `/prisma/schema.prisma`.

### Activating the SQL Database

If you wish to switch from `localStorage` local caching up to a definitive MySQL Database, here is exactly how to execute it:

1. **Provide the Valid DB URL:** 
   Ensure your `.env` file contains your live specific database URL:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/food_waste_management"
   ```

2. **Auto-Create Tables:**
   Prisma can instantly auto-generate and build the actual SQL tables natively out of thin air. In your terminal, simply run:
   ```bash
   npx prisma db push
   ```
   *(This will connect via your `.env` URL, check if the tables exist, and seamlessly create them if they do not!)*

3. **Generate the Client Engine:**
   ```bash
   npx prisma generate
   ```

### Hybrid Strategy (What we built):
The application components are currently deliberately engineered using a `try/catch(e)` approach on the UI side. 
- During a live demonstration without a database, the components use `localStorage` safely without crashing. 
- To wire the Prisma routes over, you simply replace the `localStorage.getItem()` tags inside the React components with an asynchronous `fetch('/api/donations')` request routing to standard Next.js backend Server Actions!
