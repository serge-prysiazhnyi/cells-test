import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  GRID_SIZE,
  TICK_INTERVAL,
  INITIAL_ALIVE_CELLS_AMOUNT_MIN,
  INITIAL_ALIVE_CELLS_AMOUNT_MAX,
} from '../../constants';
import { getRandomPairs, generateRandomNumber, isCellAlive, checkNeighbors } from '../../utils';

interface GridProps {
  initialPairs: Set<string>;
}

const Grid: React.FC<GridProps> = ({ initialPairs }) => {
  const [data, setData] = React.useState(initialPairs);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevSData) => {
        const newSet = new Set<string>();
        // iterate over all rows
        for (let row = 0; row < GRID_SIZE; row++) {
          // iterate over all cells
          for (let cell = 0; cell < GRID_SIZE; cell++) {
            const neighbors = checkNeighbors(row, cell, prevSData, GRID_SIZE);
            if (neighbors === 3 || (neighbors === 2 && prevSData.has(`${row},${cell}`))) {
              newSet.add(`${row},${cell}`);
            }
          }
        }

        // refresh the grid if all cells are dead
        if (newSet.size === 0) {
          return getRandomPairs(
            GRID_SIZE,
            generateRandomNumber({
              max: INITIAL_ALIVE_CELLS_AMOUNT_MAX,
              min: INITIAL_ALIVE_CELLS_AMOUNT_MIN,
            }),
          );
        }

        return newSet;
      });
    }, TICK_INTERVAL);

    // cleanup function for component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {Array.from({ length: GRID_SIZE }).map((_, i) => (
        <div className="row" key={uuidv4()}>
          {Array.from({ length: GRID_SIZE }).map((__, j) => (
            <div key={uuidv4()} className={isCellAlive(i, j, data) ? 'cell alive' : 'cell'} />
          ))}
        </div>
      ))}
    </>
  );
};

export default Grid;
