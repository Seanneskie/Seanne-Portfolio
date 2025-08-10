function loadSection(id, path, callback) {
  return fetch(path)
    .then((response) => response.text())
    .then((html) => {
      const target = document.getElementById(id);
      if (target) {
        target.innerHTML = html;
        if (typeof callback === 'function') {
          callback();
        }
        if (typeof window.applyBootstrapTheme === 'function') {
          const savedTheme = localStorage.getItem('theme') || 'dark';
          window.applyBootstrapTheme(savedTheme);
        }
      }
    })
    .catch((error) => console.error(`Error loading ${path}:`, error));
}

function loadSearchBox(targetId, inputId, placeholder) {
  return loadSection(targetId, 'sections/components/search-box.html', () => {
    const container = document.getElementById(targetId);
    if (!container) return;
    const input = container.querySelector('input');
    if (!input) return;
    if (inputId) input.id = inputId;
    if (placeholder) {
      input.placeholder = placeholder;
      input.setAttribute('aria-label', placeholder);
    }
  });
}

