// Display progress in a "current/total (percent%)" format for clarity
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.progress-item').forEach(function (item) {
    const bar = item.querySelector('progress');
    const text = item.querySelector('.progress-text');
    if (!bar || !text) return;

    // Calculate percentage based on the progress element values
    const percent = Math.round((bar.value / bar.max) * 100);

    // Always show both the raw value and percentage for readability
    text.textContent = `${bar.value}/${bar.max} (${percent}%)`;
  });
});
