# Tic-Tac-Py

A terminal Tic-Tac-Toe game in Python. Play against a friend or against a rule-based computer opponent.

## Features

- **Two modes:** Player vs. Player, and Player vs. Computer.
- **Rule-based computer opponent.** On each turn the computer:
  1. takes a winning move if it has one,
  2. otherwise blocks a move that would let you win,
  3. otherwise picks the first free cell in this order: corners, then the center, then the edges.
- **Colored board** using `termcolor`: `X` is red and `O` is blue.
- **Automatic win and draw detection** across all rows, columns and diagonals.

## Requirements

- Python 3
- [`termcolor`](https://pypi.org/project/termcolor/)
- Windows. The game clears the screen with the `cls` command. On Linux or macOS, change the `os.system('cls')` calls to `os.system('clear')`.

## Getting Started

```bash
git clone https://github.com/sedwna/Tic-Tac-Py.git
cd Tic-Tac-Py
pip install termcolor
python src/main.py
```

## How to Play

Pick an option from the main menu:

```
1.Start with friend
2.Start with computer
3.exit
```

The board cells are numbered 1 to 9. To place your mark, type the number of a free cell:

```
[1] [2] [3]

[4] [5] [6]

[7] [8] [9]
```

- In **Player vs. Player** mode, Player 1 is `X` and Player 2 is `O`.
- In **Player vs. Computer** mode, you are `X` and move first. The computer is `O`.
- You win by getting three of your marks in a row, column or diagonal. If all nine cells fill up with no winner, the game prints `Equal.` (a draw).

## Project Structure

```
Tic-Tac-Py/
├── src/
│   └── main.py   # Game logic, computer opponent and menu
└── README.md
```

Main functions in `src/main.py`:

| Function | Purpose |
| --- | --- |
| `menu()` | Shows the main menu and starts the selected mode |
| `start_duel()` | Runs a Player vs. Player game |
| `start_AI()` | Runs a Player vs. Computer game |
| `plyer_move(num, shape)` | Reads and validates a player's move |
| `computer_move()` | Chooses the computer's move (win, block, then corner/center/edge) |
| `check_board(plyr)` | Checks whether a player has three in a row |
| `print_board()` | Clears the screen and draws the colored board |

## Tech Stack

- Python 3
- `termcolor` for colored terminal output
