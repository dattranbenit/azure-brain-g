import React from "react";
import { StyledDisplay } from "../../../../assets/styles/js/StyledDisplay";

const Display = ({ gameOver, text }) => (
  <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
);

export default Display;
