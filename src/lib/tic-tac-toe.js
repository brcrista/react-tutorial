export function checkWinner(squares) {
    const lines = [
        // rows
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // diagonals
        [0, 4, 8],
        [2, 4, 6],
    ];

    function winner([i, j, k]) {
        const allSame = squares[i] === squares[j] && squares[j] === squares[k];
        const player = squares[i];
        return allSame && player;
    }

    return lines.map(winner).find(x => x) || null;
}
