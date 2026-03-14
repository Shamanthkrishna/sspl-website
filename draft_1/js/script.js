/* ============================================================
   SPORTS TEAM WEBSITE — script.js
   Handles: navbar scroll, mobile menu, lightbox, reveal anims,
            form submission, dropdown
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky navbar on scroll ── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── Mobile hamburger menu ── */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ── Scroll-triggered reveal animations ── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));
  }

  /* ── Gallery Lightbox ── */
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const prevBtn     = document.querySelector('.lightbox-prev');
  const nextBtn     = document.querySelector('.lightbox-next');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (lightbox && galleryItems.length > 0) {
    let currentIndex = 0;

    const openLightbox = (index) => {
      currentIndex = index;
      const src = galleryItems[index].querySelector('img').src;
      lightboxImg.src = src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    const showPrev = () => {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      lightboxImg.src = galleryItems[currentIndex].querySelector('img').src;
    };

    const showNext = () => {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      lightboxImg.src = galleryItems[currentIndex].querySelector('img').src;
    };

    galleryItems.forEach((item, i) => {
      item.addEventListener('click', () => openLightbox(i));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (prevBtn)       prevBtn.addEventListener('click', showPrev);
    if (nextBtn)       nextBtn.addEventListener('click', showNext);

    // Close on backdrop click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  showPrev();
      if (e.key === 'ArrowRight') showNext();
    });
  }

  /* ── Contact form submission (frontend only) ── */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulate submission (replace with real backend / Formspree / Netlify Forms)
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        contactForm.reset();
        btn.textContent = 'Send Message';
        btn.disabled = false;
        if (formSuccess) {
          formSuccess.classList.add('show');
          setTimeout(() => formSuccess.classList.remove('show'), 4000);
        }
      }, 1500);
    });
  }

  /* ── Active nav link highlight ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (
      href === currentPage ||
      (currentPage === '' && href === 'index.html') ||
      (currentPage === 'index.html' && href === 'index.html')
    )) {
      link.classList.add('active');
    }
  });

  /* ── Ticker duplicate for seamless loop ── */
  const tickerInner = document.querySelector('.ticker-inner');
  if (tickerInner) {
    tickerInner.innerHTML += tickerInner.innerHTML;
  }

});
