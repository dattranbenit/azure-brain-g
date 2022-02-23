// I think I need to work with promises or something......

import React, { Component } from "react";
import Dot from "./dot";
import Hbar from "./hbar";
import Vbar from "./vbar";
import Square from "./square";
import { getRandomInt } from "../common/functions";

class barObj {
  constructor(x1, y1, x2, y2, bartype) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.bartype = bartype;
    this.filled = false;
  }
}

class squareObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.filled = false;
    this.filledBy = null;
  }
}

class Board extends Component {

  timeOut = 10;

  constructor(props) {
    super(props);

  

    const bars = {};
    const squares = {};

    for (let y = 0; y < props.boardSize; y++) {
      for (let x = 0; x < props.boardSize; x++) {

        const withinXdimension = x < props.boardSize - 1;
        const withinYdimension = y < props.boardSize - 1;

        if (withinXdimension) {
          bars[x + "-" + y + "_" + (x + 1) + "-" + y] = new barObj(x,y,x+1,y,"h");
        } //hbar
        if (withinYdimension) {
          bars[x + "-" + y + "_" + x + "-" + (y + 1)] = new barObj(x,y,x,y+1,"v");
        } //vbar
        if (withinXdimension && withinYdimension){
          squares[x + "-" + y] = new squareObj(x, y);
        }
       
      }
    }

    this.state = {
      dimension: props.boardSize,
      whoseTurn: 0,
      lastBar: null,
      bars: bars,
      squares: squares
    };
  }

  fillABar = address => {
    const bar = { ...this.state.bars[address]
    };
    bar.filled = true;
    const bars = { ...this.state.bars
    };
    bars[address] = bar;
    this.setState({
      lastBar: address,
      bars: bars
    }, () => {});
    return this.fillSquares(this.squaresCompleted(this.state.bars, address));
  };

  fillSquares = addresses => {
    let wasASquareFilled = false;
    const squares = { ...this.state.squares};
    addresses.forEach(address => {
      squares[address.filladdress].filled = true;
      squares[address.filladdress].filledBy = this.props.whoseTurn;
      this.props.addPoint(this.props.whoseTurn);
      wasASquareFilled = true;
    });
    this.setState({
      squares: squares
    });
    return wasASquareFilled;
  };

  checkNeighbor = (bars, address, neighbor) => {
    const b = bars[address];
    const checkbar = (neighbor => {
      if (neighbor === "t") {
        //top
        return b.x1 + "-" + (b.y1 - 1) + "_" + b.x2 + "-" + (b.y2 - 1);
      } else if (neighbor === "b") {
        //bottom
        return b.x1 + "-" + (b.y1 + 1) + "_" + b.x2 + "-" + (b.y2 + 1);
      } else if (neighbor === "l") {
        //lett
        return b.x1 - 1 + "-" + b.y1 + "_" + (b.x2 - 1) + "-" + b.y2;
      } else if (neighbor === "r") {
        //right
        return b.x1 + 1 + "-" + b.y1 + "_" + (b.x2 + 1) + "-" + b.y2;
      } else if (neighbor === "tl") {
        //top-left
        return b.x1 + "-" + (b.y1 - 1) + "_" + (b.x2 - 1) + "-" + b.y2;
      } else if (neighbor === "tr") {
        //top-left
        return b.x1 + 1 + "-" + (b.y1 - 1) + "_" + b.x2 + "-" + b.y2;
      } else if (neighbor === "bl") {
        //bottom-left
        return b.x1 + "-" + b.y1 + "_" + (b.x2 - 1) + "-" + (b.y2 + 1);
      } else if (neighbor === "br") {
        //bottom-right
        return b.x1 + 1 + "-" + b.y1 + "_" + b.x2 + "-" + (b.y2 + 1);
      } else if (neighbor === "rt") {
        //right-top
        return b.x1 + "-" + b.y1 + "_" + (b.x2 + 1) + "-" + (b.y2 - 1);
      } else if (neighbor === "rb") {
        //right-bottom
        return b.x1 + "-" + (b.y1 + 1) + "_" + (b.x2 + 1) + "-" + b.y2;
      } else if (neighbor === "lt") {
        //left-top
        return b.x1 - 1 + "-" + b.y1 + "_" + b.x2 + "-" + (b.y2 - 1);
      } else if (neighbor === "lb") {
        //left-bottom
        return b.x1 - 1 + "-" + (b.y1 + 1) + "_" + b.x2 + "-" + b.y2;
      }
    })(neighbor);

    if (bars.hasOwnProperty(checkbar)) {
      return bars[checkbar].filled;
    } else {
      return false;
    }
  };

  checkSquare = (bars, address, whichSquare) => {
    const data = ((address, whichSquare) => {
      const b = bars[address];
      if (whichSquare === "top") {
        return {
          neighbors: ["tl", "tr", "t"],
          fillAddress: b.x1 + "-" + (b.y1 - 1)
        };
      } else if (whichSquare === "bottom") {
        return {
          neighbors: ["bl", "br", "b"],
          fillAddress: b.x1 + "-" + b.y1
        };
      } else if (whichSquare === "left") {
        return {
          neighbors: ["lt", "lb", "l"],
          fillAddress: b.x1 - 1 + "-" + b.y1
        };
      } else if (whichSquare === "right") {
        return {
          neighbors: ["rt", "rb", "r"],
          fillAddress: b.x1 + "-" + b.y1
        };
      }
    })(address, whichSquare);

    const howManyNeighbors =
      this.checkNeighbor(bars, address, data.neighbors[0]) +
      this.checkNeighbor(bars, address, data.neighbors[1]) +
      this.checkNeighbor(bars, address, data.neighbors[2]);
    if (howManyNeighbors === 3) {
      return {
        result: "fill",
        number: 3,
        filladdress: data.fillAddress
      };
    } else if (howManyNeighbors === 2) {
      return {
        result: "nearfill",
        number: 2
      };
    } else if (howManyNeighbors === 1) {
      return {
        result: "nearnearfill",
        number: 1
      };
    } else if (!howManyNeighbors) {
      return {
        result: "lonely",
        number: 0
      };
    }
  };

  squaresCompleted = (bars, address) => {
    const bartype = bars[address].bartype;
    if (bartype === "h") {
      const top = this.checkSquare(bars, address, "top");
      const bottom = this.checkSquare(bars, address, "bottom");
      const returnSquares = [];
      if (top.number === 3) returnSquares.push(top);
      if (bottom.number === 3) returnSquares.push(bottom);
      return returnSquares;
    } else if (bartype === "v") {
      const left = this.checkSquare(bars, address, "left");
      const right = this.checkSquare(bars, address, "right");
      const returnSquares = [];
      if (left.number === 3) returnSquares.push(left);
      if (right.number === 3) returnSquares.push(right);
      return returnSquares;
    }
  };

  isTheGameOver = (squares) => {
    let filledArray = Object.keys(squares).map((address, index) => { 
      return squares[address].filled
     });

     const allFilled = filledArray.every((square) => square);
     return allFilled;
  };

  oppAssessMove = bars => {
    const moves = {
      twoSquareMoves: [],
      oneSquareMoves: [],
      nearSquares: [],
      safeMoves: []
    };
    Object.keys(bars).map((address, index) => {
      const barObj = bars[address];
      if (!barObj.filled) {
        if (barObj.bartype === "h") {
          const top = this.checkSquare(bars, address, "top");
          const bottom = this.checkSquare(bars, address, "bottom");
          if (top.number === 3 && bottom.number === 3) {
            moves.twoSquareMoves.push(address);
          } else if (top.number === 3 || bottom.number === 3) {
            moves.oneSquareMoves.push(address);
          } else if (top.number === 2 || bottom.number === 2) {
            moves.nearSquares.push(address);
          } else if (top.number < 2 && bottom.number < 2) {
            moves.safeMoves.push(address);
          }
        } else if (barObj.bartype === "v") {
          const left = this.checkSquare(bars, address, "left");
          const right = this.checkSquare(bars, address, "right");
          if (left.number === 3 && right.number === 3) {
            moves.twoSquareMoves.push(address);
          } else if (left.number === 3 || right.number === 3) {
            moves.oneSquareMoves.push(address);
          } else if (left.number === 2 || right.number === 2) {
            moves.nearSquares.push(address);
          } else if (left.number < 2 && right.number < 2) {
            moves.safeMoves.push(address);
          }
        }
      } //if bar is not filled
    });
    console.log(moves);
    let whereToMove = null;
    if (moves.twoSquareMoves.length) {
      whereToMove = moves.twoSquareMoves[0];
    } else if (moves.oneSquareMoves.length) {
      whereToMove = moves.oneSquareMoves[0];
    } else if (moves.safeMoves.length) {
      whereToMove = moves.safeMoves[getRandomInt(moves.safeMoves.length)];
    } else if (moves.nearSquares.length) {
      console.log("there's nothing to be done but give human a square to fill");
      const scoresOfMoves = {};
      moves.nearSquares.forEach(address => {
        const newBars = JSON.parse(JSON.stringify(bars));
        newBars[address].filled = true;
        scoresOfMoves[address] = this.oppAssessMove_looper(newBars);
      });

      let arrayOfScoresOfMoves = Object.keys(scoresOfMoves).map(address => {
        return [address, scoresOfMoves[address]];
      });

      console.log(arrayOfScoresOfMoves);

      arrayOfScoresOfMoves.sort((a, b) => a[1] - b[1]);

      whereToMove = arrayOfScoresOfMoves[0][0];
    }

    return this.fillABar(whereToMove);

  };

  oppAssessMove_looper = bars => {
    let iterations = 0;
    const loop = bars => {
      const newBars = bars;
      const oneSquareMoves = [];
      const twoSquareMoves = [];
      Object.keys(newBars).map((address, index) => {
        const barObj = newBars[address];
        if (!barObj.filled) {
          if (barObj.bartype === "h") {
            const top = this.checkSquare(newBars, address, "top");
            const bottom = this.checkSquare(newBars, address, "bottom");
            if (top.number === 3 && bottom.number === 3 ){
               twoSquareMoves.push(address);
            }
            else if (top.number === 3 || bottom.number === 3) {
              oneSquareMoves.push(address);
            }
          } else if (barObj.bartype === "v") {
            const left = this.checkSquare(newBars, address, "left");
            const right = this.checkSquare(newBars, address, "right");
            if (left.number === 3 && right.number === 3 ){
              twoSquareMoves.push(address);
            }
            else if (left.number === 3 || right.number === 3) {
              oneSquareMoves.push(address);
            }
          }
        }
      });
      if(twoSquareMoves.length > 0) {
        newBars[twoSquareMoves[0]].filled = true;
        iterations += 2;
        loop(newBars);
      }
      else if (oneSquareMoves.length > 0) {
        newBars[oneSquareMoves[0]].filled = true;
        iterations++;
        loop(newBars);
      }
    };
    loop(bars);
    return iterations;
  };

  humanFilledSquareCascade = bars => {
    return new Promise(resolve => {
      let hit = false;
      Object.keys(bars).map((address, index) => {
        const barObj = bars[address];
        if (!barObj.filled) {
          if (barObj.bartype === "h") {
            const top = this.checkSquare(bars, address, "top");
            const bottom = this.checkSquare(bars, address, "bottom");
            if (top.number === 3 || bottom.number === 3) {
              hit = address;
            }
          } else if (barObj.bartype === "v") {
            const left = this.checkSquare(bars, address, "left");
            const right = this.checkSquare(bars, address, "right");
            if (left.number === 3 || right.number === 3) {
              hit = address;
            }
          }
        }
      });
      if (hit) {
        resolve(this.fillABar(hit));
      } else {
        resolve(false);
      }
    })

  };

  humanMoveMaker = address => {
    if(!this.isTheGameOver(this.state.squares)){ 
    if (!this.props.whoseTurn) { //human's move
      if (address) {
        if (!this.state.bars[address].filled) {
          const filledSquares = this.fillABar(address);
          if (filledSquares) {
            setTimeout(()=> this.humanMoveMaker(), this.timeOut); 
          } //if squares were filled
           else {
            this.props.chessClock().then((result) => {
              setTimeout(()=> this.computerMoveMaker(), this.timeOut);  
            });
          }
        } // if not filled
      } //if address
       else {
        this.humanFilledSquareCascade(this.state.bars).then((result) => {
          if(result) {
            setTimeout(()=> this.humanMoveMaker(), this.timeOut); 
          }

        });
      }
    }
  }
  else {
    this.props.gameOverHandler();
  }
  };

computerMoveMaker = () => {
  if(!this.isTheGameOver(this.state.squares)){ 
  let filledSquares = this.oppAssessMove(this.state.bars);
  if (filledSquares) {
   
    setTimeout(()=> this.computerMoveMaker(), this.timeOut); 

  } else {
    this.props.chessClock();
  }
}
else {
  this.props.gameOverHandler();
}
};


componentDidUpdate(prevProps) {
  //check if the game is over
}



squareStyleLookup = address => {
  const square = this.state.squares[address];
  let color = "tranparent";
  if (square.filled) {
    color = square.filledBy ? "tomato" : "lightblue";
  }

  const style = {
    background: color
  };
  return style;
};

render() {
  const boardStyle = {
    cursor: this.props.whoseTurn ? 'not-allowed' : 'pointer'
  };
  const boardArray = [];
  for (let y = 0; y < this.props.boardSize; y++) {
    boardArray.push(
      (() => {
        const hrow = [];
        for (let x = 0; x < this.props.boardSize; x++) {
          const address = x + "-" + y + "_" + (x + 1) + "-" + y;
          hrow.push( <>
            <Dot /> {
              x < this.props.boardSize - 1 ? (
                <Hbar 
                  address = {address}
                  click = {this.humanMoveMaker}
                  whoseTurn = {this.props.whoseTurn}
                  filled = {this.state.bars[address].filled} 
                  lastBar = {this.props.isGameOver ? null: this.state.lastBar}
                />
              ) : null
            } </>
          );
        }
        return (
                <div 
                  className = "row hrow" 
                  key = {"hrow" + y} >
                  {hrow} 
                </div>
        );
      })()
    );
    if (y < this.props.boardSize - 1) {
      boardArray.push(
        (() => {
          const vrow = [];
          for (let x = 0; x < this.props.boardSize; x++) {
            const address = x + "-" + y + "_" + x + "-" + (y + 1);
            const squareAddress = x + "-" + y;
            vrow.push(
              <>
              <Vbar address = {address}
                    click = {this.humanMoveMaker}
                    whoseTurn = {this.props.whoseTurn}
                    filled = {this.state.bars[address].filled} 
                    lastBar = {this.props.isGameOver ? null : this.state.lastBar}
                    /> 
              {x < this.props.boardSize - 1 ? ( 
              <Square address = {squareAddress}
                    style = {this.squareStyleLookup(squareAddress)}
                    />) : null} 
              </>
            );
          }
          return ( <div 
                    className = "row vrow"
                    key = {"vrow" + y} > 
                    {vrow} 
                    </div>
          );
        })()
      );
    }
  }
  return <div style = {boardStyle}  class="board"> {boardArray} </div>;
}
}

export default Board;
