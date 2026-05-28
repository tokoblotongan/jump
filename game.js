const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// --- 1. CONFIGURASI SISTEM KARAKTER ---
let currentCharacter = "bimbim"; // Karakter default di awal game

const player = {
    x: 100,
    y: 300,
    width: 30,
    height: 50,
    speed: 4,
    velocityX: 0,
    velocityY: 0,
    jumping: false,
    grounded: false,
    isDead: false,
    deathTimer: 0
};

// --- 2. KONFIGURASI MUSUH (ULAR KECIL) ---
const enemy = {
    x: 700,
    y: 320,
    width: 30,
    height: 30,
    color: "#8B4513",
    speed: 1.5,
    velocityX: 0,
    velocityY: 0,
    alive: true,
    isDefeated: false
};

// --- 3. KONFIGURASI DUNIA GAME ---
const gravity = 0.5;
const friction = 0.8;
const groundY = 350;

// --- 4. LOGIKA INPUT KEYBOARD ---
const keys = {};

window.addEventListener('keydown', function(e) {
    keys[e.code] = true;
    
    // --- BARU: Tombol Angka 1 atau 2 untuk Ganti Karakter (Hanya bisa jika tidak sedang mati) ---
    if (!player.isDead) {
        if (e.code === 'Digit1') {
            currentCharacter = "bimbim";
        }
        if (e.code === 'Digit2') {
            currentCharacter = "chacha";
        }
    }
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
    
    // KONDISI JIKA KARAKTER KALAH
    if (player.isDead) {
        player.velocityY += 0.3;
        player.y += player.velocityY;
        player.deathTimer++;
        if (player.deathTimer > 120) {
            resetGame();
        }
        if (enemy.isDefeated) {
            enemy.velocityY += gravity;
            enemy.x += enemy.velocityX;
            enemy.y += enemy.velocityY;
        }
        return;
    }

    // Pergerakan Normal Player
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

    // Fisika Player
    player.velocityX *= friction;
    player.velocityY += gravity;
    player.x += player.velocityX;
    player.y += player.velocityY;

    if (player.x < 0) player.x = 0;
    if (player.x > canvas.width - player.width) player.x = canvas.width - player.width;

    if (player.y >= groundY - player.height) {
        player.y = groundY - player.height;
        player.velocityY = 0;
        player.jumping = false;
        player.grounded = true;
    }

    // Logika Ular
    if (enemy.alive) {
        enemy.x -= enemy.speed;
        if (enemy.x < -enemy.width) {
            enemy.x = canvas.width + 50;
        }

        // Deteksi Tabrakan
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            if (player.y + player.height - player.velocityY <= enemy.y + 10 && player.velocityY > 0) {
                enemy.alive = false;
                enemy.isDefeated = true; 
                enemy.velocityY = -5;
                enemy.velocityX = player.velocityX * 0.5;
                player.velocityY = -6;
            } else {
                player.isDead = true;
                player.velocityY = -8;
                player.velocityX = 0;
            }
        }
    } 
    else if (enemy.isDefeated) {
        enemy.velocityY += gravity;
        enemy.x += enemy.velocityX;
        enemy.y += enemy.velocityY;
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

    // Gambar Ular
    if (enemy.alive || enemy.isDefeated) {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }

    // --- BARU: LOGIKA GAMBAR BERDASARKAN KARAKTER YANG DIPILIH ---
    if (currentCharacter === "bimbim") {
        // Gambar Bimbim (Badan Merah)
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(player.x, player.y, player.width, player.height);
        
        // Topi Putih Bimbim
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(player.x + 5, player.y + 5, player.width - 10, 10);
    } else if (currentCharacter === "chacha") {
        // Gambar Chacha (Badan Merah Muda/Pink)
        ctx.fillStyle = "#ffb6c1";
        ctx.fillRect(player.x, player.y, player.width, player.height);
        
        // Rok Merah Chacha (Kotak merah di bagian bawah badan)
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(player.x, player.y + 35, player.width, 15);
        
        // Rambut Hitam Bob Chacha (Kotak hitam di bagian atas kepala)
        ctx.fillStyle = "#000000";
        ctx.fillRect(player.x - 2, player.y, player.width + 4, 12);
    }

    // Teks Petunjuk di Layar
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.fillText("Karakter Aktif: " + currentCharacter.toUpperCase(), 20, 30);
    ctx.fillText("Tekan [1] untuk Bimbim | Tekan [2] untuk Chacha", 20, 50);
}

// --- 7. GAME LOOP UTAMA ---
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
