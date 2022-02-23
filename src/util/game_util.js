import { createArrayOfLength } from './general_util';

export const createTowersArray = (n) => {
  const output = {};
  (createArrayOfLength(3)).forEach(i => {
    output[i] = i === 0 ? createArrayOfLength(n) : []
  });
  return output;
}

export const towersAreChanged = (towers1, towers2) => {
  for (let i = 0; i < Object.keys(towers1).length; i++) {
    const discs1 = towers1[i];
    const discs2 = towers2[i];
    if (discs1.length !== discs2.length) return true;
  }
  return false;
}