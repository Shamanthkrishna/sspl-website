document.addEventListener('DOMContentLoaded', () => {

  /* Mobile menu */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* Active nav link */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ── Gallery season filter ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => {
          b.classList.remove('btn-yellow');
          b.classList.add('btn-outline');
        });
        btn.classList.remove('btn-outline');
        btn.classList.add('btn-yellow');

        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-season') === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* Gallery lightbox — only visible items */
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  let visibleItems  = [];
  let current       = 0;

  const refreshVisible = () => {
    visibleItems = [...document.querySelectorAll('.gallery-item')]
      .filter(el => el.style.display !== 'none');
  };

  if (lightbox) {
    refreshVisible();

    document.querySelectorAll('.gallery-item').forEach(el => {
      el.addEventListener('click', () => {
        refreshVisible();
        current = visibleItems.indexOf(el);
        if (current === -1) return;
        lightboxImg.src = el.querySelector('img').src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const close = () => { lightbox.classList.remove('open'); document.body.style.overflow = ''; };
    const prev  = () => { current = (current - 1 + visibleItems.length) % visibleItems.length; lightboxImg.src = visibleItems[current].querySelector('img').src; };
    const next  = () => { current = (current + 1) % visibleItems.length; lightboxImg.src = visibleItems[current].querySelector('img').src; };

    document.querySelector('.lightbox-close')?.addEventListener('click', close);
    document.querySelector('.lightbox-prev')?.addEventListener('click', prev);
    document.querySelector('.lightbox-next')?.addEventListener('click', next);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    });
  }

  /* Contact form */
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…'; btn.disabled = true;
      setTimeout(() => {
        form.reset(); btn.textContent = 'Send Message 🏏'; btn.disabled = false;
        if (success) { success.classList.add('show'); setTimeout(() => success.classList.remove('show'), 4000); }
      }, 1400);
    });
  }

const activityImages = [
"images/sspl2025/IMG_6920.jpg",
"images/sspl2025/IMG_6958.jpg",
"images/sspl2025/IMG_6972.jpg",
"images/sspl2025/IMG_6978.jpg",
"images/sspl2025/IMG_7041.jpg",
"images/sspl2025/IMG_7093.jpg",
"images/sspl2025/IMG_7095.jpg",
"images/sspl2025/IMG_7129.jpg",
"images/sspl2025/IMG_7138.jpg",
"images/sspl2025/IMG_7205.jpg",
"images/sspl2025/IMG_7213.jpg",
"images/sspl2025/IMG_7344.jpg",
"images/sspl2025/IMG_7861.jpg",
"images/sspl2025/IMG_7949.jpg",
"images/sspl2025/IMG_8629.jpg",
"images/sspl2025/IMG_8765.jpg",
"images/sspl2025/IMG_8926.jpg",
"images/sspl2025/IMG_8998.jpg",
"images/sspl2025/IMG_9081.jpg"
];

const grid = document.getElementById("activities-grid");

if (grid) {

  // Shuffle images so homepage looks dynamic
  const shuffled = activityImages.sort(() => 0.5 - Math.random());

  // Show only first 6 images on homepage
  shuffled.slice(0,6).forEach(src => {

    const img = document.createElement("img");
    img.src = src;
    img.alt = "SSPL Match Photo";
    img.loading = "lazy";

    grid.appendChild(img);

  });

}
});
