import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useGlobalState } from "../context/GlobalState";
import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import jwtDecode from "jwt-decode";

function NavBar({ onComicsSearch = false }) {
  const [state, dispatch] = useGlobalState();
  const [comicSearchQuery, setComicSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!state?.currentUser?.user_id);

  useEffect(() => {
      setIsLoggedIn(!!state?.currentUser?.user_id);
  }, [state?.currentUser?.user_id]);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));

    const initialState = {
      currentUser: user ? jwtDecode(user.access) : null,
      currentUserToken: user ? user.access : null,
    };

    dispatch(initialState);
  }, [dispatch]);

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    onComicsSearch(formData.get("comic-search-query"));
  }
  
  const handleLogout = async () => {
    AuthService.logout();
    await dispatch(state, {currentUser: null})
    setIsLoggedIn(false);
  }

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
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <Link
              to="/comics"
              className="nav-link"
            >
              Comics
            </Link>
            <Link to="/favorites" className="nav-link">
              Favorites
            </Link>
            {isLoggedIn ? (
              <Link to="/" className="nav-link" id="logout" onClick={handleLogout}>
                Logout
              </Link>
            ) : (
              <>
                <Link to="/register" className="nav-link">
                  Sign Up!
                </Link>

                <Link to="/login" className="nav-link" id="login">
                  Login
                </Link>
              </>
            )}
            <Link to="/cart" className="nav-link">
              Cart
            </Link>
          </div>
          {onComicsSearch && (
            <form
              className="d-flex p-2"
              id="comic-input"
              method="post"
              onSubmit={handleSubmit}
            >
              <input
                name="comic-search-query"
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setComicSearchQuery(e.target.value)}
                value={comicSearchQuery}
              ></input>
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
