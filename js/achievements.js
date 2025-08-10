async function initAchievements() {
  const container = document.querySelector('#achievements .timeline');
  if (!container) return;

  // show skeleton while loading
  container.innerHTML = `
    <div class="skeleton">
      <div class="bar" style="width:40%"></div>
      <div class="bar" style="width:70%"></div>
      <div class="bar" style="width:55%"></div>
    </div>
  `;

  try {
    const r = await fetch('assets/datafiles/achievements.json', { cache: 'no-store' });
    const data = await r.json();

    if (!Array.isArray(data) || data.length === 0) {
      container.innerHTML = `<p class="empty-state">No achievements yet — stay tuned!</p>`;
      return;
    }

    container.innerHTML = '';
    const frag = document.createDocumentFragment();

    data.forEach((item, idx) => {
      const { icon = '', title = '', description = '', date = '', tags = [], url = '' } = item || {};

      const li = document.createElement('li');
      li.setAttribute('role', 'listitem');

      // timeline dot + optional icon
      const dot = document.createElement('span');
      dot.className = 'dot';
      if (icon) {
        const i = document.createElement('i');
        i.className = icon; // e.g., "fa-solid fa-trophy"
        i.setAttribute('aria-hidden', 'true');
        dot.appendChild(i);
      }
      li.appendChild(dot);

      // Decide side (alternate on desktop)
      const leftSide = (idx % 2 === 0);
      const card = document.createElement(url ? 'a' : 'div');
      card.className = 'achievement-card' + (leftSide ? ' side-left' : ' side-right');
      if (url) {
        card.href = url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        card.setAttribute('aria-label', `${title || 'Achievement'} (opens in new tab)`);
        card.style.textDecoration = 'none';
      }

      // Title
      const h = document.createElement('div');
      h.className = 'achievement-title';
      h.textContent = title;
      card.appendChild(h);

      // Date (optional)
      if (date) {
        const d = document.createElement('div');
        d.className = 'achievement-date';
        d.textContent = formatDate(date);
        card.appendChild(d);
      }

      // Description
      const p = document.createElement('p');
      p.className = 'achievement-desc';
      p.textContent = description;
      card.appendChild(p);

      // Tags (optional)
      if (Array.isArray(tags) && tags.length) {
        const tagWrap = document.createElement('div');
        tagWrap.className = 'achievement-tags';
        tags.forEach(t => {
          const span = document.createElement('span');
          span.className = 'tag';
          span.textContent = t;
          tagWrap.appendChild(span);
        });
        card.appendChild(tagWrap);
      }

      li.appendChild(card);
      frag.appendChild(li);
    });

    container.appendChild(frag);

    // Reveal on scroll
    const cards = container.querySelectorAll('.achievement-card');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.15 });
      cards.forEach(c => io.observe(c));
    } else {
      cards.forEach(c => c.classList.add('visible'));
    }

  } catch (err) {
    console.error('Error loading achievements:', err);
    container.innerHTML = `<p class="error-state">Couldn’t load achievements right now. Please try again later.</p>`;
  }

  function formatDate(input) {
    // Accepts "YYYY-MM", "YYYY-MM-DD", or plain string; shows short, clean output
    try {
      // If it looks like a date, format it
      if (/^\d{4}(-\d{2}){0,2}$/.test(input)) {
        const parts = input.split('-').map(Number);
        const y = parts[0], m = (parts[1] || 1) - 1, d = parts[2] || 1;
        const dt = new Date(Date.UTC(y, m, d));
        // If only year-month given, show "Mon YYYY"; if only year, show year
        if (parts.length === 1) return String(y);
        if (parts.length === 2) {
          return dt.toLocaleString(undefined, { month: 'short', year: 'numeric' });
        }
        return dt.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
      }
      // Otherwise, return as-is (e.g., "Q2 2024")
      return input;
    } catch {
      return input;
    }
  }
}
