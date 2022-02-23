import React, { Component } from "react";
import ReactDOM from "react-dom";
import Board from "../../components/DotBox/board/board";
import NewGameForm from "../../components/DotBox/newGameForm/newGameForm"
import "../../../../assets/styles/css/dot-box/styles.css";

export default class Dotbox extends Component {
  constructor() {
    super();

    this.state = {
      whoseTurn: 0,
      humanPoints: 0,
      computerPoints: 0,
      isGameOver: false,
      showForm: false,
      boardSizeField: 10,
      boardSize: 10,
      gameId: 1
    };
  }

  chessClock = () => {
    return new Promise((resolve, reject) =>{
      this.setState((state, props) => {
        const newTurn = state.whoseTurn === 0 ? 1 : 0;
        return { whoseTurn: newTurn };
      }, ()=> {
        resolve(true);
      });
    });
  };

  addPoint = (player) => {
    if(player){
      this.setState((state, props) => {
        const newPoits = state.computerPoints + 1;
        return { computerPoints: newPoits };
      });
    }
    else{
      this.setState((state, props) => {
        const newPoits = state.humanPoints + 1;
        return { humanPoints: newPoits };
      });
    }
  };

  gameOverHandler = () => {
    this.setState({isGameOver: true});
  };

  showFormHandler = () => {
    this.setState({showForm: true});
  };

  boardSizeFieldChangeHandler = (e) => {
    let value = e.target.value;
    this.setState({boardSizeField: value});
  };

  newGameClickHandler = () => {
    this.setState((state) => {

      let size = this.state.boardSizeField;
      if(size > 20) {
        size = 20;
      }
      if(size < 5){
        size = 5
      }

      return {
        gameId: state.gameId + 1,
        boardSize: size,
        boardSizeField: size,
        showForm: false,
        isGameOver: false,
        humanPoints: 0,
        computerPoints: 0,
        whoseTurn: 0
      }
    });
  };

  render() {

    const boardStyle = {
      boxShadow: !this.state.isGameOver ? (this.state.whoseTurn ?
        "0px 5px 60px  rgba(255, 99, 71, 0.18), 0px 5px 20px  rgba(0, 0, 0, 0.18)" :
        "0px 5px 60px  rgba(173, 215, 229, 0.18), 0px 5px 20px  rgba(0, 0, 0, 0.18)") :
        "0px 5px 20px  rgba(0, 0, 0, 0.18)"
    }

    return (
      <div className="container">
        <div className="containerInner">
          <div className="boardLayer" style={boardStyle}>
            <Board
              key={this.state.gameId}
              boardSize={this.state.boardSize}
              whoseTurn={this.state.whoseTurn}
              chessClock={this.chessClock}
              addPoint={this.addPoint}
              isGameOver={this.state.isGameOver}
              gameOverHandler={this.gameOverHandler}
            />
          </div>
          <div className="infoBox">
            <div> { this.state.isGameOver ? "Minesweeper Over!" : (this.state.whoseTurn ? "Computer's Turn" :  "Human's Turn") } </div>
            <div> Human: {this.state.humanPoints} / Computer: {this.state.computerPoints} </div>
            <NewGameForm
              showForm={this.state.showForm}
              showFormButtonClick={this.showFormHandler }
              boardSize={this.state.boardSizeField}
              change={(e) => this.boardSizeFieldChangeHandler(e)}
              newGameButtonClick={this.newGameClickHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}
