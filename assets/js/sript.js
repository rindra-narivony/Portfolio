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
