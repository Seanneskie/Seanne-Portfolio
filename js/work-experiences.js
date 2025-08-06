function initWorkExperiences() {
  fetch('assets/datafiles/work-experiences.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('workExperienceContainer');
      if (!container) return;
      data.forEach(exp => {
        const article = document.createElement('article');
        article.className = 'card mb-3';
        article.style.backgroundColor = 'var(--obsidian)';
        article.style.color = 'var(--text)';
        article.style.border = 'none';

        const header = document.createElement('header');
        header.className = 'card-body';

        const title = document.createElement('h3');
        title.className = 'card-title font-weight-bold';
        title.textContent = `${exp.company} – ${exp.project}`;
        header.appendChild(title);

        if (exp.period) {
          const period = document.createElement('p');
          period.className = 'card-subtitle mb-2';
          period.style.color = 'var(--text)';
          period.textContent = exp.period;
          header.appendChild(period);
        }

        if (exp.tech && exp.tech.length) {
          const tech = document.createElement('p');
          tech.className = 'card-subtitle mb-2 fw-bold fst-italic';
          tech.style.color = 'var(--text)';
          tech.innerHTML = `<span class="visually-hidden">Tech stack:</span> ${exp.tech.join(' · ')}`;
          header.appendChild(tech);
        }

        article.appendChild(header);

        const body = document.createElement('div');
        body.className = 'px-3 pb-3';

        const summary = document.createElement('p');
        summary.className = 'card-text';
        summary.innerHTML = exp.summary;
        body.appendChild(summary);

        if (exp.highlights && exp.highlights.length) {
          const ul = document.createElement('ul');
          ul.className = 'mb-0';
          exp.highlights.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
          });
          body.appendChild(ul);
        }

        article.appendChild(body);
        container.appendChild(article);
      });
    })
    .catch(err => console.error('Error loading work experiences:', err));
}
