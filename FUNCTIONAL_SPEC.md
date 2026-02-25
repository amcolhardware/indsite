# Functional Specification: AMCOL Industrial Site (Simple HTML/CSS/JS Recreation)

## 1) Scope
This repository contains:
1. The original static Next.js export artifacts.
2. A recreated implementation in plain HTML/CSS/JS under `simple-site/` that preserves the observed user-facing functionality.

This specification focuses on functional behavior and keeps layout concerns separate.

## 2) Repository Inventory (Recursive Read Summary)
A recursive read of repository files identifies:
- Original exported pages: `index.html`, `products.html`, `contact.html`, `404.html`, `products/*`.
- Export runtime artifacts: `_next/static/*` chunks, media, and route payload files (`*.txt`, `__next.*.txt`).
- Static image assets in `images/`.
- Recreated simple implementation in `simple-site/`.

## 3) Recreated Implementation Files (`simple-site/`)
- `simple-site/index.html` (industrial landing behavior)
- `simple-site/products.html` (products listing behavior)
- `simple-site/contact.html` (contact inquiry behavior)
- `simple-site/404.html` (not-found behavior)
- `simple-site/products/cleaners.html`, `detergents.html`, `soap.html` (category placeholders)
- `simple-site/styles.css` (shared styling)
- `simple-site/app.js` (shared behavior: nav shell, carousel, form handling)

## 4) Core Functionality (Behavioral Requirements)

### 4.1 Routing and Page Availability
The recreated implementation provides equivalent route-level pages for:
- `/simple-site/index.html`
- `/simple-site/products.html`
- `/simple-site/contact.html`
- `/simple-site/404.html`
- `/simple-site/products/cleaners.html`
- `/simple-site/products/detergents.html`
- `/simple-site/products/soap.html`

### 4.2 Global Navigation Behavior
Shared header navigation supports:
- HOME → external AMCOL legacy URL.
- PRODUCTS → recreated products page.
- CONSTRUCTION → external AMCOL construction URL.
- INDUSTRIAL → recreated landing page.
- DEPARTMENTS → `/departments` (retained link target).
- CONTACT US → recreated contact page.

Shared footer links include Privacy, Terms, and Contact placeholders.

### 4.3 Homepage Behavior (`simple-site/index.html`)
- Hero background carousel with two slides:
  - `/images/Heritage Industry.jpg`
  - `/images/TGU.jpg`
- Automatic slide rotation every 5 seconds.
- Dot controls for manual slide selection.
- Search input present (display-only; no backend/query behavior).
- Industry cards present for Energy, Welding, Safety, Marine.
- Brand section includes WD-40, Simple Green, Red Devil, DEWALT references.
- “Read Latest News” CTA present.

### 4.4 Products Behavior (`simple-site/products.html`)
- “Industries We Serve” links maintained:
  - `/products/energy`
  - `/products/safety`
  - `/products/marine`
  - `/products/welding`
- Product cards include mixed modes:
  - Fixed-price cards (e.g., WD-40, Simple Green, Red Devil, DeWalt kit).
  - Inquiry cards labeled “Inquire” (e.g., solar, safety, marine, welding).

### 4.5 Contact Behavior (`simple-site/contact.html`)
Form fields:
- Full Name, Work Email, Company Name, Direct Phone
- Project Type dropdown
- Urgency Level dropdown
- Project Details / Requirements textarea

Submit behavior:
- Prevent default form post.
- Log payload to browser console.
- Show success alert: representative will follow up.
- Reset form after submit.

Direct contact blocks:
- Corporate Sales details (John Doe, phone, Sales1@amcolgroup.com)
- Technical Support details (Sarah Chen, phone, support@amcol.com)
- Operating hours and office address.

### 4.6 Category Placeholder Behavior
Recreated category pages explicitly render category labels for:
- cleaners
- detergents
- soap

### 4.7 Not Found Behavior
Recreated 404 page provides a simple “404 / This page could not be found.” response.

## 5) Layout and Presentation Requirements (Non-Core)
- Shared sticky-style top header and shared footer across recreated pages.
- Responsive grid/card layout for sectors and products.
- Hero sections with image overlays for contrast.
- Consistent button, input, and card styling via `simple-site/styles.css`.

## 6) Non-Functional Requirements
- Recreated implementation must run as static files with no framework/runtime dependency.
- All interactions implemented with vanilla JS (`simple-site/app.js`).
- All referenced assets are loaded from existing repo `images/` paths.

## 7) Known Gaps Retained from Source Behavior
- Links such as `/departments`, `/products/energy`, `/products/safety`, `/products/marine`, `/products/welding` are preserved but not implemented as recreated pages in this change.
- Search input remains UI-only without filtering/search backend.
- Contact submit remains client-side only (no API persistence).

## 8) Acceptance Criteria
1. Recreated pages load as static HTML with shared nav/footer shell.
2. Homepage carousel auto-rotates every ~5s and supports manual dot selection.
3. Products page shows both fixed-price and inquiry product cards.
4. Contact form captures inputs, logs payload, alerts success, and resets.
5. Category pages render with explicit category labels.
6. 404 page renders a not-found message.
