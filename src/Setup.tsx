import Button from '@mui/material/Button';
import CastleTwoToneIcon from '@mui/icons-material/CastleTwoTone';
import { useNavigate } from "react-router-dom";
import { FC, useState } from 'react';


interface SetupProps {
    num: number;
    setNum: any;
};

export const Setup: FC<SetupProps> = ({num, setNum}) => {

    const navigate = useNavigate();

    //let num = 1;
    //const [num, setNum] = useState(1);

    return (
        <>
            <h3>
                Setup a Game of Carcassone!
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
                    () => navigate(-1)
                }
            >
                Home
            </Button>
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
                    //() => navigate('/play')
                    () => {
                        //setNum(num + 1);
                        //console.log(num);

                        setNum(num + 1);
                        navigate('/play');
                    }
                }
            >
                Start the Game
            </Button>
        </>
    );
};