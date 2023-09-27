import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import CastleTwoToneIcon from '@mui/icons-material/CastleTwoTone';

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <div>Home</div>,
  },
  {
    path: "/setup",
    element: <div>Setup</div>,
  },
  {
    path: "/play",
    element: <div>Play</div>,
  },
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* <Button
        variant='outlined'
        size='large'
        endIcon={
          <CastleTwoToneIcon />
        }
      >
        Play Carcassonne!
      </Button> */}
    </div>
  );
}

export default App;
