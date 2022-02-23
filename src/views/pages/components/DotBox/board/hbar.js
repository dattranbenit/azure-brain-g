import React from "react";

const hbar = props => { 

  let background =  props.filled ? "black" : "transparent";
  if(props.lastBar === props.address){
    background = "orange";
  }

  const style = {
    background: background
  };

 return(
    <div
    className="hbar"
    style={style}
    onClick={() => {
      if(props.whoseTurn == 0) {
        props.click(props.address, "h")
      }
    }}
  >
    <div className="clicker" />
  </div>
 );
};

export default hbar;
