let currentCharacter = "bimbim";

// --- 1. PROSES PEMUATAN GAMBAR (DITARUH DI PALING ATAS SECARA GLOBAL) ---
const bimbimImg = new Image();
bimbimImg.src = 'assets/bimbim.png'; 

let bimbimLoaded = false;
bimbimImg.onload = function() {
    bimbimLoaded = true;
    console.log("Gambar Bimbim Berhasil Dimuat!"); // Penanda di inspect element browser
};

// Pastikan jika ada error saat memuat gambar, game tidak ikutan macet
bimbimImg.onerror = function() {
    console.error("Gagal memuat gambar bimbim.png. Periksa folder assets.");
};

// --- 2. DATA UTAMA KARAKTER ---
const player = {
    x: 100,
    y: 300,
    width: 30,       // Kembalikan ke ukuran 30 agar sinkron dengan game.js
    height: 50,      // Kembalikan ke ukuran 50 agar sinkron dengan game.js
    speed: 4,
    velocityX: 0,
    velocityY: 0,
    jumping: false,
    grounded: false,
    isDead: false,
    deathTimer: 0
};

// --- 3. FUNGSI MENGGAMBAR PLAYER ---
function drawPlayer(ctx) {
    if (currentCharacter === "bimbim") {
        
        // Pengecekan: Jika gambar sudah siap diunduh oleh browser, tempel gambarnya
        if (bimbimLoaded) {
            ctx.drawImage(bimbimImg, player.x, player.y, player.width, player.height);
        } else {
            // CADANGAN AMAN: Jika gambar masih loading, kotak merah ini WAJIB muncul agar game tidak blank biru
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(player.x, player.y, player.width, player.height);
            
            // Topi putih cadangan
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(player.x + 5, player.y + 5, player.width - 10, 10);
        }

    } else if (currentCharacter === "chacha") {
        // Logika visual Chacha (Kotak Pink)
        ctx.fillStyle = "#ffb6c1";
        ctx.fillRect(player.x, player.y, player.width, player.height);
        
        // Rok merah
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(player.x, player.y + 35, player.width, 15);
        
        // Rambut hitam
        ctx.fillStyle = "#000000";
        ctx.fillRect(player.x - 2, player.y, player.width + 4, 12);
    }
}
