document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up, .fade-down').forEach(el => {
    observer.observe(el);
  });
});
