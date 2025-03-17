const readline = require("readline");
const { stdin, stdout } = process;

const screenWidth = process.stdout.columns || 80;
const screenHeight = process.stdout.rows || 24;
const WIDTH = Math.floor(screenWidth / 4) - 2;  // Adjusted for spacing
const HEIGHT = Math.floor(screenHeight / 2) - 2;

let snake = [{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }];
let food = { x: Math.floor(Math.random() * WIDTH), y: Math.floor(Math.random() * HEIGHT) };
let direction = "RIGHT";
let running = true;
let score = 0;
let paused = false;

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding("utf8");

stdin.on("data", (key) => {
  if (key === "w" && direction !== "DOWN") direction = "UP";
  if (key === "s" && direction !== "UP") direction = "DOWN";
  if (key === "a" && direction !== "RIGHT") direction = "LEFT";
  if (key === "d" && direction !== "LEFT") direction = "RIGHT";
  if (key === "p") paused = !paused;
  if (key === "r") resetGame();
  if (key === "q") process.exit();
});

function drawGame() {
  console.clear();
  let screen = "\x1b[0m"; // Reset styles

  // Display Score
  screen += `\x1b[1;33mScore: ${score}\n\x1b[0m`;

  // Top Border
  screen += "\x1b[1;37m╔" + "═".repeat(WIDTH * 2) + "╗\n";

  for (let y = 0; y < HEIGHT; y++) {
    screen += "║";
    for (let x = 0; x < WIDTH; x++) {
      let isHead = snake[0].x === x && snake[0].y === y;
      let isFood = food.x === x && food.y === y;
      let isBody = snake.some(segment => segment.x === x && segment.y === y);

      if (isHead) {
        screen += "\x1b[32m● "; // Snake head
      } else if (isFood) {
        screen += "\x1b[31m● "; // Food
      } else if (isBody) {
        screen += "\x1b[32m■ "; // Snake body
      } else {
        screen += "  "; // Empty space (double space for uniformity)
      }
    }
    screen += "\x1b[1;37m║\n";
  }

  // Bottom Border
  screen += "╚" + "═".repeat(WIDTH * 2) + "╝\n\x1b[0m";

  if (paused) screen += "\x1b[1;36mGame Paused. Press 'P' to resume.\x1b[0m\n";
  stdout.write(screen);
}

function updateGame() {
  if (paused) return;

  let newHead = { ...snake[0] };
  if (direction === "UP") newHead.y--;
  if (direction === "DOWN") newHead.y++;
  if (direction === "LEFT") newHead.x--;
  if (direction === "RIGHT") newHead.x++;

  if (
    newHead.x < 0 || newHead.x >= WIDTH || newHead.y < 0 || newHead.y >= HEIGHT ||
    snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
  ) {
    console.log("Game Over!");
    process.exit();
  }

  if (newHead.x === food.x && newHead.y === food.y) {
    food = { x: Math.floor(Math.random() * WIDTH), y: Math.floor(Math.random() * HEIGHT) };
    score++;
  } else {
    snake.pop();
  }

  snake.unshift(newHead);
}

function resetGame() {
  snake = [{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }];
  food = { x: Math.floor(Math.random() * WIDTH), y: Math.floor(Math.random() * HEIGHT) };
  direction = "RIGHT";
  score = 0;
  paused = false;
}

function gameLoop() {
  if (running) {
    drawGame();
    updateGame();
    setTimeout(gameLoop, 100); // Uniform movement speed
  }
}

gameLoop();
