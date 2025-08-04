function loadProjectAssets(project) {
  const nav = document.querySelector('nav');
  if (!nav) return;

  const section = document.createElement('section');
  section.className = 'container my-5';
  section.innerHTML = `
    <div id="gallery" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner"></div>
      <a class="carousel-control-prev" href="#gallery" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#gallery" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <div id="pdf-list" class="mt-3"></div>
  `;
  nav.insertAdjacentElement('afterend', section);

  loadImages(project);
  loadPDFs(project);
}

function loadImages(project) {
  fetch(`../static/${project}/images/images.json`)
    .then((response) => response.json())
    .then((images) => {
      const container = document.querySelector('#gallery .carousel-inner');
      if (!container) return;
      images.forEach((file, index) => {
        const caption = file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        const item = document.createElement('div');
        item.className = `carousel-item${index === 0 ? ' active' : ''}`;
        item.innerHTML = `
          <img src="../static/${project}/images/${file}" class="d-block w-100" alt="${caption}">
          <div class="carousel-caption d-none d-md-block">
            <p>${caption}</p>
          </div>`;
        container.appendChild(item);
      });
    })
    .catch((err) => console.error('Error loading images', err));
}

function loadPDFs(project) {
  fetch(`../static/${project}/pdfs/pdfs.json`)
    .then((response) => response.json())
    .then((pdfs) => {
      const list = document.getElementById('pdf-list');
      if (!list || pdfs.length === 0) return;
      const heading = document.createElement('h5');
      heading.textContent = 'Downloads';
      list.appendChild(heading);
      const ul = document.createElement('ul');
      ul.className = 'list-unstyled';
      pdfs.forEach((file) => {
        const caption = file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        const li = document.createElement('li');
        li.innerHTML = `<a href="../static/${project}/pdfs/${file}" download>${caption}</a>`;
        ul.appendChild(li);
      });
      list.appendChild(ul);
    })
    .catch((err) => console.error('Error loading PDFs', err));
}
