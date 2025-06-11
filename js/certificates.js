// Filter and search functionality for certificate cards

document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('certificateSearch');
  const tagCheckboxes = document.querySelectorAll('.tag-filter');
  const cards = document.querySelectorAll('#certificateGrid .certificate-card');

  function filterCards() {
    const query = searchInput.value.toLowerCase();
    const selectedTags = Array.from(tagCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    cards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const tags = (card.dataset.tags || '').split(',').map(t => t.trim());

      const matchesSearch = title.includes(query);
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some(tag => tags.includes(tag));

      card.style.display = (matchesSearch && matchesTags) ? 'block' : 'none';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterCards);
  }

  tagCheckboxes.forEach(cb => cb.addEventListener('change', filterCards));
});
