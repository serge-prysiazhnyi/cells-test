import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Grid from './Components/Grid';
import { GRID_SIZE, INITIAL_ALIVE_CELLS_AMOUNT_MIN, INITIAL_ALIVE_CELLS_AMOUNT_MAX } from './constants';
import { generateRandomNumber, getRandomPairs } from './utils';

import './App.css';

const App: React.FC = () => {
  const [key, setKey] = React.useState(uuidv4());

  const initialPairs = getRandomPairs(
    GRID_SIZE,
    generateRandomNumber({
      max: INITIAL_ALIVE_CELLS_AMOUNT_MAX,
      min: INITIAL_ALIVE_CELLS_AMOUNT_MIN,
    }),
  );

  const handleRefresh = () => {
    setKey(uuidv4());
  };

  return (
    <div>
      <Grid key={key} initialPairs={initialPairs} />
      <button onClick={handleRefresh} type="button" className="refresh-btn">
        Refresh
      </button>
    </div>
  );
};
export default App;
