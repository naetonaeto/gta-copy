// Get canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Define game variables
let playerX = 100;
let playerY = 100;
let playerSpeed = 5;
let carX = 300;
let carY = 200;
let carSpeed = 2;
let enemyX = 500;
let enemyY = 300;
let enemySpeed = 3;
let score = 0;
let health = 100;
let ammo = 50;
let ambulanceX = 200;
let ambulanceY = 400;
let policeX = 600;
let policeY = 100;
let missileX = 0;
let missileY = 0;
let helicopterX = 400;
let helicopterY = 50;
let isCarEntered = false;
let isAmbulanceEntered = false;
let isPoliceEntered = false;
let isHelicopterEntered = false;

// Draw player
function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(playerX, playerY, 50, 50);
}

// Draw car
function drawCar() {
    ctx.fillStyle = 'red';
    ctx.fillRect(carX, carY, 50, 50);
}

// Draw enemy
function drawEnemy() {
    ctx.fillStyle = 'green';
    ctx.fillRect(enemyX, enemyY, 50, 50);
}

// Draw ambulance
function drawAmbulance() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(ambulanceX, ambulanceY, 50, 50);
}

// Draw police car
function drawPolice() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(policeX, policeY, 50, 50);
}

// Draw missile
function drawMissile() {
    ctx.fillStyle = 'black';
    ctx.fillRect(missileX, missileY, 10, 10);
}

// Draw helicopter
function drawHelicopter() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(helicopterX, helicopterY, 50, 50);
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (!isCarEntered && !isAmbulanceEntered && !isPoliceEntered && !isHelicopterEntered) {
                playerY -= playerSpeed;
            } else if (isCarEntered) {
                carY -= carSpeed;
            } else if (isAmbulanceEntered) {
                ambulanceY -= carSpeed;
            } else if (isPoliceEntered) {
                policeY -= carSpeed;
            } else if (isHelicopterEntered) {
                helicopterY -= carSpeed;
            }
            break;
        case 'ArrowDown':
            if (!isCarEntered && !isAmbulanceEntered && !isPoliceEntered && !isHelicopterEntered) {
                playerY += playerSpeed;
            } else if (isCarEntered) {
                carY += carSpeed;
            } else if (isAmbulanceEntered) {
                ambulanceY += carSpeed;
            } else if (isPoliceEntered) {
                policeY += carSpeed;
            } else if (isHelicopterEntered) {
                helicopterY += carSpeed;
            }
            break;
        case 'ArrowLeft':
            if (!isCarEntered && !isAmbulanceEntered && !isPoliceEntered && !isHelicopterEntered) {
                playerX -= playerSpeed;
            } else if (isCarEntered) {
                carX -= carSpeed;
            } else if (isAmbulanceEntered) {
                ambulanceX -= carSpeed;
            } else if (isPoliceEntered) {
                policeX -= carSpeed;
            } else if (isHelicopterEntered) {
                helicopterX -= carSpeed;
            }
            break;
             case 'ArrowRight':
            if (!isCarEntered && !isAmbulanceEntered && !isPoliceEntered && !isHelicopterEntered) {
                playerX += playerSpeed;
            } else if (isCarEntered) {
                carX += carSpeed;
            } else if (isAmbulanceEntered) {
                ambulanceX += carSpeed;
            } else if (isPoliceEntered) {
                policeX += carSpeed;
            } else if (isHelicopterEntered) {
                helicopterX += carSpeed;
            }
            break;
        case ' ':
            shoot();
            break;
        case 'c':
        case 'C':
            if (!isCarEntered) {
                isCarEntered = true;
                playerX = carX;
                playerY = carY;
            } else {
                isCarEntered = false;
            }
            break;
        case 'a':
        case 'A':
            if (!isAmbulanceEntered) {
                isAmbulanceEntered = true;
                playerX = ambulanceX;
                playerY = ambulanceY;
            } else {
                isAmbulanceEntered = false;
            }
            break;
        case 'p':
        case 'P':
            if (!isPoliceEntered) {
                isPoliceEntered = true;
                playerX = policeX;
                playerY = policeY;
            } else {
                isPoliceEntered = false;
            }
            break;
        case 'h':
        case 'H':
            if (!isHelicopterEntered) {
                isHelicopterEntered = true;
                playerX = helicopterX;
                playerY = helicopterY;
            } else {
                isHelicopterEntered = false;
            }
            break;
        case 'm':
        case 'M':
            launchMissile();
            break;
    }
});

// Shoot function
function shoot() {
    // Create bullet
    let bulletX = playerX;
    let bulletY = playerY;
    let bulletSpeed = 5;

    // Move bullet
    let bulletInterval = setInterval(() => {
        bulletX += bulletSpeed;

        // Check collision with enemy
        if (bulletX > enemyX && bulletX < enemyX + 50 && bulletY > enemyY && bulletY < enemyY + 50) {
            score += 10;
            enemyX = Math.random() * canvas.width;
            enemyY = Math.random() * canvas.height;
            clearInterval(bulletInterval);
        }

        // Check if bullet is off screen
        if (bulletX > canvas.width) {
            clearInterval(bulletInterval);
        }
    }, 16);
}

// Launch missile function
function launchMissile() {
    // Create missile
    missileX = playerX;
    missileY = playerY;
    let missileSpeed = 5;

    // Move missile
    let missileInterval = setInterval(() => {
        missileY += missileSpeed;

        // Check collision with enemy
        if (missileX > enemyX && missileX < enemyX + 50 && missileY > enemyY && missileY < enemyY + 50) {
            score += 50;
            enemyX = Math.random() * canvas.width;
            enemyY = Math.random() * canvas.height;
            clearInterval(missileInterval);
        }

        // Check if missile is off screen
        if (missileY > canvas.height) {
            clearInterval(missileInterval);
        }
    }, 16);
}

// Game loop
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawCar();
    drawEnemy();
    drawAmbulance();
    drawPolice();
    drawMissile();
    drawHelicopter();
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Score: ' + score, 10, 10);
    ctx.fillText('Health: ' + health, 10, 40);
    ctx.fillText('Ammo: ' + ammo, 10, 70);

    if (health <= 0) {
        ctx.font = '48px Arial';
        ctx.fillStyle = 'red';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
        clearInterval(gameInterval);
    }

    requestAnimationFrame(update);
}

let gameInterval = setInterval(update, 16);