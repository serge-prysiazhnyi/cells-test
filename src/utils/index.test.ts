import { vi } from 'vitest';

import { getRandomPairs, checkNeighbors, generateRandomNumber, getRandomNeighbors } from './index';

describe('utils', () => {
  describe('checkNeighbors returns correct amount of neighbors', () => {
    const mockData = new Set<string>(['25,25', '25,26', '26,25', '26,26']);

    test.each([
      [25, 25, mockData, 50, 3],
      [25, 26, mockData, 50, 3],
      [26, 25, mockData, 50, 3],
      [26, 26, mockData, 50, 3],
      [0, 0, mockData, 50, 0],
      [0, 49, mockData, 50, 0],
      [49, 0, mockData, 50, 0],
      [49, 49, mockData, 50, 0],
      [25, 24, mockData, 50, 2],
      [24, 24, mockData, 50, 1],
    ])('checkNeighbors', (row, col, data, fieldSize, expected) => {
      expect(checkNeighbors(row, col, data, fieldSize)).toBe(expected);
    });
  });

  describe('generateRandomNumber', () => {
    test.each([
      [10, 0],
      [5, 0],
    ])('generateRandomNumber returns random number that is in specified range', (max, min) => {
      const number = generateRandomNumber({ max, min });
      expect(number).toBeGreaterThanOrEqual(min);
      expect(number).toBeLessThanOrEqual(max);
    });
  });

  describe('getRandomNeighbors', () => {
    const originalMath = global.Math;
    afterEach(() => {
      global.Math = originalMath;
    });

    test.each([
      [[25, 25], 0.5, [26, 26]],
      [[25, 25], 0.25, [25, 24]],
      [[25, 25], 0.1, [25, 26]],
      [[25, 25], 0.9, [24, 26]],
    ])('getRandomNeighbors returns correct pair of coordinates', (input, randomFactor, expected) => {
      vi.stubGlobal('Math', {
        ...Math,
        floor: Math.floor,
        random: () => randomFactor,
      });

      expect(getRandomNeighbors(input as [number, number])).toEqual(expected);
    });
  });

  describe('getRandomPairs', () => {
    const originalMath = global.Math;
    afterEach(() => {
      global.Math = originalMath;
    });

    test.each([
      [50, 8, 0.5, new Set(['26,26', '27,27', '28,28', '29,29', '30,30', '31,31', '32,32', '33,33'])],
      [50, 8, 0.25, new Set(['13,10', '13,11', '13,12', '13,13', '13,6', '13,7', '13,8', '13,9'])],
      [50, 6, 0.8, new Set(['41,41', '42,40', '43,39', '44,38', '45,37', '46,36'])],
    ])('getRandomPairs returns correct Set for provided arguments', (range, amount, randomFactor, expected) => {
      vi.stubGlobal('Math', {
        ...Math,
        floor: Math.floor,
        random: () => randomFactor,
      });
      expect(getRandomPairs(range, amount)).toStrictEqual(expected);
    });
  });
});
