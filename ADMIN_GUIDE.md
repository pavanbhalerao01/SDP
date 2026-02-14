# Admin Dashboard Guide

## 🎯 Overview

The SDP Admin Dashboard allows authorized administrators to manage website content in real-time without touching code or redeploying. All changes are instantly visible to users.

## 🔐 Access & Authentication

### Login URL
- **Local**: `http://localhost:3000/admin/login`
- **Production**: `https://your-domain.com/admin/login`

### Default Credentials
```
Email: admin@sdp.com
Password: admin123
```

⚠️ **Important**: Change the default password immediately after first login!

## 🚀 Setup Instructions

### 1. Database Setup (Required)

The admin dashboard requires a PostgreSQL database. Without it, the admin panel won't work.

#### Option A: Vercel Postgres (Recommended for Production)
1. Go to your Vercel project dashboard
2. Click **Storage** → **Create Database** → **Postgres**
3. Copy the `DATABASE_URL` from environment variables
4. Add to your `.env` file:
   ```env
   DATABASE_URL="your-postgres-url-here"
   NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
   NEXTAUTH_URL="https://your-domain.com"
   ```

#### Option B: Local PostgreSQL
1. Install PostgreSQL locally
2. Create a database: `createdb sdp_database`
3. Add to `.env`:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/sdp_database"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

### 2. Generate NextAuth Secret

```bash
# Windows PowerShell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Linux/Mac
openssl rand -base64 32
```

Add the output to `.env` as `NEXTAUTH_SECRET`

### 3. Run Database Migrations

```bash
# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma db push
```

### 4. Create Admin User

```bash
node scripts/create-admin.js
```

This creates the default admin account with:
- Email: `admin@sdp.com`
- Password: `admin123`

## 📋 Dashboard Features

### 1. **Dashboard Home** (`/admin/dashboard`)
- Overview statistics:
  - Total events
  - Team members count
  - Unread messages
  - Active FAQs
- Quick action buttons
- Real-time data

### 2. **Events Management** (`/admin/events`)

**Add New Event:**
1. Click "Add Event" button
2. Fill in the form:
   - Title (required)
   - Description (required)
   - Date (required)
   - Time (e.g., "6:00 PM")
   - Location (required)
   - Category: Workshop, Seminar, Hackathon, or Competition
3. Click "Create Event"

**Edit Event:**
1. Click the pencil icon on any event card
2. Modify the fields
3. Click "Update Event"

**Delete Event:**
1. Click the trash icon
2. Confirm deletion
3. Event is permanently removed

**⚡ Live Updates**: Changes appear immediately on the public Events page

### 3. **Team Management** (`/admin/team`)

**Add Team Member:**
1. Click "Add Member"
2. Fill in:
   - Full Name (required)
   - Role/Position (required)
   - Bio (required)
   - Email (optional)
   - LinkedIn URL (optional)
   - GitHub URL (optional)
   - Twitter URL (optional)
3. Click "Create Member"

**Edit/Delete**: Same process as events

**⚡ Live Updates**: Team page updates automatically

### 4. **FAQs Management** (`/admin/faqs`)

**Add FAQ:**
1. Click "Add FAQ"
2. Enter question and answer
3. Toggle "Active" to show/hide from public
4. Click "Create FAQ"

**Edit/Delete**: Same process as events

**⚡ Live Updates**: FAQ page reflects changes instantly

### 5. **Messages** (`/admin/messages`)

**View Contact Messages:**
- See all messages submitted via contact form
- View name, email, subject, message, and timestamp
- Delete processed messages

**⚡ Real-time**: New messages appear as they're submitted

## 🔒 Security & Roles

### User Roles
- **Admin**: Full access to dashboard, can manage all content
- **User**: Regular website visitor, no admin access

### Protected Routes
All `/admin/*` routes except `/admin/login` are protected:
- Unauthenticated users → Redirected to login
- Non-admin users → Redirected to home
- Only users with `role: "admin"` can access

### Session Management
- Sessions use JWT tokens
- Auto-logout on browser close (configurable)
- Secure cookies in production

## 🎨 How Content Updates Work

### The Flow:
1. **Admin** logs into dashboard → `/admin/login`
2. **Admin** adds/edits content → Form submission
3. **Backend** saves to database → PostgreSQL via Prisma
4. **Users** visit website → Data fetched from database
5. **Instant visibility** → No redeployment needed!

### Example: Adding an Event
```
Admin Dashboard → Click "Add Event" → Fill form → Submit
       ↓
   API Route (/api/events POST)
       ↓
   Prisma saves to database
       ↓
   Public events page fetches from API
       ↓
   Users see new event immediately!
```

## 🔧 Troubleshooting

### "Invalid credentials" error
- Check email/password (case-sensitive)
- Ensure admin user was created: `node scripts/create-admin.js`
- Verify database connection

### Database connection errors
- Check `DATABASE_URL` in `.env`
- Run `npx prisma db push`
- Ensure PostgreSQL is running (if local)

### Changes not appearing
- Hard refresh browser (Ctrl+F5 / Cmd+Shift+R)
- Check if database operation succeeded (check console)
- Verify database connection string

### Can't access admin dashboard
- Ensure you're using the correct URL: `/admin/dashboard` (not `/admin`)
- Check browser console for errors
- Verify authentication is working

## 🚀 Production Deployment Checklist

Before deploying to Vercel:

- [ ] Set up Vercel Postgres database
- [ ] Add environment variables to Vercel:
  - `DATABASE_URL`
  - `NEXTAUTH_SECRET`
  - `NEXTAUTH_URL`
- [ ] Run database migrations: `npx prisma db push`
- [ ] Create admin user: `node scripts/create-admin.js`
- [ ] Test login at `/admin/login`
- [ ] **Change default admin password!**

## 📱 Creating Additional Admins

### Method 1: Using API (Recommended)
```javascript
// POST to /api/users
fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'newadmin@sdp.com',
    name: 'New Admin',
    password: 'securepassword',
    role: 'admin'
  })
});
```

### Method 2: Using Database Client
```sql
-- Use Prisma Studio: npx prisma studio
-- Or direct SQL in your PostgreSQL client
INSERT INTO "User" (email, name, password, role, "createdAt", "updatedAt")
VALUES ('admin2@sdp.com', 'Admin 2', 'hashed-password', 'admin', NOW(), NOW());
```

## 🎯 Best Practices

1. **Regular Backups**: Export database regularly
2. **Strong Passwords**: Use complex passwords for admin accounts
3. **Delete Old Messages**: Clean up contact messages periodically
4. **Test Before Deploy**: Test changes on dev server first
5. **Monitor Errors**: Check application logs in Vercel dashboard

## 📞 Need Help?

Common admin tasks:
- **Forgot password**: Contact database admin or reset via Prisma Studio
- **Add bulk data**: Use Prisma Studio for batch imports
- **Export data**: Use `npx prisma studio` → Export function
- **View logs**: Vercel Dashboard → Functions → Logs

## 🔗 Quick Links

- Admin Login: `/admin/login`
- Dashboard: `/admin/dashboard`
- Events: `/admin/events`
- Team: `/admin/team`
- FAQs: `/admin/faqs`
- Messages: `/admin/messages`
