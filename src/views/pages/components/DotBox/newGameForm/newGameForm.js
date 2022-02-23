import React from "react";

const newGameForm = (props) => {
  return (
    <div className="newGameBox">
      {props.showForm ? (
          <>
            <span
            >
              <div style={{backgroundColor: "black", color: "white", borderRadius: "7px", padding: "4px"}}>
                Board Size:
              </div>
            </span>
            <input
              value={props.boardSize}
              onChange={props.change}
              min="5" max="20"
              type="number"
              style={{backgroundColor: "black", color: "white", borderRadius: "7px"}}
            />
            <button
              onClick={props.newGameButtonClick}
              style={{backgroundColor: "black", color: "white", borderRadius: "7px", padding: "4px", width: "60px"}}
            >
              Start
            </button>
          </>
        ) :
        (<div className="newGameBox">
          <button onClick={props.showFormButtonClick} style={{backgroundColor: "black", color: "white", borderRadius: "7px"}}>Try Again!!!</button>
        </div>)}
    </div>
  );
};


export default newGameForm;
