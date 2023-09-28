import Button from '@mui/material/Button';
import CastleTwoToneIcon from '@mui/icons-material/CastleTwoTone';
import { useNavigate } from "react-router-dom";


export const Scoreboard = () => {

    const navigate = useNavigate();

    return (
        <>
            <h3>
                Game Totals
            </h3>
            <Button
                variant='outlined'
                size='large'
                startIcon={
                    <CastleTwoToneIcon />
                }
                endIcon={
                    <CastleTwoToneIcon />
                }
                onClick={
                    () => navigate(-3)
                }
            >
                Home
            </Button>
        </>
    );
};