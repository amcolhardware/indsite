# Functional Specification: AMCOL Industrial Site (Simple HTML/CSS/JS + API Integration)

## 1) Scope
This repository contains:
1. Original static Next.js export artifacts.
2. A framework-free recreation under `simple-site/`.
3. API integrations using `https://industrial.amcolgroup.com/api` for products, search, categories, and brands.

## 2) Recursive Repository Read Summary
A recursive file read confirms the repository includes:
- Original exported pages and `_next` runtime artifacts.
- Static media assets under `images/`.
- Recreated simple pages/scripts/styles under `simple-site/`.
- This updated functional specification.

## 3) Recreated Pages and Assets (`simple-site/`)
- `index.html`: industrial landing page + search entry
- `products.html`: API-backed products hub
- `search.html`: API-backed search results page
- `contact.html`: contact inquiry page
- `404.html`: not-found page
- `products/cleaners.html`, `products/detergents.html`, `products/soap.html`: placeholder category pages
- `app.js`: shared shell + API + interactions
- `styles.css`: shared presentation layer

## 4) API Definition Integrated
Base URL:
- `https://industrial.amcolgroup.com/api`

Integrated endpoints:
- `/products`
- `/products/browse`
- `/products/browse/1`
- `/products/browse/2` (and additional pages via pagination controls)
- `/products/rand`
- `/products/featured`
- `/search/{query}`
- `/search/{query}/{page}`
- `/categories`
- `/brands`

## 5) Core Functionality (Behavioral)

### 5.1 Shared Shell Behavior
- Reusable header/nav and footer are rendered by `mountShell(...)` from `app.js` on each page.
- Navigation keeps legacy external links and simple-site internal links.

### 5.2 Homepage (`simple-site/index.html`)
- Hero carousel auto-rotates every 5 seconds with dot controls.
- Search form routes users to `simple-site/search.html?q=<query>`.
- Industry cards route to `simple-site/products.html`.

### 5.3 Products Hub (`simple-site/products.html`)
Products page fetches and renders:
- All products from `/products`.
- Featured products from `/products/featured`.
- Random products from `/products/rand`.
- Categories from `/categories` (rendered as tags).
- Brands from `/brands` (rendered as tags).
- Paged browse products from `/products/browse/{page}` with Prev/Next controls.

Also provides a search form that routes to:
- `simple-site/search.html?q=<query>&page=1`.

### 5.4 Search Results (`simple-site/search.html`)
- Reads query/page from URL parameters (`q`, `page`).
- Uses:
  - `/search/{query}` for page 1.
  - `/search/{query}/{page}` for page >1.
- Renders search results as product cards.
- Supports Prev/Next pagination controls and updates URL state.

### 5.5 Contact Page (`simple-site/contact.html`)
- Contact form captures full name, email, company, phone, project type, urgency, and details.
- Submit behavior is client-only:
  - prevents default submit,
  - logs payload to console,
  - shows success alert,
  - resets form.

### 5.6 Placeholder Category Pages
- `/simple-site/products/cleaners.html`
- `/simple-site/products/detergents.html`
- `/simple-site/products/soap.html`

Each displays a category placeholder message.

### 5.7 404 Page
- `simple-site/404.html` shows a basic “This page could not be found.” message.

## 6) Data Handling Rules
- API responses are normalized in `normalizeList(...)` to support common wrapper shapes (`data`, `results`, `items`, `products`, `categories`, `brands`).
- Product fields are resolved from multiple key variants (`name/title/product_name`, `image/image_url/thumbnail/photo`, etc.).
- Failed API calls display status error text on the page and write details to console.

## 7) Layout and Presentation (Non-Core)
- Shared sticky header and shared footer.
- Responsive grid/card sections for products.
- Tag chips for categories/brands.
- Dark hero/status sections for products/search pages.

## 8) Known Gaps
- `/departments` remains a preserved nav target but is not implemented in `simple-site/`.
- Contact form has no backend submission endpoint.
- API schema is handled defensively, but exact response field naming may vary and can be tightened with final schema docs.

## 9) Acceptance Criteria
1. Products page loads categories and brands from API.
2. Products page loads all/featured/random/browse product datasets from API.
3. Browse pagination updates products for target page.
4. Search page executes API search for page 1 and subsequent pages.
5. Search and products pages show meaningful status messages on load/failure.
6. Existing homepage carousel and contact behaviors continue to work.
