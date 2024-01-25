export default function MoveList({ history, onHistoryClick }) {
    const moves = history.map((_, i) => {
        const description = i > 0
            ? `Go to move #${i}`
            : "Go to start";

        return (
            <li key={i.toString()}>
                <button onClick={() => onHistoryClick(i)}>{description}</button>
            </li>
        );
    });

    return (
        <ol>{moves}</ol>
    );
}
