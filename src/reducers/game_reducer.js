import { SET_END_TOWER, MOVE_DISC_FROM, RESET_FOR_NEXT_MOVE, RESTART_GAME, BUILD_TOWERS, INCREMENT_DISCS_NUM, DECREMENT_DISCS_NUM } from '../actions/game_actions';
import { createTowersArray } from '../util/game_util';

const defaultDiscNum = 3;

const defaultState = {
  discsNum: defaultDiscNum,
  moves: 0,
  minMoves: Math.pow(2, defaultDiscNum) - 1,
  discs: createTowersArray(defaultDiscNum),
  startTower: null,
  endTower: null,
  removedDisc: null,
  isActive: true,
}

const GameReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = JSON.parse(JSON.stringify(state));
  switch(action.type) {
    case SET_END_TOWER:
      newState.endTower = action.tower;
      return newState;
    case MOVE_DISC_FROM:
      let startTower = action.tower; 
      newState.startTower = startTower;
      if (newState.startTower === newState.endTower) return newState
      startTower = newState.discs[startTower]; // Set the exact tower
      const disc = startTower.shift(); // Take out disc
      newState.removedDisc = disc; // Store disc'
      let endTower = newState.discs[newState.endTower];
      if (typeof endTower[0] !== 'number' || newState.removedDisc < endTower[0]) {
        endTower.unshift(newState.removedDisc);
        newState.moves += 1;
      } else {
        let startTower = newState.discs[newState.startTower];
        startTower.unshift(newState.removedDisc);
      }
      return newState;
    case RESET_FOR_NEXT_MOVE:
      newState.removedDisc = null;
      newState.startTower = null;
      newState.endTower = null;
      return newState;
    case RESTART_GAME:
      newState.discs = createTowersArray(0);
      newState.moves = 0;
      return newState;
    case BUILD_TOWERS:
      newState.discs = createTowersArray(newState.discsNum);
      return newState;
    case INCREMENT_DISCS_NUM:
      if (newState.discsNum === 8) return newState;
      newState.discsNum += 1;
      newState.moves = 0;
      newState.minMoves = Math.pow(2, newState.discsNum) - 1;
      newState.discs = createTowersArray(0);
      return newState;
    case DECREMENT_DISCS_NUM:
      if (newState.discsNum === 3) return newState;
      newState.discsNum -= 1;
      newState.moves = 0;
      newState.minMoves = Math.pow(2, newState.discsNum) - 1;
      newState.discs = createTowersArray(0);
      return newState;
    default:
      return state;
  }
}

export default GameReducer;