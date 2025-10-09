// ==============================
// QORI — The Sparkle of the Andes
// Interacciones modernas
// ==============================

document.addEventListener('DOMContentLoaded', () => {

  /* ====== NAVBAR SCROLL EFFECT ====== */
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  /* ====== MOBILE MENU ====== */
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      navList.style.display = expanded ? 'none' : 'flex';
      navList.style.flexDirection = 'column';
    });
  }

  /* ====== SMOOTH SCROLL ====== */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const targetId = a.getAttribute('href');
      if (targetId.length > 1) {
        e.preventDefault();
        document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
        if (window.innerWidth < 900) {
          navList.style.display = 'none';
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  /* ====== FADE-IN ANIMATIONS ====== */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.section, .card, .video-text').forEach(el => observer.observe(el));

  /* ====== PRODUCT MODAL ====== */
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
      modalImg.src = card.querySelector('img').src;
      modalTitle.textContent = card.querySelector('h3').textContent;
      modalDesc.textContent = card.querySelector('.muted').textContent;
      modalPrice.textContent = `US$ ${card.dataset.price || 'Consultar'}`;
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  closeBtns.forEach(b => b.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true')));
  modal.addEventListener('click', e => { if (e.target === modal) modal.setAttribute('aria-hidden', 'true'); });

  /* ====== CONTACT FORM ====== */
  const form = document.getElementById('contactForm');
  const sendBtn = document.getElementById('sendBtn');
  const msg = document.getElementById('formMsg');

  sendBtn?.addEventListener('click', e => {
    e.preventDefault();
    const { name, email, message } = form;
    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      msg.textContent = "Por favor completa todos los campos.";
      msg.style.color = "crimson";
      return;
    }
    sendBtn.disabled = true;
    sendBtn.textContent = "Enviando...";
    setTimeout(() => {
      sendBtn.disabled = false;
      sendBtn.textContent = "Enviar";
      form.reset();
      msg.style.color = "var(--gold)";
      msg.textContent = "Mensaje enviado correctamente. ¡Gracias por contactarnos!";
    }, 1200);
  });

  /* ====== SCROLL DOWN BUTTON EFFECT ====== */
  const scrollDown = document.querySelector('.scroll-down');
  if (scrollDown) {
    scrollDown.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector('#productos')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

});
