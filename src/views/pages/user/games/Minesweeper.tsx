import React, { FC } from "react";
import { Grid } from "../../components/Minesweeper/Grid";
import { SizeSelector } from "../../components/Minesweeper/SizeSelector";
import { Controls } from "../../components/Minesweeper/Controls";
import "../../../../assets/styles/css/minesweeper/Game.css";
import { GameProvider } from "../../components/Minesweeper/GameContext";
import { Status } from "../../components/Minesweeper/Status";

export const Minesweeper: FC = () => {
  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <div>
        <GameProvider>
          <div className="game">
            <Grid />
            <Status />
            <Controls />
            <SizeSelector />
          </div>
        </GameProvider>
      </div>
    </div>
  );
};
