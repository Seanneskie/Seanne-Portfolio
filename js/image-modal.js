document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const modalIframe = document.getElementById("modalIframe");
  const closeBtn = modal.querySelector(".close");

  document.addEventListener("click", function (e) {
    if (e.target.matches(".view-image")) {
      e.preventDefault();
      const src = e.target.getAttribute("href");
      const isPdf = src.toLowerCase().endsWith(".pdf");
      if (isPdf) {
        modalImg.style.display = "none";
        modalIframe.style.display = "block";
        modalIframe.src = src;
      } else {
        modalIframe.style.display = "none";
        modalImg.style.display = "block";
        modalImg.src = src;
      }
      modal.style.display = "block";
    }
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    modalImg.src = "";
    modalIframe.src = "";
  });

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
      modalImg.src = "";
      modalIframe.src = "";
    }
  });
});
  