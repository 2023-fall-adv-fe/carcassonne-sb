import { useState } from "react";
import { Button, TextField, List, ListItem, ListItemText, Checkbox } from "@mui/material";

interface Player {
    name: string;
    selected: boolean;
}

export const Players: React.FC<Player> = () => {
    const [name, setName] = useState<string>('');
    const [players, setPlayers] = useState<Player[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);



    const handleAddPlayer = (name: string) => {
        const trimmedName = name.trim();

        if (trimmedName === "" || players.some(player => player.name === trimmedName)) {
            // Prevents blank player names and duplicates

            return;
        }

        const newPlayer: Player = {
            name: trimmedName,
            selected: false
        }

        setPlayers([...players, newPlayer]);
        setName('');
        console.log(players);
    };

    const handleCheckboxChange = (index: number) => {
        const updatedPlayers = [...players];
        updatedPlayers[index].selected = !updatedPlayers[index].selected;
        setPlayers(updatedPlayers);

        const selectedPlayersCount = updatedPlayers.filter(player => player.selected).length;

        if (selectedPlayersCount < 2 || selectedPlayersCount > 5) {
            setErrorMessage("You must select 2 to 5 players.");
        } else {
            setErrorMessage(null);
        }
};

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission
        handleAddPlayer(name);
    };


    return (

        <div>
            <h3>Add New Player</h3>
            <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', maxWidth: '400px' }}>
                <TextField
                    label="Enter player name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ flex: 1, marginRight: '8px' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddPlayer(name)}
                    style={{ flex: 'none', background: '#042B61', color: '#E8CD8A' }}
                >
                    Add Player
                </Button>
            </div>
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <List>
                {players.map((player, index) => (
                <ListItem key={index}>
                    <Checkbox
                    checked={player.selected}
                    onChange={() => handleCheckboxChange(index)}
                    />
                    <ListItemText primary={player.name} />
                </ListItem>
                ))}
            </List>
        </div>
    );
};