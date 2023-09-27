import Button from '@mui/material/Button';
import CastleTwoToneIcon from '@mui/icons-material/CastleTwoTone';
import { useNavigate } from "react-router-dom";


export const Home = () => {

    const navigate = useNavigate();

    return (
        <>
            <h3>
                Carcassone Scoreboard!
            </h3>
            <Button
                variant='outlined'
                size='large'
                endIcon={
                    <CastleTwoToneIcon />
                }
                onClick={
                    () => navigate('/setup')
                }
              >
                Play Carcassonne!
            </Button>
        </>
    );
};