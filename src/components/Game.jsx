import { useReducer } from "react";
import Board from "./Board";
import GameInfo from "./GameInfo";

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

    function winner([i, j, k]) {
        const allSame = squares[i] === squares[j] && squares[j] === squares[k];
        const player = squares[i];
        return allSame && player;
    }

    return lines.map(winner).find(x => x) || null;
}

function gameReducer(state, action) {
    switch (action.type) {
        case "history_click":
            return {
                ...state,
                moveNumber: action.moveNumber
            };
        case "square_click": {
            const { moveNumber, history } = state;
            const currentSquares = history[moveNumber];

            const isOccupied = !!currentSquares[action.squareIndex];
            const isGameOver = checkWinner(currentSquares);
            if (isOccupied || isGameOver) {
                return state;
            }

            // Break off history from the point currently being shown.
            // This may not be the latest move if a "Go to ..." button was clicked.
            const newHistory = history.slice(0, moveNumber + 1);
            const newSquares = [...currentSquares];
            newHistory.push(newSquares);

            // Update the square with the next move.
            const nextMove = moveNumber % 2 === 0 ? "X" : "O";
            newSquares[action.squareIndex] = nextMove;

            return {
                moveNumber: state.moveNumber + 1,
                history: newHistory
            };
        }
        default:
            return state;
    }
}

export default function Game() {
    const initialState = {
        moveNumber: 0,
        history: [Array(9).fill(null)],
    };
    const [state, dispatch] = useReducer(gameReducer, initialState);
    const { moveNumber, history } = state;

    const currentSquares = history[moveNumber];
    const winner = checkWinner(currentSquares);
    const nextMove = moveNumber % 2 === 0 ? "X" : "O";
    const status = winner
        ? `Winner: ${winner}`
        : `Next move: ${nextMove}`;


    const handleSquareClick = squareIndex => dispatch({ type: "square_click", squareIndex });
    const handleHistoryClick = moveNumber => dispatch({ type: "history_click", moveNumber });

    return (
        <div className="game">
            <Board squares={currentSquares} onClick={handleSquareClick} />
            <GameInfo status={status} history={history} onHistoryClick={handleHistoryClick} />
        </div>
    );
}
