// Handles theme toggling and persistence

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('theme-toggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    body.classList.add('light-theme');
  }

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      body.classList.toggle('light-theme');
      const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
      localStorage.setItem('theme', theme);
    });
  }
});

