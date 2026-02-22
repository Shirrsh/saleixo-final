

## Category Detail Pages with Photo Gallery and Before/After Showcase

### What We're Building
Each category card on the `/categories` page will become clickable, linking to a dedicated page (e.g., `/categories/jewelry-photography`) that showcases your work for that specific type of photoshoot -- with a photo gallery, before/after comparisons, and a contact CTA.

### New Database Table

A new `category_images` table to store gallery images per category:

| Column | Type | Purpose |
|--------|------|---------|
| id | uuid | Primary key |
| category_id | uuid (FK) | Links to `categories.id` |
| image_url | text | Image URL |
| alt_text | text | SEO alt text |
| display_order | int | Sort order |
| is_before_after | boolean | If true, this is a before/after pair |
| before_image_url | text | "Before" image (only when is_before_after = true) |
| is_active | boolean | Toggle visibility |
| created_at | timestamp | Auto |

RLS: public can view active images; admins can manage all.

### Pages and Routes

1. **`/categories`** (existing) -- category cards become `<Link to={/categories/${slug}}>` instead of static cards
2. **`/categories/:slug`** (new page: `src/pages/CategoryDetail.tsx`) -- the detail page

### Category Detail Page Layout

**Section 1 -- Hero Banner**
- Category name as large heading
- Category description
- Cover image (the existing `image_url` from the `categories` table)

**Section 2 -- Photo Gallery Grid**
- Responsive masonry-style grid of all images for this category
- Clicking an image opens a lightbox/modal with full-size view
- Supports 20+ images, lazy-loaded

**Section 3 -- Before/After Showcase**
- Side-by-side comparison cards showing raw vs edited photos
- Uses the `before_image_url` and `image_url` fields from `category_images` where `is_before_after = true`

**Section 4 -- CTA + Contact**
- "Book a Consultation" button
- "Call Us" button
- Links to WhatsApp

### File Changes

| File | Action |
|------|--------|
| `supabase/migrations/..._create_category_images.sql` | Create new table + RLS + storage bucket |
| `src/pages/CategoryDetail.tsx` | New detail page component |
| `src/pages/Categories.tsx` | Make cards clickable links to `/categories/:slug` |
| `src/App.tsx` | Add route `/categories/:slug` |
| `src/pages/admin/CategoryImages.tsx` | Admin page to manage images per category |
| `src/App.tsx` | Add admin route `/admin/category-images` |
| `src/components/admin/AdminLayout.tsx` | Add sidebar link for Category Images |

### Admin Management

A new admin page at `/admin/category-images` will let you:
- Select a category from a dropdown
- Upload gallery images (bulk upload support)
- Mark images as before/after pairs
- Reorder and toggle visibility

### Technical Details

- Images stored in existing `site-assets` or a new `category-images` storage bucket
- Gallery uses lazy loading for performance with 20+ images
- Lightbox modal for full-size image viewing built with Radix Dialog
- Before/After section only renders if before/after images exist for the category
- Category data fetched from DB with fallback to hardcoded defaults (same pattern as current Categories page)

