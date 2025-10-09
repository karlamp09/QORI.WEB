// QORI · The Sparkle of the Andes
// Interacciones modernas y efectos visuales premium

document.addEventListener('DOMContentLoaded', () => {

  /* ===========================
     1. Menú móvil
     =========================== */
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  toggle && toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    navList.style.display = expanded ? '' : 'flex';
  });

  /* ===========================
     2. Desplazamiento suave
     =========================== */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // cerrar menú en móviles
        if (window.innerWidth < 900) {
          navList.style.display = '';
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  /* ===========================
     3. Navbar dinámico (efecto al hacer scroll)
     =========================== */
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  /* ===========================
     4. Animaciones al hacer scroll (Scroll Reveal)
     =========================== */
  const revealElements = document.querySelectorAll('.section, .card, .hero-copy');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  revealElements.forEach(el => observer.observe(el));

  /* ===========================
     5. Burbujas dinámicas en el hero
     =========================== */
  const bubbleContainer = document.querySelector('.bubbles');
  if (bubbleContainer) {
    for (let i = 0; i < 20; i++) {
      const bubble = document.createElement('span');
      bubble.classList.add('bubble');
      bubble.style.left = Math.random() * 100 + '%';
      bubble.style.animationDelay = Math.random() * 5 + 's';
      bubble.style.width = bubble.style.height = Math.random() * 12 + 6 + 'px';
      bubbleContainer.appendChild(bubble);
    }
  }

  /* ===========================
     6. Modal de productos
     =========================== */
  const modal = document.getElementById('productModal');
  const openBtns = document.querySelectorAll('.js-open-product');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalPrice = document.getElementById('modalPrice');
  const closeBtns = document.querySelectorAll('.js-close, .modal-close');

  openBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      const card = e.target.closest('.product');
      const img = card.querySelector('img').src;
      const title = card.querySelector('h3').textContent;
      const desc = card.querySelector('.muted').textContent;
      const price = card.dataset.price ? `US$ ${card.dataset.price}` : 'Consultar';
      modalImg.src = img;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalPrice.textContent = price;
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtns.forEach(b =>
    b.addEventListener('click', () => {
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    })
  );

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });

  /* ===========================
     7. Parallax suave en el hero
     =========================== */
  const hero = document.querySelector('.hero-inner');
  window.addEventListener('scroll', () => {
    const offset = window.scrollY * 0.2;
    hero.style.transform = `translateY(${offset}px)`;
  });

  /* ===========================
     8. Formulario simulado de contacto
     =========================== */
  const form = document.getElementById('contactForm');
  const sendBtn = document.getElementById('sendBtn');
  const msg = document.getElementById('formMsg');

  sendBtn && sendBtn.addEventListener('click', e => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      msg.textContent = 'Por favor completa los campos requeridos.';
      msg.style.color = 'crimson';
      return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = 'Enviando...';
    msg.style.color = varGold = '#cfa85b';
    setTimeout(() => {
      sendBtn.disabled = false;
      sendBtn.textContent = 'Enviar mensaje';
      form.reset();
      msg.style.color = varGold;
      msg.textContent = 'Mensaje enviado con éxito. Gracias por contactarnos.';
    }, 1000);
  });
});
