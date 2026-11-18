
// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}


// ==========================================
// PROJECT CATEGORY FILTERS
// ==========================================

const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-card');

filters.forEach(button => {
  button.addEventListener('click', () => {

    filters.forEach(item => item.classList.remove('active'));
    button.classList.add('active');

    const selected = button.dataset.filter;

    projects.forEach((project, index) => {
      const shouldShow =
        selected === 'all' ||
        project.dataset.category === selected;

      project.classList.toggle('hidden', !shouldShow);

      if (shouldShow) {
        project.classList.remove('filter-animate');

        // Restart animation
        void project.offsetWidth;

        project.classList.add('filter-animate');
        project.style.animationDelay = `${index * 0.07}s`;
      }
    });
  });
});


// ==========================================
// PROJECT DETAIL MODAL
// ==========================================

const modal = document.querySelector('#project-modal');

const closeModal = () => {
  if (!modal) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

document.querySelectorAll('.project-card').forEach(card => {

  const openButton = card.querySelector('.project-open');

  if (!openButton) return;

  openButton.addEventListener('click', () => {

    if (!modal) return;

    document.querySelector('#modal-title').textContent =
      card.dataset.title || 'Untitled Project';

    document.querySelector('#modal-type').textContent =
      card.dataset.type || '';

    document.querySelector('#modal-year').textContent =
      card.dataset.year || '';

    document.querySelector('#modal-description').textContent =
      card.dataset.description || '';

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden';

    document.querySelector('.modal-close')?.focus();

    openButton.setAttribute('aria-expanded', 'true');
  });

});

document.querySelector('.modal-close')?.addEventListener('click', closeModal);

document.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal?.classList.contains('open')) {
    closeModal();
  }
});


// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {

  entries.forEach((entry, index) => {

    if (entry.isIntersecting) {

      entry.target.style.transitionDelay = `${index * 0.08}s`;

      entry.target.classList.add('visible');

      revealObserver.unobserve(entry.target);
    }

  });

}, {
  threshold: 0.12
});

revealElements.forEach(element => {
  revealObserver.observe(element);
});


// ==========================================
// PROJECT CARD 3D TILT EFFECT
// ==========================================

const projectCards = document.querySelectorAll('.project-card');

const finePointer = window.matchMedia('(pointer:fine)').matches;

if (finePointer) {

  projectCards.forEach(card => {

    card.addEventListener('pointermove', event => {

      if (card.classList.contains('hidden')) return;

      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });

  });

}


// ==========================================
// CURSOR GLOW EFFECT
// ==========================================

const glow = document.querySelector('.cursor-glow');

if (glow && finePointer) {

  window.addEventListener('pointermove', event => {

    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;

  });

} else if (glow) {

  glow.style.display = 'none';

}


// ==========================================
// MAGNETIC BUTTON EFFECT
// ==========================================

const magneticButtons = document.querySelectorAll('.round-link');

if (finePointer) {

  magneticButtons.forEach(button => {

    button.addEventListener('pointermove', event => {

      const rect = button.getBoundingClientRect();

      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      button.style.transform =
        `translate(${x * 0.12}px, ${y * 0.12}px)`;

    });

    button.addEventListener('pointerleave', () => {

      button.style.transform = '';

    });

  });

}


// ==========================================
// FOOTER YEAR
// ==========================================

const yearElement = document.querySelector('#year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
