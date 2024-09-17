// TERMINAL-BASED TIC-TAC-TOE GAME

/**
 * Summary:
 *
 * This terminal-based Tic-Tac-Toe game allows two players or a player vs. AI to compete. The goal is to place three symbols (❌ for Player 1, ⭕ for Player 2) in a row on a 3x3 grid. The game tracks scores and player names across multiple rounds.
 *
 * Key Functions:
 * - playGame(): Main game loop.
 * - initializeGame(): Sets up player names and AI mode.
 * - getMove() / aiMove(): Handles player and AI moves.
 * - checkWin() /checkDraw(): Determines game outcome.
 * - playAgain(): Asks if the players want another round.
 *
 * Main supporting functions:
 * - printBoard(): Displays the board.
 * - switchPlayer(): Switches turns.
 * - resetBoard(): Resets the board for a new game.
 * - updateScore(): Updates and displays player scores.
 */

// ---------------------------------------------------------------------------------------------- 0. IMPORT DEPENDENCIES

import chalk from "chalk";
import readlineSync from "readline-sync";
import readline from "readline";

// ---------------------------------------------------------------------------------------------- 1. GLOBAL VARIABLES TO TRACK THE STATE OF THE GAME

// Initialize the board with bullet points
let board = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

let X_ICON = chalk.red.bold("X");
let O_ICON = chalk.red.bold("O");

let currentPlayer = "X"; // Tracks which player's turn it is, either "X" or "O".
let isGameActive = true; // Flag to indicate if the current game round is still ongoing.
let player1Name = "Player 1";
let player2Name = "Player 2";

// Stores the current scores of Player 1 and Player 2.
let score = {
  player1: 0,
  player2: 0,
};

// Tracks the previous player names to reuse them if needed.
let previousPlayer1Name = "";
let previousPlayer2Name = "";

// ---------------------------------------------------------------------------------------------- 2. KEY FUNCTIONS

// This is the main game loop that alternates between players, checks win/draw conditions, and prompts to play again.
function playGame() {
  initializeGame(); // Start the game with existing or new names

  while (isGameActive) {
    printBoard(board);

    if (currentPlayer === "X") {
      getMove(player1Name);
    } else if (player2Name === "AI") {
      aiMove();
    } else {
      getMove(player2Name);
    }

    if (checkWin()) {
      printBoard(board);
      console.log(
        chalk.green.bold(
          `\n         ${
            currentPlayer === "X" ? player1Name : player2Name
          } wins!`
        )
      );
      updateScore(currentPlayer);
      isGameActive = false;
      break;
    }

    if (checkDraw()) {
      printBoard(board);
      console.log(chalk.yellow("\n         It's a draw!"));
      isGameActive = false;
      break;
    }

    switchPlayer();
  }

  // Play again logic
  if (playAgain()) {
    resetBoard(); // Reset board for new game
    isGameActive = true;
    playGame(); // Restart the game
  }
}

// Sets up player names and AI mode for a new/ongoing game.
function initializeGame(isNewGame = true) {
  if (isNewGame) {
    titleAndRules();
  }

  // Only ask for names if they differ from previous round
  if (!previousPlayer1Name && !previousPlayer2Name) {
    // First game or name change, so ask for names
    player1Name = readlineSync.question(
      chalk.blue.bold("Enter Player 1 name: ")
    );
    player2Name = isAIPlayer()
      ? "AI"
      : readlineSync.question(chalk.blue.bold("Enter Player 2 name: "));
  } else {
    console.log(chalk.green.bold("\nUsing previous player names."));
  }

  // Set previous player names to the current ones
  previousPlayer1Name = player1Name;
  previousPlayer2Name = player2Name;
}

// Displays the current state of the game board.
function printBoard(board) {
  console.clear(); // Clear the console before printing the updated board
  titleAndRules();

  // Players in game
  console.log(
    chalk.green.bold(`          
          ${player1Name} (`) +
      chalk.red.bold("X") +
      chalk.green.bold(`)`) +
      chalk.yellow.bold(`  
          vs.
          `) +
      chalk.green.bold(`${player2Name} (`) +
      chalk.red.bold("O") +
      chalk.green.bold(`)
        `)
  );
  console.log("         ┌───────┬───────┬───────┐");
  console.log(
    `         │   ${board[0][0]}   │   ${board[0][1]}   │   ${board[0][2]}   │`
  );
  console.log("         ├───────┼───────┼───────┤");
  console.log(
    `         │   ${board[1][0]}   │   ${board[1][1]}   │   ${board[1][2]}   │`
  );
  console.log("         ├───────┼───────┼───────┤");
  console.log(
    `         │   ${board[2][0]}   │   ${board[2][1]}   │   ${board[2][2]}   │`
  );
  console.log("         └───────┴───────┴───────┘");
}

// Prompts the player to enter their move (row column), validates the input, and updates the board.
function getMove(player) {
  while (true) {
    let move = readlineSync.question(
      chalk.bold(
        `
         ${player} (${currentPlayer}), make your move (row column = 1 3 or 13): `
      )
    );

    let row, col;

    // Check if the input is in the format "13" (two digits without space)
    if (move.length === 2 && !isNaN(move)) {
      row = Number(move[0]); // First digit as row
      col = Number(move[1]); // Second digit as column
    }
    // Check if the input is in the format "1 3" (two numbers separated by space)
    else if (move.split(" ").length === 2) {
      let moveParts = move.split(" "); // Split the input into parts
      row = Number(moveParts[0]); // Convert first part to number
      col = Number(moveParts[1]); // Convert second part to number
    } else {
      console.log(
        chalk.red("         Invalid format. Please enter '1 3' or '13'.")
      );
      continue; // Re-prompt if the input format is incorrect
    }

    // Validate the move
    if (
      row >= 1 &&
      row <= 3 &&
      col >= 1 &&
      col <= 3 &&
      board[row - 1][col - 1] === " "
    ) {
      board[row - 1][col - 1] = currentPlayer === "X" ? X_ICON : O_ICON; // Corrected this line
      break; // Exit the loop once the move is valid
    } else {
      console.log(chalk.red("         Invalid move. Please try again."));
    }
  }
}

// Checks if a player has won by completing a row, column, or diagonal.
function checkWin() {
  // Check rows and columns for a win

  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === board[i][1] && // checks if the first and second columns in the first row are the same
      board[i][1] === board[i][2] &&
      board[i][0] !== " "
    ) {
      return true; // Row win
    }
    if (
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i] &&
      board[0][i] !== " "
    ) {
      return true; // Column win
    }
  }

  // Check diagonals for a win
  if (
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2] &&
    board[0][0] !== " "
  ) {
    return true; // Diagonal win (left to right)
  }
  if (
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0] &&
    board[0][2] !== " "
  ) {
    return true; // Diagonal win (right to left)
  }

  return false; // No win found
}

// Checks if the game board is full with no winner (a draw).
function checkDraw() {
  for (let row = 0; row < 3; row++) {
    // Loop through each row
    for (let col = 0; col < 3; col++) {
      // Loop through each column
      if (board[row][col] === " ") {
        // If any cell is empty (contains a space " ")
        return false; // Return false, meaning it's not a draw yet
      }
    }
  }
  return true; // If no empty cells are found, return true, meaning it's a draw
}

// Implements the AI move by selecting a random empty position on the board.
function aiMove() {
  let emptyCells = [];

  // Find all empty cells
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === " ") {
        emptyCells.push([row, col]); // store empty cell
      }
    }
  }

  // Randomly select an empty cell
  if (emptyCells.length > 0) {
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let [row, col] = emptyCells[randomIndex];
    board[row][col] = O_ICON;
  }
}

// ---------------------------------------------------------------------------------------------- 3. SUPPORTING FUNCTIONS

// Displays the game's title, rules, and basic instructions for playing.
function titleAndRules() {
  console.log(
    chalk.blue.bold(`
88888888888 8888888 .d8888b.       88888888888     d8888  .d8888b.       88888888888 .d88888b.  8888888888 
    888       888  d88P  Y88b          888        d88888 d88P  Y88b          888    d88P" "Y88b 888        
    888       888  888    888          888       d88P888 888    888          888    888     888 888        
    888       888  888                 888      d88P 888 888                 888    888     888 8888888    
    888       888  888                 888     d88P  888 888                 888    888     888 888        
    888       888  888    888 888888   888    d88P   888 888    888 888888   888    888     888 888        
    888       888  Y88b  d88P          888   d8888888888 Y88b  d88P          888    Y88b. .d88P 888        
    888     8888888 "Y8888P"           888  d88P     888  "Y8888P"           888     "Y88888P"  8888888888 
`)
  );
  console.log(chalk.blue.bold("\nHow to play"));
  console.log(chalk.gray.bold("1. The game is played on a 3x3 grid."));
  console.log(chalk.gray.bold("2. Player 1 is 'X' and Player 2 is 'O'."));
  console.log(
    chalk.gray.bold(
      "3. The first player to get 3 of their marks in a row (vertically, horizontally, or diagonally) wins."
    )
  );
  console.log(
    chalk.gray.bold(
      "4. If all 9 squares are filled and no player has 3 in a row, the game is a draw/tie."
    )
  );
  console.log(
    chalk.blue.bold(`
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
`)
  );
}

// Prompts the user to choose if they want to play against AI.
function isAIPlayer() {
  let isAI;
  while (true) {
    isAI = readlineSync
      .question(chalk.blue.bold("Do you want to play against AI? (yes/no): "))
      .toLowerCase();

    if (isAI === "yes" || isAI === "no") break;
    console.log(chalk.red("Please answer 'yes' or 'no'."));
  }

  return isAI === "yes";
}

// Switches the turn to the other player.
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X"; // Alternate between X and O
}

// Resets the game board to start a fresh round.
function resetBoard() {
  board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];
}

// Prompts the players if they want to play again and handles resetting or quitting.
function playAgain() {
  let response;
  let errorShown = false; // Track if the error has been displayed

  // Display the question once (With process.stdout.write(), the input cursor appears right after the question on the same line, unlike with console.log)
  process.stdout.write(
    chalk.blue.bold("\nDo you want to play again? (yes/no/change names): ")
  );

  // Loop until a valid input is provided
  while (true) {
    response = readlineSync.question("").toLowerCase();

    if (
      response === "yes" ||
      response === "no" ||
      response === "change names"
    ) {
      break; // If valid input, exit the loop
    }

    // Clear the invalid input and show the error message only once
    if (!errorShown) {
      readline.moveCursor(process.stdout, -response.length, -1); // Move cursor up to the previous line
      readline.clearLine(process.stdout, 1); // Clear the current line from the cursor position
      console.log(chalk.red("Please answer 'yes', 'no', or 'change names'."));
      errorShown = true; // Mark that the error has been shown
    }

    // Re-display the question
    process.stdout.write(
      chalk.blue.bold("Do you want to play again? (yes/no/change names): ")
    );
  }

  // If the player chooses to change names, reset the scores and player names
  if (response === "change names") {
    resetScore(); // Reset the score when names are changed
    previousPlayer1Name = ""; // Reset the tracking variables for names
    previousPlayer2Name = "";
    return true; // Continue the game with new names
  }

  if (response === "no") {
    console.log(chalk.yellow.bold("\nGoodbye! Thanks for playing! 👋\n")); // Display goodbye message
  }

  return response === "yes"; // Return true if "yes", otherwise the game will end
}

// Resets the scores when names are changed.
function resetScore() {
  score.player1 = 0;
  score.player2 = 0;
}

// Updates and displays the score for both players after each game.
function updateScore(winner) {
  if (winner === "X") {
    score.player1++; // Increment Player 1's score
  } else if (winner === "O") {
    score.player2++; // Increment Player 2's (or AI's) score
  }

  // Display updated score
  console.log(chalk.magenta.bold(`\n         Scoreboard`));
  console.log(chalk.magenta(`         ${player1Name} (X): ${score.player1}`));
  console.log(chalk.magenta(`         ${player2Name} (O): ${score.player2}\n`));
}

// ---------------------------------------------------------------------------------------------- 4. PLAY GAME

playGame();
