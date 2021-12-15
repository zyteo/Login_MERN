import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { text } from "../localisation/text";

function SignUp({language}) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const addUser = async (user) => {
    await axios
      .post(`/api/signup`, user)
      .then((res) => {
        alert(`New user ${user.username} created successfully!`);
        // navigate("/login");
      })
      .catch((err) => {
        if (err.response.data.message === "username exists") {
            language === "en" ? alert(text.en.signupUserTaken) : language === "简体中文" ? alert(text.simplifiedCN.signupUserTaken) : alert(text.traditionaldCN.signupUserTaken)
            
        } else if (err.response.data.message === "name exists") {
            language === "en" ? alert(text.en.signupNameTaken) : language === "简体中文" ? alert(text.simplifiedCN.signupNameTaken) : alert(text.traditionaldCN.signupNameTaken)
        } else {
            alert(`Sorry, there was an error somehow. Try again?`);
            language === "en" ? alert(text.en.signupError) : language === "简体中文" ? alert(text.simplifiedCN.signupError) : alert(text.traditionaldCN.signupError)
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
      alert("Password must be at least 6 characters long!");
    } else if (user.confirmPassword !== user.password) {
      alert("Passwords do not match!");
    } else {
      addUser(user);
    }
  };

  return (
    <>
      <h1>Create New User</h1>
      <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleNameChange}
              required
              ></input>
              <label>Username:</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleUsernameChange}
              required
              ></input>
              <label>Password:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handlePasswordChange}
              required
            ></input>
              <label>Confirm Password:</label>
            <input
              type="password"
              name="confirm.password"
              value={user.confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            ></input>
        <button>Create User</button>
      </form>
    </>
  );
}

export default SignUp;
