import React from "react";
import { StyledCell } from "../../../../assets/styles/js/StyledCell";
import { TETROMINOES } from "./tetrominoes";

const Cell = ({ type }) => (
  <StyledCell type={type} color={TETROMINOES[type].color} />
);

export default React.memo(Cell);
