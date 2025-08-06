(function () {
  const searchInput = document.getElementById('projectSearch');
  const tagButtons = document.querySelectorAll('.tag-button');
  const projectCards = document.querySelectorAll('#projectCards .project-card');

  function filterProjects() {
    const query = searchInput.value.toLowerCase();
    const activeTagBtn = document.querySelector('.tag-button.active');
    const activeTag = activeTagBtn ? activeTagBtn.dataset.tag.toLowerCase() : 'all';

    projectCards.forEach(card => {
      const title = card.querySelector('.project-card-header h5').textContent.toLowerCase();
      const tags = Array.from(card.querySelectorAll('.project-tags .tag')).map(t => t.textContent.toLowerCase());
      const matchesSearch = title.includes(query);
      const matchesTag = activeTag === 'all' || tags.includes(activeTag);
      card.style.display = matchesSearch && matchesTag ? 'flex' : 'none';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterProjects);
  }

  tagButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tagButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterProjects();
    });
  });
})();
