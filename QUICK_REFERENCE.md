# ⚡ Quick Customization Reference

## 🎨 Common Changes

### 1. Change Club Name/Logo

**File**: `components/AnimatedLogo.tsx`
```tsx
// Line 34 - Change "SDP" to your club name
<motion.div className="text-white font-bold text-2xl">
  YOUR_CLUB_NAME
</motion.div>
```

**File**: `components/Navbar.tsx`
```tsx
// Lines 47-49
<h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
  YOUR_CLUB_NAME
</h1>
<p className="text-xs text-gray-400">Your Club Description</p>
```

---

### 2. Update Home Page Hero

**File**: `app/page.tsx`

**Hero Badge** (Line 20):
```tsx
<span className="px-4 py-2 ...">
  Welcome to YOUR_CLUB
</span>
```

**Hero Title** (Lines 27-32):
```tsx
<motion.h1 className="...">
  Your Amazing
  <br />
  Club Name
</motion.h1>
```

**Hero Description** (Lines 39-42):
```tsx
<motion.p className="...">
  Your custom description here
</motion.p>
```

---

### 3. Change Color Scheme

**Current**: Cyan-Purple-Pink  
**Method**: Find & replace Tailwind classes

| Current | Example Replacement |
|---------|-------------------|
| `cyan-400` | `blue-400` (for blue) |
| `cyan-500` | `blue-500` |
| `purple-500` | `indigo-500` (for indigo) |
| `purple-600` | `indigo-600` |
| `pink-400` | `rose-400` (for rose) |

**Popular Palettes**:
- 🔵 Blue-Indigo: `blue-400`, `indigo-500`, `violet-600`
- 🟢 Green-Emerald: `green-400`, `emerald-500`, `teal-600`
- 🔴 Red-Orange: `red-400`, `orange-500`, `amber-600`

---

### 4. Modify Background Particles

**File**: `components/InteractiveBackground.tsx`

**Particle Count** (Line 24):
```tsx
const particleCount = 100; // Change this number
```

**Particle Colors** (Lines 65-67):
```tsx
gradient.addColorStop(0, 'rgba(6, 182, 212, 0.8)'); // Cyan
gradient.addColorStop(1, 'rgba(147, 51, 234, 0.4)'); // Purple
```

**Mouse Interaction Distance** (Line 51):
```tsx
if (distance < 150) { // Change 150 to adjust range
```

---

### 5. Update Contact Information

**File**: `app/contact/page.tsx`

**Email** (Line 106):
```tsx
<a href="mailto:contact@sdp.com">contact@yourclub.com</a>
```

**Phone** (Line 116):
```tsx
<a href="tel:+15551234567">+1 (555) 123-4567</a>
```

**Location** (Lines 126-128):
```tsx
<p className="text-gray-400">
  Your University Campus<br />
  Student Center, Room 205
</p>
```

**Also update in**: `components/Footer.tsx` (Lines 42-44)

---

### 6. Add Team Members

**Option A: Database** (Recommended):
```bash
npx prisma studio
```
Go to TeamMember table → Add new

**Option B: Temporary Fallback**:  
**File**: `app/api/team/route.ts` (Lines 60-95)
```tsx
{
  id: 1,
  name: 'Your Name',
  role: 'Your Role',
  bio: 'Your bio',
  image: '/team/placeholder.jpg',
  social: {
    linkedin: 'https://linkedin.com/in/yourprofile',
    github: 'https://github.com/yourprofile',
    email: 'your.email@example.com',
  },
}
```

---

### 7. Add Events

**Option A: Database** (Recommended):
```bash
npx prisma studio
```
Go to Event table → Add new

**Option B: Temporary Fallback**:  
**File**: `app/api/events/route.ts` (Lines 18-34)
```tsx
{
  id: 1,
  title: 'Your Event Name',
  description: 'Event description',
  date: '2026-03-15',
  time: '14:00',
  location: 'Event location',
  category: 'Workshop',
}
```

---

### 8. Modify About Page Stats

**File**: `app/about/page.tsx` (Lines 88-102)
```tsx
<div className="text-5xl font-bold text-cyan-400 mb-2">500+</div>
<div className="text-gray-300">Active Members</div>
```

---

### 9. Update Footer Links

**File**: `components/Footer.tsx`

**Social Media** (Lines 34-37):
```tsx
<li><a href="https://linkedin.com/company/yourclub">LinkedIn</a></li>
```

**Quick Links** (Lines 24-27):
```tsx
<li><a href="/">Home</a></li>
```

---

### 10. Change Animation Speed

**Page Transitions** (File: `components/PageTransition.tsx`):
```tsx
transition={{ duration: 0.5 }}  // Change 0.5 to speed up/slow down
```

**Logo Animation** (File: `components/AnimatedLogo.tsx`, Line 23):
```tsx
transition={{ duration: 2 }}  // Rotation speed
```

**Hover Effects**:
```tsx
whileHover={{ y: -10 }}  // Change -10 for lift amount
```

---

## 🎯 Quick Tasks

### Add a New Page
1. Create folder: `app/yourpage/`
2. Create file: `app/yourpage/page.tsx`
3. Copy from existing page
4. Add link in `components/Navbar.tsx`

### Change Navbar Links
**File**: `components/Navbar.tsx` (Lines 8-15)
```tsx
const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Your New Page', href: '/newpage' },
];
```

### Disable Custom Cursor
**File**: `app/layout.tsx`  
Comment out line 25:
```tsx
{/* <CustomCursor /> */}
```

### Hide Background Particles
**File**: `app/layout.tsx`  
Comment out line 24:
```tsx
{/* <InteractiveBackground /> */}
```

---

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Database
npx prisma studio        # Open database GUI
npx prisma generate      # Generate Prisma Client
npx prisma db push       # Update database schema

# Deployment
vercel                   # Deploy to Vercel
vercel --prod            # Deploy to production
```

---

## 📱 Test Checklist

After making changes:
- [ ] Test on desktop (Chrome, Firefox)
- [ ] Test on mobile (responsive view)
- [ ] Check all navigation links work
- [ ] Verify animations are smooth
- [ ] Test forms (if database is set up)
- [ ] Run `npm run build` to check for errors

---

## 🆘 Common Issues

**Build fails**: Run `npm run build` to see errors  
**Styles broken**: Clear `.next` folder and rebuild  
**Database errors**: Check `.env` file exists  
**Import errors**: Run `npm install`  
**Prisma errors**: Run `npx prisma generate`

---

## 📚 File Locations Quick Reference

| What to Change | File Location |
|----------------|---------------|
| Logo | `components/AnimatedLogo.tsx` |
| Navbar | `components/Navbar.tsx` |
| Footer | `components/Footer.tsx` |
| Home Page | `app/page.tsx` |
| About Page | `app/about/page.tsx` |
| Events Page | `app/events/page.tsx` |
| Team Page | `app/team/page.tsx` |
| Contact Page | `app/contact/page.tsx` |
| FAQs | `app/faqs/page.tsx` |
| Colors | Any component file - search for color names |
| Database Schema | `prisma/schema.prisma` |
| Global Styles | `app/globals.css` |

---

**Pro Tip**: Use VS Code's "Find in Files" (Ctrl+Shift+F) to search for specific text across all files!

---

Need more help? Check `GETTING_STARTED.md` or `README.md`
