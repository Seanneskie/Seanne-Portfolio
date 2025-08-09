function initWorkExperiences() {
  fetch('assets/datafiles/work-experiences.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('workExperienceAccordion');
      if (!container) return;

      data.forEach((exp, index) => {
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.style.backgroundColor = 'var(--obsidian)';
        card.style.color = 'var(--text)';
        card.style.border = 'none';

        const header = document.createElement('div');
        header.className = 'card-header';
        header.id = `heading${index}`;
        header.style.backgroundColor = 'var(--onyx)';
        header.style.borderBottom = '1px solid var(--charcoal)';

        const h5 = document.createElement('h5');
        h5.className = 'mb-0';

        const button = document.createElement('button');
        button.className = 'btn btn-link text-left w-100';
        button.type = 'button';
        button.setAttribute('data-bs-toggle', 'collapse');
        button.setAttribute('data-bs-target', `#collapse${index}`);
        button.setAttribute('aria-expanded', index === 0 ? 'true' : 'false');
        button.setAttribute('aria-controls', `collapse${index}`);
        let buttonHTML = `<strong>${exp.company}</strong> – ${exp.project}`;
        if (exp.period) {
          buttonHTML += `<span class="d-block small">${exp.period}</span>`;
        }
        button.innerHTML = buttonHTML;

        h5.appendChild(button);
        header.appendChild(h5);
        card.appendChild(header);

        const collapse = document.createElement('div');
        collapse.id = `collapse${index}`;
        collapse.className = 'collapse' + (index === 0 ? ' show' : '');
        collapse.setAttribute('aria-labelledby', `heading${index}`);
        collapse.setAttribute('data-bs-parent', '#workExperienceAccordion');

        const body = document.createElement('div');
        body.className = 'card-body';

        const summary = document.createElement('p');
        summary.className = 'card-text';
        summary.innerHTML = exp.summary || '';
        body.appendChild(summary);

        if (Array.isArray(exp.tech) && exp.tech.length) {
          const tech = document.createElement('p');
          tech.className = 'mb-2 fw-bold fst-italic';
          tech.style.color = 'var(--text)';
          tech.innerHTML = `<span class="visually-hidden">Tech stack:</span> ${exp.tech.join(' · ')}`;
          body.appendChild(tech);
        }

        if (Array.isArray(exp.highlights) && exp.highlights.length) {
          const ul = document.createElement('ul');
          ul.className = 'mb-0';
          exp.highlights.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
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
