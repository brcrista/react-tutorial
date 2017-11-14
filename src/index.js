import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function Board(props) {
    const renderSquare = i => {
        return (
            <Square
                value={props.squares[i]}
                onClick={() => props.onClick(i)}
            />
        );
    };

    return (
        <div>
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

class Game extends React.Component {
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

    current() {
        const history = this.state.history;
        return history[history.length - 1];
    }

    handleClick(i) {
        const squares = this.current().squares.slice();

        if (squares[i] || winner(squares)) {
            return;
        }

        squares[i] = this.nextPlayer();
        this.setState({
            history: this.state.history.concat([{squares: squares}]),
            moveNumber: this.state.moveNumber + 1,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(moveNumber) {
        this.setState({
            history: this.state.history.slice(0, moveNumber + 1),
            xIsNext: (moveNumber % 2) === 0,
            moveNumber: moveNumber,
        });
    }

    render() {
        const w = winner(this.current().squares);
        const status = w ?
            `Winner: ${w}` :
            `Next player: ${this.nextPlayer()}`;

        const description = i => i > 0 ?
            `Go to move #${i}` :
            'Go to start';

        const moves = this.state.history.map((x, i) => {
            return (
                <li key={i.toString()}>
                    <button onClick={() => this.jumpTo(i)}>{description(i)}</button>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={this.current().squares} onClick={i => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

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

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
