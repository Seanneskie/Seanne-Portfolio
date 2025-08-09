async function loadProjectAssets(project) {
  const nav = await waitForNav();
  if (!nav) return;

  const [images, pdfs] = await Promise.all([
    fetchAssets(project, 'images'),
    fetchAssets(project, 'pdfs')
  ]);

  if (images.length === 0 && pdfs.length === 0) return;

  const section = document.createElement('section');
  section.className = 'container-fluid mb-3 bg-charcoal';

  const carousel = renderImages(project, images);
  if (carousel) section.appendChild(carousel);

  const pdfList = renderPDFs(project, pdfs);
  if (pdfList) section.appendChild(pdfList);

  nav.insertAdjacentElement('afterend', section);
}

function waitForNav() {
  return new Promise((resolve) => {
    const nav = document.querySelector('nav');
    if (nav) {
      resolve(nav);
      return;
    }
    const observer = new MutationObserver(() => {
      const nav = document.querySelector('nav');
      if (nav) {
        observer.disconnect();
        resolve(nav);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

async function fetchAssets(project, type) {
  try {
    const response = await fetch(`../static/${project}/${type}/${type}.json`);
    if (!response.ok) throw new Error('Missing assets');
    return await response.json();
  } catch (err) {
    console.error(`Error loading ${type}`, err);
    return [];
  }
}

function renderImages(project, images) {
  if (images.length === 0) return null;

  const carousel = document.createElement('div');
  carousel.id = 'gallery';
  carousel.className = 'carousel slide';
  carousel.setAttribute('data-bs-ride', 'carousel');

  if (images.length > 1) {
    const indicators = document.createElement('div');
    indicators.className = 'carousel-indicators';
    images.forEach((_, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('data-bs-target', '#gallery');
      button.setAttribute('data-bs-slide-to', index);
      if (index === 0) {
        button.className = 'active';
        button.setAttribute('aria-current', 'true');
      }
      button.setAttribute('aria-label', `Slide ${index + 1}`);
      indicators.appendChild(button);
    });
    carousel.appendChild(indicators);
  }

  const inner = document.createElement('div');
  inner.className = 'carousel-inner';
  images.forEach((file, index) => {
    const caption = file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    const item = document.createElement('div');
    item.className = `carousel-item${index === 0 ? ' active' : ''}`;
    item.innerHTML = `
      <img src="../static/${project}/images/${file}" class="d-block w-100" alt="${caption}">
      <div class="carousel-caption d-none d-md-block text-light">
        <p class="text-light">${caption}</p>
      </div>`;
    inner.appendChild(item);
  });
  carousel.appendChild(inner);

  if (images.length > 1) {
    const prev = document.createElement('button');
    prev.className = 'carousel-control-prev';
    prev.type = 'button';
    prev.setAttribute('data-bs-target', '#gallery');
    prev.setAttribute('data-bs-slide', 'prev');
    prev.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>';
    carousel.appendChild(prev);

    const next = document.createElement('button');
    next.className = 'carousel-control-next';
    next.type = 'button';
    next.setAttribute('data-bs-target', '#gallery');
    next.setAttribute('data-bs-slide', 'next');
    next.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>';
    carousel.appendChild(next);
  }

  return carousel;
}

function renderPDFs(project, pdfs) {
  if (pdfs.length === 0) return null;

  const container = document.createElement('div');
  container.id = 'pdf-list';

  const heading = document.createElement('h5');
  heading.textContent = 'Downloads';
  heading.className = 'text-light';
  container.appendChild(heading);

  const list = document.createElement('div');
  list.className = 'list-group';
  pdfs.forEach((file) => {
    const caption = file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    const link = document.createElement('a');
    link.href = `../static/${project}/pdfs/${file}`;
    link.download = '';
    link.className = 'list-group-item list-group-item-action bg-charcoal text-light';
    link.textContent = caption;
    list.appendChild(link);
  });
  container.appendChild(list);

  return container;
}
