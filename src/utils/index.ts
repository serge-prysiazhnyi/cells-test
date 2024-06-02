export const isCellAlive = (x: number, y: number, data: Set<string>) => data.has(`${x},${y}`);

export const checkNeighbors = (row: number, col: number, data: Set<string>, fieldSize: number) => {
  let count = 0;

  // This checks the row above and row below the current cell
  for (let i = -1; i < 2; i++) {
    // Check for valid column
    // This ensures that the code doesn't try to access data outside the field
    if (col + i >= 0 && col + i < fieldSize - 1) {
      // checks the cell above the current one
      if (row > 0 && data.has(`${row - 1},${col + i}`)) {
        count++;
      }
      // checks the cell below the current one
      if (row < fieldSize - 1 && data.has(`${row + 1},${col + i}`)) {
        count++;
      }
    }
  }

  // Check left cell
  if (col - 1 >= 0 && data.has(`${row},${col - 1}`)) {
    count++;
  }
  // Check right cell
  if (col + 1 < fieldSize - 1 && data.has(`${row},${col + 1}`)) {
    count++;
  }

  return count;
};

export const generateRandomNumber = ({ max, min = 0 }: { max: number; min?: number }): number =>
  Math.floor(Math.random() * max + 1 + min);

const directions = [
  // horizontal and vertical
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  // diagonal
  [1, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

export const getRandomNeighbors = ([x, y]: [number, number]): [number, number] => {
  const [directionX, directionY] = directions[generateRandomNumber({ max: directions.length }) - 1];

  return [x + directionX, y + directionY];
};

export const getRandomPairs = (range: number, amount: number): Set<string> => {
  if (amount > (range + 1) * (range + 1)) {
    throw new Error('the amount of unique pairs requested exceed the possible unique pairs in the given range');
  }

  const pairsSet = new Set<string>();

  pairsSet.add(`${generateRandomNumber({ max: range })},${generateRandomNumber({ max: range })}`);

  while (pairsSet.size < amount) {
    let newPair: string | null = null;

    while (!newPair || pairsSet.has(newPair)) {
      const lastPair = Array.from(pairsSet).pop()!;
      const [lastX, lastY] = lastPair.split(',').map(Number);
      const pair = getRandomNeighbors([lastX, lastY]);
      newPair = `${pair[0]},${pair[1]}`;
    }

    pairsSet.add(newPair);
  }

  return pairsSet;
};
