const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const keys = {};

window.addEventListener('keydown', function(e) {
    keys[e.code] = true;
    if (!player.isDead) {
        if (e.code === 'Digit1') currentCharacter = "bimbim";
        if (e.code === 'Digit2') currentCharacter = "chacha";
    }
});

window.addEventListener('keyup', function(e) {
    keys[e.code] = false;
});

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

function update() {
    if (player.isDead) {
        player.velocityY += 0.3;
        player.y += player.velocityY;
        player.deathTimer++;
        if (player.deathTimer > 120) resetGame();
        if (enemy.isDefeated) {
            enemy.velocityY += gravity;
            enemy.x += enemy.velocityX;
            enemy.y += enemy.velocityY;
        }
        return;
    }

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

    if (enemy.alive) {
        enemy.x -= enemy.speed;
        if (enemy.x < -enemy.width) enemy.x = canvas.width + 50;

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
        if (enemy.y > canvas.height) enemy.isDefeated = false;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gambar Tanah
    ctx.fillStyle = "#73bf43"; 
    ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);

    // Panggil fungsi gambar dari file modul masing-masing
    drawEnemy(ctx);
    drawPlayer(ctx);

    // Teks Petunjuk
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.fillText("Karakter Aktif: " + currentCharacter.toUpperCase(), 20, 30);
    ctx.fillText("Tekan [1] untuk Bimbim | Tekan [2] untuk Chacha", 20, 50);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
