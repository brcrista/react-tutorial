export default function GameInfo({ status, children }) {
    return (
        <div className="game-info">
            <div>{status}</div>
            {children}
        </div>
    );
}
