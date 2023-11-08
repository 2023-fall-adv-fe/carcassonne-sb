import Button from '@mui/material/Button';
//import CastleTwoToneIcon from '@mui/icons-material/CastleTwoTone';
import { useNavigate } from "react-router-dom";
import { GameResult } from './game-results';
import { FC, useState, useEffect } from 'react';


interface PlayProps {
    addNewGameResult: (r: GameResult) => void;
    setTitle: (t: string) => void;
    chosenPlayers: string[];
};

export const Play: FC<PlayProps> = ({addNewGameResult, setTitle, chosenPlayers}) => {

    useEffect(
        () => setTitle("Play")
        , [setTitle]
    );

    const nav = useNavigate();

    const [startTimestamp, _] = useState(new Date().toISOString());

    const gameOver = (winner: string) => {
        addNewGameResult({
            winner: winner
            , players: chosenPlayers
            , start: startTimestamp
            , end: new Date().toISOString()
        });
        nav(-2);
    };

    return (
        <>
        <h3>
            Play &amp; Collect Data
        </h3>

        {
            chosenPlayers.map(x => (
                <Button
                    key={x}
                    variant="contained"
                    color='success'
                    size="large"
                    sx={{
                        pt: 2
                        , pb: 2
                        , mt: 3
                        , mb: 3
                        , width: {
                            xs: '100%'
                            , md: 'inherit'
                        }
                    }}
                    onClick={
                        () => gameOver(x)
                    }
                >
                    {x} Won
                </Button>
            ))
        }
        {/* <Button
            variant="contained"
            color='error'
            size="large"
            sx={{
                pt: 2
                , pb: 2
                , mt: 3
                , mb: 3
                , width: {
                    xs: '100%'
                    , md: 'inherit'
                }
            }}
            onClick={
                () => gameOver(false)
            }
        >
            I Lost
        </Button> */}

            {/* <Button
                variant='outlined'
                size='large'
                startIcon={
                    <CastleTwoToneIcon />
                }
                endIcon={
                    <CastleTwoToneIcon />
                }
                onClick={
                    () => navigate('/scoreboard')
                }
            >
                Finish Game
            </Button> */}
        </>
    );
};