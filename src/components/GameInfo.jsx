export function GameInfo({ status, history, setMoveNumber }) {
    const description = i => i > 0
        ? `Go to move #${i}`
        : "Go to start";

    const moves = history.map((_, i) => {
        return (
            <li key={i.toString()}>
                <button onClick={() => setMoveNumber(i)}>{description(i)}</button>
            </li>
        );
    });

    return (
        <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
        </div>
    );
}
