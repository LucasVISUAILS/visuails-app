# VISUAILS - AI Image Transformation Platform

Transform photos into multiple professional styles with AI.

## Features

✨ **One-Click AI Transformation**
- Upload any photo
- Generate Catalog, Lifestyle, and Campaign versions
- Download high-resolution images

💳 **Flexible Pricing**
- Free sample (€0.99)
- Pay-per-visual (€19 for 10 visuals)
- Custom enterprise plans

📱 **Modern & Responsive**
- Beautiful, mobile-friendly design
- Fast loading times
- Intuitive user interface

🔐 **Secure & Scalable**
- Built on Astro + Cloudflare
- Serverless architecture
- Enterprise-grade CDN

## Tech Stack

- **Frontend**: Astro, React, Tailwind CSS
- **Backend**: Cloudflare Workers
- **Hosting**: Cloudflare Pages (FREE)
- **Database**: Supabase or Cloudflare D1 (optional)
- **Payments**: Stripe (optional)
- **AI**: OpenAI or Replicate (optional)

## Quick Start

### Prerequisites
- Node.js 18+ (optional - for local development)
- GitHub account (free)
- Cloudflare account (free)

### Local Development (Optional)

```bash
npm install
npm run dev
# Opens http://localhost:3000
```

### Deploy to Cloudflare Pages (Recommended)

1. **Push to GitHub** (see DEPLOYMENT_GUIDE.md)
2. **Connect to Cloudflare Pages**
3. **Done!** Your site is live in 2 minutes

👉 **See DEPLOYMENT_GUIDE.md for detailed instructions**

## Project Structure

```
src/
├── pages/           # Routes (pages become URLs)
│   ├── index.astro  # Homepage
│   ├── app.astro    # Upload tool
│   ├── login.astro  # Login page
│   └── api/         # API endpoints
├── components/      # Reusable components
├── layouts/         # Page layouts
└── styles/          # Global styles
```

## Pages

- **`/`** - Homepage with features and pricing
- **`/app`** - Upload tool (main feature)
- **`/login`** - User login
- **`/signup`** - User registration
- **`/api/upload`** - Image upload endpoint
- **`/api/auth`** - Authentication endpoint
- **`/api/payment`** - Payment processing endpoint

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and fill in your keys:

```bash
cp .env.example .env
```

Add in Cloudflare Pages → Settings → Environment Variables:
- `STRIPE_SECRET_KEY` - Stripe API key
- `OPENAI_API_KEY` - OpenAI API key
- `DATABASE_URL` - Database connection

### Customize Colors

Edit `src/styles/global.css`:

```css
:root {
  --brand-primary: #0066ff;      /* Main blue */
  --brand-secondary: #00d4ff;    /* Accent cyan */
  --text-primary: #1a1a1a;       /* Dark text */
  --text-secondary: #666666;     /* Light text */
}
```

## Deployment

### Option 1: Cloudflare Pages (Recommended)

1. Push code to GitHub
2. Go to https://dash.cloudflare.com/pages
3. Connect your GitHub repo
4. Deploy in 1 click

**Cost**: FREE

### Option 2: Vercel

```bash
npm install -g vercel
vercel
```

### Option 3: Netlify

1. Drag and drop the `dist/` folder at netlify.com

## Adding Features

### Real AI Image Processing

Replace mock images in `src/pages/api/upload.js` with:

```javascript
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Generate images using Replicate models
const output = await replicate.run("model/name", {
  input: { image: imageUrl }
});
```

### Stripe Payments

```javascript
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  line_items: [/* ... */],
  mode: "payment",
  success_url: "...",
  cancel_url: "..."
});
```

### User Database

Use Supabase or Cloudflare D1:

```javascript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(url, key);
const { data } = await supabase.from("users").select();
```

## Production Checklist

- [ ] Set up AI image processing
- [ ] Add Stripe payment processing
- [ ] Set up user database
- [ ] Add email notifications
- [ ] Set up custom domain
- [ ] Enable HTTPS (automatic with Cloudflare)
- [ ] Set up monitoring/logging
- [ ] Create privacy policy
- [ ] Create terms of service

## Troubleshooting

### Build fails on Cloudflare
- Ensure all files are in GitHub
- Check package.json exists
- Verify build command in Cloudflare

### Upload doesn't work
- Current version shows mock images
- Integrate AI API to process real images

### Login doesn't work
- Demo only uses browser storage
- Add database for persistence

## Support

- 📖 **Docs**: https://docs.astro.build
- 💬 **Discord**: https://astro.build/chat
- 🐛 **Issues**: GitHub Issues

## License

MIT - Feel free to use this for your project!

## Next Steps

1. ✅ Deploy to Cloudflare Pages
2. 📝 Add AI image processing API
3. 💳 Set up Stripe payments
4. 📊 Add user database
5. 🎨 Customize branding
6. 🚀 Launch!

---

**Ready to launch?** See DEPLOYMENT_GUIDE.md for step-by-step instructions.
