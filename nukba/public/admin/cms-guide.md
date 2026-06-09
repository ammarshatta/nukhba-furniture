# Shatta CMS Guide

Complete guide for managing content on the Shatta website via the CMS at `/admin/`.

---

## Logging In

1. Go to `https://shattafurniture.com/admin/`
2. Click **Login with GitHub**
3. Authorize the Shatta app on GitHub
4. You are redirected back to the CMS dashboard

> If the popup closes without logging in, try disabling your popup blocker for the site.

---

## Products

### How to Add a Product

1. Click **Products** in the left sidebar
2. Click **New Products** (top right)
3. Fill in all required fields:
   - **Title (EN)** — English product name (e.g. "Palazzo Velvet Sofa Set")
   - **Title (AR)** — Arabic product name
   - **Slug** — URL identifier, lowercase with hyphens (e.g. `palazzo-sofa-set`). Must be unique.
   - **Category** — Select from the dropdown
   - **Excerpt (EN)** — Short English description, max 200 characters
   - **Excerpt (AR)** — Short Arabic description
   - **Price (display)** — e.g. `EGP 45,000`
   - **Price (number)** — e.g. `45000`
   - **Images** — Add one or more image URLs (Unsplash or Cloudinary)
   - **Active** — Toggle ON for the product to appear on the site
   - **Publish Date** — Set to today or a future date
4. Optional fields:
   - **Featured** — Toggle ON to show the product on the home page Best Sellers section
   - **Badge** — Choose `new`, `sale`, or `bestseller`
   - **Materials** — List materials used
   - **Dimensions** — Width, depth, height in cm
   - **Description (body)** — Full English description in markdown
   - **Description (AR body)** — Full Arabic description (plain prose paragraphs)
   - **WhatsApp Message (EN / AR)** — Pre-filled WhatsApp inquiry text
   - **Related Products** — Slugs of up to 3 related products
   - **Product FAQs** — Add question/answer pairs
5. Click **Save** (top right)
6. **To publish**: trigger a new deployment (push to GitHub or run `npx wrangler deploy`)

### How to Edit a Product

1. Click **Products** in the sidebar
2. Click the product name in the list
3. Make your changes
4. Click **Save**

### How to Delete a Product

1. Open the product
2. Click the **three-dot menu** (⋮) next to Save
3. Click **Delete**
4. Confirm deletion

> Deleted products are removed from GitHub. Redeploy to remove them from the live site.

### Making a Product Appear on the Home Page

The home page "Best Sellers" section shows products where:
- `active: true`
- `featured: true`

Toggle both ON and redeploy.

---

## Collections (Categories)

### How to Add a Category

1. Click **Collections** in the sidebar
2. Click **New Collections**
3. Fill in:
   - **Name (EN)** and **Name (AR)**
   - **Slug** — e.g. `living-room`
   - **Description (EN)** and **Description (AR)**
   - **Hero Image** — URL of the category cover image
   - **Display Order** — Lower number = appears first (e.g. `1`, `2`, `3`)
4. **Featured Products** — Add product slugs to highlight specific products in this collection page
5. Click **Save** and redeploy

### How to Edit a Category

1. Click **Collections**
2. Click the category name
3. Edit and **Save**

### How to Delete a Category

1. Open the category
2. Three-dot menu → **Delete**

> Products in the category are NOT deleted — only the category entry is removed.

### Category Display Order

The **Display Order** field controls the sequence in the navigation and home page collections section. Set it to a number: `1` appears first, `99` appears last.

---

## Blog Articles

### How to Add a Blog Post

1. Click **Blog** in the sidebar
2. Click **New Blog**
3. Required fields:
   - **Title (EN)** — English article title
   - **Slug** — URL identifier (e.g. `how-to-choose-luxury-sofa`)
   - **Publish Date**
   - **Category** — guide, trends, tips, materials, or spaces
   - **Excerpt** — 160 characters max
   - **Cover Image URL**
   - **Body** — Full English article in markdown
4. Arabic content (optional):
   - **Has Arabic Version** — Toggle ON if you are writing an Arabic version
   - **Body (Arabic)** — Full Arabic article content. Supports markdown: use `##` for headings, `**bold**`, `- ` for lists
5. Other optional:
   - **Title (AR)** — Arabic title (shown on Arabic page header)
   - **Featured** — Toggle ON to show on home page Educational Content section
   - **Reading Time** — Estimated minutes to read
6. Click **Save** and redeploy

### Language Routing

- English article: `/en/blog/[slug]`
- Arabic article: `/blog/[slug]` — **only generated if "Has Arabic Version" is ON**
- If an article has no Arabic version, the language switcher on the English page links to `/blog` (the blog home) instead

### How to Edit a Blog Post

Click **Blog** → click the post → edit → **Save**.

### How to Delete a Blog Post

Open the post → three-dot menu → **Delete**.

---

## FAQs

### How to Add a FAQ

1. Click **FAQs** in the sidebar
2. Click **New FAQs**
3. Fill in **Question (EN)**, **Answer (EN)**, and optionally the Arabic versions
4. Set **Display Order** (lower = appears higher on the page)
5. **Save** and redeploy

The homepage FAQ section shows the 6 FAQs with the lowest Display Order numbers.

---

## Locations

### How to Add a Location

1. Click **Locations** in the sidebar
2. Click **New Locations**
3. Fill in all address, phone, WhatsApp, Google Maps URL, and opening hours fields
4. **Save** and redeploy

---

## Uploading Images

Images can be hosted on Cloudinary or Unsplash. To upload via CMS:

1. In any image field, click the **media icon**
2. Upload your image — it will be saved to `/public/images/uploads/`
3. The URL will be inserted automatically

**Recommended image sizes:**
- Product images: at least 900×600px, WebP preferred
- Blog cover images: at least 1200×630px
- Category images: at least 800×600px

---

## How to Publish Changes

The CMS saves content directly to GitHub. Changes are live after the next deployment.

**To deploy after saving:**
```bash
npx wrangler deploy
```

Or push any commit to the `master` branch if CI/CD is configured.

> Changes saved in the CMS but not deployed will not appear on the live site.

---

## Content Visibility Rules

| Content type | Appears on site when... |
|---|---|
| Product | `active: true` |
| Product on home page | `active: true` AND `featured: true` |
| Blog post on home page | `featured: true` |
| Arabic blog page | `hasAr: true` (and site is redeployed) |
| FAQ on home page | Lowest 6 by Display Order |
| Category in nav | Always shown if it exists |
