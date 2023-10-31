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
        

        const newPlayer: Player = {
            name: name,
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
                <TextField
                    label="Enter player name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => {
                    return setName(e.target.value);
                    }}
                />
                <Button variant="contained" color="primary" onClick={() => handleAddPlayer(name)}>
                    Add Player
                </Button>
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