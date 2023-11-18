import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { GameResult } from './game-results';
import { FC, useState, useEffect } from 'react';

interface PlayProps {
  addNewGameResult: (r: GameResult) => void;
  setTitle: (t: string) => void;
  chosenPlayers: string[];
}

export const Play: FC<PlayProps> = ({ addNewGameResult, setTitle, chosenPlayers }) => {
  useEffect(() => setTitle('Play'), [setTitle]);

  const nav = useNavigate();

  const [startTimestamp,] = useState(new Date().toISOString());
  const [playerScores, setPlayerScores] = useState<{ [player: string]: number }>(
    chosenPlayers.reduce((acc, player) => ({ ...acc, [player]: 0 }), {})
  );

  const handleScoreChange = (player: string, increment: number) => {
    // Update the score for the specified player, ensuring it doesn't go below 0
    setPlayerScores((prevScores) => ({ ...prevScores, [player]: Math.max(0, prevScores[player] + increment) }));
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
        <Box key={x} display="flex" flexDirection="column" alignItems="center" mb={2}>
            <h3>{x}</h3>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleScoreChange(x, 1)}
          >
            +
          </Button>
          <p style={{ fontSize: '1.5rem', margin: '10px 0' }}>{playerScores[x]}</p>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleScoreChange(x, -1)}
          >
            -
          </Button>
        </Box>
      ))}
      <Button
        variant="contained"
        color="success"
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
