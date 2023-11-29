import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { GameResult } from './game-results';
import { FC, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';

interface PlayProps {
  addNewGameResult: (r: GameResult) => void;
  setTitle: (t: string) => void;
  chosenPlayers: string[];
}

export const Play: FC<PlayProps> = ({ addNewGameResult, setTitle, chosenPlayers}) => {
  useEffect(() => setTitle('Play'), [setTitle]);
  const location = useLocation();

  const nav = useNavigate();
  const playerColors = location.state?.playerColors || {};

  const [startTimestamp,] = useState(new Date().toISOString());
  const [playerScores, setPlayerScores] = useState<{ [player: string]: number }>(
    chosenPlayers.reduce((acc, player) => ({ ...acc, [player]: 0 }), {})
  );

  const [cityScores, setCityScores] = useState<{ [player: string]: number }>(
    chosenPlayers.reduce((acc, player) => ({ ...acc, [player]: 0 }), {})
  );

  const [roadScores, setRoadScores] = useState<{ [player: string]: number }>(
    chosenPlayers.reduce((acc, player) => ({ ...acc, [player]: 0 }), {})
  );

  const [cloisterScores, setCloisterScores] = useState<{ [player: string]: number }>(
    chosenPlayers.reduce((acc, player) => ({ ...acc, [player]: 0 }), {})
  );

  const [farmScores, setFarmScores] = useState<{ [player: string]: number }>(
    chosenPlayers.reduce((acc, player) => ({ ...acc, [player]: 0 }), {})
  );

  const handleScoreChange = (player: string, scoringType: string, increment: number) => {
    // Update the score for the specified player and scoring type
    setPlayerScores((prevScores) => ({ ...prevScores, [player]: Math.max(0, prevScores[player] + increment) }));

    switch (scoringType) {
      case 'cities':
        setCityScores((prevScores) => ({ ...prevScores, [player]: Math.max(0, prevScores[player] + increment) }));
        break;
      case 'roads':
        setRoadScores((prevScores) => ({ ...prevScores, [player]: Math.max(0, prevScores[player] + increment) }));
        break;
      case 'cloisters':
        setCloisterScores((prevScores) => ({ ...prevScores, [player]: Math.max(0, prevScores[player] + increment) }));
        break;
      case 'farms':
        setFarmScores((prevScores) => ({ ...prevScores, [player]: Math.max(0, prevScores[player] + increment) }));
        break;
      default:
        break;
    }
  };

  const endGame = () => {
    // Find the player with the highest score
    const winner = Object.keys(playerScores).reduce((a, b) => (playerScores[a] > playerScores[b] ? a : b));

    addNewGameResult({
      winner: winner,
      players: chosenPlayers,
      start: startTimestamp,
      end: new Date().toISOString(),
    });

    nav(-2);
  };

  return (
    <>
      <h2>Scoreboard</h2>

      {chosenPlayers.map((x) => (
        <Box key={x} boxShadow={2} sx={{ backgroundColor: playerColors[x] || 'white' }}>
            <h3 style={{ textAlign: 'center', paddingTop: '10px'}}>{x} {playerScores[x]}</h3>
            <Grid display="flex" flexDirection="row" alignItems="center" justifyContent="center" textAlign="center" mb={2} pb={2} >
            <Grid pl={1} pr={1} >
            <p style={{ fontSize: '1.5rem', margin: '10px 0', textAlign: 'center' }}>Cities</p>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={() => handleScoreChange(x, 'cities', 1)}
                >
                  +
                </Button>
                
                <p style={{ fontSize: '1.5rem', margin: '10px 0', textAlign: 'center' }}>{cityScores[x]}</p>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleScoreChange(x, 'cities', -1)}
                >
                  -
                </Button>      
            </Grid>
            <Grid  pl={1} pr={1}>
            <p style={{ fontSize: '1.5rem', margin: '10px 0', textAlign: 'center' }}>Roads</p>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={() => handleScoreChange(x, 'roads', 1)}
                >
                  +
                </Button>
                <p style={{ fontSize: '1.5rem', margin: '10px 0', textAlign: 'center' }}>{roadScores[x]}</p>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleScoreChange(x, 'roads', -1)}
                >
                  -
                </Button>      
            </Grid>
            <Grid  pl={1} pr={1}>
            <p style={{ fontSize: '1.5rem', margin: '10px 0', textAlign: 'center' }}>Cloisters</p>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={() => handleScoreChange(x, 'cloisters', 1)}
                >
                  +
                </Button>
                <p style={{ fontSize: '1.5rem', margin: '10px 0', textAlign: 'center' }}>{cloisterScores[x]}</p>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleScoreChange(x, 'cloisters', -1)}
                >
                  -
                </Button>      
            </Grid>
            <Grid  pl={1} pr={1}>
            <p style={{ fontSize: '1.5rem', margin: '10px 0', textAlign: 'center' }}>Farms</p>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={() => handleScoreChange(x, 'farms', 1)}
                >
                  +
                </Button>
                <p style={{ fontSize: '1.5rem', margin: '10px 0', textAlign: 'center' }}>{farmScores[x]}</p>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleScoreChange(x, 'farms', -1)}
                >
                  -
                </Button>      
            </Grid>
            </Grid>
        </Box>
      ))}
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => endGame()}
        sx={{
          mt: 3,
        }}
      >
        End Game
      </Button>
    </>
  );
};
