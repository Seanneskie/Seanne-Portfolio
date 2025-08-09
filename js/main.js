document.addEventListener('DOMContentLoaded', () => {
  fetch('sections/footer.html')
    .then(res => res.text())
    .then(html => {
      const footer = document.getElementById('footer');
      if (footer) footer.innerHTML = html;
    })
    .catch(err => console.error('Error loading footer:', err));
});
