document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.progress-item').forEach(function(item) {
    const bar = item.querySelector('progress');
    const text = item.querySelector('.progress-text');
    if (!bar || !text) return;
    if (text.textContent.trim().endsWith('%')) {
      const percent = Math.round((bar.value / bar.max) * 100);
      text.textContent = percent + '%';
    } else {
      text.textContent = bar.value + '/' + bar.max;
    }
  });
});
