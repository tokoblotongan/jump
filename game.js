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
    grounded: false,
    isDead: false,       // --- BARU: Status Bimbim kalah ---
    deathTimer: 0        // --- BARU: Waktu tunggu sebelum reset game ---
};

// --- 2. KONFIGURASI MUSUH (ULAR KECIL) ---
const enemy = {
    x: 700,
    y: 320,
    width: 30,
    height: 30,
    color: "#8B4513",
    speed: 1.5,
    velocityX: 0,        // --- BARU: Kecepatan X saat terpental ---
    velocityY: 0,        // --- BARU: Kecepatan Y saat terpental ---
    alive: true,         // Menandakan ular masih hidup & berpatroli
    isDefeated: false    // --- BARU: Menandakan ular sedang animasi terpental jatuh ---
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

// --- FUNGSI RESET GAME ---
function resetGame() {
    player.x = 100;
    player.y = 300;
    player.velocityX = 0;
    player.velocityY = 0;
    player.isDead = false;
    player.deathTimer = 0;
    
    enemy.x = 700;
    enemy.y = 320;
    enemy.velocityX = 0;
    enemy.velocityY = 0;
    enemy.alive = true;
    enemy.isDefeated = false;
}

// --- 5. FUNGSI UPDATE LOGIKA GAME ---
function update() {
    
    // --- KONDISI A: JIKA BIMBIM KALAH (TERPENTAL KE ATAS) ---
    if (player.isDead) {
        player.velocityY += 0.3; // Gravitasi lebih lambat saat melayang kalah
        player.y += player.velocityY;
        
        player.deathTimer++;
        // Tunggu sekitar 2 detik (120 frame) sebelum game di-reset otomatis
        if (player.deathTimer > 120) {
            resetGame();
        }
        
        // Update animasi ular terpental juga jika ada saat bimbim mati
        if (enemy.isDefeated) {
            enemy.velocityY += gravity;
            enemy.x += enemy.velocityX;
            enemy.y += enemy.velocityY;
        }
        return; // Lewati semua kontrol kodingan di bawah jika Bimbim mati
    }

    // Pergerakan Normal Bimbim (Hanya aktif jika tidak mati)
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

    // Fisika Dasar Bimbim
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

    // --- LOGIKA PERGERAKAN & FISIKA ULAR ---
    if (enemy.alive) {
        // Ular berjalan normal ke kiri
        enemy.x -= enemy.speed;

        if (enemy.x < -enemy.width) {
            enemy.x = canvas.width + 50;
        }

        // DETEKSI TABRAKAN
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            // JIKA BIMBIM BERHASIL MENGINJAK ULAR
            if (player.y + player.height - player.velocityY <= enemy.y + 10 && player.velocityY > 0) {
                enemy.alive = false;
                enemy.isDefeated = true; 
                enemy.velocityY = -5;       // --- BARU: Ular memantul ke atas sedikit sebelum jatuh ---
                enemy.velocityX = player.velocityX * 0.5; // --- BARU: Ular terdorong ke arah lari Bimbim ---
                
                player.velocityY = -6;     // Bimbim memantul ke atas
            } else {
                // JIKA BIMBIM KALAH (TERKENA DARI SAMPING)
                player.isDead = true;
                player.velocityY = -8;     // --- BARU: Bimbim melayang terpental ke atas ---
                player.velocityX = 0;
            }
        }
    } 
    // --- BARU: JIKA ULAR SUDAH KALAH (ANIMASI JATUH MENEMBUS TANAH) ---
    else if (enemy.isDefeated) {
        enemy.velocityY += gravity; // Terkena gravitasi dunia
        enemy.x += enemy.velocityX;
        enemy.y += enemy.velocityY;

        // Jika ular sudah jatuh keluar dari bawah layar, hentikan kalkulasi
        if (enemy.y > canvas.height) {
            enemy.isDefeated = false;
        }
    }
}

// --- 6. FUNGSI MENGGAMBAR (RENDER) ---
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gambar Tanah
    ctx.fillStyle = "#73bf43"; 
    ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

    // Gambar Ular (Digambar jika hidup ATAU sedang dalam proses terpental jatuh)
    if (enemy.alive || enemy.isDefeated) {
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
