import React from "react";
import { Outlet } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import NavBar from "./components/NavBar";
import "./css/style.css";
import "./App.css";
import Home from "./components/Home";

function App() {
  return (
    <GlobalProvider>
      <NavBar />
      <Home />
      <Outlet />
    </GlobalProvider>
  );
}

export default App;
