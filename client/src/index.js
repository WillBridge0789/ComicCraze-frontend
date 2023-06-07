import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalProvider } from "./context/GlobalState";
import App from "./App";
import "./css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Comics from "./components/Comics";
import Favorites from "./components/Favorites";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import Cart from "./components/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <App />
  },
  {
    path: "/comics",
    element: <Comics />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/cart",
    element: <Cart />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode>
);
