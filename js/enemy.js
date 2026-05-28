const enemy = {
    x: 700,
    y: 320,
    width: 30,
    height: 30,
    color: "#8B4513",
    speed: 1.5,
    velocityX: 0,
    velocityY: 0,
    alive: true,
    isDefeated: false
};

function drawEnemy(ctx) {
    if (enemy.alive || enemy.isDefeated) {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }
}
