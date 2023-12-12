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
    , Box,
    TableHead
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { GeneralGameTimeFactsDisplay, LeaderboardEntry } from './game-results';
import { FC } from 'react';



interface StatsProps {
    //winningPercentageDisplay: WinningPercentageDisplay
    generalGameTimeFacts: GeneralGameTimeFactsDisplay
    leaderboard: LeaderboardEntry[];
}

export const Stats: FC<StatsProps> = ({
    //winningPercentageDisplay
    generalGameTimeFacts
    , leaderboard
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
                            , height: '100%'
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
                                            {generalGameTimeFacts.totalGames}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                {/* <TableRow
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
                                </TableRow>                         */}
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
                                            {
                                                generalGameTimeFacts.totalGames > 0
                                                ? `${generalGameTimeFacts.lastPlayed} ago`
                                                : ''
                                            }
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
                                            {/* {generalGameTimeFacts.shortestGame} */}
                                            {
                                                generalGameTimeFacts.totalGames > 0
                                                ? generalGameTimeFacts.shortestGame
                                                : ''
                                            }
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
                                            {/* {generalGameTimeFacts.longestGame} */}
                                            {
                                                generalGameTimeFacts.totalGames > 0
                                                ? generalGameTimeFacts.longestGame
                                                : ''
                                            }
                                        </Typography>
                                    </TableCell>
                                </TableRow> 
                            </TableBody>
                        </Table>
                    </Box>
                    </Paper>
                </Grid>



                <Grid
                    xs={12}
                    md={6}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            overflow: 'hidden'
                            , height: '100%'
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
                            LEADERBOARD
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
                            <TableHead>
                                <TableRow>
                                    <TableCell>W</TableCell>
                                    <TableCell>L</TableCell>
                                    <TableCell>Win %</TableCell>
                                    <TableCell>PLAYER</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    leaderboard.map(x => (
                                        <TableRow
                                            key={x.name}
                                        >
                                            <TableCell>{x.wins}</TableCell>
                                            <TableCell>{x.losses}</TableCell>
                                            <TableCell>{x.avg.toFixed(3)}</TableCell>
                                            <TableCell>{x.name}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Box>
                    </Paper>
                </Grid>



                {/* <Grid
                    xs={12}
                    md={6}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            overflow: 'hidden'
                            , height: '100%'
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
                            AVERAGE POINTS
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
                            <TableHead>
                                <TableRow>
                                    <TableCell>Winners</TableCell>
                                    <TableCell>Cities</TableCell>
                                    <TableCell>Roads</TableCell>
                                    <TableCell>Cloisters</TableCell>
                                    <TableCell>Farms</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    leaderboard.map(x => (
                                        <TableRow
                                            key={x.name}
                                        >
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Box>
                    </Paper>
                </Grid> */}



            </Grid>
        </>
    );
};