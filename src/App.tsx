import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import CastleOutlinedIcon from '@mui/icons-material/CastleOutlined';

function App() {
  return (
    <div className="App">
      <Button
        variant='outlined'
        size='large'
        endIcon={
          <CastleOutlinedIcon />
        }
      >
        Play Carcassonne!
      </Button>
    </div>
  );
}

export default App;
