import React from "react";
import ReactDOM from "react-dom";

import "../../../../assets/styles/css/tiles/tiles.css";

export default class Tiles extends React.Component {
  winningSituation = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    ""
  ].join("-");

  state = {
    board: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""].sort(
      () => Math.random() * 2 - 1
    ),
    selected: undefined,
    freeCell: undefined,
    finish: undefined
  };

  getBoardAsMatrix() {
    let boardNew = [...this.state.board];
    let arr = [];
    for (let i = 0; i < 4; i++) {
      let cutted = boardNew.splice(0, 4);
      arr.push(cutted);
    }
    return arr;
  }

  //funzione map
  moveElement(num) {
    this.setState({
      board: this.state.board.map(el => {
        if (el === num) {
          return "";
        } else if (el === "") {
          return num;
        } else {
          return el;
        }
      })
    });
    this.checkIfWin();
  }

  //funzione matrice

  getByXY(x, y) {
    const matrix = this.getBoardAsMatrix();
    if (!matrix[x]) return false;
    return matrix[x][y];
  }

  isCellEmpty(x, y) {
    return this.getByXY(x, y) === "";
  }

  cellClick(cell, x, y) {
    if (
      this.isCellEmpty(x + 1, y) ||
      this.isCellEmpty(x - 1, y) ||
      this.isCellEmpty(x, y + 1) ||
      this.isCellEmpty(x, y - 1)
    ) {
      this.moveElement(cell);
    }
  }

  checkIfWin() {
    if (this.winningSituation === this.state.board.join("-")) {
      this.setState({
        finish: "You Win"
      });
    }
  }

  render() {
    return (
      <div style={{display: "flex", justifyContent: "center"}}>
        <div className="container-square" style={{cursor: "pointer"}}>
          <div>
            <h1 style={{fontSize: "70px", marginBottom: "22px"}}>Tiles 16</h1>
          </div>
          {this.getBoardAsMatrix().map((row, x) => (
            <div className="row-box-x" key={x}>
              {row.map((cell, y) => (
                <div
                  key={cell}
                  className="square-x"
                  style={{
                    opacity: this.state.selected === cell ? 0.5 : 1
                  }}
                  onClick={() => this.cellClick(cell, x, y)}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
          <div>{this.state.finish && <h2>Vinto</h2>}</div>
        </div>
      </div>
    );
  }
}
