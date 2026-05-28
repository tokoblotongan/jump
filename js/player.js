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
    y: 250,
    width: 60,       
    height: 100,      
    speed: 4,
    velocityX: 0,
    velocityY: 0,
    jumping: false,
    grounded: false,
    isDead: false,
    deathTimer: 0
};
// --- MASUKKAN ANGKA HASIL DARI LESHY TOOL DI SINI ---
    frameX: 0,          
    frameY: 0,          
    spriteWidth: 956,    // Diubah ke 956 agar pas dengan lebar asli gambar
    spriteHeight: 1288,  // Diubah ke 1288 agar pas dengan tinggi asli gambar
    animationTimer: 0,  
    facing: "right"
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
