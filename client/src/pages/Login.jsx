import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { text } from "../localisation/text";

function Login({ setAuth, setRole, setUsername, setName, language }) {
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
          setName(res.data.name);
          if (res.data.role === "Manager") {
            setRole("Manager");
          }
          navigate(`/welcome`);
        }
      })
      .catch((err) => {
        console.log("err", err);
        alert(text[language].loginFail);
      });
  };

  return (
    <>
      <h1>{text[language].login}</h1>
      <form onSubmit={handleSubmit}>
            <label>{text[language].username}</label>
            <input
              type="text"
              name="username"
              value={login.username}
              onChange={handleUsernameChange}
              required
              ></input><br/>
              <label>{text[language].password}</label>
            <input
              type="password"
              name="password"
              value={login.password}
              onChange={handlePasswordChange}
              required
            ></input><br/>
              
        <button>{text[language].login}</button>
      </form>
    </>
  );
}

export default Login;