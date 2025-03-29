document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = modal.querySelector(".close");
  
    // Attach event to all image links with class 'view-image'
    document.querySelectorAll(".view-image").forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const imgSrc = this.getAttribute("href");
        modalImg.src = imgSrc;
        modal.style.display = "block";
      });
    });
  
    // Close modal when close button clicked
    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });
  
    // Close modal when clicking outside the image
    window.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });
  