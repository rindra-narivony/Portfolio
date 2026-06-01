/* ─── ANIMATIONS ─── */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* ─── LIGHTBOX ─── */
function openLightbox(src, label) {
    const lb = document.getElementById('lightbox');
    const content = document.getElementById('lightbox-content');
    if (src) {
    content.innerHTML = `<img class="lightbox-img" src="${src}" alt="${label||''}">`;
    } else {
    content.innerHTML = `<div class="lightbox-placeholder"><span>${label || 'Aperçu'}</span></div>`;
    }
    lb.classList.add('open');
    document.body.style.overflow="hidden";
}
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow="";
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ─── ENVOYE MESSAGE ─── */
async function sendForm() {
    const btn = document.getElementById('submitBtn');
    const status = document.getElementById('form-status');
    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const message = document.getElementById('fmessage').value.trim();

    if (!name || !email || !message) {
      status.style.display = 'block';
      status.style.color = '#e57373';
      status.textContent = 'Veuillez remplir tous les champs.';
      return;
    }

    btn.textContent = 'Envoi en cours...';
    btn.disabled = true;

    const res = await fetch('https://formspree.io/f/VOTRE_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    status.style.display = 'block';
    if (res.ok) {
      status.style.color = '#4ADE80';
      status.textContent = 'Message envoyé ! Je vous répondrai sous 24h.';
      document.getElementById('fname').value = '';
      document.getElementById('femail').value = '';
      document.getElementById('fmessage').value = '';
      btn.textContent = 'Message envoyé ✓';
    } else {
      status.style.color = '#e57373';
      status.textContent = 'Erreur. Réessayez ou écrivez directement à narivonyrindra.contact@gmail.com';
      btn.textContent = 'Envoyer le message';
      btn.disabled = false;
    }
}