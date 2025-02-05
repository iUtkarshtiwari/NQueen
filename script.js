function createBoard(N, positions = []) {
    const chessboard = document.getElementById("chessboard");
    chessboard.innerHTML = "";
    chessboard.style.gridTemplateColumns = `repeat(${N}, 40px)`;
    chessboard.style.gridTemplateRows = `repeat(${N}, 40px)`;

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell", (i + j) % 2 === 0 ? "white" : "black");
            if (positions[i] === j) {
                cell.innerHTML = "♛";
                cell.classList.add("queen");
            }
            chessboard.appendChild(cell);
        }
    }
}

function isSafe(board, row, col, N) {
    for (let i = 0; i < row; i++) {
        if (board[i] === col || Math.abs(board[i] - col) === Math.abs(i - row)) {
            return false;
        }
    }
    return true;
}

function solveNQueensUtil(board, row, N) {
    if (row === N) return true;

    for (let col = 0; col < N; col++) {
        if (isSafe(board, row, col, N)) {
            board[row] = col;
            if (solveNQueensUtil(board, row + 1, N)) return true;
            board[row] = -1;
        }
    }
    return false;
}

function solveNQueens() {
    const N = parseInt(document.getElementById("boardSize").value);
    if (N < 4) {
        alert("N must be at least 4.");
        return;
    }

    const board = new Array(N).fill(-1);
    if (solveNQueensUtil(board, 0, N)) {
        createBoard(N, board);
    } else {
        alert("No solution found.");
    }
}
