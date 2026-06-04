
async function sendForm() {
const btn = document.getElementById('submitBtn');
const status = document.getElementById('form-status');
const name = document.getElementById('fname').value.trim();
const email = document.getElementById('femail').value.trim();
const message = document.getElementById('fmessage').value.trim();

if (!name || !email || !message) {
    status.style.display = 'block';
    status.style.background = '#e57373';
    status.textContent = 'Veuillez remplir tous les champs.';
    return;
}

btn.textContent = 'Envoi en cours...';
btn.disabled = true;

const res = await fetch('https://formspree.io/f/xrevzbpa', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
});

status.style.display = 'block';
if (res.ok) {
    status.style.background = '#4ADE80';
    status.textContent = 'Message envoyé ! Je vous répondrai sous 24h.';
    document.getElementById('fname').value = '';
    document.getElementById('femail').value = '';
    document.getElementById('fmessage').value = '';
    btn.textContent = 'Message envoyé ✓';
} else {
    status.style.background = '#e57373';
    status.textContent = 'Erreur. Réessayez ou écrivez directement à narivonyrindra.contact@gmail.com';
    btn.textContent = 'Envoyer le message';
    btn.disabled = false;
}
}
