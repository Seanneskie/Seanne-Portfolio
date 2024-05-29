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
    const timelineContainer = document.getElementById('timeline-container');
    
    // Horizontal scroll with mouse wheel
    timelineContainer.addEventListener('wheel', function(event) {
        if (event.deltaY > 0) {
            timelineContainer.scrollLeft += 100;
        } else {
            timelineContainer.scrollLeft -= 100;
        }
    });

    // Drag to scroll functionality
    let isDown = false;
    let startX;
    let scrollLeft;

    timelineContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        timelineContainer.classList.add('active');
        startX = e.pageX - timelineContainer.offsetLeft;
        scrollLeft = timelineContainer.scrollLeft;
    });

    timelineContainer.addEventListener('mouseleave', () => {
        isDown = false;
        timelineContainer.classList.remove('active');
    });

    timelineContainer.addEventListener('mouseup', () => {
        isDown = false;
        timelineContainer.classList.remove('active');
    });

    timelineContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - timelineContainer.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fast
        timelineContainer.scrollLeft = scrollLeft - walk;
    });
});
