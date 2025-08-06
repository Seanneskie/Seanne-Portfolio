function initSkills() {
  fetch('assets/datafiles/skills.json')
    .then(res => res.json())
    .then(categories => {
      const skillsSection = document.getElementById('skills');
      if (!skillsSection) return;
      const container = skillsSection.querySelector('.skills-container');
      const tabs = container.querySelector('.tabs');

      categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'tablinks';
        btn.textContent = cat.label;
        btn.dataset.target = cat.id;
        tabs.appendChild(btn);

        const tabcontent = document.createElement('div');
        tabcontent.id = cat.id;
        tabcontent.className = 'tabcontent';
        tabcontent.setAttribute('data-aos', 'fade-up');
        tabcontent.setAttribute('data-aos-duration', '800');
        tabcontent.setAttribute('data-aos-delay', '100');

        const side = document.createElement('div');
        side.className = 'side-by-side';

        cat.groups.forEach(group => {
          const groupDiv = document.createElement('div');
          const h3 = document.createElement('h3');
          h3.textContent = group.title;
          groupDiv.appendChild(h3);
          const ul = document.createElement('ul');
          group.items.forEach(item => {
            const li = document.createElement('li');
            const icon = document.createElement('i');
            icon.className = item.icon;
            li.appendChild(icon);
            li.appendChild(document.createTextNode(' ' + item.name));
            ul.appendChild(li);
          });
          groupDiv.appendChild(ul);
          side.appendChild(groupDiv);
        });

        tabcontent.appendChild(side);
        container.appendChild(tabcontent);
      });

      function openSkillsTab(evt) {
        const categoryName = evt.currentTarget.dataset.target;
        const tabContents = container.querySelectorAll('.tabcontent');
        const tabLinks = tabs.querySelectorAll('.tablinks');

        tabContents.forEach(tab => {
          tab.style.display = 'none';
          tab.classList.remove('active');
        });
        tabLinks.forEach(tab => tab.classList.remove('active'));

        const targetTab = container.querySelector('#' + CSS.escape(categoryName));
        if (targetTab) {
          targetTab.style.display = 'block';
          setTimeout(() => targetTab.classList.add('active'), 10);
          evt.currentTarget.classList.add('active');
        }
      }

      tabs.querySelectorAll('.tablinks').forEach(btn => btn.addEventListener('click', openSkillsTab));
      const firstTab = tabs.querySelector('.tablinks');
      if (firstTab) firstTab.click();
    });
}

initSkills();
