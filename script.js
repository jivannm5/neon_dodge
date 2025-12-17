const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');

// --- SISTEMA DE AUDIO (Sintetizador Básico) ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume(); // Activar audio al interactuar
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'move') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
    } else if (type === 'score') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
    } else if (type === 'gameover') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.5);
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.linearRampToValueAtTime(0, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
    }
}

// --- LÓGICA DEL JUEGO ---
let player = { x: 180, y: 540, w: 40, h: 40, color: '#0ff', speed: 5 };
let enemies = [];
let score = 0;
let gameRunning = true;
let frameCount = 0;
let keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    if(gameRunning) playSound('move'); // Sonido al moverse
});
document.addEventListener('keyup', (e) => keys[e.code] = false);

restartBtn.addEventListener('click', () => document.location.reload());

function update() {
    if (!gameRunning) return;

    // Movimiento Jugador
    if ((keys['ArrowLeft'] || keys['KeyA']) && player.x > 0) player.x -= player.speed;
    if ((keys['ArrowRight'] || keys['KeyD']) && player.x + player.w < canvas.width) player.x += player.speed;

    // Generar Enemigos
    if (frameCount % 60 === 0) {
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

    // Actualizar Enemigos
    enemies.forEach((enemy, index) => {
        enemy.y += enemy.speed;

        // Colisión
        if (
            player.x < enemy.x + enemy.w &&
            player.x + player.w > enemy.x &&
            player.y < enemy.y + enemy.h &&
            player.y + player.h > enemy.y
        ) {
            playSound('gameover'); // Sonido Game Over
            gameOver();
        }

        // Puntaje
        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
            score += 10;
            scoreEl.innerText = score;
            playSound('score'); // Sonido Puntos
        }
    });

    frameCount++;
    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Jugador
    ctx.fillStyle = player.color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = player.color;
    ctx.fillRect(player.x, player.y, player.w, player.h);
    // Enemigos
    enemies.forEach(enemy => {
        ctx.fillStyle = enemy.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
    });
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