// IntersectionObserver fallback for lazy loading
(function() {
  if ('loading' in HTMLImageElement.prototype) {
    return;
  }
  const images = document.querySelectorAll('img[loading="lazy"]');
  const onIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.dataset.src;
        if (src) {
          img.src = src;
        }
        observer.unobserve(img);
      }
    });
  };
  const observer = new IntersectionObserver(onIntersection);
  images.forEach(img => observer.observe(img));
})();
