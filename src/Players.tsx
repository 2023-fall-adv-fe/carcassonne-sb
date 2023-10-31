import { useState } from "react";
import { Button, TextField, List, ListItem, ListItemText, Checkbox } from "@mui/material";

interface Player {
    name: string;
    selected: boolean;
}

export const Players: React.FC<Player> = () => {
    const [name, setName] = useState<string>('');
    const [players, setPlayers] = useState<Player[]>([]);


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