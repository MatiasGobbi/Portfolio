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
