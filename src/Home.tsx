import Button from '@mui/material/Button';
import CastleTwoToneIcon from '@mui/icons-material/CastleTwoTone';
import { useNavigate } from "react-router-dom";
import { FC } from 'react';


export const appTitle = "Carcassonne Scoreboard";

interface HomeProps {
    setTitle: (t: string) => void;
};

export const Home: FC<HomeProps> = ({setTitle}) => {

    setTitle("Carcassonne Scorboard");

    const navigate = useNavigate();

    return (
        <>
            <Button
                variant='contained'
                size='large'
                sx={{
                    pt: 2
                    , pb: 2
                    , mt: 6
                    , mb: 3
                    , mr: 4
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
                    () => navigate('/setup')
                }
            >
                Setup a Game
            </Button>
            <Button
                variant='contained'
                size='large'
                sx={{
                    pt: 2
                    , pb: 2
                    , mt: 6
                    , mb: 3
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
                    () => navigate('/stats')
                }
            >
                Stats
            </Button>
        </>
    );
};