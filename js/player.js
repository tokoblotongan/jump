let currentCharacter = "bimbim";

// --- 1. PROSES MEMUAT GAMBAR ---
const bimbimImg = new Image();
bimbimImg.src = 'assets/bimbim.png'; 

let bimbimLoaded = false;
bimbimImg.onload = function() {
    bimbimLoaded = true;
};

// --- 2. DATA UTAMA KARAKTER ---
const player = {
    x: 100,
    y: 280,
    width: 50,       
    height: 70,      
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
        if (bimbimLoaded) {
            ctx.drawImage(bimbimImg, player.x, player.y, player.width, player.height);
        } else {
            // Cadangan jika gambar gagal/belum loading
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(player.x, player.y, player.width, player.height);
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(player.x + 5, player.y + 5, player.width - 10, 10);
        }
    } else if (currentCharacter === "chacha") {
        // Visual Chacha Kotak Pink
        ctx.fillStyle = "#ffb6c1";
        ctx.fillRect(player.x, player.y, player.width, player.height);
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(player.x, player.y + 35, player.width, 15);
        ctx.fillStyle = "#000000";
        ctx.fillRect(player.x - 2, player.y, player.width + 4, 12);
    }
}
