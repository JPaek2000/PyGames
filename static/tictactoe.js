document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const result = document.getElementById('result');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                return gameBoard[a];
            }
        }

        if (!gameBoard.includes('')) {
            gameActive = false;
            return 'Tie';
        }

        return null;
    }

    function handleCellClick(index) {
        if (gameBoard[index] || !gameActive) return;

        gameBoard[index] = currentPlayer;
        renderBoard();
        
        const winner = checkWinner();
        if (winner) {
            if (winner === 'Tie') {
                result.textContent = 'It\'s a tie!';
            } else {
                result.textContent = `${winner} wins!`;
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function renderBoard() {
        board.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 3; j++) {
                const index = i * 3 + j;
                const cell = document.createElement('td');
                cell.textContent = gameBoard[index];
                cell.addEventListener('click', () => handleCellClick(index));
                row.appendChild(cell);
            }
            board.appendChild(row);
        }
    }

    window.resetGame = function() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        result.textContent = '';
        renderBoard();
    };

    renderBoard();
});