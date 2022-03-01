import './App.css';
import React from 'react';
import Board from './components/board';
import Move from './components/move';
import Sort from './components/sort';

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
      sort: 'asc',
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

  sortMoveList(sort) {
    this.setState({
      sort: sort === 'Ascending' ? 'asc' : 'desc',
    });
  }

  render() {
    const history = this.state.history;
    const locations = this.state.locations;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const status = winner ? 'Winner: ' + current.squares[winner[0]] : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    const sort = this.state.sort === 'asc' ? 'Descending' : 'Ascending';

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move # ${move} (col: ${locations[move - 1].col}, row: ${locations[move - 1].row})` : 'Go to game start';

      return (
        <Move 
          key={move}
          desc={desc} 
          isSelected={move === this.state.stepNumber}
          onClick={() => this.jumpTo(move)}
        />
      );
    });

    if (sort === 'Descending') {
      moves.sort((a, b) => {
        if (a.key > b.key) {
            return 1;
        }
    
        if (a.key < b.key) {
            return -1;
        }
    
        return 0;
      });
    } else {
      moves.sort((a, b) => {
        if (a.key < b.key) {
            return 1;
        }
    
        if (a.key > b.key) {
            return -1;
        }
    
        return 0;
      });
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            winner={winner ? winner : []}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div className="move-list">
            <span>Move List: <Sort desc={sort} onClick={() => this.sortMoveList(sort)}/></span>
            <ol>{moves}</ol>
          </div>
          
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
      return [a, b, c];
    }
  }
  return null;
}