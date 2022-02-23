import React from "react";



const vbar = props => {

  let background =  props.filled ? "black" : "transparent";
  if(props.lastBar === props.address){
    background = "orange";
  }

  const style = {
    background: background
  };
  
  return (
  <div
    className="vbar"
    style={style}
    onClick={() => {
      if(props.whoseTurn == 0) {
        props.click(props.address, "v")
      }
    }}  >
    <div className="clicker" />
  </div>
);
};

export default vbar;
