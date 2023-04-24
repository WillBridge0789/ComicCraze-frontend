import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../context/GlobalState";
import jwtDecode from "jwt-decode";
import NavBar from "../NavBar";
import Profile from "./Profile";

const Login = () => {
  let navigate = useNavigate();

  const [state, dispatch] = useGlobalState();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    AuthService.login(username, password).then(async (resp) => {
      let data = jwtDecode(resp.access);
      await dispatch({
        currentUserToken: resp.access,
        currentUser: data,
      });
      navigate("/profile");
    });
  };

  // if (handleLogin) {
  //   const logoImg = <img src="./LoggedInLogo.png" />;
  //   const navLink = document.querySelector("login");
  //   navLink.innerHTML = logoImg;
  // }

  return (
    <>
      <NavBar />
      <div
        className="container mx-auto vh-100 text-center p-3 page-head"
        id="log_in"
      >
        <h3>Login</h3>
        <div className="c-form m-3">
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="pass">Password:</label>
              <input
                type="password"
                id="pass"
                name="password"
                minLength="8"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Sign in" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
