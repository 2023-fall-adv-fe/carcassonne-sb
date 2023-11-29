import Button from '@mui/material/Button';
import CastleTwoToneIcon from '@mui/icons-material/CastleTwoTone';
import { useNavigate } from 'react-router-dom';
import { FC, useState, useEffect } from 'react';
import { Players } from './Players';
import Grid from '@mui/material/Unstable_Grid2';
import { Alert, Box, Checkbox, FormControlLabel, Snackbar, TextField, Select, MenuItem } from '@mui/material';

interface SetupProps {
    num: number;
    setNum: any;
    setTitle: (t: string) => void;
    previousPlayers: string[];
    setChosenPlayers: (players: string[]) => void;
}

export const Setup: FC<SetupProps> = ({ num, setNum, setTitle, previousPlayers, setChosenPlayers }) => {
    const [availablePlayers, setAvailablePlayers] = useState(
        previousPlayers.map((x) => ({
            name: x,
            checked: false,
        }))
    );

    const [showWarning, setShowWarning] = useState(false);
    const [newPlayerName, setNewPlayerName] = useState('');
    const [playerColors, setPlayerColors] = useState<Record<string, string>>({});
    const [colorWarning, setColorWarning] = useState(false);

    useEffect(() => setTitle('Setup'), [setTitle]);

    const navigate = useNavigate();

    const atLeastTwoPlayersChecked =
        availablePlayers.filter((x) => x.checked).length >= 2 &&
        availablePlayers.filter((x) => x.checked).length <= 5;

    const validateAndAddNewPlayer = () => {
        if (newPlayerName.length === 0 || availablePlayers.some((s) => s.name.toUpperCase() === newPlayerName.toUpperCase())) {
            return;
        }

        setAvailablePlayers(
            [
                ...availablePlayers,
                {
                    name: newPlayerName,
                    checked: true,
                },
            ].sort((a, b) => a.name.localeCompare(b.name))
        );
        setNewPlayerName('');
    };

    const handleColorChange = (playerName: string, color: string) => {

        const isColorAlreadySelected = Object.values(playerColors).includes(color);
    
        if (!isColorAlreadySelected || playerColors[playerName] === color) {
            setPlayerColors((prevColors) => ({
                ...prevColors,
                [playerName]: color,
            }));
        } else {
           setColorWarning(true);
        }
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={showWarning}
                autoHideDuration={2500}
                onClose={() => setShowWarning(false)}
                sx={{
                    mt: '25%',
                    border: '1px solid red',
                    
                }}
            >
                <Alert severity="warning" sx={{ width: '100%'}}>
                    Choose 2 to 5 players.
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={colorWarning}
                autoHideDuration={2500}
                onClose={() => setColorWarning(false)}
                sx={{
                    mt: '25%',
                    border: '1px solid red',
                    
                }}
            >
                <Alert severity="warning" sx={{ width: '100%' }}>
                    Players must choose different colors.
                </Alert>
            </Snackbar>

            <h2>Choose Players!</h2>
            <Players name={''} selected={false} />

            <Button
                variant="contained"
                size="large"
                sx={{
                    pt: 2,
                    pb: 2,
                    mt: 6,
                    mb: 3,
                    bgcolor: '#042B61',
                    color: '#E8CD8A',
                    width: {
                        xs: '100%',
                        md: 'inherit',
                    },
                }}
                onClick={() => navigate(-1)}
            >
                Home
            </Button>

            <Button
                variant="contained"
                size="large"
                sx={{
                    pt: 2,
                    pb: 2,
                    mt: 6,
                    mb: 3,
                    bgcolor: '#042B61',
                    color: '#E8CD8A',
                    "&:hover": {
                        bgcolor: '#042B61',
                    },
                    width: {
                        xs: '100%',
                        md: 'inherit',
                    },
                }}
                startIcon={<CastleTwoToneIcon />}
                endIcon={<CastleTwoToneIcon />}
                onClick={() => {
                    if (!atLeastTwoPlayersChecked) {
                        setShowWarning(true);
                        return;
                    }

                    setChosenPlayers(
                        availablePlayers
                            .filter((x) => x.checked)
                            .map((x) => x.name)
                    );

                    setNum(num + 1);
                    navigate('/play',{ state: { playerColors } });
                }}
            >
                Start the Game
            </Button>

            <Box
                sx={{
                    mt: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    maxWidth: '900px',
                }}
            >
                <TextField
                    label="Enter new player name"
                    variant="outlined"
                    fullWidth
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                />
                <Button
                    variant={newPlayerName.length === 0 ? 'outlined' : 'contained'}
                    style={{
                        background: newPlayerName.length === 0 ? 'transparent' : '#042B61',
                        color: newPlayerName.length === 0 ? '#000000' : '#E8CD8A',
                    }}
                    onClick={validateAndAddNewPlayer}
                >
                    ADD
                </Button>
            </Box>

            <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
                {availablePlayers.map((x) => (
                    <Grid key={x.name} xs={12} sm={6} md={4} lg={2}>
                        <FormControlLabel
                            control={
                                <>
                                    <Checkbox
                                        checked={x.checked}
                                        onChange={(e) =>
                                            setAvailablePlayers([
                                                ...availablePlayers.map((y) => ({
                                                    name: y.name,
                                                    checked: y.name === x.name ? !y.checked : y.checked,
                                                })),
                                            ])
                                        }
                                    />

                                </>
                            }
                            label={x.name}
                            
                        />
                            {x.checked && (
                                <Select
                                    value={playerColors[x.name] || ''}
                                    onChange={(e) => handleColorChange(x.name, e.target.value)}
                                    displayEmpty
                                >
                                    <MenuItem value="" disabled>
                                        Select Color
                                    </MenuItem>
                                    <MenuItem value="#d73b3e">Red</MenuItem>
                                    <MenuItem value="#6495ed">Blue</MenuItem>
                                    <MenuItem value="#8fbc8f">Green</MenuItem>
                                    <MenuItem value="#fffacd">Yellow</MenuItem>
                                    <MenuItem value="#A9A9A9">Black</MenuItem>
                                </Select>
                            )}
                    </Grid>
                ))}
            </Grid>
        </>
    );
};
