# SDP Website - Student Development Program

A modern, production-ready website built for the Student Development Program with impressive animations, interactive backgrounds, and a scalable architecture.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: PostgreSQL with Prisma ORM
- **Icons**: React Icons
- **Deployment**: Vercel

## ✨ Features

- 🎨 **Interactive Particle Background** - Dynamic canvas-based background that responds to mouse movement
- 🎯 **Custom Animated Cursor** - Smooth custom cursor with hover effects
- 🎭 **Animated Logo** - Eye-catching logo with rotation and pulse animations
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- 🎬 **Smooth Page Transitions** - Framer Motion powered page transitions
- 🗄️ **Database Integration** - Prisma ORM with PostgreSQL for data management
- 📊 **API Routes** - RESTful API endpoints for events, team, and contact
- 🔐 **Admin Dashboard** - Full-featured admin panel for content management
- 👥 **Role-Based Access** - Admin and user roles with protected routes
- ♿ **Accessible** - Built with accessibility best practices
- 🎨 **Modern UI** - Gradient effects, glassmorphism, and modern design patterns

## 🔐 Admin Dashboard

The website includes a powerful admin dashboard that allows you to manage all content without touching code:

### Features:
- **Events Management** - Add, edit, and delete events with a beautiful UI
- **Team Management** - Manage team member profiles and social links
- **FAQs Management** - Create and update frequently asked questions
- **Contact Messages** - View and manage contact form submissions
- **Real-time Updates** - All changes are instantly visible to users
- **Secure Authentication** - NextAuth.js powered login system

### Access:
- **URL**: `/admin/login`
- **Default Credentials**:
  - Email: `admin@sdp.com`
  - Password: `admin123`

⚠️ **Change the default password after first login!**

📖 **Full Documentation**: See [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) for complete setup and usage instructions.

## 📄 Pages

- **Home** - Landing page with hero section and feature highlights
- **About** - Information about SDP mission and values
- **Events** - Dynamic events listing with database integration
- **Team** - Team member profiles with social links
- **FAQs** - Frequently asked questions with accordion UI
- **Contact** - Contact form with database storage

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- npm or yarn package manager

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

   Generate a secure NextAuth secret:
   ```bash
   # Windows PowerShell
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   
   # Linux/Mac
   openssl rand -base64 32
   ```

   For Vercel Postgres (production):
   ```env
   POSTGRES_PRISMA_URL="your-prisma-url"
   POSTGRES_URL_NON_POOLING="your-non-pooling-url"
   NEXTAUTH_SECRET="your-production-secret"
   NEXTAUTH_URL="https://your-domain.com"
   ```

3. **Initialize the database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Create admin user**:
   ```bash
   npm run create-admin
   ```
   This creates the default admin account (admin@sdp.com / admin123)

5. **Run the development server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

6. **Access admin dashboard**:
   - Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
   - Login with default credentials
   - **Change the password immediately!**

## 📦 Database Schema

The project includes models for:
- **User** - Admin and user accounts with role-based access
- **Event** - Store upcoming events
- **TeamMember** - Team member information
- **ContactMessage** - Contact form submissions
- **FAQ** - Frequently asked questions

## 🚀 Deployment to Vercel

### Method 1: Using Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

### Method 2: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables in Vercel dashboard
6. Deploy!

### Setting up Vercel Postgres

1. In your Vercel project dashboard, go to the "Storage" tab
2. Click "Create Database" and select "Postgres"
3. Copy the connection strings to your environment variables
4. The database will be automatically connected to your deployment

## 🎨 Customization

### Colors

The project uses a cyan-purple-pink gradient theme. To customize colors, modify the Tailwind classes in components:
- Primary: `cyan-400`, `cyan-500`
- Secondary: `purple-400`, `purple-500`, `purple-600`
- Accent: `pink-400`, `pink-500`

### Content

- Update team members via the API or directly in the database
- Add/modify events through the database
- Customize page content in respective page files under `app/`

### Logo

Replace the animated logo in `components/AnimatedLogo.tsx` with your own design while keeping the animation structure.

## 📁 Project Structure

```
sdp-website/
├── app/
│   ├── about/          # About page
│   ├── events/         # Events page
│   ├── team/           # Team page
│   ├── faqs/           # FAQs page
│   ├── contact/        # Contact page
│   ├── api/            # API routes
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # Reusable components
├── lib/                # Utility functions
├── prisma/             # Database schema
└── public/             # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma generate` - Generate Prisma Client
- `npx prisma db push` - Push schema changes to database

## 🤝 Contributing

This is a club project template. To add new features:

1. Create a new branch
2. Make your changes
3. Test thoroughly
4. Submit for review

## 🆘 Support

For issues or questions:
- Check the FAQs page
- Contact via the contact form
- Reach out to the development team

## 🎯 Future Enhancements

- [ ] Admin dashboard for content management
- [ ] Event registration system
- [ ] Member portal with authentication
- [ ] Blog section
- [ ] Newsletter integration
- [ ] Image optimization and CDN
- [ ] Analytics integration
- [ ] SEO optimization

---

Built with ❤️ by the SDP Team

