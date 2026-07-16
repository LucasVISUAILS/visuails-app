# VISUAILS - Deployment Guide

## Quick Start (5 Minutes)

This guide will help you deploy your VISUAILS website for FREE using GitHub and Cloudflare.

### What You Need

- A GitHub account (free, takes 2 minutes to create)
- A Cloudflare account (free)
- 5 minutes of your time

---

## Step 1: Create GitHub Account (2 minutes)

1. Go to https://github.com/signup
2. Enter your email, create a password
3. Verify your email
4. Done! You now have a GitHub account

---

## Step 2: Push Code to GitHub (3 minutes)

We've provided all the code. Now you'll upload it to GitHub:

### Option A: Using GitHub Web Interface (Easiest)

1. Go to https://github.com/new
2. Name your repository: `visuails-app`
3. Choose "Public"
4. Click "Create repository"
5. Click "uploading an existing file"
6. Drag and drop ALL files from the `visuails-app` folder
7. Click "Commit changes"
8. Done!

### Option B: Using Command Line (If you know it)

```bash
cd visuails-app
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/visuails-app.git
git push -u origin main
```

---

## Step 3: Deploy to Cloudflare Pages (2 minutes)

1. Go to https://dash.cloudflare.com
2. Sign up for free (or log in)
3. Click "Pages" in the left menu
4. Click "Create a project"
5. Click "Connect to Git"
6. Select your GitHub account
7. Select `visuails-app` repository
8. Keep default settings:
   - **Framework**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
9. Click "Save and Deploy"
10. Wait 1-2 minutes... 
11. ✅ Your site is LIVE!

Cloudflare will give you a URL like: `visuails-app-abc123.pages.dev`

---

## Step 4: Connect Your Own Domain (Optional)

If you have your own domain:

1. In Cloudflare Pages project, go to "Settings"
2. Click "Add custom domain"
3. Enter your domain name
4. Follow instructions to update DNS settings with your domain provider
5. Done in 5-10 minutes

---

## After Deployment - What's Next?

### 1. Add Real AI Processing

The upload tool currently shows demo images. To add real AI:

**Option A: OpenAI API**
```
1. Sign up at https://platform.openai.com
2. Get your API key
3. In Cloudflare Dashboard → Pages → visuails-app → Settings → Environment variables
4. Add: OPENAI_API_KEY = your_key_here
5. Update /src/pages/api/upload.js to use OpenAI
```

**Option B: Replicate (Easier)**
```
1. Sign up at https://replicate.com (free)
2. Get your API key
3. Add to Cloudflare environment variables
4. Use their image models
```

**Option C: Hire a Developer**
Send me the AI model you want to use, I'll integrate it.

### 2. Add Payment Processing (Stripe)

1. Sign up at https://stripe.com
2. Get API keys
3. Add to Cloudflare environment variables:
   - `STRIPE_PUBLIC_KEY`
   - `STRIPE_SECRET_KEY`
4. Update `/src/pages/api/payment.js` to use Stripe SDK
5. Users can now make payments

### 3. Add Database (For User Accounts)

**Option A: Supabase (Free PostgreSQL)**
```
1. Go to https://supabase.com
2. Create project
3. Get connection string
4. Add to environment variables
5. Use in /src/pages/api/auth.js
```

**Option B: Cloudflare D1 (SQLite)**
```
1. In Cloudflare Dashboard, go to D1
2. Create database
3. Connect to your Pages project
4. Use in API routes
```

---

## Troubleshooting

### "Build failed"
- Check that all files were uploaded to GitHub
- Make sure package.json is in the root folder
- Redeploy from Cloudflare Pages → Project → Deployments → Retry

### "Page shows 404"
- Wait 2-3 minutes for initial deployment
- Clear browser cache (Ctrl+Shift+Delete)
- Check Cloudflare Pages deployment logs

### "Upload doesn't work"
- The demo version just shows mock images
- To make it actually transform images, integrate AI (see "After Deployment")

### "Login doesn't work"
- Currently demo only (stores in browser memory)
- To persist users, add a database (Supabase or Cloudflare D1)

---

## File Structure

```
visuails-app/
├── src/
│   ├── pages/
│   │   ├── index.astro          ← Homepage
│   │   ├── app.astro            ← Upload tool
│   │   ├── login.astro          ← Login page
│   │   ├── signup.astro         ← Sign up page
│   │   └── api/
│   │       ├── upload.js        ← Image upload handler
│   │       ├── auth.js          ← Login/signup handler
│   │       └── payment.js       ← Payment handler
│   ├── components/
│   │   ├── Hero.astro           ← Homepage hero section
│   │   ├── Pricing.astro        ← Pricing section
│   │   └── UploadForm.jsx       ← Upload form (React)
│   ├── layouts/
│   │   └── Layout.astro         ← Main layout (nav + footer)
│   └── styles/
│       └── global.css           ← Global styles
├── public/                       ← Static files (images, icons)
├── astro.config.mjs             ← Astro configuration
├── wrangler.toml                ← Cloudflare Workers config
├── package.json                 ← Dependencies
└── DEPLOYMENT_GUIDE.md          ← This file!
```

---

## Customization

### Change Colors

Edit `/src/styles/global.css`:
```css
:root {
  --brand-primary: #0066ff;      ← Change blue
  --brand-secondary: #00d4ff;    ← Change cyan
  --brand-dark: #0a0a0a;         ← Change black
  --brand-light: #f5f5f5;        ← Change light gray
}
```

### Change Pricing

Edit `/src/components/Pricing.astro`:
- Change prices
- Add/remove tiers
- Change features

### Change Homepage Text

Edit `/src/pages/index.astro`:
- Update "How It Works" section
- Update feature descriptions
- Change CTA text

### Change Upload Styles

Edit `/src/components/UploadForm.jsx`:
- Add new output styles (replace 'catalog', 'lifestyle', 'campaign')
- Change upload requirements
- Customize UI

---

## Need Help?

1. **Cloudflare Support**: https://support.cloudflare.com
2. **Astro Docs**: https://docs.astro.build
3. **GitHub Help**: https://docs.github.com

---

## Cost Breakdown

- **GitHub**: FREE
- **Cloudflare Pages**: FREE (up to 10 deployments/day)
- **Domain**: ~€10/year optional
- **AI Service**: Varies ($0.02-$1 per image depending on service)
- **Stripe Payments**: 2.9% + $0.30 per transaction

**Total Cost to Launch**: €0 (if using free tier)

---

## What's Already Built

✅ Landing page with pricing  
✅ Upload tool interface  
✅ API routes for upload/auth/payments  
✅ Mobile responsive design  
✅ Modern blue color scheme  
✅ Login/signup pages  
✅ Database-ready structure  

---

## What You Need to Add

Before going public:
1. Real AI image processing (integrate API)
2. Payment processing (Stripe)
3. User database (Supabase or D1)
4. Custom domain (optional but recommended)

---

**Deployed and live in under 10 minutes!** 🚀
