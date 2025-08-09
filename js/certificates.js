function initCertificates() {
  fetch('assets/datafiles/certificates.json')
    .then(r => r.json())
    .then(data => {
      const container = document.getElementById('certificateAccordion');
      if (!container) return;

      // Prep wrapper as a responsive row
      container.innerHTML = '';
      const section = container.closest('section');
      if (section) section.classList.add('container-fluid');
      container.className = 'row';

      // Build exactly two column accordions (stack to 1 col on phones)
      const accordions = [];
      for (let c = 0; c < 2; c++) {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 mb-3';
        const acc = document.createElement('div');
        acc.className = 'accordion';
        acc.id = `certificateAccordionCol${c}`;
        col.appendChild(acc);
        container.appendChild(col);
        accordions.push(acc);
      }

      // Open only the first item in the LEFT column by default
      const firstSeen = [false, false];

      data.forEach((cert, index) => {
        const colIndex = index % 2;
        const parentAcc = accordions[colIndex];
        const uid = `cert-${colIndex}-${index}-${Math.random().toString(36).slice(2,7)}`;

        const isFirstInCol = !firstSeen[colIndex];
        const isOpen = colIndex === 0 && isFirstInCol;  // left col opens first; right stays closed
        if (isFirstInCol) firstSeen[colIndex] = true;

        // Card (dark theme)
        const card = document.createElement('div');
        card.className = 'card shadow-sm mb-3 border-0';
        card.style.backgroundColor = 'var(--obsidian)';
        card.style.color = 'var(--text)';
        parentAcc.appendChild(card);

        // Header
        const header = document.createElement('div');
        header.className = 'card-header text-white';
        header.id = `${uid}-heading`;
        header.style.backgroundColor = 'var(--charcoal)';
        card.appendChild(header);

        const h5 = document.createElement('h5');
        h5.className = 'mb-0';
        header.appendChild(h5);

        // Title + optional meta (date • provider)
        const metaBits = [];
        if (cert.date) metaBits.push(cert.date);
        if (cert.provider) metaBits.push(cert.provider);
        const meta = metaBits.length ? `<span class="d-block small">${metaBits.join(' • ')}</span>` : '';

        const button = document.createElement('button');
        button.className = `btn btn-link text-white text-left w-100 ${isOpen ? '' : 'collapsed'}`;
        button.type = 'button';
        button.setAttribute('data-toggle', 'collapse');
        button.setAttribute('data-target', `#${uid}-collapse`);
        button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        button.setAttribute('aria-controls', `${uid}-collapse`);
        button.innerHTML = `<i class="fas fa-certificate mr-2"></i><strong>${cert.title || 'Untitled Certificate'}</strong>${meta}`;
        h5.appendChild(button);

        // Collapse (scoped to THIS column)
        const collapse = document.createElement('div');
        collapse.id = `${uid}-collapse`;
        collapse.className = `collapse ${isOpen ? 'show' : ''}`;
        collapse.setAttribute('aria-labelledby', `${uid}-heading`);
        collapse.setAttribute('data-parent', `#${parentAcc.id}`); // single-open per column
        card.appendChild(collapse);

        // Body layout: image left, details right (stack on mobile)
        const body = document.createElement('div');
        body.className = 'card-body';
        collapse.appendChild(body);

        const row = document.createElement('div');
        row.className = 'row';
        body.appendChild(row);

        // Image
        if (cert.image) {
          const imgCol = document.createElement('div');
          imgCol.className = 'col-sm-5 mb-3 mb-sm-0';
          const img = document.createElement('img');
          img.src = cert.image;
          img.alt = cert.alt || cert.title || 'Certificate image';
          img.loading = 'lazy';
          img.className = 'certificate-thumb w-100';
          imgCol.appendChild(img);
          row.appendChild(imgCol);
        }

        // Details
        const detailCol = document.createElement('div');
        detailCol.className = cert.image ? 'col-sm-7' : 'col-12';

        if (cert.desc) {
          const p = document.createElement('p');
          p.className = 'mb-2';
          p.textContent = cert.desc;
          detailCol.appendChild(p);
        }

        if (Array.isArray(cert.skills) && cert.skills.length) {
          const skillsDiv = document.createElement('div');
          skillsDiv.className = 'mb-2';
          cert.skills.forEach(s => {
            const badge = document.createElement('span');
            badge.className = 'badge badge-secondary mr-1 mb-1';
            badge.textContent = s;
            skillsDiv.appendChild(badge);
          });
          detailCol.appendChild(skillsDiv);
        }

        if (cert.link) {
          const a = document.createElement('a');
          a.href = cert.link;
          a.target = '_blank';
          a.rel = 'noopener';
          a.className = 'btn btn-outline-light btn-sm';
          a.style.borderColor = 'var(--charcoal)';
          a.textContent = cert.linkLabel || 'View Certificate';
          detailCol.appendChild(a);
        }

        row.appendChild(detailCol);
      });
    })
    .catch(err => console.error('Error loading certificates:', err));
}
