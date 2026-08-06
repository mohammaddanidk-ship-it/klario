# Turso Database Setup — Required Before Public Launch

Your database currently uses local SQLite, which does NOT reliably persist
data on Vercel's serverless platform. This means your SEO pages and admin
dashboard usage tracking could silently lose data under real traffic.

Turso fixes this — it's a free, SQLite-compatible database built specifically
to work with serverless platforms like Vercel.

## Step 1 — Create a free Turso account

Go to https://turso.tech → Sign up free (no credit card required)

## Step 2 — Install the Turso CLI

**Mac/Linux:**
```
curl -sSfL https://get.tur.so/install.sh | bash
```

**Windows (via WSL or Git Bash):**
```
curl -sSfL https://get.tur.so/install.sh | bash
```

## Step 3 — Log in and create your database

```
turso auth login
turso db create klarium-db
```

## Step 4 — Get your connection details

```
turso db show klarium-db --url
```
Copy this — it looks like `libsql://klarium-db-yourname.turso.io`

```
turso db tokens create klarium-db
```
Copy this long token string.

## Step 5 — Add both to Vercel

Go to Vercel → your project → Settings → Environment Variables → add:

```
TURSO_DATABASE_URL = (paste the libsql:// URL from step 4)
TURSO_AUTH_TOKEN   = (paste the token from step 4)
```

## Step 6 — Push your database schema to Turso

On your laptop, in your project folder:
```
npx prisma generate
TURSO_DATABASE_URL="your-url" TURSO_AUTH_TOKEN="your-token" npx prisma db push
```

## Step 7 — Redeploy

Push any small change to GitHub, or manually redeploy in Vercel, so it picks
up the new environment variables.

---

That's it — your SEO pages and admin dashboard will now persist reliably,
permanently, for free.
