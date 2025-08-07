function initCourses() {
  fetch('assets/datafiles/courses.json')
    .then(res => res.json())
    .then(courses => {
      const container = document.getElementById('courseCards');
      if (!container) return;
      courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'certificate-card';

        const title = document.createElement('h3');
        title.textContent = course.title;
        card.appendChild(title);

        const code = document.createElement('p');
        code.className = 'details-placeholder';
        code.textContent = `Course Code: ${course.code}`;
        card.appendChild(code);

        const institution = document.createElement('p');
        institution.className = 'details-placeholder';
        institution.textContent = course.institution;
        card.appendChild(institution);

        container.appendChild(card);
      });
    })
    .catch(err => console.error('Error loading courses:', err));
}

initCourses();
