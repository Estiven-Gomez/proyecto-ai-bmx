/**
 * ================================================================
 * ANIMATIONS MODULE
 * Animaciones de scroll y efectos de entrada
 * ================================================================
 */

// ── INTERSECTION OBSERVER PARA ANIMACIONES SCROLL ──────────────
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');

  if (!animatedElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const animType = el.dataset.animate || 'fade-up';

          el.classList.add('animated', `animated--${animType}`);
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  animatedElements.forEach(el => {
    // Establecer estado inicial invisible
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ── ESTILOS DE ANIMACIÓN INYECTADOS DINÁMICAMENTE ──────────────
function injectAnimationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .animated {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    .animated--fade-right {
      transform: translateX(0) !important;
    }
    .animated--scale-in {
      transform: scale(1) !important;
    }
    [data-animate="fade-right"] {
      transform: translateX(-30px) !important;
    }
    [data-animate="scale-in"] {
      transform: scale(0.9) !important;
    }
  `;
  document.head.appendChild(style);
}

// ── NAVBAR: EFECTO SCROLL ──────────────────────────────────────
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Estado inicial
}

// ── NAVBAR: LINK ACTIVO SEGÚN SCROLL ──────────────────────────
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(s => observer.observe(s));
}

// ── HAMBURGER MENU ─────────────────────────────────────────────
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Cerrar al hacer clic en un link
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// ── INICIALIZACIÓN ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  injectAnimationStyles();
  initScrollAnimations();
  initNavbarScroll();
  initActiveNavLinks();
  initHamburger();
});
