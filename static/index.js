document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('.nav-link');

    for (const link of links) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 70, // Adjust 70 for navbar height
                behavior: 'smooth'
            });
        });
    }

    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const certificates = document.querySelectorAll('.certificate');
    const showMoreBtn = document.getElementById('show-more-btn');
    const extraCertificates = document.querySelectorAll('.extra-certificate');

    if (certificates.length > 5) {
        showMoreBtn.classList.add('show');
    }

    showMoreBtn.addEventListener('click', function() {
        extraCertificates.forEach(cert => {
            cert.style.display = 'block';
        });
        // Remove max-height to ensure all certificates are visible
        document.getElementById('certificates-container').style.maxHeight = 'none';
        showMoreBtn.style.display = 'none';
    });
});