function initCertificates() {
  fetch('assets/datafiles/certificates.json')
    .then(r => r.json())
    .then(data => {
      const container = document.getElementById('certificateAccordion');
      if (!container) return;

      data.forEach((cert, index) => {
        const card = document.createElement('div');
        card.className = 'card shadow-sm mb-3 border-0';

        const header = document.createElement('div');
        header.className = 'card-header text-white';
        header.style.backgroundColor = 'var(--charcoal)';
        header.id = `certHeading${index}`;

        const h5 = document.createElement('h5');
        h5.className = 'mb-0';

        const button = document.createElement('button');
        button.className = `btn btn-link text-white text-left w-100 ${index !== 0 ? 'collapsed' : ''}`;
        button.type = 'button';
        button.setAttribute('data-toggle', 'collapse');
        button.setAttribute('data-target', `#certCollapse${index}`);
        button.setAttribute('aria-expanded', index === 0 ? 'true' : 'false');
        button.setAttribute('aria-controls', `certCollapse${index}`);
        button.innerHTML = `<i class="fas fa-certificate mr-2"></i><strong>${cert.title}</strong>`;

        h5.appendChild(button);
        header.appendChild(h5);
        card.appendChild(header);

        const collapse = document.createElement('div');
        collapse.id = `certCollapse${index}`;
        collapse.className = `collapse ${index === 0 ? 'show' : ''}`;
        collapse.setAttribute('aria-labelledby', `certHeading${index}`);
        collapse.setAttribute('data-parent', '#certificateAccordion');

        const body = document.createElement('div');
        body.className = 'card-body';

        if (cert.desc) {
          const p = document.createElement('p');
          p.className = 'mb-2';
          p.textContent = cert.desc;
          body.appendChild(p);
        }

        if (Array.isArray(cert.skills) && cert.skills.length) {
          const skillsDiv = document.createElement('div');
          cert.skills.forEach(s => {
            const badge = document.createElement('span');
            badge.className = 'badge badge-secondary mr-1 mb-1';
            badge.textContent = s;
            skillsDiv.appendChild(badge);
          });
          body.appendChild(skillsDiv);
        }

        if (cert.link) {
          const a = document.createElement('a');
          a.href = cert.link;
          a.target = '_blank';
          a.className = 'btn btn-outline-primary btn-sm mt-2';
          a.textContent = 'View Certificate';
          body.appendChild(a);
        }

        collapse.appendChild(body);
        card.appendChild(collapse);
        container.appendChild(card);
      });

      if (typeof window.applyBootstrapTheme === 'function') {
        const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        window.applyBootstrapTheme(currentTheme);
      }
    })
    .catch(err => console.error('Error loading certificates:', err));
}

