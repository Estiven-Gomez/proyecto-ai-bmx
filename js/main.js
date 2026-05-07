/**
 * ================================================================
 * MAIN.JS — Punto de entrada BMX
 * ================================================================
 */

// ── SMOOTH SCROLL PARA ANCLAS ──────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').slice(1);
    const target   = document.getElementById(targetId);

    if (target) {
      const navHeight = document.getElementById('navbar')?.offsetHeight || 80;
      const top       = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── LAZY LOADING DE IMÁGENES ───────────────────────────────────
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imgObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imgObserver.observe(img));
}

// ── PERFORMANCE: Preconnect para fuentes externas ──────────────
// (Manejado en el <head> del HTML)

// ── LOGGING DE VERSIÓN (desarrollo) ───────────────────────────
console.info('%cBMX Freestyle v1.0.0', 'color:#10b981;font-weight:700;font-size:1.2rem');
console.info('%cCreado por Cesar Estiven Gomez Hernandez', 'color:#3b82f6;font-size:.9rem');
