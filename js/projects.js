function initProjects() {
  fetch('assets/datafiles/projects.json')
    .then(response => response.json())
    .then(projects => {
      const container = document.getElementById('projectCards');
      const paginationContainer = document.getElementById('projectPagination');
      if (!container || !paginationContainer) return;

      const cards = projects.map(p => {
        const card = document.createElement('div');
        card.className = 'project-card';

        const header = document.createElement('div');
        header.className = 'project-card-header';
        const img = document.createElement('img');
        img.src = p.image;
        img.alt = p.alt || p.title;
        img.className = 'project-card-image';
        header.appendChild(img);
        const h5 = document.createElement('h5');
        h5.textContent = p.title;
        header.appendChild(h5);
        card.appendChild(header);

        const descDiv = document.createElement('div');
        descDiv.className = 'project-description';
        const pDesc = document.createElement('p');
        pDesc.textContent = p.description;
        descDiv.appendChild(pDesc);
        if (p.collaborators) {
          const pCol = document.createElement('p');
          pCol.innerHTML = '<strong>Collaborators:</strong> ' + p.collaborators;
          descDiv.appendChild(pCol);
        }
        card.appendChild(descDiv);

        if (p.tags && p.tags.length) {
          const tagDiv = document.createElement('div');
          tagDiv.className = 'project-tags';
          tagDiv.style.marginTop = '10px';
          p.tags.forEach(t => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = t;
            tagDiv.appendChild(span);
          });
          card.appendChild(tagDiv);
        }

        const footer = document.createElement('div');
        footer.className = 'project-footer';
        if (p.github || p.githubText || p.githubDisabled) {
          const aGit = document.createElement('a');
          aGit.href = p.github || '#';
          aGit.target = '_blank';
          aGit.className = 'btn btn-secondary';
          aGit.textContent = p.githubText || 'View on GitHub';
          if (p.githubDisabled) {
            aGit.className += ' align-self-end disabled';
            aGit.setAttribute('disabled', 'disabled');
          }
          footer.appendChild(aGit);
        }
        if (p.details) {
          const aDet = document.createElement('a');
          aDet.href = p.details;
          aDet.className = 'btn btn-secondary';
          aDet.textContent = 'View Details';
          footer.appendChild(aDet);
        }
        card.appendChild(footer);

        container.appendChild(card);
        return card;
      });

      const cardsPerPage = 3;
      let currentPage = 1;

      function renderPage(page) {
        const start = (page - 1) * cardsPerPage;
        const end = start + cardsPerPage;
        cards.forEach((card, index) => {
          card.style.display = index >= start && index < end ? 'flex' : 'none';
        });
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(cards.length / cardsPerPage);
        for (let i = 1; i <= totalPages; i++) {
          const btn = document.createElement('button');
          btn.textContent = i;
          btn.className = 'btn btn-sm mx-1 ' + (i === page ? 'btn-primary' : 'btn-outline-secondary');
          btn.onclick = () => renderPage(i);
          paginationContainer.appendChild(btn);
        }
      }

      renderPage(currentPage);
    });
}
