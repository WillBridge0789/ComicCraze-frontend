import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalProvider } from './context/GlobalState';
import App from './App';
import "./css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Comics from './components/Comics';
import Home from './components/Home';
import Favorites from './components/Favorites';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/comics",
    element: <Comics />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode>
);
  
