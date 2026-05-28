let currentCharacter = "bimbim";

// --- 1. PROSES MEMUAT GAMBAR BIMBIM ---
const bimbimImg = new Image();
bimbimImg.src = 'assets/bimbim.png'; 

let bimbimLoaded = false;
bimbimImg.onload = function() {
    bimbimLoaded = true;
    console.log("Gambar Bimbim berhasil dimuat dengan ukuran penuh.");
};

// --- 2. DATA UTAMA KARAKTER (SKALA 2X LIPAT & PRESISI) ---
const player = {
    x: 100,
    y: 250,             // Posisi pas di atas tanah (350 - 100)
    width: 60,          // Ukuran lebar di game (Skala 2x lipat)
    height: 100,        // Ukuran tinggi di game (Skala 2x lipat)
    speed: 4,
    velocityX: 0,
    velocityY: 0,
    jumping: false,
    grounded: false,
    isDead: false,
    deathTimer: 0,

    // --- VARIABEL UNTUK KEBUTUHAN GEOMETRI GAMBAR ---
    frameX: 0,          
    frameY: 0,          
    spriteWidth: 956,   // Lebar asli gambar dari Leshy Tool
    spriteHeight: 1288, // Tinggi asli gambar dari Leshy Tool
    facing: "right"     // Menghadap karakter ("right" atau "left")
};

// --- 3. FUNGSI MENGGAMBAR & MEMBALIK ARAH PLAYER ---
function drawPlayer(ctx) {
    // Logika otomatis menentukan arah hadap berdasarkan pergerakan tombol
    if (player.velocityX > 0.1) player.facing = "right";
    if (player.velocityX < -0.1) player.facing = "left";

    if (currentCharacter === "bimbim") {
        if (bimbimLoaded) {
            
            ctx.save(); // Simpan status canvas normal
            
            if (player.facing === "left") {
                // Jika bergerak ke kiri, balikkan gambar secara horizontal
                ctx.translate(player.x + player.width, player.y);
                ctx.scale(-1, 1);
                
                // Gambar karakter posisi balik (koordinat x menjadi 0 karena efek translate)
                ctx.drawImage(
                    bimbimImg,
                    player.frameX * player.spriteWidth, player.frameY * player.spriteHeight, // Potong file asli
                    player.spriteWidth, player.spriteHeight,                                // Ukuran potong
                    0, 0, player.width, player.height                                       // Ukuran di layar game
                );
            } else {
                // Jika bergerak ke kanan, gambar normal seperti biasa
                ctx.drawImage(
                    bimbimImg,
                    player.frameX * player.spriteWidth, player.frameY * player.spriteHeight, 
                    player.spriteWidth, player.spriteHeight, 
                    player.x, player.y, player.width, player.height
                );
            }
            
            ctx.restore(); // Kembalikan status canvas ke normal

        } else {
            // Kotak merah cadangan jika gambar internet Anda sedang loading/error
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(player.x, player.y, player.width, player.height);
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(player.x + 10, player.y + 10, player.width - 20, 20);
        }
    } else if (currentCharacter === "chacha") {
        // Logika visual sementara untuk Chacha (Kotak Pink)
        ctx.fillStyle = "#ffb6c1";
        ctx.fillRect(player.x, player.y, player.width, player.height);
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(player.x, player.y + 70, player.width, 30);
        ctx.fillStyle = "#000000";
        ctx.fillRect(player.x - 2, player.y, player.width + 4, 25);
    }
}
