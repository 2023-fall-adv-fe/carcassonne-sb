import './App.css';
import { Home } from './Home';
import { Play } from './Play';
import { Setup } from './Setup';
import { Scoreboard } from './Scoreboard';
import { Stats } from './Stats';

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { useState } from 'react';




const App = () => {

  const [num, setNum] = useState(1);


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
      element: <Setup 
        num={num}
        setNum={setNum}
      />,
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

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
