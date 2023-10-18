import './App.css';
import { Home } from './Home';
import { Play } from './Play';
import { Setup } from './Setup';
import { Scoreboard } from './Scoreboard';
import { Stats } from './Stats';

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { useState } from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { GameResult, getWinningPercentageDisplay, GeneralGameTimeFactsDisplay, getGeneralGameTimeFacts } from './game-results';

const dummyGameResults: GameResult[] = [
  {
      won: true
      , start: "2023-10-01T17:40:46.333Z"
      , end: "2023-10-01T17:53:27.123Z"
  }
  , {
      won: false
      , start: "2023-10-09T17:55:46.333Z"
      , end: "2023-10-09T18:00:27.123Z"
  }
];

const App = () => {

  const [num, setNum] = useState(1);
  const [gameResults, setGameResults] = useState<GameResult[]>(dummyGameResults);

  const addNewGameResult = (newGameResult: GameResult) => setGameResults(
    [
      ...gameResults
      , newGameResult
    ]
  );


  const router = createHashRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/stats",
      element: <Stats
          winningPercentageDisplay={getWinningPercentageDisplay(gameResults)}
          generalGameTimeFacts={ getGeneralGameTimeFacts(gameResults, Date.now())} />,
    },
    {
      path: "/setup",
      element: <Setup 
        num={num}
        setNum={setNum}
      />,
    },
    {
      path: "/play",
      element: <Play addNewGameResult={addNewGameResult} />,
    },
    {
      path: "/scoreboard",
      element: <Scoreboard />,
    },
  ]);

  return (
    <div className="App">
      <Box
        sx={{
          flexGrow: 1
        }}
      >
        <AppBar
          position='static'
          sx={{
            overflow: 'hidden'
            , bgcolor: 'gainsboro'
          }}
        >
          <Toolbar>
            <Typography
              variant='h5'
              color={Math.random() > 0.5 ? 'primary' : 'secondary'}
              sx={{
                opacity: 0.75
              }}
            >
              Carcassonne Scoreboard
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          pl: 1
          , pr: 1
          , textAlign: 'left'
        }}
      >
      <RouterProvider router={router} />
      </Box>
    </div>
  );
};

export default App;
