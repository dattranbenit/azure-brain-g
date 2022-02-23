import { GridSize } from "./GridSizes";
import {
  GridState,
  newGridState,
  CellState,
  openCell,
  MINE,
  openSafeNeighbours,
  placeMines
} from "./GridState";
import produce from "immer";

export enum PlayState {
  NEW = "new",
  GAME_OVER = "game over",
  WIN = "win",
  ACTIVE = "active"
}

export type GameState = {
  gridSize: GridSize;
  playState: PlayState;
  gridState: GridState;
  remainingFlags: number;
};

export const newGameState = (gridSize: GridSize): GameState => {
  return {
    gridSize: gridSize,
    playState: PlayState.NEW,
    gridState: newGridState(gridSize),
    remainingFlags: gridSize.mines
  };
};

export const gameStateReducer: (
  state: GameState,
  action: GameAction
) => GameState = produce((state: GameState, action: GameAction) => {
  switch (action.type) {
    case "flag":
      if (
        state.playState !== PlayState.ACTIVE &&
        state.playState !== PlayState.NEW
      ) {
        return;
      }
      const { x, y } = action.payload;
      const cell = state.gridState[y][x];
      switch (cell.state) {
        case CellState.CLOSED:
          cell.state = CellState.FLAGGED;
          state.remainingFlags--;
          break;
        case CellState.FLAGGED:
          cell.state = CellState.MAYBE;
          state.remainingFlags++;
          break;
        case CellState.MAYBE:
          cell.state = CellState.CLOSED;
          break;
        case CellState.OPEN:
        case CellState.BOOM:
          break;
      }
      break;
    case "open": {
      if (
        state.playState !== PlayState.ACTIVE &&
        state.playState !== PlayState.NEW
      ) {
        return;
      }
      const { x, y } = action.payload;

      // First click so we can place the mines, avoiding the cell clicked on
      if (state.playState === PlayState.NEW) {
        placeMines(state.gridState, state.gridSize, x, y);
      }
      openCell(state.gridState, x, y);
      state.playState = getPlayState(state.gridState);
      console.log(state.playState);
      break;
    }
    case "open-neighbours": {
      if (
        state.playState !== PlayState.ACTIVE &&
        state.playState !== PlayState.NEW
      ) {
        return;
      }
      const { x, y } = action.payload;
      openSafeNeighbours(state.gridState, x, y);
      state.playState = getPlayState(state.gridState);
      break;
    }
    case "change-size":
      return newGameState(action.payload.gridSize);
    case "reset":
      return newGameState(state.gridSize);
    default:
      return state;
  }
});

/**
 * Work out if the game has been won, or if it is Minesweeper Over.
 *
 * Minesweeper is won when all non mine squares are opened.
 *
 * Minesweeper Over when a mine is opened
 */
const getPlayState = (gridState: GridState): PlayState => {
  let isWin = true;
  let isGameOver = false;
  for (let y = 0; y < gridState.length; y++) {
    for (let x = 0; x < gridState[y].length; x++) {
      const cell = gridState[y][x];
      if (cell.state === CellState.BOOM) {
        isGameOver = true;
      }
      if (
        cell.value !== MINE &&
        cell.state !== CellState.OPEN &&
        cell.state !== CellState.FLAGGED
      ) {
        isWin = false;
      }
    }
  }
  if (isWin) {
    return PlayState.WIN;
  }
  if (isGameOver) {
    return PlayState.GAME_OVER;
  }
  return PlayState.ACTIVE;
};

export type GameAction =
  | {
      type: "flag";
      payload: {
        x: number;
        y: number;
      };
    }
  | {
      type: "open";
      payload: {
        x: number;
        y: number;
      };
    }
  | {
      type: "open-neighbours";
      payload: {
        x: number;
        y: number;
      };
    }
  | {
      type: "change-size";
      payload: {
        gridSize: GridSize;
      };
    }
  | {
      type: "reset";
    };
