const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');

// Variables del juego
let player = { x: 180, y: 540, w: 40, h: 40, color: '#0ff', speed: 5 };
let enemies = [];
let score = 0;
let gameRunning = true;
let frameCount = 0;

// Escuchar teclado
let keys = {};
document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

// Reiniciar juego
restartBtn.addEventListener('click', () => {
    document.location.reload();
});

function update() {
    if (!gameRunning) return;

    // Mover jugador
    if ((keys['ArrowLeft'] || keys['KeyA']) && player.x > 0) player.x -= player.speed;
    if ((keys['ArrowRight'] || keys['KeyD']) && player.x + player.w < canvas.width) player.x += player.speed;

    // Generar enemigos
    if (frameCount % 60 === 0) { // Cada segundo aprox
        let size = Math.random() * 30 + 20;
        enemies.push({
            x: Math.random() * (canvas.width - size),
            y: -50,
            w: size,
            h: size,
            color: '#f00',
            speed: Math.random() * 3 + 2
        });
    }

    // Actualizar enemigos
    enemies.forEach((enemy, index) => {
        enemy.y += enemy.speed;

        // Colisión
        if (
            player.x < enemy.x + enemy.w &&
            player.x + player.w > enemy.x &&
            player.y < enemy.y + enemy.h &&
            player.y + player.h > enemy.y
        ) {
            gameOver();
        }

        // Eliminar si sale de pantalla y sumar puntos
        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
            score += 10;
            scoreEl.innerText = score;
        }
    });

    frameCount++;
    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar Jugador
    ctx.fillStyle = player.color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = player.color;
    ctx.fillRect(player.x, player.y, player.w, player.h);

    // Dibujar Enemigos
    enemies.forEach(enemy => {
        ctx.fillStyle = enemy.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
    });
    
    // Reset shadow
    ctx.shadowBlur = 0;
}

function gameOver() {
    gameRunning = false;
    ctx.fillStyle = 'white';
    ctx.font = '40px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
    restartBtn.style.display = 'inline-block';
}

update();