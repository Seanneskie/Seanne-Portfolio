(function () {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (!form) return;

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill in all fields.';
      status.className = 'text-danger';
      return;
    }

    if (!validateEmail(email)) {
      status.textContent = 'Please enter a valid email address.';
      status.className = 'text-danger';
      return;
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form),
      });

      if (response.ok) {
        status.textContent = 'Message sent successfully!';
        status.className = 'text-success';
        form.reset();
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      status.textContent = 'There was a problem sending your message.';
      status.className = 'text-danger';
    }
  });
})();
