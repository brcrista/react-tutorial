import Square from "./Square";

export default function Board({ squares, onClick }) {
    const renderSquare = i => (
        <Square
            value={squares[i]}
            onClick={() => onClick(i)}
        />
    );

    return (
        <div className="game-board">
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}
