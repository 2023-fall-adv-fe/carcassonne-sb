import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import CastleTwoToneIcon from '@mui/icons-material/CastleTwoTone';

function App() {
  return (
    <div className="App">
      <Button
        variant='outlined'
        size='large'
        endIcon={
          <CastleTwoToneIcon />
        }
      >
        Play Carcassonne!
      </Button>
    </div>
  );
}

export default App;
