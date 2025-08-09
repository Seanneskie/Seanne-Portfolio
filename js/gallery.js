async function loadProjectAssets(project) {
  const nav = await waitForNav();
  if (!nav) return;

  const [images, pdfs] = await Promise.all([
    fetchAssets(project, 'images'),
    fetchAssets(project, 'pdfs')
  ]);

  if (images.length === 0 && pdfs.length === 0) return;

  const section = document.createElement('section');
  section.className = 'max-w-6xl mx-auto my-5 px-4';

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

  const grid = document.createElement('div');
  grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';
  images.forEach((file) => {
    const caption = file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    const img = document.createElement('img');
    const src = `../static/${project}/images/${file}`;
    img.src = src;
    img.setAttribute('data-src', src);
    img.alt = caption;
    img.loading = 'lazy';
    img.className = 'w-full';
    grid.appendChild(img);
  });
  return grid;
}

function renderPDFs(project, pdfs) {
  if (pdfs.length === 0) return null;

  const container = document.createElement('div');
  container.id = 'pdf-list';

  const heading = document.createElement('h5');
  heading.textContent = 'Downloads';
  container.appendChild(heading);

  const list = document.createElement('div');
  list.className = 'flex flex-col gap-2';
  pdfs.forEach((file) => {
    const caption = file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    const link = document.createElement('a');
    link.href = `../static/${project}/pdfs/${file}`;
    link.download = '';
    link.className = 'block p-2 bg-gray-100 rounded hover:bg-gray-200';
    link.textContent = caption;
    list.appendChild(link);
  });
  container.appendChild(list);

  return container;
}
