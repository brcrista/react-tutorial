import { useState } from "react";
import { Board } from "./Board";

function winner(squares) {
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

    const nextPlayer = () => moveNumber % 2 === 0 ? "X" : "O";

    function handleClick(i) {
        const subhistory = history.slice(0, moveNumber + 1);
        const current = subhistory[subhistory.length - 1];
        const squares = current.squares.slice();

        if (squares[i] || winner(squares)) {
            return;
        }

        squares[i] = nextPlayer();0
        setHistory(subhistory.concat([{squares: squares}]));

        setMoveNumber(moveNumber + 1);
    }

    const current = history[moveNumber];

    const w = winner(current.squares);
    const status = w
        ? `Winner: ${w}`
        : `Next player: ${nextPlayer()}`;

    const description = i => i > 0
        ? `Go to move #${i}`
        : "Go to start";

    const moves = history.map((x, i) => {
        return (
            <li key={i.toString()}>
                <button onClick={() => setMoveNumber(i)}>{description(i)}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={current.squares} onClick={handleClick} />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}
