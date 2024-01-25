import MoveList from "./MoveList";

export default function GameInfo({ status, history, onHistoryClick }) {
    return (
        <div className="game-info">
            <div>{status}</div>
            <MoveList history={history} onHistoryClick={onHistoryClick} />
        </div>
    );
}
