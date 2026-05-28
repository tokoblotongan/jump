const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// --- 1. KONFIGURASI KARAKTER (BIMBIM) ---
const player = {
    x: 100,          // Posisi awal horizontal
    y: 300,          // Posisi awal vertikal (di atas tanah)
    width: 30,       // Lebar karakter
    height: 50,      // Tinggi karakter
    color: "#ff0000",// Warna merah (Representasi baju/topi Bimbim)
    speed: 4,        // Kecepatan lari
    velocityX: 0,    // Kecepatan gerak horizontal aktif
    velocityY: 0,    // Kecepatan gerak vertikal aktif (untuk lompat)
    jumping: false,  // Status apakah sedang melompat
    grounded: false  // Status apakah sedang menyentuh tanah
};

// --- 2. KONFIGURASI DUNIA GAME ---
const gravity = 0.5;   // Kekuatan gravitasi menarik karakter ke bawah
const friction = 0.8;  // Efek gesekan agar pergerakan berhenti secara halus

// Batas tanah (Ground)
const groundY = 350;

// --- 3. LOGIKA INPUT KEYBOARD ---
const keys = {};

window.addEventListener('keydown', function(e) {
    keys[e.code] = true;
});

window.addEventListener('keyup', function(e) {
    keys[e.code] = false;
});

// --- 4. FUNGSI UPDATE LOGIKA GAME ---
function update() {
    // Jalur input Kiri (ArrowLeft atau KeyA)
    if (keys['ArrowLeft'] || keys['KeyA']) {
        if (player.velocityX > -player.speed) {
            player.velocityX--;
        }
    }
    // Jalur input Kanan (ArrowRight || KeyD)
    if (keys['ArrowRight'] || keys['KeyD']) {
        if (player.velocityX < player.speed) {
            player.velocityX++;
        }
    }
    // Jalur input Lompat (Space atau ArrowUp)
    if ((keys['Space'] || keys['ArrowUp'] || keys['KeyW']) && !player.jumping && player.grounded) {
        player.jumping = true;
        player.grounded = false;
        player.velocityY = -10; // Kekuatan lompatan ke atas (makin minus, makin tinggi)
    }

    // Terapkan gesekan (friction) dan gravitasi
    player.velocityX *= friction;
    player.velocityY += gravity;

    // Perbarui posisi karakter berdasarkan kecepatan
    player.x += player.velocityX;
    player.y += player.velocityY;

    // Kunci karakter agar tidak keluar dari batas kiri/kanan layar
    if (player.x < 0) player.x = 0;
    if (player.x > canvas.width - player.width) player.x = canvas.width - player.width;

    // Deteksi Tabrakan dengan Tanah
    if (player.y >= groundY - player.height) {
        player.y = groundY - player.height; // Kunci kaki karakter di atas tanah
        player.velocityY = 0;
        player.jumping = false;
        player.grounded = true;
    }
}

// --- 5. FUNGSI MENGGAMBAR (RENDER) ---
function draw() {
    // Bersihkan layar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gambar Tanah (Ground)
    ctx.fillStyle = "#73bf43"; 
    ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

    // Gambar Karakter Bimbim (Kotak Merah)
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Opsional: Gambar kotak kecil putih di atasnya sebagai penanda "Topi" Bimbim
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(player.x + 5, player.y + 5, player.width - 10, 10);
}

// --- 6. GAME LOOP UTAMA ---
function gameLoop() {
    update(); // Hitung matematika pergerakannya
    draw();   // Gambar hasilnya ke layar
    requestAnimationFrame(gameLoop);
}

// Jalankan game
gameLoop();
