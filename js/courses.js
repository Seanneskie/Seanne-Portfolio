function initCourses() {
  fetch('assets/datafiles/courses.json')
    .then(res => res.json())
    .then(courses => {
      const container = document.getElementById('courseCards');
      if (!container) return;
      courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';

        const title = document.createElement('h3');
        title.textContent = course.title;
        card.appendChild(title);

        const tagsContainer = document.createElement('div');
        tagsContainer.className = 'course-tags';
        const tags = course.tags || [course.code];
        tags.forEach(tag => {
          const tagEl = document.createElement('span');
          tagEl.className = 'tag';
          tagEl.textContent = tag;
          tagsContainer.appendChild(tagEl);
        });
        card.appendChild(tagsContainer);

        const institution = document.createElement('p');
        institution.className = 'institution';
        institution.textContent = course.institution;
        card.appendChild(institution);

        container.appendChild(card);
      });
    })
    .catch(err => console.error('Error loading courses:', err));
}

initCourses();
