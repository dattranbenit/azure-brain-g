import React, { Component } from 'react';
import Cell from './Cell';
import '../../../../assets/styles/css/light-out/Board.css';

/** Minesweeper board of Lights out */

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5
    // chanceLightStartsOn: 4
  };

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
    this.flipCellsAroundMe = this.flipCellsAroundMe.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.randomMove = this.randomMove.bind(this);
    this.handleRandomMoves = this.handleRandomMoves.bind(this);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  createBoard() {
    let board = [];
    for (let i = 0; i < this.props.nrows; i++) {
      // let col = Array.from({ length: this.props.ncols });
      let col = Array.from({ length: this.props.ncols }, () =>
        Math.floor(Math.random() * 10) < this.props.chanceLightStartsOn ? true : false
      );
      board.push(col);
    }

    return board;
  }

  randomMove() {
    let guess = Math.floor(Math.random() * this.props.nrows); // value from 0 to 4
    let guess_2 = Math.floor(Math.random() * this.props.ncols); // value from 0 to 4

    this.flipCellsAroundMe(`${guess}-${guess_2}`);
  }

  handleRandomMoves() {
    const numOfMoves = Math.floor(Math.random() * 5) + 3; // number of moves when game starts
    for (let i = 0; i < numOfMoves; i++) {
      this.randomMove();
    }
  }

  /** handle changing a cell: update board & determine if winner */
  flipCellsAroundMe(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split('-').map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    // Flipping Cells
    flipCell(y, x); // self
    flipCell(y, x - 1); // left
    flipCell(y - 1, x); // top
    flipCell(y, x + 1); // right
    flipCell(y + 1, x); // bottom

    let hasWon = board.toString().includes('true') ? false : true;

    // ** 2nd solution **
    // let hasWon = board.every(arr => arr.every(cell => cell === false));

    this.setState({ board, hasWon });
  }

  playAgain() {
    this.handleRandomMoves();
    this.setState({ hasWon: false });
  }

  componentDidMount() {
    this.handleRandomMoves();
  }

  render() {
    let table;

    if (!this.state.hasWon) {
      table = (
        <div>
          {/*<h1 className="Board-h1">*/}
          {/*  LIGHTS <span className="Board-h1--2nd">OUT</span>*/}
          {/*</h1>*/}
          <h1 style={{fontSize: "50px", marginBottom: "20px", fontWeight: "bold"}}>Light Out</h1>
          <div style={{marginBottom: "20px"}}>
            Game from the 80s, Turn off all the lights , then U gonna win
          </div>
          <table className="Board">
            <tbody>
            {this.state.board.map((arr, idx) => (
              <tr key={idx}>
                {arr.map((cell, i) => (
                  <Cell
                    isLit={cell}
                    key={`${idx}-${i}`}
                    coords={`${idx}-${i}`}
                    flipCellsAroundMe={this.flipCellsAroundMe}
                  />
                ))}
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      table = (
        <div>
          <p className="Board-h1">
            YOO <span className="Board-h1--2nd">WIN</span>
          </p>
          <button className="Board-btn" onClick={this.playAgain}>
            PLAY AGAIN ?
          </button>
        </div>
      );
    }

    return <div>{table}</div>;
  }
}

export default Board;
