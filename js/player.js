let currentCharacter = "bimbim";

// --- 1. MEMUAT 4 FILE GAMBAR GERAKAN BIMBIM ---
const bimbimSprites = {
    A: new Image(),
    B: new Image(),
    C: new Image(),
    D: new Image()
};

bimbimSprites.A.src = 'assets/bimbimA.png'; // Pose Diam
bimbimSprites.B.src = 'assets/bimbimB.png'; // Jalan 1
bimbimSprites.C.src = 'assets/bimbimC.png'; // Jalan 2
bimbimSprites.D.src = 'assets/bimbimD.png'; // Melompat

// Memastikan semua gambar selesai dimuat oleh browser
let spritesLoaded = false;
let loadedCount = 0;
function spriteLoaded() {
    loadedCount++;
    if (loadedCount === 4) {
        spritesLoaded = true;
        console.log("Semua 4 animasi Bimbim berhasil dimuat!");
    }
}
bimbimSprites.A.onload = spriteLoaded;
bimbimSprites.B.onload = spriteLoaded;
bimbimSprites.C.onload = spriteLoaded;
bimbimSprites.D.onload = spriteLoaded;

// --- 2. DATA UTAMA KARAKTER ---
const player = {
    x: 100,
    y: 250,             // Berdiri pas di atas tanah
    width: 60,          // Lebar skala besar
    height: 100,        // Tinggi skala besar
    speed: 4,
    velocityX: 0,
    velocityY: 0,
    jumping: false,
    grounded: false,
    isDead: false,
    deathTimer: 0,

    // Variabel pengendali pergantian gambar
    currentPose: "A",
    animationTimer: 0,
    facing: "right"
};

// --- 3. FUNGSI MENGGAMBAR & MENGANIMASIKAN GERAKAN ---
function drawPlayer(ctx) {
    // Menentukan arah hadap
    if (player.velocityX > 0.1) player.facing = "right";
    if (player.velocityX < -0.1) player.facing = "left";

    if (currentCharacter === "bimbim") {
        if (spritesLoaded) {
            
            // ============================================================
            // LOGIKA PERGANTIAN GAMBAR SECARA OTOMATIS
            // ============================================================
            if (!player.grounded) {
                // JIKA MELOMPAT: Gunakan file bimbimD.png
                player.currentPose = "D";
            } else if (Math.abs(player.velocityX) > 0.2) {
                // JIKA BERJALAN: Bergantian antara bimbimB.png dan bimbimC.png
                player.animationTimer++;
                if (player.animationTimer > 10) { // Kecepatan ganti kaki (makin kecil makin cepat)
                    player.currentPose = (player.currentPose === "B") ? "C" : "B";
                    player.animationTimer = 0;
                }
            } else {
                // JIKA DIAM: Kembali ke bimbimA.png
                player.currentPose = "A";
            }
            // ============================================================

            // Ambil gambar yang sedang aktif berdasarkan logika di atas
            let activeImage = bimbimSprites[player.currentPose];

            ctx.save();
            if (player.facing === "left") {
                // Membalikkan gambar secara horizontal jika berjalan ke kiri
                ctx.translate(player.x + player.width, player.y);
                ctx.scale(-1, 1);
                ctx.drawImage(activeImage, 0, 0, player.width, player.height);
            } else {
                // Normal menghadap kanan
                ctx.drawImage(activeImage, player.x, player.y, player.width, player.height);
            }
            ctx.restore();

        } else {
            // Kotak merah cadangan selama proses loading internet
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(player.x, player.y, player.width, player.height);
        }
    } else if (currentCharacter === "chacha") {
        // Kotak pink Chacha
        ctx.fillStyle = "#ffb6c1";
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }
}
