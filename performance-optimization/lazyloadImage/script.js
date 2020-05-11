if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", handler);
} else {
  handler();
}

function handler() {
  const lazyImages = document.querySelectorAll('img.lazy');

  let lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.remove('lazy');
        lazyImageObserver.unobserve(lazyImage);
      }
    });
  }, {
    rootMargin: '0px 0px 256px 0px'
  });

  lazyImages.forEach(lazyImage => {
    lazyImageObserver.observe(lazyImage);
  });
}