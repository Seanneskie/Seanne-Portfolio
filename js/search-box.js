function loadSearchBox(containerId, inputId, placeholder, ariaLabel, callback) {
  loadSection(containerId, 'sections/components/search-box.html', () => {
    const container = document.getElementById(containerId);
    if (container) {
      const input = container.querySelector('input');
      if (input) {
        if (inputId) input.id = inputId;
        if (placeholder) input.placeholder = placeholder;
        if (ariaLabel) input.setAttribute('aria-label', ariaLabel);
      }
    }
    if (typeof callback === 'function') {
      callback();
    }
  });
}
