import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
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
          alert(`Sorry, username is already taken!`);
        } else if (err.response.data.message === "name exists") {
          alert(`Sorry, name is already taken!`);
        } else {
          alert(`Sorry, there was an error somehow. Try again?`);
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
