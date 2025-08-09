function initWorkExperiences() {
  fetch('assets/datafiles/work-experiences.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('workExperienceAccordion');
      if (!container) return;

      data.forEach((exp, index) => {
        const card = document.createElement('div');
        card.className = 'card shadow-sm mb-3 border-0';

        // Header
        const header = document.createElement('div');
        header.className = 'card-header text-white';
        header.style.backgroundColor = 'var(--charcoal)';
        header.id = `heading${index}`;

        const h5 = document.createElement('h5');
        h5.className = 'mb-0';

        const button = document.createElement('button');
        button.className = `btn btn-link text-white text-left w-100 ${index !== 0 ? 'collapsed' : ''}`;
        button.type = 'button';
        button.setAttribute('data-toggle', 'collapse');
        button.setAttribute('data-target', `#collapse${index}`);
        button.setAttribute('aria-expanded', index === 0 ? 'true' : 'false');
        button.setAttribute('aria-controls', `collapse${index}`);
        button.innerHTML = `<i class="fas fa-briefcase mr-2"></i><strong>${exp.company}</strong> – ${exp.project}
                            <span class="d-block small">${exp.period || ''}</span>`;

        h5.appendChild(button);
        header.appendChild(h5);
        card.appendChild(header);

        // Collapse body
        const collapse = document.createElement('div');
        collapse.id = `collapse${index}`;
        collapse.className = `collapse ${index === 0 ? 'show' : ''}`;
        collapse.setAttribute('aria-labelledby', `heading${index}`);
        collapse.setAttribute('data-parent', '#workExperienceAccordion');

        const body = document.createElement('div');
        body.className = 'card-body';

        // Summary
        if (exp.summary) {
          const summary = document.createElement('p');
          summary.className = 'card-text font-weight-bold';
          summary.textContent = exp.summary;
          body.appendChild(summary);
        }

        // Tech stack badges
        if (Array.isArray(exp.tech) && exp.tech.length) {
          const techDiv = document.createElement('div');
          exp.tech.forEach(t => {
            const badge = document.createElement('span');
            badge.className = 'badge badge-secondary mr-1 mb-1';
            badge.textContent = t;
            techDiv.appendChild(badge);
          });
          body.appendChild(techDiv);
        }

        // Highlights list
        if (Array.isArray(exp.highlights) && exp.highlights.length) {
          const ul = document.createElement('ul');
          ul.className = 'mt-2';
          exp.highlights.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check-circle text-success mr-2"></i>${item}`;
            ul.appendChild(li);
          });
          body.appendChild(ul);
        }

        collapse.appendChild(body);
        card.appendChild(collapse);
        container.appendChild(card);
      });
    })
    .catch(err => console.error('Error loading work experiences:', err));
}
