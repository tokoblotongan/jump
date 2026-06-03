const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const keys = {};

const worldWidth = level1.worldWidth;
let cameraX = 0;

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
}

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

    if (keys['ArrowLeft'] || keys['KeyA']) {
        if (player.velocityX > -player.speed)
            player.velocityX--;
    }

    if (keys['ArrowRight'] || keys['KeyD']) {
        if (player.velocityX < player.speed)
            player.velocityX++;
    }

    if (
        (keys['Space'] || keys['ArrowUp'] || keys['KeyW']) &&
        !player.jumping &&
        player.grounded
    ) {
        player.jumping = true;
        player.grounded = false;
        player.velocityY = -10;
    }

    player.velocityX *= friction;
    player.velocityY += gravity;

    player.x += player.velocityX;
    player.y += player.velocityY;

    if (player.x < 0)
        player.x = 0;

    if (player.x > worldWidth - player.width)
        player.x = worldWidth - player.width;

    checkPlatformCollision();

    if (player.y > canvas.height + 300) {
        player.isDead = true;
        player.velocityY = -8;
    }

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

            if (
                player.y + player.height - player.velocityY <= enemy.y + 10 &&
                player.velocityY > 0
            ) {

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

    } else if (enemy.isDefeated) {

        enemy.velocityY += gravity;
        enemy.x += enemy.velocityX;
        enemy.y += enemy.velocityY;

        if (enemy.y > canvas.height)
            enemy.isDefeated = false;
    }

    cameraX = player.x - canvas.width / 2;

    if (cameraX < 0)
        cameraX = 0;

    if (cameraX > worldWidth - canvas.width)
        cameraX = worldWidth - canvas.width;
}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    ctx.translate(-cameraX, 0);

    for (const p of level1.platforms) {

        ctx.fillStyle = "#73bf43";

        ctx.fillRect(
            p.x,
            p.y,
            p.w,
            p.h
        );
    }

    drawEnemy(ctx);
    drawPlayer(ctx);

    ctx.restore();

    ctx.fillStyle = "white";
    ctx.font = "14px Arial";

    ctx.fillText(
        "Karakter Aktif: " + currentCharacter.toUpperCase(),
        20,
        30
    );

    ctx.fillText(
        "Level 1 - Jalan Menuju Sekolah",
        20,
        50
    );

    ctx.fillText(
        "Posisi: " + Math.floor(player.x) + " / " + worldWidth,
        20,
        70
    );
}

function gameLoop() {

    update();
    draw();

    requestAnimationFrame(gameLoop);
}

resetGame();
gameLoop();
