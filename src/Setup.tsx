import Button from '@mui/material/Button';
import CastleTwoToneIcon from '@mui/icons-material/CastleTwoTone';
import { useNavigate } from "react-router-dom";
import { FC, useState, useEffect } from 'react';
import { Players } from './Players';
import Grid from '@mui/material/Unstable_Grid2';
import { Alert, Checkbox, FormControlLabel, Snackbar } from '@mui/material';


interface SetupProps {
    num: number;
    setNum: any;
    setTitle: (t: string) => void;
    previousPlayers: string[];
};

export const Setup: FC<SetupProps> = ({num, setNum, setTitle, previousPlayers}) => {

    const [availablePlayers, setAvailablePlayers] = 
        useState(previousPlayers.map(x => ({
            name: x
            , checked: false
        })));

    const [showWarning, setShowWarning] = useState(false);


    const atLeastTwoPlayersChecked = availablePlayers
    .filter(x => x.checked)
    .length >= 2 
    && availablePlayers
    .filter(x => x.checked)
    .length <= 5;

    useEffect(
        () => setTitle("Setup")
        , [setTitle]
    );

    const navigate = useNavigate();

    //let num = 1;
    //const [num, setNum] = useState(1);

    return (
        <>

            <Snackbar 
                anchorOrigin={{
                    vertical: "top"
                    , horizontal: "center"
                }}
                open={showWarning} 
                autoHideDuration={2500} 
                onClose={
                    () => setShowWarning(false)
                    }>
                <Alert 
                    severity="warning" 
                    sx={{ width: '100%' }}>
                        Choose 2 to 5 players.
                </Alert>
            </Snackbar>

            <h2>
                Choose Players!
            </h2>
            <Players name={''} selected={false} />
            <Button
                variant='contained'
                size='large'
                sx={{
                    pt: 2
                    , pb: 2
                    , mt: 6
                    , mb: 3
                    , mr: 4
                    , bgcolor: '#042B61'
                    , color: '#E8CD8A'
                    , width: {
                        xs: '100%'
                        , md: 'inherit'
                    }
                }}
                onClick={
                    () => navigate(-1)
                }
            >
                Home
            </Button>
            <Button
                variant='contained'
                size='large'
                sx={{
                    pt: 2
                    , pb: 2
                    , mt: 6
                    , mb: 3
                    , bgcolor: '#042B61'
                    , color: '#E8CD8A'
                    // removes hover effect
                    , "&:hover": {
                        bgcolor: '#042B61'
                    }
                    , width: {
                        xs: '100%'
                        , md: 'inherit'
                    }
                }}
                startIcon={
                    <CastleTwoToneIcon />
                }
                endIcon={
                    <CastleTwoToneIcon />
                }
                onClick={
                    () => {
                        if (!atLeastTwoPlayersChecked) {
                            setShowWarning(true);
                            return;
                        }
                        setNum(num + 1);
                        navigate('/play');
                    }
                }
            >
                Start the Game
            </Button>
            <Grid
                container
                spacing={2}
                sx={{
                    mt: 2
                    , mb: 2
                }}
            >
                {
                    availablePlayers.map(x => (
                        <Grid
                        xs={12}
                        sm={6}
                        md={4}
                        lg={2}
                    >
                        <FormControlLabel 
                                control={
                                    <Checkbox 
                                        checked={x.checked}
                                        onChange={
                                            (e) => setAvailablePlayers(
                                                [
                                                    ...availablePlayers.map(y => ({
                                                        name: y.name
                                                        , checked: y.name === x.name ? !y.checked : y.checked
                                                    }))
                                                ]
                                            )
                                        }
                                    />
                                } 
                                label={x.name} 
                            />
                    </Grid>
                    ))
                }
            </Grid>
        </>
    );
};