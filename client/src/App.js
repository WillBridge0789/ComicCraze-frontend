import './App.css';
import { Outlet } from "react-router-dom";
import { GlobalProvider } from './context/GlobalState';
import NavBar from './components/NavBar';


function App() {
  return (
    <GlobalProvider>
      <NavBar />
      <h1>{process.env.REACT_APP_MYENVVAR}</h1>
      <Outlet />
    </GlobalProvider>
  );
}

export default App;