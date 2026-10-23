/**
 * ATELIER AURELIA — Luxury Interior Design & Home Decor
 * Master JavaScript Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ------------------------------------------------------------------------
   * 1. Initialize AOS (Animate On Scroll)
   * ------------------------------------------------------------------------ */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 850,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
  }

  /* ------------------------------------------------------------------------
   * 2. Sticky Navbar & Scroll Events
   * ------------------------------------------------------------------------ */
  const navbar = document.querySelector('.navbar-aurelia');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Navbar style switch
    if (navbar) {
      if (scrollPos > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ------------------------------------------------------------------------
   * 3. Animated Statistics Counter (Intersection Observer)
   * ------------------------------------------------------------------------ */
  const statCounters = document.querySelectorAll('.counter-value');
  if (statCounters.length > 0) {
    const countObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetValue = parseInt(target.getAttribute('data-target'), 10);
          const duration = 2000;
          const frameDuration = 1000 / 60;
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;

          const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const current = Math.round(targetValue * (1 - Math.pow(1 - progress, 3))); // easeOutCubic

            target.textContent = current;

            if (frame === totalFrames) {
              target.textContent = targetValue;
              clearInterval(counter);
            }
          }, frameDuration);

          observer.unobserve(target);
        }
      });
    }, { threshold: 0.3 });

    statCounters.forEach(counter => countObserver.observe(counter));
  }

  /* ------------------------------------------------------------------------
   * 4. Swiper Testimonials Slider
   * ------------------------------------------------------------------------ */
  if (document.querySelector('.testimonial-swiper') && typeof Swiper !== 'undefined') {
    new Swiper('.testimonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 25,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
        }
      }
    });
  }

  if (document.querySelector('.service-swiper') && typeof Swiper !== 'undefined') {
    new Swiper('.service-swiper', {
      slidesPerView: 1,
      spaceBetween: 18,
      pagination: {
        el: '.service-carousel-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.service-carousel-next',
        prevEl: '.service-carousel-prev',
      },
      breakpoints: {
        576: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 22,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
    });
  }

  /* ------------------------------------------------------------------------
   * 5. Portfolio Filtering & Dynamic Lightbox
   * ------------------------------------------------------------------------ */
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  if (projectFilterBtns.length > 0 && projectItems.length > 0) {
    projectFilterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        projectFilterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        projectItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category.includes(filterValue)) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Project Modal Preview
  const projectCards = document.querySelectorAll('.project-card');
  const projectModalElement = document.getElementById('projectModal');
  let projectModalInstance = null;

  if (projectModalElement && typeof bootstrap !== 'undefined') {
    projectModalInstance = new bootstrap.Modal(projectModalElement);
  }

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-title');
      const category = card.getAttribute('data-category-name');
      const location = card.getAttribute('data-location');
      const imgSrc = card.querySelector('img').getAttribute('src');
      const description = card.getAttribute('data-description') || 'A custom bespoke residential design highlighting natural light, bespoke carpentry, and organic textures.';
      const scope = card.getAttribute('data-scope') || 'Full Interior Architecture, Custom Joinery, FF&E Procurement';

      if (projectModalElement) {
        document.getElementById('modalProjectImg').setAttribute('src', imgSrc);
        document.getElementById('modalProjectTitle').textContent = title;
        document.getElementById('modalProjectCategory').textContent = category;
        document.getElementById('modalProjectLocation').textContent = location;
        document.getElementById('modalProjectDesc').textContent = description;
        document.getElementById('modalProjectScope').textContent = scope;

        if (projectModalInstance) {
          projectModalInstance.show();
        }
      }
    });
  });

  /* ------------------------------------------------------------------------
   * 6. Architectural Decor Materials Modal & Filtering
   * ------------------------------------------------------------------------ */
  const decorFilterBtns = document.querySelectorAll('.decor-filter-btn');
  const decorItems = document.querySelectorAll('.decor-item');

  if (decorFilterBtns.length > 0 && decorItems.length > 0) {
    decorFilterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        decorFilterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        decorItems.forEach(item => {
          const category = item.getAttribute('data-category') || '';
          if (filterValue === 'all' || category.includes(filterValue)) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Architectural Product Modal Preview
  const productModalElement = document.getElementById('productSpecModal');
  let productModalInstance = null;

  if (productModalElement && typeof bootstrap !== 'undefined') {
    productModalInstance = new bootstrap.Modal(productModalElement);
  }

  function openProductModal(card) {
    if (!card || !productModalElement) return;

    const title = card.getAttribute('data-title') || 'Architectural Decor Material';
    const category = card.getAttribute('data-category-name') || 'Decor Material';
    const material = card.getAttribute('data-material') || 'High Density Polymer';
    const dimensions = card.getAttribute('data-dimensions') || 'Standard 8ft x 4ft / 2900mm x 160mm';
    const thickness = card.getAttribute('data-thickness') || '3mm - 24mm';
    const features = card.getAttribute('data-features') || '100% Waterproof, B1 Fire-Retardant, Anti-Termite';
    const installation = card.getAttribute('data-installation') || 'Direct Adhesive / Interlocking Tongue & Groove';
    const price = card.getAttribute('data-price') || 'Contact for Bulk & Retail Rate';
    const desc = card.getAttribute('data-description') || 'Premium commercial and residential architectural wall/ceiling finish.';
    const imgEl = card.querySelector('img');
    const imgSrc = imgEl ? imgEl.getAttribute('src') : '';

    document.getElementById('modalProductTitle').textContent = title;
    document.getElementById('modalProductCategory').textContent = category;
    document.getElementById('modalProductMaterial').textContent = material;
    document.getElementById('modalProductDimensions').textContent = dimensions;
    document.getElementById('modalProductThickness').textContent = thickness;
    document.getElementById('modalProductFeatures').textContent = features;
    document.getElementById('modalProductInstallation').textContent = installation;
    document.getElementById('modalProductPrice').textContent = price;
    document.getElementById('modalProductDesc').textContent = desc;
    document.getElementById('modalProductImg').setAttribute('src', imgSrc);

    const quoteBtn = document.getElementById('modalQuoteBtn');
    if (quoteBtn) {
      quoteBtn.setAttribute('href', `contact.html?product=${encodeURIComponent(title)}`);
    }

    if (productModalInstance) {
      productModalInstance.show();
    }
  }

  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Open modal when clicking on card or button
      openProductModal(card);
    });
  });

  // Hero Trending Pills Quick Filter triggers
  const trendingTriggers = document.querySelectorAll('.decor-filter-trigger');
  trendingTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      const targetFilter = this.getAttribute('data-filter');
      if (targetFilter) {
        const matchingBtn = document.querySelector(`.decor-filter-btn[data-filter="${targetFilter}"]`);
        if (matchingBtn) {
          matchingBtn.click();
        }
      }
    });
  });

  /* ------------------------------------------------------------------------
   * 7. Interactive Toast Notifications Helper
   * ------------------------------------------------------------------------ */
  window.showToast = function(title, message, isSuccess = true) {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container-custom';
      document.body.appendChild(container);
    }

    const toastEl = document.createElement('div');
    toastEl.className = 'toast-custom mb-3 animate__animated animate__fadeInRight';
    toastEl.innerHTML = `
      <div class="d-flex align-items-center justify-content-between mb-1">
        <strong style="color: ${isSuccess ? 'var(--color-terracotta)' : '#e74c3c'};">
          <i class="bi ${isSuccess ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2"></i>${title}
        </strong>
        <button type="button" class="btn-close btn-close-white ms-3" style="font-size: 0.7rem;" aria-label="Close"></button>
      </div>
      <p class="mb-0" style="font-size: 0.85rem; color: var(--color-beige);">${message}</p>
    `;

    container.appendChild(toastEl);

    const closeBtn = toastEl.querySelector('.btn-close');
    closeBtn.addEventListener('click', () => {
      toastEl.remove();
    });

    setTimeout(() => {
      if (toastEl.parentNode) {
        toastEl.style.opacity = '0';
        toastEl.style.transition = 'opacity 0.4s ease';
        setTimeout(() => toastEl.remove(), 400);
      }
    }, 5500);
  };

  /* ------------------------------------------------------------------------
   * 8. Consultation Booking Form Validation & Submission
   * ------------------------------------------------------------------------ */
  const consultationForm = document.getElementById('consultationForm');
  if (consultationForm) {
    consultationForm.addEventListener('submit', function(e) {
      e.preventDefault();

      if (!this.checkValidity()) {
        e.stopPropagation();
        this.classList.add('was-validated');
        showToast('Incomplete Form', 'Please complete all required fields correctly before submitting.', false);
        return;
      }

      this.classList.add('was-validated');

      const name = document.getElementById('clientName')?.value || 'Valued Client';
      const service = document.getElementById('clientService')?.value || 'Interior Consultation';

      // Provide clear feedback with transparent disclosure regarding simulated submission
      showToast(
        'Consultation Request Recorded',
        `Thank you, ${name}! Your consultation request for "${service}" has been received. (Demonstration mode: To connect to email delivery, link to an active SMTP or form endpoint).`,
        true
      );

      // Reset form nicely
      this.reset();
      this.classList.remove('was-validated');
    });
  }

  /* ------------------------------------------------------------------------
   * 9. Newsletter Form Validation & Submission
   * ------------------------------------------------------------------------ */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      if (emailInput && emailInput.value.includes('@') && emailInput.value.includes('.')) {
        showToast(
          'Welcome to Atelier Journal',
          'Thank you for subscribing to our private architectural and design editorial.',
          true
        );
        emailInput.value = '';
      } else {
        showToast('Invalid Email', 'Please provide a valid email address.', false);
      }
    });
  }

  /* ------------------------------------------------------------------------
   * 10. Close Mobile Offcanvas on Link Click
   * ------------------------------------------------------------------------ */
  const offcanvasLinks = document.querySelectorAll('.offcanvas-aurelia .nav-link');
  const offcanvasEl = document.getElementById('navbarOffcanvas');
  if (offcanvasEl && typeof bootstrap !== 'undefined') {
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl) || new bootstrap.Modal(offcanvasEl);
    offcanvasLinks.forEach(link => {
      link.addEventListener('click', () => {
        const openedCanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (openedCanvas) openedCanvas.hide();
      });
    });
  }

});
