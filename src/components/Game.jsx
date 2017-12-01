import * as React from 'react';
import { Board } from './Board';

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

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            moveNumber: 0,
            xIsNext: true,
        };
    }

    nextPlayer() {
        return this.state.xIsNext ? 'X' : 'O';
    }

    handleClick(i) {
        const slicedHistory = this.state.history.slice(0, this.state.moveNumber + 1);
        const current = slicedHistory[slicedHistory.length - 1];
        const squares = current.squares.slice();

        if (squares[i] || winner(squares)) {
            return;
        }

        squares[i] = this.nextPlayer();
        this.setState({
            history: slicedHistory.concat([{squares: squares}]),
            moveNumber: this.state.moveNumber + 1,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(moveNumber) {
        this.setState({
            xIsNext: (moveNumber % 2) === 0,
            moveNumber: moveNumber,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.moveNumber];

        const w = winner(current.squares);
        const status = w ?
            `Winner: ${w}` :
            `Next player: ${this.nextPlayer()}`;

        const description = i => i > 0 ?
            `Go to move #${i}` :
            'Go to start';

        const moves = history.map((x, i) => {
            return (
                <li key={i.toString()}>
                    <button onClick={() => this.jumpTo(i)}>{description(i)}</button>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={i => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}