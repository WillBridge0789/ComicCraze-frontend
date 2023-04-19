import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

function NavBar() {

  return (
    <nav className="navbar navbar-expand-lg bg-subtle" id="top-nav">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="./marvel_logo.png"
            alt="Marvel Logo"
            width="50"
            height="24"
          />
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
          </div>
        </div>
      </div>
    </nav>
  );

}

export default NavBar;
