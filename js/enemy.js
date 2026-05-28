// --- 1. MEMUAT 3 FILE GAMBAR GERAKAN ULAR ---
const enemySprites = {
    A: new Image(),
    B: new Image(),
    C: new Image()
};

enemySprites.A.src = 'assets/snakeA.png'; // Gerakan 1
enemySprites.B.src = 'assets/snakeB.png'; // Gerakan 2
enemySprites.C.src = 'assets/snakeC.png'; // Gerakan 3

// Memastikan semua gambar ular selesai dimuat oleh browser
let enemySpritesLoaded = false;
let enemyLoadedCount = 0;
function enemySpriteLoaded() {
    enemyLoadedCount++;
    if (enemyLoadedCount === 3) {
        enemySpritesLoaded = true;
        console.log("Semua 3 animasi ular berhasil dimuat!");
    }
}
enemySprites.A.onload = enemySpriteLoaded;
enemySprites.B.onload = enemySpriteLoaded;
enemySprites.C.onload = enemySpriteLoaded;

// --- 2. DATA UTAMA MUSUH (ULAR) ---
const enemy = {
    x: 700,
    y: 320,             // Berdiri pas di atas tanah (groundY - enemy.height)
    width: 40,          // Lebar standar ular di game (bisa disesuaikan nanti)
    height: 30,         // Tinggi standar ular di game (bisa disesuaikan nanti)
    speed: 2,
    velocityX: 0,
    velocityY: 0,
    alive: true,
    isDefeated: false,

    // Variabel pengendali pergantian gambar animasi ular
    currentPose: "A",
    animationTimer: 0
};

// --- 3. FUNGSI MENGGAMBAR & MENGANIMASIKAN ULAR ---
function drawEnemy(ctx) {
    if (enemy.alive) {
        if (enemySpritesLoaded) {
            
            // ============================================================
            // LOGIKA OTOMATIS BERGANTI GERAKAN (A -> B -> C -> A)
            // ============================================================
            enemy.animationTimer++;
            if (enemy.animationTimer > 12) { // Kecepatan merayap ular (makin kecil makin cepat)
                if (enemy.currentPose === "A") {
                    enemy.currentPose = "B";
                } else if (enemy.currentPose === "B") {
                    enemy.currentPose = "C";
                } else {
                    enemy.currentPose = "A";
                }
                enemy.animationTimer = 0;
            }
            // ============================================================

            // Ambil gambar ular yang sedang aktif berdasarkan timer
            let activeEnemyImage = enemySprites[enemy.currentPose];
            
            // Gambar ular menghadap ke kiri (karena musuh berjalan dari kanan ke kiri)
            ctx.drawImage(activeEnemyImage, enemy.x, enemy.y, enemy.width, enemy.height);

        } else {
            // Kotak cokelat cadangan jika gambar internet masih loading
            ctx.fillStyle = "#8B4513";
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        }
    } 
    else if (enemy.isDefeated) {
        // Jika ular kalah/terinjak, gambar pose terakhir dengan efek terbalik (jatuh ke bawah layar)
        let activeEnemyImage = enemySprites[enemy.currentPose];
        ctx.save();
        ctx.translate(enemy.x, enemy.y + enemy.height);
        ctx.scale(1, -1); // Membalik gambar ke bawah saat kalah
        ctx.drawImage(activeEnemyImage, 0, 0, enemy.width, enemy.height);
        ctx.restore();
    }
}
