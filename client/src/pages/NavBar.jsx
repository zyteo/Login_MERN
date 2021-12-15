import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { text } from "../localisation/text";

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 7vh;
  background-color: #faf0e6;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
`;

const Li = styled.li`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 5px 26px;
  font-size: 16px;
  border-radius: 24px;
  &:hover {
    background-color: #efbe93;
  }
  &:active {
    background-color: #efbe93;
  }
  @media only screen and (max-width: 600px) {
    padding: 6px;
    font-size: 10px;
  }
  @media only screen and (max-width: 400px) {
    padding: 4px;
    font-size: 8px;
  }
  @media only screen and (max-width: 300px) {
    padding: 2px;
    font-size: 6px;
  }
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  transition: all 0.2s ease;
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
  @media only screen and (max-width: 400px) {
    font-size: 6px;
  }
  `;

function NavBar({ setLanguage, language, auth, handleLogOut, userName }) {
  const handleLanguage = (event) => {
    setLanguage(event.target.value);
  }
  return (
    <>
      <Navbar>
        {auth === "NoAuth" ? (
          <>
            <LinkStyled to="/signup" className="signup">
              <Li>{language === "English" ? text.en.signup : language === "简体中文" ? text.simplifiedCN.signup : text.traditionaldCN.signup}</Li>
            </LinkStyled>
            <LinkStyled to="/" className="login">
              <Button primary>{language === "English" ? text.en.login : language === "简体中文" ? text.simplifiedCN.login : text.traditionaldCN.login}</Button>
            </LinkStyled>
          </>
        ) : (
          <>
            <p> {language === "English" ? text.en.greet : language === "简体中文" ? text.simplifiedCN.greet : text.traditionaldCN.greet} {userName}!</p>
            <LinkStyled to="/" className="logout">
              <Button primary onClick={handleLogOut}>
              {language === "English" ? text.en.logout : language === "简体中文" ? text.simplifiedCN.logout : text.traditionaldCN.logout}
              </Button>
            </LinkStyled>
          </>
        )}
        <select onClick={(event) => handleLanguage(event)}>
          <option>English</option>
          <option>简体中文</option>
          <option>繁体中文</option>
        </select>
      </Navbar>
    </>
  );
}

export default NavBar;
