# Klario — Deployment Guide
## Deploy to Vercel + Supabase (Free) in 20 minutes

---

## Step 1 — Create 3 Free Accounts (5 min)

1. **GitHub** → github.com → Sign up free
2. **Vercel** → vercel.com → Sign up with GitHub
3. **Supabase** → supabase.com → Sign up free → Create new project

---

## Step 2 — Push Code to GitHub (3 min)

On your laptop, open terminal:

```bash
cd /path/to/your/project
git init
git add .
git commit -m "Klario initial deploy"
```

Then on github.com:
- Click "New repository"
- Name it: `klario`
- Click "Create repository"
- Follow the "push existing repo" instructions shown

---

## Step 3 — Get Supabase Database URL (2 min)

1. Open your Supabase project
2. Go to **Settings → Database**
3. Scroll to **Connection string → URI**
4. Copy the `postgresql://postgres:...` URL
5. Also copy the **Direct connection** URL

---

## Step 4 — Deploy on Vercel (5 min)

1. Go to vercel.com → **Add New Project**
2. Import your `klario` GitHub repository
3. Click **Environment Variables** and add these:

```
ANTHROPIC_API_KEY        = sk-ant-your-key-here
DB_PROVIDER              = postgresql
DATABASE_URL             = postgresql://postgres:[PASS]@db.[REF].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1
DIRECT_URL               = postgresql://postgres:[PASS]@db.[REF].supabase.co:5432/postgres
NEXT_PUBLIC_BASE_URL     = https://klario.tools
```

4. Click **Deploy**

---

## Step 5 — Run Database Migration (2 min)

After first deploy, in Vercel dashboard:
- Go to your project → **Functions** tab
- OR run locally with production DB:

```bash
DATABASE_URL="your-supabase-url" DIRECT_URL="your-direct-url" DB_PROVIDER=postgresql npx prisma db push
```

This creates the `Explanation` table in Supabase automatically.

---

## Step 6 — Add Custom Domain (3 min)

1. Buy domain on Namecheap (~$10/year) — e.g. `klario.tools`
2. In Vercel → **Settings → Domains** → Add domain
3. Vercel shows you DNS records → Add them in Namecheap
4. SSL certificate is automatic

---

## How the SEO Engine Works (Automatic)

```
User uploads document
       ↓
Klario explains it via Claude API
       ↓
System saves to Supabase database
       ↓
Auto-creates page at:
klario.tools/explain/rental-agreement-1234567890
       ↓
sitemap.xml updates automatically
       ↓
Google indexes the page
       ↓
Someone searches "how to understand a rental agreement"
       ↓
They find Klario
       ↓
Zero effort from you. Forever.
```

---

## Environment Variables Summary

| Variable | Where to get it |
|---|---|
| `ANTHROPIC_API_KEY` | console.anthropic.com → API Keys |
| `DATABASE_URL` | Supabase → Settings → Database → Connection String |
| `DIRECT_URL` | Supabase → Settings → Database → Direct Connection |
| `DB_PROVIDER` | Type `postgresql` |
| `NEXT_PUBLIC_BASE_URL` | Your domain e.g. `https://klario.tools` |

---

## After Going Live

- Vercel auto-deploys every time you push to GitHub
- Database grows automatically with every explanation
- Sitemap updates automatically
- Zero maintenance required

