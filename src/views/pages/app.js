import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
//core components
import { Twentyfoureight } from "./user/games/Twentyfoureight";
import HaNoiTower from "./user/games/HaNoiTower";
import LightOut from "./user/games/LightOut";
import Dotbox from "./user/games/DotBox";
import Tiles from "./user/games/Tiles";
import Home from "./user/common/home";
import Sudoku from "./user/games/Sudoku";
import Tetris from "./user/games/Tetris";
import { Minesweeper } from "./user/games/Minesweeper";
import HangMan from "./user/games/HangMan";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/games/2048">
          <Twentyfoureight />
        </Route>
        <Route path="/games/hanoi-tower">
          <HaNoiTower/>
        </Route>
        <Route path="/games/light-out">
          <LightOut/>
        </Route>
        <Route path="/games/dot-box">
          <Dotbox/>
        </Route>
        <Route path="/games/tiles-16">
          <Tiles/>
        </Route>
        <Route path="/games/sudoku">
          <Sudoku/>
        </Route>
        <Route path="/games/minesweeper">
          <Minesweeper/>
        </Route>
        <Route path="/games/tetris">
          <Tetris/>
        </Route>
        <Route path="/games/hang-man">
          <HangMan/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
