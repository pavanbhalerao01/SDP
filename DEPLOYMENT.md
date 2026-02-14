# SDP Website - Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - SDP Website"
   git branch -M main
   git remote add origin your-github-repo-url
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**:
   Add these in Vercel Dashboard → Settings → Environment Variables:
   ```
   DATABASE_URL=your-database-url
   ```

4. **Set up Vercel Postgres** (if you don't have a database):
   - In your Vercel project, go to Storage tab
   - Click "Create Database" → Select "Postgres"
   - Vercel will automatically set `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING`
   - Copy these variables to your local `.env` for development

5. **Deploy**:
   - Click "Deploy"
   - Your site will be live in ~2 minutes!

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Set environment variables**:
   ```bash
   vercel env add DATABASE_URL
   ```

5. **Deploy to production**:
   ```bash
   vercel --prod
   ```

## Post-Deployment Setup

### Initialize Database

After deployment, initialize your database with Prisma:

```bash
# Using Vercel CLI
vercel env pull .env.local
npx prisma generate
npx prisma db push
```

Or use Vercel's remote CLI:
```bash
vercel exec -- npx prisma db push
```

### Verify Deployment

1. Check your deployment URL (e.g., `your-project.vercel.app`)
2. Test all pages:
   - Home: `/`
   - About: `/about`
   - Events: `/events`
   - Team: `/team`
   - FAQs: `/faqs`
   - Contact: `/contact`

3. Test API endpoints:
   - `GET /api/events`
   - `GET /api/team`
   - `POST /api/contact`

## Custom Domain Setup

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed by Vercel
4. SSL certificate will be automatically provisioned

## Continuous Deployment

Every push to your `main` branch will automatically trigger a new deployment!

Preview deployments are created for pull requests.

## Monitoring

- View deployment logs in Vercel Dashboard
- Monitor performance with Vercel Analytics
- Set up error tracking (optional)

## Troubleshooting

### Build Fails
- Check build logs in Vercel Dashboard
- Ensure all dependencies are in `package.json`
- Verify environment variables are set

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check if Prisma schema is synced
- Ensure database is accessible from Vercel

### API Routes Not Working
- Check function logs in Vercel Dashboard
- Verify API route files are in `app/api/` directory
- Ensure proper HTTP methods are used

## Environment Variables Reference

Required:
- `DATABASE_URL` - PostgreSQL connection string

Optional (for Vercel Postgres):
- `POSTGRES_PRISMA_URL` - Prisma connection URL
- `POSTGRES_URL_NON_POOLING` - Non-pooling connection URL

---

Your SDP website is now live! 🎉
