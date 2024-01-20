import { useState } from "react";
import { Board } from "./Board";
import { GameInfo } from "./GameInfo";

function checkWinner(squares) {
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

    for (const [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}

export function Game() {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [moveNumber, setMoveNumber] = useState(0);

    const nextMove = () => moveNumber % 2 === 0 ? "X" : "O";

    function handleSquareClick(i) {
        const subhistory = history.slice(0, moveNumber + 1);
        const currentGameState = subhistory[subhistory.length - 1];
        const squares = currentGameState.squares.slice();

        if (squares[i] || checkWinner(squares)) {
            return;
        }

        squares[i] = nextMove();
        setHistory(subhistory.concat([{ squares }]));
        setMoveNumber(moveNumber + 1);
    }

    const currentGameState = history[moveNumber];
    const winner = checkWinner(currentGameState.squares);
    const status = winner
        ? `Winner: ${winner}`
        : `Next move: ${nextMove()}`;

    return (
        <div className="game">
            <Board squares={currentGameState.squares} onClick={handleSquareClick} />
            <GameInfo status={status} history={history} setMoveNumber={setMoveNumber} />
        </div>
    );
}
