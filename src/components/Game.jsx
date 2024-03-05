import Board from "./Board";
import GameInfo from "./GameInfo";
import MoveList from "./MoveList";
import { useGame } from "../hooks/useGame";
import { checkWinner } from "../lib/tic-tac-toe";

function status(squares, moveNumber) {
    const winner = checkWinner(squares);
    const nextMove = moveNumber % 2 === 0 ? "X" : "O";
    return winner
        ? `Winner: ${winner}`
        : `Next move: ${nextMove}`;
}

export default function Game() {
    const [gameState, handleSquareClick, handleHistoryClick] = useGame();
    const { moveNumber, history } = gameState;

    const currentSquares = history[moveNumber];

    return (
        <div className="game">
            <Board squares={currentSquares} onClick={handleSquareClick} />
            <GameInfo status={status(currentSquares, moveNumber)}>
                <MoveList history={history} onHistoryClick={handleHistoryClick} />
            </GameInfo>
        </div>
    );
}
