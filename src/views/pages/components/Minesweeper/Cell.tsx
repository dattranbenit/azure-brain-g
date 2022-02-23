import React, { FC } from "react";
import { CellState, MINE, GridCellState } from "./GridState";
import { useGameDispatch } from "./GameContext";
import classNames from "classnames";
import "../../../../assets/styles/css/minesweeper/Cell.css";

export type CellProps = {
  x: number;
  y: number;
  cell: GridCellState;
};

export const Cell: FC<CellProps> = ({ x, y, cell }) => {
  const dispatch = useGameDispatch();

  const handleClick = () => {
    dispatch({ type: "open", payload: { x, y } });
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: "flag", payload: { x, y } });
  };

  const handleOpenSafe = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: "open-neighbours", payload: { x, y } });
  };

  const disableRightClick = (event: React.MouseEvent<any>) => {
    event.preventDefault();
  };

  if (cell.state !== CellState.OPEN && cell.state !== CellState.BOOM) {
    return (
      <button
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        className="cell cell-closed"
      >
        {cell.state === CellState.FLAGGED ? "🚩" : null}
        {cell.state === CellState.MAYBE ? "?" : null}
      </button>
    );
  }

  const openClasses = classNames(
    "cell",
    "cell-open",
    cell.value !== MINE && cell.value > 0 && `cell-open-${cell.value}`
  );

  return (
    <button
      onDoubleClick={handleOpenSafe}
      onContextMenu={disableRightClick}
      className={openClasses}
    >
      {cell.value === MINE && cell.state === CellState.BOOM ? "💥" : null}
      {cell.value === MINE && cell.state !== CellState.BOOM ? "💣" : null}
      {cell.value > 0 ? cell.value : null}
    </button>
  );
};
