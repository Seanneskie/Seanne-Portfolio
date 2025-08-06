// Handles theme toggling, persistence, and Bootstrap component updates

function applyBootstrapTheme(theme) {
  const navbars = document.querySelectorAll('.navbar');
  navbars.forEach((navbar) => {
    navbar.classList.remove('navbar-light', 'navbar-dark', 'bg-light', 'bg-dark');
    if (theme === 'light') {
      navbar.classList.add('navbar-light', 'bg-light');
    } else {
      navbar.classList.add('navbar-dark', 'bg-dark');
    }
  });

  const toggleButton = document.getElementById('theme-toggle');
  if (toggleButton) {
    toggleButton.classList.remove('btn-outline-light', 'btn-outline-dark');
    toggleButton.classList.add(
      theme === 'light' ? 'btn-outline-dark' : 'btn-outline-light',
    );
  }

  const buttons = document.querySelectorAll('.btn');
  buttons.forEach((btn) => {
    if (theme === 'light') {
      if (btn.classList.contains('btn-outline-light')) {
        btn.classList.replace('btn-outline-light', 'btn-outline-dark');
      }
      if (btn.classList.contains('btn-dark')) {
        btn.classList.replace('btn-dark', 'btn-light');
      }
    } else {
      if (btn.classList.contains('btn-outline-dark')) {
        btn.classList.replace('btn-outline-dark', 'btn-outline-light');
      }
      if (btn.classList.contains('btn-light')) {
        btn.classList.replace('btn-light', 'btn-dark');
      }
    }
  });

  document.querySelectorAll('.bg-light, .bg-dark').forEach((el) => {
    if (theme === 'light' && el.classList.contains('bg-dark')) {
      el.classList.replace('bg-dark', 'bg-light');
    } else if (theme === 'dark' && el.classList.contains('bg-light')) {
      el.classList.replace('bg-light', 'bg-dark');
    }
  });

  document.querySelectorAll('.text-light, .text-dark').forEach((el) => {
    if (theme === 'light' && el.classList.contains('text-light')) {
      el.classList.replace('text-light', 'text-dark');
    } else if (theme === 'dark' && el.classList.contains('text-dark')) {
      el.classList.replace('text-dark', 'text-light');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('theme-toggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    body.classList.add('light-theme');
  }

  applyBootstrapTheme(savedTheme === 'light' ? 'light' : 'dark');

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      body.classList.toggle('light-theme');
      const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
      localStorage.setItem('theme', theme);
      applyBootstrapTheme(theme);
    });
  }
});

// Expose function for dynamically loaded sections
window.applyBootstrapTheme = applyBootstrapTheme;

