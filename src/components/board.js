import React from 'react';
import Square from './square';
import BoardRow from './board-row';

export default class Board extends React.Component {
    render() {
        let arBoardRows = [];

        for (let i = 0; i < 3; i++) {
            let arRenderSquares = [];
            let intStart = i * 3;

            for (let j = intStart; j < intStart + 3; j++) {
                arRenderSquares.push(
                    <Square
                        key={j}
                        value={this.props.squares[j]}
                        onClick={() => this.props.onClick(j)}
                        isWinning={this.props.winner && this.props.winner.includes(j) ? 'is-winning' : '' }
                    />
                );
            }

            arBoardRows.push(
                <BoardRow key={i} squares={arRenderSquares} />
            );
        }

        return (
            <div>
                {arBoardRows}
            </div>
        );
    }
}