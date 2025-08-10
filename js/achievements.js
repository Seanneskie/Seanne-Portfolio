function initAchievements() {
  fetch('assets/datafiles/achievements.json')
    .then(r => r.json())
    .then(data => {
      const container = document.querySelector('#achievements .timeline');
      if (!container) return;
      container.innerHTML = '';
      data.forEach(item => {
        const li = document.createElement('li');
        const icon = document.createElement('i');
        icon.className = item.icon || '';
        li.appendChild(icon);
        const contentDiv = document.createElement('div');
        contentDiv.className = 'achievement-content';
        const strong = document.createElement('strong');
        strong.textContent = item.title || '';
        const p = document.createElement('p');
        p.textContent = item.description || '';
        contentDiv.appendChild(strong);
        contentDiv.appendChild(p);
        li.appendChild(contentDiv);
        container.appendChild(li);
      });
    })
    .catch(err => console.error('Error loading achievements:', err));
}
