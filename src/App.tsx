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
import { GameResult, GeneralGameTimeFactsDisplay, getGeneralGameTimeFacts, getLeaderboardData, getPreviousPlayers } from './game-results';

const dummyGameResults: GameResult[] = [
  {
      winner: "Tom"
      ,players: ["Tom", "taylor"]

      , start: "2023-10-01T17:40:46.333Z"
      , end: "2023-10-01T17:53:27.123Z"
  }
  , {
      winner: "Troy"
      , players: ["Troy", "Larry"]
      , start: "2023-10-09T17:55:46.333Z"
      , end: "2023-10-09T18:00:27.123Z"
  }
      , {
      winner: "Troy"
      , players: ["Troy", "Jonah", "Sheldon", "Tom"]
      , start: "2023-10-09T17:55:46.333Z"
      , end: "2023-10-09T18:00:27.123Z"
  }
      , {
      winner: "Larry"
      , players: ["Troy", "Larry"]
      , start: "2023-10-09T17:55:46.333Z"
      , end: "2023-10-09T18:00:27.123Z"
  }
          , {
      winner: "Larry"
      , players: ["Troy", "Larry"]
      , start: "2023-10-09T17:55:46.333Z"
      , end: "2023-10-09T18:00:27.123Z"
  }
];

const App = () => {

  const [num, setNum] = useState(1);
  const [gameResults, setGameResults] = useState<GameResult[]>(dummyGameResults);
  const [title, setTitle] = useState<string>("Carcassonne Scoreboard");

  const addNewGameResult = (newGameResult: GameResult) => setGameResults(
    [
      ...gameResults
      , newGameResult
    ]
  );


  const router = createHashRouter([
    {
      path: "/",
      element: <Home
      setTitle={setTitle}
      />,
    },
    {
      path: "/stats",
      element: <Stats
          //winningPercentageDisplay={getWinningPercentageDisplay(gameResults)}
          generalGameTimeFacts={ getGeneralGameTimeFacts(gameResults, Date.now())}
          leaderboard={ getLeaderboardData(gameResults)} />,
    },
    {
      path: "/setup",
      element: <Setup 
        num={num}
        setNum={setNum}
        setTitle={setTitle}
        previousPlayers={ getPreviousPlayers(gameResults) }
      />,
    },
    {
      path: "/play",
      element: <Play
        addNewGameResult={addNewGameResult}
        setTitle={setTitle}
      />,
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
            overflow: 'hidden',
            bgcolor: '#042B61',
          }}
        >
          <Toolbar>
            
            <Typography
              variant='h5'
              //color={Math.random() > 0.5 ? 'primary' : 'error'}
              sx={{
                opacity: 0.75,
                color: '#E8CD8A'
              }}
            >
              {title}
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
