# 🎉 SDP Website - Getting Started Guide

Welcome to the SDP (Student Development Program) website! This guide will help you get the website up and running.

## 🚀 Quick Start (Development)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Database (Optional for initial testing)

The website works without a database using fallback data. To enable full database features:

1. **Create a `.env` file**:
   ```bash
   cp .env.example .env
   ```

2. **Add your database URL**:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/sdp_db"
   ```

3. **Initialize Prisma**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

### Step 3: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎊

## 🎨 What You'll See

### Interactive Features:
- ✨ **Moving particle background** that follows your mouse
- 🎯 **Custom cursor** with smooth animations  
- 🔄 **Animated logo** that pulses and spins on hover
- 📱 **Responsive navigation** with mobile menu
- 🎬 **Smooth page transitions** between routes

### Pages:
1. **Home** (`/`) - Hero section with call-to-action
2. **About** (`/about`) - Mission, values, and statistics
3. **Events** (`/events`) - Upcoming events listing
4. **Team** (`/team`) - Team member profiles
5. **FAQs** (`/faqs`) - Collapsible FAQ section
6. **Contact** (`/contact`) - Contact form and information

## 🛠️ Customization Guide

### Change Colors

Edit Tailwind classes in components. Current theme:
- **Primary**: Cyan (`cyan-400`, `cyan-500`)
- **Secondary**: Purple (`purple-500`, `purple-600`)
- **Accent**: Pink (`pink-400`, `pink-500`)

Example - Change button colors in [page.tsx](app/page.tsx#L58):
```tsx
// Current
className="bg-gradient-to-r from-cyan-500 to-purple-600"

// Change to blue-green
className="bg-gradient-to-r from-blue-500 to-green-600"
```

### Update Logo

Edit [components/AnimatedLogo.tsx](components/AnimatedLogo.tsx):
```tsx
// Change the text
<motion.div className="text-white font-bold text-2xl">
  SDP  {/* Change this to your club name */}
</motion.div>
```

### Modify Content

- **Hero Text**: Edit [app/page.tsx](app/page.tsx)
- **About Info**: Edit [app/about/page.tsx](app/about/page.tsx)
- **Contact Details**: Edit [components/Footer.tsx](components/Footer.tsx) and [app/contact/page.tsx](app/contact/page.tsx)

### Add Events/Team Members

**Without Database** (temporary):
Edit the fallback data in:
- Events: [app/api/events/route.ts](app/api/events/route.ts)
- Team: [app/api/team/route.ts](app/api/team/route.ts)

**With Database** (recommended):
1. Set up database (see Step 2 above)
2. Use Prisma Studio:
   ```bash
   npx prisma studio
   ```
3. Add data through the GUI at [http://localhost:5555](http://localhost:5555)

## 📊 Database Management

### View Data
```bash
npx prisma studio
```

### Update Schema
1. Edit [prisma/schema.prisma](prisma/schema.prisma)
2. Apply changes:
   ```bash
   npx prisma db push
   ```

### Reset Database
```bash
npx prisma db push --force-reset
```

## 🚀 Deployment

### Deploy to Vercel (Easiest)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Deploy**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repo
   - Click "Deploy"

3. **Add Database** (in Vercel Dashboard):
   - Go to Storage tab
   - Create Postgres database
   - Environment variables are auto-configured!

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🎯 Common Tasks

### Add a New Page
1. Create folder in `app/`: `app/blog/`
2. Add `page.tsx` in that folder
3. Add link to navigation in [components/Navbar.tsx](components/Navbar.tsx)

### Modify Animations
Edit Framer Motion props in components:
```tsx
// Example: Change fade-in duration
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.5 }} // Change this
>
```

### Change Particle Background
Edit [components/InteractiveBackground.tsx](components/InteractiveBackground.tsx):
- Line 24: Change particle count
- Line 65: Change particle colors
- Line 51: Adjust mouse interaction distance

## 📱 Testing

### Desktop
- Chrome/Edge: Full features including custom cursor
- Firefox: Full features
- Safari: Full features

### Mobile
- Custom cursor disabled (uses native touch)
- All animations work
- Responsive design adapts

## 🆘 Troubleshooting

### "Module not found" errors
```bash
npm install
```

### Styles not loading
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Database errors
Website works without database! Database errors won't break the site - it falls back to demo data.

### Build errors
Check [app/layout.tsx](app/layout.tsx) - ensure metadata is properly typed.

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)

## 🤝 Need Help?

- Check existing issues
- Contact the development team
- Review documentation in `README.md` and `DEPLOYMENT.md`

---

**Happy coding! 🚀** Build something amazing with SDP!
