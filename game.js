const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const keys = {};

const worldWidth = level1.worldWidth;
let cameraX = 0;

// ===========================
// PLATFORM IMAGES
// ===========================

const notebookPlatformImg = new Image();
notebookPlatformImg.src = "assets/notebook_platform.png";

const rulerPlatformImg = new Image();
rulerPlatformImg.src = "assets/ruler_platform.png";

const pencilPlatformImg = new Image();
pencilPlatformImg.src = "assets/pencil_platform.png";

// ===========================
// KEYBOARD
// ===========================

window.addEventListener('keydown', function(e) {

    keys[e.code] = true;

    if (!player.isDead) {

        if (e.code === 'Digit1')
            currentCharacter = "bimbim";

        if (e.code === 'Digit2')
            currentCharacter = "chacha";
    }
});

window.addEventListener('keyup', function(e) {
    keys[e.code] = false;
});

// ===========================
// RESET GAME
// ===========================

function resetGame() {

    player.x = 100;
    player.y = 200;

    player.velocityX = 0;
    player.velocityY = 0;

    player.isDead = false;
    player.deathTimer = 0;

    enemy.x = level1.enemies[0].x;
    enemy.y = level1.enemies[0].y;

    enemy.velocityX = 0;
    enemy.velocityY = 0;

    enemy.alive = true;
    enemy.isDefeated = false;

    cameraX = 0;
}

// ===========================
// PLATFORM COLLISION
// ===========================

function checkPlatformCollision() {

    player.grounded = false;

    for (const p of level1.platforms) {

        if (

            player.x + player.width > p.x &&
            player.x < p.x + p.w &&

            player.y + player.height >= p.y &&
            player.y + player.height <= p.y + 20 &&

            player.velocityY >= 0

        ) {

            player.y = p.y - player.height;

            player.velocityY = 0;

            player.jumping = false;
            player.grounded = true;
        }
    }
}

// ===========================
// UPDATE
// ===========================

function update() {

    if (player.isDead) {

        player.velocityY += 0.3;
        player.y += player.velocityY;

        player.deathTimer++;

        if (player.deathTimer > 120)
            resetGame();

        if (enemy.isDefeated) {

            enemy.velocityY += gravity;

            enemy.x += enemy.velocityX;
            enemy.y += enemy.velocityY;
        }

        return;
    }

    // Gerak kiri

    if (keys['ArrowLeft'] || keys['KeyA']) {

        if (player.velocityX > -player.speed)
            player.velocityX--;
    }

    // Gerak kanan

    if (keys['ArrowRight'] || keys['KeyD']) {

        if (player.velocityX < player.speed)
            player.velocityX++;
    }

    // Lompat

    if (

        (keys['Space'] || keys['ArrowUp'] || keys['KeyW']) &&
        !player.jumping &&
        player.grounded

    ) {

        player.jumping = true;
        player.grounded = false;

        player.velocityY = -10;
    }

    // Physics

    player.velocityX *= friction;
    player.velocityY += gravity;

    player.x += player.velocityX;
    player.y += player.velocityY;

    // Batas kiri

    if (player.x < 0)
        player.x = 0;

    // Batas kanan

    if (player.x > worldWidth - player.width)
        player.x = worldWidth - player.width;

    checkPlatformCollision();

    // Mati jatuh

    if (player.y > canvas.height + 300) {

        player.isDead = true;
        player.velocityY = -8;
    }

    // Enemy

    if (enemy.alive) {

        enemy.x -= enemy.speed;

        if (enemy.x < 1000)
            enemy.x = 1700;

        if (

            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y

        ) {

            // Injak ular

            if (

                player.y + player.height - player.velocityY <= enemy.y + 10 &&
                player.velocityY > 0

            ) {

                enemy.alive = false;
                enemy.isDefeated = true;

                enemy.velocityY = -5;
                enemy.velocityX = player.velocityX * 0.5;

                player.velocityY = -6;

            }
            else {

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

        if (enemy.y > canvas.height)
            enemy.isDefeated = false;
    }

    // CAMERA

    cameraX = player.x - canvas.width / 2;

    if (cameraX < 0)
        cameraX = 0;

    if (cameraX > worldWidth - canvas.width)
        cameraX = worldWidth - canvas.width;
}

// ===========================
// DRAW
// ===========================

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // LANGIT

    ctx.fillStyle = "#6495ED";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    ctx.translate(-cameraX, 0);

    // PLATFORM

    for (const p of level1.platforms) {

        // TANAH

        if (p.h >= 300) {

            ctx.fillStyle = "#73bf43";

            ctx.fillRect(
                p.x,
                p.y,
                p.w,
                p.h
            );
        }

        // BUKU

        else if (p.w === 120 && p.h === 50) {

            ctx.drawImage(
                notebookPlatformImg,
                p.x,
                p.y,
                p.w,
                p.h
            );
        }

        // PENGGARIS

        else if (p.w === 180 && p.h === 30) {

            ctx.drawImage(
                rulerPlatformImg,
                p.x,
                p.y,
                p.w,
                p.h
            );
        }

        // KOTAK PENSIL

        else {

            ctx.drawImage(
                pencilPlatformImg,
                p.x,
                p.y,
                p.w,
                p.h
            );
        }
    }

    drawEnemy(ctx);
    drawPlayer(ctx);

    ctx.restore();

    // HUD

    ctx.fillStyle = "white";
    ctx.font = "18px Arial";

    ctx.fillText(
        "Karakter Aktif : " +
        currentCharacter.toUpperCase(),
        20,
        30
    );

    ctx.fillText(
        "Level 1 - Jalan Menuju Sekolah",
        20,
        55
    );

    ctx.fillText(
        "Posisi : " +
        Math.floor(player.x) +
        " / " +
        worldWidth,
        20,
        80
    );
}

// ===========================
// GAME LOOP
// ===========================

function gameLoop() {

    update();
    draw();

    requestAnimationFrame(gameLoop);
}

resetGame();
gameLoop();
