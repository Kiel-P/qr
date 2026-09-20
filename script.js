// --- SCRIPT TOGGLE TEMA (DARK/LIGHT MODE) ---
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// --- FUNGSI NOTIFIKASI TOAST KUSTOM ---
function showToast(message) {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    
    // Ganti isi pesan dan tampilkan
    toastMsg.innerHTML = message;
    toast.classList.add('toast-show');

    // Hilangkan notifikasi secara otomatis setelah 3.5 detik
    setTimeout(() => {
        toast.classList.remove('toast-show');
    }, 3500);
}

// --- FUNGSI COPY NOMOR DANA ---
function bukaDanSalin(event) {
    const noDana = "083170500002";
    
    navigator.clipboard.writeText(noDana).then(() => {
        // Panggil notifikasi kustom, BUKAN alert() standar
        showToast(`Nomor DANA <b>${noDana}</b> berhasil disalin!<br><br>Silakan Tempel di Aplikasi DANA.`);
    }).catch(err => {
        console.error('Gagal menyalin: ', err);
        showToast(`Sistem gagal menyalin nomor.<br>Silakan salin manual.`);
    });
}

// --- SCRIPT ANIMASI MENGETIK TERMINAL ---
const lines = [
    "✓ 1. Buka M-Banking/E-Wallet",
    "✓ 2. Scan QR Code di atas",
    "✓ 3. Masukkan Nominal",
    "✓ Menunggu pembayaran..."
];

const terminalBody = document.getElementById("terminal-body");

async function typeWriterLoop() {
    while (true) {
        terminalBody.innerHTML = ""; 
        
        for (let i = 0; i < lines.length; i++) {
            const lineDiv = document.createElement("div");
            lineDiv.className = "terminal-line";
            
            if (lines[i].startsWith("✓")) {
                lineDiv.innerHTML = '<span class="text-green">✓</span> ';
            }
            
            terminalBody.appendChild(lineDiv);
            
            const textToType = lines[i].replace("✓ ", "");
            
            for (let char of textToType) {
                lineDiv.innerHTML += char;
                await new Promise(r => setTimeout(r, 50)); 
            }

            if (i === lines.length - 1) {
                lineDiv.innerHTML += ' <span class="cursor-block">█</span>';
            }
            
            await new Promise(r => setTimeout(r, 300)); 
        }

        await new Promise(r => setTimeout(r, 3000)); 
    }
}

window.onload = typeWriterLoop;
