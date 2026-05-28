let currentCharacter = "bimbim";

// --- 1. MEMUAT GAMBAR BIMBIM ---
const bimbimImg = new Image();
bimbimImg.src = 'assets/bimbim.png'; // Mengarah ke folder assets Anda

// Indikator apakah gambar sudah selesai dimuat oleh browser
let bimbimLoaded = false;
bimbimImg.onload = function() {
    bimbimLoaded = true;
};

// --- 2. DATA KARAKTER ---
const player = {
    x: 100,
    y: 300,
    width: 40,       // Sesuai kebutuhan: Anda bisa sesuaikan lebar visual di sini
    height: 60,      // Sesuai kebutuhan: Anda bisa sesuaikan tinggi visual di sini
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
        
        // Jika gambar bimbim.png berhasil dimuat, gambar fisiknya ke canvas
        if (bimbimLoaded) {
            ctx.drawImage(bimbimImg, player.x, player.y, player.width, player.height);
        } else {
            // Cadangan: Jika gambar belum termuat/error, tampilkan kotak merah sementara
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(player.x, player.y, player.width, player.height);
            
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(player.x + 5, player.y + 5, player.width - 10, 10);
        }

    } else if (currentCharacter === "chacha") {
        // Logika Chacha masih menggunakan kotak sementara (pink)
        ctx.fillStyle = "#ffb6c1";
        ctx.fillRect(player.x, player.y, player.width, player.height);
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(player.x, player.y + (player.height * 0.7), player.width, player.height * 0.3);
        ctx.fillStyle = "#000000";
        ctx.fillRect(player.x - 2, player.y, player.width + 4, player.height * 0.24);
    }
}
