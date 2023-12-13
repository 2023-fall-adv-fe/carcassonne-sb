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
    averages: {
        averageWinnerScore: number;
        averageCityScore: number;
        averageRoadScore: number;
        averageCloisterScore: number;
        averageFarmScore: number;
      };
}

export const Stats: FC<StatsProps> = ({
    //winningPercentageDisplay
    generalGameTimeFacts
    , leaderboard
    , averages
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
                                    <TableCell>PLAYER</TableCell>
                                    <TableCell>W</TableCell>
                                    <TableCell>L</TableCell>
                                    <TableCell>AVG</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    leaderboard.map(x => (
                                        <TableRow
                                            key={x.name}
                                        >
                                            <TableCell>{x.name}</TableCell>
                                            <TableCell>{x.wins}</TableCell>
                                            <TableCell>{x.losses}</TableCell>
                                            <TableCell>{x.avg.toFixed(3)}</TableCell>
                                        </TableRow>
                                    ))
                                }
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
                            AVG POINTS
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
                                            Winners
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            fontSize={20}
                                        >
                                            {
                                                averages.averageWinnerScore.toFixed(2)
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
                                            Cities
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            fontSize={20}
                                        >
                                            {
                                                averages.averageCityScore.toFixed(2)
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
                                            Roads
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            fontSize={20}
                                        >
                                            {
                                               averages.averageRoadScore.toFixed(2)
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
                                            Cloisters
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            fontSize={20}
                                        >
                                            {
                                                averages.averageCloisterScore.toFixed(2)
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
                                            Farms
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            fontSize={20}
                                        >
                                            {
                                               averages.averageFarmScore.toFixed(2)
                                            }
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