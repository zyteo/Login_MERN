import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setAuth, setRole, setUsername, language }) {
  const [login, setLogin] = useState({});
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setLogin({ ...login, username: value });
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setLogin({ ...login, password: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(`/api/login`, login)
      .then((res) => {
        if (res.data.success === true) {
          setAuth("Auth");
          setUsername(res.data.username);
          if (res.data.role === "Manager") {
            setRole("Manager");
          }
          navigate(`/welcome`);
        }
      })
      .catch((err) => {
        console.log("err", err);
        alert(
          `Sorry, login failed! If you do not have an account, please sign up for one.`
        );
      });
  };


  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={login.username}
              onChange={handleUsernameChange}
              required
              ></input>
              <label>Password:</label>
            <input
              type="password"
              name="password"
              value={login.password}
              onChange={handlePasswordChange}
              required
            ></input>
              
        <button onClick={handleSubmit}>Login</button>
      </form>
    </>
  );
}

export default Login;
