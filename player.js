let currentCharacter = "bimbim";

const player = {
    x: 100,
    y: 300,
    width: 30,
    height: 50,
    speed: 4,
    velocityX: 0,
    velocityY: 0,
    jumping: false,
    grounded: false,
    isDead: false,
    deathTimer: 0
};

function drawPlayer(ctx) {
    if (currentCharacter === "bimbim") {
        // Visual Bimbim
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(player.x, player.y, player.width, player.height);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(player.x + 5, player.y + 5, player.width - 10, 10);
    } else if (currentCharacter === "chacha") {
        // Visual Chacha
        ctx.fillStyle = "#ffb6c1";
        ctx.fillRect(player.x, player.y, player.width, player.height);
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(player.x, player.y + 35, player.width, 15);
        ctx.fillStyle = "#000000";
        ctx.fillRect(player.x - 2, player.y, player.width + 4, 12);
    }
}
