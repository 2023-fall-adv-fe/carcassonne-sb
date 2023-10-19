import Button from '@mui/material/Button';
import CastleTwoToneIcon from '@mui/icons-material/CastleTwoTone';
import { useNavigate } from "react-router-dom";
import {
     Typography
    , Paper
    , Table
    , TableBody
    , TableRow
    , TableCell
    , Box
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { GeneralGameTimeFactsDisplay, WinningPercentageDisplay } from './game-results';
import { FC } from 'react';



interface StatsProps {
    winningPercentageDisplay: WinningPercentageDisplay
    , generalGameTimeFacts: GeneralGameTimeFactsDisplay
}

export const Stats: FC<StatsProps> = ({
    winningPercentageDisplay
    , generalGameTimeFacts
}) => {

    const navigate = useNavigate();

    return (
        <>
            <h3>
                Stats
            </h3>
            <Button
                variant='contained'
                size='large'
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
                <Typography
                    fontSize={20}
                >
                    Home
                </Typography>
            </Button>
            <Grid
                container
                spacing={3}
            >
                <Grid
                    xs={12}
                    md={6}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            overflow: 'hidden'
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 20
                                , ml: 3
                                , mt: 3
                                , mb: 3
                            }}
                            color='text.disabled'
                            gutterBottom
                        >
                            GENERAL
                        </Typography>
                        <Box
                        sx={{
                            pl: 1
                            , pr: 1
                        }}
                    >
                        <Table
                            sx={{
                                mt: 0
                            }}
                        >
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Typography
                                            fontSize={20}
                                        >
                                            Total Games
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            fontSize={20}
                                        >
                                            {winningPercentageDisplay.totalGames}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        }
                                    }}
                                >
                                    <TableCell>
                                        <Typography
                                            fontSize={20}
                                        >
                                            Winning %
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            fontSize={20}
                                        >
                                            {winningPercentageDisplay.winningPercentage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>                        
                                <TableRow
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        }
                                    }}
                                >
                                    <TableCell>
                                        <Typography
                                            fontSize={20}
                                        >
                                            Last Played
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            fontSize={20}
                                        >
                                            {generalGameTimeFacts.lastPlayed} ago
                                        </Typography>
                                    </TableCell>
                                </TableRow> 
                                <TableRow
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        }
                                    }}
                                >
                                    <TableCell>
                                        <Typography
                                            fontSize={20}
                                        >
                                            Shortest Game
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            fontSize={20}
                                        >
                                            {generalGameTimeFacts.shortestGame}
                                        </Typography>
                                    </TableCell>
                                </TableRow> 
                                <TableRow
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        }
                                    }}
                                >
                                    <TableCell>
                                        <Typography
                                            fontSize={20}
                                        >
                                            Longest Game
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            fontSize={20}
                                        >
                                            {generalGameTimeFacts.longestGame}
                                        </Typography>
                                    </TableCell>
                                </TableRow> 
                            </TableBody>
                        </Table>
                    </Box>
                </Paper>
            </Grid>
      </Grid>
        </>
    );
};