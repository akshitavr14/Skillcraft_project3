let currentPlayer = 'X';
let board = ["", "", "", "", "", "", "", "", ""];
let mode = 'player';
let gameActive = true;
let xWins = 0;
let oWins = 0;

function setMode(selectedMode) {
  mode = selectedMode;
  restartGame();
}

function handleClick(index) {
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  updateBoard();

  if (checkWin()) {
    document.getElementById("status").innerText = `${currentPlayer} wins! 🎉`;
    updateWinCount(currentPlayer);
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    document.getElementById("status").innerText = "It's a draw! 🤝";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  if (mode === 'computer' && currentPlayer === 'O') {
    setTimeout(computerMove, 500);
  }

  updateStatus();
}

function computerMove() {
  let emptyIndexes = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
  if (emptyIndexes.length === 0) return;
  let randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  handleClick(randomIndex);
}

function checkWin() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function updateBoard() {
  document.querySelectorAll(".cell").forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

function updateStatus() {
  document.getElementById("status").innerText = `Current Turn: ${currentPlayer}`;
}

function updateWinCount(player) {
  if (player === 'X') {
    xWins++;
    document.getElementById("xWins").innerText = xWins;
  } else {
    oWins++;
    document.getElementById("oWins").innerText = oWins;
  }
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 'X';
  gameActive = true;
  updateBoard();
  updateStatus();
}
