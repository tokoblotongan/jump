const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// --- 1. KONFIGURASI KARAKTER (BIMBIM) ---
const player = {
    x: 100,
    y: 300,
    width: 30,
    height: 50,
    color: "#ff0000",
    speed: 4,
    velocityX: 0,
    velocityY: 0,
    jumping: false,
    grounded: false
};

// --- 2. KONFIGURASI MUSUH (ULAR KECIL) ---
const enemy = {
    x: 700,          // Muncul di ujung kanan layar
    y: 320,          // Di atas tanah (groundY - enemy.height)
    width: 30,       // Lebar kotak ular
    height: 30,      // Tinggi kotak ular
    color: "#8B4513",// Warna Cokelat (Representasi ular)
    speed: 1.5,      // Kecepatan berjalan otomatis ke kiri
    alive: true      // Status hidup ular
};

// --- 3. KONFIGURASI DUNIA GAME ---
const gravity = 0.5;
const friction = 0.8;
const groundY = 350;

// --- 4. LOGIKA INPUT KEYBOARD ---
const keys = {};

window.addEventListener('keydown', function(e) {
    keys[e.code] = true;
});

window.addEventListener('keyup', function(e) {
    keys[e.code] = false;
});

// --- FUNGSI RESET GAME (Jika Bimbim Kalah) ---
function resetGame() {
    // Kembalikan posisi Bimbim ke awal
    player.x = 100;
    player.y = 300;
    player.velocityX = 0;
    player.velocityY = 0;
    
    // Hidupkan kembali ular di posisi awal
    enemy.x = 700;
    enemy.alive = true;
}

// --- 5. FUNGSI UPDATE LOGIKA GAME ---
function update() {
    // Pergerakan Bimbim (Kiri / Kanan / Lompat)
    if (keys['ArrowLeft'] || keys['KeyA']) {
        if (player.velocityX > -player.speed) player.velocityX--;
    }
    if (keys['ArrowRight'] || keys['KeyD']) {
        if (player.velocityX < player.speed) player.velocityX++;
    }
    if ((keys['Space'] || keys['ArrowUp'] || keys['KeyW']) && !player.jumping && player.grounded) {
        player.jumping = true;
        player.grounded = false;
        player.velocityY = -10;
    }

    // Fisika Bimbim
    player.velocityX *= friction;
    player.velocityY += gravity;
    player.x += player.velocityX;
    player.y += player.velocityY;

    // Pembatas Layar untuk Bimbim
    if (player.x < 0) player.x = 0;
    if (player.x > canvas.width - player.width) player.x = canvas.width - player.width;

    // Deteksi Bimbim Menyentuh Tanah
    if (player.y >= groundY - player.height) {
        player.y = groundY - player.height;
        player.velocityY = 0;
        player.jumping = false;
        player.grounded = true;
    }

    // --- LOGIKA PERGERAKAN & TABRAKAN ULAR ---
    if (enemy.alive) {
        // Ular berjalan otomatis ke kiri
        enemy.x -= enemy.speed;

        // Jika ular keluar dari batas kiri layar, munculkan lagi dari kanan (patroli)
        if (enemy.x < -enemy.width) {
            enemy.x = canvas.width + 50;
        }

        // DETEKSI TABRAKAN (AABB Collision)
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            // Cek apakah kaki Bimbim berada di atas kepala ular (melompat menjatuhkan lawan)
            // player.velocityY > 0 artinya Bimbim sedang dalam posisi jatuh ke bawah
            if (player.y + player.height - player.velocityY <= enemy.y + 10 && player.velocityY > 0) {
                enemy.alive = false;     // Ular kalah
                player.velocityY = -6;   // Bimbim otomatis memantul sedikit ke atas setelah menginjak
            } else {
                // Jika tabrakan dari samping/bawah, Bimbim yang kalah
                resetGame();
            }
        }
    }
}

// --- 6. FUNGSI MENGGAMBAR (RENDER) ---
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gambar Tanah
    ctx.fillStyle = "#73bf43"; 
    ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

    // Gambar Ular (Jika Masih Hidup)
    if (enemy.alive) {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }

    // Gambar Bimbim
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Topi Bimbim (Kotak Putih Kecil)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(player.x + 5, player.y + 5, player.width - 10, 10);
}

// --- 7. GAME LOOP UTAMA ---
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
