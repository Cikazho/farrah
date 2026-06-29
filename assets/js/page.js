/* ========================= */
/* COUNTDOWN TIMER */
/* ========================= */
function updateCountdown() {
    // Tanggal pernikahan: 2 Juli 2026, 08:00 WIB
    // Format ISO 8601 dengan timezone WIB (UTC+7)
    const weddingDate = new Date('2026-07-02T08:00:00+07:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Jika waktu sudah lewat
    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();


/* ========================= */
/* SAVE TO CALENDAR */
/* ========================= */
function saveToCalendar() {
    const event = {
        title: 'Pernikahan Alvio & Farah',
        // Format: YYYYMMDDTHHMMSS (WIB = UTC+7)
        date: '20260702T080000',
        endDate: '20260702T140000',
        location: 'Jakarta Selatan',
        details: 'Akad Nikah & Resepsi Pernikahan Alvio & Farah'
    };

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.date}/${event.endDate}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}`;
    window.open(url, '_blank');
    showToast('Membuka Google Calendar...');
}


/* ========================= */
/* COPY REKENING */
/* ========================= */
function copyRek(id) {
    const text = document.getElementById(id).textContent;
    navigator.clipboard.writeText(text).then(() => {
        showToast('Nomor rekening berhasil disalin');
    }).catch(() => {
        // Fallback untuk browser lama
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            showToast('Nomor rekening berhasil disalin');
        } catch (e) {
            showToast('Gagal menyalin nomor rekening');
        }
        document.body.removeChild(ta);
    });
}

/* ========================= */
/* TOAST NOTIFICATION */
/* ========================= */
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}



/* ========================= */
/* SCROLL ANIMATION (FADE-IN) */
/* ========================= */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});


// Tambahkan animasi fadeIn/fadeOut
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
`;
document.head.appendChild(style);
