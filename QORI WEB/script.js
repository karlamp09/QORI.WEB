// script.js - interactions for QORI demo page
document.addEventListener('DOMContentLoaded', ()=>{

  // Mobile menu toggle
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  toggle && toggle.addEventListener('click', ()=>{
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    if(!expanded){
      navList.style.display = 'flex';
      navList.style.flexDirection = 'column';
    } else {
      navList.style.display = '';
    }
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav if open
        if(window.innerWidth < 900){
          document.querySelector('.nav-list').style.display = '';
          document.querySelector('.nav-toggle').setAttribute('aria-expanded','false');
        }
      }
    });
  });

  // Product modal
  const modal = document.getElementById('productModal');
  const openBtns = document.querySelectorAll('.js-open-product');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalPrice = document.getElementById('modalPrice');
  const closeBtns = document.querySelectorAll('.js-close, .modal-close');

  openBtns.forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const card = e.target.closest('.product');
      const img = card.querySelector('img').src;
      const title = card.querySelector('h3').textContent;
      const desc = card.querySelector('.muted').textContent;
      const price = card.dataset.price ? `US$ ${card.dataset.price}` : 'Consultar';
      modalImg.src = img;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalPrice.textContent = price;
      modal.setAttribute('aria-hidden','false');
    });
  });

  closeBtns.forEach(b => b.addEventListener('click', ()=> {
    modal.setAttribute('aria-hidden','true');
  }));

  // Close modal on backdrop click
  modal.addEventListener('click', (e)=>{
    if(e.target === modal) modal.setAttribute('aria-hidden','true');
  });

  // Contact form simulate send
  const form = document.getElementById('contactForm');
  const sendBtn = document.getElementById('sendBtn');
  const msg = document.getElementById('formMsg');
  sendBtn && sendBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    // Simple validation
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if(!name || !email || !message){
      msg.textContent = "Por favor completa los campos requeridos.";
      msg.style.color = 'crimson';
      return;
    }
    // Simulate sending
    sendBtn.disabled = true;
    sendBtn.textContent = 'Enviando...';
    setTimeout(()=>{
      sendBtn.disabled = false;
      sendBtn.textContent = 'Enviar mensaje';
      form.reset();
      msg.style.color = 'green';
      msg.textContent = 'Mensaje enviado. Gracias — te responderemos pronto.';
    }, 900);
  });

});
