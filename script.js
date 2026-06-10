const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreLabel = document.getElementById('score-label');
const highscoreLabel = document.getElementById('highscore-label');
const restartBtn = document.getElementById('restart-btn');

// Game State Configuration variables
let score = 0;
let hScore = localStorage.getItem('qb_highscore') || 0;
highscoreLabel.innerText = `High Score: ${hScore}`;
let isGameOver = false;
let gameSpeed = 4;
let obstacleTimer = 0;

// 1. Player Physics Model Object Structure
const player = {
    x: 100,
    y: 200,
    size: 24,
    velocityY: 0,
    gravity: 0.4,
    jumpStrength: 8,
    direction: 1, // 1 = Normal (downward gravity), -1 = Inverted (upward gravity)
    color: '#00ffcc'
};

// Target list array mapping all active hazard obstacles tracking along execution pipelines
let obstacles = [];

// 2. Main Physics Loop Execution Handler
function gameLoop() {
    if (isGameOver) return;

    // Clear canvas drawing viewport layers ahead of computing next frame sequence
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updatePlayerPhysics();
    updateObstaclesPipeline();
    checkCollisionMatrices();

    // Re-queue engine computation updates back onto display sync pipelines
    requestAnimationFrame(gameLoop);
}

// 3. Player Position Mathematics Updates
function updatePlayerPhysics() {
    // Apply directed gravitational velocity transformations
    player.velocityY += player.gravity * player.direction;
    player.y += player.velocityY;

    // Boundary Floor detection limits checking floor tracks
    if (player.y + player.size > canvas.height - 10) {
        player.y = canvas.height - 10 - player.size;
        player.velocityY = 0;
    }
    // Boundary Ceiling tracking evaluation frameworks
    if (player.y < 10) {
        player.y = 10;
        player.velocityY = 0;
    }

    // Render Player Graphic Representation onto structural Canvas
    ctx.fillStyle = player.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
    ctx.shadowBlur = 0; // Reset canvas glow states
}

// 4. Enemy Hazard Generation Pipeline Handling
function updateObstaclesPipeline() {
    obstacleTimer++;
    
    // Spawn a brand new object block every 90 runtime execution cycles frames
    if (obstacleTimer % 90 === 0) {
        const size = Math.random() * (40 - 20) + 20;
        // Alternate spawn positions between floor tracks and ceiling boundaries
        const spawnOnCeiling = Math.random() > 0.5;
        const posY = spawnOnCeiling ? 10 : canvas.height - 10 - size;

        obstacles.push({
            x: canvas.width,
            y: posY,
            width: size,
            height: size,
            color: '#ff3366'
        });
    }

    // Process positional shifts across tracked array lists loop components
    for (let i = obstacles.length - 1; i >= 0; i--) {
        let obs = obstacles[i];
        obs.x -= gameSpeed;

        // Render obstacle element to vector views
        ctx.fillStyle = obs.color;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

        // Delete spent objects that tracked safely past view borders out of computer memory arrays
        if (obs.x + obs.width < 0) {
            obstacles.splice(i, 1);
            score++;
            scoreLabel.innerText = `Score: ${score}`;
            
            // Scaled scaling factor modifiers incrementing difficulty parameters matching execution speeds
            if (score % 5 === 0) gameSpeed += 0.5;
        }
    }
}

// 5. Box AABB Intersection Processing
function checkCollisionMatrices() {
    for (let obs of obstacles) {
        if (
            player.x < obs.x + obs.width &&
            player.x + player.size > obs.x &&
            player.y < obs.y + obs.height &&
            player.y + player.size > obs.y
        ) {
            triggerGameOverSequence();
        }
    }
}

function triggerGameOverSequence() {
    isGameOver = true;
    restartBtn.style.display = 'inline-block';
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ff3366';
    ctx.font = 'bold 30px Courier New';
    ctx.fillText("CRITICAL COLLISION // SYSTEM HALTED", canvas.width / 2 - 280, canvas.height / 2);

    if (score > hScore) {
        hScore = score;
        localStorage.setItem('qb_highscore', hScore);
        highscoreLabel.innerText = `High Score: ${hScore}`;
    }
}

// 6. Global User Input Mappings
window.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault(); // Prevent standard page spacebar jumping layout drops
        if (!isGameOver) {
            // Shift physical directional metrics on standard parameters vectors orientation loops
            player.direction *= -1;
            player.velocityY = player.direction * player.jumpStrength;
        }
    }
});

restartBtn.addEventListener('click', () => {
    // Complete configuration clean run reset profiles variables maps routines
    score = 0;
    gameSpeed = 4;
    obstacles = [];
    isGameOver = false;
    obstacleTimer = 0;
    player.y = 200;
    player.velocityY = 0;
    player.direction = 1;
    scoreLabel.innerText = `Score: ${score}`;
    restartBtn.style.display = 'none';
    gameLoop();
});

// Run execution cycle processes instantly on page mounting
gameLoop();