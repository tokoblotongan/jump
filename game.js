const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game Loop (Fungsi yang berjalan terus-menerus untuk memperbarui game)
function gameLoop() {
    // 1. Bersihkan layar setiap frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Gambar tanah (Ground) sederhana
    ctx.fillStyle = "#73bf43"; // Warna hijau rumput
    ctx.fillRect(0, 350, canvas.width, 50);

    // 3. Tulis teks sementara sebagai penanda infrastruktur jalan
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Infrastruktur Siap! Menunggu Karakter...", 50, 50);

    // Panggil fungsi ini lagi di frame berikutnya
    requestAnimationFrame(gameLoop);
}

// Jalankan game pertama kali
gameLoop();
