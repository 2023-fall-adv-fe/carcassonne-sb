import { durationFormatter } from 'human-readable';

const format = durationFormatter<string>();

const justDaysFormat = durationFormatter<string>({
	allowMultiples: ["y", "mo", "d"]
});

export type GameResult = {
    
    winner: string;
    players: string[];
    
    start: string;
    end: string;

    playerScores: { [player: string]: number };
    cityScores: { [player: string]: number };
    roadScores: { [player: string]: number };
    cloisterScores: { [player: string]: number };
    farmScores: { [player: string]: number };
};

export interface GeneralGameTimeFactsDisplay {
    lastPlayed: string; 
    shortestGame: string;
    longestGame: string;
    totalGames: number;
};

export interface LeaderboardEntry {
    wins: number;
    losses: number;
    avg: number;
    name: string;
};

export const getGeneralGameTimeFacts = (
    results: GameResult[]
    , fromDateMilliseconds: number 
): GeneralGameTimeFactsDisplay => {

    const gameEndDatesInMilliseconds = results
        .map(x => Date.parse(x.end))
        .filter(x => x <= fromDateMilliseconds)
    ;

    const gameDurationsInMilliseconds = results
        .filter(x => Date.parse(x.end) <= fromDateMilliseconds)
        .map(x => Date.parse(x.end) - Date.parse(x.start))
    ;

    return {
        totalGames: results.length
        , lastPlayed: justDaysFormat(fromDateMilliseconds - Math.max(...gameEndDatesInMilliseconds))
        , shortestGame: format(Math.min(...gameDurationsInMilliseconds))
        , longestGame: format(Math.max(...gameDurationsInMilliseconds))
    };
};

export const getPreviousPlayers = (results: GameResult[]) => {

    const previousPlayers = results.flatMap(x => x.players);

    return [
        ...new Set(previousPlayers)
    ].sort(
        (a, b) => a.localeCompare(b)
    );
};




const getPlayerRecord = (
    player: string
    , results: GameResult[]
): LeaderboardEntry => {

    const wins = results.filter(x => x.winner === player).length;
    
    const gamesPlayerPlayed = results.filter(
        x => x.players.some(
            y => y === player
        )
    ).length;

    const losses = gamesPlayerPlayed - wins;

    return {
        wins: wins
        , losses: losses
        , avg: wins / gamesPlayerPlayed
        , name: player
    };
};

export const getLeaderboardData = (results: Array<GameResult>): LeaderboardEntry[] => {

    const previousPlayers = getPreviousPlayers(results);

    return previousPlayers.map(
        x => getPlayerRecord(x, results)
    ).sort(
       // (a, b) => b.avg - a.avg
        (a, b) => (b.avg * 1000 + b.wins + b.losses) - (a.avg  * 1000 + a.wins + a.losses)
       // (a, b) => (b.avg * Number.MAX_VALUE + b.wins + b.losses) - (a.avg  * Number.MAX_VALUE + a.wins + a.losses)
    );
};

export const calculateAverages = (results: GameResult[]): {
    averageWinnerScore: number,
    averageCityScore: number,
    averageRoadScore: number,
    averageCloisterScore: number,
    averageFarmScore: number
} => {
    try {
        const validResults = results.filter(result => {
            // Check if the necessary properties are present
            return (
                result.winner &&
                result.playerScores &&
                result.playerScores[result.winner] !== undefined
            );
        });

        const totalWinnersScore = validResults.reduce((sum, result) => {
            const winner = result.winner;
            const winnerScore = result.playerScores[winner];
            return sum + winnerScore;
        }, 0);

        const totalCityScore = validResults.reduce((sum, result) => {
            const cityScore = Object.values(result.cityScores).reduce((citySum, score) => citySum + score, 0);
            return sum + cityScore;
        }, 0);

        const totalRoadScore = validResults.reduce((sum, result) => {
            const roadScore = Object.values(result.roadScores).reduce((roadSum, score) => roadSum + score, 0);
            return sum + roadScore;
        }, 0);

        const totalCloisterScore = validResults.reduce((sum, result) => {
            const cloisterScore = Object.values(result.cloisterScores).reduce((cloisterSum, score) => cloisterSum + score, 0);
            return sum + cloisterScore;
        }, 0);

        const totalFarmScore = validResults.reduce((sum, result) => {
            const farmScore = Object.values(result.farmScores).reduce((farmSum, score) => farmSum + score, 0);
            return sum + farmScore;
        }, 0);

        const totalPlayers = validResults.reduce((sum, result) => {
            return sum + Object.keys(result.playerScores).length;
        }, 0);

        const totalGames = validResults.length;

        return {
            averageWinnerScore: totalWinnersScore / totalGames,
            averageCityScore: totalCityScore / totalPlayers,
            averageRoadScore: totalRoadScore / totalPlayers,
            averageCloisterScore: totalCloisterScore / totalPlayers,
            averageFarmScore: totalFarmScore / totalPlayers,
        };
    } catch (error) {
        console.error('Error in calculateAverages:', error);
        throw error;
    }
};




