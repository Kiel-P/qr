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
    
    toastMsg.innerHTML = message;
    toast.classList.add('toast-show');

    setTimeout(() => {
        toast.classList.remove('toast-show');
    }, 3500);
}

// --- FUNGSI COPY CADANGAN UNTUK BROWSER LAMA (Soul Browser, dll) ---
function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Mencegah scroll layar ke bawah saat elemen dibuat
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0"; 

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
    } catch (err) {
        document.body.removeChild(textArea);
        return false;
    }
}

// --- FUNGSI COPY UTAMA ---
function bukaDanSalin(event) {
    event.preventDefault(); 
    const noDana = "083170500002";
    const successMsg = `Nomor DANA <b>${noDana}</b> berhasil disalin!<br><br>Silakan buka dan Tempel di Aplikasi DANA.`;
    const failMsg = `Sistem gagal menyalin nomor.<br>Silakan salin manual.`;
    
    // Coba gunakan API Clipboard modern (Chrome, Safari, Firefox baru)
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(noDana).then(() => {
            showToast(successMsg);
        }).catch(err => {
            console.error('Gagal menyalin dengan Clipboard API: ', err);
            // Jika gagal, coba gunakan metode fallback
            if(fallbackCopyTextToClipboard(noDana)) {
                showToast(successMsg);
            } else {
                showToast(failMsg);
            }
        });
    } else {
        // Langsung gunakan fallback untuk browser lama atau koneksi non-HTTPS
        if(fallbackCopyTextToClipboard(noDana)) {
            showToast(successMsg);
        } else {
            showToast(failMsg);
        }
    }
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
