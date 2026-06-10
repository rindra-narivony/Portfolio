// ── CONFIG ──
const EJS_KEY          = "IZ0IDaTnR4wytTu8j";
const EJS_SERVICE      = "service_tz474gt";
const EJS_TPL_VISIT    = "template_z6ef79g";
const EJS_TPL_CONTACT  = "template_z6ef79g";
const EJS_TPL_CONFIRM  = "template_ufr4hk3";

emailjs.init(EJS_KEY);

// ── 1. NOTIFICATION DE VISITE ──

window.addEventListener("load", async () => {
    if (sessionStorage.getItem("notified")) return;
    const now = new Date();

    // Récupère la localisation
    let location = "Inconnue";
    try {
        const geo = await fetch("https://ipapi.co/json/");
        const data = await geo.json();
        location = `${data.city}, ${data.region}, ${data.country_name}`;
    } catch(e) { location = "Inconnue"; }

    try {
        await emailjs.send(EJS_SERVICE, EJS_TPL_VISIT, {
            visit_date : now.toLocaleDateString("fr-FR", { weekday:"long", year:"numeric", month:"long", day:"numeric" }),
            visit_time : now.toLocaleTimeString("fr-FR"),
            page_url   : window.location.href,
            location   : location,       // ← nouveau
        });
        sessionStorage.setItem("notified", "1");
    } catch(e) { console.warn("Visite non notifiée", e); }
});

// ── 2. FORMULAIRE DE CONTACT ──
async function sendForm() {
    const btn    = document.getElementById("submitBtn");
    const status = document.getElementById("form-status");
    const name   = document.getElementById("fname").value.trim();
    const email  = document.getElementById("femail").value.trim();
    const message= document.getElementById("fmessage").value.trim();

    if (!name || !email || !message) {
        status.style.display = "block";
        status.style.background = "#e57373";
        status.textContent = "Veuillez remplir tous les champs.";
        return;
    }

    btn.textContent = "Envoi en cours...";
    btn.disabled = true;

    try {
        // Email à vous
        await emailjs.send(EJS_SERVICE, EJS_TPL_CONTACT, {
        from_name  : name,
        from_email : email,
        message    : message,
        });

        // Email de confirmation au visiteur
        await emailjs.send(EJS_SERVICE, EJS_TPL_CONFIRM, {
        from_name  : name,
        from_email : email,
        to_email   : email,
        });

        status.style.display = "block";
        status.style.background = "#4ADE80";
        status.textContent = "Message envoyé ! Je vous répondrai sous 24h.";
        document.getElementById("fname").value = "";
        document.getElementById("femail").value = "";
        document.getElementById("fmessage").value = "";
        btn.textContent = "Message envoyé ✓";

    } catch(e) {
        status.style.display = "block";
        status.style.background = "#e57373";
        status.textContent = "Erreur. Écrivez directement à narivonyrindra.contact@gmail.com";
        btn.textContent = "Envoyer le message";
        btn.disabled = false;
        console.log(e);
    }
}
