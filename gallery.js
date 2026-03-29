document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;

  // Desktop: wheel scrolls horizontally
  window.addEventListener('wheel', (e) => {
    e.preventDefault();
    gallery.scrollLeft += e.deltaY + e.deltaX;
  }, { passive: false });

  // Desktop: click-and-drag scrolling
  let isDragging = false;
  let startX = 0;
  let scrollStart = 0;

  gallery.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    scrollStart = gallery.scrollLeft;
    gallery.classList.add('is-dragging');
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    gallery.scrollLeft = scrollStart - (e.clientX - startX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    gallery.classList.remove('is-dragging');
  });

  // Mobile: native touch scroll works automatically
});
