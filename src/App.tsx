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
import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { GameResult, GeneralGameTimeFactsDisplay, getGeneralGameTimeFacts, getLeaderboardData, getPreviousPlayers } from './game-results';
import React from 'react';
import { SettingsOutlined } from '@mui/icons-material';

import localForage from 'localforage';

// const dummyGameResults: GameResult[] = [
//   {
//       winner: "Tom"
//       ,players: ["Tom", "taylor"]

//       , start: "2023-10-01T17:40:46.333Z"
//       , end: "2023-10-01T17:53:27.123Z"
//   }
//   , {
//       winner: "Troy"
//       , players: ["Troy", "Larry"]
//       , start: "2023-10-09T17:55:46.333Z"
//       , end: "2023-10-09T18:00:27.123Z"
//   }
//       , {
//       winner: "Troy"
//       , players: ["Troy", "Jonah", "Sheldon", "Tom"]
//       , start: "2023-10-09T17:55:46.333Z"
//       , end: "2023-10-09T18:00:27.123Z"
//   }
//       , {
//       winner: "Larry"
//       , players: ["Troy", "Larry"]
//       , start: "2023-10-09T17:55:46.333Z"
//       , end: "2023-10-09T18:00:27.123Z"
//   }
//           , {
//       winner: "Larry"
//       , players: ["Troy", "Larry"]
//       , start: "2023-10-09T17:55:46.333Z"
//       , end: "2023-10-09T18:00:27.123Z"
//   }
// ];

const App = () => {

  const [num, setNum] = useState(1);
  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [title, setTitle] = useState<string>("Carcassonne Scoreboard");
  const [chosenPlayers, setChosenPlayers] = useState<string[]>([]);

  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [emailAddress, setEmailAddress] = React.useState("");

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
        setChosenPlayers={setChosenPlayers}

      />,
    },
    {
      path: "/play",
      element: <Play
        addNewGameResult={addNewGameResult}
        setTitle={setTitle}
        chosenPlayers={chosenPlayers}
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
                color: '#E8CD8A',
                flexGrow: 1,
                textAlign: 'left',
              }}
            >
              {title}
            </Typography>
            <IconButton
              size='small'
              onClick={
                () => setSettingsOpen(true)
              }
            >
              <SettingsOutlined />
            </IconButton>
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

      <Dialog
        fullScreen={fullScreen}
        open={settingsOpen}
        onClose={
          () => setSettingsOpen(false)
        }
      >
        <DialogTitle>
            Settings
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
                Your email address will be used to save/load game results. We will
                not send you spam.
          </DialogContentText>
                <TextField 
                    label="Enter your email address"
                    variant='outlined'
                    fullWidth
                    value={emailAddress}
                    onChange={
                        (e) => setEmailAddress(e.target.value)
                    }
                    sx={{
                      mt: 3,
                    }}
                />
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleClose}>
            Disagree
          </Button> */}
          <Button 
          variant={emailAddress.length > 0 ? 'contained' : 'outlined'}
          onClick={
            async () => {
              await localForage.setItem('email', emailAddress);
              setSettingsOpen(false)
            }
          } 
            autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
};

export default App;
