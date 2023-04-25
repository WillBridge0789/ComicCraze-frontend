import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useGlobalState } from "../context/GlobalState";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";

function NavBar() {
  const [state, dispatch] = useGlobalState();
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));

    const initialState = {
      currentUser: user ? jwtDecode(user.access) : null,
      currentUserToken: user ? user.access : null,
    };

    dispatch(initialState);
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg bg-subtle align-items-center"
      id="top-nav"
    >
      <div className="container-fluid">
        <a className="navbar-brand" id="home-logo" href="/">
          CC
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {/* <Link to="/" className="nav-link nav-home">
              Home
            </Link> */}
            <Link to="/comics" className="nav-link">
              Comics
            </Link>
            <Link to="/favorites" className="nav-link">
              Favorites
            </Link>
            <Link to="/register" className="nav-link">
              Sign Up!
            </Link>
            {state.currentUser && state.currentUser.user_id ? (
              <Link to="/" className="nav-link" id="logout">
                Logout
              </Link>
            ) : (
              <Link to="/login" className="nav-link" id="login">
                Login
              </Link>
            )}
            <Link to="/cart" className="nav-link">
              Cart
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
