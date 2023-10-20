import { useState } from "react";


interface Player {
    name: string;
}

export const Players: React.FC<Player> = () => {
    const [name, setName] = useState<string>('');
    const [players, setPlayers] = useState<Player[]>([]);


    const handleAddPlayer = (name: string) => {
        

        const newPlayer: Player = {
            name: name
        }

        setPlayers([...players, newPlayer]);
        console.log(players);
    };


    return (

        <div>
            <h3>Add New Player</h3>
            <input
                type="text"
                placeholder="Enter player name"
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={() => handleAddPlayer(name)}>Add Player</button>

            <ul>
                {players.map((player, index) => (
                    <li key={index}>{player.name}</li>
                ))}
            </ul>
        </div>


    );
};