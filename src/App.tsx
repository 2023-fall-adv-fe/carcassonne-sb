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
import { useEffect, useState } from 'react';
import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { GameResult, getGeneralGameTimeFacts, getLeaderboardData, getPreviousPlayers, calculateAverages } from './game-results';
import React from 'react';
import { SettingsOutlined } from '@mui/icons-material';

import localForage from 'localforage';
import { loadGamesFromCloud, saveGameToCloud } from './tca-cloud-api';

const App = () => {

  const [num, setNum] = useState(1);
  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [title, setTitle] = useState<string>("Carcassonne Scoreboard");
  const [chosenPlayers, setChosenPlayers] = useState<string[]>([]);

  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [emailAddress, setEmailAddress] = React.useState("");
  const [emailAddressUpdatedCount, setEmailAddressUpdatedCount] = React.useState(0);

  const [averages, setAverages] = useState<{
    averageWinnerScore: number;
    averageCityScore: number;
    averageRoadScore: number;
    averageCloisterScore: number;
    averageFarmScore: number;
  }>({
    averageWinnerScore: 0,
    averageCityScore: 0,
    averageRoadScore: 0,
    averageCloisterScore: 0,
    averageFarmScore: 0,
  });

  useEffect(() => {
    const init = async () => {
      if (!ignore) {
        const email = await localForage.getItem<string>('email') ?? "";

        if (email.length > 0) {
          setEmailAddress(email);

          const cloudGameResults = await loadGamesFromCloud(
            email,
            'tca-carcassonne-sb-fall-2023'
          );

          setGameResults(cloudGameResults);
        }
        setEmailAddress(await localForage.getItem<string>('email') ?? "");
      }
    };

    let ignore = false;
    init();

    return () => {
      ignore = true;
    };
  }, [emailAddressUpdatedCount]);

  const addNewGameResult = async (newGameResult: GameResult) => {
    if (emailAddress.length > 0) {
      await saveGameToCloud(
        emailAddress,
        'tca-carcassonne-sb-fall-2023',
        newGameResult.end,
        newGameResult
      );
    }

    setGameResults([...gameResults, newGameResult]);
  };

  useEffect(() => {
    const calculateAndSetAverages = () => {
      const averages = calculateAverages(gameResults);
      setAverages(averages);
    };

    calculateAndSetAverages();
  }, [gameResults]);

  const router = createHashRouter([
    {
      path: "/",
      element: <Home setTitle={setTitle} />,
    },
    {
      path: "/stats",
      element: <Stats
        generalGameTimeFacts={getGeneralGameTimeFacts(gameResults, Date.now())}
        leaderboard={getLeaderboardData(gameResults)}
        averages={averages}
      />,
    },
    {
      path: "/setup",
      element: <Setup
        num={num}
        setNum={setNum}
        setTitle={setTitle}
        previousPlayers={getPreviousPlayers(gameResults)}
        setChosenPlayers={setChosenPlayers}
      />,
    },
    {
      path: "/play",
      element: <Play
        addNewGameResult={addNewGameResult}
        setTitle={setTitle}
        chosenPlayers={chosenPlayers}
        gameResults={gameResults}
      />,
    },
    {
      path: "/scoreboard",
      element: <Scoreboard />,
    },
  ]);

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
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
              onClick={() => setSettingsOpen(true)}
            >
              <SettingsOutlined />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ pl: 1, pr: 1, textAlign: 'left' }}>
        <RouterProvider router={router} />
      </Box>

      <Dialog
        fullScreen={fullScreen}
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      >
        <DialogTitle>Settings</DialogTitle>
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
            onChange={(e) => setEmailAddress(e.target.value)}
            sx={{ mt: 3 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant={emailAddress.length > 0 ? 'contained' : 'outlined'}
            onClick={async () => {
              await localForage.setItem('email', emailAddress);
              setEmailAddressUpdatedCount(emailAddressUpdatedCount + 1);
              setSettingsOpen(false);
            }}
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
