import Button from '@mui/material/Button';
import CastleTwoToneIcon from '@mui/icons-material/CastleTwoTone';
import { useNavigate } from "react-router-dom";
import { GameResult } from './game-results';
import { FC, useState } from 'react';


interface PlayProps {
    addNewGameResult: (r: GameResult) => void;
    setTitle: (t: string) => void;
};

export const Play: FC<PlayProps> = ({addNewGameResult, setTitle}) => {

    setTitle("Play");

    const nav = useNavigate();

    const [startTimestamp, _] = useState(new Date().toISOString());

    const gameOver = (won: boolean) => {
        addNewGameResult({
            winner: "Moe"
            , players: ["Larry", "Curly", "Moe"]
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
                () => gameOver(true)
            }
        >
            I Won
        </Button>
        <Button
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