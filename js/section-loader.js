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

