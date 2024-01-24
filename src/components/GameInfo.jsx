export function GameInfo({ status, moves }) {
    return (
        <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
        </div>
    );
}
