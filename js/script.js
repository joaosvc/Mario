const mario = document.querySelector('.mario');
const clounds = document.querySelector('.clounds');
const ground = document.querySelector('.ground');
const pipes = document.querySelectorAll('.pipe');
const gameMenu = document.querySelector('.game-menu');
const gameOptions = document.querySelector('.game-board .options');

const playButton = document.querySelector('.game-menu .options .play');
const exitButton = document.querySelector('.game-menu .options .exit');
const pauseButton = document.querySelector('.game-board .options .pause');

const lastScore = document.querySelector('.game-board .last-score');
const currentScore = document.querySelector('.game-board .current-score');

const KEYBOARD_SPACE_CODE = 32;

let gameRunning = false;
let isJumping = false;
let paused = false;

let jumpingTicks = 0;
let livingTicks = 0;
let lastScoreValue = 0;
let currentScoreValue = 0;

const jump = () => {
    if (!isJumping) {
        mario.classList.add('jump');
        isJumping = true;
        jumpingTicks = 510 / 100;
    }
}

const gameLoop = () => {
    if (!gameRunning || paused) {
        return false;
    }

    if (isJumping) {
        if (--jumpingTicks <= 0) {
            mario.classList.remove('jump');
            isJumping = false;
            jumpingTicks = 0;
        }
    }
    let marioPosition = +window.getComputedStyle(mario).bottom.replace('px', 11);

    for (pipe of pipes) {
        pipePosition = pipe.offsetLeft;

        if (pipePosition <= 222 && pipePosition >= 140 && marioPosition <= 45) {
            gameOver();
        }
    }
    if (gameRunning) {
        currentScoreValue = ++livingTicks;
        updateScore();
    }
}

const updateScore = () => {
    currentScore.innerHTML = currentScoreValue;
}

const updateLastScore = () => {
    lastScore.innerHTML = currentScoreValue;
}

const gameOver = () => {
    clearInterval(gameLoop);
    setAnimationState('paused');
    
    mario.src = './img/game-over.png';
    mario.classList.add('game-over');

    gameRunning = false;
    paused = false;
    
    updateLastScore();
    showGameMenu();
}

const startGame = () => {
    resetGame();
    gameRunning = true;

    isJumping = false;
    currentScoreValue = 0;
    jumpingTicks = 0;

    setInterval(gameLoop, 100);
}

const continueGame = () => {
    paused = false;
    setAnimationState('running');
}

const pauseGame = () => {
    paused = true;
    setAnimationState('paused');
}

const hideGameMenu = () => {
    gameMenu.style.display = 'none';
    gameOptions.style.display = 'flex';
}

const showGameMenu = () => {
    gameMenu.style.display = 'flex';
    gameOptions.style.display = 'none';
}

const setAnimationState = (state) => {
    mario.style.animationPlayState = state;
    clounds.style.animationPlayState = state;
    ground.style.animationPlayState = state;

    for (pipe of pipes) {
        pipe.style.animationPlayState = state;
    }
}

const resetGame = () => {
    mario.src = './img/mario.gif';
    mario.classList.remove('game-over');

    gameRunning = false;
    paused = false;
    isJumping = false;
    jumpingTicks = 0;

    for (pipe of pipes) {
        
    }
}

document.addEventListener('keydown', (event) => {
    if (event.keyCode === KEYBOARD_SPACE_CODE && gameRunning) {
        jump();
    }
});

playButton.addEventListener('click', () => {
    if (paused) {
        continueGame();
    } else {
        startGame();
    }
    hideGameMenu();
});

pauseButton.addEventListener('click', () => {
    pauseGame();
    showGameMenu();
});