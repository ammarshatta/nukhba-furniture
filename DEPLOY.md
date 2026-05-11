# Nukhba — Deployment Guide

## Local Development

```bash
cd nukba
npm install
npm run dev
```

Open **http://localhost:4321** in your browser.

### Use Decap CMS locally (optional)

The CMS at `/admin/` normally requires a real GitHub repo. To test it locally:

**Terminal 1:**
```bash
cd nukba
npm run dev
```

**Terminal 2:**
```bash
cd nukba
npx decap-server
```

Then edit `public/admin/config.yml` and uncomment `local_backend: true`. The CMS will now read/write files from `src/content/` directly without GitHub.

> Remember to comment `local_backend: true` out again before deploying to production.

---

## Deploy to Cloudflare Pages

### Prerequisites

- GitHub account
- Cloudflare account (free tier — cloudflare.com)
- Cloudinary account (free tier — cloudinary.com)

---

### Step 1 — Push to GitHub

```bash
cd d:\Furniture
git init
git add .
git commit -m "Initial Nukhba website"
```

Create a new repo at github.com, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

---

### Step 2 — Create Cloudflare Pages project

1. Log in at **cloudflare.com** → **Workers & Pages** → **Create** → **Pages**
2. Click **Connect to Git** → authorize GitHub → select your repo
3. Configure the build settings:

| Setting | Value |
|---|---|
| **Root directory** | `nukba` ← REQUIRED (the project is in a subfolder) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Node.js version** | `20` |

> **Common error**: If you see `Could not read package.json: ENOENT`, it means the Root directory is not set to `nukba`. Fix it in Pages → Settings → Builds & Deployments → Build configurations.

4. Click **Save and Deploy**

---

### Step 3 — Add environment variables

In your Pages project → **Settings** → **Environment variables** → **Add variables** (set for both Production and Preview):

| Variable | Value |
|---|---|
| `PUBLIC_SITE_URL` | `https://YOUR_PROJECT.pages.dev` (update to custom domain later) |
| `PUBLIC_WA_NUMBER` | Your WhatsApp number, digits only e.g. `201112007555` |
| `PUBLIC_INSTAGRAM_URL` | `https://instagram.com/nukhba.eg` |
| `ADMIN_PASSWORD` | A strong password for the AI generator admin |
| `ADMIN_SESSION_SECRET` | 32 random characters (e.g. generate at random.org) |
| `ANTHROPIC_API_KEY` | Your Claude API key from console.anthropic.com |
| `AI_MODEL` | `claude-sonnet-4-6` |
| `CLOUDINARY_CLOUD_NAME` | From Cloudinary dashboard (top-left) |
| `CLOUDINARY_UPLOAD_PRESET` | `nukhba-products` |
| `PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` | From Cloudflare Analytics (optional) |

After adding variables, trigger a new deployment: **Deployments** → **Retry deployment**.

---

### Step 4 — Set up Cloudinary (image uploads)

1. Sign up at **cloudinary.com** (free: 25 GB storage, 25 GB/month bandwidth)
2. Dashboard → **Settings** → **Upload** tab → **Add upload preset**
3. Set:
   - Preset name: `nukhba-products`
   - Signing mode: **Unsigned**
   - Folder: `nukhba/products`
4. Save
5. Copy your **Cloud name** from the top-left of the dashboard

---

### Step 5 — Set up Decap CMS (git-based content editor)

After the site is live, connect the CMS to your GitHub repo:

1. Edit `nukba/public/admin/config.yml` — replace `OWNER/REPO` with your actual GitHub username and repo name:
   ```yaml
   backend:
     name: github
     repo: your-username/your-repo-name
     branch: main
   ```

2. Create a GitHub OAuth App:
   - Go to **github.com** → Settings → Developer settings → OAuth Apps → **New OAuth App**
   - Application name: `Nukhba CMS`
   - Homepage URL: `https://YOUR_PROJECT.pages.dev`
   - Authorization callback URL: `https://YOUR_PROJECT.pages.dev/api/auth`
   - Click **Register application**
   - Copy the **Client ID** and generate a **Client Secret**

3. Add to Cloudflare Pages environment variables:
   - `GITHUB_CLIENT_ID` — from step above
   - `GITHUB_CLIENT_SECRET` — from step above

4. Access the CMS at `https://YOUR_PROJECT.pages.dev/admin/`

---

### Step 6 — Connect a custom domain

1. Cloudflare Pages → your project → **Custom domains** → **Set up a custom domain**
2. Enter `nukhba.com` (or your domain)
3. If your domain is already on Cloudflare DNS, it auto-configures
4. Update `PUBLIC_SITE_URL` environment variable to `https://nukhba.com`
5. Trigger a new deployment

---

## Redeploy after content changes

Content is managed via Decap CMS at `/admin/`. Every save commits a markdown file to GitHub, which automatically triggers a new Cloudflare Pages build (typically 30–60 seconds).

To manually trigger a rebuild:
- Cloudflare Pages → your project → **Deployments** → **Retry deployment**

---

## Deploy command (CLI alternative)

If you prefer using the Wrangler CLI instead of the dashboard:

```bash
cd nukba
npm run build
npx wrangler pages deploy dist --project-name nukhba
```

Note: `pages_build_output_dir` is intentionally omitted from `wrangler.toml` to avoid a local build validation conflict with `@astrojs/cloudflare`. Always pass `dist` explicitly when using the CLI.

---

## Local `.env` reference

Copy `nukba/.env.example` to `nukba/.env` and fill in your values:

```env
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_WA_NUMBER=201112007555
PUBLIC_INSTAGRAM_URL=https://instagram.com/nukhba.eg
PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=

ADMIN_PASSWORD=your-admin-password
ADMIN_SESSION_SECRET=32-random-chars-here

ANTHROPIC_API_KEY=sk-ant-...
AI_MODEL=claude-sonnet-4-6

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_UPLOAD_PRESET=nukhba-products
```
