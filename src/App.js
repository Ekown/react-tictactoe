import './App.css';
import React from 'react';
import Board from './components/board';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      locations: Array(1).fill({}),
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const locations = this.state.locations.slice(0, this.state.stepNumber + 1);

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    
    let row = Math.round(i / 3) + 1;
    let col = (i % 3) + 1;

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    locations[this.state.stepNumber] = {
      col: col,
      row: col >= 3 ? row - 1 : row,
    };

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      locations: locations,
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const locations = this.state.locations;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const status = winner ? 'Winner: ' + winner : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move # ${move} (col: ${locations[move - 1].col}, row: ${locations[move - 1].row})` : 'Go to game start';

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
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