if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", handler);
} else {
  handler();
}

function handler() {
  const lazyVideos = document.querySelectorAll("video.lazy");

  let lazyVideoObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let lazyVideo = entry.target;
        for (const source in lazyVideo.children) {
          let videoSource = lazyVideo.children[source];
          if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
            videoSource.src = videoSource.dataset.src;
          }
        }

        lazyVideo.load();
        lazyVideo.classList.remove('lazy');
        lazyVideoObserver.unobserve(lazyVideo);
      }
    });
  }, {
    rootMargin: '0px 0px 256px 0px'
  });

  lazyVideos.forEach(lazyVideo => {
    lazyVideoObserver.observe(lazyVideo);
  });
}