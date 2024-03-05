import { useReducer } from "react";
import { checkWinner } from "../lib/tic-tac-toe";

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

export function useGame() {
    const initialState = {
        moveNumber: 0,
        history: [Array(9).fill(null)],
    };

    const [gameState, dispatch] = useReducer(gameReducer, initialState);
    const handleSquareClick = squareIndex => dispatch({ type: "square_click", squareIndex });
    const handleHistoryClick = moveNumber => dispatch({ type: "history_click", moveNumber });
    return [gameState, handleSquareClick, handleHistoryClick];
}
