export enum Size {
  SMALL = "Small",
  MEDIUM = "Medium",
  LARGE = "Large"
}

export type GridSize = {
  width: number;
  height: number;
  mines: number;
  size: Size;
};

export const GridSizes: GridSize[] = [
  { size: Size.SMALL, width: 9, height: 9, mines: 10 },
  { size: Size.MEDIUM, width: 16, height: 16, mines: 40 },
  { size: Size.LARGE, width: 16, height: 30, mines: 99 }
];
