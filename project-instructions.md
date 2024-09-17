# Project: Terminal-Based Tic-Tac-Toe Game in JavaScript

#### Objective

Your goal is to create a text-based Tic-Tac-Toe game that can be played in the terminal. The game should be for two players and allow them to take turns to place their marker ('X' or 'O') on a 3x3 board.

#### Features and Requirements

1. **Board Representation**: The board is a 3x3 grid. You can represent this in a variety of ways (e.g., 2D array, single array with mapping logic, etc.).
2. **User Interaction**: Use an npm package like `prompt-sync` to interact with the user. Players should be prompted to enter their move in the format "row column" (e.g., "1 1" for the top-left corner).
3. **Marker Assignment**: Assign one marker ('X') to Player 1 and the other marker ('O') to Player 2.
4. **Turn Management**: Players take turns placing their marker on an empty cell on the board.
5. **Move Validation**: Ensure the move is valid (i.e., within board limits and on an empty cell).
6. **Winning Condition**: Check for a winning condition after every move. A player wins if they have three of their markers in a row, column, or diagonal.
7. **Draw Condition**: The game should end in a draw if the board is filled and no one wins.
8. **Game Status**: After each move, display the board and any relevant messages (e.g., "Player 1 wins!").
9. **End Game**: Offer an option to restart the game or quit after a game ends.

#### Optional Features

1. **Player Names**: Allow players to enter their names at the start of the game.
2. **Score Tracking**: Keep track of the number of games each player has won during the session.
3. **AI Opponent**: Implement an option for one player to play against the computer.

#### Technical Notes

- You're only allowed to use plain JavaScript and the terminal for this project.
- Use an npm package like `prompt-sync` to gather user input. Install this package using npm.

#### Example

```
Welcome to Tic-Tac-Toe!

Current Board:
- - -
- - -
- - -

Player 1 (X), it's your turn.
Enter your move (row column): 1 1

Current Board:
X - -
- - -
- - -

Player 2 (O), it's your turn.
Enter your move (row column): 2 2

Current Board:
X - -
- O -
- - -

[...]
```
