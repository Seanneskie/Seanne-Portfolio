function initCertificates() {
  const searchInput = document.getElementById('certificateSearch');
  const filterContainer = document.getElementById('certificateFilters');
  const cardsContainer = document.getElementById('certificateCards');
  const paginationContainer = document.getElementById('certificatePagination');
  if (!searchInput || !filterContainer || !cardsContainer) return;

  const cards = Array.from(cardsContainer.querySelectorAll('.certificate-card'));

  // Build unique tag list
  const tagSet = new Set();
  cards.forEach(card => {
    const tags = (card.dataset.tags || '').split(',').map(t => t.trim()).filter(Boolean);
    tags.forEach(t => tagSet.add(t));
    if (tags.length) {
      const tagContainer = document.createElement('div');
      tagContainer.className = 'project-tags';
      tags.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = t;
        tagContainer.appendChild(span);
      });
      card.insertBefore(tagContainer, card.querySelector('a'));
    }
  });

  // Render tag filters
  tagSet.forEach(tag => {
    const label = document.createElement('label');
    label.style.marginRight = '8px';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = tag;
    checkbox.style.marginRight = '4px';
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(tag));
    filterContainer.appendChild(label);
  });

  let currentPage = 1;
  const cardsPerPage = 6;

  function getFilteredCards() {
    const query = searchInput.value.toLowerCase();
    const activeTags = Array.from(filterContainer.querySelectorAll('input:checked')).map(el => el.value);
    return cards.filter(card => {
      const text = card.innerText.toLowerCase();
      const tags = (card.dataset.tags || '').split(',').map(t => t.trim());
      const matchesQuery = text.includes(query);
      const matchesTags = activeTags.every(t => tags.includes(t));
      return matchesQuery && matchesTags;
    });
  }

  function renderPagination(filtered) {
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(filtered.length / cardsPerPage);
    if (totalPages <= 1) return;
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.className = 'btn btn-sm mx-1 ' + (i === currentPage ? 'btn-primary' : 'btn-outline-secondary');
      btn.onclick = () => { currentPage = i; update(); };
      paginationContainer.appendChild(btn);
    }
  }

  function update() {
    const filtered = getFilteredCards();
    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    cards.forEach(card => card.style.display = 'none');
    filtered.slice(start, end).forEach(card => card.style.display = 'block');
    renderPagination(filtered);
  }

  searchInput.addEventListener('input', () => { currentPage = 1; update(); });
  filterContainer.addEventListener('change', () => { currentPage = 1; update(); });

  update();
}
