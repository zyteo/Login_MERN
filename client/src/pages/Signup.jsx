import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { text } from "../localisation/text";
import styled from "styled-components";

const Label = styled.label`
  margin: 7px 5px;
`;
const Input = styled.input`
font-family: "Spartan", sans-serif;
  margin: 5px;
  padding: 2px;
  border: 1px solid black;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 16px;
  @media only screen and (max-width: 600px) {
    border: 1px solid black;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    position:relative;
  }
`;

const Button = styled.button`
  font-family: "Spartan", sans-serif;
  font-weight: bold;
  padding: 10px;
  margin: 6px 2px;
  border: none;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 16px;
  background-color: #EFBE93;
  transition: all 0.5s ease;
  &:hover {
    background-color: rgb(228, 228, 228);
    transform: translateY(-0.5rem) scale(1.02);
    color: #000;
  }
  &:active {
    background-color: grey};
  }
  @media only screen and (max-width: 600px) {
    border: none;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 10px;
    position: relative;
  }
  @media only screen and (max-width: 400px) {
    font-size: 8px;
  }
  @media only screen and (max-width: 300px) {
    font-size: 6px;
  }
  `;
  

function SignUp({ language }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const addUser = async (user) => {
    await axios
      .post(`/api/signup`, user)
      .then((res) => {
        alert(text[language].signupSuccess);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.data.message === "username exists") {
          alert(text[language].signupUserTaken);
        } else if (err.response.data.message === "name exists") {
          alert(text[language].signupNameTaken);
        } else {
          alert(text[language].signupError);
        }
      });
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, name: value });
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, username: value });
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, password: value });
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, confirmPassword: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.password.length < 6) {
      alert(text[language].signupShortPW);
    } else if (user.confirmPassword !== user.password) {
      alert(text[language].signupUnmatchedPW);
    } else {
      addUser(user);
    }
  };

  return (
    <>
      <h1>{text[language].signupNewUser}</h1>
      <form onSubmit={handleSubmit}>
        <Label>{text[language].name}</Label>
        <Input
          type="text"
          name="name"
          value={user.name}
          onChange={handleNameChange}
          required
        ></Input>
        <br />
        <Label>{text[language].username}</Label>
        <Input
          type="text"
          name="username"
          value={user.username}
          onChange={handleUsernameChange}
          required
        ></Input>
        <br />
        <Label>{text[language].password}</Label>
        <Input
          type="password"
          name="password"
          value={user.password}
          onChange={handlePasswordChange}
          required
        ></Input>
        <br />
        <Label>{text[language].confirmPassword}</Label>
        <Input
          type="password"
          name="confirm.password"
          value={user.confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        ></Input>
        <br />
        <Button>{text[language].signupCreate}</Button>
      </form>
    </>
  );
}

export default SignUp;