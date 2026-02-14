# Admin Dashboard Quick Start

## 🚀 5-Minute Setup Guide

Follow these steps to get your admin dashboard running:

### Step 1: Database Setup (Choose One)

#### Option A: Use Without Database (Testing Only)
The website will use fallback data. Admin dashboard **will not work** without a database.

#### Option B: Vercel Postgres (Recommended)
1. Deploy to Vercel or go to your Vercel project
2. Storage → Create Database → Postgres
3. Copy `DATABASE_URL` from environment variables
4. Paste into your `.env` file

#### Option C: Local PostgreSQL
```bash
# Install PostgreSQL, then:
createdb sdp_database

# Add to .env:
DATABASE_URL="postgresql://postgres:password@localhost:5432/sdp_database"
```

### Step 2: Environment Variables

Your `.env` file should have:

```env
DATABASE_URL="your-database-url-here"
NEXTAUTH_SECRET="vJ3KpP9mN2xR8tQ7wL4bD6fH1jC5nV0yZ9gS8aE3mT6="
NEXTAUTH_URL="http://localhost:3000"
```

**Generate your own secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Step 3: Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Create tables
npx prisma db push
```

### Step 4: Create Admin Account

```bash
npm run create-admin
```

**Output:**
```
✅ Admin user created successfully!

Admin Credentials:
==================
Email: admin@sdp.com
Password: admin123

⚠️  Please change the password after first login!
```

### Step 5: Start Server & Login

```bash
npm run dev
```

Then visit:
1. **Website**: http://localhost:3000
2. **Admin Login**: http://localhost:3000/admin/login
3. Login with:
   - Email: `admin@sdp.com`
   - Password: `admin123`

---

## ✅ You're Done!

You can now:
- ✨ **Add Events**: Go to `/admin/events` → Click "Add Event"
- 👥 **Manage Team**: Go to `/admin/team` → Add team members
- ❓ **Update FAQs**: Go to `/admin/faqs` → Create FAQs
- 📧 **View Messages**: Go to `/admin/messages` → See contact submissions

**All changes appear instantly on the public website!**

---

## 📱 How to Add Your First Event

1. Login to admin dashboard
2. Click "Events" in sidebar
3. Click "Add Event" button
4. Fill in:
   - Title: "Web Development Workshop"
   - Description: "Learn React and Next.js from scratch"
   - Date: Pick a future date
   - Time: "6:00 PM"
   - Location: "Room 101, Tech Building"
   - Category: "Workshop"
5. Click "Create Event"

**Visit `/events` on your website → Event appears immediately!**

---

## 🔒 Production Deployment

When deploying to Vercel:

1. **Set Environment Variables** in Vercel Dashboard:
   ```
   DATABASE_URL = your-vercel-postgres-url
   NEXTAUTH_SECRET = your-production-secret
   NEXTAUTH_URL = https://your-domain.com
   ```

2. **Deploy & Setup Database**:
   ```bash
   # In Vercel Functions logs or locally with production DATABASE_URL:
   npx prisma db push
   node scripts/create-admin.js
   ```

3. **Access Admin**:
   - Visit: `https://your-domain.com/admin/login`
   - Login with default credentials
   - **IMMEDIATELY change password!**

---

## 🆘 Troubleshooting

### "Invalid credentials" on login
```bash
# Recreate admin user:
npm run create-admin
```

### Database connection error
```bash
# Check your DATABASE_URL in .env
# Then run:
npx prisma db push
```

### Changes not appearing
- Hard refresh browser (Ctrl+Shift+R)
- Check browser console for errors
- Verify database connection

### Can't access /admin/dashboard
- You must login at `/admin/login` first
- Check that you created the admin user
- Verify NEXTAUTH_SECRET is set

---

## 📚 Full Documentation

- **Admin Guide**: [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) - Complete admin documentation
- **Deployment**: [DEPLOYMENT.md](./DEPLOYMENT.md) - Vercel deployment guide
- **General**: [README.md](./README.md) - Project overview

---

## 🎯 Next Steps

1. ✅ Setup complete? → Change default admin password
2. ✅ Password changed? → Add your first event
3. ✅ Event added? → Add team members
4. ✅ Team added? → Update FAQs
5. ✅ Content ready? → Deploy to Vercel!

**Need help? Check [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) for detailed instructions.**
