import React, { Component } from "react";
import Board from "../../components/LightOut/Board";
import "../../../../assets/styles/css/light-out/App.css";

/** Simple app that just shows the LightsOut game. */

class LightOut extends Component {
  render() {
    return (
      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div className='App' style={{cursor: "pointer"}}>
          <Board />
        </div>
      </div>
    );
  }
}

export default LightOut;
