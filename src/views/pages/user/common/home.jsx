import React from 'react'
import { GameCard } from "../../../../components/Card/Card";
import { Grid } from "@material-ui/core";
//icons & images
import twentyfoureight from "../../../../assets/img/gif/6228-slot-numbers-animation.gif"
import tower from "../../../../assets/img/gif/77372-mobile-tower.gif"
import light from "../../../../assets/img/gif/1978-lightdark.gif"
import dotbox from "../../../../assets/img/gif/25013-floor-tiling.gif"
import tiles from "../../../../assets/img/gif/2574-tile-grid-loading-animation.gif"
import sudoku from "../../../../assets/img/gif/62900-dynamic-bar-graph.gif"
import cat from "../../../../assets/img/gif/59352-cat-coding.gif"
import tetris from "../../../../assets/img/gif/17694-cube-grid.gif"
import minesweeper from "../../../../assets/img/gif/4493-bomb.gif"
import pacman from "../../../../assets/img/gif/27274-loading-pacman.gif"
import hangman from "../../../../assets/img/gif/animation_500_kzzszjao.gif"

export default function Home() {
  return (
    <>
      <div style={{marginBottom: "100px"}}>
        <h1 style={{fontSize: "90px"}}>
          Azure Programming Games
        </h1>
      </div>
      <Grid container direction="row" spacing={3} style={{margin: "40px", width: "90%"}}>
        <Grid item sm={3}>
          <GameCard
            url="/games/2048"
            name="2048 Go!!!"
            img={twentyfoureight}
          />
        </Grid>
        <Grid item sm={3}>
          <GameCard
            url="/games/hanoi-tower"
            name="HaNoi Tower"
            img={tower}
          />
        </Grid>
        <Grid item sm={3}>
          <GameCard
            url="/games/light-out"
            name="Light Out"
            img={light}
          />
        </Grid>
        <Grid item sm={3}>
          <GameCard
            url="/games/dot-box"
            name="Dot Box"
            img={dotbox}
          />
        </Grid>
        <Grid item sm={3}>
          <GameCard
            url="/games/tiles-16"
            name="Tiles 16"
            img={tiles}
          />
        </Grid>
        <Grid item sm={3}>
          <GameCard
            url="/games/sudoku"
            name="Sudoku"
            img={sudoku}
          />
        </Grid>
        <Grid item sm={3}>
          <GameCard
            url="/games/tetris"
            name="Tetris"
            img={tetris}
          />
        </Grid>
        <Grid item sm={3}>
          <GameCard
            url="/games/minesweeper"
            name="MineSweeper"
            img={minesweeper}
          />
        </Grid>
        <Grid item sm={3}>
          <GameCard
            page="/games/hang-man"
            name="HangMan"
            img={hangman}
          />
        </Grid>
        <Grid item sm={3}>
            <GameCard
              page="https://azure-brain-g-pacman.netlify.app/"
              name="Pacman"
              img={pacman}
            />
        </Grid>
        <Grid item sm={3}>
          <GameCard
            url="/"
            name="More in the future"
            img={cat}
          />
        </Grid>
      </Grid>
    </>
  )
}
