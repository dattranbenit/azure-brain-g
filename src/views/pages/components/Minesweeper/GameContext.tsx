import React, {
  createContext,
  useContext,
  Dispatch,
  FC,
  useReducer
} from "react";
import {
  GameState,
  GameAction,
  gameStateReducer,
  newGameState
} from "./GameState";
import { GridSizes } from "./GridSizes";

const GameStateContext = createContext<GameState | undefined>(undefined);

const GameDispatchContext = createContext<Dispatch<GameAction> | undefined>(
  undefined
);

export const useGameState = (): GameState => {
  const state = useContext(GameStateContext);

  if (!state) {
    throw new Error(
      "gameState undefined, have you wrapped your code in a GameStateProvider"
    );
  }

  return state;
};

export const useGameDispatch = (): Dispatch<GameAction> => {
  const dispatch = useContext(GameDispatchContext);

  if (!dispatch) {
    throw new Error(
      "gameDispatch undefined, have you wrapped your code in a GameStateProvider"
    );
  }

  return dispatch;
};

export const GameProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    gameStateReducer,
    newGameState(GridSizes[0])
  );
  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
};
