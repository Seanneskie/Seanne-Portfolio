function initTestimonials() {
  fetch('static/testimonials.json')
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById('testimonialCarouselInner');
      if (!container) return;
      data.forEach((t, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item' + (index === 0 ? ' active' : '');

        const blockquote = document.createElement('blockquote');
        blockquote.className = 'blockquote testimonial-item';
        const p = document.createElement('p');
        p.className = 'mb-0';
        p.textContent = t.quote;
        const footer = document.createElement('footer');
        footer.className = 'blockquote-footer';
        footer.textContent = `${t.author}${t.role ? ', ' + t.role : ''}`;
        blockquote.appendChild(p);
        blockquote.appendChild(footer);
        item.appendChild(blockquote);
        container.appendChild(item);
      });
    })
    .catch((error) => console.error('Error loading testimonials:', error));
}
