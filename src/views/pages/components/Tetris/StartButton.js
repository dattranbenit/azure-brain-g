import React from "react";
import { StyledStartButton } from "../../../../assets/styles/js/StyledStartButton";

const StartButton = ({ callBack }) => (
  <StyledStartButton onClick={callBack}>Start Game</StyledStartButton>
);

export default StartButton;
