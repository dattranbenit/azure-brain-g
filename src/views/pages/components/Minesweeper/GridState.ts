import { GridSize } from "./GridSizes";
import { randomPosition} from "./utils";

export const MINE = "mine";

export enum CellState {
  OPEN = "open",
  FLAGGED = "flagged",
  MAYBE = "maybe",
  BOOM = "boom",
  CLOSED = "closed"
}

export type GridCellState = {
  value: typeof MINE | number;
  state: CellState;
};

export type GridState = GridCellState[][];

const getNeighbours = (x: number, y: number) => [
  [x - 1, y - 1],
  [x, y - 1],
  [x + 1, y - 1],
  [x - 1, y],
  [x + 1, y],
  [x - 1, y + 1],
  [x, y + 1],
  [x + 1, y + 1]
];

/**
 * Creates a fresh game grid
 */
export const newGridState = (gridSize: GridSize): GridState => {
  const { height, width } = gridSize;
  let grid: GridState = [];

  // Create an empty grid with all closed cells
  for (let y = 0; y < height; y++) {
    grid[y] = [];
    for (let x = 0; x < width; x++) {
      grid[y][x] = { value: 0, state: CellState.CLOSED };
    }
  }

  return grid;
};

/**
 * Place mines in the grid but dont place a mine on [notX, notY] as that is the cell the user clicked,
 * avoiding an immediate game over
 */
export const placeMines = (gridState: GridState, gridSize: GridSize, notX: number, notY: number): GridState => {
  const { width, height, mines} = gridSize;
  let rem = mines;  
  // randomly place the mies
  while (rem > 0) {
    const [x, y] = randomPosition(width, height);

    if (!(x === notX && y === notY) && gridState[y][x].value !== MINE) {
      gridState[y][x].value = MINE;
      rem--;
    }
  }

  // calculate the value of the cell (how many neighbouring cells have mines)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (gridState[y][x].value === MINE) {
        continue;
      }

      gridState[y][x].value = getNeighbours(x, y).reduce(
        (out, [x, y]) => out + (gridState[y]?.[x]?.value === MINE ? 1 : 0), 
        0
      )
    }
  }

  return gridState
}

/**
 * Open all squares that have mines (eg on Minesweeper Over)
 */
const openMines = (gridState: GridState) => {
  for (let y = 0; y < gridState.length; y++) {
    for (let x = 0; x < gridState[y].length; x++) {
      const cell =  gridState[y][x];
      if (cell.value === MINE) {
        cell.state = CellState.OPEN;
      }
    }
  }
}

/**
 * When the user opens an empty square, open all neighbours of that square that
 * are not mines (or flagged). If a neighbour is empty then repeat.
 * 
 * recursive [flood fill](https://en.wikipedia.org/wiki/Flood_fill)
 */
const openEmpty = (gridState: GridState, x: number, y: number) => {
  const cell = gridState[y]?.[x]; 
  if (!cell || cell.state !== CellState.CLOSED) {
    return;
  }
  cell.state = CellState.OPEN;    
  if (cell.value === 0) {
    getNeighbours(x, y).forEach(
      ([neighbourX, neighbourY]) => 
        openEmpty(gridState, neighbourX, neighbourY)
    )

  } 
}

/**
 * Try to open a cell
 */
export const openCell = (gridState: GridState, x: number, y: number) => {
  const cell = gridState[y]?.[x];
  if (!cell || (cell.state !== CellState.CLOSED && cell.state !== CellState.MAYBE)) {
    return;
  }

  // Clicking a maybe cell removes the maybe flag
  if (cell.state === CellState.MAYBE) {
    cell.state = CellState.CLOSED;
    return;
  }
  
  // Clicking a mine causes game over, so mark it as boom and open all mines on the grid
  if (cell.value === MINE) {
    openMines(gridState)
    cell.state = CellState.BOOM;
  } else if (cell.value === 0) {
    openEmpty(gridState, x, y);
  } else {
    cell.state = CellState.OPEN;
  }
};

/**
 * When double clicking an open cell with a value we can open
 * all neighbouring cells that are not mines or flagged if 
 * all the neighbouring mines are flagged. 
 */
export const openSafeNeighbours = (gridState: GridState, x: number, y: number) => {
  const cell = gridState[y][x];
  if (cell.state !== CellState.OPEN) {
    return;
  }

  const flagCount = getNeighbours(x, y).reduce(
    (out, [x, y]) => 
      out + (gridState[y]?.[x]?.state === CellState.FLAGGED ? 1 : 0),
    0
  )
  
  if (flagCount === cell.value) {
    getNeighbours(x, y).forEach(
      ([neighbourX, neighbourY]) => 
        openCell(gridState, neighbourX, neighbourY)
    )
  }
};
