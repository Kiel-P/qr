// --- SCRIPT TOGGLE TEMA (DARK/LIGHT MODE) ---
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Cek preferensi tema sebelumnya (jika ada)
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Ubah ikon dan simpan preferensi ke localStorage
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// --- FUNGSI COPY NOMOR DANA ---
function bukaDanSalin(event) {
    const noDana = "083170500002";
    navigator.clipboard.writeText(noDana).then(() => {
        alert("Nomor DANA " + noDana + " berhasil disalin!\n\nSilakan 'Paste' (Tempel) di aplikasi DANA dan masukkan nominal.");
    }).catch(err => console.error('Gagal menyalin: ', err));
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
        terminalBody.innerHTML = ""; // Bersihkan isi terminal untuk looping
        
        for (let i = 0; i < lines.length; i++) {
            const lineDiv = document.createElement("div");
            lineDiv.className = "terminal-line";
            
            // Beri warna hijau pada tanda centang
            if (lines[i].startsWith("✓")) {
                lineDiv.innerHTML = '<span class="text-green">✓</span> ';
            }
            
            terminalBody.appendChild(lineDiv);
            
            const textToType = lines[i].replace("✓ ", "");
            
            // Efek ketik per karakter
            for (let char of textToType) {
                lineDiv.innerHTML += char;
                await new Promise(r => setTimeout(r, 50)); // Kecepatan ketik
            }

            // Tambahkan kursor berkedip pada baris terakhir
            if (i === lines.length - 1) {
                lineDiv.innerHTML += ' <span class="cursor">_</span>';
            }
            
            await new Promise(r => setTimeout(r, 300)); // Jeda antar baris
        }

        // Tunggu 3 detik sebelum mengulang animasi
        await new Promise(r => setTimeout(r, 3000)); 
    }
}

// Jalankan animasi saat halaman dimuat
window.onload = typeWriterLoop;
