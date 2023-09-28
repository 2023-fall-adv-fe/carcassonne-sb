import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import CastleTwoToneIcon from '@mui/icons-material/CastleTwoTone';
import { Home } from './Home';
import { Play } from './Play';
import { Setup } from './Setup';
import { Scoreboard } from './Scoreboard';
import { Stats } from './Stats';

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";


const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/stats",
    element: <Stats />,
  },
  {
    path: "/setup",
    element: <Setup />,
  },
  {
    path: "/play",
    element: <Play />,
  },
  {
    path: "/scoreboard",
    element: <Scoreboard />,
  },
]);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
