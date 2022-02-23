import { combineReducers } from 'redux';
import game from './game_reducer';
import ui from './ui_reducer';

const RootReducer = combineReducers({
    game,
    ui
});

export default RootReducer;