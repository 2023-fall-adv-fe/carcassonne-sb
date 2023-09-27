import Button from '@mui/material/Button';
import CastleTwoToneIcon from '@mui/icons-material/CastleTwoTone';
import { useNavigate } from "react-router-dom";


export const Setup = () => {

    const navigate = useNavigate();

    return (
        <>
            <h3>
                Setup a Game of Carcassone!
            </h3>
            <Button
                variant='outlined'
                size='large'
                endIcon={
            <CastleTwoToneIcon />
            }
            onClick={
                () => navigate('/play')
            }
            >
                Start the Game
            </Button>
        </>
    );
};