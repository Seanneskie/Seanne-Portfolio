async function loadBlogPosts() {
  try {
    const response = await fetch('assets/datafiles/blog-posts.json');
    const posts = await response.json();
    const container = document.getElementById('blogPosts');
    if (!container) return;
    posts.forEach((post) => {
      const article = document.createElement('article');
      article.className = 'blog-post';
      article.innerHTML = `
        <h3>${post.title}</h3>
        <p class="blog-date">${post.date}</p>
        <p>${post.description}</p>
        <a href="${post.url}" target="_blank" class="btn btn-secondary">Read More</a>
      `;
      container.appendChild(article);
    });
  } catch (error) {
    console.error('Error loading blog posts:', error);
  }
}
