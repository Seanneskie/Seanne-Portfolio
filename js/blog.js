async function loadBlogPosts() {
  const container = document.getElementById('blogPosts');
  if (!container) return;

  // Skeletons while loading
  renderSkeletons(container, 6);

  try {
    const response = await fetch('assets/datafiles/blog-posts.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const posts = await response.json();

    // Optional: basic search/sort wiring
    const searchEl = document.getElementById('blogSearch');
    const sortEl   = document.getElementById('blogSort');

    const state = { query: '', sort: 'newest' };
    if (searchEl) searchEl.addEventListener('input', e => { state.query = e.target.value.trim().toLowerCase(); render(); });
    if (sortEl)   sortEl.addEventListener('change', e => { state.sort = e.target.value; render(); });

    function render() {
      container.innerHTML = '';
      let items = [...posts];

      // filter
      if (state.query) {
        items = items.filter(p => (
          (p.title || '').toLowerCase().includes(state.query) ||
          (p.description || '').toLowerCase().includes(state.query) ||
          (Array.isArray(p.tags) ? p.tags.join(' ') : '').toLowerCase().includes(state.query)
        ));
      }

      // sort
      items.sort((a, b) => {
        const da = new Date(a.date), db = new Date(b.date);
        return state.sort === 'oldest' ? da - db : db - da;
      });

      if (!items.length) {
        container.innerHTML = `
          <div class="col-12">
            <div class="alert alert-info mb-0">No posts found. Try a different search.</div>
          </div>`;
        return;
      }

      // draw
      items.forEach(post => container.appendChild(renderCard(post)));

      // ensure newly added elements follow current theme
      if (typeof window.applyBootstrapTheme === 'function') {
        const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        window.applyBootstrapTheme(theme);
      }
    }

    render();
  } catch (error) {
    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger mb-0">
          <strong>Couldn’t load blog posts.</strong> Please try again later.
          <div class="small text-muted mt-1">${String(error)}</div>
        </div>
      </div>`;
    console.error('Error loading blog posts:', error);
  }
}

function renderSkeletons(container, count = 6) {
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4';
    col.innerHTML = `
      <div class="skeleton p-3">
        <div style="height: 160px; border-radius: .5rem; background: var(--charcoal);"></div>
        <div class="mt-3" style="height: 18px; width: 70%; background: var(--charcoal); border-radius:.25rem;"></div>
        <div class="mt-2" style="height: 12px; width: 50%; background: var(--charcoal); border-radius:.25rem;"></div>
        <div class="mt-3" style="height: 44px; background: var(--charcoal); border-radius:.25rem;"></div>
      </div>`;
    container.appendChild(col);
  }
}

function renderCard(post) {
  const {
    title = 'Untitled',
    date = '',
    description = '',
    url = '#',
    image,            // optional: absolute/relative URL
    tags = []         // optional: ["Django","AI"]
  } = post;

  const col = document.createElement('div');
  col.className = 'col-12 col-md-6 col-lg-4 d-flex mt-5';

  const prettyDate = safePrettyDate(date);
  const readTime = estimateReadTime(description, post.wordCount);

  col.innerHTML = `
    <article class="card blog-card flex-grow-1">
      ${image ? `
        <img src="${escapeAttr(image)}" class="card-img-top blog-cover" alt="${escapeAttr(title)} cover" loading="lazy" />`
      : `
        <div class="blog-cover w-100 d-flex align-items-center justify-content-center" style="background: var(--obsidian);">
          <span class="text-muted small">No cover image</span>
        </div>`}
      <div class="card-body d-flex flex-column" style="background: var(--charcoal);" >
        <h3 class="h5 card-title mb-2">${escapeHTML(title)}</h3>
        <div class="d-flex align-items-center gap-2 mb-2 text-muted small">
          <time datetime="${escapeAttr(date)}">${prettyDate}</time>
          <span aria-hidden="true">•</span>
          <span>${readTime} min read</span>
        </div>
        <p class="card-text blog-desc mb-3">${escapeHTML(description)}</p>
        ${Array.isArray(tags) && tags.length ? `
          <div class="mb-3">
            ${tags.slice(0,4).map(t => `<span class="badge bg-secondary blog-badge me-1 mb-1">${escapeHTML(t)}</span>`).join('')}
            ${tags.length > 4 ? `<span class="badge text-muted blog-badge" style="background: var(--charcoal);">+${tags.length-4}</span>` : ''}
          </div>` : ''
        }
        <div class="mt-auto d-flex align-items-center gap-2">
          <a href="${escapeAttr(url)}" target="_blank" rel="noopener" class="btn btn-sm btn-charcoal">Read More</a>
          <a href="${escapeAttr(url)}" target="_blank" rel="noopener" class="btn btn-sm btn-outline-secondary" aria-label="Share this post"
             onclick="navigator.share ? navigator.share({ title: '${escapeAttr(title)}', url: '${escapeAttr(url)}' }) : window.open('${escapeAttr(url)}','_blank'); return false;">
            Share
          </a>
        </div>
      </div>
    </article>
  `;
  return col;
}

// utils
function safePrettyDate(iso) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}
function estimateReadTime(desc = '', wordCount) {
  const words = typeof wordCount === 'number' ? wordCount : (desc || '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
function escapeHTML(str = '') {
  const replacements = { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;' };
  replacements['"'] = '&quot;';
  return String(str).replace(/[&<>"']/g, s => replacements[s]);
}
function escapeAttr(str = '') {
  return escapeHTML(str).replace(/`/g, '&#96;');
}

// kick off
loadBlogPosts();

