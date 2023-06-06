import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./css/style.css";
import "./App.css";
import Home from "./components/Home";

function App() {
  return (
    <>
      <NavBar />
      <Home />
      <Outlet />
    </>
  );
}

export default App;
