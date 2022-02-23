import { ENABLE_MODAL, REMOVE_MODAL } from '../actions/ui_actions';

const defaultState = {
  mode: false,
}

const UIReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = JSON.parse(JSON.stringify(state));
  switch(action.type) {
    case ENABLE_MODAL:
      newState.mode = action.mode;
      return newState;
    case REMOVE_MODAL:
      newState.mode = false;
      return newState;
    default:
      return state;
  }
}

export default UIReducer;