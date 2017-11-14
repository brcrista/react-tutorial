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

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    nextPlayer() {
        return this.state.xIsNext ? 'X' : 'O';
    }

    handleClick(i) {
        const squares = this.state.squares.slice();

        if (squares[i] || winner(squares)) {
            return;
        }

        squares[i] = this.nextPlayer();
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const w = winner(this.state.squares);

        const status = (() => {
            if (w) {
                return `Winner: ${w}`;
            } else {
                return `Next player: ${this.nextPlayer()}`;
            }
        })();

        const renderSquare = (i) => {
            return (
                <Square
                    value={this.state.squares[i]}
                    onClick={() => this.handleClick(i)}
                />
            );
        };

        return (
            <div>
                <div className="status">{status}</div>
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
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{ /* TODO status */}</div>
                    <ol>{ /* TODO */}</ol>
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
