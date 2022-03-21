export const MOVE_DISC_FROM = 'MOVE_DISC_FROM';
export const SET_END_TOWER = 'SET_END_TOWER';
export const RESET_FOR_NEXT_MOVE = 'RESET_FOR_NEXT_MOVE';
export const RESTART_GAME = 'RESTART_GAME';

export const BUILD_TOWERS = 'BUILD_TOWERS';
export const INCREMENT_DISCS_NUM = 'INCREMENT_DISCS_NUM';
export const DECREMENT_DISCS_NUM = 'DECREMENT_DISCS_NUM';
// Minesweeper Logics


export const setEndTower = (tower) => ({
  type: SET_END_TOWER,
  tower
});

export const moveDiscFrom = (tower) => ({
  type: MOVE_DISC_FROM,
  tower
})

export const resetForNextMove = () => ({
  type: RESET_FOR_NEXT_MOVE,
})

export const restartGame = () => ({
  type: RESTART_GAME,
})

// Minesweeper Settings
export const buildTowers = () => ({
  type: BUILD_TOWERS,
});

export const incrementDiscsNum = () => ({
  type: INCREMENT_DISCS_NUM,
})

export const decrementDiscsNum = () => ({
  type: DECREMENT_DISCS_NUM,
})

