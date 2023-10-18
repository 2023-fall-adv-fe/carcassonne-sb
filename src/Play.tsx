import Button from '@mui/material/Button';
import CastleTwoToneIcon from '@mui/icons-material/CastleTwoTone';
import { useNavigate } from "react-router-dom";
import { GameResult } from './game-results';
import { FC, useState } from 'react';


interface PlayProps {
    addNewGameResult: (r: GameResult) => void;
};

export const Play: FC<PlayProps> = ({addNewGameResult}) => {

    const nav = useNavigate();

    const [startTimestamp, _] = useState(new Date().toISOString());

    const gameOver = (won: boolean) => {
        addNewGameResult({
            won: won
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
        <Button
            variant="outlined"
            size="large"
            onClick={
                () => gameOver(true)
            }
        >
            I Won
        </Button>
        <Button
            variant="outlined"
            size="large"
            onClick={
                () => gameOver(false)
            }
        >
            I Lost
        </Button>

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