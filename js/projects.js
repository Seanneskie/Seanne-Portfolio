function initProjects() {
  fetch('assets/datafiles/projects.json')
    .then(r => r.json())
    .then(data => {
      const container = document.getElementById('projectAccordion');
      if (!container) return;

      // reset & go full-width
      container.innerHTML = '';
      const section = container.closest('section');
      if (section) section.classList.add('container-fluid');
      container.className = 'row';

      // build EXACTLY two column accordions (stack to 1 col on xs)
      const numCols = 2;
      const colAccords = [];
      for (let c = 0; c < numCols; c++) {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 mb-3';
        const colAcc = document.createElement('div');
        colAcc.className = 'accordion';
        colAcc.id = `projectAccordionCol${c}`;
        col.appendChild(colAcc);
        container.appendChild(col);
        colAccords.push(colAcc);
      }

      // Track whether we've seen the first item in each column
      const firstSeen = Array(numCols).fill(false);

      data.forEach((project, index) => {
        const colIndex = index % numCols;           // distribute L-R-L-R...
        const parentAcc = colAccords[colIndex];
        const uid = `proj-${colIndex}-${index}-${Math.random().toString(36).slice(2, 7)}`;

        // Open rule: open only the FIRST item of column 0; column 1 stays closed
        const isFirstInThisCol = !firstSeen[colIndex];
        const isOpen = (colIndex === 0 && isFirstInThisCol);
        if (isFirstInThisCol) firstSeen[colIndex] = true;

        // Card
        const card = document.createElement('div');
        card.className = 'card border-0 shadow-sm mb-3';
        card.style.backgroundColor = 'var(--obsidian)';
        card.style.color = 'var(--text)';
        parentAcc.appendChild(card);

        // Header
        const header = document.createElement('div');
        header.className = 'card-header text-white';
        header.id = `${uid}-heading`;
        header.style.backgroundColor = 'var(--charcoal)';
        card.appendChild(header);

        const h5 = document.createElement('h5'); h5.className = 'mb-0'; header.appendChild(h5);

        const button = document.createElement('button');
        button.className = `btn btn-link text-white text-left w-100 ${isOpen ? '' : 'collapsed'}`;
        button.type = 'button';
        button.setAttribute('data-toggle', 'collapse');
        button.setAttribute('data-target', `#${uid}-collapse`);
        button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        button.setAttribute('aria-controls', `${uid}-collapse`);
        button.innerHTML = `<strong>${project.title || 'Untitled'}</strong>
                            <span class="d-block small">${project.period || ''}</span>`;
        h5.appendChild(button);

        // Collapse (scoped to THIS column)
        const collapse = document.createElement('div');
        collapse.id = `${uid}-collapse`;
        collapse.className = `collapse ${isOpen ? 'show' : ''}`;
        collapse.setAttribute('aria-labelledby', `${uid}-heading`);
        collapse.setAttribute('data-parent', `#${parentAcc.id}`);
        card.appendChild(collapse);

        // Body → side-by-side on md+, stacked on mobile
        const body = document.createElement('div');
        body.className = 'card-body';
        collapse.appendChild(body);

        const row = document.createElement('div');
        row.className = 'row';
        body.appendChild(row);

        // Image
        if (project.image) {
          const imgCol = document.createElement('div');
          imgCol.className = 'col-md-5 mb-3 mb-md-0';
          const img = document.createElement('img');
          img.src = project.image;
          img.alt = project.alt || project.title || 'Project image';
          img.className = 'project-thumb';  // ← uses the fixed-size class
          img.style.objectFit = 'cover';
          img.style.maxHeight = '260px';
          imgCol.appendChild(img);
          row.appendChild(imgCol);
        }

        // Details
        const detailCol = document.createElement('div');
        detailCol.className = project.image ? 'col-md-7' : 'col-12';

        if (project.description) {
          const desc = document.createElement('p');
          desc.className = 'mb-2';
          desc.textContent = project.description;
          detailCol.appendChild(desc);
        }

        if (project.collaborators) {
          const collab = document.createElement('p');
          collab.innerHTML = `<strong>Collaborators:</strong> ${project.collaborators}`;
          detailCol.appendChild(collab);
        }

        if (Array.isArray(project.tags) && project.tags.length) {
          const tags = document.createElement('div');
          tags.className = 'mb-3';
          project.tags.forEach(t => {
            const badge = document.createElement('span');
            badge.className = 'badge badge-secondary mr-1 mb-1';
            badge.textContent = t;
            tags.appendChild(badge);
          });
          detailCol.appendChild(tags);
        }

        const footer = document.createElement('div');
        footer.className = 'd-flex flex-wrap';
        if (project.github) {
          const aGit = document.createElement('a');
          aGit.href = project.github;
          aGit.target = '_blank';
          aGit.className = 'btn btn-outline-light btn-sm mr-2 mb-2';
          aGit.textContent = project.githubLabel || 'View on GitHub';
          footer.appendChild(aGit);
        }
        if (project.details) {
          const aDetails = document.createElement('a');
          aDetails.href = project.details;
          aDetails.className = 'btn btn-outline-light btn-sm mb-2';
          aDetails.textContent = 'View Details';
          footer.appendChild(aDetails);
        }
        detailCol.appendChild(footer);

        row.appendChild(detailCol);
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
