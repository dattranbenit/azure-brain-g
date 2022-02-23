import React, { FC } from "react";
import { PlayState } from "./GameState";
import { useGameState } from "./GameContext";
import "../../../../assets/styles/css/minesweeper/Status.css";

export const Status: FC = () => {
  const { playState } = useGameState();

  return (
    <div className="status">
      {playState === PlayState.GAME_OVER ? (
        <span className="game-over"> 😞 Game Over!</span>
      ) : null}
      {playState === PlayState.WIN ? (
        <span className="win">😀 Congratulations!</span>
      ) : null}
    </div>
  );
};
