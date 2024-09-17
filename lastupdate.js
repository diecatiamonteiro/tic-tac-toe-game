// TERMINAL-BASED TIC-TAC-TOE GAME

// ---------------------------------------------------------------------------------------------- 0. IMPORT DEPENDENCIES

import chalk from "chalk";
import readlineSync from "readline-sync";
import readline from "readline"

// ---------------------------------------------------------------------------------------------- 1. GLOBAL VARIABLES TO TRACK THE STATE OF THE GAME

// Initialize the board with bullet points
let board = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

let X_ICON = chalk.red.bold("X");
let O_ICON = chalk.red.bold("O");

let currentPlayer = "X";
let isGameActive = true;
let player1Name = "Player 1";
let player2Name = "Player 2";

let score = {
  player1: 0,
  player2: 0,
};

// ---------------------------------------------------------------------------------------------- 2. KEY FUNCTIONS
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

// Displays title and rules. Sets up player names, assigns Player 1 and Player 2 (or AI), and returns the necessary data to start the game.
function initializeGame() {
  titleAndRules();

  // Player 1 name
  player1Name = readlineSync.question(chalk.blue.bold("Enter Player 1 name: "));

  // Player 2 name or AI with improved validation
  let isAI;
  let errorShown = false; // Track if the error has been displayed

  // Ask if the player wants to play against AI
  process.stdout.write(chalk.blue.bold("Do you want to play against AI? (yes/no): "));

  // Loop until a valid input ('yes' or 'no') is provided
  while (true) {
    isAI = readlineSync.question("").toLowerCase();

    if (isAI === "yes" || isAI === "no") {
      break; // If valid input, exit the loop
    }

    // Clear invalid input and display error message only once
    if (!errorShown) {
      readline.moveCursor(process.stdout, -isAI.length, -1); // Move cursor up to the previous line
      readline.clearLine(process.stdout, 1); // Clear the current line
      console.log(chalk.red("Please answer 'yes' or 'no'."));
      errorShown = true; // Mark that the error has been shown
    }

    // Re-display the question
    process.stdout.write(chalk.blue.bold("Do you want to play against AI? (yes/no): "));
  }

  // Determine Player 2 name based on the response
  if (isAI === "no") {
    player2Name = readlineSync.question(chalk.blue.bold("Enter Player 2 name: "));
  } else {
    player2Name = "AI";
  }
}

// Displays the current board state in the terminal ([row][column]).
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

// Prompts the player to enter their move (row and column), validates the input, and updates the board.
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
      console.log(chalk.red("         Invalid format. Please enter '1 3' or '13'."));
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

// Checks if there is a winning condition (three of the same markers in a row, column, or diagonal).
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

// Checks if all spots on the board are filled and there is no winner, resulting in a draw/tie.
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

// The AI (Player 2) randomly selects an empty spot on the board.
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
    // Fix this condition
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let [row, col] = emptyCells[randomIndex];
    board[row][col] = O_ICON;
    console.log(
      chalk.bold(`AI (O) placed a move at row ${row + 1}, column ${col + 1}`)
    );
  }
}

// This is the main game loop that alternates between players (or AI) and checks for win/draw conditions after every move.
function mainGame() {
  initializeGame(); // Start the game

  while (isGameActive) {
    // Print the board only once at the start of each player's turn
    printBoard(board);

    // Player move
    if (currentPlayer === "X") {
      getMove(player1Name); // Player 1 (X) move
    } else if (player2Name === "AI") {
      aiMove(); // AI makes a move
      console.log(chalk.blue("AI placed a move"));
    } else {
      getMove(player2Name); // Player 2 (O) move
    }

    // Check if the player or AI won
    if (checkWin()) {
      printBoard(board); // Print the board one last time after win
      console.log(
        chalk.green.bold(
          `
         ${currentPlayer === "X" ? player1Name : player2Name} wins!`
        )
      );
      updateScore(currentPlayer); // Optionally update score
      isGameActive = false;
      break;
    }

    // Check if it's a draw
    if (checkDraw()) {
      printBoard(board); // Print the board once after draw
      console.log(chalk.yellow("It's a draw!"));
      isGameActive = false;
      break;
    }

    // Switch player after the move
    switchPlayer();
  }

  // Ask if the player wants to play again
  if (playAgain()) {
    resetBoard(); // Reset the board for a new game
    isGameActive = true; // Restart the game
    console.clear();
    mainGame(); // Start the game again
  }
}

// ---------------------------------------------------------------------------------------------- 3. SUPPORTING FUNCTIONS

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X"; // Alternate between X and O
}

function resetBoard() {
  board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];
}

function playAgain() {
  let response;
  let errorShown = false; // Track if the error has been displayed

  // Display the question once
  process.stdout.write(chalk.blue.bold("\nDo you want to play again? (yes/no): "));

  // Loop until a valid input is provided
  while (true) {
    response = readlineSync.question("").toLowerCase();

    if (response === "yes" || response === "no") {
      break; // If valid input, exit the loop
    }

    // Clear the invalid input and show the error message only once
    if (!errorShown) {
      readline.moveCursor(process.stdout, -response.length, -1); // Move cursor up to the previous line
      readline.clearLine(process.stdout, 1); // Clear the current line from the cursor position
      console.log(chalk.red("Please answer 'yes' or 'no'."));
      errorShown = true; // Mark that the error has been shown
    }

    // Re-display the question
    process.stdout.write(chalk.blue.bold("Do you want to play again? (yes/no): "));
  }

  return response === "yes";
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
mainGame();
