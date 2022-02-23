import React, { FC } from "react";
import { useGameState, useGameDispatch } from "./GameContext";
import { Timer } from "./Timer";
import { RemainingFlags } from "./RemainingFlags";
import "../../../../assets/styles/css/minesweeper/Controls.css";

export const Controls: FC = () => {
  const gameState = useGameState();
  const dispatch = useGameDispatch();

  const resetGrid = () => {
    dispatch({ type: "reset" });
  };

  return (
    <div className="controls">
      <Timer playState={gameState.playState} />
      <button onClick={resetGrid}>Reset</button>
      <RemainingFlags remainingFlags={gameState.remainingFlags} />
    </div>
  );
};
