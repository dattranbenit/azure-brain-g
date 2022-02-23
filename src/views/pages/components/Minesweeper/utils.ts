const rand = (start: number, end: number) =>
  Math.floor(Math.random() * end + start);

export type Position = [number, number];

export const randomPosition = (width: number, height: number): Position => [
  rand(0, width),
  rand(0, height)
];
