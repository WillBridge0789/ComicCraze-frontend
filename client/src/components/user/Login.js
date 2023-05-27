import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../context/GlobalState";
import jwtDecode from "jwt-decode";
import NavBar from "../NavBar";
import { ScaleLoader } from "react-spinners";

const Login = () => {
  let navigate = useNavigate();

  const [, dispatch] = useGlobalState();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  
  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    await AuthService.login(username, password)
    .then(async (resp) => {
      let data = jwtDecode(resp.access);
      await dispatch({
        currentUserToken: resp.access,
        currentUser: data,
      });
      navigate("/");
    })
    .catch((error)=> {
      setLoginError(error);
      setIsLoading(false);
    });
  };

  return (
    <>
      <NavBar />
      <main
        className="container-fluid vh-100 text-center p-3 page-head"
        id="login"
      >
        <h1>Login</h1>
        <article className="m-3">
          {isLoading ? (
            <ScaleLoader color="#fff" />
          ) : (
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
              {loginError && 
                <div class="alert alert-danger" role="alert">
                  Login failed! Please try again.
                </div>
              }
              <input type="submit" value="Sign in" />
            </form>
          )}
        </article>
      </main>
    </>
  );
};

export default Login;
