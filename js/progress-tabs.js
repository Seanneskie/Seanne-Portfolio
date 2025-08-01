function openProgressTab(evt, tabName) {
  const progressSection = document.getElementById('progress');
  if (!progressSection) return;

  const tabcontent = progressSection.querySelectorAll('.tabcontent');
  tabcontent.forEach((tab) => {
    tab.style.display = 'none';
  });

  const tablinks = progressSection.querySelectorAll('.tablinks');
  tablinks.forEach((link) => {
    link.className = link.className.replace(' active', '');
  });

  const target = progressSection.querySelector('#' + CSS.escape(tabName));
  if (target) {
    target.style.display = 'block';
  }

  if (evt.currentTarget) {
    evt.currentTarget.className += ' active';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const firstTab = document.querySelector('#progress .tablinks');
  if (firstTab) firstTab.click();
});
