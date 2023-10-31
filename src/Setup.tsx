import Button from '@mui/material/Button';
import CastleTwoToneIcon from '@mui/icons-material/CastleTwoTone';
import { useNavigate } from "react-router-dom";
import { FC, useState } from 'react';
import { Players } from './Players';


interface SetupProps {
    num: number;
    setNum: any;
    setTitle: (t: string) => void;
};

export const Setup: FC<SetupProps> = ({num, setNum, setTitle}) => {

    setTitle("Setup");

    const navigate = useNavigate();

    //let num = 1;
    //const [num, setNum] = useState(1);

    return (
        <>
            <h2>
                Setup a Game of Carcassone!
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
                // startIcon={
                //     <CastleTwoToneIcon />
                // }
                // endIcon={
                //     <CastleTwoToneIcon />
                // }
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