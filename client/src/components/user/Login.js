import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../context/GlobalState";
import jwtDecode from "jwt-decode";
import NavBar from "../NavBar";

const Login = () => {
  let navigate = useNavigate();

  const [, dispatch] = useGlobalState();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    let resp = await AuthService.login(username, password);
    let data = jwtDecode(resp.access);
    await dispatch({
      currentUserToken: resp.access,
      currentUser: data,
    });
    navigate("/");

  };

  return (
    <>
      <NavBar />
      <main
        className="container mx-auto vh-100 text-center p-3 page-head"
        id="login"
      >
        <h1>Login</h1>
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
      </main>
    </>
  );
};

export default Login;
