# Tic-Tac-Toe Terminal-Based Game

This is a simple, interactive, terminal-based Tic-Tac-Toe game built using Node.js. It allows two players or one player vs. AI to compete in a classic game of Tic-Tac-Toe on a 3x3 grid.

![Game Board](/game-screenshots/game-board.png)

## Features
- **Two-player mode**: Play against another player.
- **AI mode**: Play against the computer (AI).
- **Colored terminal output**: uses `chalk` for a visually enhanced experience.
- **Score tracking**: Scores for both players are tracked across multiple rounds.
- **Replayable**: Players can choose to play another round or change names after each game to reser scores.

## How to Play
- The game is played on a 3x3 grid.
- Player 1 uses **`X`**, and Player 2 (or AI) uses **`O`**.
- Players take turns entering their move by specifying a row and column (e.g., `1 3` or `13`).
- The first player to get three marks in a row (vertically, horizontally, or diagonally) wins.
- If all 9 squares are filled without a winner, the game ends in a draw.

## Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/tic-tac-toe-game.git
   ```

2. **Install dependencies**:
   ```bash
   npm install readline-sync readline chalk
   ```

3. **Run the game**:
   ```bash
   node index.js
   ```
   
## Game preview

#### Intro and player selection

![Game Intro Player Selection](/game-screenshots/player-selection.png)

#### Player vs. Player & Winning Scenario

![Game Player 1 vs Player 2](/game-screenshots/player-vs-player.png)

#### Player  vs. AI

![Game Player 1 vs AI](/game-screenshots/player-vs-ai.png)


# Thanks for reading. I hope you enjoy the game!