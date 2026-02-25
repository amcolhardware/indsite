const API_BASE = 'https://industrial.amcolgroup.com/api';

const navItems = [
  { name: 'HOME', href: 'https://www.amcolhardwarett.com/index.php' },
  { name: 'PRODUCTS', href: '/simple-site/products.html' },
  { name: 'CONSTRUCTION', href: 'https://www.amcolhardwarett.com/construction.php' },
  { name: 'INDUSTRIAL', href: '/simple-site/index.html' },
  { name: 'DEPARTMENTS', href: '/departments' },
  { name: 'CONTACT US', href: '/simple-site/contact.html' },
];

function renderHeader(active) {
  const ul = navItems
    .map((i) => `<li><a class="${i.name === active ? 'active' : ''}" href="${i.href}">${i.name}</a></li>`)
    .join('');
  return `<header class="header"><div class="container nav"><ul>${ul}</ul><img class="logo" src="/images/AMCOL_Logo.png" alt="AMCOL Logo"/></div></header>`;
}

function renderFooter() {
  return `<footer class="footer"><div class="container">AMCOL · <a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">Contact</a></div></footer>`;
}

function mountShell(active) {
  document.getElementById('shell-header').innerHTML = renderHeader(active);
  document.getElementById('shell-footer').innerHTML = renderFooter();
}

function setupCarousel(selector, images) {
  const root = document.querySelector(selector);
  if (!root) return;
  let idx = 0;
  const slides = images.map((img, i) => `<div class="slide ${i === 0 ? 'active' : ''}" style="background-image:url('${img}')"></div>`).join('');
  const dots = images.map((_, i) => `<button data-i="${i}" class="${i === 0 ? 'active' : ''}" aria-label="Go to slide ${i + 1}"></button>`).join('');
  root.innerHTML = `${slides}<div class="overlay"></div><div class="controls">${dots}</div>`;
  const dotEls = [...root.querySelectorAll('button')];
  const slideEls = [...root.querySelectorAll('.slide')];
  function render() {
    slideEls.forEach((s, i) => s.classList.toggle('active', i === idx));
    dotEls.forEach((d, i) => d.classList.toggle('active', i === idx));
  }
  dotEls.forEach((d) => d.addEventListener('click', () => {
    idx = +d.dataset.i;
    render();
  }));
  setInterval(() => {
    idx = (idx + 1) % images.length;
    render();
  }, 5000);
}

function setupContactForm() {
  const form = document.getElementById('inquiry-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    console.log('Contact inquiry payload', data);
    alert('Thank you for your inquiry. A representative will contact you shortly.');
    form.reset();
  });
}

function normalizeList(data) {
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== 'object') return [];
  const keys = ['data', 'results', 'items', 'products', 'categories', 'brands'];
  for (const k of keys) if (Array.isArray(data[k])) return data[k];
  return [];
}

function getProductValue(p, keys, fallback = '') {
  for (const k of keys) if (p && p[k] !== undefined && p[k] !== null && p[k] !== '') return p[k];
  return fallback;
}

async function fetchJson(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`);
  return res.json();
}

function productCardHtml(p) {
  const name = getProductValue(p, ['name', 'title', 'product_name'], 'Unnamed Product');
  const price = getProductValue(p, ['price', 'sale_price', 'formatted_price'], 'Inquire');
  const category = getProductValue(p, ['category', 'category_name'], 'General');
  const brand = getProductValue(p, ['brand', 'brand_name'], '');
  const image = getProductValue(p, ['image', 'image_url', 'thumbnail', 'photo'], '/images/AMCOL Banner.png');
  const description = getProductValue(p, ['description', 'short_description', 'summary'], '');
  return `<article class="card"><img src="${image}" alt="${name}" onerror="this.src='/images/AMCOL Banner.png'"/><div class="body"><h3>${name}</h3><p class="notice">${category}${brand ? ` · ${brand}` : ''}</p><p><strong>${price}</strong></p>${description ? `<p class="notice">${description}</p>` : ''}</div></article>`;
}

function renderList(rootId, items, itemRenderer, emptyText) {
  const root = document.getElementById(rootId);
  if (!root) return;
  if (!items.length) {
    root.innerHTML = `<p class="notice">${emptyText}</p>`;
    return;
  }
  root.innerHTML = items.map(itemRenderer).join('');
}

function renderSimpleTag(item) {
  const name = typeof item === 'string' ? item : getProductValue(item, ['name', 'title', 'brand', 'category'], 'Unnamed');
  return `<span class="tag">${name}</span>`;
}

async function initProductsPage() {
  if (!document.body.dataset.page || document.body.dataset.page !== 'products') return;

  const status = document.getElementById('products-status');
  const setStatus = (msg) => { if (status) status.textContent = msg; };

  const pageEl = document.getElementById('browse-page');
  let page = Number(pageEl?.dataset.page || '1');

  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = new FormData(searchForm).get('q')?.toString().trim();
      if (!query) return;
      window.location.href = `/simple-site/search.html?q=${encodeURIComponent(query)}&page=1`;
    });
  }

  async function loadBrowse(targetPage) {
    setStatus(`Loading products page ${targetPage}...`);
    try {
      const browsePromise = targetPage === 1
        ? fetchJson('/products/browse').catch(() => fetchJson('/products/browse/1'))
        : fetchJson(`/products/browse/${targetPage}`);

      const [all, featured, random, categories, brands, browse] = await Promise.all([
        fetchJson('/products'),
        fetchJson('/products/featured'),
        fetchJson('/products/rand'),
        fetchJson('/categories'),
        fetchJson('/brands'),
        browsePromise,
      ]);

      renderList('all-products', normalizeList(all), productCardHtml, 'No products returned from /products.');
      renderList('featured-products', normalizeList(featured), productCardHtml, 'No featured products returned.');
      renderList('random-products', normalizeList(random), productCardHtml, 'No random products returned.');
      renderList('browse-products', normalizeList(browse), productCardHtml, `No products returned for browse page ${targetPage}.`);
      renderList('categories-list', normalizeList(categories), renderSimpleTag, 'No categories returned.');
      renderList('brands-list', normalizeList(brands), renderSimpleTag, 'No brands returned.');

      page = targetPage;
      if (pageEl) { pageEl.dataset.page = String(page); pageEl.textContent = `Page ${page}`; }
      setStatus('Loaded API data successfully.');
    } catch (err) {
      console.error(err);
      setStatus(`API load failed: ${err.message}`);
    }
  }

  document.getElementById('prev-page')?.addEventListener('click', () => {
    const next = Math.max(1, page - 1);
    loadBrowse(next);
  });
  document.getElementById('next-page')?.addEventListener('click', () => loadBrowse(page + 1));

  loadBrowse(page);
}

async function initSearchPage() {
  if (!document.body.dataset.page || document.body.dataset.page !== 'search') return;

  const params = new URLSearchParams(window.location.search);
  const q = (params.get('q') || '').trim();
  let page = Number(params.get('page') || '1');
  if (page < 1) page = 1;

  const status = document.getElementById('search-status');
  const heading = document.getElementById('search-heading');
  const queryInput = document.getElementById('search-q');
  const pageIndicator = document.getElementById('search-page-indicator');
  const setStatus = (msg) => { if (status) status.textContent = msg; };

  if (queryInput) queryInput.value = q;
  if (heading) heading.textContent = q ? `Search Results for "${q}"` : 'Search Products';

  const form = document.getElementById('search-page-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newQ = new FormData(form).get('q')?.toString().trim();
    if (!newQ) return;
    window.location.href = `/simple-site/search.html?q=${encodeURIComponent(newQ)}&page=1`;
  });

  async function loadSearch(targetPage) {
    if (!q) {
      setStatus('Enter a search query to load results.');
      renderList('search-results', [], productCardHtml, '');
      return;
    }
    setStatus(`Searching "${q}" (page ${targetPage})...`);
    try {
      const encoded = encodeURIComponent(q).replace(/%20/g, '+');
      const path = targetPage === 1 ? `/search/${encoded}` : `/search/${encoded}/${targetPage}`;
      const data = await fetchJson(path);
      renderList('search-results', normalizeList(data), productCardHtml, 'No search results found.');
      if (pageIndicator) pageIndicator.textContent = `Page ${targetPage}`;
      page = targetPage;
      setStatus('Search results loaded.');
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.set('q', q);
      nextUrl.searchParams.set('page', String(page));
      window.history.replaceState({}, '', nextUrl);
    } catch (err) {
      console.error(err);
      setStatus(`Search failed: ${err.message}`);
    }
  }

  document.getElementById('search-prev')?.addEventListener('click', () => {
    const next = Math.max(1, page - 1);
    loadSearch(next);
  });
  document.getElementById('search-next')?.addEventListener('click', () => loadSearch(page + 1));

  loadSearch(page);
}

document.addEventListener('DOMContentLoaded', () => {
  setupContactForm();
  initProductsPage();
  initSearchPage();
});
