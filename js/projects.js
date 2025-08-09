function initProjects() {
  fetch('assets/datafiles/projects.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('projectAccordion');
      if (!container) return;

      data.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.style.backgroundColor = 'var(--obsidian)';
        card.style.color = 'var(--text)';
        card.style.border = 'none';

        const header = document.createElement('div');
        header.className = 'card-header';
        header.id = `projectHeading${index}`;
        header.style.backgroundColor = 'var(--onyx)';
        header.style.borderBottom = '1px solid var(--charcoal)';

        const h5 = document.createElement('h5');
        h5.className = 'mb-0';

        const button = document.createElement('button');
        button.className =
          'btn btn-link text-left w-100' + (index === 0 ? '' : ' collapsed');
        button.type = 'button';
        button.setAttribute('data-toggle', 'collapse');
        button.setAttribute('data-target', `#projectCollapse${index}`);
        button.setAttribute('aria-expanded', index === 0 ? 'true' : 'false');
        button.setAttribute('aria-controls', `projectCollapse${index}`);

        const period = project.period || 'June 2024 - Jan 2025';
        button.innerHTML = `<strong>${project.title}</strong><span class="d-block small">${period}</span>`;

        h5.appendChild(button);
        header.appendChild(h5);
        card.appendChild(header);

        const collapse = document.createElement('div');
        collapse.id = `projectCollapse${index}`;
        collapse.className = 'collapse' + (index === 0 ? ' show' : '');
        collapse.setAttribute('aria-labelledby', `projectHeading${index}`);
        collapse.setAttribute('data-parent', '#projectAccordion');

        const body = document.createElement('div');
        body.className = 'card-body';

        const desc = document.createElement('p');
        desc.className = 'card-text';
        desc.innerHTML = project.description || '';
        body.appendChild(desc);

        if (Array.isArray(project.tags) && project.tags.length) {
          const tags = document.createElement('p');
          tags.className = 'mb-2 fw-bold fst-italic';
          tags.style.color = 'var(--text)';
          tags.innerHTML = `<span class="visually-hidden">Tech stack:</span> ${project.tags.join(' · ')}`;
          body.appendChild(tags);
        }

        const footer = document.createElement('div');
        footer.className = 'd-flex gap-2 flex-wrap';

        const aGit = document.createElement('a');
        aGit.href = project.github || '#';
        aGit.target = '_blank';
        aGit.className = 'btn btn-secondary' + (project.github ? '' : ' disabled');
        if (!project.github) aGit.setAttribute('disabled', '');
        aGit.textContent = project.githubLabel || 'View on GitHub';
        footer.appendChild(aGit);

        if (project.details) {
          const aDetails = document.createElement('a');
          aDetails.href = project.details;
          aDetails.className = 'btn btn-secondary';
          aDetails.textContent = 'View Details';
          footer.appendChild(aDetails);
        }

        body.appendChild(footer);
        collapse.appendChild(body);
        card.appendChild(collapse);
        container.appendChild(card);
      });

      // Ensure dynamically added elements match the current theme
      if (typeof window.applyBootstrapTheme === 'function') {
        const currentTheme =
          document.body.classList.contains('light-theme') ? 'light' : 'dark';
        window.applyBootstrapTheme(currentTheme);
      }
    })
    .catch(err => console.error('Error loading projects:', err));
}
