# Snake Game in Node.js

This is a simple implementation of the classic Snake game using Node.js, built entirely within the terminal using the `readline` module.

## Features

- **Snake Movement**: The snake moves using the WASD keys.
- **Food**: The snake consumes food (red dot) to grow.
- **Game Over**: The game ends if the snake runs into itself or the walls.
- **Pause**: The game can be paused and resumed using the 'P' key.
- **Reset**: The game can be reset at any time with the 'R' key.
- **Score**: The score is displayed at the top of the screen and increments as the snake eats food.

## Requirements

- Node.js (>= 14.x)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/amartyanil/snakejs.git
    ```

2. Navigate into the project folder:

    ```bash
    cd snakejs
    ```

3. No additional dependencies are required, since the game uses built-in Node.js modules.

## How to Play

1. **Start the Game**: Run the game with the following command:

    ```bash
    node snake.js
    ```

2. **Control the Snake**:
    - `W` to move up.
    - `S` to move down.
    - `A` to move left.
    - `D` to move right.

3. **Pause/Resume the Game**:
    - Press `P` to pause the game.
    - Press `P` again to resume.

4. **Reset the Game**:
    - Press `R` to reset the game to its initial state.

5. **Quit the Game**:
    - Press `Q` to exit the game.

## Game Over

The game will end if:
- The snake runs into the walls.
- The snake collides with its own body.
