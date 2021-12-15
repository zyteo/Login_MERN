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
            language === "English" ? alert(text.en.signupUserTaken) : language === "简体中文" ? alert(text.simplifiedCN.signupUserTaken) : alert(text.traditionaldCN.signupUserTaken)
            
        } else if (err.response.data.message === "name exists") {
            language === "English" ? alert(text.en.signupNameTaken) : language === "简体中文" ? alert(text.simplifiedCN.signupNameTaken) : alert(text.traditionaldCN.signupNameTaken)
        } else {
            language === "English" ? alert(text.en.signupError) : language === "简体中文" ? alert(text.simplifiedCN.signupError) : alert(text.traditionaldCN.signupError)
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
        language === "English" ? alert(text.en.signupShortPW) : language === "简体中文" ? alert(text.simplifiedCN.signupShortPW) : alert(text.traditionaldCN.signupShortPW)
    } else if (user.confirmPassword !== user.password) {
        language === "English" ? alert(text.en.signupUnmatchedPW) : language === "简体中文" ? alert(text.simplifiedCN.signupUnmatchedPW) : alert(text.traditionaldCN.signupUnmatchedPW)
    } else {
      addUser(user);
    }
  };

  return (
    <>
      <h1>{language === "English" ? text.en.signupNewUser : language === "简体中文" ? text.simplifiedCN.signupNewUser : text.traditionaldCN.signupNewUser}</h1>
      <form onSubmit={handleSubmit}>
            <label>{language === "English" ? text.en.name : language === "简体中文" ? text.simplifiedCN.name : text.traditionaldCN.name}</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleNameChange}
              required
              ></input>
              <label>{language === "English" ? text.en.username : language === "简体中文" ? text.simplifiedCN.username : text.traditionaldCN.username}</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleUsernameChange}
              required
              ></input>
              <label>{language === "English" ? text.en.password : language === "简体中文" ? text.simplifiedCN.password : text.traditionaldCN.password}</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handlePasswordChange}
              required
            ></input>
              <label>{language === "English" ? text.en.confirmPassword : language === "简体中文" ? text.simplifiedCN.confirmPassword : text.traditionaldCN.confirmPassword}</label>
            <input
              type="password"
              name="confirm.password"
              value={user.confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            ></input>
        <button>{language === "English" ? text.en.signupCreate : language === "简体中文" ? text.simplifiedCN.signupCreate : text.traditionaldCN.signupCreate}</button>
      </form>
    </>
  );
}

export default SignUp;