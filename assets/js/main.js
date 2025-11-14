// Resaltar el link activo al hacer scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.sidenav__link');

function onScroll() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const top = rect.top + window.scrollY - 150;
    const bottom = top + section.offsetHeight;

    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.sidenav__link[href="#${section.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll);
onScroll(); // para que marque bien al cargar

// Scroll suave para los links de navegación (sidebar + mobile)
document.querySelectorAll('.sidenav__link').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // Solo manejamos anclas tipo #sobre-mi, #skills, etc.
    if (href && href.startsWith('#')) {
      e.preventDefault();

      const target = document.querySelector(href);
      if (!target) return;

      const offcanvasEl = this.closest('.offcanvas');
      if (offcanvasEl) {
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (offcanvas) offcanvas.hide();
      }

      // Esperamos a que el offcanvas termine su circo y después scrolleamos
      setTimeout(() => {
        const offset = 80; // margen superior
        const y = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }, 300);
    }
  });
});
