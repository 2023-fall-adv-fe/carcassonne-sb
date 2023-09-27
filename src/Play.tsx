import Button from '@mui/material/Button';
import CastleTwoToneIcon from '@mui/icons-material/CastleTwoTone';
import { useNavigate } from "react-router-dom";


export const Play = () => {

    const navigate = useNavigate();

    return (
        <>
            <h3>
                Play &amp; Collect Data
            </h3>
            <Button
                variant='outlined'
                size='large'
                endIcon={
                    <CastleTwoToneIcon />
                }
                onClick={
                    () => navigate(-2)
                }
              >
                Done
            </Button>
        </>
    );
};